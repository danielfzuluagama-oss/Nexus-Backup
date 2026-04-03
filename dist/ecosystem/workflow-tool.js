// ============================================================================
// Workflow Tool — Capa 1
// Exposes hydrated skill workflows as a runtime tool the orchestrator can call.
// ============================================================================
import { composeSystemPrompt } from "./prompt-composer.js";
import { executeWorkflowDetailed } from "./skill-engine.js";
import { sanitizeInput, validateOutput } from "../security.js";
import { executeTool, getToolNames } from "../tools/registry.js";
import { logger } from "../logger.js";
function toStringValue(value) {
    if (typeof value === "string") {
        return value.trim();
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return "";
}
function normalizeContext(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return {};
    }
    return Object.fromEntries(Object.entries(value)
        .map(([key, entry]) => [key.trim(), toStringValue(entry)])
        .filter(([key, entry]) => key.length > 0 && entry.length > 0));
}
function tokenize(value) {
    return value
        .toLowerCase()
        .split(/[^a-z0-9]+/g)
        .filter((token) => token.length > 1);
}
function buildWorkflowSearchText(binding) {
    return [
        binding.agent.id,
        binding.agent.name,
        binding.agent.role,
        binding.skill.id,
        binding.skill.name,
        binding.skill.purpose,
        binding.workflow.id,
        binding.workflow.title,
        binding.workflow.objective,
        binding.workflow.trigger,
        binding.workflow.mainOutput,
    ].join(" ");
}
function collectWorkflowBindings(ecosystem) {
    const bindings = [];
    for (const [agentId, skills] of ecosystem.skills.entries()) {
        const agent = ecosystem.agents.get(agentId);
        if (!agent) {
            continue;
        }
        for (const skill of skills) {
            for (const workflow of skill.workflows) {
                bindings.push({ agent, skill, workflow });
            }
        }
    }
    return bindings;
}
function scoreWorkflowBinding(binding, query) {
    const haystack = buildWorkflowSearchText(binding).toLowerCase();
    const tokens = tokenize(query);
    if (tokens.length === 0) {
        return 0;
    }
    let score = 0;
    for (const token of tokens) {
        if (haystack.includes(token)) {
            score += token.length >= 5 ? 3 : 1;
        }
    }
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === binding.workflow.id.toLowerCase()
        || normalizedQuery === binding.skill.id.toLowerCase()
        || normalizedQuery === binding.agent.id.toLowerCase()) {
        score += 10;
    }
    if (haystack.includes(normalizedQuery) && normalizedQuery.length > 3) {
        score += 5;
    }
    return score;
}
function resolveWorkflowBinding(ecosystem, request) {
    const bindings = collectWorkflowBindings(ecosystem);
    let candidates = bindings;
    if (request.agentId) {
        candidates = candidates.filter((binding) => binding.agent.id === request.agentId);
    }
    if (request.skillId) {
        candidates = candidates.filter((binding) => binding.skill.id === request.skillId);
    }
    if (request.workflowId) {
        const exact = candidates.find((binding) => binding.workflow.id === request.workflowId);
        return {
            binding: exact ?? null,
            suggestions: exact ? [exact] : candidates.slice(0, 5),
        };
    }
    const query = request.query?.trim();
    if (!query) {
        return {
            binding: candidates[0] ?? null,
            suggestions: candidates.slice(0, 5),
        };
    }
    const ranked = candidates
        .map((binding) => ({
        binding,
        score: scoreWorkflowBinding(binding, query),
    }))
        .sort((left, right) => right.score - left.score);
    const top = ranked[0];
    if (!top || top.score <= 0) {
        return {
            binding: null,
            suggestions: ranked.slice(0, 5).map((item) => item.binding),
        };
    }
    return {
        binding: top.binding,
        suggestions: ranked.slice(0, 5).map((item) => item.binding),
    };
}
function formatSuggestions(suggestions) {
    if (suggestions.length === 0) {
        return "No workflow suggestions available.";
    }
    return suggestions
        .map((binding) => `- ${binding.agent.id}/${binding.skill.id}/${binding.workflow.id}: ${binding.workflow.title}`)
        .join("\n");
}
function buildWorkflowPrompt(binding) {
    const stepList = binding.workflow.steps
        .map((step) => `${step.stepNumber}. ${step.title} — ${step.actionInstruction}`)
        .join("\n");
    return [
        composeSystemPrompt(binding.agent),
        "# Active Skill",
        `Skill: ${binding.skill.name} (${binding.skill.id})`,
        `Purpose: ${binding.skill.purpose}`,
        binding.skill.toolUsage.length > 0
            ? `Declared tool usage:\n${binding.skill.toolUsage.map((item) => `- ${item}`).join("\n")}`
            : "",
        "# Active Workflow",
        `Workflow: ${binding.workflow.title} (${binding.workflow.id})`,
        `Objective: ${binding.workflow.objective}`,
        `Trigger: ${binding.workflow.trigger}`,
        `Main output: ${binding.workflow.mainOutput}`,
        binding.workflow.steps.length > 0 ? `Steps:\n${stepList}` : "",
        "# Workflow Discipline",
        "Execute the active workflow faithfully, one step at a time.",
        "Prefer registered tools over invention whenever a step calls for real-time or deterministic data.",
        "Preserve machine-readable context between steps when the task contract asks for it.",
    ]
        .filter(Boolean)
        .join("\n\n");
}
function deriveAllowedTools(binding) {
    const knownTools = new Set(getToolNames());
    const allowed = new Set(binding.agent.allowedTools);
    const searchableTexts = [
        ...binding.skill.toolUsage,
        ...binding.workflow.steps.map((step) => step.actionInstruction),
    ];
    for (const text of searchableTexts) {
        for (const toolName of knownTools) {
            if (text.includes(toolName)) {
                allowed.add(toolName);
            }
        }
    }
    return [...allowed];
}
function extractArgumentName(actionInstruction, fnName) {
    const match = actionInstruction.match(new RegExp(`${fnName}\\(([^)]+)\\)`, "i"));
    const raw = match?.[1]?.trim();
    return raw ? raw.replace(/[{}'"]/g, "").trim() : null;
}
function inferTimeOfDay(now) {
    const hour = now.getHours();
    if (hour < 6) {
        return "night";
    }
    if (hour < 12) {
        return "morning";
    }
    if (hour < 18) {
        return "afternoon";
    }
    return "evening";
}
function inferTimezone(actionInstruction, context) {
    const literalMatch = actionInstruction.match(/timezone:\s*['"]([^'"]+)['"]/i);
    if (literalMatch?.[1]) {
        return literalMatch[1];
    }
    return (context.resolvedTimezone
        || context.requestedTimezone
        || context.timezoneUsed
        || context.timezone
        || "UTC");
}
async function executeKnownMechanicalStep(step, context) {
    const action = step.actionInstruction;
    const actionLower = action.toLowerCase();
    const titleLower = step.title.toLowerCase();
    if (actionLower.includes("sanitizeinput")) {
        const sourceKey = extractArgumentName(action, "sanitizeInput");
        const sourceValue = (sourceKey ? context[sourceKey] : "")
            || context.userMessage
            || context.task
            || context.previousOutput
            || "";
        const sanitized = sanitizeInput(sourceValue);
        if (!sanitized.safe || !sanitized.cleaned.trim()) {
            throw new Error(sanitized.reason || "Sanitized input is empty");
        }
        return {
            output: sanitized.cleaned,
            contextPatch: {
                cleanedMessage: sanitized.cleaned,
                userMessage: sanitized.cleaned,
                safe: String(sanitized.safe),
            },
            handoff: null,
        };
    }
    if (titleLower.includes("detect greeting context")) {
        const currentTime = await executeTool("get_current_time", { timezone: "UTC" });
        const sessionType = context.conversationHistory ? "returning_user" : "new_session";
        return {
            output: `timeOfDay=${inferTimeOfDay(new Date())}; sessionType=${sessionType}`,
            contextPatch: {
                currentTime,
                timeOfDay: inferTimeOfDay(new Date()),
                sessionType,
            },
            handoff: null,
        };
    }
    if (actionLower.includes("get_current_time")) {
        const timezone = inferTimezone(action, context);
        const currentTime = await executeTool("get_current_time", { timezone });
        if (actionLower.includes("for each timezone in the list")) {
            const rawList = context.timezoneList
                || context.resolvedTimezones
                || context.requestedTimezone
                || "";
            const timezones = rawList
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
            if (timezones.length > 0) {
                const entries = await Promise.all(timezones.map(async (item) => `${item}: ${await executeTool("get_current_time", { timezone: item })}`));
                const joined = entries.join("\n");
                return {
                    output: joined,
                    contextPatch: {
                        timezoneTimes: joined,
                        timezoneList: timezones.join(", "),
                    },
                    handoff: null,
                };
            }
        }
        return {
            output: currentTime,
            contextPatch: {
                currentTime,
                timestamp: currentTime,
                rawTimestamp: currentTime,
                resolvedTimezone: timezone,
                timezoneUsed: timezone,
            },
            handoff: null,
        };
    }
    if (actionLower.includes("validateoutput")) {
        const sourceKey = extractArgumentName(action, "validateOutput");
        const sourceValue = (sourceKey ? context[sourceKey] : "")
            || context.formattedResponse
            || context.response
            || context.answer
            || context.question
            || context.previousOutput
            || "";
        const validated = validateOutput(sourceValue);
        if (!validated.safe) {
            logger.warn("Workflow mechanical validateOutput flagged warnings", {
                stepTitle: step.title,
                warnings: validated.warnings,
            });
        }
        const contextPatch = {
            validatedResponse: validated.cleaned,
            response: validated.cleaned,
        };
        if (sourceKey) {
            contextPatch[sourceKey] = validated.cleaned;
        }
        if (context.formattedResponse || sourceKey === "formattedResponse") {
            contextPatch.formattedResponse = validated.cleaned;
        }
        if (context.answer || sourceKey === "answer") {
            contextPatch.answer = validated.cleaned;
        }
        if (context.question || sourceKey === "question") {
            contextPatch.question = validated.cleaned;
        }
        return {
            output: validated.cleaned,
            contextPatch,
            handoff: null,
        };
    }
    return null;
}
export function getWorkflowExecutionDefinition(ecosystem) {
    const workflowCount = collectWorkflowBindings(ecosystem).length;
    return {
        type: "function",
        function: {
            name: "execute_workflow",
            description: "Execute a hydrated skill workflow from the Pristino ecosystem. " +
                "Use this when the task matches a structured skill workflow and you want the runtime to run it step-by-step with the owning agent. " +
                `There are currently ${workflowCount} workflows loaded. ` +
                "You may provide exact agent/skill/workflow ids, or omit them and provide a natural-language task so the executor resolves the closest workflow.",
            parameters: {
                type: "object",
                properties: {
                    task: {
                        type: "string",
                        description: "Natural-language request or the task the workflow should fulfill.",
                    },
                    agent: {
                        type: "string",
                        description: "Optional exact agent id to constrain workflow resolution.",
                    },
                    skill: {
                        type: "string",
                        description: "Optional exact skill id to constrain workflow resolution.",
                    },
                    workflow: {
                        type: "string",
                        description: "Optional exact workflow id to run.",
                    },
                    context: {
                        type: "object",
                        description: "Optional string context map seeded into the workflow, e.g. userMessage, requestedTimezone, or topic.",
                        properties: {},
                        required: [],
                    },
                },
                required: ["task"],
            },
        },
    };
}
export function createWorkflowExecutor(ecosystem, runner) {
    return async (args) => {
        const task = toStringValue(args.task);
        const agentId = toStringValue(args.agent) || undefined;
        const skillId = toStringValue(args.skill) || undefined;
        const workflowId = toStringValue(args.workflow) || undefined;
        const initialContext = normalizeContext(args.context);
        const { binding, suggestions } = resolveWorkflowBinding(ecosystem, {
            agentId,
            skillId,
            workflowId,
            query: task,
        });
        if (!binding) {
            return [
                "Error: Could not resolve a workflow for the requested task.",
                "Closest matches:",
                formatSuggestions(suggestions),
            ].join("\n");
        }
        const workflowPrompt = buildWorkflowPrompt(binding);
        const allowedTools = deriveAllowedTools(binding);
        const seededContext = {
            task,
            userMessage: initialContext.userMessage || task,
            ...initialContext,
        };
        logger.info("Workflow execution resolved", {
            agentId: binding.agent.id,
            skillId: binding.skill.id,
            workflowId: binding.workflow.id,
            allowedTools,
        });
        const workflowRunner = (stepTask, stepPrompt, stepAllowedTools) => {
            const mergedTools = Array.from(new Set([...allowedTools, ...stepAllowedTools]));
            const systemPrompt = [workflowPrompt, stepPrompt].filter(Boolean).join("\n\n");
            return runner(stepTask, systemPrompt, mergedTools);
        };
        const result = await executeWorkflowDetailed(workflowRunner, binding.workflow, seededContext, {
            allowedTools,
            executeMechanicalStep: executeKnownMechanicalStep,
        });
        if (result.handoff) {
            return [
                `Workflow handoff requested: ${result.handoff}`,
                "",
                result.output,
            ].join("\n");
        }
        return result.output;
    };
}
