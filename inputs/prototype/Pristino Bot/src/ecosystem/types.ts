// ============================================================================
// Ecosystem Type Definitions — Capa 1
// All interfaces for the Pristino agentic ecosystem.
// ============================================================================

/** Agent definition loaded from agent.md (21 mandatory + 4 optional fields). */
export interface AgentDefinition {
  id: string;
  name: string;
  role: string;
  version: string;
  mission: string;
  mandate: string[];
  scope: string[];
  nonGoals: string[];
  inputs: string[];
  outputs: string[];
  decisionRights: string[];
  allowedTools: string[];
  forbiddenTools: string[];
  memoryPolicy: string;
  securityPolicy: string;
  orchestrationPolicy: string;
  delegationRules: string;
  escalationRules: string;
  toneOutputStyle: string;
  validationDiscipline: string;
  failureHandling: string;
  completionCriteria: string;
  // v3.1 hardening — optional enrichment sections
  assumptions?: string[];
  acceptanceCriteria?: string[];
  explicitLimits?: string[];
  tradeoffRationale?: string[];
  edgeCases?: string[];
}

/** Skill definition from skill.yaml. */
export interface SkillDefinition {
  id: string;
  name: string;
  purpose: string;
  businessValue: string;
  triggerTypes: string[];
  owningAgent: string;
  inputs: string[];
  outputs: string[];
  dependencies: string[];
  toolUsage: string[];
  memoryReadsWrites: { reads: string[]; writes: string[] };
  securityValidations: string[];
  observabilityEvents: string[];
  failureHandling: string[];
  interoperabilityContract: { consumes: string[]; produces: string[] };
  wowCriteria: string[];
  safeCriteria: string[];
  workflows: WorkflowDefinition[];
}

/** Workflow definition (17 fields + optional v3.1 enrichments). */
export interface WorkflowDefinition {
  id: string;
  title: string;
  objective: string;
  trigger: string;
  preconditions: string[];
  inputs: string[];
  steps: StepDefinition[];
  mainOutput: string;
  secondaryOutputs: string[];
  dod: string[];
  qaChecklist: string[];
  raci: RaciAssignment;
  kpis: Record<string, string>;
  cadence: string;
  errorHandling: string;
  fallbackRoute: string;
  escalationRoute: string;
  // v3.1 hardening
  designRationale?: string;
  timeoutMs?: number;
}

/** RACI assignment for a workflow. */
export interface RaciAssignment {
  responsible: string;
  accountable: string;
  consulted: string | null;
  informed: string;
}

/** Step definition (12 mandatory fields). */
export interface StepDefinition {
  stepNumber: number;
  title: string;
  desc: string;
  whyThisMatters: string;
  inputNeeded: string;
  actionInstruction: string;
  promptToUse: string | null;
  expectedOutput: string;
  validationRule: string;
  failureSignal: string;
  recoveryAction: string;
  handoffIfNeeded: string | null;
}

/** Routing decision from the ecosystem router. */
export interface RoutingDecision {
  mode: "single" | "terna" | "committee";
  agents: string[];
  reason: string;
  reversible: boolean;
}

/** Prompt types available in the ecosystem (9 categories). */
export type PromptType =
  | "meta-reasoning"
  | "meta-format"
  | "meta-restrictions"
  | "meta-style"
  | "pair-greeting"
  | "pair-delegation"
  | "pair-error-recovery"
  | "pair-complex-query"
  | "handoff"
  | "deliberation"
  | "synthesis"
  | "validation"
  | "fallback";

/** Result from committee deliberation. */
export interface CommitteeResult {
  deliberations: Array<{ agentId: string; response: string }>;
  synthesis: string;
  tiebreaker: string | null;
  finalResponse: string;
}

/** Global ecosystem state — loaded at startup. */
export interface EcosystemState {
  agents: Map<string, AgentDefinition>;
  skills: Map<string, SkillDefinition[]>;
  initialized: boolean;
}

/**
 * Callback for running a sub-agent.
 * Decouples ecosystem modules from the agent loop (breaks circular dependency).
 */
export type SubAgentRunner = (
  task: string,
  systemPrompt: string,
  allowedTools: string[]
) => Promise<string>;
