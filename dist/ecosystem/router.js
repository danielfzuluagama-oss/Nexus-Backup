// ============================================================================
// Ecosystem Router — Capa 1
// Decides delegation mode (single/terna/committee) via LLM tool call.
// Provides tool definition and executor for the route_request tool.
// ============================================================================
import { composeSystemPrompt } from "./prompt-composer.js";
import { runTerna, runCommittee } from "./committee.js";
import { logger } from "../logger.js";
/** Build the route_request tool definition with available agent catalog. */
export function getRouteRequestDefinition(ecosystem) {
    const agentDescriptions = [...ecosystem.agents.entries()]
        .map(([id, agent]) => `- "${id}": ${agent.role}`)
        .join("\n");
    return {
        type: "function",
        function: {
            name: "route_request",
            description: "Route a user request to specialist agent(s). Choose the appropriate mode:\n" +
                '- "single": one specialist handles the task\n' +
                '- "terna": 3 agents analyze in parallel, results synthesized\n' +
                '- "committee": all agents deliberate for critical decisions\n\n' +
                `Available agents:\n${agentDescriptions}`,
            parameters: {
                type: "object",
                properties: {
                    mode: {
                        type: "string",
                        description: 'Routing mode: "single", "terna", or "committee"',
                    },
                    agents: {
                        type: "array",
                        items: { type: "string" },
                        description: "Agent IDs to involve (1 for single, 3 for terna, all for committee)",
                    },
                    task: {
                        type: "string",
                        description: "The task to route to the selected agent(s)",
                    },
                    reason: {
                        type: "string",
                        description: "Why this routing mode was chosen (audit trail)",
                    },
                },
                required: ["mode", "agents", "task", "reason"],
            },
        },
    };
}
/** Create the route_request tool executor. Captures ecosystem state and runner. */
export function createRouteExecutor(ecosystem, runner) {
    return async (args) => {
        const mode = typeof args.mode === "string" ? args.mode : "single";
        const rawAgents = Array.isArray(args.agents) ? args.agents : [];
        const agents = rawAgents.filter((a) => typeof a === "string");
        const task = typeof args.task === "string" ? args.task : "";
        const reason = typeof args.reason === "string" ? args.reason : "";
        const decision = {
            mode: mode,
            agents,
            reason,
            reversible: true,
        };
        logger.info("Routing decision", {
            mode: decision.mode,
            agents: decision.agents,
            reason: decision.reason,
        });
        if (!task.trim()) {
            return "Error: No task provided for routing.";
        }
        switch (decision.mode) {
            case "single":
                return executeSingle(ecosystem, runner, agents, task);
            case "terna":
                return executeTerna(ecosystem, runner, agents, task);
            case "committee":
                return executeCommittee(ecosystem, runner, agents, task);
            default:
                return `Error: Unknown routing mode "${mode}". Use "single", "terna", or "committee".`;
        }
    };
}
// ---------------------------------------------------------------------------
// Mode executors
// ---------------------------------------------------------------------------
async function executeSingle(ecosystem, runner, agentIds, task) {
    const agentId = agentIds[0];
    if (!agentId) {
        return "Error: No agent specified for single routing.";
    }
    const agentDef = ecosystem.agents.get(agentId);
    if (!agentDef) {
        return `Error: Unknown agent "${agentId}".`;
    }
    const systemPrompt = composeSystemPrompt(agentDef);
    return runner(task, systemPrompt, agentDef.allowedTools);
}
async function executeTerna(ecosystem, runner, agentIds, task) {
    const agents = resolveAgents(ecosystem, agentIds);
    if (agents.length < 2) {
        logger.warn("Terna requires at least 2 agents, falling back to single", {
            resolved: agents.length,
        });
        if (agents.length === 1) {
            const prompt = composeSystemPrompt(agents[0]);
            return runner(task, prompt, agents[0].allowedTools);
        }
        return "Error: Not enough agents available for terna routing.";
    }
    return runTerna(runner, agents, task);
}
async function executeCommittee(ecosystem, runner, agentIds, task) {
    const agents = resolveAgents(ecosystem, agentIds);
    if (agents.length < 3) {
        logger.warn("Committee requires at least 3 agents, falling back to terna", {
            resolved: agents.length,
        });
        return executeTerna(ecosystem, runner, agentIds, task);
    }
    const result = await runCommittee(runner, agents, task);
    return result.finalResponse;
}
/** Resolve agent IDs to AgentDefinition objects, filtering unknowns. */
function resolveAgents(ecosystem, agentIds) {
    const resolved = [];
    for (const id of agentIds) {
        const agent = ecosystem.agents.get(id);
        if (agent) {
            resolved.push(agent);
        }
        else {
            logger.warn("Agent not found in ecosystem", { agentId: id });
        }
    }
    return resolved;
}
