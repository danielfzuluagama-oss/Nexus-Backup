# SOP: Gestión de Incidentes de TI

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** CTO / Admin TI
**Cierra:** FMT-05 (Backcasting CTO)

---

## 1. Propósito

Definir cómo se reportan, diagnostican, escalan, resuelven y documentan los incidentes de tecnología que afectan la operación.

---

## 2. Clasificación

| Severidad | Definición | Ejemplo | SLA respuesta | SLA resolución |
|-----------|-----------|---------|--------------|----------------|
| **P1 — Crítico** | Servicio crítico caído, afecta a clientes en vivo | LMS caído durante bootcamp, sitio web down, email no funciona | 30 min | 4h |
| **P2 — Alto** | Servicio degradado o componente importante caído | CRM lento, facturación no genera CUFE, Drive inaccesible | 2h | 8h |
| **P3 — Medio** | Problema individual sin afectar a otros | Laptop de un usuario con problema, acceso individual denegado | 4h | 24h |
| **P4 — Bajo** | Solicitud o mejora, no urgente | Nueva licencia, cambio de configuración | 24h | 5 días |

---

## 3. Arbol de Escalación para P1 (Phone Tree)

Para incidentes P1, seguir este orden de contacto. Si la persona no responde en 10 minutos, pasar al siguiente:

```
PASO 1: Admin TI — [NOMBRE] — [CELULAR] — [WHATSAPP]
   ↓ (si no responde en 10 min)
PASO 2: CTO — [NOMBRE] — [CELULAR] — [WHATSAPP]
   ↓ (si no responde en 10 min)
PASO 3: COO — [NOMBRE] — [CELULAR] — [WHATSAPP]
   ↓ (si es proveedor externo)
PASO 4: Soporte del proveedor — [VER TABLA DE CONTACTOS EN plan-continuidad-negocio-ti.md]
```

**Regla:** Para P1, se llama por teléfono. No se envía solo un mensaje de texto. Si nadie responde en 30 minutos, el COO tiene autoridad para tomar decisiones de emergencia (gastar hasta $5M COP sin aprobación previa).

---

## 4. Procedimiento

### Paso 1: Reporte
- Cualquier persona reporta al canal designado: [canal Slack #incidentes / email incidentes@metodologia.info]
- Incluir: qué no funciona, desde cuándo, a quiénes afecta, capturas de pantalla

### Paso 2: Clasificación y asignación
- Admin TI clasifica (P1-P4) y asigna responsable
- Si es P1: activar phone tree + comunicación inmediata a afectados

### Paso 3: Diagnóstico y resolución
- Investigar causa raíz
- Aplicar fix (reinicio, parche, contacto con proveedor, restauración de backup)
- Si requiere proveedor externo: escalar con número de ticket

### Paso 4: Comunicación
| Severidad | Comunicar a |
|-----------|------------|
| P1 | Equipo completo + clientes afectados + CTO + COO |
| P2 | Equipo afectado + CTO |
| P3-P4 | Solo al reportante |

### Paso 5: Cierre y post-mortem
- Registrar: causa, solución, tiempo de resolución
- Para P1 y P2: post-mortem blameless dentro de 48h

---

## 5. Templates de Comunicación

### Template P1 — Mensaje interno (Slack/Teams)
```
@canal INCIDENTE P1 — [PLATAFORMA] CAIDA

Estado: EN INVESTIGACION
Desde: [HORA]
Impacto: [DESCRIPCION — ej. "Bootcamp BC-01 con 25 participantes no puede acceder al LMS"]
Responsable: [NOMBRE]
Proveedor contactado: SI/NO — Ticket #[___]
Próxima actualización: en [30/60] minutos

Acciones inmediatas:
- [ej. "Sesión movida a Zoom como plan B"]
- [ej. "Participantes notificados por email"]
```

### Template P1/P2 — Email a clientes afectados
```
Asunto: [MetodologIA] Incidencia temporal en [SERVICIO] — Actualización

Estimado/a [NOMBRE],

Le informamos que estamos experimentando una intermitencia en [SERVICIO] desde las [HORA].

Impacto en su servicio: [DESCRIPCION ESPECIFICA — ej. "La sesión programada para hoy a las 3pm se realizará por Zoom en lugar de la plataforma habitual"]

Acciones que estamos tomando: [DESCRIPCION]

Próxima actualización: [HORA o "dentro de 2 horas"]

Si tiene preguntas, contacte a [NOMBRE] al [CELULAR/EMAIL].

Disculpe las molestias,
[NOMBRE] — MetodologIA
```

### Template P2 — Status page / comunicación pública (si aplica)
```
[FECHA HORA] — Estamos investigando reportes de [DESCRIPCION].
[FECHA HORA] — Identificamos la causa. Estamos trabajando en la solución.
[FECHA HORA] — El servicio ha sido restaurado. Monitoreando estabilidad.
[FECHA HORA] — Incidente resuelto. Publicaremos post-mortem en 48h.
```

---

## 6. Template de Post-Mortem Blameless

```
## POST-MORTEM — INC-TI-[AAAA]-[###]

**Fecha del incidente:** [___]
**Severidad:** P1 / P2
**Duración total:** [___]h [___]min
**Servicios afectados:** [___]
**Clientes impactados:** [# y nombres si aplica]
**Redactado por:** [___]  **Fecha del post-mortem:** [___]

### Timeline (hora por hora)
| Hora | Evento |
|------|--------|
| [HH:MM] | [Primer reporte del incidente] |
| [HH:MM] | [Clasificación y asignación] |
| [HH:MM] | [Primera acción de diagnóstico] |
| [HH:MM] | [Escalación a proveedor / CTO] |
| [HH:MM] | [Causa identificada] |
| [HH:MM] | [Fix aplicado] |
| [HH:MM] | [Servicio restaurado] |
| [HH:MM] | [Monitoreo confirmó estabilidad] |

### Causa raíz
[Descripción técnica sin culpar a personas. Ej: "El certificado SSL del LMS expiró porque no había alerta de renovación configurada."]

### Impacto
- Usuarios afectados: [#]
- Duración: [___]
- Revenue impactado: [estimado si aplica]
- Reputación: [bajo/medio/alto]

### Qué funcionó bien
- [___]
- [___]

### Qué falló
- [___]
- [___]

### Acciones preventivas
| # | Acción | Owner | Deadline | Estado |
|---|--------|-------|----------|--------|
| 1 | [ej. "Configurar alerta de expiración de certificado"] | Admin TI | [___] | Pendiente |
| 2 | [ej. "Documentar plan B para LMS en BCP"] | CTO | [___] | Pendiente |
| 3 | [___] | [___] | [___] | [___] |
```

---

## 7. Registro de Incidentes

```
## INCIDENTE TI — INC-TI-[AAAA]-[###]

**Reportado por:** [___]  **Fecha/hora:** [___]
**Severidad:** P1 | P2 | P3 | P4
**Plataforma afectada:** [___]
**Descripción:** [___]
**Impacto:** [# usuarios afectados, servicio interrumpido]
**Asignado a:** [___]
**Causa raíz:** [___]
**Solución aplicada:** [___]
**Fecha/hora resolución:** [___]
**Tiempo total:** [___]h
**Acción preventiva:** [___]
**Post-mortem realizado:** SI (link) / NO / N/A (P3-P4)
**Estado:** Abierto | En progreso | Resuelto | Cerrado
```
