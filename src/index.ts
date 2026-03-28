import "dotenv/config";
import { loadConfig } from "./config.js";
import { AgentRuntime } from "./runtime.js";
import { createBot } from "./bot.js";
import { initDelegation, runAgent } from "./agent.js";
import type { AgentDeps } from "./agent.js";
import { registerTool } from "./tools/registry.js";
import { registerEcosystemAgents } from "./tools/delegate.js";
import { loadAllAgents } from "./ecosystem/loader.js";
import {
  getRouteRequestDefinition,
  createRouteExecutor,
} from "./ecosystem/router.js";
import { logger } from "./logger.js";
import { initializeOpenClawSymlinks } from "./tools/symlink.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import type { Bot } from "grammy";
import type { Update } from "@grammyjs/types";
import express from "express";
import { PubSub } from "@google-cloud/pubsub";


const runtimes: AgentRuntime[] = [];
const bots: Map<string, Bot> = new Map();

try {
  const config = loadConfig();

  // --- OPENCLAW SYMLINK REGISTRY INITIALIZATION ---
  const registryPath = path.join(__dirname, "config", "openclaw-registry.json");
  await initializeOpenClawSymlinks(registryPath);

  const ecosystem = loadAllAgents(config.agentsPath);

  if (config.agentCredentials.size > 0) {
    for (const [name, creds] of config.agentCredentials) {
      const runtime = new AgentRuntime(name, config, creds);
      runtimes.push(runtime);

      if (ecosystem.initialized) {
        runtime.ecosystem = ecosystem;
        runtime.subAgentRegistry.registerEcosystemAgents(ecosystem);
        runtime.logger.info("Ecosystem initialized", {
          agents: [...ecosystem.agents.keys()],
        });
      }

      // V8 fix: initialize delegation for each agent in multi-agent mode
      const agentDeps: AgentDeps = {
        llm: runtime.llm,
        memory: runtime.memory,
        config,
        ecosystem: ecosystem.initialized ? ecosystem : undefined,
      };
      initDelegation(agentDeps);

      if (ecosystem.initialized) {
        const runner = (task: string, systemPrompt: string, allowedTools: string[]) =>
          runAgent(agentDeps, 0, task, { depth: 1, systemPrompt, allowedTools });
        const routeDefinition = getRouteRequestDefinition(ecosystem);
        const routeExecutor = createRouteExecutor(ecosystem, runner);
        registerTool(routeDefinition, routeExecutor);
      }

      const bot = createBot(runtime);
      bots.set(name, bot);
      runtime.logger.info(`Bot created for ${name}`);
    }
  } else {
    logger.info("Running in legacy single-agent mode");
    const runtime = new AgentRuntime("pristino", config, {
      telegramBotToken: config.telegramBotToken,
      groqApiKeys: config.groqApiKey ? [config.groqApiKey] : [],
      openRouterApiKeys: config.openRouterApiKey ? [config.openRouterApiKey] : [],
    });
    runtimes.push(runtime);

    if (ecosystem.initialized) {
      runtime.ecosystem = ecosystem;
      registerEcosystemAgents(ecosystem);

      const agentDeps: AgentDeps = {
        llm: runtime.llm,
        memory: runtime.memory,
        config,
        ecosystem,
      };

      const runner = (task: string, systemPrompt: string, allowedTools: string[]) =>
        runAgent(agentDeps, 0, task, { depth: 1, systemPrompt, allowedTools });

      const routeDefinition = getRouteRequestDefinition(ecosystem);
      const routeExecutor = createRouteExecutor(ecosystem, runner);
      registerTool(routeDefinition, routeExecutor);

      initDelegation(agentDeps);
      logger.info("Ecosystem initialized (legacy mode)", {
        agents: [...ecosystem.agents.keys()],
      });
    } else {
      const agentDeps: AgentDeps = {
        llm: runtime.llm,
        memory: runtime.memory,
        config,
      };
      initDelegation(agentDeps);
      logger.info("No ecosystem definitions found, running in legacy mode");
    }

    const bot = createBot(runtime);
    bots.set("pristino", bot);
  }

  // === Serverless Event-Driven Architecture ===
  // If PORT is present, assume Cloud Run / Server mode and use Express Webhooks
  if (process.env.PORT) {
    const app = express();
    app.use(express.json({ limit: "1mb" }));

    const pubsub = new PubSub();
    const topicName = process.env.PUBSUB_TOPIC || "pristino-messages";

    // 1. Ingress Webhook from Telegram
    app.post("/webhook/:botName", async (req, res) => {
      const botName = req.params.botName;
      if (!bots.has(botName)) {
        res.status(404).send("Bot not found");
        return;
      }
      
      const update: Update = req.body;
      
      try {
        // Publish to Pub/Sub BEFORE acknowledging Telegram (prevents message loss)
        const taskPayload = { botName, update };
        const dataBuffer = Buffer.from(JSON.stringify(taskPayload));
        await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
        
        logger.info("Published Telegram Update to Pub/Sub", { botName, update_id: update.update_id });
        res.status(200).send("OK");
      } catch (err) {
        logger.error("Failed to publish to Pub/Sub", { error: err });
        res.status(500).send("Publish failed");
      }
    });

    // 2. Background Worker endpoint called by Pub/Sub Push Subscription
    app.post("/pubsub-push", async (req, res) => {
      try {
        const message = req.body.message;
        if (!message || !message.data) {
          res.status(400).send("Bad request: Missing message context");
          return;
        }

        const payloadStr = Buffer.from(message.data, "base64").toString("utf-8");
        const payload = JSON.parse(payloadStr);

        const botName = typeof payload.botName === "string" ? payload.botName : "";
        const targetBot = bots.get(botName);

        if (!targetBot || !payload.update) {
          logger.error("Pub/Sub task invalid or targeted unknown bot", { botName });
          res.status(204).send();
          return;
        }

        logger.info("Consuming Pub/Sub Task", { botName, update_id: payload.update.update_id });
        
        // Pass the update to Grammy logic
        await targetBot.handleUpdate(payload.update);
        res.status(204).send(); // Acknowledge PubSub task success
      } catch (err) {
        logger.error("Error processing Pub/Sub push task", { error: err });
        res.status(500).send("Internal processing error"); // Forces PubSub retry if applicable
      }
    });

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, async () => {
      logger.info(`Express Webhook Server is listening on port ${PORT}`);
      
      // Auto-register Telegram Webhooks if WEBHOOK_URL is set
      const webhookUrl = process.env.WEBHOOK_URL;
      if (webhookUrl) {
         for (const [name, bot] of bots.entries()) {
            const url = `${webhookUrl}/webhook/${name}`;
            await bot.api.setWebhook(url);
            logger.info(`Configured Telegram Webhook`, { botName: name, url });
         }
      }
    });
  } else {
    // Legacy Development Mode (Long-Polling)
    logger.info("Running in long-polling development mode (No PORT set).");
    for (const [name, bot] of bots.entries()) {
      bot.start();
      logger.info(`Started polling for bot: ${name}`);
    }
  }

  // Graceful shutdown — stops all bots and runtimes
  const shutdown = async () => {
    logger.info("Shutting down all instances...");
    if (!process.env.PORT) {
      for (const bot of bots.values()) {
        await bot.stop();
      }
    }
    for (const runtime of runtimes) {
      runtime.shutdown();
    }
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  process.on("unhandledRejection", (err) => {
    logger.error("Unhandled rejection", { error: err });
  });
} catch (err) {
  logger.error("Failed to start", { error: err });
  for (const runtime of runtimes) {
    runtime.shutdown();
  }
  process.exit(1);
}
