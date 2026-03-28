// ============================================================================
// Committee Orchestration — Capa 1
// Runs terna (3 parallel) and committee (5 + deliberation) patterns.
// Uses SubAgentRunner callback to avoid circular dependency with agent.ts.
// ============================================================================

import type { AgentDefinition, SubAgentRunner, CommitteeResult } from "./types.js";
import { composeSystemPrompt } from "./prompt-composer.js";
import { logger } from "../logger.js";

// ---------------------------------------------------------------------------
// Terna: 3 agents in parallel → synthesis
// ---------------------------------------------------------------------------

/** Run 3 agents in parallel on the same task, then synthesize their responses. */
export async function runTerna(
  runner: SubAgentRunner,
  agents: AgentDefinition[],
  task: string
): Promise<string> {
  if (agents.length === 0) {
    logger.warn("Terna called with no agents, falling back to direct response");
    return runner(task, "You are a helpful assistant.", []);
  }

  logger.info("Running terna", {
    agents: agents.map((a) => a.id),
    task: task.slice(0, 100),
  });

  // Run all agents in parallel
  const results = await Promise.allSettled(
    agents.map(async (agent) => {
      const prompt = composeSystemPrompt(agent);
      const response = await runner(task, prompt, agent.allowedTools);
      return { agentId: agent.id, response };
    })
  );

  // Collect successful responses
  const responses: Array<{ agentId: string; response: string }> = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      responses.push(result.value);
    } else {
      logger.warn("Terna agent failed", { error: result.reason });
    }
  }

  if (responses.length === 0) {
    return "All agents failed to respond. Please try again.";
  }

  if (responses.length === 1) {
    return responses[0].response;
  }

  // Synthesize multiple responses
  return synthesize(runner, responses, task);
}

// ---------------------------------------------------------------------------
// Committee: 5 agents → deliberation → synthesis → tiebreaker
// ---------------------------------------------------------------------------

/** Run committee pattern: all agents deliberate, then synthesize with optional tiebreaker. */
export async function runCommittee(
  runner: SubAgentRunner,
  agents: AgentDefinition[],
  task: string
): Promise<CommitteeResult> {
  if (agents.length === 0) {
    const fallback = await runner(task, "You are a helpful assistant.", []);
    return {
      deliberations: [],
      synthesis: fallback,
      tiebreaker: null,
      finalResponse: fallback,
    };
  }

  logger.info("Running committee", {
    agents: agents.map((a) => a.id),
    task: task.slice(0, 100),
  });

  // Phase 1: Independent deliberation
  const deliberationResults = await Promise.allSettled(
    agents.map(async (agent) => {
      const prompt = composeSystemPrompt(agent);
      const response = await runner(task, prompt, agent.allowedTools);
      return { agentId: agent.id, response };
    })
  );

  const deliberations: Array<{ agentId: string; response: string }> = [];
  for (const result of deliberationResults) {
    if (result.status === "fulfilled") {
      deliberations.push(result.value);
    } else {
      logger.warn("Committee agent failed during deliberation", {
        error: result.reason,
      });
    }
  }

  if (deliberations.length === 0) {
    const fallback = "All committee members failed to respond.";
    return {
      deliberations: [],
      synthesis: fallback,
      tiebreaker: null,
      finalResponse: fallback,
    };
  }

  // Phase 2: Synthesis
  const synthesis = await synthesize(runner, deliberations, task);

  // Phase 3: Tiebreaker (only if 3+ agents and potential disagreement)
  let tiebreaker: string | null = null;
  if (deliberations.length >= 3) {
    tiebreaker = await runTiebreaker(runner, deliberations, synthesis, task);
  }

  const finalResponse = tiebreaker ?? synthesis;

  logger.info("Committee completed", {
    deliberationCount: deliberations.length,
    hasTiebreaker: tiebreaker !== null,
  });

  return { deliberations, synthesis, tiebreaker, finalResponse };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Synthesize multiple agent responses into a single coherent answer. */
async function synthesize(
  runner: SubAgentRunner,
  responses: Array<{ agentId: string; response: string }>,
  originalTask: string
): Promise<string> {
  const responseSummary = responses
    .map((r, i) => `## Expert ${i + 1} (${r.agentId})\n${r.response}`)
    .join("\n\n");

  const synthesisTask = [
    `Original question: ${originalTask}`,
    "",
    "The following experts have provided their independent analyses:",
    "",
    responseSummary,
    "",
    "Synthesize these perspectives into a single, coherent, and comprehensive response.",
    "Highlight areas of agreement and note any significant disagreements.",
    "Do not attribute responses to specific experts — provide a unified answer.",
  ].join("\n");

  const synthesisPrompt =
    "You are a skilled synthesizer. Your job is to combine multiple expert perspectives " +
    "into a single, coherent response. Be concise but thorough. Preserve key insights " +
    "from each expert while eliminating redundancy.";

  return runner(synthesisTask, synthesisPrompt, []);
}

/** Run a tiebreaker when committee responses may conflict. */
async function runTiebreaker(
  runner: SubAgentRunner,
  deliberations: Array<{ agentId: string; response: string }>,
  synthesis: string,
  originalTask: string
): Promise<string | null> {
  const tiebreakerTask = [
    `Original question: ${originalTask}`,
    "",
    `Synthesized answer:\n${synthesis}`,
    "",
    `Number of experts consulted: ${deliberations.length}`,
    "",
    "Review the synthesized answer above.",
    "If the synthesis is coherent and well-supported, respond with exactly: CONSENSUS_REACHED",
    "If there are unresolved conflicts or the synthesis misses critical points, provide a corrected final answer.",
  ].join("\n");

  const tiebreakerPrompt =
    "You are the final arbiter in a committee decision. " +
    "Your role is to ensure the synthesized response is accurate and complete. " +
    "Only intervene if the synthesis has significant issues.";

  const result = await runner(tiebreakerTask, tiebreakerPrompt, []);

  if (result.trim() === "CONSENSUS_REACHED") {
    return null; // No tiebreaker needed
  }

  return result;
}
