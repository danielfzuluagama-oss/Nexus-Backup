// ============================================================================
// Skill Engine — Capa 1
// Executes workflows step-by-step, composing prompts and validating outputs.
// ============================================================================
import { composeStepPrompt } from "./prompt-composer.js";
import { logger } from "../logger.js";
const DEFAULT_WORKFLOW_TIMEOUT_MS = 30_000;
/** Execute a full workflow, running each step sequentially with optional timeout. */
export async function executeWorkflow(runner, workflow, context) {
    const timeoutMs = workflow.timeoutMs ?? DEFAULT_WORKFLOW_TIMEOUT_MS;
    logger.info("Executing workflow", {
        workflowId: workflow.id,
        title: workflow.title,
        stepCount: workflow.steps.length,
        timeoutMs,
    });
    // Race workflow execution against timeout
    const execution = executeWorkflowSteps(runner, workflow, context);
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error(`Workflow "${workflow.id}" timed out after ${timeoutMs}ms`)), timeoutMs));
    try {
        return await Promise.race([execution, timeout]);
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        logger.error("Workflow timeout or error", { workflowId: workflow.id, error: msg });
        return `[timeout] ${msg}`;
    }
}
/** Internal: execute workflow steps sequentially (called inside timeout race). */
async function executeWorkflowSteps(runner, workflow, context) {
    let lastOutput = "";
    for (const step of workflow.steps) {
        logger.info("Executing step", {
            workflowId: workflow.id,
            stepNumber: step.stepNumber,
            title: step.title,
        });
        const result = await executeStep(runner, step, {
            ...context,
            previousOutput: lastOutput,
        });
        if (result.success) {
            lastOutput = result.output;
            logger.info("Step completed", {
                stepNumber: step.stepNumber,
                outputLength: result.output.length,
            });
        }
        else {
            logger.warn("Step failed, attempting recovery", {
                stepNumber: step.stepNumber,
                failureSignal: step.failureSignal,
                recoveryAction: step.recoveryAction,
            });
            // Attempt recovery
            const recovery = await attemptRecovery(runner, step, context);
            if (recovery) {
                lastOutput = recovery;
            }
            else {
                logger.error("Recovery failed, aborting workflow", {
                    workflowId: workflow.id,
                    failedStep: step.stepNumber,
                });
                return `Workflow "${workflow.title}" failed at step ${step.stepNumber}: ${step.title}`;
            }
        }
        // Check for handoff
        if (step.handoffIfNeeded) {
            logger.info("Step requires handoff", {
                stepNumber: step.stepNumber,
                handoff: step.handoffIfNeeded,
            });
            break;
        }
    }
    logger.info("Workflow completed", {
        workflowId: workflow.id,
        title: workflow.title,
    });
    return lastOutput;
}
/** Execute a single workflow step. */
async function executeStep(runner, step, context) {
    // If step has no prompt (mechanical step), return the action instruction
    if (!step.promptToUse) {
        return {
            success: true,
            output: `[Mechanical step] ${step.actionInstruction}`,
        };
    }
    // Compose prompt with context substitution and CP2
    const prompt = composeStepPrompt(step.promptToUse, context);
    const task = [
        `Task: ${step.title}`,
        `Description: ${step.desc}`,
        `Why this matters: ${step.whyThisMatters}`,
        "",
        `Action: ${step.actionInstruction}`,
        "",
        `Expected output: ${step.expectedOutput}`,
        `Validation rule: ${step.validationRule}`,
    ].join("\n");
    try {
        const output = await runner(task, prompt, []);
        return { success: true, output };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logger.error("Step execution failed", {
            stepNumber: step.stepNumber,
            error: message,
        });
        return { success: false, output: message };
    }
}
/** Attempt recovery for a failed step using its recoveryAction. */
async function attemptRecovery(runner, step, context) {
    if (!step.recoveryAction)
        return null;
    const recoveryTask = [
        `The previous step "${step.title}" failed.`,
        `Failure signal: ${step.failureSignal}`,
        `Recovery action: ${step.recoveryAction}`,
        "",
        "Execute the recovery action and provide the result.",
    ].join("\n");
    const recoveryPrompt = composeStepPrompt(step.promptToUse ?? "You are performing error recovery.", context);
    try {
        return await runner(recoveryTask, recoveryPrompt, []);
    }
    catch {
        return null;
    }
}
