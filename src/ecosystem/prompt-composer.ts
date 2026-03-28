// ============================================================================
// Prompt Composer — Capa 1
// Composes system prompts from agent.md definitions.
// All composed prompts pass through CP2 (buildSecurePrompt).
// ============================================================================

import type { AgentDefinition } from "./types.js";
import { buildSecurePrompt } from "../security.js";

/** Compose a complete system prompt from an agent definition. */
export function composeSystemPrompt(agent: AgentDefinition): string {
  const sections: string[] = [
    `You are ${agent.name}, ${agent.role}.`,
  ];

  if (agent.mission) {
    sections.push(`\n# Mission\n${agent.mission}`);
  }

  if (agent.mandate.length > 0) {
    sections.push(
      `\n# Mandate\n${agent.mandate.map((m) => `- ${m}`).join("\n")}`
    );
  }

  if (agent.scope.length > 0) {
    sections.push(
      `\n# Scope\n${agent.scope.map((s) => `- ${s}`).join("\n")}`
    );
  }

  if (agent.nonGoals.length > 0) {
    sections.push(
      `\n# Non-Goals\n${agent.nonGoals.map((n) => `- ${n}`).join("\n")}`
    );
  }

  if (agent.delegationRules) {
    sections.push(`\n# Delegation Rules\n${agent.delegationRules}`);
  }

  if (agent.toneOutputStyle) {
    sections.push(`\n# Tone & Style\n${agent.toneOutputStyle}`);
  }

  if (agent.validationDiscipline) {
    sections.push(`\n# Validation\n${agent.validationDiscipline}`);
  }

  if (agent.failureHandling) {
    sections.push(`\n# Failure Handling\n${agent.failureHandling}`);
  }

  const rawPrompt = sections.join("\n");

  // CP2: Security hardening applied to all composed prompts
  return buildSecurePrompt(rawPrompt);
}

/** Escape template-like characters in context values to prevent nested injection. */
function escapeTemplateChars(value: string): string {
  return value.replace(/\{\{/g, "{ {").replace(/\}\}/g, "} }");
}

/** Replace {{placeholder}} tokens in a template string with context values. */
export function interpolate(
  template: string,
  context: Record<string, string>
): string {
  // Escape context values before interpolation to prevent nested template injection
  const safeContext: Record<string, string> = {};
  for (const [key, value] of Object.entries(context)) {
    safeContext[key] = escapeTemplateChars(value);
  }
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (match, key: string) => safeContext[key] ?? match
  );
}

/** Compose a workflow step prompt, replacing placeholders and applying CP2. */
export function composeStepPrompt(
  promptTemplate: string,
  context: Record<string, string>
): string {
  const interpolated = interpolate(promptTemplate, context);
  return buildSecurePrompt(interpolated);
}
