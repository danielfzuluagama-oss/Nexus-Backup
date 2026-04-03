// ============================================================================
// Skill Engine — Capa 1
// Executes workflows step-by-step, composing prompts and validating outputs.
// ============================================================================

import type { WorkflowDefinition, StepDefinition, SubAgentRunner } from "./types.js";
import { composeStepPrompt } from "./prompt-composer.js";
import { logger } from "../logger.js";

const DEFAULT_WORKFLOW_TIMEOUT_MS = 30_000;

interface StructuredStepPayload {
  output: string;
  contextPatch: Record<string, string>;
  handoff: string | null;
}

interface StepResult extends StructuredStepPayload {
  success: boolean;
}

export interface WorkflowExecutionOptions {
  allowedTools?: string[];
  executeMechanicalStep?: (
    step: StepDefinition,
    context: Record<string, string>
  ) => Promise<StructuredStepPayload | null> | StructuredStepPayload | null;
}

export interface WorkflowExecutionResult {
  output: string;
  finalContext: Record<string, string>;
  handoff: string | null;
}

function toStringValue(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return "";
}

function toNullableStringValue(value: unknown): string | null {
  const text = toStringValue(value);
  if (!text) {
    return null;
  }

  const normalized = text.toLowerCase();
  if (normalized === "null" || normalized === "none" || normalized === "n/a") {
    return null;
  }

  return text;
}

function normalizeStringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value)
      .map(([key, item]) => [key.trim(), toStringValue(item)] as const)
      .filter(([key, item]) => key.length > 0 && item.length > 0)
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractJsonCandidate(output: string): string | null {
  const trimmed = output.trim();
  if (!trimmed) {
    return null;
  }

  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}"))
    || (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    return trimmed;
  }

  const fencedMatch = trimmed.match(/```json\s*([\s\S]*?)```/i);
  if (fencedMatch) {
    return fencedMatch[1].trim();
  }

  return null;
}

function parseStructuredStepPayload(output: string): StructuredStepPayload | null {
  const jsonCandidate = extractJsonCandidate(output);
  if (!jsonCandidate) {
    return null;
  }

  try {
    const parsed = JSON.parse(jsonCandidate) as Record<string, unknown>;
    const primaryOutput =
      toStringValue(parsed.primary_output)
      || toStringValue(parsed.primaryOutput)
      || toStringValue(parsed.output)
      || toStringValue(parsed.result);

    const contextPatch = normalizeStringRecord(parsed.context_patch ?? parsed.contextPatch);
    const handoff =
      toNullableStringValue(parsed.handoff)
      || toNullableStringValue(parsed.handoffIfNeeded);

    return {
      output: primaryOutput || output.trim(),
      contextPatch,
      handoff,
    };
  } catch {
    return null;
  }
}

function buildStructuredOutputContract(step: StepDefinition): string {
  return [
    "Return ONLY valid JSON with this shape:",
    '{"primary_output":"string","context_patch":{"key":"value"},"handoff":"string|null"}',
    'Rules for "primary_output":',
    `- It must satisfy this expected output: ${step.expectedOutput || "Provide the best step result."}`,
    'Rules for "context_patch":',
    "- Include any named values future steps may need, especially placeholders referenced in prompts.",
    "- Every context_patch value must be a string.",
    'Rules for "handoff":',
    '- Use null unless this step explicitly determines a handoff should occur.',
  ].join("\n");
}

function buildStepTask(step: StepDefinition): string {
  return [
    `Task: ${step.title}`,
    `Description: ${step.desc}`,
    `Why this matters: ${step.whyThisMatters}`,
    "",
    `Action: ${step.actionInstruction}`,
    "",
    `Input needed: ${step.inputNeeded}`,
    `Expected output: ${step.expectedOutput}`,
    `Validation rule: ${step.validationRule}`,
    "",
    buildStructuredOutputContract(step),
  ].join("\n");
}

function buildMechanicalPrompt(context: Record<string, string>): string {
  const template = [
    "You are executing a structured workflow step.",
    "If the step requires an allowed tool, call it.",
    "If the step references security or validation checks, perform the closest faithful execution possible with the available context.",
    "Produce only the JSON contract requested in the task.",
    `Current workflow context keys: ${Object.keys(context).join(", ") || "none"}`,
  ].join("\n");

  return composeStepPrompt(template, context);
}

function shouldTriggerHandoff(step: StepDefinition, result: StepResult): boolean {
  if (!step.handoffIfNeeded) {
    return false;
  }

  if (result.handoff) {
    return true;
  }

  const conditionMatch = step.handoffIfNeeded.match(/^\s*if\s+([a-z0-9_-]+)\s*:/i);
  if (!conditionMatch) {
    return true;
  }

  const token = conditionMatch[1].toLowerCase();
  const haystack = [result.output, ...Object.values(result.contextPatch)]
    .join(" ")
    .toLowerCase();

  return new RegExp(`\\b${escapeRegExp(token)}\\b`, "i").test(haystack);
}

/** Execute a full workflow, running each step sequentially with optional timeout. */
export async function executeWorkflow(
  runner: SubAgentRunner,
  workflow: WorkflowDefinition,
  context: Record<string, string>,
  options: WorkflowExecutionOptions = {},
): Promise<string> {
  const result = await executeWorkflowDetailed(runner, workflow, context, options);
  return result.output;
}

/** Execute a full workflow and return the final output plus accumulated context. */
export async function executeWorkflowDetailed(
  runner: SubAgentRunner,
  workflow: WorkflowDefinition,
  context: Record<string, string>,
  options: WorkflowExecutionOptions = {},
): Promise<WorkflowExecutionResult> {
  const timeoutMs = workflow.timeoutMs ?? DEFAULT_WORKFLOW_TIMEOUT_MS;

  logger.info("Executing workflow", {
    workflowId: workflow.id,
    title: workflow.title,
    stepCount: workflow.steps.length,
    timeoutMs,
  });

  const execution = executeWorkflowSteps(runner, workflow, context, options);
  const timeout = new Promise<WorkflowExecutionResult>((_, reject) =>
    setTimeout(() => reject(new Error(`Workflow "${workflow.id}" timed out after ${timeoutMs}ms`)), timeoutMs)
  );

  try {
    return await Promise.race([execution, timeout]);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error("Workflow timeout or error", { workflowId: workflow.id, error: msg });
    return {
      output: `[timeout] ${msg}`,
      finalContext: { ...context },
      handoff: null,
    };
  }
}

/** Internal: execute workflow steps sequentially (called inside timeout race). */
async function executeWorkflowSteps(
  runner: SubAgentRunner,
  workflow: WorkflowDefinition,
  context: Record<string, string>,
  options: WorkflowExecutionOptions,
): Promise<WorkflowExecutionResult> {
  let lastOutput = "";
  let handoff: string | null = null;
  const currentContext: Record<string, string> = { ...context };

  for (const step of workflow.steps) {
    logger.info("Executing step", {
      workflowId: workflow.id,
      stepNumber: step.stepNumber,
      title: step.title,
    });

    let result = await executeStep(runner, step, {
      ...currentContext,
      previousOutput: lastOutput,
      lastOutput,
    }, options);

    if (result.success) {
      lastOutput = result.output;
      currentContext.previousOutput = result.output;
      currentContext.lastOutput = result.output;
      currentContext[`step${step.stepNumber}Output`] = result.output;
      Object.assign(currentContext, result.contextPatch);

      logger.info("Step completed", {
        stepNumber: step.stepNumber,
        outputLength: result.output.length,
        contextKeys: Object.keys(result.contextPatch),
      });
    } else {
      logger.warn("Step failed, attempting recovery", {
        stepNumber: step.stepNumber,
        failureSignal: step.failureSignal,
        recoveryAction: step.recoveryAction,
      });

      const recovery = await attemptRecovery(runner, step, {
        ...currentContext,
        previousOutput: lastOutput,
        lastOutput,
      }, options);

      if (recovery) {
        lastOutput = recovery.output;
        currentContext.previousOutput = recovery.output;
        currentContext.lastOutput = recovery.output;
        currentContext[`step${step.stepNumber}Output`] = recovery.output;
        Object.assign(currentContext, recovery.contextPatch);
        result = {
          success: true,
          output: recovery.output,
          contextPatch: recovery.contextPatch,
          handoff: recovery.handoff,
        };
      } else {
        logger.error("Recovery failed, aborting workflow", {
          workflowId: workflow.id,
          failedStep: step.stepNumber,
        });
        return {
          output: `Workflow "${workflow.title}" failed at step ${step.stepNumber}: ${step.title}`,
          finalContext: currentContext,
          handoff: null,
        };
      }
    }

    if (shouldTriggerHandoff(step, result)) {
      handoff = result.handoff ?? step.handoffIfNeeded;
      logger.info("Step requires handoff", {
        stepNumber: step.stepNumber,
        handoff,
      });
      break;
    }
  }

  logger.info("Workflow completed", {
    workflowId: workflow.id,
    title: workflow.title,
    handoff,
  });

  return {
    output: lastOutput,
    finalContext: currentContext,
    handoff,
  };
}

/** Execute a single workflow step. */
async function executeStep(
  runner: SubAgentRunner,
  step: StepDefinition,
  context: Record<string, string>,
  options: WorkflowExecutionOptions,
): Promise<StepResult> {
  try {
    if (!step.promptToUse && options.executeMechanicalStep) {
      const executed = await options.executeMechanicalStep(step, context);
      if (executed) {
        return {
          success: true,
          output: executed.output,
          contextPatch: executed.contextPatch,
          handoff: executed.handoff,
        };
      }
    }

    const prompt = step.promptToUse
      ? composeStepPrompt(
          [
            step.promptToUse,
            "",
            "Return only the JSON contract requested in the task.",
          ].join("\n"),
          context,
        )
      : buildMechanicalPrompt(context);

    const output = await runner(buildStepTask(step), prompt, options.allowedTools ?? []);
    const structured = parseStructuredStepPayload(output);

    return {
      success: true,
      output: structured?.output ?? output,
      contextPatch: structured?.contextPatch ?? {},
      handoff: structured?.handoff ?? null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error("Step execution failed", {
      stepNumber: step.stepNumber,
      error: message,
    });
    return { success: false, output: message, contextPatch: {}, handoff: null };
  }
}

/** Attempt recovery for a failed step using its recoveryAction. */
async function attemptRecovery(
  runner: SubAgentRunner,
  step: StepDefinition,
  context: Record<string, string>,
  options: WorkflowExecutionOptions,
): Promise<StructuredStepPayload | null> {
  if (!step.recoveryAction) {
    return null;
  }

  const recoveryTask = [
    `The previous step "${step.title}" failed.`,
    `Failure signal: ${step.failureSignal}`,
    `Recovery action: ${step.recoveryAction}`,
    "",
    buildStructuredOutputContract(step),
  ].join("\n");

  const recoveryPrompt = composeStepPrompt(
    [
      step.promptToUse ?? "You are performing workflow error recovery.",
      "",
      "Execute the recovery action directly and return only the JSON contract requested in the task.",
    ].join("\n"),
    context,
  );

  try {
    const output = await runner(recoveryTask, recoveryPrompt, options.allowedTools ?? []);
    const structured = parseStructuredStepPayload(output);
    if (structured) {
      return structured;
    }

    return {
      output,
      contextPatch: {},
      handoff: null,
    };
  } catch {
    return null;
  }
}
