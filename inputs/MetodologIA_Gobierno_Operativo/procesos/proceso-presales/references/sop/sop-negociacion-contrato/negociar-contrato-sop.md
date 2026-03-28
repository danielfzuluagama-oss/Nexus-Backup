# SOP: Negociación de Contrato

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** Director Comercial / Legal
**Cierra:** FM-18 (Backcasting COO)

---

## 1. Propósito

Guiar la negociación de términos contractuales con el cliente, definiendo qué es negociable, qué son red lines, y cuál es el path de escalamiento para cada tipo de concesión.

---

## 2. Clasificación de Términos

### RED LINES (No negociables — nunca ceder)

| # | Término | Razón |
|---|---------|-------|
| RL-01 | Propiedad de metodologías, frameworks y herramientas de MetodologIA | Core IP del negocio |
| RL-02 | Jurisdicción colombiana para resolución de disputas | Protección legal, control de costos |
| RL-03 | Limitación de responsabilidad (no más del valor del contrato en últimos 12 meses) | Riesgo financiero desproporcionado |
| RL-04 | Cláusula de confidencialidad (ambas partes) | Protección de información sensible |
| RL-05 | Derecho a usar el nombre del cliente como referencia comercial (salvo oposición expresa) | Pipeline y marketing |
| RL-06 | Independencia contractual (no relación laboral) | Riesgo laboral |

### NEGOCIABLES (Con aprobación del nivel correspondiente)

| # | Término | Rango negociable | Aprobador |
|---|---------|-----------------|-----------|
| N-01 | Plazo de pago | 30-60 días (estándar: 30) | Director Comercial |
| N-02 | % de anticipo | 20-50% (estándar: 30%) | Director Comercial |
| N-03 | Descuento | Conforme a `matriz-autoridad-descuentos.md` | Según banda |
| N-04 | SLA de respuesta | 4-24h (estándar: 8h hábiles) | Operaciones |
| N-05 | Penalización por incumplimiento de SLA | 0-10% del valor mensual | COO |
| N-06 | Plazo de terminación sin causa | 30-90 días (estándar: 60) | Director Comercial |
| N-07 | Cesión de IP de entregables | Según `cesion-derechos-ip.md` | CEO |
| N-08 | Exclusividad territorial (para aliados) | Caso a caso | CEO |
| N-09 | Duración del contrato marco | 1-3 años (estándar: 1 año con auto-renovación) | Director Comercial |
| N-10 | Idioma del contrato | Español (puede incluir versión bilingüe) | Legal |

---

## 3. Procedimiento de Negociación

### Paso 1: Recibir solicitud de cambios del cliente
- Pedir al cliente que marque los cambios en el borrador del contrato (redline)
- Registrar todos los cambios solicitados en la **Matriz de Negociación**

### Paso 2: Clasificar cada cambio
- Para cada solicitud del cliente, clasificar como: RED LINE, NEGOCIABLE, o ACEPTABLE

### Paso 3: Preparar contraoferta
- RED LINE: Explicar al cliente por qué no es negociable, ofrecer alternativa
- NEGOCIABLE: Obtener aprobación interna antes de responder al cliente
- ACEPTABLE: Incluir en la versión revisada

### Paso 4: Sesión de negociación
- Máximo 2 rondas de ida y vuelta (si >2, escalar a Director Comercial + Legal)
- Documentar cada concesión otorgada

### Paso 5: Cierre
- Generar versión final con todos los cambios acordados
- Ambas partes firman versión limpia (no redlined)

---

## 4. Matriz de Negociación

```
## MATRIZ DE NEGOCIACIÓN — [Cliente]

**Propuesta No.:** PROP-[AAAA]-[###]
**Fecha:** [_______________]
**Sales Rep:** [_______________]

| # | Solicitud del cliente | Clasificación | Nuestra posición | Aprobador requerido | Decisión final |
|---|----------------------|--------------|-----------------|-------------------|--------------|
| 1 | [___] | ☐ Red Line / ☐ Negociable / ☐ Aceptable | [___] | [___] | [___] |
| 2 | [___] | ☐ Red Line / ☐ Negociable / ☐ Aceptable | [___] | [___] | [___] |

**Total concesiones otorgadas:** [##]
**Impacto estimado en margen:** COP $[___]
```

---

## 5. Tácticas Recomendadas

| Situación | Táctica |
|-----------|---------|
| Cliente pide descuento sin justificación | Ofrecer valor agregado en lugar de descuento (sesión adicional, acceso a contenido, extensión de soporte) |
| Cliente pide modificar cláusula IP | Explicar la diferencia entre IP preexistente y entregables. Ofrecer `cesion-derechos-ip.md` como Anexo |
| Cliente pide plazo de pago >60 días | Ofrecer descuento por pronto pago (2% si paga en <15 días) en lugar de extender plazo |
| Cliente pide eliminar limitación de responsabilidad | RED LINE. Explicar que es estándar de industria. Ofrecer seguro de responsabilidad profesional como alternativa |
| Cliente quiere exclusividad | Definir territorio y duración limitada. Requiere aprobación CEO. Incluir mínimo de compra como condición |

---

## Changelog

- v1.0.0 — Creación inicial / Cierra FM-18 / Javier Montaño + Claude
