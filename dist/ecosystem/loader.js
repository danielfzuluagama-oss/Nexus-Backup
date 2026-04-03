// ============================================================================
// Ecosystem Loader — Capa 1
// Parses agent.md (YAML frontmatter + Markdown body), prompts, and skills.
// No external YAML dependency — uses regex for frontmatter parsing.
// ============================================================================
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import { WorkflowDefinitionSchema } from "./types.js";
import { logger } from "../logger.js";
import { composeSkillPrompt } from "./skill-composer.js";
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
function toStringValue(value) {
    if (typeof value === "string") {
        return value.trim();
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return "";
}
function toStringArray(value) {
    if (Array.isArray(value)) {
        return value.flatMap((item) => {
            if (typeof item === "string") {
                const trimmed = item.trim();
                return trimmed ? [trimmed] : [];
            }
            if (item && typeof item === "object") {
                const record = item;
                if (typeof record.pattern === "string") {
                    const trimmed = record.pattern.trim();
                    return trimmed ? [trimmed] : [];
                }
                if (Array.isArray(record.keywords)) {
                    return record.keywords.flatMap((keyword) => toStringArray(keyword));
                }
            }
            return [];
        });
    }
    const text = toStringValue(value);
    return text ? [text] : [];
}
function toStringArrayFromObject(value, keys) {
    if (!value || typeof value !== "object") {
        return [];
    }
    const record = value;
    for (const key of keys) {
        const candidate = record[key];
        if (candidate !== undefined) {
            return toStringArray(candidate);
        }
    }
    return [];
}
function isRecord(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
function toNullableStringValue(value) {
    const text = toStringValue(value);
    if (!text) {
        return null;
    }
    const normalized = text.toLowerCase();
    if (normalized === "null" || normalized === "none" || normalized === "n/a") {
        return null;
    }
    if (normalized.includes("mechanical step")) {
        return null;
    }
    return text;
}
function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
function normalizeKpis(value) {
    if (Array.isArray(value)) {
        const entries = value.flatMap((item) => {
            const text = toStringValue(item);
            if (!text) {
                return [];
            }
            const separatorIndex = text.indexOf(":");
            if (separatorIndex <= 0) {
                return [[text, ""]];
            }
            const key = text.slice(0, separatorIndex).trim();
            const metric = text.slice(separatorIndex + 1).trim();
            return key ? [[key, metric]] : [];
        });
        return Object.fromEntries(entries);
    }
    if (!isRecord(value)) {
        return {};
    }
    return Object.fromEntries(Object.entries(value)
        .map(([key, metric]) => [key.trim(), toStringValue(metric)])
        .filter(([key, metric]) => key.length > 0 && metric.length > 0));
}
function normalizeRaciAssignment(value, fallbackResponsible) {
    if (!isRecord(value)) {
        return {
            responsible: fallbackResponsible,
            accountable: fallbackResponsible,
            consulted: null,
            informed: "logger",
        };
    }
    const consultedRaw = value.consulted;
    const consultedValues = Array.isArray(consultedRaw)
        ? toStringArray(consultedRaw)
        : [];
    const consultedString = Array.isArray(consultedRaw)
        ? consultedValues.join(", ")
        : toNullableStringValue(consultedRaw);
    const consulted = consultedString && consultedString.toLowerCase() !== "none"
        ? consultedString
        : null;
    return {
        responsible: toStringValue(value.responsible) || fallbackResponsible,
        accountable: toStringValue(value.accountable) || fallbackResponsible,
        consulted,
        informed: toStringValue(value.informed) || "logger",
    };
}
function normalizeStepDefinition(value, index) {
    if (typeof value === "string") {
        return {
            stepNumber: index + 1,
            title: `Step ${index + 1}`,
            desc: value,
            whyThisMatters: "",
            inputNeeded: "",
            actionInstruction: value,
            promptToUse: null,
            expectedOutput: "",
            validationRule: "",
            failureSignal: "",
            recoveryAction: "",
            handoffIfNeeded: null,
        };
    }
    const record = isRecord(value) ? value : {};
    const parsedStepNumber = Number(record.stepNumber);
    const stepNumber = Number.isFinite(parsedStepNumber) && parsedStepNumber > 0
        ? parsedStepNumber
        : index + 1;
    return {
        stepNumber,
        title: toStringValue(record.title) || `Step ${stepNumber}`,
        desc: toStringValue(record.desc) || toStringValue(record.description),
        whyThisMatters: toStringValue(record.whyThisMatters),
        inputNeeded: toStringValue(record.inputNeeded),
        actionInstruction: toStringValue(record.actionInstruction),
        promptToUse: toNullableStringValue(record.promptToUse),
        expectedOutput: toStringValue(record.expectedOutput),
        validationRule: toStringValue(record.validationRule),
        failureSignal: toStringValue(record.failureSignal),
        recoveryAction: toStringValue(record.recoveryAction),
        handoffIfNeeded: toNullableStringValue(record.handoffIfNeeded),
    };
}
function normalizeWorkflowDefinition(value, agentId, skillId, index, implicitId) {
    if (!isRecord(value)) {
        return null;
    }
    const title = toStringValue(value.title)
        || toStringValue(value.name)
        || implicitId
        || `workflow-${index + 1}`;
    const workflowId = toStringValue(value.id)
        || implicitId
        || slugify(title)
        || `${skillId}-workflow-${index + 1}`;
    const workflow = {
        id: workflowId,
        title,
        objective: toStringValue(value.objective) || toStringValue(value.goal),
        trigger: toStringValue(value.trigger),
        preconditions: toStringArray(value.preconditions),
        inputs: toStringArray(value.inputs),
        steps: Array.isArray(value.steps)
            ? value.steps.map((step, stepIndex) => normalizeStepDefinition(step, stepIndex))
            : [],
        mainOutput: toStringValue(value.mainOutput)
            || toStringValue(value.output)
            || toStringValue(value.primaryOutput),
        secondaryOutputs: toStringArray(value.secondaryOutputs),
        dod: toStringArray(value.dod).concat(toStringArray(value.DoD)),
        qaChecklist: toStringArray(value.qaChecklist),
        raci: normalizeRaciAssignment(value.raci, agentId),
        kpis: normalizeKpis(value.kpis),
        cadence: toStringValue(value.cadence),
        errorHandling: toStringValue(value.errorHandling),
        fallbackRoute: toStringValue(value.fallbackRoute),
        escalationRoute: toStringValue(value.escalationRoute),
        designRationale: toStringValue(value.designRationale) || undefined,
        timeoutMs: Number.isFinite(Number(value.timeoutMs)) ? Number(value.timeoutMs) : undefined,
    };
    const parsed = WorkflowDefinitionSchema.safeParse(workflow);
    if (!parsed.success) {
        logger.warn("Workflow definition normalization failed, skipping workflow", {
            agentId,
            skillId,
            workflowId,
            issues: parsed.error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
        });
        return null;
    }
    return parsed.data;
}
function normalizeWorkflows(value, agentId, skillId) {
    if (Array.isArray(value)) {
        return value
            .map((workflow, index) => normalizeWorkflowDefinition(workflow, agentId, skillId, index))
            .filter((workflow) => workflow !== null);
    }
    if (!isRecord(value)) {
        return [];
    }
    return Object.entries(value)
        .map(([implicitId, workflow], index) => normalizeWorkflowDefinition(workflow, agentId, skillId, index, implicitId))
        .filter((workflow) => workflow !== null);
}
function normalizeSkillDefinition(agentId, skillId, skillSourcePath, content) {
    let parsed;
    try {
        parsed = parseYaml(content);
    }
    catch (error) {
        logger.warn("Skill definition YAML parse failed, loading raw fallback", {
            agentId,
            skillId,
            path: skillSourcePath,
            error,
        });
        const fallbackSkill = {
            id: skillId,
            name: skillId,
            purpose: "",
            businessValue: "",
            triggerTypes: [],
            owningAgent: agentId,
            inputs: [],
            outputs: [],
            dependencies: [],
            toolUsage: [],
            memoryReadsWrites: { reads: [], writes: [] },
            securityValidations: [],
            observabilityEvents: [],
            failureHandling: [],
            interoperabilityContract: { consumes: [], produces: [] },
            wowCriteria: [],
            safeCriteria: [],
            workflows: [],
            sourcePath: skillSourcePath,
            rawContent: content,
        };
        fallbackSkill.systemPrompt = composeSkillPrompt(fallbackSkill);
        return fallbackSkill;
    }
    if (!parsed || typeof parsed !== "object") {
        logger.warn("Skill definition could not be parsed, loading raw fallback", { agentId, skillId, path: skillSourcePath });
        const fallbackSkill = {
            id: skillId,
            name: skillId,
            purpose: "",
            businessValue: "",
            triggerTypes: [],
            owningAgent: agentId,
            inputs: [],
            outputs: [],
            dependencies: [],
            toolUsage: [],
            memoryReadsWrites: { reads: [], writes: [] },
            securityValidations: [],
            observabilityEvents: [],
            failureHandling: [],
            interoperabilityContract: { consumes: [], produces: [] },
            wowCriteria: [],
            safeCriteria: [],
            workflows: [],
            sourcePath: skillSourcePath,
            rawContent: content,
        };
        fallbackSkill.systemPrompt = composeSkillPrompt(fallbackSkill);
        return fallbackSkill;
    }
    const record = parsed;
    const dependenciesRaw = record.dependencies;
    const dependencies = dependenciesRaw && typeof dependenciesRaw === "object" && !Array.isArray(dependenciesRaw)
        ? toStringArrayFromObject(dependenciesRaw, ["skills", "agents", "modules"])
        : toStringArray(dependenciesRaw);
    const triggerTypes = toStringArray(record.triggerTypes)
        .concat(toStringArray(record.triggers))
        .filter(Boolean);
    const memoryReadsWritesRaw = record.memoryReadsWrites;
    const memoryReadsWrites = memoryReadsWritesRaw && typeof memoryReadsWritesRaw === "object"
        ? {
            reads: toStringArrayFromObject(memoryReadsWritesRaw, ["reads"]),
            writes: toStringArrayFromObject(memoryReadsWritesRaw, ["writes"]),
        }
        : { reads: [], writes: [] };
    const interoperabilityRaw = record.interoperabilityContract;
    const interoperabilityContract = interoperabilityRaw && typeof interoperabilityRaw === "object"
        ? {
            consumes: toStringArrayFromObject(interoperabilityRaw, ["consumes", "inputType", "inputs"]),
            produces: toStringArrayFromObject(interoperabilityRaw, ["produces", "outputType", "outputs"]),
        }
        : { consumes: [], produces: [] };
    const skill = {
        id: toStringValue(record.id) || skillId,
        name: toStringValue(record.name) || skillId,
        purpose: toStringValue(record.purpose) || toStringValue(record.description),
        businessValue: toStringValue(record.businessValue) || toStringValue(record.business_value),
        triggerTypes,
        owningAgent: toStringValue(record.owningAgent) || toStringValue(record.owner) || agentId,
        inputs: toStringArray(record.inputs),
        outputs: toStringArray(record.outputs),
        dependencies,
        toolUsage: toStringArray(record.toolUsage).concat(toStringArray(record.tools)),
        memoryReadsWrites,
        securityValidations: toStringArray(record.securityValidations),
        observabilityEvents: toStringArray(record.observabilityEvents),
        failureHandling: toStringArray(record.failureHandling),
        interoperabilityContract,
        wowCriteria: toStringArray(record.wowCriteria),
        safeCriteria: toStringArray(record.safeCriteria),
        workflows: normalizeWorkflows(record.workflows, agentId, skillId),
        sourcePath: skillSourcePath,
        rawContent: content,
    };
    skill.systemPrompt = composeSkillPrompt(skill);
    return skill;
}
function loadAgentSkills(agentsPath, agentId) {
    const skillRoot = join(agentsPath, agentId, "skills");
    if (!existsSync(skillRoot)) {
        return [];
    }
    const skillDirs = readdirSync(skillRoot, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."))
        .map((dirent) => dirent.name)
        .sort((a, b) => a.localeCompare(b));
    const skills = [];
    for (const skillId of skillDirs) {
        const skillPath = join(skillRoot, skillId, "skill.yaml");
        if (!existsSync(skillPath)) {
            continue;
        }
        try {
            const content = readFileSync(skillPath, "utf-8");
            const skill = normalizeSkillDefinition(agentId, skillId, skillPath, content);
            if (!skill) {
                continue;
            }
            skills.push(skill);
            logger.info("Loaded skill definition", {
                agentId,
                skillId: skill.id,
            });
        }
        catch (error) {
            logger.warn("Failed to load skill definition", {
                agentId,
                skillId,
                error,
            });
        }
    }
    return skills;
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
/** Load all skill definitions from each agent's skills directory. */
export function loadAllSkills(agentsPath) {
    const skillsByAgent = new Map();
    if (!existsSync(agentsPath)) {
        logger.warn("Agents directory not found while loading skills", { agentsPath });
        return skillsByAgent;
    }
    const dirs = readdirSync(agentsPath, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    for (const dir of dirs) {
        if (dir.startsWith("_"))
            continue;
        const agentSkills = loadAgentSkills(agentsPath, dir);
        if (agentSkills.length > 0) {
            skillsByAgent.set(dir, agentSkills);
        }
    }
    logger.info("Skill catalog loaded", {
        agentCount: skillsByAgent.size,
        skillCount: [...skillsByAgent.values()].reduce((total, items) => total + items.length, 0),
    });
    return skillsByAgent;
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
    state.skills = loadAllSkills(agentsPath);
    state.initialized = state.agents.size > 0;
    logger.info("Ecosystem loaded", { agentCount: state.agents.size });
    return state;
}
