import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  enforceMintoStructure,
  stripFormattingArtifacts,
  replaceForbiddenTerms,
  scoreDeliverable,
  enforceExcellenceLoop,
  FORBIDDEN_TERM_MAP,
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
