# SOP: Gestión de Accesos — Onboarding, Offboarding y Revisión

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** CTO / Administrador TI
**Cierra:** FMT-02, FMT-12 (Backcasting CTO)

---

## 1. Propósito

Gobernar quién tiene acceso a qué plataforma, garantizar que los accesos se otorgan por rol, se revisan periódicamente, y se revocan dentro de 24h al desvincular a alguien.

---

## 2. Matriz de Accesos por Rol

| Plataforma | Empleado | Sales Rep | Facilitador/Consultor | Embajador | Director | Admin TI |
|-----------|---------|----------|---------------------|-----------|---------|---------|
| Email corporativo | Si | Si | Condicional (>3 meses) | No | Si | Si |
| Drive corporativo | Si (su carpeta) | Si (comercial) | Si (proyecto) | No | Si (todo) | Si (todo) |
| CRM | No | Si | No | No | Si | Si |
| Sistema contable | No | No | No | No | Condicional (CFO/Contador) | Si |
| LMS / Plataforma educativa | Condicional | No | Si (facilitador) | No | Si | Si |
| Herramientas de IA | Si | Si | Si | No | Si | Si |
| Panel de dominio/DNS | No | No | No | No | No | Si (max 2 personas) |
| Facturación electrónica (DIAN) | No | No | No | No | Condicional (Contador) | Si |
| Redes sociales | No | No | No | No | Condicional (Marketing) | Si |

---

## 3. Privileged Access Management (PAM)

### Cuentas con Privilegios Elevados

| Sistema | Quién tiene admin | Mecanismo de control | Revisión |
|---------|------------------|---------------------|----------|
| Google Workspace (Super Admin) | CTO + 1 backup designado | MFA hardware token, password 16+ chars, sesión con timeout 4h | Trimestral: verificar que solo 2 personas tienen Super Admin |
| Panel DNS / Dominio | CTO + COO | MFA + password única, auto-renovación activa | Trimestral: verificar vigencia dominio + quién tiene acceso |
| Facturación electrónica DIAN | Contador + CTO (backup) | MFA + certificado digital si aplica | Mensual: revisar acceso |
| Pasarelas de pago | CFO/Contador + CTO | MFA, rotación de API keys cada 90 días | Trimestral |
| Repositorios de código (si aplica) | CTO + Lead Dev | Branch protection + code review obligatorio | Mensual |

**Regla PAM:** Ningún sistema crítico puede depender de una sola persona. Mínimo 2 personas con acceso admin, máximo 3.

### Governance de Cuentas de Servicio

| Tipo | Ejemplos | Owner requerido | Rotación | Inventario |
|------|----------|----------------|----------|------------|
| API Keys de producción | OpenAI, DIAN, pasarela de pagos | Persona nombrada (no "el equipo") | 90 días | `inventario-accesos-plataformas.md` |
| Bot accounts | Automatizaciones Zapier/Make, bots de Slack | Admin TI | 180 días | Documentar qué hace cada bot y qué accede |
| Shared inboxes | info@, soporte@, ventas@ | Persona responsable nombrada | Al cambiar personal con acceso | Lista de quién ve cada inbox |
| Service tokens (LMS, CRM API) | Integraciones entre plataformas | Admin TI | 90 días | Documentar qué conecta con qué |

---

## 4. Onboarding Tecnológico (al vincular)

| Paso | Acción | Responsable | Plazo |
|------|--------|------------|-------|
| 1 | RRHH notifica nueva vinculación: nombre, rol, fecha inicio, proyecto | RRHH | D-3 |
| 2 | Admin TI crea accesos según matriz de rol | Admin TI | D-1 |
| 3 | Configurar MFA en todas las plataformas asignadas | Admin TI + nuevo vinculado | Dia 1 |
| 4 | Enviar credenciales por gestor de contraseñas (NUNCA por chat/email) | Admin TI | Dia 1 |
| 5 | Inducción de seguridad: política, clasificación, uso de IA, reporte de incidentes (15 min) | Admin TI o CTO | Semana 1 |
| 6 | Registrar en `inventario-accesos-plataformas.md` | Admin TI | Dia 1 |

---

## 5. Offboarding Tecnológico (al desvincular) — MAXIMO 24 HORAS

| Paso | Acción | Responsable | Plazo |
|------|--------|------------|-------|
| 1 | RRHH notifica desvinculación: nombre, fecha, motivo | RRHH | Dia de notificación |
| 2 | Revocar email corporativo | Admin TI | 2h |
| 3 | Revocar Drive (mover archivos a carpeta handover) | Admin TI | 4h |
| 4 | Revocar CRM, LMS, y todas las plataformas | Admin TI | 8h |
| 5 | Cambiar passwords de cuentas compartidas conocidas por el desvinculado | Admin TI | 24h |
| 6 | Recuperar equipo corporativo si aplica | RRHH + Admin TI | Segun acuerdo |
| 7 | Actualizar `inventario-accesos-plataformas.md` | Admin TI | 24h |
| 8 | Verificar que NO quedan accesos residuales | Admin TI | D+3 |

**REGLA:** Si la desvinculación es disciplinaria o conflictiva, los pasos 2-4 se ejecutan **INMEDIATAMENTE** (antes de notificar al desvinculado si es posible).

---

## 6. Formulario de Solicitud de Acceso

```
## SOLICITUD DE ACCESO — ACC-[AAAA]-[###]

**Fecha:** [___]
**Solicitante:** [___]  **Rol:** [___]

### Acceso solicitado
| Plataforma | Nivel de acceso (lectura/escritura/admin) | Justificación |
|-----------|------------------------------------------|---------------|
| [___] | [___] | [___] |

### Duración
☐ Permanente (mientras dure la vinculación)
☐ Temporal: desde [___] hasta [___]
☐ Por proyecto: [nombre del proyecto]

### Aprobaciones
| Aprobador | Firma/email | Fecha |
|-----------|------------|-------|
| Director del área | [___] | [___] |
| Admin TI (verifica que es conforme a matriz) | [___] | [___] |
| CTO (solo si es acceso privilegiado/admin) | [___] | [___] |
```

---

## 7. Revisión Periódica de Accesos

| Frecuencia | Acción | Responsable |
|-----------|--------|------------|
| **Mensual** | Verificar que todos los accesos activos corresponden a personas activas | Admin TI |
| **Trimestral** | Auditar que roles coinciden con accesos (nadie tiene más de lo necesario) | CTO |
| **Trimestral** | Revisar cuentas de servicio: ¿siguen en uso? ¿owner sigue activo? | Admin TI |
| **Anual** | Forzar cambio de passwords en todas las plataformas | Admin TI |

---

## 8. Inventario de Accesos

```
## INVENTARIO DE ACCESOS — [Actualizado: DD/MM/AAAA]

| # | Persona | Rol | Plataformas con acceso | Nivel (lectura/escritura/admin) | MFA activo | Fecha alta | Fecha baja |
|---|---------|-----|----------------------|-------------------------------|-----------|-----------|-----------|
| 1 | [___] | [___] | Email, Drive, CRM | Escritura, Lectura, Admin | SI/NO | [___] | [___] |
```
