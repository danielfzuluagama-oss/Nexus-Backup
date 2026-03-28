# Política de Uso Aceptable de IA Generativa

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** CTO / COO
**Cierra:** FMT-10 (Backcasting CTO)

---

## 1. Propósito

Reglas para el uso responsable de herramientas de IA generativa en MetodologIA, protegiendo datos de clientes y propiedad intelectual.

---

## 2. Lo que NUNCA se Pega en un Prompt de IA Externa

| Categoría | Ejemplos | Razón |
|-----------|----------|-------|
| **Datos personales de clientes** | Nombres, emails, teléfonos, NIT, cédulas | Ley 1581/2012 + riesgo de entrenamiento |
| **Información financiera del cliente** | Estados financieros, precios específicos, contratos con montos | Confidencialidad contractual |
| **Credenciales** | API keys, passwords, tokens | Seguridad |
| **Código fuente propietario del cliente** | Si el cliente comparte su código en consultoría | NDA + IP |
| **Información RESTRINGIDA** | Cualquier dato clasificado como RESTRINGIDO | Política interna |

## 3. Lo que SÍ se Puede Usar con IA

| Categoría | Ejemplos | Condición |
|-----------|----------|-----------|
| Información pública | Blog, catálogo, frameworks publicados | Sin restricción |
| Drafts internos sin datos de cliente | SOPs, rituales, templates genéricos | Aceptable |
| Código genérico (no del cliente) | Scripts internos, automatizaciones | Aceptable |
| Preguntas de conocimiento general | "¿Cómo funciona NIIF 15?" | Sin restricción |
| Material de formación genérico | Contenido educativo sin datos de clientes | Aceptable |

---

## 4. Prompt Templates Seguros para Contexto de Cliente

Estos templates permiten usar IA con datos de cliente **anonimizados**:

### Template A: Análisis de diagnóstico (consultoría)
```
Contexto: Empresa del sector [SECTOR] con [RANGO] empleados en [CIUDAD], Colombia.
Problema: El cliente reporta [DESCRIPCIÓN GENÉRICA DEL PROBLEMA].
Pregunta: ¿Cuáles son las 5 preguntas de discovery más relevantes para entender la causa raíz?
NOTA: No mencionar nombre de empresa, personas, ni datos financieros específicos.
```

### Template B: Propuesta comercial (pre-sales)
```
Elabora una propuesta de valor para un servicio de [TIPO DE SERVICIO] dirigido a una empresa
del sector [SECTOR] que tiene el siguiente dolor: [DESCRIPCIÓN ANONIMIZADA].
Usar el formato de MetodologIA: Contexto → Diagnóstico → Propuesta → Inversión → Cronograma.
NO incluir montos; solo dejar marcadores [INVERSIÓN] para completar manualmente.
```

### Template C: Contenido educativo
```
Diseña un ejercicio práctico para un [WS/BC/PE] sobre [TEMA].
Audiencia: [PERFIL GENÉRICO — ej. "gerentes de PYMES tech en LATAM"].
Duración: [TIEMPO]. Formato: [individual/grupal].
El ejercicio debe aplicar el concepto de [FRAMEWORK] a un caso ficticio.
```

---

## 5. Reglas por Herramienta

| Herramienta | Nivel de confianza | Datos permitidos | Notas |
|------------|-------------------|-----------------|-------|
| **Claude Code** (local) | ALTO | Información interna, código | Ejecución local, no entrena |
| **NotebookLM** (Google) | MEDIO | Internos sin datos RESTRINGIDOS | Revisar ToS vigentes |
| **ChatGPT** (OpenAI) | MEDIO | Solo público o interno genérico | Opt-out de entrenamiento en Team/Enterprise |
| **Copilot** (GitHub) | MEDIO | Código genérico | No pegar código del cliente |
| **Herramientas IA del cliente** | SEGÚN CONTRATO | Lo que el contrato permita | Verificar DPA/NDA antes |

---

## 6. Propiedad Intelectual de Outputs de IA

| Situación | Regla |
|-----------|-------|
| Output para uso interno | MetodologIA lo usa libremente (revisar, editar, publicar) |
| Output como entregable al cliente | DEBE ser revisado y editado por humano. No entregar raw. Declarar si el cliente pregunta. |
| Output para material de formación | Aceptable si se verifica veracidad por experto humano |
| Output para documentos legales | SOLO como borrador. SIEMPRE revisión por abogado antes de uso |

---

## 7. Posición sobre Código Generado por IA

Todo código generado o asistido por IA (Claude, Copilot, ChatGPT) que se vaya a **desplegar en producción** debe:

1. **Revisión humana obligatoria** — El desarrollador lee y entiende cada línea antes de hacer commit.
2. **Escaneo de seguridad** — Pasar por análisis estático (mínimo: `npm audit` para JS, `safety check` para Python, o equivalente).
3. **No incluir secretos** — Verificar que el código generado no tiene API keys, passwords, o URLs internas hardcodeadas.
4. **Licencias** — Verificar que el código generado no reproduce bloques de código con licencias restrictivas (GPL en proyecto MIT, etc.).
5. **Testing** — El código generado por IA requiere los mismos tests que el código escrito manualmente.

---

## 8. Checklist de Revisión de Output IA (antes de entregar a cliente)

Completar antes de enviar cualquier contenido generado por IA a un cliente:

- [ ] **Fact-check:** ¿Los datos, cifras y afirmaciones son correctos? (verificar contra fuente primaria)
- [ ] **Tone-check:** ¿El tono es consistente con la voz de MetodologIA? (profesional, empoderador, sin jerga innecesaria)
- [ ] **IP-check:** ¿El output contiene fragmentos que podrían ser propiedad intelectual de terceros?
- [ ] **Hallucination-check:** ¿Hay referencias a leyes, artículos, libros o personas que no existen?
- [ ] **Datos filtrados:** ¿El output revela datos de OTRO cliente por contaminación de contexto?
- [ ] **Personalización:** ¿Se editó suficientemente para que no parezca output genérico de IA?
- [ ] **Disclaimer:** Si el cliente pregunta, ¿estamos preparados para declarar que usamos IA como herramienta?

---

## 9. Checklist Pre-Prompt

Antes de pegar información en una herramienta de IA:

- [ ] ¿Contiene datos personales? → SI: NO PEGAR
- [ ] ¿Contiene información financiera de un cliente? → SI: NO PEGAR
- [ ] ¿Contiene credenciales o secretos? → SI: NO PEGAR
- [ ] ¿Está clasificada como RESTRINGIDA? → SI: NO PEGAR
- [ ] ¿Estoy usando una herramienta aprobada? → SI: PROCEDER CON CUIDADO
- [ ] ¿El output será entregado al cliente? → SI: PASAR POR CHECKLIST DE REVISIÓN (sección 8)
