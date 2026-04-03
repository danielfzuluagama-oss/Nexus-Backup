import { defineJsonSecret, defineSecret } from "firebase-functions/params";
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
];
const directSecretParams = DIRECT_SECRET_NAMES.map((name) => defineSecret(name));
const geminiConfigSecrets = [
    defineJsonSecret("GEMINI_CONFIG_PRISTINO"),
    defineJsonSecret("GEMINI_CONFIG_DEONTO"),
];
const githubProposalsConfigSecret = defineJsonSecret("GITHUB_PROPOSALS_CONFIG");
const webSearchConfigSecret = defineJsonSecret("WEB_SEARCH_CONFIG");
export const functionSecrets = [
    ...directSecretParams,
    ...geminiConfigSecrets,
    githubProposalsConfigSecret,
    webSearchConfigSecret,
];
function hasConcreteEnvValue(name) {
    const value = process.env[name]?.trim();
    return Boolean(value && value !== "<PENDING>");
}
function readSecretValue(secret) {
    try {
        return secret.value().trim();
    }
    catch {
        return "";
    }
}
export function materializeFunctionSecrets() {
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
        const mappings = [
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
        const mappings = [
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
