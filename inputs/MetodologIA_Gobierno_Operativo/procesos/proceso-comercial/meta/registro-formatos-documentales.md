# Registro Unificado de Formatos Documentales

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Operaciones
**Propósito:** Declarar qué documento existe, en qué formato, quién lo provee, en qué fase, y qué comprobante genera.

---

## SECCIÓN A: Documentos que MetodologIA Produce (para el cliente)

| # | Documento | Fuente (.md) | Formato de entrega | Fase | Firmado por | Comprobante |
|---|-----------|-------------|-------------------|------|------------|------------|
| A1 | **NDA** | `nda-aliados-partners.md` / `nda-resellers.md` | .md → PDF | F0/F1 | Ambas partes | PDF con firmas digitales/físicas + fecha |
| A2 | **Autorización Habeas Data** | `autorizacion-habeas-data.md` | .md → PDF | F2 | Titular de datos | PDF firmado + timestamp |
| A3 | **MSA (Contrato Marco)** | `contrato-marco-servicios-msa.md` | .md → PDF | F2 | Ambas partes | PDF firmado. Notarizado si >COP 100M |
| A4 | **Contrato Marco Alianza GTM** | `contrato-marco-alianza-gtm.md` | .md → PDF | F2 (aliados) | Ambas partes | PDF firmado |
| A5 | **Contrato Marco Resellers** | `contrato-marco-resellers.md` | .md → PDF | F2 (resellers) | Ambas partes | PDF firmado |
| A6 | **ODS (Orden de Servicio)** | `orden-servicio-*.md` (6 tipos) | .md → PDF | F2 | Ambas partes | PDF firmado, vinculado a MSA # |
| A7 | **DPA (Acuerdo Tratamiento Datos)** | `acuerdo-tratamiento-datos-dpa.md` | .md → PDF | F2 | Ambas partes | PDF firmado |
| A8 | **Cesión de Derechos IP** | `cesion-derechos-ip.md` | .md → PDF | F2 (si aplica) | Ambas partes | PDF firmado |
| A9 | **Propuesta Comercial** | `plantilla-propuesta-comercial.md` | .md → PDF | F1→F2 | MetodologIA (aprobación interna) | PDF con gate de aprobación documentado |
| A10 | **ToS (Términos de Servicio)** | `terminos-de-servicio-tos.md` | .md → HTML (web) | Siempre publicado | Aceptación implícita | Timestamp de aceptación en plataforma |
| A11 | **Política de Privacidad** | `politica-de-privacidad.md` | .md → HTML (web) | Siempre publicado | N/A | URL publicada con fecha de versión |
| A12 | **Factura Electrónica** | Sistema DIAN | XML UBL 2.1 + PDF | F4 (por hito/período) | MetodologIA | CUFE (Código Único de Factura Electrónica) |
| A13 | **Certificado de Participación** | Template interno | .html → PDF con QR | F4 (cierre) | MetodologIA | PDF con QR de verificación |
| A14 | **Matrícula (B2C)** | Template interno | .md → PDF | F2 (B2C) | Estudiante | PDF firmado |
| A15 | **Pagaré (B2C crédito)** | Template interno | .md → PDF | F2 (B2C) | Estudiante + testigo | PDF firmado + testigo |
| A16 | **SLA Baseline** | `sla-baseline-template.md` | .md → PDF | F3 | SPOC cliente + PM | PDF firmado |

---

## SECCIÓN B: Documentos que el Cliente Provee (comprobantes)

| # | Documento | Formato esperado | Fase | Segmento | Propósito | Verificación |
|---|-----------|-----------------|------|----------|-----------|-------------|
| B1 | **Cámara de Comercio** | PDF oficial (<6 meses antigüedad) | F2 | B2B, GTM | Existencia legal, representante | Verificar vigencia, NIT, rep. legal |
| B2 | **RUT** | PDF de DIAN | F2 | B2B, GTM | Identificación tributaria | Verificar NIT, régimen IVA |
| B3 | **Cédula representante legal** | PDF scan | F2 | B2B | Identidad del firmante | Cruzar con Cámara de Comercio |
| B4 | **Cédula persona natural** | PDF scan | F2 | B2C (>COP 5M) | Identidad para pagaré | Verificar número y nombre |
| B5 | **Carta de aceptación de propuesta** | Email o PDF | F1→F2 | B2B | Confirmación verbal→escrita | Verificar que viene del SPOC autorizado |
| B6 | **Acta de entrega firmada** | PDF | F4 | Todos (por hito) | Aceptación de entregable | Firma del SPOC cliente + fecha |
| B7 | **Solicitud de cambio (change request)** | PDF firmado | F4 | Todos | Cambio de alcance formal | Firmas ambas partes |
| B8 | **Organigrama del equipo** | PDF/Imagen | F3 | B2B | Mapeo de stakeholders | Referencia, no verificación |
| B9 | **Accesos a sistemas** | Credenciales/Invitaciones | F3 | B2B (si aplica) | Acceso técnico | Verificar que funcionan |
| B10 | **Encuesta NPS** | Digital (link) | F4 | Todos | Feedback de satisfacción | Respuesta recibida |

---

## SECCIÓN C: Documentos Internos de Governance

| # | Documento | Formato | Fase/Frecuencia | Owner | Propósito |
|---|-----------|---------|----------------|-------|-----------|
| C1 | **Lead Score Card** | .md (en CRM) | F0→F1 | Sales Rep | Evidencia de calificación |
| C2 | **Deal Review Minutes** | .md | Semanal | Director Comercial | Evidencia de governance del pipeline |
| C3 | **Solicitud de Descuento** | Email + formulario | F2 (si aplica) | Sales Rep → Aprobador | Evidencia de autorización de precio |
| C4 | **Aprobación de Propuesta** | Email con "APROBADO" | F2 | Aprobador(es) | Evidencia de gate de aprobación |
| C5 | **Registro CLM** | Spreadsheet/Sistema | F2 (al firmar) | Operaciones | Trazabilidad de contratos |
| C6 | **Revenue Recognition Entry** | Sistema contable | F4 (mensual) | Finanzas | Cumplimiento NIIF 15 |
| C7 | **Reporte de Varianza** | .md o spreadsheet | Mensual | COO | Control presupuestal |
| C8 | **Registro de Disputas** | .md | Cuando ocurra | Finanzas | Trazabilidad de disputas |
| C9 | **Minuta de Kickoff** | .md → PDF | F3 | Project Manager | Evidencia de alineación |
| C10 | **Registro de Riesgos** | .md | F3 + ongoing | Project Manager | Gestión de riesgos |
| C11 | **Declaración de Conflicto de Intereses** | .md → PDF firmado | Anual + cuando ocurra | Vinculado | Compliance |
| C12 | **Due Diligence de Proveedor** | .md → PDF | Al contratar proveedor | Operaciones | Gestión de terceros |
| C13 | **Registro de Incidentes de Datos** | .md | Cuando ocurra | OPD | Compliance Ley 1581/2012 |

---

## SECCIÓN D: Matriz de Fase vs. Documentos

| Fase | Documentos MetodologIA | Documentos del Cliente | Documentos Internos |
|------|----------------------|----------------------|-------------------|
| **F0** | NDA (A1) | — | Lead Score Card (C1) |
| **F1** | Propuesta (A9) | Carta aceptación (B5) | Score Card actualizado (C1), Deal Review (C2) |
| **F2** | MSA (A3), ODS (A6), DPA (A7), Habeas Data (A2), Cesión IP (A8) | Cámara Comercio (B1), RUT (B2), Cédula (B3) | Descuento (C3), Aprobación (C4), CLM (C5), Checklist Pre-Firma |
| **F3** | SLA Baseline (A16) | Organigrama (B8), Accesos (B9) | Minuta Kickoff (C9), Riesgos (C10) |
| **F4** | Factura (A12), Certificado (A13) | Acta Entrega (B6), Change Request (B7), NPS (B10) | Revenue (C6), Varianza (C7), Disputas (C8) |

---

## Changelog

- v1.0.0 — Creación inicial / Javier Montaño + Claude
