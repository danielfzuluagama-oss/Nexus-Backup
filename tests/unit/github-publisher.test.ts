import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildPagesViewUrl,
  getGitHubProposalsConfig,
  publishProposalArtifact,
  verifyPublishedProposalLinks,
} from "../../src/proposals/github-publisher.js";
import { buildProposalArtifact } from "../../src/proposals/proposal-artifact.js";

let originalEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
  vi.restoreAllMocks();
});

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) {
      delete process.env[key];
    }
  }
  Object.assign(process.env, originalEnv);
  vi.unstubAllGlobals();
});

describe("github publisher", () => {
  it("returns null config when token is pending", () => {
    process.env.GITHUB_PROPOSALS_TOKEN = "<PENDING>";
    expect(getGitHubProposalsConfig()).toBeNull();
  });

  it("returns null config when the ssh key is pending", () => {
    process.env.GITHUB_PROPOSALS_SSH_KEY = "<PENDING>";
    expect(getGitHubProposalsConfig()).toBeNull();
  });

  it("ignores a pending token when SSH publishing is available", () => {
    process.env.GITHUB_PROPOSALS_TOKEN = "<PENDING>";
    process.env.GITHUB_PROPOSALS_SSH_KEY = "ssh-private-key";
    process.env.GITHUB_PROPOSALS_OWNER = "danielfzuluagama-oss";
    process.env.GITHUB_PROPOSALS_REPO = "propuestas-comerciales";
    process.env.GITHUB_PROPOSALS_BRANCH = "main";

    expect(getGitHubProposalsConfig()).toMatchObject({
      sshKey: "ssh-private-key",
      owner: "danielfzuluagama-oss",
      repo: "propuestas-comerciales",
      branch: "main",
    });
    expect(getGitHubProposalsConfig()?.token).toBeUndefined();
  });

  it("builds config from an SSH deploy key when token is absent", () => {
    process.env.GITHUB_PROPOSALS_SSH_KEY = "ssh-private-key";
    process.env.GITHUB_PROPOSALS_OWNER = "danielfzuluagama-oss";
    process.env.GITHUB_PROPOSALS_REPO = "propuestas-comerciales";
    process.env.GITHUB_PROPOSALS_BRANCH = "main";

    expect(getGitHubProposalsConfig()).toMatchObject({
      sshKey: "ssh-private-key",
      owner: "danielfzuluagama-oss",
      repo: "propuestas-comerciales",
      branch: "main",
    });
  });

  it("builds the Pages URL from the repo path", () => {
    const config = {
      token: "token",
      owner: "danielfzuluagama-oss",
      repo: "propuestas-comerciales",
      branch: "main",
      pagesBaseUrl: "https://danielfzuluagama-oss.github.io/propuestas-comerciales",
    };

    expect(
      buildPagesViewUrl(config, "proposals/acme-corp-2026-03-31/index.html"),
    ).toBe(
      "https://danielfzuluagama-oss.github.io/propuestas-comerciales/proposals/acme-corp-2026-03-31/",
    );
  });

  it("publishes a proposal artifact once Pages is reachable", async () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para Acme Corp",
      "ETAPA 1 | REPASO DE LO ENTENDIDO\nPedido base",
      new Date("2026-03-31T16:00:00.000Z"),
    );

    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not Found",
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          content: {
            sha: "abc123",
            download_url: "https://raw.githubusercontent.com/danielfzuluagama-oss/propuestas-comerciales/main/proposals/acme-corp-2026-03-31/index.html",
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

    vi.stubGlobal("fetch", fetchMock);

    const published = await publishProposalArtifact(artifact, {
      token: "token",
      owner: "danielfzuluagama-oss",
      repo: "propuestas-comerciales",
      branch: "main",
      pagesBaseUrl: "https://danielfzuluagama-oss.github.io/propuestas-comerciales",
    }, {
      verifyUrls: false,
      wait: async () => undefined,
      pagesReadyTimeoutMs: 1_000,
      pagesReadyPollIntervalMs: 1_000,
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(published.commitSha).toBe("abc123");
    expect(published.repoPath).toBe("proposals/acme-corp-2026-03-31/index.html");
    expect(published.viewUrl).toBe(
      "https://danielfzuluagama-oss.github.io/propuestas-comerciales/proposals/acme-corp-2026-03-31/",
    );
    expect(published.githubUrl).toContain("github.com/danielfzuluagama-oss/propuestas-comerciales/blob/main/");
    expect(published.pagesUrl).toBe(
      "https://danielfzuluagama-oss.github.io/propuestas-comerciales/proposals/acme-corp-2026-03-31/",
    );
    expect(published.pagesReady).toBe(true);
    expect(published.downloadUrl).toContain("raw.githubusercontent.com");
  });

  it("falls back to the GitHub file page when Pages is unreachable", async () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para Acme Corp",
      "ETAPA 1 | REPASO DE LO ENTENDIDO\nPedido base",
      new Date("2026-03-31T16:00:00.000Z"),
    );

    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not Found",
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          content: {
            sha: "abc123",
            download_url: "https://raw.githubusercontent.com/danielfzuluagama-oss/propuestas-comerciales/main/proposals/acme-corp-2026-03-31/index.html",
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

    vi.stubGlobal("fetch", fetchMock);

    const published = await publishProposalArtifact(artifact, {
      token: "token",
      owner: "danielfzuluagama-oss",
      repo: "propuestas-comerciales",
      branch: "main",
      pagesBaseUrl: "https://danielfzuluagama-oss.github.io/propuestas-comerciales",
    }, {
      verifyUrls: false,
      wait: async () => undefined,
      pagesReadyTimeoutMs: 1,
      pagesReadyPollIntervalMs: 1,
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(published.pagesReady).toBe(false);
    expect(published.viewUrl).toContain("github.com/danielfzuluagama-oss/propuestas-comerciales/blob/main/");
    expect(published.pagesUrl).toBe(
      "https://danielfzuluagama-oss.github.io/propuestas-comerciales/proposals/acme-corp-2026-03-31/",
    );
  });

  it("rejects invalid proposal HTML before any publish attempt", async () => {
    const artifact = {
      ...buildProposalArtifact(
        "Necesito una propuesta comercial para Acme Corp",
        "ETAPA 1 | REPASO DE LO ENTENDIDO\nPedido base",
        new Date("2026-03-31T16:00:00.000Z"),
      ),
      html: [
        "<!doctype html>",
        "<html lang=\"es\">",
        "  <body>",
        "    <p>Plantilla controlada</p>",
        "    <p>ETAPA 1 | SCAFFOLD INICIAL</p>",
        "  </body>",
        "</html>",
      ].join("\n"),
    };

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      publishProposalArtifact(artifact, {
        token: "token",
        owner: "danielfzuluagama-oss",
        repo: "propuestas-comerciales",
        branch: "main",
        pagesBaseUrl: "https://danielfzuluagama-oss.github.io/propuestas-comerciales",
      }),
    ).rejects.toThrow(/canonical validation/i);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("verifies the published proposal links explicitly", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, status: 200 })
      .mockResolvedValueOnce({ ok: true, status: 200 })
      .mockResolvedValueOnce({ ok: false, status: 404 });

    vi.stubGlobal("fetch", fetchMock);

    const verification = await verifyPublishedProposalLinks({
      viewUrl: "https://example.com/view",
      githubUrl: "https://github.com/example/repo/blob/main/proposal.html",
      downloadUrl: "https://raw.githubusercontent.com/example/repo/main/proposal.html",
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(verification.ok).toBe(false);
    expect(verification.viewUrlReachable).toBe(true);
    expect(verification.githubUrlReachable).toBe(true);
    expect(verification.downloadUrlReachable).toBe(false);
    expect(verification.issues).toContain("downloadUrl is not reachable");
  });
});
