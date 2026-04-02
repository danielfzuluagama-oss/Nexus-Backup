import express from "express";
import fs from "fs";
import path from "path";
import { PubSub } from "@google-cloud/pubsub";
import { loadConfig } from "./config.js";
import { AgentRuntime } from "./runtime.js";
import { createBot } from "./bot.js";
import { initDelegation, runAgent } from "./agent.js";
import { registerTool } from "./tools/registry.js";
import { registerEcosystemAgents } from "./tools/delegate.js";
import { loadAllAgents } from "./ecosystem/loader.js";
import { createRouteExecutor, getRouteRequestDefinition, } from "./ecosystem/router.js";
import { logger } from "./logger.js";
import { initializeOpenClawSymlinks } from "./tools/symlink.js";
import { claimTelegramUpdate, markTelegramUpdateCompleted, markTelegramUpdateFailed, } from "./telegram-update-guard.js";
import { buildServiceStatus } from "./service-status.js";
const PRIMARY_INTERNAL_BOT_NAME = "pristino";
const PRIMARY_PUBLIC_BOT_NAME = (process.env.PRIMARY_BOT_NAME ?? "nexus")
    .trim()
    .toLowerCase();
function resolveInternalBotName(name) {
    const normalized = name.trim().toLowerCase();
    if (normalized === PRIMARY_PUBLIC_BOT_NAME || normalized === PRIMARY_INTERNAL_BOT_NAME) {
        return PRIMARY_INTERNAL_BOT_NAME;
    }
    return normalized;
}
function resolvePublicBotName(name) {
    if (name === PRIMARY_INTERNAL_BOT_NAME) {
        return PRIMARY_PUBLIC_BOT_NAME;
    }
    return name;
}
let contextPromise = null;
async function initializeBotInstance(bot, botName) {
    const maybeInit = bot.init;
    if (typeof maybeInit !== "function") {
        return;
    }
    await maybeInit.call(bot);
    logger.info("Bot initialized", { botName });
}
function resolveRegistryPath() {
    const candidates = [
        path.resolve(process.cwd(), "src/config/openclaw-registry.json"),
        path.resolve(process.cwd(), "dist/config/openclaw-registry.json"),
        path.resolve(process.cwd(), "config/openclaw-registry.json"),
    ];
    return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}
function normalizeBaseUrl(baseUrl) {
    return baseUrl.replace(/\/+$/, "");
}
function resolveRuntimeRegion() {
    return (process.env.FUNCTION_REGION ?? process.env.GCLOUD_REGION ?? "us-central1").trim();
}
function shouldAppendFunctionTarget(host) {
    const normalizedHost = host?.trim().toLowerCase() ?? "";
    return normalizedHost.endsWith(".cloudfunctions.net");
}
function appendServicePath(baseUrl, pathname) {
    return baseUrl ? `${normalizeBaseUrl(baseUrl)}${pathname}` : null;
}
export function resolveWebhookBaseUrl(options) {
    const explicitBaseUrl = options.explicitBaseUrl?.trim();
    if (explicitBaseUrl) {
        return normalizeBaseUrl(explicitBaseUrl);
    }
    const protocol = (options.protocol?.trim() || "https").replace(/:$/, "");
    const host = options.forwardedHost?.trim() || options.host?.trim();
    const functionTarget = (options.functionTarget?.trim() || "api").replace(/^\/+|\/+$/g, "");
    const targetSuffix = options.appendFunctionTarget ? `/${functionTarget}` : "";
    if (host) {
        return normalizeBaseUrl(`${protocol}://${host}${targetSuffix}`);
    }
    const projectId = options.projectId?.trim();
    if (!projectId) {
        return undefined;
    }
    const region = options.region?.trim() || "us-central1";
    return normalizeBaseUrl(`https://${region}-${projectId}.cloudfunctions.net${targetSuffix}`);
}
export function resolveServiceEndpointUrls(request) {
    const forwardedHost = request.get("x-forwarded-host");
    const host = request.get("host");
    const requestHost = forwardedHost?.trim() || host?.trim() || null;
    const requestBaseUrl = resolveWebhookBaseUrl({
        explicitBaseUrl: process.env.WEBHOOK_URL,
        forwardedHost,
        host,
        protocol: request.get("x-forwarded-proto") ?? request.protocol ?? "https",
        functionTarget: "api",
        projectId: process.env.GCLOUD_PROJECT,
        region: resolveRuntimeRegion(),
        appendFunctionTarget: shouldAppendFunctionTarget(requestHost),
    });
    const officialBaseUrl = resolveWebhookBaseUrl({
        explicitBaseUrl: process.env.WEBHOOK_URL,
        projectId: process.env.GCLOUD_PROJECT,
        region: resolveRuntimeRegion(),
        functionTarget: "api",
        appendFunctionTarget: true,
    }) ?? requestBaseUrl;
    return {
        requestBaseUrl: requestBaseUrl ?? null,
        officialBaseUrl: officialBaseUrl ?? null,
        requestHealthUrl: appendServicePath(requestBaseUrl, "/healthz"),
        requestStatusUrl: appendServicePath(requestBaseUrl, "/status"),
        officialHealthUrl: appendServicePath(officialBaseUrl, "/healthz"),
        officialStatusUrl: appendServicePath(officialBaseUrl, "/status"),
    };
}
function parseTaskPayload(raw) {
    let parsed = raw;
    if (typeof parsed === "string") {
        try {
            parsed = JSON.parse(parsed);
        }
        catch (error) {
            logger.error("Failed to parse task payload JSON", { error });
            return null;
        }
    }
    if (!parsed || typeof parsed !== "object") {
        return null;
    }
    const candidate = parsed;
    const botName = typeof candidate.botName === "string" ? candidate.botName : "";
    const update = candidate.update;
    if (!botName || !update || typeof update !== "object") {
        return null;
    }
    return { botName, update: update };
}
export function decodeTaskPayloadFromBase64(data) {
    try {
        const payload = Buffer.from(data, "base64").toString("utf-8");
        return parseTaskPayload(payload);
    }
    catch (error) {
        logger.error("Failed to decode Pub/Sub payload", { error });
        return null;
    }
}
async function processTaskPayloadWithBots(bots, payload) {
    const resolvedBotName = resolveInternalBotName(payload.botName);
    const targetBot = bots.get(resolvedBotName);
    if (!targetBot) {
        logger.error("Pub/Sub task invalid or targeted unknown bot", {
            botName: payload.botName,
            resolvedBotName,
        });
        return false;
    }
    logger.info("Consuming task payload", {
        botName: resolvedBotName,
        requestedBotName: payload.botName,
        update_id: payload.update.update_id,
    });
    const claimResult = await claimTelegramUpdate(resolvedBotName, payload.update.update_id);
    if (claimResult === "duplicate") {
        logger.info("Skipping duplicate Telegram update", {
            botName: resolvedBotName,
            requestedBotName: payload.botName,
            update_id: payload.update.update_id,
        });
        return true;
    }
    try {
        await targetBot.handleUpdate(payload.update);
        await markTelegramUpdateCompleted(resolvedBotName, payload.update.update_id);
    }
    catch (error) {
        await markTelegramUpdateFailed(resolvedBotName, payload.update.update_id, error);
        throw error;
    }
    return true;
}
export async function processTaskPayload(payload) {
    const context = await getServiceContext();
    return processTaskPayloadWithBots(context.bots, payload);
}
async function buildServiceContext() {
    const config = loadConfig();
    const runtimes = [];
    const bots = new Map();
    const registryPath = resolveRegistryPath();
    await initializeOpenClawSymlinks(registryPath);
    const ecosystem = loadAllAgents(config.agentsPath);
    if (config.agentCredentials.size > 0) {
        for (const [name] of config.agentCredentials) {
            const runtime = new AgentRuntime(name, config, config.agentCredentials.get(name));
            runtimes.push(runtime);
            if (ecosystem.initialized) {
                runtime.ecosystem = ecosystem;
                runtime.subAgentRegistry.registerEcosystemAgents(ecosystem);
                runtime.logger.info("Ecosystem initialized", {
                    agents: [...ecosystem.agents.keys()],
                });
            }
            const deps = {
                llm: runtime.llm,
                memory: runtime.memory,
                config,
                ecosystem: ecosystem.initialized ? ecosystem : undefined,
            };
            initDelegation(deps);
            if (ecosystem.initialized) {
                const runner = (task, systemPrompt, allowedTools) => runAgent(deps, 0, task, { depth: 1, systemPrompt, allowedTools });
                const routeDefinition = getRouteRequestDefinition(ecosystem);
                const routeExecutor = createRouteExecutor(ecosystem, runner);
                registerTool(routeDefinition, routeExecutor);
            }
            const bot = createBot(runtime);
            await initializeBotInstance(bot, name);
            bots.set(name, bot);
            runtime.logger.info(`Bot created for ${name}`);
        }
    }
    else {
        logger.info("Running in legacy single-agent mode");
        const runtime = new AgentRuntime("pristino", config, {
            telegramBotToken: config.telegramBotToken,
            groqApiKeys: config.groqApiKey ? [{ key: config.groqApiKey, owner: "LEGACY" }] : [],
            openRouterApiKeys: config.openRouterApiKey
                ? [{ key: config.openRouterApiKey, owner: "LEGACY" }]
                : [],
            geminiApiKeys: config.geminiApiKey
                ? [{ key: config.geminiApiKey, owner: "LEGACY" }]
                : [],
        });
        runtimes.push(runtime);
        if (ecosystem.initialized) {
            runtime.ecosystem = ecosystem;
            registerEcosystemAgents(ecosystem);
            const deps = {
                llm: runtime.llm,
                memory: runtime.memory,
                config,
                ecosystem,
            };
            const runner = (task, systemPrompt, allowedTools) => runAgent(deps, 0, task, { depth: 1, systemPrompt, allowedTools });
            const routeDefinition = getRouteRequestDefinition(ecosystem);
            const routeExecutor = createRouteExecutor(ecosystem, runner);
            registerTool(routeDefinition, routeExecutor);
            initDelegation(deps);
            logger.info("Ecosystem initialized (legacy mode)", {
                agents: [...ecosystem.agents.keys()],
            });
        }
        else {
            const deps = {
                llm: runtime.llm,
                memory: runtime.memory,
                config,
            };
            initDelegation(deps);
            logger.info("No ecosystem definitions found, running in legacy mode");
        }
        const bot = createBot(runtime);
        await initializeBotInstance(bot, "pristino");
        bots.set("pristino", bot);
    }
    const app = express();
    app.use(express.json({ limit: "1mb" }));
    const pubsub = new PubSub();
    const topicName = process.env.PUBSUB_TOPIC || "pristino-messages";
    const context = {
        app,
        bots,
        runtimes,
        pollingStarted: false,
        server: null,
        webhooksConfigured: false,
        config,
        ecosystem,
    };
    app.get("/healthz", (req, res) => {
        const endpoints = resolveServiceEndpointUrls(req);
        res.status(200).json({
            ok: true,
            bots: [...bots.keys()].map(resolvePublicBotName),
            mode: context.server || process.env.PORT || process.env.FUNCTION_TARGET || process.env.K_SERVICE
                ? "server"
                : "local",
            statusUrl: "/status",
            runtimeCount: runtimes.length,
            webhooksConfigured: context.webhooksConfigured,
            endpoints,
        });
    });
    app.get("/status", async (req, res) => {
        try {
            const status = await buildServiceStatus(context);
            res.status(200).json({
                ...status,
                endpoints: resolveServiceEndpointUrls(req),
            });
        }
        catch (error) {
            logger.error("Failed to build service status", { error });
            res.status(500).json({
                ok: false,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    });
    app.post("/webhook/:botName", async (req, res) => {
        const paramBotName = req.params.botName;
        const requestedBotName = Array.isArray(paramBotName) ? paramBotName[0] : paramBotName;
        const botName = resolveInternalBotName(requestedBotName);
        if (!bots.has(botName)) {
            res.status(404).send("Bot not found");
            return;
        }
        const update = req.body;
        try {
            const taskPayload = { botName, update };
            const dataBuffer = Buffer.from(JSON.stringify(taskPayload));
            await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
            logger.info("Published Telegram update to Pub/Sub", {
                botName,
                update_id: update.update_id,
            });
            res.status(200).send("OK");
        }
        catch (error) {
            logger.error("Failed to publish to Pub/Sub", { error });
            res.status(500).send("Publish failed");
        }
    });
    app.post("/pubsub-push", async (req, res) => {
        try {
            const message = req.body.message;
            if (!message?.data) {
                res.status(400).send("Bad request: Missing message context");
                return;
            }
            const payload = decodeTaskPayloadFromBase64(message.data);
            if (!payload) {
                res.status(400).send("Bad request: Invalid message payload");
                return;
            }
            const processed = await processTaskPayloadWithBots(bots, payload);
            if (!processed) {
                res.status(204).send();
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            logger.error("Error processing Pub/Sub push task", { error });
            res.status(500).send("Internal processing error");
        }
    });
    return context;
}
export async function getServiceContext() {
    if (!contextPromise) {
        contextPromise = buildServiceContext().catch((error) => {
            contextPromise = null;
            throw error;
        });
    }
    return contextPromise;
}
export async function getServiceStatus() {
    const context = await getServiceContext();
    return buildServiceStatus(context);
}
export async function ensureWebhookRegistration(baseUrl = process.env.WEBHOOK_URL) {
    if (!baseUrl) {
        return;
    }
    const context = await getServiceContext();
    if (context.webhooksConfigured) {
        return;
    }
    const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
    try {
        for (const [name, bot] of context.bots.entries()) {
            const publicBotName = resolvePublicBotName(name);
            const webhookUrl = `${normalizedBaseUrl}/webhook/${publicBotName}`;
            await bot.api.setWebhook(webhookUrl);
            logger.info("Configured Telegram webhook", {
                botName: name,
                publicBotName,
                url: webhookUrl,
            });
        }
        context.webhooksConfigured = true;
    }
    catch (error) {
        logger.error("Failed to configure Telegram webhooks", { error });
    }
}
async function shutdownService() {
    const context = await getServiceContext().catch(() => null);
    if (!context) {
        return;
    }
    logger.info("Shutting down all instances...");
    if (context.server) {
        await new Promise((resolve, reject) => {
            context.server?.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        }).catch((error) => {
            logger.error("Failed to close HTTP server", { error });
        });
        context.server = null;
    }
    if (context.pollingStarted) {
        for (const bot of context.bots.values()) {
            await bot.stop();
        }
        context.pollingStarted = false;
    }
    for (const runtime of context.runtimes) {
        runtime.shutdown();
    }
}
export async function runCli() {
    process.on("unhandledRejection", (error) => {
        logger.error("Unhandled rejection", { error });
    });
    const gracefulExit = async (code = 0) => {
        await shutdownService();
        process.exit(code);
    };
    process.on("SIGINT", () => {
        void gracefulExit(0);
    });
    process.on("SIGTERM", () => {
        void gracefulExit(0);
    });
    const context = await getServiceContext();
    if (process.env.PORT) {
        const port = Number(process.env.PORT || 8080);
        await new Promise((resolve) => {
            context.server = context.app.listen(port, () => {
                logger.info(`Express webhook server is listening on port ${port}`);
                void ensureWebhookRegistration();
                resolve();
            });
        });
        return;
    }
    logger.info("Running in long-polling development mode (No PORT set).");
    for (const [name, bot] of context.bots.entries()) {
        bot.start();
        logger.info(`Started polling for bot: ${name}`);
    }
    context.pollingStarted = true;
}
