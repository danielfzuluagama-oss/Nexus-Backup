# Matriz de Autoridad de Descuentos

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** CEO / Director Comercial
**Cierra:** FM-03 (Backcasting COO)

---

## Principio

**Ningun descuento se otorga sin aprobacion escrita del nivel de autoridad correspondiente.** La evidencia de aprobacion es requisito en `checklist-pre-firma.md`.

**Audit Trail:** Todo descuento >5% debe ser trazable a un email trail archivado por minimo 2 anos. Finanzas audita trimestralmente una muestra aleatoria del 20% de deals con descuento.

---

## Bandas de Descuento

| Banda | Descuento | Aprobador | Medio | Plazo |
|-------|-----------|-----------|-------|-------|
| **Verde** | 0-5% | Sales Rep (autonomo) | Registro en CRM | Inmediato |
| **Amarilla** | 6-10% | Director Comercial | Email con aprobacion explicita | 1 dia habil |
| **Naranja** | 11-20% | Director Comercial + COO | Email dual con justificacion | 2 dias habiles |
| **Roja** | 21-30% | CEO | Reunion + email de aprobacion | 3 dias habiles |
| **Prohibida** | >30% | Junta Directiva | Acta de junta | 5 dias habiles |

---

## Reduccion de Alcance vs. Descuento

> Cuando un cliente dice "es muy caro", hay dos caminos. Solo uno es descuento.

| Situacion | Camino | Proceso |
|-----------|--------|---------|
| Cliente quiere el mismo alcance a menor precio | **Descuento** | Seguir bandas de esta matriz |
| Cliente acepta reducir scope para ajustar presupuesto | **Reduccion de alcance** | Re-estructurar propuesta con Delivery. No requiere aprobacion de descuento. El precio baja porque el alcance baja. |
| Cliente quiere descuento Y reduccion de alcance | **Ambos** | Primero reducir alcance, luego evaluar si aun se necesita descuento sobre el precio ajustado |

**Regla:** Siempre explorar reduccion de alcance ANTES de ofrecer descuento. Protege margen y entrena al cliente a valorar el scope.

---

## Justificaciones Validas

| Justificacion | Banda maxima | Condiciones |
|--------------|-------------|------------|
| **Volumen** (>3 ODS simultaneas) | Naranja (20%) | Compromiso escrito de volumen |
| **Cliente estrategico** (referencia, marca) | Naranja (20%) | Plan de case study o co-marketing |
| **Penetracion de mercado** (nuevo segmento/geo) | Amarilla (10%) | Plan de expansion documentado |
| **Competencia directa** (deal a punto de perderse) | Roja (30%) | Evidencia de oferta competidora |
| **Aliado/Reseller** | Definido por modelo economico | Conforme a ODS de aliado |
| **Pro-bono / Social impact** | Roja+ (especial) | Aprobacion CEO + alineacion con mision |

## Justificaciones NO Validas

- "El cliente dice que es caro" (sin evidencia de competencia)
- "Es mi primer deal y necesito cerrarlo" (presion personal)
- "El cliente es amigo" (conflicto de intereses -> ref: `politica-conflicto-intereses.md`)
- "Ya le prometi el precio" (compromiso no autorizado — esta es falta disciplinaria)

---

## Bundling: Descuentos por Paquete

Cuando el cliente compra multiples servicios en una sola ODS, aplicar descuento de bundle estandar ANTES de evaluar descuentos adicionales.

| Combinacion | Descuento Bundle | Aprobador |
|-------------|-----------------|-----------|
| 2 servicios en misma ODS | 5% sobre el total | Sales Rep (banda Verde) |
| 3+ servicios en misma ODS | 8% sobre el total | Director Comercial (banda Amarilla) |
| Workshop + Consultoria (WS+BC) | 7% estandar | Director Comercial |

> El descuento de bundle y el descuento por negociacion son ACUMULATIVOS. Si el bundle da 5% y se solicita 8% adicional, el descuento total es 13% -> banda Naranja.

---

## Excepciones Estrategicas por Sector

| Escenario | Regla Especial | Aprobador |
|-----------|---------------|-----------|
| **Primer deal en vertical nueva** (ej: salud, fintech) | Hasta 15% como inversion de penetracion, con plan de 3 deals en 12 meses en la vertical | COO |
| **Gobierno / Educacion** | Descuento estandar hasta 15% sin justificacion adicional; procesos de contratacion publica tienen timeline largo | Director Comercial |
| **Startup en aceleradora aliada** | Hasta 20% si hay co-branding y caso de exito publicable | Director Comercial + COO |

---

## Excepciones a Terminos de Pago

| Modificacion | Aprobador |
|-------------|-----------|
| Pago a 45 dias (vs. estandar 30) | Director Comercial |
| Pago a 60 dias | COO |
| Pago a 90+ dias | CEO (con justificacion de cash flow) |
| 0% anticipo (vs. estandar con anticipo) | COO |
| Financiamiento interno (cuotas sin interes) | CEO |

---

## Proceso

1. Sales Rep identifica que el deal requiere descuento
2. **Primero evalua:** puede resolverse con reduccion de alcance?
3. Si no, completa el Formulario de Solicitud de Descuento
4. Envia al aprobador segun banda (incluir descuento de bundle si aplica)
5. Aprobador responde por email: "APROBADO" o "RECHAZADO" + razon
6. Sales Rep archiva la aprobacion y la referencia en `checklist-pre-firma.md`
7. Si se rechaza: presentar a precio canonico o negociar valor agregado

---

## Formulario de Solicitud de Descuento

```
## SOLICITUD DE DESCUENTO

**Fecha:** [___]  **Sales Rep:** [___]
**Cliente:** [___]  **ODS/Servicio:** [___]

**Precio canonico:** COP [___]
**Descuento bundle aplicado:** ___% (COP [___])
**Descuento adicional solicitado:** ___%
**Descuento total:** ___%
**Precio final solicitado:** COP [___]
**Banda:** [ ] Verde | [ ] Amarilla | [ ] Naranja | [ ] Roja

**Justificacion:** [___]
**Evidencia:** [Adjuntar: oferta competidora, plan de volumen, etc.]
**Se exploro reduccion de alcance?** [ ] SI (resultado: ___) | [ ] NO (razon: ___)

**Impacto en margen:**
- Margen a precio canonico: ___%
- Margen con descuento: ___%
- Diferencia: COP [___]

**Deal se pierde sin descuento?** [ ] SI (evidencia) | [ ] PROBABLE | [ ] NO SEGURO
```
