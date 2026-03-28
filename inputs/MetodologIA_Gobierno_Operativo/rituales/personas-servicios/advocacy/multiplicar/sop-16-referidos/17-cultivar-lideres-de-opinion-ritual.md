---
id: "17"

segmento: "personas-servicios"
journey: "advocacy"
proceso: "multiplicar"
sop: "sop-16-referidos"
ritual-slug: "17-cultivar-lideres-de-opinion"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Content Lead"
- backup: "Growth Lead"
frecuencia: "mensual"
herramientas:

- "CRM"
- "LinkedIn"
- "Notion/Drive"
- "Zoom"
entry-criteria:

- "≥5 clientes graduados de servicios consultivos"
- "≥3 con NPS ≥ 9 y transformation narrative potente"
exit-criteria:

- "≥1 caso de estudio publicado por trimestre"
- "≥1 co-creación de contenido con cliente por trimestre"
- "Thought leadership pipeline activo"

kpi: "Advocacy Content Rate (Target: ≥1 pieza de contenido co-creada/trimestre)"
riesgos-controles:

- riesgo: "Explotar la historia del cliente sin reciprocidad"

control: "Co-creación siempre: el cliente aporta, el cliente revisa, el cliente se beneficia"

- riesgo: "Contenido genérico que no diferencia"

control: "Cada pieza debe incluir datos/resultados específicos (con permiso)"
evidencias:

- "Case studies publicados"
- "Co-created content"
- "Thought leadership calendar"
---

# Ritual: Cultivar Líderes de Opinión — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Principio:** Los clientes exitosos son los mejores marketers. Pero no se les usa — se co-crea CON ellos. El valor fluye en ambas direcciones: a ellos les da visibilidad, a MetodologIA le da credibilidad.

---

## 5. Ejecutar

### 5.1 — Identificar clientes "advocates" (NPS ≥ 9 + narrative potente)

**Acción:** De los graduados, seleccionar los que: tienen historia poderosa + están dispuestos a compartir + tienen plataforma profesional.

**Output:** Advocate list.
**Evidencia:** CRM — tag Ambassador_Client.

### 5.2 — Proponer co-creación (no "puedo contar tu historia")

**Script:** "[nombre], tu transformación de [before] a [after] es increíble. Me encantaría co-crear un contenido que cuente tu experiencia — como caso de estudio, artículo, o incluso un episodio de podcast. Tú eliges el formato y lo revisas antes de publicar. ¿Te interesa?"

**Output:** Acepta / No por ahora.
**Evidencia:** CRM.

### 5.3 — Co-crear caso de estudio

**Acción:** Formato: Before → Challenge → Solution → Results → Takeaway. Siempre co-editado con el cliente.

**Prompt de IA:**

```markdown

PROMPT:
"Escribe un caso de estudio consultivo basado en estos datos:
Cliente: [nombre] (solo si autorizó, sino anonimizar), Industria: [X].
Before: [dolor y situación inicial].
Challenge: [el reto específico].
Solution: [qué hicimos — sin revelar IP].
Results: [outcomes con datos].
Takeaway: [aprendizaje universal].
Formato: 800-1000 palabras. Tono: storytelling, datos concretos, inspiracional pero creíble."
```

**Output:** Draft de caso de estudio.

**Evidencia:** Doc.

### 5.4-5.10 — [Revisión con el cliente, publicación en canales apropiados, co-create newsletter/post content, mantener relación activa con advocates, quarterly thought leadership planning, track impact of advocacy content, métricas]

---

## 6-10. [Estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 18 → autorizar-facilitador-certificado`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Case Study Builder" (Prompt Pro)

```markdown
PROMPT:
"Genera un caso de estudio consultivo para MetodologIA:
Cliente: [nombre o anónimo], Programa: [X], Before: [dolor], After: [resultado].
Datos de resultado: [métricas específicas].
Formato: Before → Challenge → Solution → Results → Takeaway.
800-1000 palabras. Tono: storytelling, datos, inspiración creíble.
Incluir: 1 quote textual del cliente, 1 dato impactante, 1 takeaway universal."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
