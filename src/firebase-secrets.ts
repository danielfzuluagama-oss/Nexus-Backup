import { defineSecret } from "firebase-functions/params";

const SECRET_NAMES = [
  "TELEGRAM_BOT_TOKEN_PRISTINO",
  "TELEGRAM_BOT_TOKEN_DEONTO",
  "GROQ_API_KEY_PRISTINO_1_JAVIER",
  "GROQ_API_KEY_PRISTINO_2_KATHE",
  "GROQ_API_KEY_PRISTINO_3_DANI",
  "GROQ_API_KEY_PRISTINO_4_GERSE",
  "GROQ_API_KEY_DEONTO_1_JAVIER",
  "GROQ_API_KEY_DEONTO_2_KATHE",
  "GROQ_API_KEY_DEONTO_3_DANI",
  "GROQ_API_KEY_DEONTO_4_GERSE",
  "OPENROUTER_API_KEY_PRISTINO_1_JAVIER",
  "OPENROUTER_API_KEY_PRISTINO_2_KATHE",
  "OPENROUTER_API_KEY_PRISTINO_3_JAVIER_ALT2",
  "OPENROUTER_API_KEY_PRISTINO_4_DANI",
  "OPENROUTER_API_KEY_PRISTINO_5_GERSE",
  "OPENROUTER_API_KEY_DEONTO_1_JAVIER",
  "OPENROUTER_API_KEY_DEONTO_2_KATHE",
  "OPENROUTER_API_KEY_DEONTO_3_JAVIER_ALT2",
  "OPENROUTER_API_KEY_DEONTO_4_DANI",
  "OPENROUTER_API_KEY_DEONTO_5_GERSE",
] as const;

const secretParams = SECRET_NAMES.map((name) => defineSecret(name));

export const functionSecrets = secretParams;

export function materializeFunctionSecrets(): void {
  for (const secret of secretParams) {
    if (process.env[secret.name]?.trim()) {
      continue;
    }

    const value = secret.value().trim();
    if (value) {
      process.env[secret.name] = value;
    }
  }
}
