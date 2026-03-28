# Liquidar Comisiones de Aliados — SOP

## Metadata
- **Vehículo:** Gobierno Financiero — Liquidación Quincenal
- **Proceso Padre:** Proceso Comercial → Aliados GTM × Proceso Financiero
- **Owners:** Katherine (C-Level Enablement) + Germán (C-Level Ecosystem)
- **Versión:** 1.0
- **Última Actualización:** 2026-03-24
- **Clasificación:** Operativo — Crítico (Impacto financiero alto)

---

## Propósito Ejecutivo

Proceso operativo de liquidación **quincenal** de comisiones para Resellers y Embajadores Comerciales. Implementa el principio canónico: **"Pago por Recaudo"** — las comisiones se liquidan **SOLO cuando el cliente final ha pagado** en efectivo.

**Flujo Canónico:**
```
Recaudo Cliente Final → Auditoría Automática (CRM) → Liquidación Quincenal Aliado → Pago
```

**Regla Oro:** Sin adelantos sobre expectativas. Sin especulación sobre pagos futuros. Sin crédito a aliados por ventas no pagadas.

---

## 10x Elevation Protocol — 7 Secciones Normativas

### 1. Nueve (9) Supuestos Foundacionales

1. **Recaudo = Liquidación:** Comisión deviene derecho SOLO cuando cliente ha pagado. Venta (contrato firmado) ≠ comisión devengada.
2. **CRM es Fuente Única:** Sistema CRM de MetodologIA registra entrada de recaudo (fecha, monto, método, cliente, aliado atribuido). No hay excepciones manuales sin auditoria.
3. **Aliado Reporta; Sistema Valida:** Aliado notifica recaudo, sistema CRM valida, auditoría automática confirma. Discrepancias > 5% disparan investigación.
4. **Ciclo Fijo de 15 Días:** Liquidación ocurre cada 2 viernes (cortes en jueves de cada 2 semanas). No hay liquidaciones ad-hoc ni fuera de ciclo.
5. **Comisión Base + Upselling:** Comisión se compone de (a) tasa fija sobre venta base, (b) bonificación sobre upselling/add-on. Ambas sujetas a recaudo.
6. **Devoluciones Restan Comisión:** Si cliente devuelve/cancela, comisión se deduce retroactivamente de próxima liquidación.
7. **Aliado Desactivado = Congelación:** Si aliado es desactivado (incumplimiento, rescisión), comisiones pendientes quedan congeladas hasta resolución legal/contractual.
8. **Transparencia Total:** Aliado accede a portal donde ve cada transacción, comisión asociada, estado de liquidación. No hay "comisiones ocultas".
9. **Compatibilidad de Modelos:** Un aliado puede ser simultáneamente revendedor comisionado Y Marca Blanca (si son segmentos diferentes). Liquidaciones se calculan separadamente.

### 2. Límites Operacionales (Lo Que NO Se Permite)

- **No Adelantos sin Garantía:** MetodologIA NO adelanta comisión sobre venta no pagada, incluso si cliente tiene "reputación de pago".
- **No Descuento por Plazo:** Si cliente paga atrasado (45d, 90d), comisión NO se reduce. Pero sí se retrasa su liquidación al próximo ciclo.
- **No Comisión en Cascada:** Comisión NO se calcula sobre comisión. Solo sobre venta neta (sin impuestos, con devoluciones descontadas).
- **No Comisión Post-Rescisión:** Si aliado rescinde o es desactivado, SOLO recibe comisión de transacciones liquidadas antes de fecha de corte. Transacciones posteriores NO generan derecho.
- **No Modificación Retroactiva:** Tasas de comisión NO se cambian retroactivamente. Cambios aplican a futuras transacciones con efectividad inmediata (próximo ciclo).
- **No Pago Sin Validación:** Aliado debe estar activo, con cuenta bancaria validada, sin disputas pendientes. Si cualquiera falla, pago se retiene.

### 3. Diez (10) Criterios de Validación para Liquidación

1. **Aliado Activo en CRM:** Status ≠ "Desactivado", "Suspendido" o "En Rescisión".
2. **Contrato de Comisión Vigente:** Acuerdo Revendedor/Embajador firmado y válido en rango de fechas de transacción.
3. **Cliente Pagó (Evidencia Documental):** Comprobante de pago en CRM (factura pagada, depósito bancario, transferencia, etc.).
4. **Tasa de Comisión Correcta:** Transacción aplica tasa vigente en fecha de venta (no comisión futura ni histórica).
5. **Atribución Validada:** Aliado registrado como "fuente" o "origin" de lead en CRM. Sin ambigüedades.
6. **Monto Recaudado Auditable:** Recaudo ingresa a cuenta de MetodologIA (no a cuenta de aliado) y se registra en asiento contable.
7. **Ausencia de Disputas:** No hay reclamo pendiente de cliente vs. aliado, ni de aliado vs. MetodologIA sobre esa transacción.
8. **Documento de Comisión Generado:** Sistema CRM auto-genera "Liqudation Line Item" con desglose: Venta Bruta, Devoluciones, Neto, Tasa, Comisión.
9. **Firma Digital de Validación:** Auditor de Katherine valida cada línea. Si OK, genera "Approved for Payment" flag.
10. **Datos Bancarios del Aliado Vigentes:** Cuenta bancaria del aliado en CRM, no suspendida, no marcada como fraude.

### 4. Siete (7) Casos Borde Críticos

**Caso Borde 1: Cliente Paga Parcialmente (Ej. 30% de $100k)**
- *Escenario:* Cliente negocia pago en cuotas. Primera cuota = $30k. ¿Se liquida comisión sobre $30k o espera al 100%?
- *Regla:* Comisión se liquida **incrementalmente sobre cada cuota recibida**. Si PdR era $100k con comisión 15% = $15k total, comisión sobre $30k cuota = $4.5k. Resto se liquida cuando clientes pague cuota siguiente.
- *Implicancia:* Ciclos de liquidación pueden tener comisiones parciales. Aliado recibe múltiples pagos para un cliente.

**Caso Borde 2: Cliente Devuelve/Cancela Post-Cierre de Quincena**
- *Escenario:* Aliado A vende cliente en semana 1. Quincena cierra, se liquida comisión a aliado. Cliente devuelve en día 10 de siguiente quincena.
- *Regla:* Comisión se **deduce de próxima liquidación** de aliado (puede ser negativa si comisión > ingresos nuevos). Si aliado rechaza, se retiene de saldo adeudado a MetodologIA por Marca Blanca u otro concepto.
- *Fallback:* Si aliado no tiene saldo futuro, acuerdo de cuotas negativas por 2-3 quincenas.

**Caso Borde 3: Disputa de Atribución entre Dos Aliados**
- *Escenario:* Aliado A reclama haber traído cliente. Aliado B reclama haber hecho venta. Ambos piden comisión.
- *Regla:* **Sistema CRM es fuente única.** Lead origin (campo "Originated By") determina atribución. Si hay ambigüedad (lead ingresó manualmente, sin source), escalada a Germán en <48h. Mientras, comisión se retiene.
- *Resolución:* Germán arbitra basándose en evidencia (emails, llamadas, documentos). Comisión va al ganador. Perdedor no recibe nada (salvo si hay co-venta documentada).

**Caso Borde 4: Aliado Desactivado con Comisiones Pendientes de Liquidación**
- *Escenario:* Aliado A tiene 5 transacciones no liquidadas. Aliado rescinde o es desactivado por incumplimiento. ¿Qué pasa?
- *Regla:* Comisiones devengadas (recaudos ya ocurridos, pre-desactivación) se liquidan normalmente en próximo ciclo. Comisiones futuras (transacciones post-desactivación) NO se generan.
- *Excepción:* Si hay litigio con aliado, comisiones pueden retenerse hasta resolución legal.

**Caso Borde 5: Error en Liquidación (Sistema Calcula Mal Comisión)**
- *Escenario:* Sistema CRM calcula comisión en $10k, pero tasa correcta produce $12k. Error detectado tras pago a aliado.
- *Regla:* Auditoría detecta error antes de pago (validación manual). Si error pasa a pago, se notifica aliado en <24h. Diferencia (falta de $2k) se abona en próxima quincena con explicación clara.
- *Fallback:* Si aliado se niega a aceptar corrección, escalada legal (posible fraude).

**Caso Borde 6: Comisión sobre Servicio con Descuento**
- *Escenario:* Venta base = $100k con comisión 15% ($15k). Cliente negocia descuento de 20% → Precio Final = $80k. ¿Comisión es 15% de $100k o de $80k?
- *Regla:* Comisión se calcula sobre **monto final recaudado**, no sobre lista. Si se vende $80k, comisión = 15% × $80k = $12k.
- *Justificación:* Aliado participó en negociación de descuento; riesgo de margen es compartido.

**Caso Borde 7: Bonus de Abundancia (Cupo de Curso, Timing de Liquidación)**
- *Escenario:* MetodologIA ofrece "bonus de abundancia": si aliado vende 5+ cursos en trimestre, obtiene bonus de $5k adicional. ¿Cuándo se liquida?
- *Regla:* Bonus se liquida **al cierre del trimestre**, no antes. Req: todos los 5+ cursos deben tener recaudo confirmado al último día del trimestre.
- *Fallback:* Si uno de los cursos se devuelve post-bonus, bonus no se afecta (es descuento acumulativo, no transaccional).

---

### 5. Cinco (5) Decisiones de Diseño Críticas

**Decisión 1: CRM como Fuente Única de Verdad (No Negociable)**
- *Decisión:* MetodologIA no mantiene registros de comisión externos (Excel, emails, etc.). CRM es la verdad. Si discrepancia, CRM gana.
- *Rationale:* Evita corrupción de datos, falsificación de registros, disputas infundadas.

**Decisión 2: Liquidación Semanal vs. Quincenal**
- *Decisión:* Adoptamos **quincenal** (cada 2 viernes), no semanal, porque:
  - Reduce fricción operativa (menos procesamiento).
  - Ciclo contable más limpio.
  - Aliados tienen "horizonte visible" de cuando cobran.
- *Trade-off:* Aliado espera máx 15d para pago. Es razonable.

**Decisión 3: Retención de Impuestos y Responsabilidad Fiscal**
- *Decisión:* MetodologIA retiene impuestos según ley local (ej. 10% Ganancias en Argentina). Aliado recibe neto. MetodologIA reporta a autoridades.
- *Rationale:* Compliance; claridad; MetodologIA asume responsabilidad.

**Decisión 4: Adelantos, Nunca. Atrasos, Rara Vez.**
- *Decisión:* Aliado NO recibe comisión adelantada (antes de recaudo cliente). Si cliente atrasa pago, comisión se atrasa también.
- *Excepción:* Aliados "Oro" (>$500k recaudos/año histórico) pueden solicitar "póliza de anticipación" (asegurado por tercero). Máx 30d anticipo.
- *Rationale:* Riesgo de mora queda con aliado (incentivo de cobranza).

**Decisión 5: Modelo de Comisión Base + Bonificación (No Comisión Escalonada)**
- *Decisión:* Comisión = Tasa Fija + Bonificación Condicional, no modelo escalonado (15% de 0-100k, 20% de 100k+).
- *Rationale:* Simplicidad; predictibilidad; menos disputas por "qué tasa aplica".
- *Ejemplo:* Comisión = 12% + Bonus 3% si cliente paga en <30d.

---

### 6. Cinco (5) Anti-Patterns Identificados (¿Qué Evitar?)

**Anti-Pattern 1: "Comisión Esperada"**
- *Riesgo:* Aliado asume comisión sobre venta contratada (aún sin pago) y planifica gastos sobre ello.
- *Impacto:* Si cliente no paga, aliado tiene obligación de gastos impagos → reclamos a MetodologIA.
- *Mitigación:* Contrato claro: "Comisión solo por recaudo efectivo". Portal muestra solo "Comisiones Liquidadas", no "Comisiones Esperadas".

**Anti-Pattern 2: "Liquidación Manual Frecuente"**
- *Riesgo:* Aliado solicita liquidación urgente (fuera de ciclo) por casos especiales → fricción operativa.
- *Impacto:* Proceso se vuelve artesanal; aumenta riesgo de error.
- *Mitigación:* Ciclo fijo, inamovible. Excepciones solo con aprobación CFO + Germán (raro).

**Anti-Pattern 3: "Comisión en Cascada"**
- *Riesgo:* Aliado A vende a Aliado B (reseller de reseller). Ambos quieren comisión → costo prohibitivo.
- *Impacto:* Margen MetodologIA se erosiona; cliente paga más sin valor agregado.
- *Mitigación:* Cláusula contractual: "No subcontratación de derechos de comisión sin autorización". Incumplimiento = rescisión.

**Anti-Pattern 4: "Comisión sin Auditoría de Atribución"**
- *Riesgo:* Aliado reporta comisiones; sistema paga sin validar "¿Realmente trajo este cliente?".
- *Impacto:* Fraude posible; comisiones ficticias.
- *Mitigación:* Auditoría pre-pago: cada transacción validada vs. lead origin en CRM.

**Anti-Pattern 5: "Cierre Contable Sucio"**
- *Riesgo:* Comisiones pendientes + disputas + devoluciones no se cierran limpiamente al fin de mes → reconciliación imposible.
- *Impacto:* Auditoría externa rechaza números.
- *Mitigación:* Cierre riguroso cada quincena: todas las transacciones resueltas (liquidadas, devueltas, congeladas) antes de generar reporte.

---

### 7. Cinco (5) Fallbacks / Plan B

**Fallback 1: "Aliado Rechaza Comisión Calculada (Reclama Más)"**
- *Trigger:* Aliado notifica que comisión está baja, solicita revisión.
- *Escalation:* Katherine revisa cálculo en CRM. Si error de sistema, se corrige. Si es discrepancia legítima (ej. atribución), escalada a Germán en <2 días.
- *Plan B:* Si aliado insiste, retiene pago en escrow (cuenta de tercero) mientras se resuelve. Aliado puede apelar formalmente en 10 días.

**Fallback 2: "Cliente No Paga; Aliado Exige Comisión de Todas Formas"**
- *Trigger:* Aliado reclama "No es mi culpa que cliente no pague".
- *Respuesta:* Contrato es claro: "Comisión por recaudo". Si cliente no paga, no hay comisión. MetodologIA puede ofrecer auxiliar aliado en cobranza (sin costo).
- *Plan B:* Si cliente paga >90d tarde, aliado recibe comisión en próximo ciclo tras recaudo efectivo.

**Fallback 3: "Sistema CRM Cae; No Hay Datos de Liquidación"**
- *Trigger:* Downtime de CRM en semana de liquidación.
- *Respuesta:* Liquidación se atrasa al ciclo siguiente (máx 7d). Se usa backup de base de datos. Si no hay backup válido, comisión se calcula desde evidencia documental (facturas, depósitos).
- *Plan B:* Aliados afectados reciben notificación y cronograma claro. Pago se realiza con interés del 0.5% por semana de atraso.

**Fallback 4: "Aliado Desaparece; No Sabemos Dónde Mandar Comisión"**
- *Trigger:* Aliado no responde; no hay cuenta bancaria actualizada en CRM.
- *Respuesta:* Se intentan 3 contactos (email, teléfono, LinkedIn) en 5 días. Si no responde, comisión se congela en cuenta de MetodologIA.
- *Plan B:* Si aliado reaparece <180d, se libera comisión + interés 2% anual. Si >180d sin contacto, comisión se dedica a fondo de empresa (según auditoría fiscal local).

**Fallback 5: "Auditoria Externa Detecta Comisión Potencialmente Fraudulenta"**
- *Trigger:* Auditoria externa nota transacción inusual (ej. venta a dirección de aliado, cliente ficticio).
- *Respuesta:* Investigación inmediata (Germán + Katherine + Auditor). Si es fraude confirmado, comisión se revoca, aliado se desactiva, caso se escala a autoridades.
- *Plan B:* Si hay dudas (no fraude confirmado), comisión se retiene en escrow x 60d hasta resolución. Si se confirma legitimidad, se libera + interés de atraso.

---

## Flujos Operacionales (6 Workflows)

### WF-01: Corte Quincenal — Identificar Comisiones Devengadas

**Entrada:** Cada jueves (fin de semana laboral Argentina/LatAm), sistema CRM inicia corte quincenal.

**Pasos:**
1. Sistema CRM genera reporte de "Recaudos Completados" en período (jueves previo - jueves actual).
2. Reporte agrupa por: Aliado, Cliente, Producto, Monto, Tasa de Comisión, Fecha de Recaudo.
3. Sistema calcula automáticamente: Comisión = Monto × Tasa.
4. Sistema identifica devoluciones/cancelaciones en período. Resta comisión.
5. Sistema identifica descuentos (cliente negoció precio). Ajusta base de cálculo.
6. Resultado: lista de "Comisiones Devengadas por Aliado" (borrador).
7. Katherine revisa lista (30 min). Si hay inconsistencias, marca para investigación.

**Salida:** Draft de "Comisiones Devengadas" listo para auditoría.

---

### WF-02: Auditar Evidencia en CRM

**Entrada:** Draft de comisiones devengadas + lista de transacciones subyacentes.

**Pasos:**
1. Auditor de Katherine (o sistema automático) valida cada transacción:
   - ¿Existe contrato cliente vigente? ✓
   - ¿Aliado está en CRM como "origen"? ✓
   - ¿Recaudo registrado con comprobante (factura pagada, depósito)? ✓
   - ¿Tasa de comisión es la vigente en fecha de venta? ✓
   - ¿No hay disputa pendiente sobre esta transacción? ✓
2. Si todas marcan ✓, transacción pasa a "Approved for Commission".
3. Si hay ?, auditor investiga (email a aliado, revisión de emails, llamadas a cliente).
4. Si hay X (no cumple), transacción se marca "Pending" o "Rejected". Se notifica aliado.
5. Auditoría completa en <4h. Status actualizado en CRM.

**Salida:** Comisiones "Approved for Payment" + lista de transacciones "Pending" (con motivo).

---

### WF-03: Calcular Montos (Base + Upselling)

**Entrada:** Comisiones aprobadas + desglose de upselling (si aplica).

**Pasos:**
1. Sistema CRM separa: Venta Base vs. Upselling/Add-on.
   - Venta Base: servicio principal contratado.
   - Upselling: módulos, extensiones, servicios adicionales vendidos post-cierre.
2. Comisión Base = Venta Base × Tasa Comisión Base (ej. 12%).
3. Comisión Upselling = Upselling × Tasa Comisión Upselling (ej. 8%, menor incentivo).
4. Sistema suma: Comisión Total = Comisión Base + Comisión Upselling.
5. Sistema aplica deducciones:
   - Retención de impuestos (%) según jurisdicción.
   - Adelantos previos no liquidados (si aplica).
   - Saldos adeudados de quincena anterior (devoluciones, errores, etc.).
6. Resultado: Comisión Neta por Aliado = Comisión Total − Deducciones.
7. Sistema genera "Liquidation Detail Sheet" por aliado (Excel descargable).

**Salida:** Montos finales listos para aprobación.

---

### WF-04: Aprobar Liquidación

**Entrada:** Liquidation Detail Sheet con montos netos por aliado.

**Pasos:**
1. Katherine revisa montos finales. Si grandes discrepancias vs. mes anterior (±20%), solicita explicación a Germán.
2. Si OK, Katherine aprueba en sistema CRM ("Liquidation Approved" flag).
3. Sistema genera "Liquidation Report" (resumen ejecutivo + detalle por aliado).
4. Germán revisa reporte final (10 min). Firma digitalmente (aprobación final).
5. Sistema genera "Payment Orders" = instrucciones de transferencia bancaria.
6. Payment Orders enviadas a Tesorería (o CFO) para ejecución.

**Salida:** Liquidación aprobada, órdenes de pago generadas.

---

### WF-05: Ejecutar Pago

**Entrada:** Payment Orders aprobadas.

**Pasos:**
1. Tesorería/CFO revisa órdenes. Valida:
   - Cuentas bancarias de aliados están actualizadas y no marcadas como fraudulentas.
   - Montos match con liquidación aprobada.
   - No hay restricciones legales (embargo, etc.).
2. Si OK, procede transferencia bancaria masiva (batch processing si son >10 aliados).
3. Transferencias procesadas en <4h (mismo viernes).
4. Sistema CRM registra confirmación de pago (fecha, referencia bancaria, monto).
5. Notificación automática a aliados: "Comisión liquidada. Esperá transferencia en 1-2 días hábiles".

**Salida:** Pagos ejecutados, confirmaciones registradas.

---

### WF-06: Notificar Aliado + Detalle

**Entrada:** Pago confirmado en CRM.

**Pasos:**
1. Sistema genera "Liquidation Statement" por aliado (PDF descargable en portal).
2. Statement incluye:
   - Fecha de liquidación.
   - Período cubierto (ej. 10-24 de marzo).
   - Detalle de transacciones (cliente, venta, comisión, fecha recaudo).
   - Deducciones (impuestos, adelantos, saldos previos).
   - Comisión Neta.
   - Método y fecha de pago.
   - Link a portal para descargar comprobante.
3. Email automático a aliado con statement adjunto. CC a Germán (audit trail).
4. Portal actualizado: aliado ve "Comisión Liquidada" en dashboard.
5. Si aliado tiene dudas, puede iniciar ticket de soporte con screenshot del statement.

**Salida:** Aliado notificado, documentación completa, ciclo cerrado.

---

## Calendario de Liquidación (Ciclo Fijo)

| Fase | Día | Hora | Owner | Duración |
|------|-----|------|-------|----------|
| Corte Quincenal | Jueves | 18:00 | CRM automático | 30 min |
| Auditoría | Viernes | 09:00-13:00 | Katherine + Auditor | 4h |
| Cálculo de Montos | Viernes | 13:00-14:00 | Sistema CRM | 1h |
| Aprobación Katherine | Viernes | 14:00-14:30 | Katherine | 30 min |
| Aprobación Germán | Viernes | 14:30-14:45 | Germán | 15 min |
| Ejecución de Pagos | Viernes | 15:00-16:00 | Tesorería/CFO | 1h |
| Notificación Aliados | Viernes | 16:30 | Sistema automático | 15 min |
| Pago Efectivo en Cuenta | Lunes-Martes (L+2) | — | Banco | — |

**Frecuencia:** Cada 2 viernes. Próximas liquidaciones: 24-mar, 7-abr, 21-abr, 5-may, 19-may, etc.

---

## Métricas de Éxito

1. **Precisión de Cálculo:** Errores en liquidación <0.5% (auditoria vs. manual). Target: 99.5%.
2. **On-Time Payment:** % de pagos ejecutados dentro de ciclo programado. Target: 100%.
3. **Dispute Rate:** Reclamos de aliados vs. liquidación / total liquidaciones. Target: <2%.
4. **Audit Completion Time:** Promedio de horas para auditar todas las transacciones. Target: <4h.
5. **CRM Data Quality:** % de transacciones con atribución clara (no "pending"). Target: >98%.
6. **Recaudo en Ciclo:** % de comisiones liquidadas basado en recaudos del período vs. comisiones esperadas. Target: >85%.
7. **Adelantos Solicitados:** # de solicitudes de adelanto / total aliados. Target: <5%.

---

## Diferencias Clave: Comisión vs. Marca Blanca

| Aspecto | Modelo Comisión | Marca Blanca |
|--------|-----------------|-------------|
| **Liquidación** | Quincenal; por recaudo cliente | Ad-hoc; aliado paga PdR cuando cobra |
| **Trigger** | Recaudo del cliente | Recaudo del cliente |
| **Tasa** | % fijo (ej. 12%) | Margen libre (PdR → Precio Final) |
| **Frecuencia** | Fija: cada 2 viernes | Flexible; alias controla timing |
| **Responsabilidad Recaudo** | MetodologIA persigue cliente | Aliado persigue su cliente |
| **Adelantos** | Excepcional; raro | No aplica (aliado es dueño) |
| **Disputas** | MetodologIA arbitra | Aliado negocia con su cliente |

---

## Conexiones Sistémicas

- **Proceso Comercial — Aliados GTM:** Aliados comisionados son parte de estrategia de distribución. Liquidación es incentivo.
- **Proceso Financiero:** Ingresos de MetodologIA dependen del recaudo; comisiones salen del margen neto.
- **CRM Central:** Fuente única de verdad para leads, transacciones, recaudos, atribuciones.
- **Cumplimiento & Auditoría:** Cada liquidación es auditable ante autoridades fiscales.
- **Tesorería:** Gestiona pagos; coordina con Katherine en timing.

---

## Ecuación MetodologIA (Rentabilidad Comisiones)

```
Ingresos_MetodologIA = Venta_Cliente − Comisión_Aliado − Costo_Delivery

Comisión_Aliado = Recaudo_Cliente × Tasa_Comisión (ej. 12%)

Margen_MetodologIA = (Recaudo − Comisión − Costo_Delivery) / Recaudo

Ejemplo:
  Venta Cliente: $100k
  Recaudo: $100k (100% pago)
  Comisión Aliado: 12% × $100k = $12k
  Costo Delivery: $15k
  Ingresos Netos MetodologIA: $100k − $12k − $15k = $73k
  Margen MetodologIA: 73%

Punto de Quiebre (Min Recaudo para Liquidar):
  Si Costo Auditoría = $200
  Comisión Mínima para justificar liquidación = $500
  Recaudo Mínimo = $500 / 12% = $4.2k (cliente muy pequeño; se liquida igual pero low ROI)

Elasticidad (Aliado de Alto Volumen):
  Si aliado trae >$1M/año recaudos
  → Se puede negociar tasa comisión reducida (ej. 10% en lugar de 12%)
  → Ahorro para MetodologIA: 2% × $1M = $20k/año
```

---

## Anexos Operacionales

- **Anexo A:** Plantilla de "Liquidation Detail Sheet".
- **Anexo B:** Tasas de Comisión por Producto/Modelo (vigentes).
- **Anexo C:** Template de Email de Notificación a Aliados.
- **Anexo D:** Rúbrica de Auditoría de Atribución (preguntas de validación).
- **Anexo E:** Procedimiento de Escalation para Disputas de Comisión.
- **Anexo F:** Calendario de Liquidación (12 meses siguiente).

---

## Escalation & Gobierno

| Escala de Decisión | Owner | Timing |
|--------|-------|--------|
| Aprobación liquidación normal | Katherine | 30 min |
| Aprobación final (Germán) | Germán | 15 min |
| Disputas de comisión (<$10k) | Katherine | <2 días |
| Disputas de comisión (>$10k) | Germán + CFO | <5 días |
| Fraude sospechado | Germán + Auditor Externo | <10 días |
| Cambio de tasa de comisión | Katherine + Germán | <1 semana |
| Revisión trimestral | CFO + Germán | Fin de trimestre |

---

## Seguridad & Compliance

- **Confidencialidad:** Datos de comisiones son confidenciales. No se comparten entre aliados.
- **Auditoría Fiscal:** Cada liquidación es registrada en libros contables. Disponible para auditoría externa.
- **Retención Impositiva:** MetodologIA retiene según ley. Responsabilidad de MetodologIA.
- **RGPD/Privacidad:** Datos bancarios de aliados encriptados en CRM. No se transfieren terceros.

---

## Control de Cambios

| Versión | Fecha | Cambio | Owner |
|---------|-------|--------|-------|
| 1.0 | 2026-03-24 | Creación inicial | Katherine, Germán |

---

## Preguntas Frecuentes (FAQ)

**P: ¿Cuánto espero para cobrar comisión?**
R: Máximo 15 días desde recaudo del cliente. Sistema CRM dispara liquidación en próximo corte quincenal.

**P: ¿Si cliente paga atrasado, se retrasa mi comisión?**
R: Sí. Comisión se liquida cuando cliente paga. Si cliente paga en día 90, tu comisión en ciclo de 90+ días.

**P: ¿Puedo solicitar comisión adelantada?**
R: No, salvo si eres aliado "Oro" ($500k+/año). Póliza de adelanto disponible con aseguradora.

**P: ¿Qué pasa si me equivoco en el reporte de comisión?**
R: Sistema CRM valida. Si hay error tuyo, auditor contacta. Corrección manual en próxima quincena (no penalidad).

**P: ¿Cómo disputo una comisión que creo es incorrecta?**
R: Abre ticket en portal. Katherine revisa en <2 días. Si aceptamos error, se corrige. Si es correcta, explicamos desglose.

