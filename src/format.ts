import { marked, Renderer } from "marked";
import { logger } from "./logger.js";

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
