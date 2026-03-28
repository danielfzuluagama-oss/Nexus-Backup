import type { Config } from "./config.js";
import type { LLMMessage } from "./config/llm-providers.js";

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export interface TokenBudget {
  total: number;
  reserved: number;
  system: number;
  safety: number;
  available: number;
}

export function calculateBudget(
  config: Config,
  systemPrompt: string
): TokenBudget {
  const total = config.modelContextWindow;
  const reserved = config.maxTokens;
  const system = estimateTokens(systemPrompt);
  const safety = Math.ceil(total * 0.1);
  const available = Math.max(0, total - reserved - system - safety);

  return { total, reserved, system, safety, available };
}

export function trimHistory(
  messages: LLMMessage[],
  budgetTokens: number
): LLMMessage[] {
  if (messages.length === 0) return messages;

  let totalTokens = 0;
  for (const msg of messages) {
    totalTokens += estimateTokens(msg.content ?? "");
  }

  if (totalTokens <= budgetTokens) return messages;

  const trimmed = [...messages];
  while (trimmed.length > 1 && totalTokens > budgetTokens) {
    const dropped = trimmed.shift()!;
    totalTokens -= estimateTokens(dropped.content ?? "");
  }

  return trimmed;
}
