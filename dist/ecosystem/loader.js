// ============================================================================
// Ecosystem Loader — Capa 1
// Parses agent.md (YAML frontmatter + Markdown body), prompts, and skills.
// No external YAML dependency — uses regex for frontmatter parsing.
// ============================================================================
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { logger } from "../logger.js";
// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------
/** Parse YAML frontmatter from a markdown file into key-value pairs. */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match)
        return { meta: {}, body: content };
    const meta = {};
    for (const line of match[1].split("\n")) {
        const idx = line.indexOf(":");
        if (idx > 0) {
            const key = line.slice(0, idx).trim();
            const val = line
                .slice(idx + 1)
                .trim()
                .replace(/^["']|["']$/g, "");
            meta[key] = val;
        }
    }
    return { meta, body: match[2] };
}
/** Extract a section's content from markdown body by heading name. */
function extractSection(body, heading) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^#\\s+${escaped}\\s*$`, "im");
    const match = body.match(regex);
    if (!match || match.index === undefined)
        return "";
    const start = match.index + match[0].length;
    const nextHeading = body.slice(start).search(/^#\s+/m);
    const section = nextHeading >= 0
        ? body.slice(start, start + nextHeading)
        : body.slice(start);
    return section.trim();
}
/** Extract a bulleted list (lines starting with "- ") from a section. */
function extractList(section) {
    return section
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => line.slice(2).trim());
}
/** Extract a bulleted list, returning undefined if section is absent. */
function extractListOrUndef(body, heading) {
    const section = extractSection(body, heading);
    if (!section)
        return undefined;
    const list = extractList(section);
    return list.length > 0 ? list : undefined;
}
// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
const REQUIRED_STRING_FIELDS = [
    "id", "name", "role", "mission", "memoryPolicy", "securityPolicy",
    "orchestrationPolicy", "delegationRules", "escalationRules",
    "toneOutputStyle", "validationDiscipline", "failureHandling", "completionCriteria",
];
const REQUIRED_ARRAY_FIELDS = [
    "mandate", "scope", "nonGoals", "inputs", "outputs",
    "decisionRights", "allowedTools",
];
/** Validate an agent definition. Returns list of issues (empty = valid). */
function validateAgentDefinition(agent) {
    const errors = [];
    for (const f of REQUIRED_STRING_FIELDS) {
        if (!agent[f])
            errors.push(`Empty field: ${f}`);
    }
    for (const f of REQUIRED_ARRAY_FIELDS) {
        const arr = agent[f];
        if (!arr || arr.length === 0)
            errors.push(`Empty array: ${f}`);
    }
    return errors;
}
// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
/** Load a single agent definition from its agent.md file. */
export function loadAgent(agentsPath, agentId) {
    const agentMdPath = join(agentsPath, agentId, "agent.md");
    if (!existsSync(agentMdPath)) {
        logger.warn("Agent definition not found", { agentId, path: agentMdPath });
        return null;
    }
    const content = readFileSync(agentMdPath, "utf-8");
    const { meta, body } = parseFrontmatter(content);
    return {
        id: meta.id ?? agentId,
        name: meta.name ?? agentId,
        role: meta.role ?? "",
        version: meta.version ?? "1.0.0",
        mission: extractSection(body, "Mission"),
        mandate: extractList(extractSection(body, "Mandate")),
        scope: extractList(extractSection(body, "Scope")),
        nonGoals: extractList(extractSection(body, "Non-Goals")),
        inputs: extractList(extractSection(body, "Inputs")),
        outputs: extractList(extractSection(body, "Outputs")),
        decisionRights: extractList(extractSection(body, "Decision Rights")),
        allowedTools: extractList(extractSection(body, "Allowed Tools")),
        forbiddenTools: extractList(extractSection(body, "Forbidden Tools")),
        memoryPolicy: extractSection(body, "Memory Policy"),
        securityPolicy: extractSection(body, "Security Policy"),
        orchestrationPolicy: extractSection(body, "Orchestration Policy"),
        delegationRules: extractSection(body, "Delegation Rules"),
        escalationRules: extractSection(body, "Escalation Rules"),
        toneOutputStyle: extractSection(body, "Tone / Output Style"),
        validationDiscipline: extractSection(body, "Validation Discipline"),
        failureHandling: extractSection(body, "Failure Handling"),
        completionCriteria: extractSection(body, "Completion Criteria"),
        // v3.1 optional enrichment sections
        assumptions: extractListOrUndef(body, "Assumptions"),
        acceptanceCriteria: extractListOrUndef(body, "Acceptance Criteria"),
        explicitLimits: extractListOrUndef(body, "Explicit Limits"),
        tradeoffRationale: extractListOrUndef(body, "Trade-off Rationale"),
        edgeCases: extractListOrUndef(body, "Edge Cases"),
    };
}
/** Load a prompt file for a specific agent and prompt type. */
export function loadPrompt(agentsPath, agentId, promptType) {
    const promptPath = join(agentsPath, agentId, "prompts", `${promptType}.md`);
    if (!existsSync(promptPath))
        return "";
    return readFileSync(promptPath, "utf-8");
}
let cachedDefaults = null;
/** Load shared defaults from _shared/defaults.yaml. Cached after first load. */
export function loadSharedDefaults(agentsPath) {
    if (cachedDefaults)
        return cachedDefaults;
    const defaultsPath = join(agentsPath, "_shared", "defaults.yaml");
    const fallback = {
        securityValidations: [
            "CP1: sanitizeInput() on all user-facing text",
            "CP2: buildSecurePrompt() on all system prompts",
            "CP3: validateOutput() on all LLM responses",
        ],
        defaultObservabilityEvents: [],
        defaultFailureHandling: [],
    };
    if (!existsSync(defaultsPath)) {
        cachedDefaults = fallback;
        return fallback;
    }
    try {
        const content = readFileSync(defaultsPath, "utf-8");
        // Simple YAML list extraction (no external dependency)
        const extractYamlList = (key) => {
            const regex = new RegExp(`^${key}:\\s*$`, "m");
            const match = content.match(regex);
            if (!match || match.index === undefined)
                return [];
            const start = match.index + match[0].length;
            const lines = content.slice(start).split("\n");
            const items = [];
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith("- ")) {
                    items.push(trimmed.slice(2).replace(/^["']|["']$/g, ""));
                }
                else if (trimmed && !trimmed.startsWith("#")) {
                    break; // next key
                }
            }
            return items;
        };
        cachedDefaults = {
            securityValidations: extractYamlList("securityValidations") || fallback.securityValidations,
            defaultObservabilityEvents: extractYamlList("defaultObservabilityEvents"),
            defaultFailureHandling: extractYamlList("defaultFailureHandling"),
        };
        logger.info("Loaded shared defaults", { path: defaultsPath });
        return cachedDefaults;
    }
    catch (err) {
        logger.warn("Failed to load shared defaults, using fallback", { error: err });
        cachedDefaults = fallback;
        return fallback;
    }
}
/** Load all agent definitions from the agents directory. */
export function loadAllAgents(agentsPath) {
    const state = {
        agents: new Map(),
        skills: new Map(),
        initialized: false,
    };
    if (!existsSync(agentsPath)) {
        logger.warn("Agents directory not found", { agentsPath });
        return state;
    }
    const dirs = readdirSync(agentsPath, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    for (const dir of dirs) {
        if (dir.startsWith("_"))
            continue; // skip _shared and other meta-dirs
        const agent = loadAgent(agentsPath, dir);
        if (agent) {
            // Validate but don't crash — graceful degradation
            const issues = validateAgentDefinition(agent);
            if (issues.length > 0) {
                logger.warn("Agent definition has issues", {
                    agentId: agent.id,
                    issues,
                });
            }
            state.agents.set(agent.id, agent);
            logger.info("Loaded agent definition", {
                agentId: agent.id,
                name: agent.name,
            });
        }
    }
    // Pre-load shared defaults (cached for skill loading)
    loadSharedDefaults(agentsPath);
    state.initialized = state.agents.size > 0;
    logger.info("Ecosystem loaded", { agentCount: state.agents.size });
    return state;
}
