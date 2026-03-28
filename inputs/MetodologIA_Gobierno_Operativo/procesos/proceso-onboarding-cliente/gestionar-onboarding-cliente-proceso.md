# Proceso: Gestionar Onboarding Progresivo del Cliente

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Director Comercial
**Cierra:** FM-09, FM-14, FM-16
**Innovacion clave:** Recoleccion progresiva de datos — minima friccion al inicio, enriquecimiento por fases

---

## Tabla de Referencias Cruzadas (centralizada)

| Artefacto externo | Usado en fase | Proposito |
|---|---|---|
| `gestionar-presales-proceso.md` | Input a F0 | Calificacion de leads |
| `negociar-contrato-sop.md` | Input a F2 | Negociacion contractual |
| `politica-de-privacidad.md` | F0-F1 | Aviso de privacidad web |
| `checklist-pre-firma.md` | F2 gate | Verificacion documental pre-firma |
| `proceso-ciclo-vida-contratos-clm.md` | F2 | Registro en CLM |
| `rubrica-scoring-leads.md` | F0-F1 | Scoring de leads |
| `02-BRIDGE-COMERCIAL-DELIVERY.md` | F3-F4 | Puente a delivery |
| `definir-metricas-exito-sop.md` | F3 | Co-definicion de metricas SMART |
| `plan-respuesta-brechas-datos.md` | Fuera de alcance | Crisis / incidentes de datos |

---

## 1. Proposito y Alcance

Gobernar la transicion del prospecto a cliente activo mediante **5 formularios progresivos** (F0-F4) que recolectan solo los datos necesarios en cada momento, garantizando cumplimiento legal y experiencia fluida.

**Incluye:** Recoleccion progresiva de datos, ceremonia de kickoff, SLA baselines, metricas de exito, gestion de riesgos de onboarding.

**NO incluye:** Calificacion de leads (input de presales), negociacion contractual (input de CLM), ejecucion de delivery (output), comunicacion de crisis (ver `plan-respuesta-brechas-datos.md`).

---

## 2. Decision de Diseno: Por que 5 fases y no 3 o 7

Las 5 fases mapean a la **curva de construccion de confianza**. Cada fase pide un nivel de compromiso mayor al anterior:

| Fase | Nivel de confianza | Compromiso que se pide | Dato mas sensible |
|---|---|---|---|
| F0 | Curiosidad | "Dame tu email" | Email |
| F1 | Interes calificado | "Cuentame tu dolor" | Madurez organizacional |
| F2 | Compromiso contractual | "Firmemos y paga el anticipo" | NIT, datos bancarios, cedula |
| F3 | Confianza operativa | "Presentame a tu equipo" | Stakeholders, accesos a sistemas |
| F4 | Relacion continua | "Evaluame y decidamos juntos" | NPS, feedback critico |

**Anti-patron:** Fusionar F0+F1 (pedir industria/madurez a un lead frio mata la conversion). Fusionar F3+F4 (hacer kickoff y pedir NPS el mismo dia trivializa ambos).

Tres fases pierden el gate de diagnostico (F1) que es donde se filtra el 40% de leads no calificados. Siete fases introducen friccion sin reducir riesgo.

---

## 3. Variantes del Proceso

### 3A. Ruta estandar (prospecto nuevo)

```
F0 (Awareness) -> F1 (Diagnostico) -> F2 (Contratacion) -> F3 (Kickoff) -> F4 (Operacion)
   3 campos        6 campos          12+ campos + docs    8+ campos       Ongoing
```

### 3B. Fast Lane (cliente recurrente)

**Aplica cuando:** el cliente ya tiene NDA vigente + datos de F2 en el CRM de un engagement anterior (< 24 meses).

```
F0 [SKIP] -> F1 [SKIP] -> F2-lite (validar vigencia docs) -> F3 (Kickoff) -> F4
```

- **F0 skip:** Ya tenemos contacto y datos de empresa.
- **F1 skip:** Ya conocemos industria, madurez, dolores (actualizar solo si han pasado >12 meses).
- **F2-lite:** Verificar que NDA no ha expirado, que el representante legal no cambio, que RUT/Camara de Comercio siguen vigentes. Si todo OK, solo se firma nueva ODS. Si algo cambio, completar F2 normal.

**Gate Fast Lane:** CSM o Sales Rep valida en CRM que el cliente tiene engagement previo con Health Score >= 60 en su ultimo cierre.

### 3C. Sector publico / licitacion publica

**Aplica cuando:** el cliente es entidad gubernamental y el proceso de compra es por licitacion publica, convenio interadministrativo, o contratacion directa regulada.

Adaptaciones a F2:
- El NDA puede no ser viable (los documentos publicos son... publicos). Sustituir por clausula de confidencialidad dentro del contrato estatal.
- No hay "anticipo" libre: el pago sigue el PAC (Plan Anual de Caja) de la entidad. Aceptar orden de compra o CDP (Certificado de Disponibilidad Presupuestal) como equivalente al anticipo.
- Camara de Comercio no aplica a entidades publicas. Sustituir por: certificado de existencia y representacion legal expedido por la entidad competente.
- El gate de F2 incluye verificacion del numero de proceso en SECOP II (si aplica).
- Tiempos de F2 se extienden: presupuestar 20-40 dias habiles en lugar de 5-10.

---

## 4. Detalle por Fase

### F0 — Awareness (Contacto Inicial)
**Formulario:** `formulario-f0-contacto-inicial.md`
**Datos:** Nombre, email, empresa (opcional)
**Docs del cliente:** Ninguno
**Gate:** Lead registrado -> avanza a F1 si hay interaccion de follow-up

**Privacidad:** Basta el aviso de privacidad del sitio web. No se requiere autorizacion firmada.

### F1 — Diagnostico
**Formulario:** `formulario-f1-diagnostico.md`
**Datos:** Industria, tamano, rol, madurez IA (1-5), dolor principal, metodo de contacto
**Docs del cliente:** Ninguno (consentimiento verbal suficiente)
**Gate:** Score >= 12 en rubrica -> avanza a F2

**Privacidad:** Datos no sensibles. Consentimiento implicito suficiente. **PROHIBIDO recolectar datos de terceros en esta fase.**

### F2 — Contratacion
**Formulario:** `formulario-f2-contratacion.md`
**Datos:** Razon social, NIT, representante legal, facturacion, SPOC, sponsor
**Docs requeridos:** NDA, Habeas Data, Camara de Comercio, RUT, cedula (ver variantes para internacional y sector publico en el formulario)
**Gate:** `checklist-pre-firma.md` 100% + contrato firmado + anticipo confirmado -> avanza a F3

### F3 — Kickoff
**Formulario:** `formulario-f3-kickoff.md`
**Datos:** Stakeholders, contactos tecnicos, sponsor, criterios SMART, comunicacion
**Docs requeridos:** Contrato firmado, accesos, organigrama (recomendado)
**Gate:** Ceremonia de kickoff ejecutada -> avanza a F4

### F4 — Operacion
**Formulario:** `formulario-f4-operacion.md`
**Datos:** Feedback, NPS, aceptacion de hitos, change requests (ongoing)
**Docs requeridos:** Actas de entrega, change requests, encuesta NPS

---

## 5. Edge Cases

### Cambio de sponsor mid-onboarding
Si el sponsor ejecutivo cambia despues de F2 pero antes de completar F3:
1. El nuevo sponsor debe ser identificado y documentado en F3.
2. Re-validar el stakeholder map completo (el nuevo sponsor puede traer un equipo diferente).
3. Si el nuevo sponsor no conoce el proyecto, programar una sesion de 30 min pre-kickoff para alinearlo.
4. Si el cambio ocurre post-kickoff (en F4), actualizar el registro y programar un "mini-kickoff" de 30 min con el nuevo sponsor.

### Cliente no responde en >10 dias habiles entre fases
- F0->F1: Enviar 2 follow-ups (dia 3 y dia 7). Si no responde, marcar como "cold" y devolver a nurturing.
- F1->F2: Enviar propuesta de valor personalizada (dia 5). Si no responde al dia 10, el Sales Rep llama. Si nada al dia 15, archivar.
- F2->F3: Escalar a Director Comercial (puede haber problema interno del cliente). No archivar — hay contrato firmado.

---

## 6. Metricas del Proceso

| Metrica | Target | Frecuencia | Responsable |
|---|---|---|---|
| Time-to-kickoff (firma contrato -> kickoff) | < 10 dias habiles | Por engagement | Operaciones |
| Data completeness rate F2 | 100% campos + 100% docs | Por engagement | Operaciones |
| Data completeness rate F3 | >= 90% campos | Por engagement | PM |
| Conversion F0->F1 | > 40% | Mensual | Sales |
| Conversion F1->F2 | > 25% | Mensual | Sales |
| Drop-off por fase | Identificar fase con mayor abandono | Mensual | COO |

---

## 7. Anti-patrones

| Anti-patron | Por que es peligroso | Que hacer en su lugar |
|---|---|---|
| Saltar F1 porque el lead "parece obvio" | Hemos perdido deals por asumir en lugar de diagnosticar. Un CTO que dice "quiero IA" puede necesitar gobierno de datos, no un modelo. | Siempre completar F1. Toma 5 minutos. |
| Hacer kickoff sin F2 completo | El cliente no tiene contrato firmado, no hay SLA, no hay compromiso legal. Si algo sale mal, no hay respaldo. | Bloquear F3 hasta que `checklist-pre-firma.md` este al 100%. |
| Enviar todos los formularios juntos | Mata la conversion. El prospecto ve 30 campos y se va. | Respetar la progresion. Cada formulario en su momento. |
| Dejar que el cliente "complete despues" el F2 | Los documentos "pendientes" se convierten en deuda operativa que nunca se cierra. | F2 es gate duro. Sin docs, sin kickoff. |

---

## 8. SOPs del Proceso

| SOP | Cierra FM |
|---|---|
| `recolectar-datos-progresivo-sop.md` | FM-14 |
| `ejecutar-kickoff-sop.md` | FM-16 |
| `definir-metricas-exito-sop.md` | FM-09 |
| `establecer-sla-baseline-sop.md` | FM-09 |

---

## 9. Assets del Proceso

| Asset | Proposito |
|---|---|
| `formulario-f0-contacto-inicial.md` | Template F0 — contacto inicial |
| `formulario-f1-diagnostico.md` | Template F1 — diagnostico |
| `formulario-f2-contratacion.md` | Template F2 — contratacion |
| `formulario-f3-kickoff.md` | Template F3 — kickoff |
| `formulario-f4-operacion.md` | Template F4 — operacion |
| `ceremonia-kickoff-template.md` | Agenda de kickoff (90 min + variante 45 min) |
| `sla-baseline-template.md` | Template de SLA baseline con floor/ceiling |

---

v2.0.0 — Elevation: decision log, fast lane, sector publico, edge cases, metricas, anti-patrones / Javier Montano + Claude
