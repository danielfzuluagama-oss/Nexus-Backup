# SOP: Verificación y Gestión de PILA para Contratistas Independientes

**Versión:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Finanzas / RRHH
**Cierra:** FMF-05 (Backcasting CFO)
**Base legal:** Ley 100/1993, Decreto 1703/2002 Art. 23, Ley 1122/2007, Decreto 780/2016, Ley 1955/2019 Art. 244, Ley 2381/2024

---

## 1. Propósito

Condicionar TODO pago a contratistas independientes a la verificación de afiliación y pago PILA, eliminando responsabilidad solidaria para MetodologIA (Decreto 1703/2002 Art. 23).

---

## 2. Por Qué el IBC Mínimo es 40% — Historia Legislativa

**Ley 1955/2019 Art. 244** (Plan Nacional de Desarrollo 2018-2022) estableció que los trabajadores independientes por cuenta propia y con contrato de prestación de servicios cotizan sobre un IBC mínimo del 40% de los ingresos brutos mensualizados. Antes de esta ley, existía ambiguedad: algunos independientes cotizaban sobre bases arbitrariamente bajas, y la UGPP empezó a sancionar. El 40% se fijó como proxy de que el restante 60% cubre costos y deducciones operacionales del independiente.

**Implicación operativa:** MetodologIA NO puede aceptar una planilla donde el IBC sea inferior al 40% de los honorarios pagados, salvo que el contratista demuestre costos reales superiores al 60% mediante contabilidad formal (caso raro en prestación de servicios).

| Supuesto | [SUPUESTO] |
|----------|-----------|
| El 40% aplica sin excepción a los perfiles típicos de MetodologIA (facilitadores, consultores, embajadores) porque prestan servicios, no venden bienes con costos deducibles significativos. | Riesgo bajo de controversia UGPP sobre la base. |

---

## 3. Tabla de Referencia Rápida — Escenarios Comunes MetodologIA

> SMMLV 2026 estimado: $1.423.500. Tope cotización: 25 SMMLV = $35.587.500. [SUPUESTO]

| Perfil | Honorarios/mes | IBC (40%) | EPS (12.5%) | AFP (16%) | ARL Riesgo I (0.522%) | Total SS independiente | Solidaridad Pensional |
|--------|---------------|-----------|-------------|-----------|----------------------|----------------------|----------------------|
| Embajador puntual | $2.000.000 | $1.423.500* | $177.938 | $227.760 | $7.431 | $405.698 + ARL | No (IBC < 4 SMMLV) |
| Facilitador recurrente | $5.000.000 | $2.000.000 | $250.000 | $320.000 | $10.440 | $570.000 + ARL | No |
| Consultor senior | $10.000.000 | $4.000.000 | $500.000 | $640.000 | $20.880 | $1.140.000 + ARL | No |
| Consultor ejecutivo | $20.000.000 | $8.000.000 | $1.000.000 | $1.280.000 | $41.760 | $2.280.000 + ARL | $80.000 (1%) |
| Consultor top-tier | $50.000.000 | $20.000.000 | $2.500.000 | $3.200.000 | $104.400 | $5.700.000 + ARL | $300.000 (1.5%) |

*\*IBC nunca puede ser inferior a 1 SMMLV, por lo que para honorarios bajos el mínimo es el SMMLV.*

**Regla de oro:** Si IBC calculado (40% honorarios) < 1 SMMLV, usar 1 SMMLV como IBC.

---

## 4. Procedimiento

### 4.1 Al Inicio del Contrato

| Paso | Acción | Responsable | Evidencia |
|------|--------|-------------|-----------|
| 1 | Solicitar certificados vigentes de EPS, AFP y ARL | RRHH | Certificados en expediente |
| 2 | Verificar estatus activo en ADRES (adres.gov.co) | RRHH | Pantallazo ADRES con fecha |
| 3 | Si NO tiene ARL: afiliar y asumir costo | RRHH | Formulario de afiliación ARL |
| 4 | Preguntar al contratista si tiene otros contratos vigentes (ver Sec. 5.1) | RRHH | Declaración escrita del contratista |
| 5 | Registrar datos de SS en expediente | RRHH | Expediente actualizado |
| 6 | Notificar por escrito: pago condicionado a planilla PILA mensual | Operaciones | Comunicación firmada |

### 4.2 Antes de Cada Pago

| Paso | Acción | Responsable | Evidencia |
|------|--------|-------------|-----------|
| 7 | Solicitar planilla PILA pagada del mes | Finanzas | PDF o captura del operador PILA |
| 8 | Verificar IBC >= 40% de honorarios (o >= 1 SMMLV si aplica) | Finanzas | Cálculo documentado |
| 9 | Verificar 3 conceptos: EPS + AFP + ARL | Finanzas | Marcados en checklist |
| 10 | Si correcto: autorizar pago | Finanzas | Autorización firmada |
| 11 | Si incorrecto o ausente: NO PAGAR, notificar contratista, plazo de 5 días hábiles para subsanar | Finanzas | Notificación + fecha límite |
| 12 | Archivar planilla en expediente digital (carpeta: `PILA/{año}/{mes}/{NIT}`) | Finanzas | Archivo organizado |

---

## 5. Casos Especiales (Edge Cases)

### 5.1 Contratista con MÚLTIPLES Contratos

**Situación:** El independiente tiene contrato con MetodologIA Y con otras empresas simultáneamente.

**Riesgo:** Sobre-cotización (paga más del tope de 25 SMMLV entre todos los contratos) o sub-cotización (declara IBC inferior al 40% de la suma total de ingresos).

**Protocolo:**

| Paso | Acción |
|------|--------|
| 1 | Al inicio del contrato, solicitar **declaración jurada** de otros contratos vigentes (formato: `template-declaracion-multicontrato.md`) |
| 2 | Si la suma de ingresos de todos los contratos genera un IBC total > 25 SMMLV: el contratista puede distribuir proporcionalmente. Solicitar **certificación del otro contratante** con IBC reportado. |
| 3 | Verificar que el IBC reportado en la planilla PILA refleje AL MENOS el 40% de lo que MetodologIA le paga, como mínimo. No es responsabilidad de MetodologIA verificar lo que cotiza por otros contratos, pero sí es responsabilidad verificar que lo que corresponde a NUESTRO contrato esté cubierto. |
| 4 | Si el IBC total en planilla es inferior al 40% de la suma de honorarios de MetodologIA: **NO PAGAR** hasta aclaración. |

**Base legal:** Decreto 780/2016 Art. 2.2.1.1.1.7 — el independiente con múltiples contratos cotiza sobre la suma de ingresos, con tope de 25 SMMLV.

### 5.2 Extranjero con Convenio Internacional de Seguridad Social

**Situación:** Contratista extranjero que invoca el Convenio Iberoamericano de Seguridad Social u otro convenio bilateral (España, Chile, Argentina, Uruguay, Ecuador, etc.).

**Protocolo:**

| Paso | Acción |
|------|--------|
| 1 | Solicitar **Certificado de Desplazamiento** o **Formulario de Cobertura** emitido por la entidad de seguridad social de su país de origen |
| 2 | Verificar que el convenio específico está vigente con Colombia (consultar MinTrabajo) |
| 3 | Si el certificado es válido: el contratista está exento de cotizar en Colombia para los riesgos cubiertos por el convenio (generalmente pensión). Sigue obligado a tener EPS y ARL en Colombia. |
| 4 | Si NO tiene certificado válido: tratarlo como cualquier independiente colombiano — debe afiliarse y cotizar en Colombia |
| 5 | Archivar certificado de cobertura en expediente con nota: "Aplica convenio [nombre] — exento de [pensión/salud] — vigencia certificado: [fecha]" |

**Convenios vigentes con Colombia (2026):** España, Chile, Argentina, Uruguay, Ecuador, Perú, Brasil, Paraguay, Bolivia, Portugal, El Salvador, Corea del Sur. [DOC — verificar lista actualizada en MinTrabajo]

### 5.3 Contratista Pensionado que Sigue Trabajando

**Situación:** Persona ya pensionada (por vejez, invalidez parcial o anticipada) que presta servicios a MetodologIA.

**Protocolo:**

| Verificación | Acción |
|-------------|--------|
| Resolución de pensión | Solicitar copia de la resolución de reconocimiento de pensión |
| AFP | **NO cotiza a pensión.** Está exento por ya ser pensionado. |
| EPS | **SÍ cotiza a salud** (12.5% del IBC). Puede estar como beneficiario de la pensión, pero si tiene contrato de prestación de servicios, debe cotizar como independiente sobre el IBC del contrato. |
| ARL | **SÍ debe tener ARL.** MetodologIA afilia y paga. |
| Fondo de Solidaridad | **NO aplica** (es para cotizantes activos a pensión). |
| Planilla PILA | La planilla mostrará solo EPS + ARL, sin AFP. Esto es correcto. No bloquear pago por ausencia de AFP si hay resolución de pensión. |

**Base legal:** Ley 797/2003 Art. 4 — los pensionados que trabajan cotizan únicamente a salud.

---

## 6. Tasas de Cotización

| Concepto | % sobre IBC | Quién paga |
|---------|------------|-----------|
| EPS (salud) | 12.5% | Independiente |
| AFP (pensión) | 16% | Independiente |
| ARL | 0.522% (Riesgo I) a 6.960% (Riesgo V) | MetodologIA (contratante) |
| Fondo de Solidaridad Pensional | 1% a 2% si IBC > 4 SMMLV | Independiente |

---

## 7. Checklist de Verificación PILA (por pago)

```
VERIFICACIÓN PILA — [Nombre del Contratista] — [NIT/CC]

Mes: [___]  Contrato/ODS: [___]  Honorarios: COP $[___]
IBC mínimo esperado (40%): COP $[___]  IBC mínimo legal (1 SMMLV): COP $[___]

PLANILLA
- [ ] Planilla recibida — Operador: ☐ SOI | ☐ Aportes en Línea | ☐ Mi Planilla | ☐ Otro: [___]
- [ ] Número de planilla: [___]  Fecha de pago: [___]
- [ ] IBC reportado: COP $[___]
- [ ] IBC >= 40% de honorarios? ☐ SÍ | ☐ NO → BLOQUEAR
- [ ] IBC >= 1 SMMLV? ☐ SÍ | ☐ NO → BLOQUEAR

APORTES
- [ ] EPS: [___] — $[___] (>= 12.5% IBC)
- [ ] AFP: [___] — $[___] (>= 16% IBC) | ☐ N/A (pensionado — resolución archivada)
- [ ] ARL: [___] — $[___]

CASOS ESPECIALES
- [ ] ¿Tiene otros contratos? ☐ NO | ☐ SÍ → declaración multicontrato archivada
- [ ] ¿Es pensionado? ☐ NO | ☐ SÍ → resolución archivada, AFP no aplica
- [ ] ¿Es extranjero con convenio? ☐ NO | ☐ SÍ → certificado de cobertura archivado

DECISIÓN
- [ ] PAGO AUTORIZADO
- [ ] PAGO RETENIDO — Motivo: [___]

Verificado por: [___]  Fecha: [___]
```

---

## 8. Preparación para Auditoría UGPP

### 8.1 Contexto

La UGPP (Unidad de Gestión Pensional y Parafiscales) ha intensificado las auditorías a contratantes de independientes. [INFERENCIA] Entre 2023-2026, las acciones de fiscalización aumentaron significativamente, enfocándose en sub-cotización de independientes y responsabilidad solidaria del contratante.

### 8.2 Qué Busca el Auditor UGPP en MetodologIA

| Elemento | Qué revisa | Qué espera encontrar |
|----------|-----------|---------------------|
| Contratos | Valor mensualizado de cada contrato | Coherencia entre valor del contrato e IBC reportado |
| Planillas PILA | Que exista planilla por cada mes de ejecución del contrato | Continuidad sin meses faltantes |
| IBC | Que IBC >= 40% del valor mensualizado | Cumplimiento de Ley 1955/2019 Art. 244 |
| ARL | Que el contratante haya afiliado al independiente | Formulario de afiliación + pagos de ARL |
| Cruce de información | Compara pagos reportados en exógena vs. planillas PILA | Que cada peso pagado tenga planilla correspondiente |

### 8.3 Carpeta de Evidencia por Contratista (lista para auditoría)

```
📁 PILA/{año}/{NIT_contratista}/
├── contrato-vigente.pdf
├── certificados-afiliacion/ (EPS, AFP, ARL)
├── consulta-ADRES-{fecha}.png
├── planillas/
│   ├── {mes-01}.pdf
│   ├── {mes-02}.pdf
│   └── ...
├── checklist-verificacion/
│   ├── checklist-{mes-01}.pdf (firmado)
│   └── ...
├── comunicacion-condicionamiento-pago.pdf
└── [si aplica] declaracion-multicontrato.pdf
└── [si aplica] resolucion-pension.pdf
└── [si aplica] certificado-convenio-internacional.pdf
```

### 8.4 Criterio de Aceptación: Evidencia que Satisface al Auditor UGPP

Una auditoría UGPP se considera exitosamente atendida si MetodologIA puede demostrar:

1. **Para cada contratista, para cada mes pagado:** existe planilla PILA archivada con IBC >= 40% de honorarios
2. **Sin meses faltantes:** no hay pagos sin planilla correspondiente
3. **ARL activa:** formulario de afiliación y pagos de ARL por parte de MetodologIA
4. **Proceso documentado:** este SOP existe, está versionado, y hay evidencia de que se ejecuta (checklists firmados)
5. **Respuesta en plazo:** la UGPP da 1 mes para responder requerimiento. La carpeta de evidencia (Sec. 8.3) debe estar lista ANTES de la auditoría, no armarse a último momento.

---

## 9. Riesgos

| Riesgo | Consecuencia | Probabilidad [INFERENCIA] |
|--------|-------------|--------------------------|
| No verificar PILA antes de pagar | Responsabilidad solidaria: MetodologIA asume aportes + intereses + sanciones | Alta si no hay proceso |
| Contratista se accidenta sin ARL | MetodologIA asume 100% de costos médicos y prestaciones económicas | Media |
| UGPP audita y encuentra sub-cotización | Liquidación de aportes + sanción moratoria 5% mensual + intereses | En aumento |
| Contratista extranjero sin cobertura | Doble riesgo: laboral (sin ARL) + solidaria (sin PILA) | Baja pero creciente |

---

## Changelog

- v2.0.0 — Reescritura completa: tabla de escenarios comunes, edge cases (multicontrato, extranjero con convenio, pensionado), historia legislativa del 40% IBC, sección de preparación UGPP, criterios de aceptación para auditoría / Javier Montaño + Claude
- v1.0.0 — Creación inicial / Cierra FMF-05 / Javier Montaño + Claude
