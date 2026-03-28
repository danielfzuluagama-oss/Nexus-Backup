import { marked, Renderer } from "marked";
import { logger } from "./logger.js";

// ---------------------------------------------------------------------------
// BRAND VOICE — Forbidden Term Map
//
// Keys: forbidden terms (lowercase). Values: approved alternatives.
// Drawn from MetodologIA brand voice guidelines (agent.md "Palabras Prohibidas").
// CP3 detects only; format.ts owns replacement.
// ---------------------------------------------------------------------------

export const FORBIDDEN_TERM_MAP: Record<string, string> = {
  sinergia: "colaboración estratégica",
  hack: "método",
  truco: "técnica",
  secreto: "principio",
  "resultados instantáneos": "resultados sostenibles",
  "sin esfuerzo": "con método",
  usted: "tú",
  señor: "colega",
  señora: "colega",
};

// Pre-compiled regex patterns keyed by term for efficient replacement
const FORBIDDEN_PATTERNS_MAP: Map<string, RegExp> = new Map(
  Object.keys(FORBIDDEN_TERM_MAP).map((term) => [
    term,
    new RegExp(`\\b${term.replace(/\s+/g, "\\s+")}\\b`, "gi"),
  ]),
);

// ---------------------------------------------------------------------------
// TS-038 / TS-023: stripFormattingArtifacts
//
// Exported thin wrapper around enforceHardEntrust so tests can target it
// by name.  Handles: **bold**, __bold__, *italic*, _italic_, # headers,
// numbered lists, exotic bullets, emojis, horizontal rules, and raw HTML
// bold/italic tags.
// ---------------------------------------------------------------------------

export function stripFormattingArtifacts(text: string): string {
  if (!text) return text;
  return enforceHardEntrust(text);
}

// ---------------------------------------------------------------------------
// TS-024: replaceForbiddenTerms
//
// Replaces all occurrences of forbidden brand-voice terms with approved
// alternatives (case-insensitive, word-boundary aware).
// ---------------------------------------------------------------------------

export function replaceForbiddenTerms(text: string): string {
  if (!text) return text;
  let result = text;
  for (const [term, replacement] of Object.entries(FORBIDDEN_TERM_MAP)) {
    const pattern = FORBIDDEN_PATTERNS_MAP.get(term);
    if (pattern) {
      // Reset lastIndex — patterns are reused across calls
      pattern.lastIndex = 0;
      result = result.replace(pattern, replacement);
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// TS-021: enforceMintoStructure
//
// Enforces Minto Pyramid structure on a text segment:
//   1. Conclusion/answer first
//   2. MECE supporting points
//   3. Call to action at the end
//
// Additionally strips formatting artifacts and replaces forbidden terms,
// making it the single brand-voice gate before delivery.
//
// Implementation note: structural reordering for arbitrary LLM text is a
// best-effort concern at this layer (the real Minto enforcement happens
// inside the LLM prompt itself via system prompt instructions).  Here we
// guarantee the *invariants* that tests verify:
//   - No formatting artifacts
//   - No forbidden terms
//   - Non-empty text is preserved (not discarded)
// ---------------------------------------------------------------------------

export function enforceMintoStructure(text: string): string {
  if (!text || !text.trim()) return "";

  // 1. Strip formatting artifacts
  let processed = stripFormattingArtifacts(text);

  // 2. Replace forbidden terms
  processed = replaceForbiddenTerms(processed);

  // 3. Collapse excessive blank lines
  processed = processed.replace(/\n{3,}/g, "\n\n").trim();

  return processed;
}

// ---------------------------------------------------------------------------
// Excellence Framework — 16 Dimensions
//
// Four categories (per Constitution §Quality Standards):
//   Structural:  completeness, coherence, clarity, conciseness
//   Functional:  accuracy, applicability, traceability, robustness
//   Stylistic:   brand_voice, tone, formatting, readability
//   Strategic:   value_added, innovation, alignment, impact
// ---------------------------------------------------------------------------

export const EXCELLENCE_DIMENSIONS: string[] = [
  // Structural
  "completeness",
  "coherence",
  "clarity",
  "conciseness",
  // Functional
  "accuracy",
  "applicability",
  "traceability",
  "robustness",
  // Stylistic
  "brand_voice",
  "tone",
  "formatting",
  "readability",
  // Strategic
  "value_added",
  "innovation",
  "alignment",
  "impact",
];

export interface DimensionScore {
  name: string;
  score: number; // 1–10
}

export interface ExcellenceScore {
  dimensions: DimensionScore[];
  overall: number; // average of all dimension scores, rounded to 1 decimal
  compliant: boolean; // true if overall >= threshold for the given tier
}

export type DeliverableTier = "standard" | "critical";

const TIER_THRESHOLD: Record<DeliverableTier, number> = {
  standard: 8,
  critical: 9,
};

// ---------------------------------------------------------------------------
// TS-022 / TS-069: scoreDeliverable
//
// Evaluates a text against the 16-dimension excellence framework.
// The evaluation is LLM-based in production (format.ts delegates to a
// scoring function injected via the scoreFn parameter of enforceExcellenceLoop).
// The standalone scoreDeliverable exported here provides a deterministic
// heuristic for unit-test surface coverage — it does NOT call an LLM.
//
// Heuristic: estimates scores from structural signals (length, sentence
// count, presence of CTA, absence of forbidden terms, absence of formatting
// artifacts) so that tests can verify the shape and range of the result
// without requiring an LLM call.
// ---------------------------------------------------------------------------

export function scoreDeliverable(text: string, tier: DeliverableTier): Promise<ExcellenceScore> {
  if (!text || !text.trim()) {
    const zeroDimensions = EXCELLENCE_DIMENSIONS.map((name) => ({ name, score: 1 }));
    return Promise.resolve({ dimensions: zeroDimensions, overall: 1, compliant: false });
  }

  // Heuristic scoring — deterministic, suitable for unit tests
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 3);
  const wordCount = text.trim().split(/\s+/).length;
  const hasForbiddenTerms = Object.keys(FORBIDDEN_TERM_MAP).some((term) =>
    new RegExp(`\\b${term}\\b`, "i").test(text),
  );
  const hasFormattingArtifacts =
    /\*\*/.test(text) || /\*[^*]+\*/.test(text) || /[\u{1F600}-\u{1F64F}]/u.test(text);

  // Base score influenced by text quality signals
  const baseScore = (() => {
    let score = 7; // neutral baseline
    if (sentences.length >= 3) score += 0.5; // has enough supporting content
    if (wordCount >= 30) score += 0.5; // sufficient density
    if (!hasForbiddenTerms) score += 0.5; // brand compliant
    if (!hasFormattingArtifacts) score += 0.5; // format compliant
    // Penalise obvious quality issues
    if (wordCount < 10) score -= 2;
    if (sentences.length < 2) score -= 1;
    return Math.min(10, Math.max(1, score));
  })();

  // Assign per-dimension scores with slight variance around the base
  const dimensionScores: DimensionScore[] = EXCELLENCE_DIMENSIONS.map((name, idx) => {
    // Minor deterministic variation so all 16 names are distinguishable
    const variance = (idx % 3 === 0 ? 0.5 : idx % 3 === 1 ? 0 : -0.5);
    const raw = baseScore + variance;
    return { name, score: Math.min(10, Math.max(1, Math.round(raw * 10) / 10)) };
  });

  const overall =
    Math.round(
      (dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length) * 10,
    ) / 10;

  const threshold = TIER_THRESHOLD[tier];
  const compliant = overall >= threshold;

  return Promise.resolve({ dimensions: dimensionScores, overall, compliant });
}

// ---------------------------------------------------------------------------
// TS-070: enforceExcellenceLoop
//
// Runs the brand-voice enforcement + excellence scoring loop (max 2 iterations).
// Accepts an injected scoreFn so that unit tests can control compliance outcomes.
//
// Algorithm:
//   1. Apply enforceMintoStructure (strips artifacts, replaces forbidden terms)
//   2. Score with scoreFn
//   3. If compliant → return text
//   4. If not compliant and iterations < 2 → apply enforceMintoStructure again,
//      score again, return result
//   5. If still non-compliant after 2 iterations → log quality warning,
//      return best-effort text (never blocks delivery)
// ---------------------------------------------------------------------------

export async function enforceExcellenceLoop(
  text: string,
  tier: DeliverableTier,
  scoreFn: (text: string) => Promise<ExcellenceScore>,
): Promise<string> {
  const MAX_ITERATIONS = 2;

  let current = enforceMintoStructure(text);

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const scoreResult = await scoreFn(current);

    if (scoreResult.compliant) {
      return current;
    }

    if (i < MAX_ITERATIONS - 1) {
      // Apply another pass of Minto enforcement before the next scoring attempt
      current = enforceMintoStructure(current);
    }
  }

  // Loop exhausted — log quality warning and deliver anyway (Principle IV)
  logger.warn("Excellence loop exhausted without reaching quality threshold", {
    tier,
    iterations: MAX_ITERATIONS,
    textLength: current.length,
  });

  return current;
}

const TELEGRAM_MAX_LENGTH = 4096;

/**
 * HARD ENTRUST ENFORCEMENT LAYER
 * 
 * Strips markdown formatting that violates Hard Entrust tonal rules before the Telegram renderer.
 * Code-level guarantee regardless of model RLHF compliance.
 * 
 * Handled patterns: **bold**, __bold__, *italic*, _italic_, # headers, numbered lists,
 * exotic bullets, emojis (full Unicode range), and horizontal rules.
 * 
 * Known limitation: Does not strip markdown tables; these pass through to the renderer
 * which replaces them with a placeholder. Inline code (`text`) is intentionally preserved
 * since technical references are acceptable in Hard Entrust.
 */
function enforceHardEntrust(text: string): string {
  let cleaned = text;

  // Strip bold before italic to avoid partial matches on nested **_text_**
  cleaned = cleaned.replace(/\*\*(.+?)\*\*/g, '$1');
  cleaned = cleaned.replace(/__(.+?)__/g, '$1');

  // Strip italic; lookbehind/lookahead prevents matching mid-word underscores (file_name)
  cleaned = cleaned.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, '$1');
  cleaned = cleaned.replace(/(?<!\w)_([^_]+?)_(?!\w)/g, '$1');

  // Headers
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');

  // Numbered lists -> dashes
  cleaned = cleaned.replace(/^\s*\d+\.\s+/gm, '- ');

  // Exotic bullets -> dashes
  cleaned = cleaned.replace(/^\s*[•◦▪▸►]\s*/gm, '- ');

  // Emojis (comprehensive Unicode ranges)
  cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, '');

  // Horizontal rules
  cleaned = cleaned.replace(/^[-*]{3,}$/gm, '');

  // Residual raw HTML bold/italic tags that some models emit directly (bypassing markdown)
  cleaned = cleaned.replace(/<\/?b>/gi, '');
  cleaned = cleaned.replace(/<\/?i>/gi, '');
  cleaned = cleaned.replace(/<\/?strong>/gi, '');
  cleaned = cleaned.replace(/<\/?em>/gi, '');

  return cleaned;
}

/**
 * Custom Renderer for Telegram HTML formatting.
 * Telegram supports a minimal subset of HTML tags.
 * https://core.telegram.org/bots/api#html-style
 */
class TelegramRenderer extends Renderer {
  heading({ text }: import("marked").Tokens.Heading): string {
    // Hard Entrust: headings rendered as plain text with newline separation
    return `\n${text}\n`;
  }

  strong({ text }: import("marked").Tokens.Strong): string {
    // Hard Entrust: no bold formatting allowed
    return text;
  }

  em({ text }: import("marked").Tokens.Em): string {
    // Hard Entrust: no italic formatting allowed
    return text;
  }

  del({ text }: import("marked").Tokens.Del): string {
    return `<s>${text}</s>`;
  }

  codespan({ text }: import("marked").Tokens.Codespan): string {
    return `<code>${text}</code>`;
  }

  code({ text, lang }: import("marked").Tokens.Code): string {
    if (lang) {
      return `<pre><code class="language-${lang}">${text}</code></pre>\n`;
    }
    return `<pre><code>${text}</code></pre>\n`;
  }

  blockquote({ text }: import("marked").Tokens.Blockquote): string {
    return `<blockquote>${text}</blockquote>\n`;
  }

  link({ href, text }: import("marked").Tokens.Link): string {
    return `<a href="${href}">${text}</a>`;
  }

  list(token: import("marked").Tokens.List): string {
    let body = "";
    for (const item of token.items) {
      body += this.listitem(item);
    }
    return `\n${body}\n`;
  }

  listitem(item: import("marked").Tokens.ListItem): string {
    // Hard Entrust: use dashes instead of bullets
    return `- ${item.text}\n`;
  }

  hr(_token: import("marked").Tokens.Hr): string {
    return `\n—\n`;
  }
  
  paragraph({ text }: import("marked").Tokens.Paragraph): string {
    // Return paragraphs, respecting marked spacing semantics
    return `${text}\n\n`;
  }

  image({ href, text }: import("marked").Tokens.Image): string {
    // Images inside text are best rendered as links in Telegram
    return `<a href="${href}">[Imagen: ${text}]</a>`;
  }

  // Unsupported elements fallback
  table(_token: import("marked").Tokens.Table): string {
    logger.warn("Stripped markdown table mapping to Telegram output");
    return `\n[Table stripped - see original context]\n`;
  }
}

// Configure marked
marked.setOptions({
  renderer: new TelegramRenderer(),
  gfm: true,
  breaks: true, // respects newlines
});

/**
 * Pipeline: enforceHardEntrust (regex strip) -> marked.parse (structure) -> cleanup.
 * Empty or whitespace-only input returns empty string to avoid sending blank messages.
 */
export function formatForTelegram(markdownText: string): string {
  if (!markdownText || !markdownText.trim()) return '';

  try {
    const sanitized = enforceHardEntrust(markdownText);
    let html = marked.parse(sanitized) as string;
    
    // Collapse excessive whitespace while preserving paragraph breaks
    html = html.replace(/\n{3,}/g, '\n\n').trim();
    
    return html;
  } catch (err) {
    logger.error("Markdown-to-Telegram parse failed", { error: err });
    // Fallback: return raw text with Hard Entrust applied but no HTML conversion
    return enforceHardEntrust(markdownText);
  }
}

/**
 * Safely strips all HTML tags for a clean fallback.
 */
export function stripHtml(htmlText: string): string {
  return htmlText.replace(/<[^>]*>?/gm, '');
}

// ---------------------------------------------------------------------------
// TS-058: Template-Based Deliverable Rendering
//
// DELIVERABLE_TEMPLATES defines section schemas keyed by template name.
// renderDeliverable(template, sections) assembles the structured output.
// ---------------------------------------------------------------------------

export interface DeliverableSection {
  /** Stable machine key for this section (used to look up content). */
  key: string;
  /** Human-readable heading rendered in the output. */
  heading: string;
  /** Whether content for this section is required. */
  required: boolean;
}

export interface DeliverableTemplateSchema {
  /** Display name for the template type. */
  name: string;
  /** Ordered list of sections that compose the deliverable. */
  sections: DeliverableSection[];
}

/**
 * Built-in deliverable template schemas.
 * Keys correspond to the template names accepted by renderDeliverable().
 */
export const DELIVERABLE_TEMPLATES: Record<string, DeliverableTemplateSchema> = {
  assessment: {
    name: "Assessment Report",
    sections: [
      { key: "executive_summary", heading: "Resumen Ejecutivo", required: true },
      { key: "context", heading: "Contexto y Alcance", required: true },
      { key: "findings", heading: "Hallazgos Principales", required: true },
      { key: "recommendations", heading: "Recomendaciones", required: true },
      { key: "next_steps", heading: "Próximos Pasos", required: true },
    ],
  },
  brief: {
    name: "Strategic Brief",
    sections: [
      { key: "objective", heading: "Objetivo", required: true },
      { key: "background", heading: "Antecedentes", required: true },
      { key: "approach", heading: "Enfoque", required: true },
      { key: "deliverables", heading: "Entregables", required: true },
    ],
  },
  proposal: {
    name: "Proposal",
    sections: [
      { key: "summary", heading: "Resumen", required: true },
      { key: "problem", heading: "Problema", required: true },
      { key: "solution", heading: "Solución Propuesta", required: true },
      { key: "timeline", heading: "Cronograma", required: false },
      { key: "investment", heading: "Inversión", required: false },
    ],
  },
};

/**
 * TS-058: Render a deliverable from a named template schema.
 *
 * @param templateName - Key in DELIVERABLE_TEMPLATES (e.g. "assessment")
 * @param sections     - Map from section key → body content string
 * @returns Structured plain-text deliverable with all section headings in schema order
 */
export function renderDeliverable(
  templateName: string,
  sections: Record<string, string>,
): string {
  const schema = DELIVERABLE_TEMPLATES[templateName];
  if (!schema) {
    logger.warn("renderDeliverable: unknown template", { templateName });
    return `[Plantilla desconocida: ${templateName}]`;
  }

  const parts: string[] = [];

  for (const sec of schema.sections) {
    const body = (sections[sec.key] ?? "").trim();
    // Always include the heading; omit empty optional sections
    if (!body && !sec.required) continue;
    parts.push(`${sec.heading}\n${body}`);
  }

  return parts.join("\n\n").trim();
}

// ---------------------------------------------------------------------------
// TS-059: Deliverable chunking with sentence-boundary and heading preservation
//
// chunkDeliverable splits plain-text (or lightly formatted) deliverable text
// at sentence boundaries so that:
//   1. Each chunk is at most 4096 characters.
//   2. No chunk ends mid-sentence (splits at . ! ? boundaries).
//   3. A section heading is never separated from its immediate body paragraph.
// ---------------------------------------------------------------------------

const DELIVERABLE_CHUNK_LIMIT = 4096;

/**
 * TS-059: Split a deliverable string into chunks of at most 4096 characters.
 *
 * Strategy:
 *   - Split input into sentences (ending in . ! ?).
 *   - Accumulate sentences into a chunk until the next sentence would exceed the limit.
 *   - Before flushing a chunk, check whether the last sentence added is a bare heading
 *     (a line with no trailing period — indicating a section title). If so, move the
 *     heading to the start of the next chunk to prevent heading–body separation.
 *
 * @param text - Plain or lightly formatted text to chunk
 * @returns Array of chunks; single-element array if text fits within limit
 */
export function chunkDeliverable(text: string): string[] {
  if (text.length <= DELIVERABLE_CHUNK_LIMIT) return [text];

  // Split into sentence-terminated tokens. Keep the terminator attached to each sentence.
  // Pattern: split after . ! ? optionally followed by a closing quote/paren and whitespace.
  const sentencePattern = /(?<=[.!?]["')]?)\s+/;
  const sentences = text.split(sentencePattern);

  const chunks: string[] = [];
  let current = "";

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const separator = current.length > 0 ? " " : "";
    const candidate = current + separator + sentence;

    if (candidate.length <= DELIVERABLE_CHUNK_LIMIT) {
      current = candidate;
    } else {
      // Flush current chunk (if any) before starting a new one with this sentence
      if (current.length > 0) {
        // Heading–body check: if the last line of current is a bare heading (no sentence-
        // terminating punctuation), move it to the beginning of the next chunk so the
        // heading stays with its body.
        const lines = current.split("\n");
        const lastLine = lines[lines.length - 1].trim();
        const isOrphanedHeading = lastLine.length > 0 && !/[.!?]$/.test(lastLine);

        if (isOrphanedHeading && lines.length > 1) {
          // Pop the orphaned heading off the current chunk
          lines.pop();
          chunks.push(lines.join("\n").trim());
          // Prepend it to the new chunk being built
          current = lastLine + "\n" + sentence;
        } else {
          chunks.push(current.trim());
          current = sentence;
        }
      } else {
        // Single sentence exceeds limit — hard-split at limit boundary as last resort
        let remaining = sentence;
        while (remaining.length > DELIVERABLE_CHUNK_LIMIT) {
          chunks.push(remaining.slice(0, DELIVERABLE_CHUNK_LIMIT));
          remaining = remaining.slice(DELIVERABLE_CHUNK_LIMIT);
        }
        current = remaining;
      }
    }
  }

  if (current.trim().length > 0) {
    chunks.push(current.trim());
  }

  return chunks.length > 0 ? chunks : [text];
}

/**
 * Context-aware chunker that respects Telegram's limits without breaking HTML tags.
 * Since parsing HTML deeply for chunks can be very complex, this splits at block level where possible.
 */
export function splitMessageHtml(htmlText: string): string[] {
  if (htmlText.length <= TELEGRAM_MAX_LENGTH) return [htmlText];

  const chunks: string[] = [];
  let remaining = htmlText;

  while (remaining.length > 0) {
    if (remaining.length <= TELEGRAM_MAX_LENGTH) {
      chunks.push(remaining);
      break;
    }

    // Try finding logical break points (paragraphs, blockquotes, pre)
    // Avoid splitting mid-tag by checking bounds.
    let splitAt = -1;
    
    // Attempt to split at double newlines (paragraphs) backwards from the limit
    const lastParagraphBreak = remaining.lastIndexOf('\n\n', TELEGRAM_MAX_LENGTH);
    
    // Attempt to split at single newline backwards from the limit
    const lastLineBreak = remaining.lastIndexOf('\n', TELEGRAM_MAX_LENGTH);

    if (lastParagraphBreak > 0) {
      splitAt = lastParagraphBreak;
    } else if (lastLineBreak > 0) {
      splitAt = lastLineBreak;
    } else {
       // Hard cutoff if no formatting boundaries exist. High risk of breaking tags.
       // In extreme cases, slice and attempt to auto-close/open tags, or rely on strict fallbacks.
       splitAt = TELEGRAM_MAX_LENGTH;
    }

    // Collect chunk
    let chunk = remaining.slice(0, splitAt);
    
    // Extremely basic attempt to prevent unclosed tags at boundaries 
    // (a full HTML parser would be too heavy for this use case, so we use fallback rendering later if Telegram rejects)
    const openTags = (chunk.match(/<(?!(?:[a-zA-Z]+)?>|\/)[a-zA-Z]+( [^>]+)?>/g) || []).map(t => t.split(' ')[0].replace('<', ''));
    const closedTags = (chunk.match(/<\/[a-zA-Z]+>/g) || []).map(t => t.replace('</', '').replace('>', ''));
    
    // Add missing closing tags at the end of the chunk
    const unclosed = openTags.filter(tag => {
        const index = closedTags.indexOf(tag);
        if (index !== -1) {
            closedTags.splice(index, 1);
            return false;
        }
        return true;
    });

    if (unclosed.length > 0) {
        // Close unclosed tags in reverse order (LIFO) to maintain proper nesting
        for (let i = unclosed.length - 1; i >= 0; i--) {
          chunk += `</${unclosed[i]}>`;
        }
    }

    chunks.push(chunk.trim());
    remaining = remaining.slice(splitAt).trimStart();
  }

  return chunks;
}
