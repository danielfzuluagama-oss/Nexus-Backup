# MANIFIESTO: Proceso de Delivery de Servicios
**Versión:** 2.0 | **Fecha:** 2026-03-24 | **Clasificación:** Arquitectura Sistémica

---

## VISIÓN

> Entregar no es ejecutar un checklist — es facilitar una transformación medible que el cliente pueda sostener sin nosotros.

MetodologIA tiene 4 vehículos de entrega, cada uno diseñado para un nivel diferente de profundidad, duración e inversión. Este manifiesto define la arquitectura común, las reglas invariantes, y las conexiones entre ellos.

---

## ARQUITECTURA DE 4 VEHÍCULOS

```
VEHÍCULO         DURACIÓN    INVERSIÓN     PROFUNDIDAD    ENTREGABLE PRINCIPAL
═══════════════  ═══════════ ═══════════   ═════════════  ═══════════════════════
Workshop         3 horas     $1-3M COP     Awareness      Experiencia + Follow-up
Bootcamp         3 semanas   $3-8M COP     Skill          Competencia demostrable
Programa Élite   16 semanas  $5-25M COP    Identity       Transformación personal
Consultoría      2-24 sem    $0-35M COP    System         Modelo operativo nuevo
```

### Eje de Profundidad

```
Awareness ──► Skill ──► Identity ──► System
(Workshop)   (Bootcamp) (Élite)     (Consultoría)

Superficial ◄────────────────────────► Profundo
Corto       ◄────────────────────────► Largo
Económico   ◄────────────────────────► Premium
Individual  ◄────────────────────────► Organizacional
```

---

## REGLAS INVARIANTES (aplican a los 4 vehículos)

### R-01: Todo delivery comienza con expectativas documentadas
Antes del kick-off, el equipo debe tener por escrito: qué espera el cliente, qué métricas definen éxito, qué NO está incluido.

### R-02: Todo delivery mide impacto
No existe entrega sin medición. Mínimo: NPS post-servicio + 1 métrica cuantitativa de resultado.

### R-03: Todo delivery cierra con handoff explícito
El cliente debe saber: qué se hizo, qué queda pendiente, quién es responsable de sostener, cuál es el siguiente paso recomendado.

### R-04: Todo delivery alimenta el loop de recompra
Cada cierre genera: informe de impacto, oportunidades identificadas, y propuesta de siguiente servicio.

### R-05: El delivery NO vende — siembra
El consultor/facilitador no hace pitch durante la entrega. Genera valor, identifica oportunidades, y las documenta para comercial.

### R-06: Degradación elegante antes que fallo silencioso
Si algo sale mal (tech, asistencia, sponsor), existe protocolo de degradación. Nunca se improvisa. Nunca se ignora.

---

## ESTRUCTURA FRACTAL POR VEHÍCULO

Cada vehículo sigue la misma arquitectura documental:

```
/{vehículo}/
├── entregar-{vehículo}-proceso.md     ← Proceso maestro
├── catalogo-{items}.md                ← Catálogo de variantes
├── assets/                            ← Templates, contratos
│   └── template-*.md
├── meta/
│   ├── knowledge-graph.md
│   └── readme.md
└── references/
    ├── caracterizacion/
    │   └── caracterizacion.md
    └── sop/
        └── sop-{fase}/
            ├── {fase}-sop.md          ← SOP detallado
            ├── meta/
            │   └── knowledge-graph.md
            └── references/
                └── rituales/
                    └── {ritual}/
                        ├── {ritual}.md
                        └── meta/
                            └── knowledge-graph.md
```

---

## INVENTARIO DE COMPONENTES

### Workshop (12 variantes catalogadas)
| Componente | Archivo | Estado | Líneas |
|------------|---------|--------|--------|
| Proceso Maestro | `workshop/entregar-workshop-proceso.md` | Elevado 10x | ~585 |
| Catálogo | `workshop/catalogo-workshops.md` | Elevado 10x | ~533 |
| SOP Preparación | `sop-preparacion/preparar-workshop-sop.md` | Elevado 10x | ~495 |
| SOP Facilitación | `sop-facilitacion/facilitar-workshop-sop.md` | Elevado 10x | ~569 |
| SOP Cierre | `sop-cierre/cerrar-workshop-sop.md` | Elevado 10x | ~696 |

### Bootcamp (4 variantes catalogadas)
| Componente | Archivo | Estado | Líneas |
|------------|---------|--------|--------|
| Proceso Maestro | `bootcamp/entregar-bootcamp-proceso.md` | Elevado 10x | ~790 |
| Catálogo | `bootcamp/catalogo-bootcamps.md` | Elevado 10x | ~376 |
| SOP Diseño Curricular | `sop-diseno-curricular/diseno-curricular-sop.md` | Elevado 10x | ~477 |
| SOP Onboarding | `sop-onboarding-cohorte/onboarding-cohorte-sop.md` | Elevado 10x | ~372 |
| SOP Facilitación | `sop-facilitacion-semanal/facilitacion-semanal-sop.md` | Elevado 10x | ~415 |
| SOP Graduación | `sop-graduacion/graduacion-sop.md` | Elevado 10x | ~596 |

### Programa Élite (2 programas base)
| Componente | Archivo | Estado | Líneas |
|------------|---------|--------|--------|
| Proceso Maestro | `programa-elite/entregar-programa-elite-proceso.md` | Elevado 10x | ~621 |
| Catálogo | `programa-elite/catalogo-programas.md` | Original | ~430 |
| SOP Diseño Transformacional | `sop-diseno-transformacional/diseno-transformacional-sop.md` | Elevado 10x | ~600 |
| SOP Inmersión Inicial | `sop-inmersion-inicial/inmersion-inicial-sop.md` | Elevado 10x | ~452 |
| SOP Acompañamiento Continuo | `sop-acompanamiento-continuo/acompanamiento-continuo-sop.md` | Elevado 10x | ~290 |
| SOP Consolidación | `sop-consolidacion/consolidacion-sop.md` | Elevado 10x | ~389 |
| SOP Alumni | `sop-alumni/alumni-sop.md` | Elevado 10x | ~648 |

### Consultoría (3 tiers)
| Componente | Archivo | Estado | Líneas |
|------------|---------|--------|--------|
| Proceso Maestro | `consultoria/entregar-consultoria-proceso.md` | Elevado 10x | ~565 |
| Catálogo | `consultoria/catalogo-intervenciones.md` | Elevado 10x | ~604 |
| SOP Diagnóstico | `sop-diagnostico/diagnostico-sop.md` | Elevado 10x | ~388 |
| SOP Tracción | `sop-traccion/traccion-sop.md` | Elevado 10x | ~281 |
| SOP Evolución | `sop-evolucion/evolucion-sop.md` | Elevado 10x | ~379 |
| SOP Handoff Success | `sop-handoff-success/handoff-success-sop.md` | Elevado 10x | ~383 |

---

## MÉTRICAS TRANSVERSALES

| Métrica | Workshop | Bootcamp | Élite | Consultoría |
|---------|----------|----------|-------|-------------|
| **NPS Target** | ≥8 | ≥8 | ≥8 | ≥8 |
| **Completion Rate** | ≥95% | ≥85% | ≥90% | ≥87% |
| **Time-to-Value** | Inmediato | Sem 1 | Sem 2 | Sem 2-3 |
| **Recompra Rate** | ≥15% | ≥25% | ≥20% | ≥30% |
| **Referral Rate** | ≥10% | ≥15% | ≥25% | ≥20% |
| **Knowledge Retention (30d)** | ≥40% | ≥60% | ≥80% | ≥75% |

---

## DEPENDENCIAS INTER-SERVICIO

### Workshop → Bootcamp
El workshop funciona como "puerta de entrada". 35% de participantes de bootcamp vienen de haber asistido a un workshop previo. El facilitador de workshop identifica candidatos y los refiere.

### Bootcamp → Consultoría / Élite
Al graduarse, 25% busca profundizar a nivel organizacional (→ Consultoría) y 15% a nivel individual (→ Élite). La sesión de graduación incluye exploración de siguientes pasos.

### Consultoría Diagnóstico → Tracción → Evolución
Flujo natural tier-a-tier: 40% Diagnóstico → Tracción, 30% Tracción → Evolución. El diagnóstico gratuito es motor de adquisición.

### Élite → Alumni → Referral → Todos los servicios
Alumni genera referrals hacia TODOS los servicios: Workshop (para amigos), Bootcamp (para equipos), Élite (para personas), Consultoría (para empresas). Es el canal orgánico más valioso.

---

## TRAZABILIDAD: DÓNDE VIVE CADA DECISIÓN

| Decisión | Documento | Sección |
|----------|-----------|---------|
| ¿Por qué 4 vehículos y no 3 o 5? | Este MANIFIESTO | Arquitectura |
| ¿Por qué Workshop es 3h? | `entregar-workshop-proceso.md` | Decisiones de Diseño |
| ¿Por qué Bootcamp es 3 semanas? | `entregar-bootcamp-proceso.md` | Decisiones de Diseño |
| ¿Por qué Élite es 16 semanas? | `entregar-programa-elite-proceso.md` | Decisiones de Diseño |
| ¿Por qué Consultoría tiene 3 tiers? | `entregar-consultoria-proceso.md` | Decisiones de Diseño |
| ¿Por qué delivery por servicio y no por segmento? | Este MANIFIESTO | Decisiones de Diseño |
| ¿Cómo se conecta comercial con delivery? | `02-BRIDGE-COMERCIAL-DELIVERY.md` | Gates H-01 y R-01 |

---

## DECISIONES DE DISEÑO

1. **¿Por qué organizar delivery por tipo de servicio y no por segmento?** Porque la mecánica de entrega de un Workshop es la misma para B2B que para B2C — cambia el pricing y el tono, no el proceso. Organizar por segmento duplicaría 80% del contenido. El segmento se captura como variable en el handoff, no como estructura paralela.

2. **¿Por qué 4 vehículos y no un continuum?** Porque los clientes necesitan categorías claras para decidir. "Un programa de 3 horas a 24 semanas" es confuso. 4 categorías con nombres propios, duraciones fijas y precios claros reducen fricción de venta y expectativas de delivery.

3. **¿Por qué la estructura fractal (proceso → SOP → ritual)?** Porque permite operar a diferentes niveles de zoom. El Director lee el proceso maestro (30 min), el operador lee el SOP (60 min), el facilitador lee el ritual (15 min). Cada nivel es autocontenido pero trazable al superior.

4. **¿Por qué las reglas invariantes son pocas (6)?** Para que se recuerden y se cumplan. Un manual de 50 reglas es un manual que nadie lee. 6 reglas cubren el 90% de fallos operativos. El resto está en los SOPs específicos.

---

**Fin del Manifiesto: Delivery de Servicios**
