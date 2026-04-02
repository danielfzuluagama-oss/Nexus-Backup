import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Server } from "http";
import type { Config } from "./config.js";
import type { AgentRuntime } from "./runtime.js";
import type { EcosystemState } from "./ecosystem/types.js";
import type { ProviderTelemetrySnapshot } from "./config/llm-providers.js";
import { getToolNames } from "./tools/registry.js";
import { getSubAgents } from "./tools/delegate.js";
import { getOperationalKnowledgeAccessor } from "./knowledge/accessor.js";
import { getOperationalKnowledgeStore } from "./knowledge/operational-store.js";
import { getGitHubProposalsConfig } from "./proposals/github-publisher.js";

interface ServiceStatusContext {
  bots: Map<string, unknown>;
  runtimes: AgentRuntime[];
  pollingStarted: boolean;
  server: Server | null;
  webhooksConfigured: boolean;
  config: Config;
  ecosystem: EcosystemState;
}

interface ProposalFlowStatus {
  overallStatus: "ready" | "degraded" | "blocked";
  draftingReady: boolean;
  htmlValidationEnabled: boolean;
  telegramFallbackEnabled: boolean;
  githubPublishingConfigured: boolean;
  publicLinkVerificationEnabled: boolean;
  smokeScriptAvailable: boolean;
  templateAssetAvailable: boolean;
  renderSafeguardsReady: boolean;
  issues: string[];
}

export interface ServiceStatusReport {
  ok: true;
  generatedAt: string;
  mode: "server" | "local";
  bots: string[];
  pollingStarted: boolean;
  webhooksConfigured: boolean;
  toolNames: string[];
  subAgentNames: string[];
  ecosystem: {
    initialized: boolean;
    agentCount: number;
    totalSkillCount: number;
    agents: Array<{
      id: string;
      name: string;
      allowedToolsCount: number;
    }>;
    skillsByAgent: Array<{
      agentId: string;
      skillCount: number;
      skillIds: string[];
    }>;
  };
  providers: {
    override: Config["llmProviderOverride"];
    geminiFallbackEnabled: boolean;
    googleOAuthConnected: boolean;
    runtimes: Array<{
      agentName: string;
      configuredKeys: {
        groq: number;
        gemini: number;
        openRouter: number;
      };
      telemetry: ProviderTelemetrySnapshot | null;
    }>;
  };
  knowledgeBase: {
    source: "local" | "firestore";
    firestoreAvailable: boolean;
    syncedToFirestore: boolean;
    report: Awaited<ReturnType<Awaited<ReturnType<typeof getOperationalKnowledgeAccessor>>["getReport"]>>;
  };
  githubPublishing: {
    configured: boolean;
    hasToken: boolean;
    hasSshKey: boolean;
    owner: string | null;
    repo: string | null;
    branch: string | null;
    pagesBaseUrl: string | null;
  };
  proposalFlow: ProposalFlowStatus;
}

function nowIso(): string {
  return new Date().toISOString();
}

function resolveRuntimeMode(server: Server | null): "server" | "local" {
  if (
    server
    || Boolean(process.env.PORT)
    || Boolean(process.env.FUNCTION_TARGET)
    || Boolean(process.env.K_SERVICE)
  ) {
    return "server";
  }

  return "local";
}

function getConfiguredKeyCount(keys: unknown): number {
  return Array.isArray(keys) ? keys.length : 0;
}

function getEcosystemAgents(ecosystem: EcosystemState): Array<{
  id: string;
  name: string;
  allowedToolsCount: number;
}> {
  const agentsMap = ecosystem.agents instanceof Map ? ecosystem.agents : new Map();

  return [...agentsMap.values()]
    .map((agent) => ({
      id: agent.id,
      name: agent.name,
      allowedToolsCount: Array.isArray(agent.allowedTools) ? agent.allowedTools.length : 0,
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
}

function getSkillsByAgent(ecosystem: EcosystemState): Array<{
  agentId: string;
  skillCount: number;
  skillIds: string[];
}> {
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

function hasSkill(ecosystem: EcosystemState, agentId: string, skillId: string): boolean {
  const skillsMap = ecosystem.skills instanceof Map ? ecosystem.skills : new Map();
  const skills = skillsMap.get(agentId) ?? [];
  if (!Array.isArray(skills)) {
    return false;
  }
  return skills.some((skill: { id: string }) => skill.id === skillId);
}

function hasSmokeProposalPublishingScript(): boolean {
  const candidates = [
    path.resolve(process.cwd(), "src/scripts/smoke-proposal-publishing.ts"),
    path.resolve(process.cwd(), "dist/scripts/smoke-proposal-publishing.js"),
  ];

  return candidates.some((candidate) => existsSync(candidate));
}

const COMMERCIAL_PROPOSAL_TEMPLATE_FILE = "commercial-proposal-template.html";

function resolveProposalTemplateAssetPath(): string | null {
  const candidates = [
    path.resolve(
      process.cwd(),
      "dist/proposals/template-package",
      COMMERCIAL_PROPOSAL_TEMPLATE_FILE,
    ),
    path.resolve(
      process.cwd(),
      "src/proposals/template-package",
      COMMERCIAL_PROPOSAL_TEMPLATE_FILE,
    ),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function hasVisibleRevealDefaults(templateHtml: string): boolean {
  return /\.reveal\s*\{[\s\S]*?opacity:\s*1\s*;[\s\S]*?transform:\s*none\s*;/m.test(templateHtml);
}

function hasGuardedLucideRenderer(templateHtml: string): boolean {
  return (
    /function\s+renderIcons\s*\(/.test(templateHtml)
    && /typeof\s+lucide\s*!==\s*['"]undefined['"]/.test(templateHtml)
    && /typeof\s+lucide\.createIcons\s*===\s*['"]function['"]/.test(templateHtml)
  );
}

function hasIntersectionObserverGuard(templateHtml: string): boolean {
  return /typeof\s+IntersectionObserver\s*===\s*['"]undefined['"]/.test(templateHtml);
}

function evaluateProposalTemplateReadiness(): {
  templateAssetAvailable: boolean;
  renderSafeguardsReady: boolean;
} {
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

function buildProposalFlowStatus(
  ecosystem: EcosystemState,
  githubConfigured: boolean,
): ProposalFlowStatus {
  const salesArchitectReady = hasSkill(ecosystem, "pristino-orchestrator", "sales-architect");
  const smokeScriptAvailable = hasSmokeProposalPublishingScript();
  const {
    templateAssetAvailable,
    renderSafeguardsReady,
  } = evaluateProposalTemplateReadiness();
  const issues: string[] = [];

  if (!ecosystem.initialized) {
    issues.push("Ecosystem is not initialized");
  }
  if (!salesArchitectReady) {
    issues.push("sales-architect skill missing from pristino-orchestrator");
  }
  if (!templateAssetAvailable) {
    issues.push("Commercial proposal template asset is missing");
  } else if (!renderSafeguardsReady) {
    issues.push("Commercial proposal template is missing render safety guards");
  }
  if (!githubConfigured) {
    issues.push("GitHub proposal publishing is not configured in the current runtime");
  }
  if (!smokeScriptAvailable) {
    issues.push("Proposal publishing smoke script is not available");
  }

  return {
    overallStatus:
      !ecosystem.initialized || !salesArchitectReady || !templateAssetAvailable
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

export async function buildServiceStatus(context: ServiceStatusContext): Promise<ServiceStatusReport> {
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
  };
}
