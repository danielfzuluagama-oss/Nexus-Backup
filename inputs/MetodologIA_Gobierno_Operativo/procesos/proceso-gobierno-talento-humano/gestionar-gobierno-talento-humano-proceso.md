# Proceso: Gestionar Gobierno de Talento Humano

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** RRHH / COO

---

## 1. Propósito

Gobernar el ciclo de vida del talento: vinculación, gestión, desarrollo, y desvinculación, cumpliendo el CST y la normativa colombiana de seguridad social, acoso laboral, y SST.

---

## 2. Supuestos Críticos

Si alguno es falso, el proceso se rompe:

1. **MetodologIA tiene empleados directos** — Si opera 100% con independientes, la mitad de este proceso no aplica (pero FMRH-02 se vuelve el riesgo #1).
2. **Operación en Colombia** — Si se contrata talento en otros países, se necesita análisis jurídico por jurisdicción.
3. **Alguien dedica tiempo a RRHH** — Sin al menos una persona dedicando >8h/semana a estos procesos, todo se queda en papel.
4. **Se tiene abogado laboral accesible** — No de planta, pero sí disponible para consultas (2-4h/mes). Sin esto, las decisiones de vinculación y desvinculación se toman a ciegas.

---

## 3. Anti-patrones a Evitar

| Anti-patrón | Señal de alerta | Corrección |
|------------|----------------|------------|
| **"Todos son contratistas"** — Vincular como independiente a quien en realidad es empleado para "ahorrar" | Todos tienen horario fijo, exclusividad, y reportan diariamente a un jefe | Aplicar `checklist-clasificacion-laboral.md` ANTES de cada vinculación |
| **"Despido por WhatsApp"** — Desvinculaciones informales sin proceso | No hay carta, no hay liquidación calculada, no hay paz y salvo | Seguir `sop-desvinculacion.md` para TODA terminación, incluso la "amigable" |
| **"SST es para fábricas"** — Ignorar SST porque "solo trabajamos en oficina/remoto" | No hay exámenes médicos, no hay matriz de riesgos, no hay plan SST | El Decreto 1072 aplica a TODA empresa con 1+ empleado, sin importar el sector |

---

## 4. Decision Log

| Decisión | Alternativa considerada | Por qué se eligió esta |
|----------|------------------------|----------------------|
| Gestión de RRHH manual (spreadsheet + Drive) | Software HRIS (BambooHR, Factorial, Buk) | Equipo <15 no justifica ~USD$5-8/usuario/mes. Migrar cuando >15 o cuando la gestión manual consuma >12h/semana. |
| Abogado laboral externo (retainer) | Abogado de planta | No hay volumen para justificar TC. Retainer de 4h/mes (~$800K-1.5M COP) cubre consultas de vinculación, desvinculación, y clasificación. |
| Exámenes médicos con IPS aliada de la ARL | IPS independiente | La ARL típicamente tiene convenios con IPS que facilitan exámenes ocupacionales a menor costo y con formatos ya alineados al SG-SST. |

---

## 5. Artefactos

### Templates

| Template | Cierra FMRH | Ubicación |
|----------|------------|-----------|
| `template-contrato-laboral.md` | FMRH-01 | `assets/templates/` |
| `template-contrato-prestacion-servicios.md` | FMRH-01 | `assets/templates/` |
| `template-paz-y-salvo.md` | FMRH-04 | `assets/templates/` |

### SOPs

| SOP | Cierra FMRH | Ubicación |
|-----|------------|-----------|
| `sop-contratacion.md` | FMRH-03 | `references/sop/sop-contratacion/` |
| `sop-desvinculacion.md` | FMRH-04 | `references/sop/sop-desvinculacion/` |
| `sop-evaluacion-desempeno.md` | FMRH-09 | `references/sop/sop-evaluacion-desempeno/` |
| `sop-capacitacion.md` | FMRH-10 | `references/sop/sop-capacitacion/` |

### Políticas

| Política | Cierra FMRH | Ubicación |
|---------|------------|-----------|
| `checklist-clasificacion-laboral.md` | FMRH-02 | `assets/` |
| `politica-desconexion-laboral.md` | FMRH-07 | `meta/` |
| `politica-sgsst.md` | FMRH-08 | `meta/` |

---

## 6. Cadencias

| Actividad | Frecuencia | Responsable | Evidencia |
|----------|-----------|------------|-----------|
| Evaluación de desempeño | Semestral | RRHH + Director del área | Formato de evaluación firmado |
| Actualización de plan de capacitación | Anual | RRHH | Plan documentado con actividades |
| Reunión Comité de Convivencia | Trimestral (o cuando haya queja) | Comité | Acta de reunión |
| Auditoría SG-SST | Anual | ARL + RRHH | Informe de auditoría |
| Verificación de clasificación laboral | Al vincular + anual | RRHH + Legal | Checklist completado |

---

## 7. Modelo de Madurez

| Nivel | Nombre | Descripción | Estado actual |
|-------|--------|-------------|---------------|
| **1 — Inicial** | Ad-hoc | Contratos improvisados. Desvinculaciones sin proceso. Sin SST. | **<-- AQUI** |
| **2 — Definido** | Documentado | Templates de contrato estandarizados. SOPs de contratación y desvinculación escritos. Política SST definida. Checklist de clasificación en uso. | **META Q2 2026** |
| **3 — Gestionado** | Medido | Evaluaciones de desempeño ejecutándose. Comité de Convivencia activo. Plan de capacitación ejecutándose. Métricas de rotación y satisfacción. | META Q4 2026 |
| **4 — Optimizado** | Estratégico | HRIS implementado. Employer branding activo. Planes de carrera definidos. People analytics. | META 2027 |
