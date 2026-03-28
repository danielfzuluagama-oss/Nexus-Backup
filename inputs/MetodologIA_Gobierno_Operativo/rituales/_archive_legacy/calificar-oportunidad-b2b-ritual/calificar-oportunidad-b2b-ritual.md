# Ritual: Calificar Oportunidad B2B (Sovereign v3.0)

> [!IMPORTANT]
> **Estado:** Sovereign Gold Master v3.0
> **Objetivo:** Determinar la viabilidad técnica y financiera de la cuenta para proteger la soberanía del tiempo del equipo comercial.
> **KPI:** Ratio de Cierre (Target: >30% de oportunidades calificadas convertidas a contrato).

## 1. Meta-Data del Ritual

- **DRI:** Sales Executive / Account Executive.
- **Frecuencia:** Tras cada reunión de Discovery.
- **Herramientas:** CRM, Matriz de Calificación (Scoring Card), Metodología MEDDIC.
- **Sinergia:**
  - **Input:** Datos extraídos de la reunión de Discovery.
  - **Output:** Clasificación de la cuenta (VIP / Standard / Nurture) y activación del flujo de contratos.

## 2. Protocolo de Sinergia (Loop de Retroalimentación)

- **Pre-Ritual:** ¿Se han completado todos los puntos del [Discovery]? Si falta información sobre el "Dolor", el ritual se detiene.
- **Post-Ritual:** Si el score es >80, disparar automáticamente el ritual de [Mapeo de Stakeholders] para profundizar en el comité de compras.

## 3. Algoritmo de Ejecución Profunda (2x Densidad)

### Paso 1: Verificación de Fit ICP (Ideal Customer Profile)

**Contexto:** El entusiasmo no es un criterio de venta. Validamos contra el perfil canónico.

**Acción:** Verificar ingresos de la empresa, número de empleados y stack tecnológico compatible.
**Output:** Fit del Cliente Validado (VIP/Target/Avoid).

### Paso 2: Detección del "Dolor Crítico" (The Burning Flag)

**Contexto:** Vendemos aspirinas para dolores reales, no vitaminas para deseos futuros.

**Acción:** Preguntar: "¿Qué pasa si NO resuelven este problema en los próximos 6 meses?".
**Output:** Gravedad del Dolor Documentada.

### Paso 3: Prompt: Auditoría de Discovery (10x)

**Contexto:** Usamos IA para detectar inconsistencias en el discurso del cliente.

**Acción:** Procesar las notas de la reunión con el motor de auditoría.
**Prompt de IA:** "Actúa como un Auditor de Riesgos Ventas. Analiza este discovery: [Texto]. Identifica contradicciones y califica la urgencia real del 1 al 10."

**Output:** Reporte de Riesgos Detectados.

### Paso 4: Identificación del Decision Maker (DM)

**Contexto:** Sin DM no hay firma. Identificamos el flujo de aprobación legal/financiera.

**Acción:** Validar quién tiene el poder de firma final fuera del contacto actual.
**Output:** Árbol de Autoridad de Compra.

### Paso 5: Validación del Champion Interno

**Contexto:** Necesitamos a alguien que venda por nosotros cuando no estemos en la sala.

**Acción:** Confirmar si el contacto tiene incentivos para que el proyecto sea exitoso.
**Output:** Perfil del Champion Validado.

### Paso 6: Verificación del Timeline y Disparadores

**Contexto:** Un "lo queremos para ayer" suele ser una mentira; buscamos hitos reales.

**Acción:** Identificar el evento (auditoría, junta, fin de año) que obliga a decidir.
**Output:** Timeline Duro con Hito Crítico.

### Paso 7: Escrutinio de Competencia (Status Quo)

**Contexto:** La complacencia es el enemigo. ¿Están mirando otras opciones?

**Acción:** Preguntar qué criterios innegociables nos dejarían fuera del juego.
**Output:** Mapa de Amenazas Competitivas.

### Paso 8: Validación de Capacidad de Inversión

**Contexto:** Evitamos perseguir "Ghost Opportunities" sin presupuesto asignado.

**Acción:** Confirmar si hay una partida presupuestal o si debe crearse desde cero.
**Output:** Estatus Financiero de la Oportunindad.

### Paso 9: Cálculo de Scoring Maestro

**Contexto:** Convertimos sensaciones en métricas (0-100 pts).

**Acción:** Aplicar matriz MEDDIC: Métricas, Economic Buyer, Decision Criteria, Decision Process, Identifify Pain, Champion.
**Output:** Score Final de la Cuenta.

### Paso 10: Clasificación y Bridge Táctico

**Contexto:** Decidimos la velocidad del seguimiento basada en el score.

**Acción:** Mover a "Fast Track" (Score >80) o "Nurture" (Score <50).
**Output:** Acción Siguiente en CRM (Draft de Contrato / Nurture Email).

## 4. Modal 10x: El "Qualifying Beast" (Prompt de Verdad)

```markdown
PROMPT DE AUDITORÍA:
"Basado en los campos MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion), evalúa esta oportunidad:
Metrics: [Dato]
EB: [Nombre/Rol]
Pain: [Descripción]
Escribe un reporte crítico que diga 3 razones por las que esta venta VA A FALLAR y cómo prevenirlas hoy."
```

---
**Standard**: MetodologIA v3.0.0
