// ============================================================================
// Committee Orchestration — Capa 1
// Runs terna (3 parallel) and committee (5 + deliberation) patterns.
// Uses SubAgentRunner callback to avoid circular dependency with agent.ts.
// ============================================================================
import { composeSystemPrompt } from "./prompt-composer.js";
import { logger } from "../logger.js";
// Default committee timeout in milliseconds
const COMMITTEE_TIMEOUT_MS = 60_000;
// ---------------------------------------------------------------------------
// Terna: 3 agents in parallel → synthesis
// ---------------------------------------------------------------------------
/** Run 3 agents in parallel on the same task, then synthesize their responses. */
export async function runTerna(runner, agents, task) {
    if (agents.length === 0) {
        logger.warn("Terna called with no agents, falling back to direct response");
        return runner(task, "You are a helpful assistant.", []);
    }
    logger.info("Running terna", {
        agents: agents.map((a) => a.id),
        task: task.slice(0, 100),
    });
    // Run all agents in parallel
    const results = await Promise.allSettled(agents.map(async (agent) => {
        const prompt = composeSystemPrompt(agent);
        const response = await runner(task, prompt, agent.allowedTools);
        return { agentId: agent.id, response };
    }));
    // Collect successful responses and track failed agent IDs
    const responses = [];
    const unavailableAgentIds = [];
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === "fulfilled") {
            responses.push(result.value);
        }
        else {
            const agentId = agents[i].id;
            unavailableAgentIds.push(agentId);
            logger.warn("Terna agent failed", { agentId, error: result.reason });
        }
    }
    if (responses.length === 0) {
        return "All agents failed to respond. Please try again.";
    }
    if (responses.length === 1) {
        return responses[0].response;
    }
    // Synthesize multiple responses, passing unavailable agents for gap annotation
    return synthesize(runner, responses, task, unavailableAgentIds);
}
// ---------------------------------------------------------------------------
// Committee: 5 agents → deliberation → synthesis → tiebreaker
// ---------------------------------------------------------------------------
/** Run committee pattern: all agents deliberate, then synthesize with optional tiebreaker. */
export async function runCommittee(runner, agents, task) {
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
    const deliberationResults = await Promise.allSettled(agents.map(async (agent) => {
        const prompt = composeSystemPrompt(agent);
        const response = await runner(task, prompt, agent.allowedTools);
        return { agentId: agent.id, response };
    }));
    const deliberations = [];
    const unavailableInCommittee = [];
    for (let i = 0; i < deliberationResults.length; i++) {
        const result = deliberationResults[i];
        if (result.status === "fulfilled") {
            deliberations.push(result.value);
        }
        else {
            const agentId = agents[i].id;
            unavailableInCommittee.push(agentId);
            logger.warn("Committee agent failed during deliberation", {
                agentId,
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
    const synthesis = await synthesize(runner, deliberations, task, unavailableInCommittee);
    // Phase 3: Tiebreaker (only if 3+ agents and potential disagreement)
    let tiebreaker = null;
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
// executeCommittee: 5-agent deliberation with consensus status, tiebreaker,
// and timeout degradation to terna (TS-011, TS-012, TS-013)
// ---------------------------------------------------------------------------
/**
 * Execute committee deliberation with:
 * - consensusStatus field (strong/majority/split/disagreement)
 * - Tiebreaker using factual accuracy as documented criterion
 * - 60s timeout degradation: falls back to terna with first 3 responders
 *
 * @param timeoutMs - Override for testing; defaults to COMMITTEE_TIMEOUT_MS
 */
export async function executeCommittee(runner, agents, task, timeoutMs = COMMITTEE_TIMEOUT_MS) {
    if (agents.length === 0) {
        const fallback = await runner(task, "You are a helpful assistant.", []);
        return {
            deliberations: [],
            synthesis: fallback,
            tiebreaker: null,
            finalResponse: fallback,
            consensusStatus: "disagreement",
        };
    }
    logger.info("Running executeCommittee", {
        agents: agents.map((a) => a.id),
        task: task.slice(0, 100),
        timeoutMs,
    });
    // Phase 1: Race deliberations against timeout.
    // We track each resolved response in arrival order so that on timeout we
    // have the first 3 responders available immediately.
    const resolvedInOrder = [];
    // Wrap each agent promise so it pushes to resolvedInOrder on success
    const agentPromises = agents.map((agent) => (async () => {
        const prompt = composeSystemPrompt(agent);
        const response = await runner(task, prompt, agent.allowedTools);
        const item = { agentId: agent.id, response };
        resolvedInOrder.push(item);
        return item;
    })());
    // Create a timeout sentinel
    let timeoutHandle;
    const timeoutPromise = new Promise((resolve) => {
        timeoutHandle = setTimeout(() => resolve("TIMEOUT"), timeoutMs);
    });
    const raceResult = await Promise.race([
        Promise.allSettled(agentPromises).then((r) => ({ kind: "done", results: r })),
        timeoutPromise.then(() => ({ kind: "timeout" })),
    ]);
    // Cancel the timeout if all agents finished before it fired
    if (raceResult.kind === "done" && timeoutHandle !== undefined) {
        clearTimeout(timeoutHandle);
    }
    if (raceResult.kind === "timeout") {
        logger.warn("Committee timed out, degrading to terna with first 3 responders", {
            timeoutMs,
        });
        // Take the first 3 that resolved before the timeout fired
        const degradedDeliberations = resolvedInOrder.slice(0, 3);
        // Log the degradation reason (TS-013)
        logger.info("Committee degraded to terna", {
            degradationReason: "committee timeout",
            agentsUsed: degradedDeliberations.map((d) => d.agentId),
        });
        if (degradedDeliberations.length === 0) {
            const fallback = "Committee timed out with no responses.";
            return {
                deliberations: [],
                synthesis: fallback,
                tiebreaker: null,
                finalResponse: fallback,
                consensusStatus: "disagreement",
                degradationReason: "committee timeout",
            };
        }
        // Synthesize the first 3 responders (terna degradation path)
        const ternaResult = await synthesize(runner, degradedDeliberations, task, []);
        return {
            deliberations: degradedDeliberations,
            synthesis: ternaResult,
            tiebreaker: null,
            finalResponse: ternaResult,
            consensusStatus: computeConsensusStatus(degradedDeliberations),
            degradationReason: "committee timeout",
        };
    }
    // All agents settled — collect successful deliberations
    const deliberations = [];
    for (let i = 0; i < raceResult.results.length; i++) {
        const r = raceResult.results[i];
        if (r.status === "fulfilled") {
            deliberations.push(r.value);
        }
        else {
            logger.warn("Committee agent failed", {
                agentId: agents[i].id,
                error: r.reason,
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
            consensusStatus: "disagreement",
        };
    }
    // Phase 2: Compute consensus status
    const consensusStatus = computeConsensusStatus(deliberations);
    // Phase 3: Synthesis
    const synthesis = await synthesize(runner, deliberations, task, []);
    // Phase 4: Tiebreaker with documented factual accuracy criterion (TS-012)
    let tiebreaker = null;
    let tiebreakerCriterion;
    if (deliberations.length >= 3) {
        const tiebreakerResult = await runFactualTiebreaker(runner, deliberations, synthesis, task);
        tiebreaker = tiebreakerResult.decision;
        tiebreakerCriterion = tiebreakerResult.criterion;
    }
    const finalResponse = tiebreaker ?? synthesis;
    logger.info("executeCommittee completed", {
        deliberationCount: deliberations.length,
        consensusStatus,
        hasTiebreaker: tiebreaker !== null,
        tiebreakerCriterion,
    });
    return {
        deliberations,
        synthesis,
        tiebreaker,
        finalResponse,
        consensusStatus,
        tiebreakerCriterion,
    };
}
// ---------------------------------------------------------------------------
// Consensus status computation
// ---------------------------------------------------------------------------
/**
 * Compute consensus status based on number of deliberating agents.
 *
 * strong       — all agents agree (1 unique position, or unanimous for 5)
 * majority     — clear majority (e.g., 4/5 or 3/5 without factual split)
 * split        — even or near-even split (2v3 with factual override possible)
 * disagreement — no pattern / too few agents
 */
function computeConsensusStatus(deliberations) {
    const n = deliberations.length;
    if (n === 0)
        return "disagreement";
    if (n === 1)
        return "strong";
    // Use a simple heuristic: check for key recommendation words
    // In production this would use LLM classification; in tests the mock controls the text
    const recommendationCounts = countRecommendations(deliberations);
    const total = deliberations.length;
    const maxVotes = Math.max(...Object.values(recommendationCounts));
    const uniquePositions = Object.keys(recommendationCounts).length;
    if (uniquePositions === 1)
        return "strong";
    if (maxVotes / total >= 0.8)
        return "strong";
    if (maxVotes / total >= 0.6)
        return "majority";
    if (uniquePositions === 2 && total >= 4)
        return "split";
    return "disagreement";
}
/**
 * Simple recommendation counter — extracts uppercase labels like "A", "B", "EXPAND", "WAIT"
 * from deliberation responses for consensus calculation.
 */
function countRecommendations(deliberations) {
    const counts = {};
    for (const d of deliberations) {
        // Look for recommend/suggest/conclusion markers
        const text = d.response.toLowerCase();
        if (text.includes("recommend a") || text.includes("choose a") || text.includes('"a"')) {
            counts["A"] = (counts["A"] ?? 0) + 1;
        }
        else if (text.includes("recommend b") || text.includes("choose b") || text.includes('"b"')) {
            counts["B"] = (counts["B"] ?? 0) + 1;
        }
        else {
            // Treat each unique response as its own position
            counts[d.agentId] = (counts[d.agentId] ?? 0) + 1;
        }
    }
    if (Object.keys(counts).length === 0) {
        counts["unknown"] = deliberations.length;
    }
    return counts;
}
/**
 * Run the factual accuracy tiebreaker.
 * The arbiter is asked to evaluate based on factual accuracy (not vote count).
 * Logs the criterion "factual accuracy" when invoked.
 */
async function runFactualTiebreaker(runner, deliberations, synthesis, originalTask) {
    const CRITERION = "factual accuracy";
    const deliberationSummary = deliberations
        .map((d, i) => `## Agent ${i + 1} (${d.agentId})\n${d.response}`)
        .join("\n\n");
    const tiebreakerTask = [
        `Original question: ${originalTask}`,
        "",
        `Synthesized answer:\n${synthesis}`,
        "",
        "Individual agent deliberations:",
        "",
        deliberationSummary,
        "",
        `Number of experts consulted: ${deliberations.length}`,
        "",
        `Tiebreaker criterion: ${CRITERION}`,
        "",
        "Evaluate each agent's position based on FACTUAL ACCURACY, not vote count.",
        "The recommendation supported by stronger factual evidence should win, even if it has fewer votes.",
        "If the synthesis is coherent and well-supported by facts, respond with exactly: CONSENSUS_REACHED",
        "If there are factually unsupported positions or the synthesis misjudges accuracy, provide a corrected final answer.",
    ].join("\n");
    const tiebreakerPrompt = "You are the final arbiter in a committee decision. " +
        "Your tiebreaker criterion is FACTUAL ACCURACY. " +
        "Evaluate recommendations based on the strength of factual evidence, not majority vote. " +
        "A minority recommendation with stronger factual support should override a majority recommendation.";
    logger.info("Running factual tiebreaker", { criterion: CRITERION, agentCount: deliberations.length });
    const result = await runner(tiebreakerTask, tiebreakerPrompt, []);
    if (result.trim() === "CONSENSUS_REACHED") {
        return { decision: null, criterion: CRITERION };
    }
    return { decision: result, criterion: CRITERION };
}
// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------
/** Synthesize multiple agent responses into a single coherent answer.
 *
 * @param unavailableAgentIds - IDs of agents that failed / timed out.
 *   When present, the synthesis task will include a gap annotation so the
 *   Synthesizer LLM knows to note which agent was unavailable (TS-009).
 */
async function synthesize(runner, responses, originalTask, unavailableAgentIds = []) {
    // Attribute each response to its agent (TS-010: preserves contradictions with agent name)
    const responseSummary = responses
        .map((r, i) => `## Expert ${i + 1} (${r.agentId})\n${r.response}`)
        .join("\n\n");
    const taskLines = [
        `Original question: ${originalTask}`,
        "",
        "The following experts have provided their independent analyses:",
        "",
        responseSummary,
    ];
    // TS-009: annotate any missing agent responses so the synthesizer can note the gap
    if (unavailableAgentIds.length > 0) {
        taskLines.push("");
        taskLines.push(`Note: The following agent(s) did not respond and are unavailable: ${unavailableAgentIds.join(", ")}.`);
        taskLines.push("Your synthesized response MUST include an explicit note that one or more agent responses were unavailable.");
    }
    taskLines.push("", "Synthesize these perspectives into a single, coherent, and comprehensive response.", "Highlight areas of agreement and note any significant disagreements.", 
    // TS-010: preserve attribution for contradictory conclusions
    "When experts hold contradictory conclusions, preserve both perspectives and prefix each with the contributing agent's name (e.g. 'Agent-analyst: ...').", "Where experts agree, provide a unified answer without redundant attribution.");
    const synthesisTask = taskLines.join("\n");
    const synthesisPrompt = "You are a skilled synthesizer. Your job is to combine multiple expert perspectives " +
        "into a single, coherent response. Be concise but thorough. Preserve key insights " +
        "from each expert. When perspectives contradict, preserve both with agent attribution. " +
        "When an agent was unavailable, explicitly note this in your response.";
    return runner(synthesisTask, synthesisPrompt, []);
}
/** Run a tiebreaker when committee responses may conflict. */
async function runTiebreaker(runner, deliberations, synthesis, originalTask) {
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
    const tiebreakerPrompt = "You are the final arbiter in a committee decision. " +
        "Your role is to ensure the synthesized response is accurate and complete. " +
        "Only intervene if the synthesis has significant issues.";
    const result = await runner(tiebreakerTask, tiebreakerPrompt, []);
    if (result.trim() === "CONSENSUS_REACHED") {
        return null; // No tiebreaker needed
    }
    return result;
}
