import { execFile } from "child_process";
import { mkdir, mkdtemp, rm, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import { setTimeout as delay } from "timers/promises";
import { promisify } from "util";
import { formatProposalValidationError, validateProposalArtifactHtml, } from "./proposal-validation.js";
const execFileAsync = promisify(execFile);
const DEFAULT_PAGES_READY_TIMEOUT_MS = 120_000;
const DEFAULT_PAGES_READY_POLL_INTERVAL_MS = 5_000;
function encodeRepoPath(path) {
    return path.split("/").map(encodeURIComponent).join("/");
}
function isConcreteConfigValue(value) {
    return Boolean(value && value.trim() && value.trim() !== "<PENDING>");
}
function readConcreteEnv(name) {
    const value = process.env[name]?.trim();
    return isConcreteConfigValue(value) ? value : undefined;
}
export function getGitHubProposalsConfig() {
    const token = readConcreteEnv("GITHUB_PROPOSALS_TOKEN");
    const owner = readConcreteEnv("GITHUB_PROPOSALS_OWNER") || "danielfzuluagama-oss";
    const repo = readConcreteEnv("GITHUB_PROPOSALS_REPO") || "propuestas-comerciales";
    const branch = readConcreteEnv("GITHUB_PROPOSALS_BRANCH") || "main";
    const sshKey = readConcreteEnv("GITHUB_PROPOSALS_SSH_KEY");
    const sshKnownHosts = readConcreteEnv("GITHUB_PROPOSALS_SSH_KNOWN_HOSTS");
    const pagesBaseUrl = readConcreteEnv("GITHUB_PAGES_BASE_URL")
        || `https://${owner}.github.io/${repo}`;
    if (!token && !sshKey)
        return null;
    return {
        token,
        sshKey,
        sshKnownHosts,
        owner,
        repo,
        branch,
        pagesBaseUrl: pagesBaseUrl.replace(/\/+$/, ""),
    };
}
function buildRawDownloadUrl(config, repoPath) {
    return `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${repoPath}`;
}
function buildGitHubFileUrl(config, repoPath) {
    return `https://github.com/${config.owner}/${config.repo}/blob/${config.branch}/${encodeRepoPath(repoPath)}`;
}
export function buildPagesViewUrl(config, repoPath) {
    const renderedPath = repoPath.endsWith("/index.html")
        ? repoPath.slice(0, -"index.html".length)
        : repoPath;
    return `${config.pagesBaseUrl}/${renderedPath}`.replace(/\/+$/, "/");
}
async function githubRequest(config, path, init = {}) {
    const response = await fetch(`https://api.github.com${path}`, {
        ...init,
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${config.token}`,
            "User-Agent": "nexus-proposals-bot",
            ...init.headers,
        },
    });
    if (!response.ok) {
        const body = await response.text();
        throw new Error(`GitHub API ${response.status}: ${body}`);
    }
    return response.json();
}
async function isUrlReachable(url) {
    const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
    });
    if (response.ok) {
        return true;
    }
    if (response.status === 405) {
        const fallback = await fetch(url, {
            method: "GET",
            redirect: "follow",
        });
        return fallback.ok;
    }
    return false;
}
export async function verifyPublishedProposalLinks(urls) {
    const cache = new Map();
    const check = async (url) => {
        if (!cache.has(url)) {
            cache.set(url, await isUrlReachable(url));
        }
        return cache.get(url) ?? false;
    };
    const [viewUrlReachable, githubUrlReachable, downloadUrlReachable] = await Promise.all([
        check(urls.viewUrl),
        check(urls.githubUrl),
        check(urls.downloadUrl),
    ]);
    const issues = [];
    if (!viewUrlReachable)
        issues.push("viewUrl is not reachable");
    if (!githubUrlReachable)
        issues.push("githubUrl is not reachable");
    if (!downloadUrlReachable)
        issues.push("downloadUrl is not reachable");
    return {
        checkedAt: new Date().toISOString(),
        ok: issues.length === 0,
        viewUrlReachable,
        githubUrlReachable,
        downloadUrlReachable,
        issues,
    };
}
async function resolvePublishedUrls(config, repoPath, options = {}) {
    const pagesUrl = buildPagesViewUrl(config, repoPath);
    const githubUrl = buildGitHubFileUrl(config, repoPath);
    const timeoutMs = Math.max(1, options.pagesReadyTimeoutMs ?? DEFAULT_PAGES_READY_TIMEOUT_MS);
    const pollIntervalMs = Math.max(1, options.pagesReadyPollIntervalMs ?? DEFAULT_PAGES_READY_POLL_INTERVAL_MS);
    const wait = options.wait ?? delay;
    const maxAttempts = Math.max(1, Math.ceil(timeoutMs / pollIntervalMs));
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        if (await isUrlReachable(pagesUrl)) {
            return {
                viewUrl: pagesUrl,
                githubUrl,
                pagesUrl,
                pagesReady: true,
            };
        }
        if (attempt < maxAttempts - 1) {
            await wait(pollIntervalMs);
        }
    }
    return {
        viewUrl: githubUrl,
        githubUrl,
        pagesUrl,
        pagesReady: false,
    };
}
async function getExistingFileSha(config, repoPath) {
    const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${encodeRepoPath(repoPath)}?ref=${encodeURIComponent(config.branch)}`, {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${config.token}`,
            "User-Agent": "nexus-proposals-bot",
        },
    });
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        const body = await response.text();
        throw new Error(`GitHub API ${response.status}: ${body}`);
    }
    const payload = await response.json();
    return payload.sha ?? null;
}
export async function publishProposalArtifact(artifact, config = getGitHubProposalsConfig(), options = {}) {
    if (!config) {
        throw new Error("GitHub proposals publishing is not configured");
    }
    const validation = validateProposalArtifactHtml(artifact.html);
    if (!validation.valid) {
        throw new Error(formatProposalValidationError(validation));
    }
    const hasToken = isConcreteConfigValue(config.token);
    if (hasToken) {
        try {
            return await publishViaRest(artifact, config, options);
        }
        catch (error) {
            if (!config.sshKey) {
                throw error;
            }
        }
    }
    if (config.sshKey) {
        return publishViaSsh(artifact, config, options);
    }
    throw new Error("GitHub proposals publishing is not configured (no token or SSH key)");
}
async function publishViaRest(artifact, config, options) {
    if (!config.token)
        throw new Error("REST publishing requires token");
    const existingSha = await getExistingFileSha(config, artifact.repoPath);
    const payload = {
        message: `Publish proposal for ${artifact.clientName} (${artifact.requestDate})`,
        content: Buffer.from(artifact.html, "utf8").toString("base64"),
        branch: config.branch,
    };
    if (existingSha) {
        payload.sha = existingSha;
    }
    const response = await githubRequest(config, `/repos/${config.owner}/${config.repo}/contents/${encodeRepoPath(artifact.repoPath)}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    const content = response.content ?? response;
    const publicUrls = await resolvePublishedUrls(config, artifact.repoPath, options);
    const downloadUrl = content.download_url ?? response.download_url ?? buildRawDownloadUrl(config, artifact.repoPath);
    const verification = options.verifyUrls === false
        ? undefined
        : await verifyPublishedProposalLinks({
            viewUrl: publicUrls.viewUrl,
            githubUrl: publicUrls.githubUrl,
            downloadUrl,
        });
    return {
        repoPath: artifact.repoPath,
        commitSha: content.sha ?? response.sha ?? "",
        viewUrl: publicUrls.viewUrl,
        githubUrl: publicUrls.githubUrl,
        downloadUrl,
        pagesUrl: publicUrls.pagesUrl,
        pagesReady: publicUrls.pagesReady,
        verification,
    };
}
async function publishViaSsh(artifact, config, options) {
    const sshKey = config.sshKey;
    if (!sshKey) {
        throw new Error("SSH publishing requires a private key");
    }
    const workspace = await mkdtemp(path.join(os.tmpdir(), "proposal-publish-"));
    const repoDir = path.join(workspace, "repo");
    const privateKeyPath = path.join(workspace, "deploy-key");
    const knownHostsPath = config.sshKnownHosts
        ? path.join(workspace, "known_hosts")
        : undefined;
    const repoUrl = `git@github.com:${config.owner}/${config.repo}.git`;
    try {
        await writeFile(privateKeyPath, normalizePrivateKey(sshKey), { mode: 0o600 });
        if (knownHostsPath) {
            await writeFile(knownHostsPath, normalizeKnownHosts(config.sshKnownHosts), { mode: 0o600 });
        }
        const env = {
            ...process.env,
            GIT_SSH_COMMAND: buildGitSshCommand(privateKeyPath, knownHostsPath),
        };
        await runGit(["clone", "--depth=1", "--branch", config.branch, repoUrl, repoDir], workspace, env);
        await runGit(["config", "user.name", "Nexus Proposal Bot"], repoDir, env);
        await runGit(["config", "user.email", "noreply@metodologia.info"], repoDir, env);
        const targetPath = path.join(repoDir, artifact.repoPath);
        await mkdir(path.dirname(targetPath), { recursive: true });
        await writeFile(targetPath, artifact.html, "utf8");
        await runGit(["add", artifact.repoPath], repoDir, env);
        await runGit(["commit", "-m", `Publish proposal for ${artifact.clientName} (${artifact.requestDate})`], repoDir, env);
        await runGit(["push", "origin", config.branch], repoDir, env);
        const commitSha = await runGit(["rev-parse", "HEAD"], repoDir, env);
        const publicUrls = await resolvePublishedUrls(config, artifact.repoPath, options);
        const downloadUrl = buildRawDownloadUrl(config, artifact.repoPath);
        const verification = options.verifyUrls === false
            ? undefined
            : await verifyPublishedProposalLinks({
                viewUrl: publicUrls.viewUrl,
                githubUrl: publicUrls.githubUrl,
                downloadUrl,
            });
        return {
            repoPath: artifact.repoPath,
            commitSha: commitSha.trim(),
            viewUrl: publicUrls.viewUrl,
            githubUrl: publicUrls.githubUrl,
            downloadUrl,
            pagesUrl: publicUrls.pagesUrl,
            pagesReady: publicUrls.pagesReady,
            verification,
        };
    }
    finally {
        await rm(workspace, { recursive: true, force: true });
    }
}
function normalizePrivateKey(value) {
    return value.includes("\\n") ? value.replace(/\\n/g, "\n").trim() + "\n" : value.trim() + "\n";
}
function normalizeKnownHosts(value) {
    return value.includes("\\n") ? value.replace(/\\n/g, "\n").trim() + "\n" : value.trim() + "\n";
}
function buildGitSshCommand(privateKeyPath, knownHostsPath) {
    const parts = [
        "ssh",
        "-i",
        privateKeyPath,
        "-o",
        "IdentitiesOnly=yes",
        "-o",
        knownHostsPath ? "StrictHostKeyChecking=yes" : "StrictHostKeyChecking=accept-new",
    ];
    if (knownHostsPath) {
        parts.push("-o", `UserKnownHostsFile=${knownHostsPath}`);
    }
    return parts.join(" ");
}
async function runGit(args, cwd, env) {
    try {
        const result = await execFileAsync("git", args, { cwd, env, maxBuffer: 10 * 1024 * 1024 });
        return result.stdout.toString();
    }
    catch (error) {
        const err = error;
        throw new Error(`Git command failed (${args.join(" ")}): ${err.stderr || err.stdout || err.message || "unknown error"}`);
    }
}
