import process from "node:process";
import { buildProposalArtifact } from "../proposals/proposal-artifact.js";
import { formatProposalValidationError, validateProposalArtifactHtml, } from "../proposals/proposal-validation.js";
import { getGitHubProposalsConfig, publishProposalArtifact, } from "../proposals/github-publisher.js";
function hasFlag(flag) {
    return process.argv.includes(flag);
}
function readNumberEnv(name, fallback) {
    const raw = process.env[name];
    if (!raw) {
        return fallback;
    }
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
async function main() {
    const allowPublish = hasFlag("--publish")
        || String(process.env.PROPOSAL_SMOKE_ALLOW_PUBLISH).toLowerCase() === "true";
    const verifyUrls = !hasFlag("--no-verify");
    const pagesReadyTimeoutMs = readNumberEnv("PROPOSAL_SMOKE_PAGES_TIMEOUT_MS", 120_000);
    const pagesReadyPollIntervalMs = readNumberEnv("PROPOSAL_SMOKE_PAGES_POLL_MS", 5_000);
    const artifact = buildProposalArtifact("Necesito una propuesta comercial para Cliente Smoke Test sobre automatizacion con IA", "ETAPA 1 | REPASO DE LO ENTENDIDO\nPedido base", new Date(), {
        intake: {
            clientName: "Cliente Smoke Test",
            serviceName: "Smoke Test Propuesta Comercial",
            objective: "Verificar el flujo de publicacion y validacion del artefacto comercial.",
        },
    });
    const validation = validateProposalArtifactHtml(artifact.html);
    if (!validation.valid) {
        console.error("Smoke validation failed before publishing.");
        console.error(formatProposalValidationError(validation));
        process.exitCode = 1;
        return;
    }
    const githubConfig = getGitHubProposalsConfig();
    const configSummary = githubConfig
        ? {
            owner: githubConfig.owner,
            repo: githubConfig.repo,
            branch: githubConfig.branch,
            pagesBaseUrl: githubConfig.pagesBaseUrl,
            authMode: githubConfig.token ? "token" : "ssh",
        }
        : null;
    console.log(JSON.stringify({
        mode: allowPublish ? "publish" : "dry-run",
        verifyUrls,
        artifact: {
            clientName: artifact.clientName,
            repoPath: artifact.repoPath,
            fileName: artifact.fileName,
        },
        github: configSummary,
    }, null, 2));
    if (!allowPublish) {
        console.log("Dry run complete. Use --publish or PROPOSAL_SMOKE_ALLOW_PUBLISH=true to execute a real publication.");
        return;
    }
    if (!githubConfig) {
        console.error("GitHub proposal publishing is not configured in this runtime.");
        process.exitCode = 1;
        return;
    }
    const published = await publishProposalArtifact(artifact, githubConfig, {
        verifyUrls,
        pagesReadyTimeoutMs,
        pagesReadyPollIntervalMs,
    });
    console.log(JSON.stringify({
        repoPath: published.repoPath,
        commitSha: published.commitSha,
        viewUrl: published.viewUrl,
        githubUrl: published.githubUrl,
        downloadUrl: published.downloadUrl,
        pagesUrl: published.pagesUrl,
        pagesReady: published.pagesReady,
        verification: published.verification ?? null,
    }, null, 2));
    if (verifyUrls && published.verification && !published.verification.ok) {
        console.error("Proposal publishing smoke test completed with degraded link verification.");
        process.exitCode = 1;
    }
}
main().catch((error) => {
    console.error("Smoke proposal publishing failed.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
});
