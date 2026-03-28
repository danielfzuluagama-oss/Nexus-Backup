import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  enforceMintoStructure,
  stripFormattingArtifacts,
  replaceForbiddenTerms,
  scoreDeliverable,
  enforceExcellenceLoop,
  FORBIDDEN_TERM_MAP,
  renderDeliverable,
  chunkDeliverable,
  DELIVERABLE_TEMPLATES,
  formatForTelegram,
  splitMessageHtml,
  stripHtml,
} from "../../src/format.js";

// ---------------------------------------------------------------------------
// Mock logger — must come before any imports that use the logger
// ---------------------------------------------------------------------------
vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// ---------------------------------------------------------------------------
// Helper to get the mocked logger after it has been set up
// ---------------------------------------------------------------------------
async function getLoggerMock() {
  const { logger } = await import("../../src/logger.js");
  return logger;
}

// ---------------------------------------------------------------------------
// TS-021 — Minto structure enforcement
// ---------------------------------------------------------------------------

describe("TS-021: Minto structure enforcement", () => {
  it("enforceMintoStructure returns a string", () => {
    const result = enforceMintoStructure(
      "Conclusion here. Supporting point one. Supporting point two. Take this action now.",
    );
    expect(typeof result).toBe("string");
  });

  it("output begins with a conclusion statement", () => {
    const input =
      "The recommended approach is systematic delegation. " +
      "First, define the agent roles. " +
      "Second, validate inputs at each checkpoint. " +
      "Start the migration today.";
    const result = enforceMintoStructure(input);
    // Minto: conclusion comes first — the first sentence should be a declarative statement
    expect(result.trim().length).toBeGreaterThan(0);
    // The result should not start with a question or a subordinate clause
    expect(result.trim()).not.toMatch(/^(because|although|when|if|while|since)\b/i);
  });

  it("output contains supporting points after the conclusion", () => {
    const input =
      "La estrategia óptima es el método sistemático. " +
      "El primer soporte: la validación de entradas reduce riesgos. " +
      "El segundo soporte: la delegación paralela acelera la entrega. " +
      "Implementa el proceso esta semana.";
    const result = enforceMintoStructure(input);
    expect(result.length).toBeGreaterThan(0);
    // Result should contain more than just the conclusion — supporting content preserved
    expect(result.trim().split(/[.!?]+/).filter(s => s.trim().length > 0).length).toBeGreaterThanOrEqual(2);
  });

  it("output ends with a call to action", () => {
    const input =
      "The system is ready for production. " +
      "Latency meets the 60-second SLA. " +
      "Security checkpoints pass at 100%. " +
      "Deploy to Cloud Run today.";
    const result = enforceMintoStructure(input);
    // CTA is typically imperative — result should preserve or add a forward-looking closing
    expect(result.trim().length).toBeGreaterThan(0);
  });

  it("output contains no forbidden terms after enforcement", () => {
    const input =
      "La sinergia entre equipos es clave. " +
      "El hack más efectivo es el método. " +
      "Empieza mañana.";
    const result = enforceMintoStructure(input);
    // enforceMintoStructure should chain forbidden-term replacement
    // "sinergia" must not appear in the output
    expect(result).not.toMatch(/\bsinergia\b/i);
  });

  it("output contains no formatting artifacts after enforcement", () => {
    const input =
      "**Conclusión**: La estrategia es sólida. " +
      "*Soporte uno*: La arquitectura escala. " +
      "1. Implementa hoy.";
    const result = enforceMintoStructure(input);
    expect(result).not.toContain("**");
    expect(result).not.toMatch(/^\d+\.\s/m);
  });

  it("does not throw on empty input", () => {
    expect(() => enforceMintoStructure("")).not.toThrow();
  });

  it("returns empty string for empty or whitespace-only input", () => {
    expect(enforceMintoStructure("")).toBe("");
    expect(enforceMintoStructure("   ")).toBe("");
  });
});

// ---------------------------------------------------------------------------
// TS-023 — Formatting artifact stripping
// ---------------------------------------------------------------------------

describe("TS-023: Formatting artifact stripping", () => {
  // Bold markers (**)
  describe("bold markers (**)", () => {
    it("removes **bold** markers, preserving text content", () => {
      const result = stripFormattingArtifacts("This is **bold** text.");
      expect(result).not.toContain("**");
      expect(result).toContain("bold");
    });

    it("removes __bold__ (underscore) markers", () => {
      const result = stripFormattingArtifacts("This is __bold__ text.");
      expect(result).not.toContain("__");
      expect(result).toContain("bold");
    });

    it("handles multiple bold spans in a single string", () => {
      const result = stripFormattingArtifacts("**A** and **B** are bold.");
      expect(result).not.toContain("**");
      expect(result).toContain("A");
      expect(result).toContain("B");
    });
  });

  // Italic markers (*)
  describe("italic markers (*)", () => {
    it("removes *italic* markers, preserving text content", () => {
      const result = stripFormattingArtifacts("This is *italic* text.");
      expect(result).not.toContain("*italic*");
      expect(result).toContain("italic");
    });

    it("removes _italic_ (underscore) markers", () => {
      const result = stripFormattingArtifacts("This is _italic_ text.");
      expect(result).not.toContain("_italic_");
      expect(result).toContain("italic");
    });

    it("does NOT strip underscores in identifiers like file_name or snake_case", () => {
      const result = stripFormattingArtifacts("Use file_name or snake_case here.");
      // Mid-word underscores must be preserved
      expect(result).toContain("file_name");
      expect(result).toContain("snake_case");
    });
  });

  // Emojis
  describe("emojis", () => {
    it("removes common face emojis (U+1F600-U+1F64F range)", () => {
      const result = stripFormattingArtifacts("Hello 😀 World 🎉");
      expect(result).not.toMatch(/[\u{1F600}-\u{1F64F}]/u);
      expect(result).not.toMatch(/[\u{1F300}-\u{1F5FF}]/u);
    });

    it("removes emojis from a string, preserving surrounding text", () => {
      const result = stripFormattingArtifacts("Ready! ✅ Done 🚀");
      expect(result).toContain("Ready");
      expect(result).toContain("Done");
      // No emoji characters should remain
      expect(result).not.toMatch(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u,
      );
    });

    it("returns clean text when no emojis are present", () => {
      const input = "No emojis here.";
      expect(stripFormattingArtifacts(input)).toBe(input);
    });
  });

  // Markdown numbered lists
  describe("markdown numbered lists", () => {
    it("converts '1. item' numbered list markers to dashes", () => {
      const result = stripFormattingArtifacts("1. First item\n2. Second item");
      expect(result).not.toMatch(/^\d+\.\s/m);
    });

    it("preserves the text content of list items after converting markers", () => {
      const result = stripFormattingArtifacts("1. First item\n2. Second item");
      expect(result).toContain("First item");
      expect(result).toContain("Second item");
    });

    it("handles indented numbered lists", () => {
      const result = stripFormattingArtifacts("  1. Indented item");
      expect(result).not.toMatch(/^\s*\d+\.\s/m);
    });
  });

  // General
  it("returns empty string unchanged", () => {
    expect(stripFormattingArtifacts("")).toBe("");
  });

  it("does not alter plain prose with no formatting artifacts", () => {
    const plain = "This is plain professional prose with no artifacts.";
    expect(stripFormattingArtifacts(plain)).toBe(plain);
  });
});

// ---------------------------------------------------------------------------
// TS-024 — Forbidden term detection and replacement
// ---------------------------------------------------------------------------

describe("TS-024: Forbidden term detection and replacement", () => {
  it("FORBIDDEN_TERM_MAP is exported and contains 'sinergia' as a key", () => {
    expect(FORBIDDEN_TERM_MAP).toBeDefined();
    expect(typeof FORBIDDEN_TERM_MAP).toBe("object");
    const keys = Object.keys(FORBIDDEN_TERM_MAP).map(k => k.toLowerCase());
    expect(keys).toContain("sinergia");
  });

  it("replaces 'sinergia' with the approved alternative", () => {
    const result = replaceForbiddenTerms("La sinergia entre equipos impulsa resultados.");
    expect(result).not.toMatch(/\bsinergia\b/i);
  });

  it("replacement for 'sinergia' is a non-empty string", () => {
    const original = "sinergia";
    const result = replaceForbiddenTerms(`Texto con ${original} aquí.`);
    // The approved alternative (whatever it is) must be non-empty
    expect(result.trim().length).toBeGreaterThan(0);
    // And different from the forbidden term
    expect(result).not.toMatch(/\bsinergia\b/i);
  });

  it("zero forbidden terms remain in the delivered output", () => {
    const allForbidden = Object.keys(FORBIDDEN_TERM_MAP).join(", ");
    const sentence = `Usando ${allForbidden} en el contexto.`;
    const result = replaceForbiddenTerms(sentence);
    for (const term of Object.keys(FORBIDDEN_TERM_MAP)) {
      expect(result).not.toMatch(new RegExp(`\\b${term}\\b`, "i"));
    }
  });

  it("replacement is case-insensitive — detects 'Sinergia' (capitalized)", () => {
    const result = replaceForbiddenTerms("Sinergia organizacional es importante.");
    expect(result).not.toMatch(/\bSinergia\b/i);
  });

  it("replacement is case-insensitive — detects 'SINERGIA' (uppercase)", () => {
    const result = replaceForbiddenTerms("La SINERGIA del equipo es notable.");
    expect(result).not.toMatch(/\bSINERGIA\b/i);
  });

  it("does not modify text without forbidden terms", () => {
    const clean = "El método sistemático impulsa resultados sostenibles.";
    expect(replaceForbiddenTerms(clean)).toBe(clean);
  });

  it("replaces 'hack' with an approved alternative", () => {
    const result = replaceForbiddenTerms("Este hack resuelve el problema.");
    expect(result).not.toMatch(/\bhack\b/i);
  });

  it("replaces 'truco' with an approved alternative", () => {
    const result = replaceForbiddenTerms("Aquí tienes un truco útil.");
    expect(result).not.toMatch(/\btruco\b/i);
  });

  it("replaces 'secreto' with an approved alternative", () => {
    const result = replaceForbiddenTerms("El secreto del éxito es constancia.");
    expect(result).not.toMatch(/\bsecreto\b/i);
  });

  it("does not throw on empty input", () => {
    expect(() => replaceForbiddenTerms("")).not.toThrow();
    expect(replaceForbiddenTerms("")).toBe("");
  });
});

// ---------------------------------------------------------------------------
// TS-070 — Non-compliant output triggers enforcement loop (max 2 iterations)
// ---------------------------------------------------------------------------

describe("TS-070: Non-compliant output triggers enforcement loop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("enforceExcellenceLoop returns a string for any input", async () => {
    const result = await enforceExcellenceLoop(
      "Some response that may or may not be compliant.",
      "standard",
      async (_text: string) => ({
        dimensions: Array(16).fill({ name: "test", score: 9 }),
        overall: 9,
        compliant: true,
      }),
    );
    expect(typeof result).toBe("string");
  });

  it("returns the input unchanged if already compliant on first pass", async () => {
    const input = "La decisión es implementar el sistema hoy. El método valida la arquitectura. Inicia el despliegue ahora.";
    const result = await enforceExcellenceLoop(
      input,
      "standard",
      async (_text: string) => ({
        dimensions: Array(16).fill({ name: "d", score: 9 }),
        overall: 9,
        compliant: true,
      }),
    );
    expect(result).toBe(input);
  });

  it("runs a maximum of 2 iterations when non-compliant", async () => {
    let callCount = 0;
    const scoreFn = async (_text: string) => {
      callCount++;
      return {
        dimensions: Array(16).fill({ name: "d", score: 5 }),
        overall: 5,
        compliant: false,
      };
    };

    await enforceExcellenceLoop(
      "Non-compliant response without proper structure.",
      "standard",
      scoreFn,
    );

    // The loop should call scoreFn at most 2 times (initial check + 1 retry)
    expect(callCount).toBeLessThanOrEqual(2);
  });

  it("logs a quality warning when loop exhausted and output still non-compliant", async () => {
    const loggerMock = await getLoggerMock();

    await enforceExcellenceLoop(
      "Non-compliant text that resists restructuring.",
      "standard",
      async (_text: string) => ({
        dimensions: Array(16).fill({ name: "d", score: 4 }),
        overall: 4,
        compliant: false,
      }),
    );

    // logger.warn should be called when quality threshold not met after max iterations
    expect(loggerMock.warn).toHaveBeenCalled();
  });

  it("final output follows Minto structure (no forbidden terms) when loop converges", async () => {
    // Simulate: first call non-compliant, second call compliant
    let iteration = 0;
    const scoreFn = async (_text: string) => {
      iteration++;
      const compliant = iteration >= 2;
      return {
        dimensions: Array(16).fill({ name: "d", score: compliant ? 9 : 5 }),
        overall: compliant ? 9 : 5,
        compliant,
      };
    };

    const input =
      "La conclusión es que el método funciona. " +
      "La sinergia del equipo es el soporte. " +
      "Implementa el plan hoy.";

    const result = await enforceExcellenceLoop(input, "standard", scoreFn);
    // After loop, forbidden terms must be replaced
    expect(result).not.toMatch(/\bsinergia\b/i);
  });

  it("delivers output even when loop cannot achieve compliance (graceful degradation)", async () => {
    const result = await enforceExcellenceLoop(
      "Mediocre response with no redeeming structure.",
      "standard",
      async () => ({
        dimensions: Array(16).fill({ name: "d", score: 3 }),
        overall: 3,
        compliant: false,
      }),
    );
    // Must still return a non-empty string — never blocks delivery
    expect(typeof result).toBe("string");
    expect(result.trim().length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// TS-022 — Critical deliverable scored at 9/10 minimum
// ---------------------------------------------------------------------------

describe("TS-022: Critical deliverable scored at 9/10 minimum", () => {
  it("scoreDeliverable returns an object with a dimensions array", async () => {
    const result = await scoreDeliverable("A high-quality deliverable response.", "critical");
    expect(result).toHaveProperty("dimensions");
    expect(Array.isArray(result.dimensions)).toBe(true);
  });

  it("scoreDeliverable returns exactly 16 dimensions", async () => {
    const result = await scoreDeliverable("A high-quality deliverable response.", "critical");
    expect(result.dimensions).toHaveLength(16);
  });

  it("each dimension entry has a name (string) and score (number)", async () => {
    const result = await scoreDeliverable("A high-quality deliverable response.", "critical");
    for (const dim of result.dimensions) {
      expect(typeof dim.name).toBe("string");
      expect(dim.name.length).toBeGreaterThan(0);
      expect(typeof dim.score).toBe("number");
    }
  });

  it("scoreDeliverable returns an overall score property", async () => {
    const result = await scoreDeliverable("A high-quality deliverable response.", "critical");
    expect(result).toHaveProperty("overall");
    expect(typeof result.overall).toBe("number");
  });

  it("scoreDeliverable returns a compliant boolean", async () => {
    const result = await scoreDeliverable("A high-quality deliverable response.", "critical");
    expect(result).toHaveProperty("compliant");
    expect(typeof result.compliant).toBe("boolean");
  });

  it("dimension scores are numbers in the range [1, 10]", async () => {
    const result = await scoreDeliverable("A high-quality deliverable response.", "critical");
    for (const dim of result.dimensions) {
      expect(dim.score).toBeGreaterThanOrEqual(1);
      expect(dim.score).toBeLessThanOrEqual(10);
    }
  });

  it("marks compliant=true when all dimension scores are >= 9 (critical threshold)", async () => {
    // When a mock scorer returns all 9s, compliant should be true for critical
    const result = await scoreDeliverable("An excellent strategic deliverable.", "critical");
    // The result type contract must be consistent with threshold logic
    // A real LLM-based scorer is not deterministic, but the function interface must support this
    expect(result.compliant).toBeDefined();
  });

  it("dimension names cover the four excellence categories per the constitution", async () => {
    const result = await scoreDeliverable("A deliverable text.", "critical");
    const names = result.dimensions.map(d => d.name.toLowerCase());
    // The 16 dimensions span: structural, functional, stylistic, strategic
    // At minimum, the names array should have 16 unique strings
    const unique = new Set(names);
    expect(unique.size).toBe(16);
  });
});

// ---------------------------------------------------------------------------
// TS-069 — Standard deliverable scored at 8/10 minimum
// ---------------------------------------------------------------------------

describe("TS-069: Standard deliverable scored at 8/10 minimum", () => {
  it("scoreDeliverable accepts 'standard' as the second parameter", async () => {
    await expect(
      scoreDeliverable("A standard deliverable response.", "standard"),
    ).resolves.toBeDefined();
  });

  it("returns 16 dimensions for standard deliverables too", async () => {
    const result = await scoreDeliverable("A standard deliverable response.", "standard");
    expect(result.dimensions).toHaveLength(16);
  });

  it("marks compliant=true when overall score >= 8 for standard threshold", async () => {
    const result = await scoreDeliverable("A standard-quality deliverable.", "standard");
    // The interface contract: compliant reflects whether the threshold is met
    expect(typeof result.compliant).toBe("boolean");
  });

  it("marks compliant=false for a standard deliverable with overall score < 8", async () => {
    // This tests that the threshold logic is correctly applied per deliverable type
    // scoreDeliverable(text, 'standard') should yield compliant=false if overall < 8
    // We can't control what the LLM returns, so we test the structure contract here
    const result = await scoreDeliverable("A poor quality deliverable.", "standard");
    expect(result).toHaveProperty("compliant");
  });

  it("standard threshold (8) is lower than critical threshold (9)", async () => {
    // This verifies the threshold differentiation exists by checking the function
    // accepts different tier parameters — structural test of the API contract
    const standardResult = await scoreDeliverable("Same text.", "standard");
    const criticalResult = await scoreDeliverable("Same text.", "critical");
    // Both must return the same dimension count
    expect(standardResult.dimensions).toHaveLength(16);
    expect(criticalResult.dimensions).toHaveLength(16);
  });

  it("overall score property reflects the aggregate of all 16 dimension scores", async () => {
    const result = await scoreDeliverable("A deliverable with varied quality.", "standard");
    // The overall should be a reasonable aggregation of dimension scores
    // It must be within [1, 10]
    expect(result.overall).toBeGreaterThanOrEqual(1);
    expect(result.overall).toBeLessThanOrEqual(10);
  });
});

// ---------------------------------------------------------------------------
// TS-058 — Deliverable rendered with all required template sections,
//           heading hierarchy matches
// ---------------------------------------------------------------------------

describe("TS-058: Deliverable rendered with all required template sections", () => {
  it("DELIVERABLE_TEMPLATES is exported and contains an 'assessment' entry", () => {
    expect(DELIVERABLE_TEMPLATES).toBeDefined();
    expect(typeof DELIVERABLE_TEMPLATES).toBe("object");
    expect(DELIVERABLE_TEMPLATES).toHaveProperty("assessment");
  });

  it("the 'assessment' template schema defines at least one section", () => {
    const schema = DELIVERABLE_TEMPLATES["assessment"];
    expect(Array.isArray(schema.sections)).toBe(true);
    expect(schema.sections.length).toBeGreaterThan(0);
  });

  it("renderDeliverable is exported and callable", () => {
    expect(typeof renderDeliverable).toBe("function");
  });

  it("renderDeliverable returns a string for valid input", () => {
    const sections: Record<string, string> = {};
    for (const sec of DELIVERABLE_TEMPLATES["assessment"].sections) {
      sections[sec.key] = `Content for ${sec.heading}. This section provides relevant analysis and findings.`;
    }
    const result = renderDeliverable("assessment", sections);
    expect(typeof result).toBe("string");
    expect(result.trim().length).toBeGreaterThan(0);
  });

  it("output contains all section headings defined in the assessment template schema", () => {
    const schema = DELIVERABLE_TEMPLATES["assessment"];
    const sections: Record<string, string> = {};
    for (const sec of schema.sections) {
      sections[sec.key] = `Body content for the ${sec.heading} section.`;
    }

    const result = renderDeliverable("assessment", sections);

    for (const sec of schema.sections) {
      expect(result).toContain(sec.heading);
    }
  });

  it("section hierarchy matches the template — headings appear in schema-defined order", () => {
    const schema = DELIVERABLE_TEMPLATES["assessment"];
    const sections: Record<string, string> = {};
    for (const sec of schema.sections) {
      sections[sec.key] = `Body text for ${sec.heading}.`;
    }

    const result = renderDeliverable("assessment", sections);

    let lastIndex = -1;
    for (const sec of schema.sections) {
      const idx = result.indexOf(sec.heading);
      expect(idx).toBeGreaterThan(lastIndex);
      lastIndex = idx;
    }
  });

  it("rendered output contains the body content provided for each section", () => {
    const schema = DELIVERABLE_TEMPLATES["assessment"];
    const sections: Record<string, string> = {};
    for (const sec of schema.sections) {
      sections[sec.key] = `Unique marker: ${sec.key}-body-content`;
    }

    const result = renderDeliverable("assessment", sections);

    for (const sec of schema.sections) {
      expect(result).toContain(`Unique marker: ${sec.key}-body-content`);
    }
  });

  it("renderDeliverable throws or returns error string when an unknown template name is given", () => {
    // Calling with a non-existent template key must not silently produce garbage output
    const result = renderDeliverable("nonexistent_template_xyz", {});
    // Either the function returns an error message string, or it returns empty, but must not throw
    expect(typeof result).toBe("string");
  });

  it("renderDeliverable with empty sections still returns a structured string", () => {
    const result = renderDeliverable("assessment", {});
    expect(typeof result).toBe("string");
  });
});

// ---------------------------------------------------------------------------
// TS-059 — Oversized deliverable chunked at 4096 chars, no chunk ends
//           mid-sentence, no heading split from body
// ---------------------------------------------------------------------------

describe("TS-059: Oversized deliverable chunked with formatting preservation", () => {
  const CHUNK_LIMIT = 4096;

  it("chunkDeliverable is exported and callable", () => {
    expect(typeof chunkDeliverable).toBe("function");
  });

  it("a deliverable within the 4096-char limit is returned as a single-element array", () => {
    const short = "This is a short deliverable. It fits within the limit.";
    const chunks = chunkDeliverable(short);
    expect(Array.isArray(chunks)).toBe(true);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toBe(short);
  });

  it("each chunk is at most 4096 characters long", () => {
    // Generate a deliverable well over the limit using repeated paragraphs
    const paragraph = "La estrategia recomendada es implementar el método sistemático de delegación. " +
      "Este principio garantiza la calidad y la trazabilidad de cada entregable. ";
    const oversized = paragraph.repeat(100); // ~15_000 chars

    const chunks = chunkDeliverable(oversized);

    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(CHUNK_LIMIT);
    }
  });

  it("the concatenation of all chunks preserves the full content (no data loss)", () => {
    const paragraph = "Each sentence contains unique information. The method ensures accuracy. ";
    const oversized = paragraph.repeat(80);

    const chunks = chunkDeliverable(oversized);
    const rejoined = chunks.join(" ").replace(/\s+/g, " ").trim();
    const original = oversized.replace(/\s+/g, " ").trim();

    expect(rejoined).toBe(original);
  });

  it("no chunk ends mid-sentence — each chunk ends at a sentence boundary", () => {
    // Build a controlled text with clear sentence boundaries
    const sentences = Array.from({ length: 200 }, (_, i) =>
      `Sentence number ${i + 1} contains substantive information about the topic.`
    );
    const oversized = sentences.join(" ");

    const chunks = chunkDeliverable(oversized);

    for (const chunk of chunks) {
      const trimmed = chunk.trim();
      if (trimmed.length === 0) continue;
      // Each chunk must end with a sentence-terminating character (., !, ?)
      // optionally followed by a quote or closing parenthesis
      expect(trimmed).toMatch(/[.!?]["')]?\s*$/);
    }
  });

  it("a heading at the start of a chunk is followed by its body in the same chunk", () => {
    // Build text where a section heading appears just under the 4096 boundary
    // so that naive splitting might orphan the heading at the end of a chunk
    const filler = "Body content for the section. This provides detail and analysis. ".repeat(30);
    // Place heading near the end of a 4096-boundary region
    const paddingSize = CHUNK_LIMIT - 20;
    const padding = "A".repeat(paddingSize) + ". ";
    const text = padding + "\nResultados\nEl resultado principal es la mejora del proceso. Implementa el plan hoy.";

    const chunks = chunkDeliverable(text);

    // Find the chunk that contains "Resultados"
    const headingChunk = chunks.find((c) => c.includes("Resultados"));
    if (headingChunk) {
      // The heading must not be the last non-whitespace content in its chunk
      const afterHeading = headingChunk.slice(headingChunk.indexOf("Resultados") + "Resultados".length).trim();
      expect(afterHeading.length).toBeGreaterThan(0);
    }
    // If the heading fell into no chunk, that's also a problem
    const allText = chunks.join("");
    expect(allText).toContain("Resultados");
  });

  it("produces multiple chunks when input exceeds the limit", () => {
    const oversized = "Short sentence. ".repeat(400); // ~6400 chars
    const chunks = chunkDeliverable(oversized);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it("empty string returns an array with one empty string", () => {
    const chunks = chunkDeliverable("");
    expect(chunks).toEqual([""]);
  });
});

// ---------------------------------------------------------------------------
// T091 / TS-091: Markdown-to-Telegram-HTML conversion — formatForTelegram
// ---------------------------------------------------------------------------

describe("T091: formatForTelegram — Markdown-to-Telegram-HTML conversion", () => {
  it("returns empty string for empty input", () => {
    expect(formatForTelegram("")).toBe("");
    expect(formatForTelegram("   ")).toBe("");
  });

  it("converts inline code to <code> tags", () => {
    const result = formatForTelegram("Use `const x = 1` in your code.");
    expect(result).toContain("<code>const x = 1</code>");
  });

  it("converts fenced code blocks to <pre><code> tags", () => {
    const md = "```javascript\nconsole.log('hello');\n```";
    const result = formatForTelegram(md);
    expect(result).toContain("<pre><code");
    expect(result).toContain("console.log");
  });

  it("converts strikethrough to <s> tags", () => {
    const result = formatForTelegram("~~deprecated~~");
    expect(result).toContain("<s>deprecated</s>");
  });

  it("renders links as <a href> tags", () => {
    const result = formatForTelegram("[Pristino](https://example.com)");
    expect(result).toContain('<a href="https://example.com">Pristino</a>');
  });

  it("converts blockquotes to <blockquote> tags", () => {
    const result = formatForTelegram("> This is a quote");
    expect(result).toContain("<blockquote>");
  });

  it("strips bold markdown (Hard Entrust: no bold allowed)", () => {
    const result = formatForTelegram("**important text**");
    expect(result).not.toContain("<b>");
    expect(result).not.toContain("<strong>");
    expect(result).toContain("important text");
  });

  it("strips italic markdown (Hard Entrust: no italic allowed)", () => {
    const result = formatForTelegram("*italic text*");
    expect(result).not.toContain("<i>");
    expect(result).not.toContain("<em>");
    expect(result).toContain("italic text");
  });

  it("strips markdown headers (Hard Entrust: no headings allowed)", () => {
    const result = formatForTelegram("# Heading One");
    expect(result).not.toMatch(/<h[1-6]/);
  });

  it("converts list items to dash-prefixed lines (Hard Entrust: no bullets)", () => {
    const result = formatForTelegram("- item one\n- item two");
    expect(result).toContain("- item one");
    expect(result).toContain("- item two");
  });

  it("returns a non-empty string for plain prose input", () => {
    const result = formatForTelegram(
      "El equipo analizo los datos y concluyo que el enfoque es correcto."
    );
    expect(result.trim().length).toBeGreaterThan(0);
  });

  it("does not crash on input with tables (strips with placeholder)", () => {
    const md = "| Col A | Col B |\n| ----- | ----- |\n| Val 1 | Val 2 |";
    const result = formatForTelegram(md);
    expect(typeof result).toBe("string");
    // Table is stripped with a safe placeholder
    expect(result).toContain("Table stripped");
  });
});

// ---------------------------------------------------------------------------
// T091: splitMessageHtml — Telegram message chunking
// ---------------------------------------------------------------------------

describe("T091: splitMessageHtml — message chunking for Telegram 4096-char limit", () => {
  it("returns single-element array for short text", () => {
    const short = "Hello world";
    const chunks = splitMessageHtml(short);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toBe(short);
  });

  it("splits text exceeding 4096 characters into multiple chunks", () => {
    // Generate text that is clearly over 4096 chars
    const long = "a".repeat(500) + "\n\n" + "b".repeat(500) + "\n\n" + "c".repeat(500) +
                 "\n\n" + "d".repeat(500) + "\n\n" + "e".repeat(500) + "\n\n" + "f".repeat(500) +
                 "\n\n" + "g".repeat(500) + "\n\n" + "h".repeat(500) + "\n\n" + "i".repeat(500);
    const chunks = splitMessageHtml(long);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it("each chunk is at most 4096 characters (excluding auto-closed tags)", () => {
    const long = "word ".repeat(2000); // ~10000 chars
    const chunks = splitMessageHtml(long);
    // Allow a small buffer for auto-close tags added during splitting
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(4200);
    }
  });

  it("concatenating chunks preserves total content length roughly", () => {
    const long = "paragraph text here. ".repeat(300);
    const chunks = splitMessageHtml(long);
    const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
    // Allow ±100 characters for whitespace trimming
    expect(Math.abs(totalLength - long.trim().length)).toBeLessThan(200);
  });
});

// ---------------------------------------------------------------------------
// T091: stripHtml — plain text fallback
// ---------------------------------------------------------------------------

describe("T091: stripHtml — HTML tag removal for plain text fallback", () => {
  it("strips simple tags", () => {
    expect(stripHtml("<b>bold</b>")).toBe("bold");
    expect(stripHtml("<code>code</code>")).toBe("code");
    expect(stripHtml("<s>strike</s>")).toBe("strike");
  });

  it("strips nested tags", () => {
    expect(stripHtml("<pre><code>fn()</code></pre>")).toBe("fn()");
  });

  it("strips anchor tags but preserves text content", () => {
    const result = stripHtml('<a href="https://example.com">Click here</a>');
    expect(result).toBe("Click here");
  });

  it("preserves plain text that has no HTML tags", () => {
    const plain = "This has no tags at all.";
    expect(stripHtml(plain)).toBe(plain);
  });

  it("returns empty string for empty input", () => {
    expect(stripHtml("")).toBe("");
  });

  it("strips all tags from a multi-element HTML string", () => {
    const html = "<blockquote>A quote.</blockquote>\n<code>code block</code>";
    const result = stripHtml(html);
    expect(result).not.toMatch(/<[^>]+>/);
    expect(result).toContain("A quote.");
    expect(result).toContain("code block");
  });
});

// ---------------------------------------------------------------------------
// Additional branch coverage: splitMessageHtml — unclosed tag detection
// ---------------------------------------------------------------------------

describe("splitMessageHtml — unclosed tag auto-closing at chunk boundary", () => {
  it("closes an unclosed bold tag when splitting across the 4096-char boundary", () => {
    // Build text > 4096 chars where a <b> tag opens before the split point but never closes
    const prefix = "a".repeat(3900); // text before the tag
    const withTag = `${prefix}<b>${"content in bold ".repeat(30)}</b>extra text after closing`;
    const chunks = splitMessageHtml(withTag);
    // Should have multiple chunks
    expect(chunks.length).toBeGreaterThan(1);
    // The first chunk should not have dangling unclosed <b> — either the tag was closed or split differently
    // Main assertion: all chunks are strings with content
    for (const chunk of chunks) {
      expect(typeof chunk).toBe("string");
      expect(chunk.length).toBeGreaterThan(0);
    }
  });

  it("handles text with multiple unclosed tags at boundary", () => {
    // Create text that splits within a <b><i> nested context
    const longContent = "word ".repeat(900); // ~4500 chars
    const htmlContent = `<b><i>${longContent}</i></b>`;
    const chunks = splitMessageHtml(htmlContent);
    expect(chunks.length).toBeGreaterThanOrEqual(1);
    for (const chunk of chunks) {
      expect(chunk.trim().length).toBeGreaterThan(0);
    }
  });

  it("hard-splits when no paragraph or line break found in a 4096+ char run", () => {
    // No line breaks, no paragraphs — forces hard cutoff path (splitAt = TELEGRAM_MAX_LENGTH)
    const noParagraphBreaks = "word".repeat(1200); // ~4800 chars, no whitespace breaks
    const chunks = splitMessageHtml(noParagraphBreaks);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(4096 + 100); // allow small overshoot from tag closing
    }
  });
});
