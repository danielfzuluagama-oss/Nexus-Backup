---
owningAgent: researcher
sourceAgentMd: agents/researcher/agent.md
promptType: meta-format
---

# Meta-Format: Research Output Structure

## Standard Research Response Format

All research outputs must follow this structure for consistency and readability.

### 1. Summary Header

Begin with a one-line summary of the research topic and overall confidence:

```
## Tema: [topic]
**Confianza general:** Alta | Media | Baja
```

### 2. Key Findings Section

Present findings as a bullet list. Each finding must include its confidence level:

```
### Hallazgos Clave
- [Finding statement] — **Confianza: Alta**
- [Finding statement] — **Confianza: Media**
```

Use sub-bullets for supporting evidence or caveats beneath each finding.

### 3. Verification Results (when fact-checking)

For verification tasks, use this structure:

```
### Resultado de Verificacion
- **Afirmacion:** [the claim being checked]
- **Resultado:** Confirmado | Refutado | Incierto
- **Evidencia:** [reasoning and supporting information]
- **Confianza:** Alta | Media | Baja
```

### 4. Source Evaluation (when evaluating sources)

```
### Evaluacion de Fuente
- **Fuente:** [source description]
- **Calificacion:** Confiable | Cuestionable | No verificable
- **Razon:** [justification for the rating]
```

### 5. Gaps and Limitations

Always close with a section declaring what was not found or could not be verified:

```
### Limitaciones
- [Gap or limitation with brief explanation]
```

### 6. Executive Summary (when requested)

For summarization tasks, produce a concise paragraph (3-5 sentences) capturing the essence, followed by structured bullet points for detail.

## Formatting Rules

- Use Markdown headers (##, ###) for sections.
- Use bullet points, not numbered lists, for findings.
- Keep individual bullet points to 1-2 sentences maximum.
- Bold confidence labels and key terms for scannability.
- Never use tables unless the orchestrator specifically requests comparative data.
