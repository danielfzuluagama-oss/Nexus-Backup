import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { getToolNames } from "./tools/registry.js";
import { getSubAgents } from "./tools/delegate.js";
import { getOperationalKnowledgeAccessor } from "./knowledge/accessor.js";
import { getOperationalKnowledgeStore } from "./knowledge/operational-store.js";
import { getGitHubProposalsConfig } from "./proposals/github-publisher.js";
import { getWebSearchIssues, resolveActiveWebSearchProvider, } from "./web-search.js";
function nowIso() {
    return new Date().toISOString();
}
function resolveRuntimeMode(server) {
    if (server
        || Boolean(process.env.PORT)
        || Boolean(process.env.FUNCTION_TARGET)
        || Boolean(process.env.K_SERVICE)) {
        return "server";
    }
    return "local";
}
function getConfiguredKeyCount(keys) {
    return Array.isArray(keys) ? keys.length : 0;
}
function getEcosystemAgents(ecosystem) {
    const agentsMap = ecosystem.agents instanceof Map ? ecosystem.agents : new Map();
    return [...agentsMap.values()]
        .map((agent) => ({
        id: agent.id,
        name: agent.name,
        allowedToolsCount: Array.isArray(agent.allowedTools) ? agent.allowedTools.length : 0,
    }))
        .sort((left, right) => left.id.localeCompare(right.id));
}
function getSkillsByAgent(ecosystem) {
    const skillsMap = ecosystem.skills instanceof Map ? ecosystem.skills : new Map();
    return [...skillsMap.entries()]
        .map(([agentId, skills]) => ({
        agentId,
        skillCount: Array.isArray(skills) ? skills.length : 0,
        skillIds: (Array.isArray(skills) ? skills : [])
            .map((skill) => skill.id)
            .sort((left, right) => left.localeCompare(right)),
    }))
        .sort((left, right) => left.agentId.localeCompare(right.agentId));
}
function getTotalWorkflowCount(ecosystem) {
    const skillsMap = ecosystem.skills instanceof Map ? ecosystem.skills : new Map();
    return [...skillsMap.values()].reduce((total, skills) => {
        if (!Array.isArray(skills)) {
            return total;
        }
        return total + skills.reduce((skillTotal, skill) => {
            const workflowCount = Array.isArray(skill.workflows) ? skill.workflows.length : 0;
            return skillTotal + workflowCount;
        }, 0);
    }, 0);
}
function hasSkill(ecosystem, agentId, skillId) {
    const skillsMap = ecosystem.skills instanceof Map ? ecosystem.skills : new Map();
    const skills = skillsMap.get(agentId) ?? [];
    if (!Array.isArray(skills)) {
        return false;
    }
    return skills.some((skill) => skill.id === skillId);
}
function hasSmokeProposalPublishingScript() {
    const candidates = [
        path.resolve(process.cwd(), "src/scripts/smoke-proposal-publishing.ts"),
        path.resolve(process.cwd(), "dist/scripts/smoke-proposal-publishing.js"),
    ];
    return candidates.some((candidate) => existsSync(candidate));
}
const COMMERCIAL_PROPOSAL_TEMPLATE_FILE = "commercial-proposal-template.html";
function resolveProposalTemplateAssetPath() {
    const candidates = [
        path.resolve(process.cwd(), "dist/proposals/template-package", COMMERCIAL_PROPOSAL_TEMPLATE_FILE),
        path.resolve(process.cwd(), "src/proposals/template-package", COMMERCIAL_PROPOSAL_TEMPLATE_FILE),
    ];
    return candidates.find((candidate) => existsSync(candidate)) ?? null;
}
function hasVisibleRevealDefaults(templateHtml) {
    return /\.reveal\s*\{[\s\S]*?opacity:\s*1\s*;[\s\S]*?transform:\s*none\s*;/m.test(templateHtml);
}
function hasGuardedLucideRenderer(templateHtml) {
    return (/function\s+renderIcons\s*\(/.test(templateHtml)
        && /typeof\s+lucide\s*!==\s*['"]undefined['"]/.test(templateHtml)
        && /typeof\s+lucide\.createIcons\s*===\s*['"]function['"]/.test(templateHtml));
}
function hasIntersectionObserverGuard(templateHtml) {
    return /typeof\s+IntersectionObserver\s*===\s*['"]undefined['"]/.test(templateHtml);
}
function evaluateProposalTemplateReadiness() {
    const templatePath = resolveProposalTemplateAssetPath();
    if (!templatePath) {
        return {
            templateAssetAvailable: false,
            renderSafeguardsReady: false,
        };
    }
    const templateHtml = readFileSync(templatePath, "utf8");
    const renderSafeguardsReady = hasVisibleRevealDefaults(templateHtml)
        && hasGuardedLucideRenderer(templateHtml)
        && hasIntersectionObserverGuard(templateHtml);
    return {
        templateAssetAvailable: true,
        renderSafeguardsReady,
    };
}
function buildProposalFlowStatus(ecosystem, githubConfigured) {
    const salesArchitectReady = hasSkill(ecosystem, "pristino-orchestrator", "sales-architect");
    const smokeScriptAvailable = hasSmokeProposalPublishingScript();
    const { templateAssetAvailable, renderSafeguardsReady, } = evaluateProposalTemplateReadiness();
    const issues = [];
    if (!ecosystem.initialized) {
        issues.push("Ecosystem is not initialized");
    }
    if (!salesArchitectReady) {
        issues.push("sales-architect skill missing from pristino-orchestrator");
    }
    if (!templateAssetAvailable) {
        issues.push("Commercial proposal template asset is missing");
    }
    else if (!renderSafeguardsReady) {
        issues.push("Commercial proposal template is missing render safety guards");
    }
    if (!githubConfigured) {
        issues.push("GitHub proposal publishing is not configured in the current runtime");
    }
    if (!smokeScriptAvailable) {
        issues.push("Proposal publishing smoke script is not available");
    }
    return {
        overallStatus: !ecosystem.initialized || !salesArchitectReady || !templateAssetAvailable
            ? "blocked"
            : githubConfigured && smokeScriptAvailable && renderSafeguardsReady
                ? "ready"
                : "degraded",
        draftingReady: ecosystem.initialized && salesArchitectReady && templateAssetAvailable,
        htmlValidationEnabled: true,
        telegramFallbackEnabled: true,
        githubPublishingConfigured: githubConfigured,
        publicLinkVerificationEnabled: true,
        smokeScriptAvailable,
        templateAssetAvailable,
        renderSafeguardsReady,
        issues,
    };
}
function buildWebSearchStatus(context) {
    const toolNames = getToolNames();
    const toolRegistered = toolNames.includes("search_internet");
    const researcher = context.ecosystem.agents.get("researcher");
    const researcherReady = Array.isArray(researcher?.allowedTools)
        ? researcher.allowedTools.includes("search_internet")
        : false;
    const issues = getWebSearchIssues(context.config.webSearch);
    const activeProvider = resolveActiveWebSearchProvider(context.config.webSearch);
    if (!toolRegistered) {
        issues.push("search_internet tool is not registered in the runtime");
    }
    if (!researcherReady) {
        issues.push("researcher agent is not allowed to use search_internet");
    }
    const overallStatus = !context.config.webSearch.enabled || !toolRegistered || !researcherReady
        ? "blocked"
        : activeProvider
            ? "ready"
            : "degraded";
    return {
        overallStatus,
        enabled: context.config.webSearch.enabled,
        configuredProvider: context.config.webSearch.provider,
        activeProvider,
        toolRegistered,
        researcherReady,
        issues,
    };
}
export async function buildServiceStatus(context) {
    const operationalStore = getOperationalKnowledgeStore();
    const firestoreAvailable = operationalStore.isAvailable();
    const syncedToFirestore = firestoreAvailable
        ? await operationalStore.hasSyncedKnowledge().catch(() => false)
        : false;
    const kb = await getOperationalKnowledgeAccessor();
    const report = await kb.getReport();
    const githubConfig = getGitHubProposalsConfig();
    const agents = getEcosystemAgents(context.ecosystem);
    const skillsByAgent = getSkillsByAgent(context.ecosystem);
    const totalSkillCount = skillsByAgent.reduce((total, entry) => total + entry.skillCount, 0);
    const totalWorkflowCount = getTotalWorkflowCount(context.ecosystem);
    return {
        ok: true,
        generatedAt: nowIso(),
        mode: resolveRuntimeMode(context.server),
        bots: [...context.bots.keys()],
        pollingStarted: context.pollingStarted,
        webhooksConfigured: context.webhooksConfigured,
        toolNames: getToolNames().sort((left, right) => left.localeCompare(right)),
        subAgentNames: [...getSubAgents().keys()].sort((left, right) => left.localeCompare(right)),
        ecosystem: {
            initialized: context.ecosystem.initialized,
            agentCount: agents.length,
            totalSkillCount,
            totalWorkflowCount,
            agents,
            skillsByAgent,
        },
        providers: {
            override: context.config.llmProviderOverride,
            geminiFallbackEnabled: context.config.geminiFallbackEnabled,
            googleOAuthConnected: Boolean(context.config.googleOAuthToken),
            runtimes: context.runtimes
                .map((runtime) => ({
                agentName: runtime.instanceName,
                configuredKeys: {
                    groq: getConfiguredKeyCount(runtime.credentials.groqApiKeys),
                    gemini: getConfiguredKeyCount(runtime.credentials.geminiApiKeys),
                    openRouter: getConfiguredKeyCount(runtime.credentials.openRouterApiKeys),
                },
                telemetry: runtime.llm.getTelemetrySnapshot?.() ?? null,
            }))
                .sort((left, right) => left.agentName.localeCompare(right.agentName)),
        },
        knowledgeBase: {
            source: syncedToFirestore ? "firestore" : "local",
            firestoreAvailable,
            syncedToFirestore,
            report,
        },
        githubPublishing: {
            configured: Boolean(githubConfig),
            hasToken: Boolean(githubConfig?.token),
            hasSshKey: Boolean(githubConfig?.sshKey),
            owner: githubConfig?.owner ?? null,
            repo: githubConfig?.repo ?? null,
            branch: githubConfig?.branch ?? null,
            pagesBaseUrl: githubConfig?.pagesBaseUrl ?? null,
        },
        proposalFlow: buildProposalFlowStatus(context.ecosystem, Boolean(githubConfig)),
        webSearch: buildWebSearchStatus(context),
    };
}
