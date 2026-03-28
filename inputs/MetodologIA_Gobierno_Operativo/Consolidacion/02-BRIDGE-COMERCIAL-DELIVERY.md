# PUENTE: Proceso Comercial → Proceso Delivery
**Versión:** 1.0 | **Fecha:** 2026-03-24 | **Clasificación:** Tejido Conectivo Sistémico

---

## PROPÓSITO

Este documento conecta los dos macro-procesos operativos de MetodologIA: el **Proceso Comercial** (captación, calificación, cierre) y el **Proceso de Delivery** (entrega del servicio contratado). Sin este puente, existe riesgo de handoff incompleto, expectativas desalineadas, y pérdida de contexto del cliente entre equipos.

---

## MAPA DE TRANSICIÓN: COMERCIAL → DELIVERY

```
PROCESO COMERCIAL                          PROCESO DELIVERY
═══════════════                            ═══════════════

[Discovery]
    │ Calificación
    ▼
[Propuesta]
    │ Cierre
    ▼
[Contrato Firmado] ──── HANDOFF ────►  [Kick-off Delivery]
                     Gate: H-01             │
                                            ├── Workshop → Preparación (T-14)
                                            ├── Bootcamp → Diseño Curricular
                                            ├── Élite → Diseño Transformacional
                                            └── Consultoría → Diagnóstico/Tracción/Evolución
```

---

## GATE H-01: HANDOFF COMERCIAL → DELIVERY

### Trigger
Contrato firmado + pago confirmado (o primera cuota recibida).

### Paquete de Handoff (obligatorio)

El equipo comercial debe entregar AL equipo de delivery los siguientes artefactos antes del kick-off:

| Artefacto | Descripción | Responsable | SLA |
|-----------|-------------|-------------|-----|
| **Ficha de Cliente** | Nombre, industria, tamaño, contactos clave, decision maker, sponsor | Account Manager | 24h post-firma |
| **Discovery Notes** | Transcripción/resumen de calls de discovery, pain points, objetivos declarados | Account Manager | 24h post-firma |
| **Propuesta Aprobada** | Documento de propuesta con scope, timeline, inversión, entregables prometidos | Account Manager | Con contrato |
| **Contrato Firmado** | PDF del contrato con T&C, cláusulas especiales, pagos | Legal/Admin | Con pago |
| **Expectativas Documentadas** | ¿Qué espera el cliente que suceda? ¿Qué métricas de éxito mencionó? | Account Manager | 48h post-firma |
| **Red Flags Identificadas** | Cualquier señal de riesgo: sponsor débil, resistencia interna, presupuesto ajustado, timeline agresivo | Account Manager | 48h post-firma |
| **Segmento de Origen** | B2B Empresas / B2C Personas / Aliados GTM (afecta pricing, tono, expectativas) | CRM automático | Automático |

### Criterios de Aceptación del Handoff

- [ ] ¿El paquete tiene los 7 artefactos completos? → Si falta alguno, delivery puede rechazar kick-off
- [ ] ¿Las expectativas del cliente son realizables con el scope contratado? → Si no, escalación a Director antes de kick-off
- [ ] ¿El timeline acordado es operativamente viable? → Consultar disponibilidad de equipo delivery ANTES de prometer fechas
- [ ] ¿Hay red flags sin plan de mitigación? → Si hay red flags graves, reunión comercial+delivery pre-kick-off

### Anti-patterns del Handoff

**Anti-pattern: "Handoff de Pasillo"** → Señal: Comercial pasa info verbal sin documentar. → Corrección: Ningún delivery arranca sin paquete escrito en carpeta compartida.

**Anti-pattern: "Promesa Inflada"** → Señal: Propuesta promete entregables que delivery no puede cumplir en timeline. → Corrección: Delivery valida scope ANTES de que comercial envíe propuesta final. Template de validación obligatorio para servicios >$10M COP.

**Anti-pattern: "Cliente Fantasma"** → Señal: Post-firma, el sponsor desaparece y no responde para kick-off. → Corrección: SLA de 5 días para kick-off. Si no hay respuesta en 10 días, Account Manager re-engage con urgencia.

---

## MAPA DE TRANSICIÓN: DELIVERY → COMERCIAL (Recompra)

```
PROCESO DELIVERY                           PROCESO COMERCIAL
═══════════════                            ═══════════════

[Entrega Completada]
    │
    ▼
[Evaluación de Satisfacción]
    │ NPS ≥ 7?
    ▼
[Identificación Recompra] ── HANDOFF ──► [Pipeline Recompra]
                           Gate: R-01       │
                                            ├── Upsell (tier superior)
                                            ├── Cross-sell (servicio diferente)
                                            └── Referral (nuevo cliente)
```

---

## GATE R-01: HANDOFF DELIVERY → COMERCIAL (RECOMPRA)

### Trigger
Delivery completado + NPS registrado + evaluación final disponible.

### Paquete de Recompra (delivery → comercial)

| Artefacto | Descripción | Timing |
|-----------|-------------|--------|
| **Informe de Impacto** | Métricas antes/después, ROI calculado, testimonios | Último día de engagement |
| **NPS + Feedback** | Score numérico + comentarios cualitativos | Encuesta cierre |
| **Oportunidades Identificadas** | Áreas donde el cliente podría beneficiarse de más servicio | Durante delivery |
| **Contactos Calientes** | Personas dentro del cliente que mostraron interés en ampliar | Durante delivery |
| **Nivel de Recompra Sugerido** | ¿Workshop adicional? ¿Bootcamp? ¿Upgrade a Élite? ¿Consultoría nueva área? | Reunión interna delivery-comercial |

### Timing por Servicio

| Servicio | Momento de Identificación Recompra | Momento de Handoff a Comercial |
|----------|-------------------------------------|-------------------------------|
| Workshop | T+1 (día siguiente al workshop) | T+7 (follow-up nurturing) |
| Bootcamp | Semana 2 (post-onboarding, ya ves engagement) | Graduación (Sem 3) |
| Programa Élite | Semana 8 (checkpoint mid-program) | Fase Alumni (Sem 17+) |
| Consultoría Diagnóstico | Presentación ejecutiva (Sem 3) | Inmediato post-presentación |
| Consultoría Tracción | Semana 4 (post-Sprint A) | Handoff (Sem 8) |
| Consultoría Evolución | QBR Mes 3 | Handoff sostenibilidad (Sem 20-24) |

---

## MATRIZ DE CROSS-SELL: SERVICIO ACTUAL → SIGUIENTE SERVICIO

```
                SIGUIENTE SERVICIO RECOMENDADO
                ┌──────────┬──────────┬──────────┬──────────┐
                │ Workshop │ Bootcamp │ Élite    │ Consult. │
    ┌───────────┼──────────┼──────────┼──────────┼──────────┤
    │ Workshop  │ WS otro  │ ████ 35% │ ░░░ 10% │ ████ 30% │
S   │           │ tema     │ Profund. │ Si exec  │ Si B2B   │
E   ├───────────┼──────────┼──────────┼──────────┼──────────┤
R   │ Bootcamp  │ ░░░ 5%  │ BC otro  │ ████ 25% │ ████ 40% │
V   │           │ Raro     │ tema     │ Individual│ Org.    │
.   ├───────────┼──────────┼──────────┼──────────┼──────────┤
    │ Élite     │ ░░░ 5%  │ ░░░ 10% │ Élite II │ ████ 30% │
A   │           │ Tema esp.│ Equipo   │ Advanced │ Org.     │
C   ├───────────┼──────────┼──────────┼──────────┼──────────┤
T   │ Consult.  │ ████ 20%│ ████ 25% │ ░░░ 15% │ Tier ↑   │
U   │           │ Difusión │ Upskill  │ Si líder │ Upgrade  │
A   └───────────┴──────────┴──────────┴──────────┴──────────┘
L
    ████ = Ruta natural (>20% probabilidad)
    ░░░  = Ruta posible (<20%)
```

---

## SUPUESTOS EXPLÍCITOS

1. **El equipo comercial documenta ANTES de cerrar.** Si el handoff depende de memoria verbal, falla. El CRM debe forzar campos obligatorios pre-cierre.
2. **Delivery identifica oportunidades de recompra activamente**, no solo responde a peticiones comerciales. El consultor/facilitador está entrenado para detectar señales.
3. **El cliente percibe continuidad.** No debe sentir que "le pasaron" a otro equipo. El Account Manager participa en kick-off y en cierre.
4. **Los segmentos afectan delivery.** Un cliente B2B Enterprise tiene expectativas, tono y rigor diferentes a un B2C individual. El paquete de handoff incluye segmento para calibrar.
5. **La recompra NO es responsabilidad exclusiva de comercial.** Delivery siembra, comercial cosecha. Sin señales de delivery, comercial opera a ciegas.

---

## CASOS BORDE

**Caso Borde: Handoff Incompleto** → Trigger: Delivery recibe paquete con <5 de 7 artefactos. → Protocolo: Delivery rechaza kick-off, notifica Director. Comercial tiene 48h para completar. → Fallback: Si persiste, Director de Delivery escala a CEO. No se arranca con información incompleta.

**Caso Borde: Expectativas Desalineadas** → Trigger: Cliente esperaba X, propuesta dice Y. → Protocolo: Reunión tripartita (comercial + delivery + cliente) en primeras 48h. Realinear o ajustar scope con addendum. → Fallback: Si gap es irreconciliable, opción de cancelación con reembolso parcial.

**Caso Borde: Recompra No Identificada** → Trigger: Delivery termina, NPS es 9, pero nadie pasa oportunidad a comercial. → Protocolo: Checklist obligatorio de cierre incluye "¿Oportunidad de recompra identificada? Sí/No. Si sí, descripción." → Fallback: Comercial hace follow-up proactivo a todo cliente NPS ≥7 en T+30.

**Caso Borde: Cliente Compra Servicio Equivocado** → Trigger: Diagnóstico revela que cliente necesitaba Bootcamp, no Consultoría. → Protocolo: Director de Delivery puede proponer pivote de servicio sin penalización. Comercial ajusta contrato. → Fallback: Si cliente insiste en servicio original, documentar riesgo y proceder con caveats.

**Caso Borde: Sponsor Cambió Post-Firma** → Trigger: La persona que firmó ya no es el sponsor cuando delivery arranca. → Protocolo: Sesión de re-alineación con nuevo sponsor antes de kick-off formal. Validar que expectativas originales siguen vigentes. → Fallback: Si nuevo sponsor tiene agenda diferente, renegociar scope o pausar.

---

## DECISIONES DE DISEÑO

1. **¿Por qué handoff documentado y no verbal?** Porque MetodologIA escala con procesos, no con personas. Cuando el Account Manager se va de vacaciones, el contexto del cliente no puede perderse. El overhead de documentar (30 min) previene horas de re-discovery.

2. **¿Por qué el Account Manager participa en kick-off?** Para que el cliente sienta continuidad relacional. La confianza construida en discovery se transfiere al equipo de delivery. El AM no necesita quedarse más allá del kick-off, pero su presencia inicial es puente emocional.

3. **¿Por qué delivery identifica recompra y no solo comercial?** Porque delivery está "dentro" del cliente. Ve problemas, oportunidades y champions que comercial nunca vería. El 60% de recompras en consultoría profesional viene de señales que el consultor detecta en campo.

4. **¿Por qué la matriz de cross-sell es probabilística?** Para evitar que comercial force rutas no naturales. Un cliente de Workshop que podría ir a Bootcamp (35%) es diferente de uno que "podría" ir a Élite (10%). Las probabilidades calibran esfuerzo comercial.

---

**Fin del Documento: Puente Comercial → Delivery**
