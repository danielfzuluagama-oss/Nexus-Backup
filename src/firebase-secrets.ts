import { defineJsonSecret, defineSecret } from "firebase-functions/params";

interface GeminiJsonSecretEntry {
  env?: string;
  key?: string;
}

interface GeminiJsonSecretShape {
  keys?: GeminiJsonSecretEntry[];
}

interface GitHubProposalsSecretShape {
  token?: string;
  sshKey?: string;
  sshKnownHosts?: string;
  owner?: string;
  repo?: string;
  branch?: string;
  pagesBaseUrl?: string;
}

interface WebSearchConfigSecretShape {
  provider?: string;
  braveApiKey?: string;
  tavilyApiKey?: string;
  geminiModel?: string;
  enabled?: boolean | string;
}

const DIRECT_SECRET_NAMES = [
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

const directSecretParams = DIRECT_SECRET_NAMES.map((name) => defineSecret(name));
const geminiConfigSecrets = [
  defineJsonSecret<GeminiJsonSecretShape>("GEMINI_CONFIG_PRISTINO"),
  defineJsonSecret<GeminiJsonSecretShape>("GEMINI_CONFIG_DEONTO"),
] as const;
const githubProposalsConfigSecret =
  defineJsonSecret<GitHubProposalsSecretShape>("GITHUB_PROPOSALS_CONFIG");
const webSearchConfigSecret =
  defineJsonSecret<WebSearchConfigSecretShape>("WEB_SEARCH_CONFIG");

export const functionSecrets = [
  ...directSecretParams,
  ...geminiConfigSecrets,
  githubProposalsConfigSecret,
  webSearchConfigSecret,
];

function hasConcreteEnvValue(name: string): boolean {
  const value = process.env[name]?.trim();
  return Boolean(value && value !== "<PENDING>");
}

function readSecretValue(secret: { name: string; value: () => string }): string {
  try {
    return secret.value().trim();
  } catch {
    return "";
  }
}

export function materializeFunctionSecrets(): void {
  for (const secret of directSecretParams) {
    if (hasConcreteEnvValue(secret.name)) {
      continue;
    }

    const value = readSecretValue(secret);
    if (value) {
      process.env[secret.name] = value;
    }
  }

  for (const secret of geminiConfigSecrets) {
    const config = secret.value();
    if (!config || !Array.isArray(config.keys)) {
      continue;
    }

    for (const entry of config.keys) {
      const envName = entry.env?.trim();
      const keyValue = entry.key?.trim();
      if (!envName || !keyValue || hasConcreteEnvValue(envName)) {
        continue;
      }

      process.env[envName] = keyValue;
    }
  }

  const githubConfig = githubProposalsConfigSecret.value();
  if (githubConfig) {
    const mappings: Array<[string, string | undefined]> = [
      ["GITHUB_PROPOSALS_TOKEN", githubConfig.token],
      ["GITHUB_PROPOSALS_SSH_KEY", githubConfig.sshKey],
      ["GITHUB_PROPOSALS_SSH_KNOWN_HOSTS", githubConfig.sshKnownHosts],
      ["GITHUB_PROPOSALS_OWNER", githubConfig.owner],
      ["GITHUB_PROPOSALS_REPO", githubConfig.repo],
      ["GITHUB_PROPOSALS_BRANCH", githubConfig.branch],
      ["GITHUB_PAGES_BASE_URL", githubConfig.pagesBaseUrl],
    ];

    for (const [envName, rawValue] of mappings) {
      const value = rawValue?.trim();
      if (!value || hasConcreteEnvValue(envName)) {
        continue;
      }

      process.env[envName] = value;
    }
  }

  const webSearchConfig = webSearchConfigSecret.value();
  if (webSearchConfig) {
    const mappings: Array<[string, string | undefined]> = [
      ["WEB_SEARCH_PROVIDER", webSearchConfig.provider],
      ["BRAVE_SEARCH_API_KEY", webSearchConfig.braveApiKey],
      ["TAVILY_API_KEY", webSearchConfig.tavilyApiKey],
      ["GEMINI_WEB_SEARCH_MODEL", webSearchConfig.geminiModel],
      [
        "WEB_SEARCH_ENABLED",
        typeof webSearchConfig.enabled === "boolean"
          ? String(webSearchConfig.enabled)
          : webSearchConfig.enabled,
      ],
    ];

    for (const [envName, rawValue] of mappings) {
      const value = rawValue?.trim();
      if (!value || hasConcreteEnvValue(envName)) {
        continue;
      }

      process.env[envName] = value;
    }
  }
}
