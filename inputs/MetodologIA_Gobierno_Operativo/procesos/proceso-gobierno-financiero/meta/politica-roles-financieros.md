# Politica de Roles Financieros: Contador, CFO, Revisor Fiscal

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Cierra:** FMF-09, FMF-10, FMF-19, FMF-22 (Backcasting CFO)

---

## 1. Proposito

Definir los roles obligatorios del gobierno financiero, sus responsabilidades, requisitos legales, criterios de seleccion, costos de referencia, y plan de sucesion.

---

## 2. Roles

### Contador Publico (Obligatorio — Art. 19 Codigo de Comercio)

| Aspecto | Detalle |
|---------|---------|
| **Requisito legal** | Tarjeta profesional vigente (Junta Central de Contadores) |
| **Modalidad** | Empleado o Contratista externo (firma contable) |
| **Responsabilidades** | Contabilidad NIIF, estados financieros, firma declaraciones, certificaciones, informacion exogena |
| **Incompatibilidad** | No puede ser simultaneamente revisor fiscal de la misma entidad |
| **Verificacion** | Consultar estado de tarjeta profesional en www.jcc.gov.co |

### CFO / Director Financiero (Recomendado)

| Aspecto | Detalle |
|---------|---------|
| **Requisito legal** | No obligatorio por ley, pero critico operativamente |
| **Responsabilidades** | Estrategia financiera, tesoreria, forecast, relacion bancaria, supervision del contador |
| **Puede ser** | El COO si la empresa es pequena, o un perfil dedicado |

### Revisor Fiscal (Obligatorio si aplica — Art. 203 Codigo de Comercio)

| Aspecto | Detalle |
|---------|---------|
| **Cuando es obligatorio** | (a) S.A., (b) toda sociedad con activos >=5.000 SMMLV o ingresos >=3.000 SMMLV |
| **Umbrales 2026 (est.)** | Activos >=$7.800M o Ingresos >=$4.680M |
| **Requisito** | Contador publico independiente con TP vigente. Sin parentesco ni relacion laboral con administradores. |
| **Designacion** | Por Asamblea de Socios/Accionistas |
| **Responsabilidades** | Dictaminar EEFF, verificar cumplimiento tributario y legal, reportar irregularidades |
| **Incompatibilidad** | No puede ser el mismo contador |

---

## 3. Criterios de Seleccion de Contador/Revisor Fiscal Externo

| Criterio | Peso | Que Evaluar |
|---------|------|------------|
| **Experiencia en sector servicios/tecnologia** | Alto | Manejo de revenue recognition NIIF 15, contratos de servicio, comisiones |
| **Experiencia con DIAN** | Alto | Ha presentado exogena, ha respondido requerimientos, conoce el portal DIAN |
| **Tarjeta profesional vigente** | Obligatorio | Verificar en www.jcc.gov.co. Verificar que no tenga sanciones disciplinarias |
| **Poliza de responsabilidad profesional** | Recomendado | Protege a MetodologIA si el contador comete errores que generan sanciones |
| **Capacidad de respuesta** | Alto | Disponibilidad para presentar declaraciones en vencimiento, responder requerimientos DIAN |
| **Software contable** | Medio | Compatible con el software de MetodologIA o trae el suyo (Siigo, World Office, Alegra, etc.) |
| **Referencias verificables** | Alto | Minimo 2 clientes similares (PYME de servicios en Medellin) |

---

## 4. Costos de Referencia — Medellin 2026

| Servicio | Rango Mensual COP | Notas |
|---------|-------------------|-------|
| **Contador externo (firma contable) — PYME basica** | $800.000 - $2.000.000 | Incluye contabilidad mensual, declaraciones, PILA |
| **Contador externo — PYME con complejidad media** | $2.000.000 - $4.000.000 | Incluye exogena, EEFF, asesoria tributaria basica |
| **Contador empleado (medio tiempo)** | $2.500.000 - $4.000.000 | Salario + prestaciones. Mas dedicacion pero mas costo fijo |
| **Revisor Fiscal (si aplica)** | $1.500.000 - $4.000.000 | Depende de tamano y complejidad. Pago independiente del contador |
| **Asesor tributario externo (por demanda)** | $300.000 - $800.000/hora | Para consultas puntuales, defensa DIAN, planeacion tributaria |

**Recomendacion para MetodologIA hoy:** Contador externo (firma contable) rango $1.5M-$2.5M/mes. Cuando los ingresos superen $500M anuales, evaluar contador de medio tiempo.

---

## 5. Plan de Sucesion y Continuidad

### Si el Contador se vuelve no disponible (renuncia, enfermedad, inhabilitacion)

| Plazo | Accion | Responsable |
|-------|--------|------------|
| **Inmediato (0-48h)** | Identificar si hay declaraciones con vencimiento en los proximos 30 dias | CFO/COO |
| **Semana 1** | Contactar firma contable de respaldo (pre-identificada, ver abajo) | CFO |
| **Semana 1** | Asegurar acceso a: sistema contable, portal DIAN, certificado digital, archivo contable | CFO |
| **Semana 2** | Firma de respaldo asume preparacion de declaraciones urgentes | Firma de respaldo |
| **Mes 1** | Buscar contador permanente de reemplazo (segun criterios seccion 3) | CFO |

### Documentacion minima de handover (mantener actualizada)

| Documento | Ubicacion | Actualizar |
|----------|-----------|-----------|
| Credenciales de acceso a portal DIAN (usuario, contrasena) | Boveda de contrasenas segura | Al cambiar |
| Certificado digital (firma electronica) de la empresa | Archivo seguro + backup | Anual |
| Listado de obligaciones pendientes con fechas | Este calendario tributario | Mensual |
| Estado de cada declaracion del ano (presentada/pendiente) | Tracker en `sop-obligaciones-dian.md` | Mensual |
| Software contable: credenciales y ubicacion de backups | Boveda de contrasenas | Al cambiar |

### Firma contable de respaldo (pre-identificar)

| Campo | Valor |
|-------|-------|
| Firma | (identificar y registrar) |
| Contacto | (completar) |
| Tarifa estimada por urgencia | (negociar previamente) |
| Ultima verificacion | (fecha) |

---

## 6. Evaluacion de Obligatoriedad del Revisor Fiscal

```
## EVALUACION — REVISOR FISCAL

Fecha de evaluacion: _______________
Ano fiscal evaluado: _______________

### Datos
- Activos brutos totales al 31/dic: COP $_______________
- Ingresos brutos totales del ano: COP $_______________

### Umbrales legales (SMMLV [ano])
- SMMLV [ano]: COP $_______________
- 5.000 SMMLV (activos): COP $_______________
- 3.000 SMMLV (ingresos): COP $_______________

### Resultado
- Activos >= 5.000 SMMLV? SI / NO
- Ingresos >= 3.000 SMMLV? SI / NO
- Tipo societario lo exige? SI / NO

### Conclusion
[ ] OBLIGATORIO — Designar RF antes del 31/03
[ ] NO OBLIGATORIO — Reevaluar anualmente
[ ] VOLUNTARIO — Se decide tener RF aunque no sea obligatorio

Evaluado por: _______________  Revisado por: _______________
```

---

## 7. Segregacion de Funciones

| Funcion | Contador | CFO/COO | Revisor Fiscal |
|---------|---------|---------|---------------|
| Registrar transacciones | Ejecuta | Supervisa | Verifica |
| Preparar EEFF | Ejecuta | Revisa | Dictamina |
| Firmar declaraciones | Firma | N/A | N/A |
| Aprobar pagos | N/A | Aprueba | N/A |
| Emitir certificados retencion | Ejecuta | N/A | N/A |
| Preparar exogena | Ejecuta | N/A | Puede verificar |
| Conciliaciones bancarias | Ejecuta | Revisa | Puede verificar |
| Evaluar contingencias fiscales | Informa | Decide provision | Verifica revelacion |

---

## 8. Politica de Soporte de Costos y Deducciones (FMF-19)

Para que un gasto sea deducible en renta, DEBE cumplir:

| Requisito | Descripcion | Evidencia |
|-----------|-------------|-----------|
| **Causalidad** | Relacion directa con actividad generadora de renta | Contrato/ODS |
| **Necesidad** | Es necesario para generar el ingreso | Aprobacion conforme `aprobar-gasto-sop.md` |
| **Proporcionalidad** | Monto razonable para el servicio | Comparacion con mercado |
| **Soporte documental** | Factura electronica o documento soporte | Archivo |
| **Pago de PILA** | Si es pago a independiente: PILA verificada | Checklist PILA |
| **Bancarizacion** | Pagos >100 UVT (~$4.7M) deben ser bancarizados | Soporte de transferencia |

**Regla:** Gastos sin soporte completo NO se deducen. Se reclasifican como "gastos no deducibles" y se informa al CFO.

---

## 9. Politica de Archivo y Conservacion Documental (FMF-22)

| Tipo de documento | Plazo | Base legal |
|-------------------|-------|-----------|
| Declaraciones tributarias + soportes | **5 anos** desde vencimiento (firmeza) | Art. 714 ET |
| Libros de contabilidad | **10 anos** | Art. 60 C.Co. |
| Facturas de venta y compra | **5 anos** (tributario) / **10 anos** (comercial) | ET Art. 632 / C.Co. |
| Contratos y ODS | **10 anos** desde terminacion | C.Co. |
| Planillas PILA | **5 anos** | Normativa seg. social |
| Nomina y prestaciones | **5 anos** (tributario) / **10 anos** (laboral) | ET / CST |
| Actas de asamblea | **Indefinido** | C.Co. |

**Formato:** Digital (preferido) con backup + fisico para documentos con firma requerida.
**Ubicacion:** Definir: Drive compartido, sistema contable, archivo fisico con acceso controlado.
**Destruccion:** Solo despues de cumplido el plazo, con acta de destruccion firmada por el Contador.

---

## Changelog

- v2.0.0 — Criterios seleccion, costos referencia Medellin 2026, plan de sucesion, handover minimo
- v1.0.0 — Creacion inicial
