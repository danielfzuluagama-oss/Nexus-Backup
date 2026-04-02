import { load as loadHtml } from "cheerio";
import { PROPOSAL_CANONICAL_BRAND_TOKENS, PROPOSAL_CANONICAL_FORBIDDEN_PATTERNS, PROPOSAL_CANONICAL_NAV_LINKS, PROPOSAL_CANONICAL_SECTIONS, } from "./proposal-canonical.js";
function compactWhitespace(value) {
    return value.replace(/\s+/g, " ").trim();
}
function addIssue(issues, code, message, evidence, blocking = true) {
    issues.push({ code, message, evidence, blocking });
}
function extractVisibleText(html) {
    const $ = loadHtml(html);
    $("script, style, svg, noscript, .modal-overlay, .view-immersive").remove();
    return compactWhitespace($.root().text());
}
export function extractProposalNavOutline(html) {
    const $ = loadHtml(html);
    const entries = [];
    $("#main-nav div[class*=\"lg:flex\"] a").each((index, element) => {
        const href = $(element).attr("href")?.trim() || "";
        const label = compactWhitespace($(element).text());
        entries.push({
            href,
            label,
            index: index,
        });
    });
    return entries;
}
export function extractProposalSectionOutline(html) {
    const $ = loadHtml(html);
    return PROPOSAL_CANONICAL_SECTIONS
        .map((section) => {
        const selector = `section#${section.id}`;
        const element = $(selector).first();
        if (element.length === 0) {
            return null;
        }
        const heading = compactWhitespace(element.find("h1, h2, h3").first().text() || section.heading);
        const index = html.indexOf(`id="${section.id}"`);
        return {
            id: section.id,
            heading,
            index,
        };
    })
        .filter((entry) => entry !== null);
}
function validateBranding(html, issues) {
    for (const token of PROPOSAL_CANONICAL_BRAND_TOKENS) {
        if (!html.includes(token)) {
            addIssue(issues, "missing_brand_token", `Missing brand token: ${token}`, token);
        }
    }
}
function validateForbiddenPhrases(html, issues) {
    const visibleText = extractVisibleText(html);
    for (const pattern of PROPOSAL_CANONICAL_FORBIDDEN_PATTERNS) {
        const match = visibleText.match(pattern);
        if (match) {
            addIssue(issues, "forbidden_phrase", `Forbidden template/process text found: ${match[0]}`, match[0]);
        }
    }
}
function validateNavOrder(html, issues) {
    const actual = extractProposalNavOutline(html);
    const expected = PROPOSAL_CANONICAL_NAV_LINKS;
    if (actual.length !== expected.length) {
        addIssue(issues, actual.length < expected.length ? "missing_nav_link" : "unexpected_nav_link", `Expected ${expected.length} nav links, found ${actual.length}.`, actual.map((entry) => `${entry.href}:${entry.label}`).join(" | "));
    }
    for (let i = 0; i < expected.length; i += 1) {
        const expectedLink = expected[i];
        const actualLink = actual[i];
        if (!actualLink || actualLink.href !== expectedLink.href || actualLink.label !== expectedLink.label) {
            addIssue(issues, "nav_mismatch", `Nav mismatch at position ${i + 1}: expected ${expectedLink.href} (${expectedLink.label}).`, actualLink ? `${actualLink.href} (${actualLink.label})` : "missing link");
        }
    }
}
function validateSectionOrder(html, issues) {
    const actual = extractProposalSectionOutline(html);
    const expected = PROPOSAL_CANONICAL_SECTIONS;
    if (actual.length !== expected.length) {
        addIssue(issues, actual.length < expected.length ? "missing_section" : "unexpected_section", `Expected ${expected.length} sections, found ${actual.length}.`, actual.map((entry) => `${entry.id}:${entry.heading}`).join(" | "));
    }
    let lastIndex = -1;
    for (let i = 0; i < expected.length; i += 1) {
        const expectedSection = expected[i];
        const actualSection = actual[i];
        if (!actualSection || actualSection.id !== expectedSection.id) {
            addIssue(issues, "section_mismatch", `Section mismatch at position ${i + 1}: expected #${expectedSection.id}.`, actualSection ? `#${actualSection.id}` : "missing section");
            continue;
        }
        if (actualSection.index < lastIndex) {
            addIssue(issues, "section_order", `Sections are out of order at #${expectedSection.id}.`, `${actualSection.index} < ${lastIndex}`);
        }
        lastIndex = actualSection.index;
    }
}
export function validateProposalArtifactHtml(html) {
    const issues = [];
    if (!html.trim()) {
        addIssue(issues, "empty_html", "Proposal HTML is empty.", "empty output");
        return { valid: false, issues };
    }
    validateBranding(html, issues);
    validateNavOrder(html, issues);
    validateSectionOrder(html, issues);
    validateForbiddenPhrases(html, issues);
    return {
        valid: issues.length === 0,
        issues,
    };
}
export function formatProposalValidationError(result) {
    if (result.valid) {
        return "Proposal HTML passed canonical validation.";
    }
    const details = result.issues
        .map((issue) => `${issue.code}: ${issue.message} [${issue.evidence}]`)
        .join("; ");
    return `Proposal HTML failed canonical validation: ${details}`;
}
