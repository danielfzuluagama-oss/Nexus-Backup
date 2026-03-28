# SOP: Obligaciones ante la DIAN — Declaraciones, Exogena, IVA, Renta

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Contador Publico
**Cierra:** FMF-01, 02, 03, 11, 12, 15, 16 (Backcasting CFO)

---

## 1. Proposito

Consolidar el procedimiento para cumplir TODAS las obligaciones declarativas ante la DIAN: IVA, retencion en la fuente, renta, informacion exogena, ICA, y controles de facturacion electronica.

---

## 2. Declaracion de IVA (FMF-03)

### Periodicidad

| Condicion | Periodicidad | Formulario |
|-----------|-------------|-----------|
| Ingresos brutos ano anterior >92.000 UVT (~$4.330M) | **Bimestral** | F-300 |
| Ingresos brutos ano anterior <=92.000 UVT | **Cuatrimestral** | F-300 |

**Cambio de periodicidad mid-year:** NO es posible. La periodicidad se evalua con los ingresos del ano fiscal anterior y aplica para todo el ano gravable. Si MetodologIA cruza el umbral de 92.000 UVT en 2026, el cambio a bimestral aplicaria desde 2027.

### Procedimiento de preparacion

| Paso | Accion | Responsable | Plazo |
|------|--------|------------|-------|
| 1 | Calcular IVA generado (cobrado en facturas del periodo) | Contador | Dia 5 post-cierre |
| 2 | Calcular IVA descontable (pagado en compras con factura valida) | Contador | Dia 5 |
| 3 | Determinar IVA a pagar = Generado - Descontable | Contador | Dia 7 |
| 4 | Si saldo a favor: evaluar devolucion o imputacion al proximo periodo | Contador | Dia 7 |
| 5 | Preparar borrador F-300 en plataforma DIAN | Contador | 15 dias antes del vencimiento |
| 6 | Revision por CFO/COO | CFO | 10 dias antes |
| 7 | Presentar y pagar electronicamente | Contador | Antes del vencimiento |
| 8 | Archivar declaracion + soporte de pago | Finanzas | Mismo dia |

### Analisis de Exenciones IVA Educacion (FMF-16)

| Servicio MetodologIA | Educacion formal? | Tratamiento IVA |
|---------------------|-------------------|----------------|
| **Bootcamp** (certificado de competencias) | Solo si acreditado MEN/SENA | Si acreditado: excluido (Art. 476 num. 6 ET). Si no: gravado 19% |
| **Workshop** (evento corto) | NO | Gravado 19% |
| **Consultoria** | NO | Gravado 19% |
| **Programa Elite** | NO | Gravado 19% |
| **Plataforma digital** | NO (salvo plataforma educativa licenciada) | Gravado 19% |

**Decision vigente:** Sin acreditacion MEN, todo se factura con IVA 19%.

---

## 3. Declaracion de Renta (FMF-02)

### Procedimiento anual

| Paso | Accion | Responsable | Plazo |
|------|--------|------------|-------|
| 1 | Cierre contable del ano fiscal (31 dic) | Contador | Enero |
| 2 | Conciliacion fiscal: diferencias NIIF vs fiscal | Contador | Febrero |
| 3 | Identificar INCR, deducciones, rentas exentas | Contador | Febrero |
| 4 | Calcular renta liquida gravable | Contador | Febrero |
| 5 | Aplicar tarifa (35% general PJ, o segun regimen) | Contador | Febrero |
| 6 | Descontar retenciones practicadas por clientes | Contador | Febrero |
| 7 | Preparar borrador (F-110 PJ o F-210 PN) | Contador | Marzo |
| 8 | Revision por CFO y/o Revisor Fiscal | CFO / RF | Marzo |
| 9 | Presentar y pagar antes del vencimiento | Contador | Segun calendario |
| 10 | Archivar con todos los soportes | Finanzas | Post-presentacion |

### Conciliacion NIIF a Fiscal

| Partida | Tratamiento NIIF | Tratamiento Fiscal | Diferencia |
|---------|-----------------|-------------------|-----------|
| Ingresos por % de avance | Reconoce proporcionalmente | Reconoce al facturar (segun caso) | Temporaria |
| Provisiones (garantias) | Reconoce cuando es probable | Solo deducible cuando se paga | Temporaria |
| Depreciacion | Segun vida util estimada | Segun tabla fiscal (Art. 137 ET) | Permanente/Temporaria |
| Gastos sin soporte | No deberia ocurrir | No deducible | Permanente |

---

## 4. Informacion Exogena (FMF-11)

### Formatos principales

| Formato | Contenido | Umbral | Plazo |
|---------|-----------|--------|-------|
| **1001** | Pagos y retenciones a terceros | Acumulado >$100.000 por concepto | Mar-Abr |
| **1003** | Retenciones practicadas | Todos los retenidos | Mar-Abr |
| **1005** | IVA descontable | Todos los proveedores con IVA | Mar-Abr |
| **1006** | IVA generado | Todos los clientes facturados con IVA | Mar-Abr |
| **1007** | Ingresos recibidos | Todos los clientes >$500.000 | Mar-Abr |
| **1008** | Cuentas por cobrar | >$500.000 al 31/dic | Mar-Abr |
| **1009** | Cuentas por pagar | >$500.000 al 31/dic | Mar-Abr |
| **2275** | Accionistas/socios | Todos | Mar-Abr |

### Procedimiento

| Paso | Accion | Responsable |
|------|--------|------------|
| 1 | Exportar datos del sistema contable por tercero y concepto | Contador |
| 2 | Validar NIT de todos los terceros (cruce con RUT) | Contador |
| 3 | Generar archivos XML segun especificaciones DIAN | Contador / Software |
| 4 | Validar con prevalidador DIAN (herramienta gratuita) | Contador |
| 5 | Presentar electronicamente | Contador |
| 6 | Archivar acuse de recibo | Finanzas |

---

## 5. ICA — Impuesto de Industria y Comercio (FMF-12)

| Paso | Accion |
|------|--------|
| 1 | Identificar municipios donde se prestaron servicios |
| 2 | Determinar ingresos gravables por municipio |
| 3 | Aplicar tarifa segun actividad y municipio (4.14 a 13.8 por mil) |
| 4 | Presentar y pagar segun calendario de cada municipio |

**Supuesto:** Medellin y Bogota son los municipios principales. Validar operacion presencial.

---

## 6. Control de Facturacion Electronica (FMF-15)

| Control | Frecuencia | Responsable |
|---------|-----------|------------|
| Verificar consecutivo sin saltos | Mensual | Contador |
| Notas credito con factura de referencia | Mensual | Contador |
| Vigencia resolucion DIAN | Trimestral | Contador |
| Rango de numeracion disponible | Trimestral | Contador |
| Anulacion: emitir nota credito, NUNCA eliminar factura | Cuando ocurra | Contador |

---

## 7. Tracker de Estado de Declaraciones — 2026

| Obligacion | Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct | Nov | Dic |
|-----------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| Retencion F-350 | | | | | | | | | | | | |
| IVA F-300 | - | - | - | C1 | - | - | - | C2 | - | - | - | C3 |
| PILA | | | | | | | | | | | | |
| ICA Medellin | | | | | | | | | | | | |

**Leyenda:** (vacio) = pendiente | P = presentada | $ = pagada | ! = vencida sin presentar | C1/C2/C3 = cuatrimestre 1/2/3
**Responsable de actualizar:** Contador, dia 1 de cada mes.

---

## 8. Procedimiento de Correccion de Declaraciones

Cuando se detecta un error en una declaracion ya presentada:

| Tipo de Correccion | Base Legal | Plazo | Procedimiento |
|-------------------|-----------|-------|-------------|
| **Correccion voluntaria que aumenta impuesto** | Art. 588 ET | Dentro de 2 anos desde el vencimiento | Presentar nueva declaracion marcando casilla "correccion" + pagar diferencia + sancion del 10% de la mayor valor a pagar |
| **Correccion voluntaria que disminuye impuesto** | Art. 589 ET | Dentro de 1 ano desde el vencimiento | Presentar solicitud ante la DIAN con nueva liquidacion propuesta. DIAN tiene 6 meses para responder. |
| **Correccion de errores de NIT, periodo, concepto** | Art. 43 Ley 962/2005 | Sin limite (no cambia valores) | Solicitud escrita a la DIAN para corregir dato formal |

**Sancion por correccion voluntaria (Art. 588):** 10% de la mayor valor a pagar o menor saldo a favor. Mucho menor que esperar a que la DIAN detecte (sancion por inexactitud: 100%).

**Regla practica:** Si se detecta error, corregir INMEDIATAMENTE. Cuesta 10x menos que esperar.

---

## Changelog

- v2.0.0 — Tracker de estado, procedimiento de correccion (Art. 588-589 ET), edge case cambio periodicidad IVA
- v1.0.0 — Creacion inicial
