// ============================================================================
// Ecosystem Type Definitions — Capa 1
// All interfaces for the Pristino agentic ecosystem.
// Zod schemas for runtime validation at system boundaries.
// ============================================================================

import { z } from "zod/v4";

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
  sourcePath?: string;
  rawContent?: string;
  systemPrompt?: string;
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

/** Consensus status for a committee deliberation. */
export type ConsensusStatus = "strong" | "majority" | "split" | "disagreement";

/** Result from committee deliberation. */
export interface CommitteeResult {
  deliberations: Array<{ agentId: string; response: string }>;
  synthesis: string;
  tiebreaker: string | null;
  finalResponse: string;
  consensusStatus?: ConsensusStatus;
  tiebreakerCriterion?: string;
  degradationReason?: string;
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

// ============================================================================
// Zod Schemas — Runtime Validation
// ============================================================================

export const StepDefinitionSchema = z.object({
  stepNumber: z.number(),
  title: z.string(),
  desc: z.string(),
  whyThisMatters: z.string(),
  inputNeeded: z.string(),
  actionInstruction: z.string(),
  promptToUse: z.string().nullable(),
  expectedOutput: z.string(),
  validationRule: z.string(),
  failureSignal: z.string(),
  recoveryAction: z.string(),
  handoffIfNeeded: z.string().nullable(),
});

export const RaciAssignmentSchema = z.object({
  responsible: z.string(),
  accountable: z.string(),
  consulted: z.string().nullable(),
  informed: z.string(),
});

export const WorkflowDefinitionSchema = z.object({
  id: z.string(),
  title: z.string(),
  objective: z.string(),
  trigger: z.string(),
  preconditions: z.array(z.string()),
  inputs: z.array(z.string()),
  steps: z.array(StepDefinitionSchema),
  mainOutput: z.string(),
  secondaryOutputs: z.array(z.string()),
  dod: z.array(z.string()),
  qaChecklist: z.array(z.string()),
  raci: RaciAssignmentSchema,
  kpis: z.record(z.string(), z.string()),
  cadence: z.string(),
  errorHandling: z.string(),
  fallbackRoute: z.string(),
  escalationRoute: z.string(),
  designRationale: z.string().optional(),
  timeoutMs: z.number().optional(),
});

export const SkillDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  purpose: z.string(),
  businessValue: z.string(),
  triggerTypes: z.array(z.string()),
  owningAgent: z.string(),
  inputs: z.array(z.string()),
  outputs: z.array(z.string()),
  dependencies: z.array(z.string()),
  toolUsage: z.array(z.string()),
  memoryReadsWrites: z.object({ reads: z.array(z.string()), writes: z.array(z.string()) }),
  securityValidations: z.array(z.string()),
  observabilityEvents: z.array(z.string()),
  failureHandling: z.array(z.string()),
  interoperabilityContract: z.object({ consumes: z.array(z.string()), produces: z.array(z.string()) }),
  wowCriteria: z.array(z.string()),
  safeCriteria: z.array(z.string()),
  workflows: z.array(WorkflowDefinitionSchema),
  sourcePath: z.string().optional(),
  rawContent: z.string().optional(),
  systemPrompt: z.string().optional(),
});

export const AgentDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  version: z.string(),
  mission: z.string(),
  mandate: z.array(z.string()),
  scope: z.array(z.string()),
  nonGoals: z.array(z.string()),
  inputs: z.array(z.string()),
  outputs: z.array(z.string()),
  decisionRights: z.array(z.string()),
  allowedTools: z.array(z.string()),
  forbiddenTools: z.array(z.string()),
  memoryPolicy: z.string(),
  securityPolicy: z.string(),
  orchestrationPolicy: z.string(),
  delegationRules: z.string(),
  escalationRules: z.string(),
  toneOutputStyle: z.string(),
  validationDiscipline: z.string(),
  failureHandling: z.string(),
  completionCriteria: z.string(),
  assumptions: z.array(z.string()).optional(),
  acceptanceCriteria: z.array(z.string()).optional(),
  explicitLimits: z.array(z.string()).optional(),
  tradeoffRationale: z.array(z.string()).optional(),
  edgeCases: z.array(z.string()).optional(),
});

export const RoutingDecisionSchema = z.object({
  mode: z.enum(["single", "terna", "committee"]),
  agents: z.array(z.string()).min(1),
  reason: z.string().min(1),
  reversible: z.boolean(),
});

export const KnowledgeSchema = z.object({
  fact: z.string(),
  category: z.string(),
  confidence: z.number().min(0).max(1),
  source: z.string(),
  reinforcementCount: z.number().int().min(0),
  userId: z.string(),
  classification: z.enum(["persistent", "permanent"]),
});

export const CircuitBreakerStateSchema = z.object({
  key: z.string(),
  state: z.enum(["closed", "open", "half-open"]),
  failureCount: z.number().int().min(0),
  lastFailureAt: z.number(),
  cooldownMs: z.number().positive(),
  threshold: z.number().int().positive(),
});
