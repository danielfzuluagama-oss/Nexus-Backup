---
id: "05"

segmento: "personas-masivo"
journey: "evaluation"
proceso: "demostrar-valor"
sop: "sop-05-try-and-buy"
ritual-slug: "05-entregar-try-and-buy"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Content Lead"
- backup: "Growth Lead"
frecuencia: "asincrónica automática (trigger post-diagnóstico o post-enriquecimiento)"
herramientas:

- "CRM Marketing Automation"
- "Plataforma de Video/LMS (YouTube, Wistia, Notion)"
- "Sistema de Tracking (Links traceables)"

entry-criteria:

- "Lead con `Diagnosis_Score` calculado (vía R04) O Lead `Hot` con Asset asignado directamente (R03)"

exit-criteria:

- "Try & Buy asset entregado exitosamente"
- "Consumo del asset medido (completion rate, time spent, scroll depth)"
- "CTA integrado dentro del asset presentado al lead"
- "Secuencia de follow-up activada"
kpi: "Try-to-Proposal Rate (Target: ≥25% de quienes consumen el asset avanzan a ver la propuesta R06)"
leading-indicators:

- "Asset Open/Click Rate (email inicial)"
- "Consumption Velocity (tiempo entre recibir y consumir)"
- "Asset Completion Rate (llegaron al final donde está el CTA)"

riesgos-controles:

- riesgo: "Try & Buy de baja calidad (mala primera impresión técnica)"

  control: "El asset debe tener estándar de producción 'Premium' — es el mejor aperitivo del menú, no las sobras."

- riesgo: "Asset demasiado largo (el lead lo guarda para 'después' y nunca lo ve)"

  control: "Hard limit: Masterclass < 45m, Guía < 10 pags, Tool < 15 mins time-to-value."

- riesgo: "Dar demasiado valor gratuito (se sacian y no compran la oferta core)"

  control: "Regla del 10%: El asset enseña el 'Qué' y el 'Por qué', la oferta core vende el 'Cómo' detallado."
evidencias:

- "Registro de entrega de asset en CRM"
- "Métricas de engagement registradas en el contacto"
- "Tracking de CTA clickeado (hacia R06)"
---

# Ritual: Entregar Try & Buy — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** En productos masivos (digitales, conocimiento), el "pitch" tradicional no funciona. La gente "compra" probando. El Try & Buy es una muestra representativa de alta fidelidad de la solución completa.
> **La Promesa Modular:** Si este asset de 15 minutos me ahorró 2 horas, el programa completo debe ser transformacional.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Inmediatamente después de que el lead recibe su resultado del diagnóstico (R04) o directamente validado desde el enriquecimiento IA si no hubo diagnóstico (R03).
- **Pre-ritual:** ¿El tracking pixel/enlace único está configurado para saber exactamente hasta qué minuto vio el video o hasta qué página bajó el PDF?
- **Contexto:** El usuario acaba de identificar su "dolor" (vía Life Event o Diagnóstico). Su atención está al máximo. Es el momento perfecto para inyectar una "prueba rápida" de que nosotros tenemos la llave de ese dolor.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Lograr que el prospecto consuma una muestra premium de contenido que resuelva un micro-problema inmediato, elevando su nivel de confianza para la compra principal.
- **Definición de Éxito (DoD):**
  - [ ] Asset correcto despachado vía email/DM automático
  - [ ] Lead consume >50% del Asset (verificado por tracking)
  - [ ] El CTA dentro del asset fue visto
  - [ ] Lead calificado para pasar a R06
- **Definición de Éxito del Lead:** "Esta herramienta/video gratuito me fue más útil que tres cursos por los que he pagado."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Content Lead | Calidad de producción y relevancia del asset |
| **Responsible** | Growth Lead | Automatización de la entrega y el tracking de consumo |

| **Consulted** | Sales Director | Alineación del "gancho" final hacia la oferta |
| **Informed** | Customer Success | Saber qué expectativas se están seteando |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Biblioteca de assets organizados por "Dolor/Life Event"
- [ ] Enlaces con UTMs y tracking scripts activos
- [ ] Plantillas de email de entrega contextualizadas a los resultados de R04
- [ ] Plataforma de hosting del asset 100% operativa (cero fricción de login)

---

## 5. Ejecutar — Parte 1: Entrega y Consumo

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Configurar el "Puente Cognitivo" (El Email)

**Acción:** Redactar y enviar correo usando el contexto previo.

**Script Base:** "[nombre], basándome en que tu cuello de botella actual es [Resultado Dimension Débil de R04], saqué este módulo de nuestro programa cerrado. Es una Masterclass táctica de 20 mins sobre [Tema]. Te lo dejo abierto por 48hrs. Úsalo."
**Output:** Email disparado.

**Evidencia:** CRM Outbound Log.

### 5.2 — Landing de Consumo (Fricción Cero)

**Contexto:** Si le pides crear una cuenta para ver el video gratuito, dropean el 50%.

**Acción:** El enlace lleva a una "Secret Page" simple. Solo el player de video/PDF y el CTA debajo.
**Output:** Experiencia de consumo iniciada.

**Evidencia:** Page analytics.

### 5.3 — Trackear Consumption Depth

**Acción:** Analytics en background mide: ¿Vio 10%? ¿Vio 80%? ¿Leyó 3 páginas?

**Output:** Metric `Asset_Completion_Rate`.
**Evidencia:** Video/Web Analytics integrados a CRM.

### 5.4 — El "Aha Moment" dentro del Asset

**Regla de diseño:** En el minuto 7 (o página 3), el asset DEBE entregar un insight contra-intuitivo que reviente un paradigma del lead. Esto separa un "buen contenido" de un "Try & Buy".

**Output:** Generación de confianza instantánea.

### 5.5 — El CTA (Puente a R06) Integrado

**Contexto:** El CTA NO ES un botón "Comprar" duro. Es un puente de escala.

**Script en el video/PDF:** "Si aplicar este framework te dio claridad hoy, vas a querer ver el sistema completo. Lo que acabas de ver es literalmente la Lección 1 del Módulo 2 de [Oferta]. Si quieres implementar el roadmap completo, revisa esto: [Link a R06]."
**Output:** Puente comercial activado.

**Evidencia:** Link clicks.

### 5.6 — Follow-up de los "No-Shows" (24h)

**Acción:** Si abrieron el email pero NO clickearon el asset.

**Script:** "[nombre], sé cómo se pierden las pestañas en el navegador. Recuerdo: Aquí tienes el [Asset]. Es clave para resolver [Dolor]."
**Output:** Recordatorio enviado.

### 5.7 — Follow-up de los "Scanners" (48h)

**Acción:** Si consumieron <20% del asset.

**Script:** "Viendo la data, parece que saltaste a la conclusión del reporte. Para que funcione [Concepto], el secreto está en la página 4. No te saltes el paso B si quieres evitar [Dolor agudo de industria]."
**Output:** Re-engagement enviado.

### 5.8 — Follow-up de los "Completers" (Inmediato post-finalización)

**Acción:** Consumieron >80% pero no clickearon el CTA.

**Script:** "Pude ver que terminaste la sesión sobre [Tema]. ¿Qué te pareció el enfoque de [Aha Moment]? Si tienes los cimientos listos, el siguiente paso lógico es mirar la certificación completa: [Link a R06]."
**Output:** Oferta transicionada.

### 5.9 — Scoring Upgrade basado en Consumo

**Acción:** Sumar puntos al `Lead_Score` original. Consumir el asset suma +20 pts de "Action Readiness".

**Output:** Nuevo Lead Score.
**Evidencia:** CRM field actualizado.

### 5.10 — Taggear Cohorts (Engaged vs Dormant)

**Acción:** Etiquetar en CRM. Quienes consumieron y respondieron van al cohorte de alta prioridad de oferta.

**Output:** Segmentación limpia.
**Evidencia:** Tags `TryBuy_Completer`.

---

## 6-7. Ejecutar — Parte 2 y 3: Monitoreo y Ajuste

### 6.1-6.5 — Analizar Drop-off del Asset (¿Dónde pausan el video definitivamente? Cortar aburrimiento ahí)

### 6.6-6.10 — A/B Test de "Puentes Cognitivos" (Subject lines del email inicial)

### 7.1-7.5 — Evaluar Tasa de Click de CTA dentro del Asset vs CTA en el email de Follow-up

### 7.6-7.10 — Retirar assets que no generen "Aha Moments" (>60% abandono rápido), documentar victorias

---

## 8. Validación y Calidad (QA)

- [ ] "Aha Moment" garantizado en el primer tercio del Asset
- [ ] No requiere creación de contraseñas ni 2FA para visualizar el Asset
- [ ] El CTA dentro del Asset es orgánico y derivado de la lección impartida, no un anuncio pegado con cinta
- [ ] Tracking de consumo operativo y fluyendo al CRM

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Dispa de Asset email | Log Automation | CRM | Growth Lead |
| Consumption Data | % Score | Lead Record | Marketing Ops |
| Clicks hacia Oferta | CTR Metric | Dashboard | Content Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [06-presentar-oferta-digital](../../proposal/estructurar-oferta/sop-06-propuesta/06-presentar-oferta-digital-ritual.md).
- **Condición de handoff:** El prospecto experimentó valor de primera mano, su "Action Readiness" aumentó, y ha sido expuesto formal o informalmente al enlace de la oferta de nuestro producto masivo.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Asset Consumption Rate | ≥50% de envíos | 🟡 |
| Try-to-Proposal CTR | ≥25% de completers | 🟡 |

- **NEXT:** `personas-masivo → 06 → presentar-oferta-digital`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Try & Buy Asset Selector" (Prompt Pro)

**Use case:** Cuando tienes un hub de 10+ recursos gratuitos y necesitas emparejar dinámicamente el Asset correcto para cada prospecto analizado.

```markdown
PROMPT:
"Eres el curador maestro de una academia digital B2C.
Tengo este prospecto: Lead [Nombre], Life Event [X], Pain Points inferidos [lista de 3], Result Diagnóstico: [Gap Principal].
Mi biblioteca de Try & Buy Assets contiene: [Pegar lista de Títulos y objetivos de Assets].
Ejecuta:
1. Selecciona el UNICO Asset matemáticamente más congruente con su Gap Principal.
2. Justifica por qué en 1 frase (para uso interno nuestro).
3. Redacta el correo de entrega (Zero-Pressure) de no más de 4 líneas que cree el 'Puente Cognitivo' (unir su dolor con la solución de este Asset).
4. Redacta el CTA exacto que quiero que mi equipo inserte AL FINAL del Asset, conectando la lección aprendida con la Oferta Mayor.
Mantén tono Neo-Swiss, experto pero humilde."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
