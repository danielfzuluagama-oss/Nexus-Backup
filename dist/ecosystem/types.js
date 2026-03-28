// ============================================================================
// Ecosystem Type Definitions — Capa 1
// All interfaces for the Pristino agentic ecosystem.
// Zod schemas for runtime validation at system boundaries.
// ============================================================================
import { z } from "zod/v4";
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
