# Estructura de Incentivos para Aliados — SOP

## Metadata
- **Vehículo:** Gobierno Financiero del Canal de Aliados
- **Proceso Padre:** Proceso Comercial → Aliados GTM
- **Frecuencia:** Liquidación quincenal + auditoría mensual
- **Owners:** Germán (C-Level Ecosystem) + Katherine (C-Level Enablement)
- **Última Actualización:** 2026-03-24
- **Versión:** 1.0 — 10x Elevation Protocol
- **Estado:** Operativo en Producción

---

## Propósito y Alcance

Define la estructura completa de compensación para los actores comerciales del ecosistema MetodologIA: Resellers, Embajadores Comerciales, y operadores de Marca Blanca. Este SOP es la **referencia canónica** para comisiones, bonos, descuentos y liquidación.

**Principios Rectores** (de "Ruta de Abundancia para Aliados"):
1. **Transparencia Total** — Visibilidad del 100% del cálculo
2. **Rendimiento** — Recompensa al trabajo real ejecutado
3. **Alineación** — Incentivos del aliado = incentivos de MetodologIA
4. **Simplicidad** — Una regla, no diez

**Mentalidad:** No buscamos vendedores; buscamos creadores de entornos de abundancia. La alianza NO es transaccional; es estructural. Evidencia verificable en CRM.

---

## 1. SUPUESTOS EXPLÍCITOS (9 Supuestos Críticos)

| # | Supuesto | Dueño de Validación | Cómo se Verifica |
|---|----------|-------------------|-----------------|
| S1 | CRM activo y accesible por aliado (credenciales vigentes, sincronización real-time) | IT + Ecosystem | Login exitoso + eventos de sync últimas 24h |
| S2 | Contrato de alianza firmado y vigente (cláusula de comisión, jurisdicción clara) | Legal + Katherine | Contrato en repositorio, fecha de firma ≤ 90 días |
| S3 | Precios de referencia publicados, vigentes y comunicados (PVP, COGS, margen mínimo) | Pricing + Germán | Documento "Precios-de-Referencia" versión actual en Wiki |
| S4 | Aliado completó onboarding y habilitación (training CRM, contractual, técnico) | Enablement | Checklist onboarding completado en plataforma |
| S5 | Cliente final registrado en CRM como oportunidad única (single source of truth) | CRM Admin | 1 prospecto = 1 único registro en CRM |
| S6 | Evidencia de cada hito documentada y auditable en CRM (notas, campos, timestamps) | Aliado + Auditor | Campo "Hito_Completado" + timestamp ≥ momento de recaudo |
| S7 | Ciclo de liquidación quincenal configurado en sistema de tesorería | Finance | Calendario de liquidación visible, alertas de 3 días previos |
| S8 | Licencia MIT/Copyleft para propiedad intelectual (PI) del aliado firmada | Legal | Acuerdo de PI en expediente legal |
| S9 | Método auditable y verificable activo (trazabilidad CRM → recaudo → liquidación) | Auditoría Interna | Logs de auditoría accesibles, reconciliación mensual ejecutada |

**Si algún supuesto falla:** El flujo se detiene hasta normalización. No se liquida comisión sin que los 9 supuestos se cumplan.

---

## 2. LÍMITES DEL SOP

### Inicia (Punto de Entrada)
- Aliado completó onboarding (SOP: habilitar-embajador-comercial-sop)
- Aliado tiene credenciales CRM activas
- Contrato de alianza está firmado

### Termina (Punto de Salida)
- Comisión liquidada efectivamente a cuenta del aliado
- Auditoría mensual cierra sin observaciones
- Ciclo quincenal finaliza

### NO Cubre Este SOP
| Proceso | Referencia | Por Qué |
|---------|-----------|--------|
| Onboarding del aliado | habilitar-embajador-comercial-sop | Es pre-requisito |
| Entrega del servicio | proceso-delivery | Es post-cierre |
| Cobranza al cliente final | proceso-financiero | Es paralelo, no es obligación del aliado |
| Gestión de disputas legales | proceso-legal | Si hay conflicto de pertenencia |
| Formación académica continua | cronograma-academico | Es beneficio, no mecanismo de pago |

---

## 3. CRITERIOS DE ACEPTACIÓN (12 Criterios — Pass/Fail)

Cada uno puede resultar en **PASS** o **FAIL**. Si alguno falla en la auditoría mensual, se generan correcciones.

| # | Criterio | Definición | Evidencia |
|---|----------|-----------|-----------|
| CA1 | H1 Válido: Prospecto cualificado en CRM | Registro contiene: nombre cliente, contacto, empresa, presupuesto estimado | Campo "Cualificado_H1" = TRUE + notas descriptivas |
| CA2 | H1 Atribuido: Aliado es registrador original | Timestamp CRM de creación ≤ timestamp de primer contacto | Campo "Registrador_Aliado_ID" |
| CA3 | H2 Válido: Reunión efectiva documentada | Meeting summary en CRM con asistentes, tomador de decisión identificado, próximo paso definido | Campo "Reunión_Efectiva_H2" = TRUE + meeting notes |
| CA4 | H2 Completado: Evidencia de interacción con decisor | Call recording, email thread, o meeting attendee = C-Level/CFO/Decisor | Attachment en CRM o linked calendar event |
| CA5 | H3 Válido: Soporte activo en propuesta | Aliado registra actividades: revisiones, iteraciones, validaciones con cliente | Activity log con ≥3 touchpoints entre H2 y H4 |
| CA6 | H3 Completado: Propuesta validada | Cliente confirmó recibirá propuesta o ya tiene draft en revisión | Estado "En Propuesta" + fecha_propuesta_enviada |
| CA7 | H4 Válido: Contrato firmado | Documento de contrato o SO (Sales Order) firmado por ambas partes | Contract_Signed_Date en CRM + PDF attached |
| CA8 | H4 Completado: Recaudo efectivo | Dinero llegó a cuenta MetodologIA (no promesa, no anticipo, recaudo real) | Payment received en sistema de tesorería, reconciliado |
| CA9 | Gobernanza CRM: Único registro por prospecto | Si hay duplicados, se fusionan; lead history se preserva | CRM deduplication report ejecutado |
| CA10 | Gobernanza CRM: Timestamps correctos | Cada hito tiene timestamp de cumplimiento ≥ a la acción real | Audit trail sin retroactividad |
| CA11 | Liquidación: Cálculo correcto | Comisión = 20% × Valor_Recaudado (caso base) | Fórmula en email de liquidación + anexo de cálculo |
| CA12 | Liquidación: Pago efectuado a tiempo | Transferencia ejecutada dentro de 3 días hábiles post-quincena | Comprobante bancario + fecha de acreditación |

**Frecuencia de Verificación:** Auditoría mensual (últimos 3 meses rolling). Si un criterio falla, se abre ticket de corrección.

---

## 4. CASOS BORDE (7 Escenarios)

### CB1: Dos Aliados Registran el Mismo Prospecto
**Escenario:** Aliado A registra a "Empresa XYZ" el 10-mar; Aliado B registra el 11-mar.

**Resolución:**
- **Regla:** First-in CRM wins (timestamp de creación en CRM es definitivo)
- **Acción:** Aliado A recibe comisión; Aliado B recibe notificación automática de "prospecto duplicado"
- **Fallback:** Si no hay prueba de timestamp confiable, revisar notas de descubrimiento; quien demuestre contacto previo (email, call log) gana
- **Comunicación:** Email a ambos aliados explicando situación; opcionalidad de Aliado B de participar en HH (solo H3-H4)

### CB2: Aliado Registra, pero MetodologIA Ya Tenía Relación Previa
**Escenario:** Aliado A registra a "Empresa XYZ"; auditoría revela que MetodologIA cerró un deal con XYZ hace 18 meses.

**Resolución:**
- **Criterio:** Si XYZ ya es cliente, Aliado A NO recibe comisión (prospecto descalificado)
- **Nota:** Si XYZ es oportunidad de expansión (nuevo departamento, nuevo producto), se requiere aprobación de Germán
- **Caso:** Si es genuinamente nueva oportunidad (ej: XYZ contrata nuevo servicio), se contabiliza como H1 para el aliado

### CB3: Upselling Genera Precio Absurdamente Alto
**Escenario:** Precio de referencia es $10k; aliado vende por $200k.

**Resolución:**
- **Ganancia Aliado:** (20% × $10k) + (100% × [$200k - $10k]) = $2k + $190k = $192k
- **Cap Ético:** Aplicable solo si hay sospecha de fraude o error de 50%+
- **Validación:** Si precio > 3× precio de referencia, requiere autorización de Germán antes de liquidar
- **Comunicación:** Email a aliado: "Tu upselling fue excepcional. Requiere validación del CFO antes de pago."

### CB4: Cliente Paga Parcial (no monto total del contrato)
**Escenario:** Contrato de $50k; cliente paga solo $20k en Q1.

**Resolución:**
- **Comisión Proporcional:** 20% × $20k (no el 20% de los $50k prometidos)
- **Continuidad:** Si cliente paga el resto en Q2, Aliado recibe 20% × $30k adicional en siguiente liquidación
- **Documentación:** Nota en CRM: "Pago Parcial: $20k / $50k. Comisión pro-rata liquidada."
- **Sin Castigo:** El aliado no pierde oportunidad; simplemente liquida sobre recaudos reales

### CB5: Aliado Inactivo por 90 Días Consecutivos
**Escenario:** Aliado A no registra oportunidades, no actualiza CRM, no participa en reuniones de alineación.

**Resolución:**
- **Trigger:** Sistema genera reporte de inactividad en día 90
- **Acción:** Notificación a Katherine + Germán; intento de reactivación (llamada, email)
- **Desactivación Temporal:** Si no responde en 14 días, estatus = "En Pausa"
- **Reactivación:** Requiere firma de reconocimiento + retrain en 1 sesión
- **Consecuencia:** Oportunidades registradas antes de inactividad siguen pagándose; nuevos registros se retienen hasta reactivación

### CB6: Conflicto entre Reseller y Embajador Comercial por Mismo Lead
**Escenario:** Reseller A dice que calificó el lead; Embajador Comercial B dice que hizo la reunión.

**Resolución:**
- **Regla de Oro:** El que registró en CRM primero es el propietario del lead
- **Colaboración:** Si ambos aportan valor, se puede dividir: Reseller = H1+H2 (10%), Embajador = H3+H4 (10%)
- **Mediación:** Si hay conflicto, revisar timestamp + activity log; Germán arbitrate
- **Precedencia:** Evidencia > opinión; CRM timestamp > conversación verbal

### CB7: Aliado Solicita Marca Blanca + Comisión Simultáneamente
**Escenario:** Aliado quiere vender bajo "Marca XYZ" BUT también recibir comisión de MetodologIA.

**Resolución:**
- **Incompatibilidad:** Son modelos mutuamente excluyentes. Aliado debe elegir UNO
  - **Opción A:** Marca Blanca (paga precio de referencia, gana margen directo, sin comisión)
  - **Opción B:** Comisión (vende como "powered by MetodologIA", recibe 20% sobre recaudo)
- **Decisión:** Debe declararse en CRM campo "Modelo_de_Negocio" antes de H1
- **Cambio:** Si quiere cambiar de modelo post-H1, requiere aprobación de Germán (evitar gaming)

---

## 5. DECISIONES DE DISEÑO (5 Pilares)

### D1: Pago por Recaudo (No por Cierre)
**Decisión:** Comisiones se liquidan SOLO tras recaudo efectivo del cliente, no con firma de contrato.

**Justificación:**
- Alineación financiera real: El aliado gana cuando MetodologIA gana
- Elimina riesgo de comisionar deals que nunca se cobran
- Incentiva aliados a seleccionar clientes solventes

**Implicación:** Delay entre cierre (H4) y pago es de 0-30 días (según ciclo de cobranza). Comunicar claramente en contrato.

### D2: 4 Hitos Iguales de 5% = 20% Total
**Decisión:** Comisión distribuida en 4 partes de 5% c/u: H1 (Registro), H2 (Reunión), H3 (Acompañamiento), H4 (Cierre).

**Justificación:**
- Simplicidad máxima: 5% es fácil de calcular (= 1/20)
- Motivación progresiva: Cada hito es un milestone claro
- Equidad: No sobre-premia registro; valida ejecución completa
- Alineación con capacidad: Fuerza trabajo colaborativo (aliado + MetodologIA)

**Comparativa:**
| Modelo | Estructura | Riesgo |
|--------|-----------|--------|
| 20% en H4 solo | Aliado hace todo en última hora | Gaming: registra múltiples para cosechar H4 tarde |
| 50% H1, 50% H4 | Motiva calidad de leads | Alto: Aliado registra basura, cobra 50% igual |
| 5%+5%+5%+5% | Distribuido parejo | Bajo: Cada hito requiere trabajo real |

### D3: Upselling = 100% para el Aliado
**Decisión:** Si aliado vende por encima del precio de referencia, la diferencia es 100% suya (además de la comisión base 20%).

**Fórmula:**
```
Ganancia_Total = (20% × Precio_Referencia) + (100% × [Precio_Final - Precio_Referencia])
```

**Justificación:**
- Incentiva comportamiento de consultor, no de vendedor
- Aliado es accionista del margen adicional
- Alinea con principio "Creadores de Abundancia": que ganen más consultando mejor
- Atrae talento de calidad (no solo vendedores de volumen)

**Ejemplo:**
```
Precio Referencia: $10,000
Precio Venta Aliado: $15,000
Ganancia H1-H4: 20% × $10,000 = $2,000
Ganancia Upselling: 100% × ($15,000 - $10,000) = $5,000
Total Aliado: $7,000
```

### D4: Descuento Familia = Fidelización + Evangelización Natural
**Decisión:** Aliado obtiene descuento de 53.6% en servicios (para pareja, padres, hermanos, hijos).

**Estructura:**
- Costo base: 80% del PVP
- Descuento adicional aliado: 33% sobre costo
- Resultado: 0.80 × 0.67 = 0.536 (53.6% del PVP)

**Justificación:**
- Fidelización: Aliado usa el producto, convierte internamente
- Evangelización natural: Familia del aliado deviene cliente + potencial nuevo aliado
- Bajo riesgo: Es descuento interno (no canible en mercado)
- Viralidad: Cada aliado que evangeliza a su círculo multiplica comunidad

**Limitaciones:**
- Extensión: Pareja, padres, hermanos, hijos solamente (verificar DNI)
- Una vez: No acumulable; un DNI = un único código de descuento

### D5: CRM como Única Fuente de Verdad — Elimina Disputas
**Decisión:** Si no está en CRM, no existe. Timestamp de CRM es definitivo.

**Implementación:**
- Único registro por prospecto
- Campos auditables (no editables retroactivamente)
- Activity log inmutable
- Integración con sistema de tesorería (recaudo tira liquidación automática)

**Beneficio:**
- Cero disputas de atribución (timestamp decide)
- Transparencia total (aliado ve su propio CRM)
- Automatización (menos trabajo manual)
- Escalabilidad (soporta 100s de aliados sin caos)

---

## 6. ANTI-PATTERNS (5 Trampas a Evitar)

| # | Anti-Pattern | Por Qué Falla | Cómo Evitarlo |
|---|-------------|--------------|--------------|
| AP1 | **Pagar comisión antes de recaudo** | Aliado no tiene incentivo de calidad; MetodologIA queda expuesta a riesgo de cobranza | Regla inquebrantable: Comisión post-recaudo siempre |
| AP2 | **Registrar prospectos sin cualificación real** | Aliado registra 100 nombres, cobra 5% en H1, desaparece | Requerir: Contacto verificado + presupuesto estimado + línea de negocio en H1 |
| AP3 | **Permitir múltiples registros del mismo prospecto** | Aliados pueden jugar sistema (registrar el mismo lead varias veces) | Deduplicación automática en CRM; trigger en creación de registro |
| AP4 | **Operar sin evidencia en CRM** | Disputas verbales sin trace; imposible auditar | Política: Nada sin campo/nota en CRM; verbal = no contabiliza |
| AP5 | **Mezclar modelos (comisión + marca blanca mismo deal)** | Aliado cobra comisión Y margen; MetodologIA pierde control de precio | Regla: Elegir modelo antes de H1; NO cambiar mid-stream |

---

## 7. FALLBACKS (5 Contingencias)

### FB1: CRM Caído
**Escenario:** Sistema CRM no accesible por >2 horas.

**Fallback:**
1. Aliado reporta a Katherine
2. Registro manual en Google Form de backup
3. Katherine valida datos 48h post-recuperación
4. Timestamp manual se reconcilia con CRM cuando suba

**Comunicación:** "CRM en mantenimiento. Usa este form; regularizaremos antes de liquidación."

### FB2: Disputa de Atribución (No hay Claridad en Timestamp)
**Escenario:** Dos aliados reclaman mismo prospecto; timestamps son iguales o perdidos.

**Fallback:**
1. Revisar activity log, notas de descubrimiento, emails
2. Evidencia de contacto previo (email enviado, call log) gana
3. Si es empate técnico, dividir comisión 50-50 en ese hito
4. Cambiar regla de creación de CRM para timestamps más precisos

**Decisión Final:** Germán, apoyado por Auditoría.

### FB3: Aliado No Completa Hito (Ej: Nunca hace H3, pero Cierra en H4)
**Escenario:** Aliado salta H3 (acompañamiento), cierra directamente.

**Fallback:**
1. Comisión base = 20% solamente (no hay bonus por H3)
2. Si MetodologIA tuvo que hacer H3, se registra y se revisa
3. Aliado retiene H1 + H2 + H4 (15%) si H3 no está evidenciado

**Nota:** Incentiva que aliado complete el ciclo; incompleto = menos dinero.

### FB4: Error en Liquidación (Cálculo Incorrecto)
**Escenario:** Sistema calcula $5k cuando debería ser $8k.

**Fallback:**
1. Auditoría detecta en revisión mensual
2. Corrección inmediata en siguiente ciclo de liquidación
3. Notificación a aliado con explicación + recálculo
4. Si error favoreció aliado, no hay castigo (culpa del sistema); si lo perjudicó, se reversa + intereses

**SLA:** Corrección dentro de siguiente ciclo quincenal.

### FB5: Cliente Cancela Post-Cierre
**Escenario:** Contrato firmado, recaudo realizado, pero cliente pide cancelación en mes 2.

**Fallback:**
1. Si cancela post-recaudo, comisión ya fue liquidada; no se reversa
2. Si cancela pre-recaudo (aunque contrato firmado), no se liquida aún
3. Si contrato tiene cláusula de reembolso y cliente pide devolución, comisión se reversa proporcionalmente

**Comunicación:** "Política de comisiones: revertimos proporcionalmente si hay reembolso al cliente."

---

## Estructuras Financieras Detalladas

### A. Comisión por Hitos (Reseller + Embajador Comercial)

**Base:** 20% sobre valor recaudado, distribuido en 4 hitos.

#### Hito 1: Registro (5% de Comisión)
- **Definición:** Referencia cualificada + registro único en CRM
- **Campos CRM Obligatorios:**
  - Nombre cliente (empresa)
  - Contacto (email + teléfono verificados)
  - Línea de negocio / departamento
  - Presupuesto estimado (rango: $5k-$500k)
  - Fuente de descubrimiento (aliado = nombre)
  - Fecha de descubrimiento
- **Pago:** 5% × Valor_Recaudado (liquidación post-recaudo)
- **Nota:** No requiere reunión aún; pero sí contacto verificado

#### Hito 2: Reunión Efectiva (5% de Comisión)
- **Definición:** Discovery validado con tomador de decisión
- **Evidencia:**
  - Meeting summary en CRM
  - Asistentes (al menos 1 tomador de decisión = C-Level, CFO, Decisor)
  - Próximo paso documentado
  - Presupuesto actualizado (si cambió)
- **Pago:** 5% × Valor_Recaudado
- **Timeline:** Típicamente 5-15 días post-H1

#### Hito 3: Acompañamiento (5% de Comisión)
- **Definición:** Soporte activo en propuesta y validación
- **Actividades:**
  - ≥3 touchpoints (revisiones de propuesta, iteraciones, validaciones)
  - Aliado participa en calls de refinamiento
  - Propuesta enviada y en revisión
- **Pago:** 5% × Valor_Recaudado
- **Timeline:** Típicamente 10-30 días post-H2

#### Hito 4: Cierre (5% de Comisión)
- **Definición:** Firma de contrato + recaudo efectivo
- **Evidencia:**
  - Documento de contrato firmado por ambas partes (PDF en CRM)
  - Comprobante de pago (transfer, factura pagada, depósito verificado)
  - Campo "Estado" = "Ganado"
- **Pago:** 5% × Valor_Recaudado (post-recaudo confirmado)
- **Timeline:** Después de recaudos; liquidación en próxima quincena

**Fórmula Simplificada:**
```
Comisión_Total = 0.20 × Valor_Recaudado
Liquidación = 4 × (5% × Valor_Recaudado) ó una liquidación en H4
```

### B. Modelo Upselling

**Principio:** Aliado que asesora mejor, gana más.

**Fórmula:**
```
Ganancia_Aliado = (20% × Precio_Referencia) + (100% × [Precio_Venta - Precio_Referencia])
```

**Ejemplo 1 — Venta en Precio de Referencia:**
```
Precio Referencia: $10,000
Precio Venta: $10,000
Comisión 20%: $2,000
Upselling: $0
Total: $2,000
```

**Ejemplo 2 — Venta con Upselling:**
```
Precio Referencia: $10,000
Precio Venta: $20,000
Comisión 20%: $2,000
Upselling (100%): $10,000
Total: $12,000
```

**Validación:** Si precio > 3× referencia, requiere aprobación Germán.

### C. Descuento Aliados (Intra-Ecosistema)

**Aplicación:** Aliado, pareja, padres, hermanos, hijos.

**Estructura:**
- Costo Base: 80% del PVP (= precio mayorista)
- Descuento Aliado: 33% adicional sobre costo
- Cálculo: 0.80 × (1 - 0.33) = 0.80 × 0.67 = 0.536
- **Resultado: 53.6% del PVP**

**Ejemplo:**
```
PVP: $1,000
Costo Base (80%): $800
Descuento Aliado (67% del costo): $800 × 0.67 = $536
```

**Extensión Familiar:**
- Verificación por DNI
- Un DNI = un código de descuento único
- No acumulable (pareja no puede pedir 2 códigos)
- Válido por 12 meses desde activación

### D. Marca Blanca (Modelo de Margen Directo)

**Concepto:** Aliado vende bajo su marca; MetodologIA es proveedor detrás.

**Flujo Financiero:**
1. Aliado paga Precio_de_Referencia a MetodologIA
2. Aliado vende a Precio_Final al cliente
3. Ganancia_Aliado = Precio_Final - Precio_de_Referencia
4. **Sin comisiones adicionales**

**Ejemplo:**
```
Precio Referencia (MetodologIA cobra): $10,000
Precio Final (Aliado vende al cliente): $18,000
Ganancia Aliado: $8,000
Comisión MetodologIA: $0 (ya cobró en Precio_Referencia)
```

**Ventajas para Aliado:**
- Margen directo sin límite
- Control total de precio al cliente
- Branding propio

**Ventajas para MetodologIA:**
- Cash flow inmediato
- Menor riesgo de cobranza
- Escalabilidad previsible

**Limitación:** No se puede combinar con modelo de comisión.

### E. Bonus de Abundancia

**Por cada cierre (H4 efectivo):** Aliado obtiene 1 cupo para un curso del cronograma académico.

**Aplicación:**
- Aliado puede designar: familiares directo (cónyuge, hijos), equipo propio, o él mismo
- Acceso a todos los cursos del cronograma (según disponibilidad de sesiones)
- Validez: 12 meses desde liquidación del cierre

**Valor Estimado:** $200-500 por cupo (según curso)

**Gestión:** Katherine registra en plataforma de aprendizaje; no se liquida en dinero, solo acceso.

---

## Gobernanza y Operación del CRM

### Principio Central
**Única Fuente de Verdad:** Si no está en el CRM, no existe.

### Campos Auditables Obligatorios (No Editables Post-Creación)

| Campo | Tipo | Quién Llena | Cuándo | Auditable |
|-------|------|-----------|--------|----------|
| `registro_fecha` | DateTime | Sistema | H1 | SÍ (timestamp) |
| `aliado_id` | FK | Aliado | H1 | SÍ |
| `cliente_nombre` | Text | Aliado | H1 | SÍ |
| `cliente_contacto` | Email | Aliado | H1 | SÍ |
| `presupuesto_estimado` | Currency | Aliado | H1 | SÍ |
| `hito_1_completado` | Bool | Sistema (trigger) | H1 | SÍ |
| `hito_2_fecha` | DateTime | Sistema | H2 | SÍ |
| `hito_2_completado` | Bool | Sistema | H2 | SÍ |
| `hito_3_fecha` | DateTime | Sistema | H3 | SÍ |
| `hito_3_completado` | Bool | Sistema | H3 | SÍ |
| `hito_4_fecha` | DateTime | Sistema | H4 | SÍ |
| `hito_4_completado` | Bool | Sistema | H4 | SÍ |
| `contrato_firmado_fecha` | DateTime | Aliado | H4 | SÍ |
| `monto_contrato` | Currency | Aliado | H4 | SÍ |
| `recaudo_fecha` | DateTime | Finance | Post-H4 | SÍ |
| `recaudo_monto` | Currency | Finance | Post-H4 | SÍ |
| `comision_total_calculada` | Currency | Sistema | Post-Recaudo | SÍ |
| `comision_liquidada` | Bool | Finance | Liquidación | SÍ |
| `comision_liquidada_fecha` | DateTime | Sistema | Liquidación | SÍ |

### Gatillo Auditable
Solo registros con evidencia (campos marcados auditables = TRUE) disparan liquidación.

### Política de Auditoría Mensual
- **Frecuencia:** Primer día hábil del mes
- **Datos Auditados:** Últimos 3 meses (rolling window)
- **Checklist:** Los 12 Criterios de Aceptación (sección 3)
- **Output:** Reporte con PASS/FAIL por aliado
- **Acciones:** Notificaciones a aliados de fallos; correcciones en siguiente ciclo

---

## Ciclo de Liquidación Quincenal

### Calendario Base
- **Período 1:** Días 1-15 de mes (liquidación 20-21)
- **Período 2:** Días 16-31 de mes (liquidación 5-6 mes siguiente)
- **Notificación:** 3 días antes (día 17/3)
- **Pago Efectivo:** 3 días hábiles post-notificación

### Proceso de Liquidación

**Paso 1: Recolección (día 15/30)**
- Sistema identifica oportunidades con `recaudo_fecha` en período
- Suma `recaudo_monto` por aliado

**Paso 2: Cálculo (día 18)**
- Para cada oportunidad:
  - Si todos 4 hitos = TRUE: Comisión = 20% × recaudo_monto
  - Si hitos parciales: Comisión = 5% × # de hitos completados × recaudo_monto
- Suma upselling (si aplica)
- Descuentos (referencia duplicada, disputas pendientes)

**Paso 3: Notificación (día 19)**
- Email a cada aliado:
  ```
  Liquidación Quincena [X] — [Rango Fechas]
  Oportunidades: [#]
  Monto Recaudado: $XXX
  Comisión: $YYY
  Método de Pago: Transferencia bancaria
  Fecha de Acreditación Estimada: [fecha + 3 días hábiles]
  ```
- Adjuntar: Anexo con desglose por oportunidad

**Paso 4: Aprobación (día 20)**
- Germán o designado revisa reportes excepcionales
- Katherine valida transferencias a ejecutar
- Si hay disputas, se retiene liquidación hasta resolución

**Paso 5: Ejecución (día 21-22)**
- Contabilidad ejecuta transferencias
- Sistema registra `comision_liquidada` = TRUE
- Comprobantes almacenados en repositorio

---

## Tabla de Precios de Referencia

### Servicios Core

| Servicio | Descripción | Precio de Referencia | Precio Mínimo | Margen Aliado Esperado | Actualización |
|----------|------------|-------------------|---------------|-----------------------|---------------|
| **Metodología BASE** | Implementación metodología (3 meses) | $10,000 | $8,000 | $2,000 (20%) | Q1 2026 |
| **Sesión Ejecutiva (1x)** | Facilitación + materiales | $2,500 | $2,000 | $500 (20%) | Q4 2025 |
| **Auditoría de Gobierno** | 1 mes evaluación + reporte | $5,000 | $4,000 | $1,000 (20%) | Q1 2026 |
| **Coaching C-Level (6 sesiones)** | 1:1 mensual x 6 meses | $6,000 | $4,800 | $1,200 (20%) | Q4 2025 |
| **Implementación Avanzada** | 6 meses, especializado | $25,000 | $20,000 | $5,000 (20%) | Q2 2026 |
| **Soporte Post-Go-Live (1 año)** | Acompañamiento continuo | $3,000 | $2,400 | $600 (20%) | Q1 2026 |

**Nota:** Precios vigentes desde 2026-03-01. Actualización trimestral. Aliados reciben notificación con 15 días de anticipación.

---

## Métricas del SOP

### KPIs Mensuales (Auditoría Interna + Katherine)

| KPI | Definición | Target | Umbral de Alerta |
|-----|-----------|--------|------------------|
| **Comisiones Liquidadas a Tiempo** | % de liquidaciones dentro de SLA (3 días hábiles) | 100% | <95% |
| **Promedio Comisión por Cierre** | Comisión promedio / # de cierres | $3,000 | <$1,500 |
| **Tasa de H1 → H4 Completado** | % de oportunidades H1 que llegan a H4 | 40% | <25% |
| **Retrasos en Auditoría** | % de registros con datos incompletos | 0% | >5% |
| **Disputas Resueltas** | # de disputas cerradas / # de disputas abiertos | 100% | <80% |
| **Errores en Cálculo** | # de correcciones post-liquidación | 0 | >2 |
| **Participación de Aliados Activos** | # aliados con ≥1 H1 en mes | Crecer 10% MoM | Decrecimiento |

### Dashboard de Visibilidad (para Aliados)

Cada aliado ve en CRM:
- Mis oportunidades (todas, filtrable por hito)
- Mis comisiones liquidadas (histórico)
- Mi próxima comisión estimada (pending hitos)
- Mi tasa de cierre (H1 → H4)
- Mis descuentos aliado disponibles

---

## Conexiones con Otros SOPs

| SOP Relacionado | Vínculo | Por Qué Importa |
|---|---|---|
| **habilitar-embajador-comercial-sop** | Pre-requisito | Aliado debe estar onboarded antes de H1 |
| **proceso-delivery** | Post-cierre | Después de H4, delivery toma la ejecución |
| **proceso-financiero** | Paralelo | Sistema de tesorería confirma recaudos; dispara liquidación |
| **cronograma-academico** | Beneficio | Bonus de Abundancia consume cursos de cronograma |
| **proceso-legal** | Escalación | Disputas sin resolver van a Legal |
| **Política de Precios** | Gobernanza | Precios de referencia actualizados trimestralmente |
| **Manual de CRM** | Operativo | Configuración técnica de campos y triggers |

---

## Ecuación MetodologIA

```
Abundancia Aliado = (Comisión Base + Upselling + Bonos) - Costo de Adquisición
                  = (20% × Valor_Recaudado) + (100% × Excedente) + (Cupones Académicos)
                  - (0, si no hay costo para aliado)

Valor Entregado = Alineación (Aliado gana cuando Cliente gana cuando MetodologIA gana)
                × Transparencia (Visibilidad 100% en CRM)
                × Escalabilidad (Sistema automático, soporta N aliados)
                × Sostenibilidad (Recaudo real, no promesas)
```

---

## Apéndice: Plantilla de Notificación de Liquidación

```
Asunto: Liquidación Quincena [X] — Comisiones de Aliados

Estimado [Aliado],

Tu liquidación de comisiones está lista:

PERÍODO: [Fecha Inicio] - [Fecha Fin]
OPORTUNIDADES CERRADAS: [#]
MONTO TOTAL RECAUDADO: $[XXX]
COMISIÓN LIQUIDADA: $[YYY]

DESGLOSE:
- Hito 1 (Registro): [# oportunidades] × 5% = $[X]
- Hito 2 (Reunión): [# oportunidades] × 5% = $[X]
- Hito 3 (Acompañamiento): [# oportunidades] × 5% = $[X]
- Hito 4 (Cierre + Recaudo): [# oportunidades] × 5% = $[X]
- Upselling: $[X]
- Bonos de Abundancia: [# cupones]

MÉTODO DE PAGO: Transferencia bancaria a [Cuenta Registrada]
FECHA ESTIMADA DE ACREDITACIÓN: [Fecha + 3 días hábiles]

Cualquier duda, contacta a Katherine (enablement@metodologia.ai)

Abundancia 🚀
El Equipo de MetodologIA
```

---

## Versionado y Cambios

| Versión | Fecha | Cambio | Autorizado Por |
|---------|-------|--------|---------------|
| 1.0 | 2026-03-24 | Versión inicial operativa | Germán + Katherine |
| — | — | — | — |

---

**Fin del SOP. Vigente desde 2026-03-24.**

Contacto Operativo: Katherine (C-Level Enablement) | katherine@metodologia.ai
Contacto Estratégico: Germán (C-Level Ecosystem) | german@metodologia.ai
