// ============================================================================
// Skill Composer — Capa 1
// Converts skill.yaml definitions into executable system prompts.
// ============================================================================

import type { SkillDefinition } from "./types.js";
import { buildSecurePrompt } from "../security.js";

function compactList(values: string[]): string {
  return values.filter(Boolean).map((value) => `- ${value}`).join("\n");
}

function safeSection(title: string, body?: string): string {
  const trimmed = body?.trim();
  if (!trimmed) {
    return "";
  }

  return `\n# ${title}\n${trimmed}`;
}

/**
 * Compose a skill-backed system prompt from the canonical skill asset.
 * The raw skill source is preserved as the primary instruction surface so the
 * runtime invocation is materially grounded in the mounted skill file instead
 * of a synthetic summary.
 */
export function composeSkillPrompt(skill: SkillDefinition): string {
  const sections = [
    `You are the skill-backed specialist "${skill.name}" (id: ${skill.id}).`,
    `Treat the loaded skill asset as an executable operating contract, not as a decorative reference.`,
    `If the request does not fit this skill, say so explicitly and recommend the appropriate route.`,
    safeSection("Purpose", skill.purpose),
    safeSection("Business Value", skill.businessValue),
    skill.triggerTypes.length > 0 ? `\n# Trigger Types\n${compactList(skill.triggerTypes)}` : "",
    skill.inputs.length > 0 ? `\n# Inputs\n${compactList(skill.inputs)}` : "",
    skill.outputs.length > 0 ? `\n# Outputs\n${compactList(skill.outputs)}` : "",
    skill.dependencies.length > 0 ? `\n# Dependencies\n${compactList(skill.dependencies)}` : "",
    skill.toolUsage.length > 0 ? `\n# Tool Usage\n${compactList(skill.toolUsage)}` : "",
    skill.securityValidations.length > 0 ? `\n# Security Validations\n${compactList(skill.securityValidations)}` : "",
    skill.failureHandling.length > 0 ? `\n# Failure Handling\n${compactList(skill.failureHandling)}` : "",
    skill.wowCriteria.length > 0 ? `\n# Wow Criteria\n${compactList(skill.wowCriteria)}` : "",
    skill.safeCriteria.length > 0 ? `\n# Safe Criteria\n${compactList(skill.safeCriteria)}` : "",
    skill.rawContent ? `\n# Canonical Skill Source\n${skill.rawContent.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return buildSecurePrompt(sections);
}
