# Formulario F2 — Contratacion

**Version:** 2.0.0
**Fase:** F2 — Contratacion
**Campos:** 12+
**Tiempo de completado:** 15-30 minutos (requiere documentacion formal)

---

## Campos

### Datos de la Empresa

| # | Campo | Tipo | Obligatorio | Validacion | Por que este campo |
|---|---|---|---|---|---|
| 1 | **Razon social** | Texto | SI | Conforme a Camara de Comercio | Debe coincidir exactamente con el documento legal. Un error aqui invalida el contrato. |
| 2 | **NIT** | Numerico | SI | Formato NIT colombiano (con DV) | Identificador tributario unico. El DV (digito de verificacion) se valida algoritmicamente. |
| 3 | **Direccion registrada** | Texto | SI | Conforme a Camara de Comercio | Direccion legal para notificaciones contractuales. |
| 4 | **Ciudad / Departamento** | Texto | SI | | Jurisdiccion para clausula de resolucion de conflictos. |
| 5 | **Representante legal** | Texto | SI | Conforme a Camara de Comercio | Unica persona con facultad legal para firmar el contrato. Si firma otro, el contrato es anulable. |
| 6 | **Cedula del representante** | Numerico | SI | | Verificacion cruzada con Camara de Comercio. |

### Datos de Facturacion

| # | Campo | Tipo | Obligatorio | Validacion | Por que este campo |
|---|---|---|---|---|---|
| 7 | **Email de contabilidad** | Email | SI | Para envio de facturas electronicas | Diferente al email del SPOC. Las facturas van a contabilidad, no al lider del proyecto. |
| 8 | **Direccion de facturacion** | Texto | SI | Si difiere de direccion registrada | Algunas empresas tienen sede administrativa separada. |
| 9 | **Responsable de pagos** | Texto | SI | Nombre + cargo | Persona a escalar si la factura no se paga a tiempo. |
| 10 | **Telefono de facturacion** | Telefono | SI | | Canal directo para resolver problemas de facturacion sin involucrar al equipo de proyecto. |

### Datos Operativos

| # | Campo | Tipo | Obligatorio | Validacion | Por que este campo |
|---|---|---|---|---|---|
| 11 | **SPOC del proyecto** | Texto | SI | Nombre + email + telefono | Single Point of Contact. Todo pasa por esta persona. Si no se define, las comunicaciones se dispersan y el proyecto pierde traccion. |
| 12 | **Sponsor ejecutivo** | Texto | SI | Nombre + cargo + email | El sponsor desbloquea recursos y toma decisiones de alcance. Sin sponsor identificado, los change requests se estancan. |

---

## Documentos Requeridos del Cliente

### Ruta Colombia (default)

| # | Documento | Formato | Obligatorio | Verificacion |
|---|---|---|---|---|
| 1 | **NDA firmado** | PDF con firmas de ambas partes | SI | Verificar firmas, fecha, tipo (mutuo recomendado) |
| 2 | **Autorizacion Habeas Data** | PDF firmado por titular | SI (si datos personales) | Verificar que cubre las finalidades del servicio |
| 3 | **Camara de Comercio** | PDF oficial (<6 meses) | SI (B2B/GTM) | Verificar vigencia, razon social, NIT, representante |
| 4 | **RUT** | PDF de DIAN | SI (B2B/GTM) | Verificar NIT, regimen (responsable de IVA o no) |
| 5 | **Cedula representante legal** | PDF scan | SI (B2B) | Verificar coincide con Camara de Comercio |

### Ruta Internacional (sin NIT / sin Camara de Comercio)

Para clientes fuera de Colombia que no pueden proveer NIT ni Camara de Comercio:

| # | Documento alternativo | Equivale a | Notas |
|---|---|---|---|
| 1 | **Certificate of Incorporation** o equivalente local | Camara de Comercio | Debe mostrar razon social, representante legal, y vigencia. |
| 2 | **Tax ID / VAT Number / EIN** del pais de origen | NIT | Incluir pais de emision para validacion. |
| 3 | **Pasaporte o ID nacional** del representante | Cedula | Copia del documento vigente del firmante. |
| 4 | **Proof of Address** (utility bill o bank statement <3 meses) | Direccion registrada | Solo si no aparece en el Certificate of Incorporation. |
| 5 | **NDA firmado** | Igual | Usar version bilingue (ES/EN) del NDA. |

**Facturacion internacional:** Sin factura electronica DIAN. Se emite invoice en USD/EUR segun moneda del contrato. El cliente provee datos bancarios para transferencia SWIFT.

### Ruta Sector Publico Colombia

| # | Documento alternativo | Equivale a | Notas |
|---|---|---|---|
| 1 | **Certificado de existencia y representacion legal** de la entidad | Camara de Comercio | Expedido por la entidad competente (Secretaria, Ministerio, etc.) |
| 2 | **CDP** (Certificado de Disponibilidad Presupuestal) | Anticipo / confirmacion de pago | Garantiza que hay presupuesto asignado. |
| 3 | **Acto administrativo de designacion** del ordenador del gasto | Cedula representante | Persona facultada para comprometer presupuesto publico. |
| 4 | **Clausula de confidencialidad** en el contrato | NDA separado | Las entidades publicas rara vez firman NDAs independientes. |

---

## Gate

**Condiciones para avanzar a F3 (Kickoff):**
- [ ] Todos los campos completados
- [ ] Todos los documentos recibidos y verificados (segun ruta aplicable)
- [ ] `checklist-pre-firma.md` completado al 100%
- [ ] Contrato (MSA + ODS) firmado por ambas partes
- [ ] Contrato registrado en CLM
- [ ] Primer pago (anticipo) recibido, confirmado, o CDP emitido (sector publico)

---

v2.0.0 — Rutas internacional y sector publico, anotaciones "por que este campo" / Javier Montano + Claude
