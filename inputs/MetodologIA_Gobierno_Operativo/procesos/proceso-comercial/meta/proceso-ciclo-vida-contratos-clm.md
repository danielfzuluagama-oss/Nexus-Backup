# Proceso de Gestión del Ciclo de Vida de Contratos (CLM)

**Versión:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Director Legal
**Cierra:** FM-10 (Backcasting COO)

---

## 1. Propósito

Garantizar que **ningún contrato venza sin detección**, que las renovaciones se gestionen proactivamente, y que las enmiendas se tracen. Este proceso previene el FM-10: emitir ODS sobre contratos expirados.

---

## 2. Fases del Ciclo de Vida

```
SOLICITUD → REDACCIÓN → REVISIÓN → NEGOCIACIÓN → FIRMA → EJECUCIÓN → MONITOREO → RENOVACIÓN/TERMINACIÓN → ARCHIVO
```

---

## 3. Procedimiento por Fase

### Fase 1: SOLICITUD (Día 0)

| Paso | Acción | Responsable | Evidencia | Automatizable |
|------|--------|------------|-----------|---------------|
| 1.1 | Identificar necesidad contractual | Sales Rep / Director Comercial | Email/ticket de solicitud | No |
| 1.2 | Verificar si existe Contrato Marco vigente | Operaciones | Consulta al registro CLM | Sí (búsqueda en CRM) |
| 1.3 | Si no existe CM, iniciar proceso de MSA | Operaciones + Legal | Solicitud formal de MSA | No |
| 1.4 | Asignar ID único: `CLM-[AAAA]-[###]` | Operaciones | ID asignado en registro | Sí (auto-incremento) |

### Fase 2: REDACCIÓN (Días 1-5)

| Paso | Acción | Responsable | Evidencia | Automatizable |
|------|--------|------------|-----------|---------------|
| 2.1 | Seleccionar template (MSA, ODS, NDA, etc.) | Legal / Operaciones | Template seleccionado | Sí (selector por tipo) |
| 2.2 | Completar campos variables | Sales Rep + Operaciones | Borrador v1 | Parcial (auto-fill desde CRM) |
| 2.3 | Verificar cláusulas estándar (ref: `clausulas-estandar-contratos.md`) | Legal | Checklist de cláusulas | Sí (checklist digital) |

### Fase 3: REVISIÓN INTERNA (Días 5-10)

| Paso | Acción | Responsable | Evidencia | Automatizable |
|------|--------|------------|-----------|---------------|
| 3.1 | Revisión legal (cumplimiento, riesgos) | Legal | Memo de revisión | No |
| 3.2 | Revisión financiera (pagos, márgenes, descuentos) | Finanzas | Aprobación financiera | No |
| 3.3 | Revisión comercial (alcance, SLA, compromisos) | Director Comercial | Aprobación comercial | No |
| 3.4 | Ejecutar `checklist-pre-firma.md` | Deal Manager | Checklist completado al 100% | Parcial (workflow) |

### Fase 4: NEGOCIACIÓN (Días 10-25)

| Paso | Acción | Responsable | Evidencia | Automatizable |
|------|--------|------------|-----------|---------------|
| 4.1 | Enviar borrador a contraparte | Sales Rep | Email con borrador y versión | Sí (envío desde CLM) |
| 4.2 | Recibir y evaluar red-lines | Legal | Matriz de cambios | No |
| 4.3 | Clasificar cambios: Aceptable / Negociable / Red Line | Legal + Dir. Comercial | Matriz clasificada | No |
| 4.4 | Negociar según playbook (`negociar-contrato-sop.md`) | Sales Rep + Legal | Registro de negociación | No |
| 4.5 | Si cambio afecta margen/riesgo, escalar | Dir. Comercial / CEO | Aprobación de escalamiento | No |

### Fase 5: FIRMA (Días 25-30)

| Paso | Acción | Responsable | Evidencia | Automatizable |
|------|--------|------------|-----------|---------------|
| 5.1 | Generar versión final en PDF | Operaciones | PDF final | Sí (generación desde template) |
| 5.2 | Obtener firma de representante legal MetodologIA | CEO / Rep. Legal | Firma en contrato | Parcial (firma electrónica) |
| 5.3 | Obtener firma de contraparte | Sales Rep | Firma en contrato | Parcial (firma electrónica) |
| 5.4 | Verificar firmas completas | Operaciones | Contrato con firmas verificadas | Sí (validación de firma) |
| 5.5 | Registrar contrato en CLM | Operaciones | Entrada completa en registro | Sí (formulario) |

### Fase 6: EJECUCIÓN Y MONITOREO (Vigencia del contrato)

| Paso | Acción | Responsable | Frecuencia | Automatizable |
|------|--------|------------|-----------|---------------|
| 6.1 | Monitorear cumplimiento de obligaciones | Operaciones | Mensual | No |
| 6.2 | Verificar hitos de pago y facturación | Finanzas | Por hito/mensual | Parcial |
| 6.3 | Gestionar enmiendas | Legal + Sales Rep | Cuando ocurra | No |
| 6.4 | **Alerta 90 días antes de vencimiento** | Operaciones | Automática | **Sí (calendario/CRM)** |
| 6.5 | **Alerta 60 días antes** | Operaciones | Automática | **Sí** |
| 6.6 | **Alerta 30 días antes** — decisión obligatoria | Operaciones | Automática | **Sí (alerta) / No (decisión)** |

### Fase 7: RENOVACIÓN O TERMINACIÓN

| Escenario | Acción | Responsable | Plazo |
|-----------|--------|------------|-------|
| **Renovación automática** | Verificar que no se requiera notificación de no-renovación | Operaciones | 30d antes |
| **Renegociación** | Iniciar nueva ronda con términos actualizados | Sales Rep + Legal | 60d antes |
| **Terminación con causa** | Notificar incumplimiento, plazo de cura (30d), terminar si no subsana | Legal | Conforme cláusula |
| **Terminación sin causa** | Notificación escrita con anticipación pactada | Dir. Comercial | 60d (o lo pactado) |

### Fase 8: ARCHIVO

| Criterio | Regla |
|----------|-------|
| **Cuándo se archiva** | 30 días calendario post-terminación/vencimiento, siempre que no haya disputas abiertas ni pagos pendientes |
| **Qué se archiva** | PDF firmado, todas las enmiendas, registro de correspondencia relevante, checklist de cierre |
| **Dónde** | Carpeta "Archivados" en el sistema CLM, con acceso restringido a Legal + COO |
| **Retención** | 10 años post-archivo (Código de Comercio) |
| **Destrucción** | Tras 10 años, eliminar con registro de destrucción firmado por Legal |

#### Conflicto ODS vs. MSA

Si una ODS contiene términos que contradicen el MSA padre: **prevalece el MSA**, excepto cuando la ODS incluye una cláusula explícita de override que diga: *"Para efectos de esta ODS, la Cláusula [X] del MSA se reemplaza por..."* — firmada por ambas partes. Sin esa cláusula explícita, el MSA gobierna.

---

## 4. Registro CLM (Campos Obligatorios)

| Campo | Ejemplo |
|-------|---------|
| ID CLM | `CLM-2026-001` |
| Tipo | MSA / ODS / NDA / Alianza GTM / Reseller |
| Contraparte (razón social) | Empresa XYZ S.A.S. |
| NIT contraparte | 900.xxx.xxx-x |
| Fecha de firma | 2026-03-25 |
| Fecha de inicio de vigencia | 2026-04-01 |
| Fecha de vencimiento | 2027-03-31 |
| Renovación automática | SÍ / NO |
| Preaviso de no-renovación | 30 días |
| Valor total | COP $XXX.XXX.XXX + IVA |
| Estado | Activo / En negociación / Vencido / Terminado / Archivado |
| Archivo digital | Ruta al PDF firmado |
| Enmiendas | Lista de IDs de enmiendas |
| SPOC MetodologIA | Nombre y email |
| SPOC Cliente | Nombre y email |
| Alerta 90d / 60d / 30d | Enviada / Pendiente |
| Decisión de renovación | Renovar / Renegociar / Terminar / Pendiente |

---

## 5. KPIs del Proceso CLM

| KPI | Meta | Frecuencia |
|-----|------|-----------|
| % contratos con alerta 90d enviada a tiempo | 100% | Mensual |
| Tiempo promedio de ciclo (solicitud -> firma) | < 30 días | Mensual |
| % contratos vencidos sin decisión | 0% | Mensual |
| % enmiendas formalizadas vs. verbales | > 95% | Trimestral |
| Contratos activos sin SPOC asignado | 0 | Mensual |

### Mock del reporte mensual CLM

```
══════════════════════════════════════════════════
        REPORTE CLM — MARZO 2026
══════════════════════════════════════════════════
Contratos activos:              12
Contratos por vencer (90d):      3  ← requieren decisión
Contratos vencidos sin decisión: 0  ✓
Ciclo promedio (solicitud→firma): 22 días  ✓ (meta: <30)
Enmiendas formalizadas:         100% ✓
Alertas enviadas a tiempo:      100% ✓

ACCIONES PENDIENTES:
 • CLM-2026-008 (Empresa ABC) — vence 2026-06-15
   → Dir. Comercial debe decidir: renovar/renegociar
 • CLM-2026-003 (Empresa DEF) — enmienda en negociación
   → Legal: red-lines pendientes de respuesta
 • CLM-2026-011 (NDA Partner GHI) — firmado, pendiente registro
   → Operaciones: registrar en sistema antes del viernes
══════════════════════════════════════════════════
```

---

## 6. Oportunidades de Automatización

| Paso | Dificultad | Herramienta sugerida | Regla |
|------|-----------|---------------------|-------|
| Alertas de vencimiento (90/60/30d) | Fácil | Google Calendar + Sheets / CRM | Automatizar siempre |
| Asignación de ID CLM | Fácil | Formulario + auto-incremento | Automatizar siempre |
| Selección de template | Media | Formulario con lógica condicional | Automatizar |
| Auto-fill de campos desde CRM | Media | Integración CRM-Docs | Automatizar |
| Envío de borrador a contraparte | Fácil | Email template desde CRM | Automatizar |
| **Decisión de renovar/renegociar/terminar** | — | **SIEMPRE HUMANO** | Nunca automatizar |
| **Clasificación de red-lines** | — | **SIEMPRE HUMANO** | Nunca automatizar |
| **Aprobación de escalamiento** | — | **SIEMPRE HUMANO** | Nunca automatizar |

---

## 7. Supuestos

SUPUESTO: Existe una herramienta (hoja de cálculo, CRM, o sistema CLM) para gestionar el registro y las alertas.
- Validar con: COO + TI
- Fecha límite: 30 días post-aprobación
- Si se invalida: Implementar registro manual con alertas de Google Calendar

---

## Changelog

- v2.0.0 — Fase de archivo con criterios, conflicto ODS vs MSA, mock de reporte mensual, columna de automatización por paso, oportunidades de automatización separadas, regla de siempre-humano / Javier Montaño + Claude
- v1.0.0 — Creación inicial / Cierra FM-10 / Javier Montaño + Claude
