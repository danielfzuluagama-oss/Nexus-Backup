# Política de Seguridad de la Información

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** CTO / CISO
**Cierra:** FMT-01, FMT-09 | **Referencia:** ISO 27001 (como guía, no certificado)

---

## 1. Principios

1. **Confidencialidad:** La información se comparte solo con quien la necesita para su función.
2. **Integridad:** La información no se modifica sin autorización y se mantiene precisa.
3. **Disponibilidad:** Los sistemas y datos están accesibles cuando se necesitan.

---

## 2. Clasificación de la Información

| Nivel | Definición | Ejemplos | Controles mínimos |
|-------|-----------|----------|-------------------|
| **RESTRINGIDO** | Daño grave si se filtra | Contratos firmados, datos financieros, credenciales, datos personales de clientes, API keys | Cifrado, acceso solo por rol, MFA obligatorio, no compartir por chat |
| **CONFIDENCIAL** | Daño moderado si se filtra | Propuestas comerciales, pricing, estrategia, materiales no publicados | Acceso limitado al equipo del proyecto, no compartir sin NDA |
| **INTERNO** | Solo para uso interno | Procesos, SOPs, rituales, templates operativos | Acceso al equipo MetodologIA, no publicar externamente |
| **PÚBLICO** | Diseñado para ser público | Sitio web, redes sociales, catálogo público, blog | Sin restricción |

---

## 3. Control de Accesos

### Principios
- **Mínimo privilegio:** Cada persona solo accede a lo que necesita para su función.
- **Segregación de funciones:** Quien aprueba pagos no es quien los ejecuta.
- **MFA obligatorio** en: email corporativo, CRM, sistema contable, panel DNS, plataformas con datos de clientes.

### Política de Passwords y Rotación

| Tipo de cuenta | Longitud mínima | Rotación | Notas |
|---------------|----------------|----------|-------|
| Cuentas administrativas (DNS, hosting, facturación DIAN) | 16 caracteres | Cada 90 días | MFA hardware token preferido |
| Cuentas regulares de empleado | 12 caracteres | Cada 180 días | Gestor de contraseñas obligatorio |
| Hardware tokens / FIDO2 | N/A | No rotar | Registrar backup token al configurar |
| Cuentas de servicio / API keys | 32+ caracteres (auto-generada) | Cada 90 días | Documentar en inventario con owner |
| Cuentas compartidas (redes sociales) | 16 caracteres | Al desvincular cualquier persona con acceso | Minimizar cuentas compartidas |

### Credenciales y Secretos (FMT-09)

| Regla | Detalle |
|-------|---------|
| **API Keys** | NUNCA en código fuente, NUNCA por chat/email. Usar variables de entorno o gestor de secretos. |
| **Compartir credenciales** | PROHIBIDO por WhatsApp, Slack, email. Usar gestor de contraseñas compartido (1Password/Bitwarden). |
| **Cuentas de servicio** | Documentadas en `inventario-accesos-plataformas.md` con owner asignado |

### Onboarding/Offboarding
- **Al vincular:** Crear accesos según rol conforme a `sop-gestion-accesos.md`
- **Al desvincular:** Revocar TODOS los accesos dentro de **24 horas** post-desvinculación

---

## 4. Política BYOD (Bring Your Own Device)

MetodologIA opera predominantemente con equipos personales (BYOD). Reglas:

| Regla | Detalle |
|-------|---------|
| **Cifrado de disco obligatorio** | FileVault (Mac) o BitLocker (Windows) activado. Verificar en onboarding. |
| **Bloqueo de pantalla** | Máximo 5 minutos de inactividad → bloqueo automático con contraseña. |
| **Actualizaciones de SO** | Instalar parches de seguridad dentro de 7 días de su publicación. |
| **Antivirus/anti-malware** | Requerido en Windows. macOS: XProtect nativo aceptable + Malwarebytes recomendado. |
| **Datos corporativos** | Almacenar en Drive corporativo, NO en disco local. Si hay copia local, debe estar en carpeta cifrada. |
| **Borrado remoto** | Si el equipo se pierde/roba: cambiar todas las passwords de cuentas accedidas desde el equipo. Si hay MDM configurado, activar borrado remoto. |
| **Redes Wi-Fi públicas** | Usar VPN si se accede a datos CONFIDENCIALES o RESTRINGIDOS desde redes públicas (cafeterías, aeropuertos). |

---

## 5. Uso Aceptable de Recursos

| Permitido | Prohibido |
|-----------|-----------|
| Usar herramientas corporativas para trabajo | Instalar software no autorizado en equipos con datos corporativos |
| Usar email corporativo para comunicación de negocio | Usar email personal para comunicación con clientes |
| Almacenar archivos de trabajo en Drive corporativo | Almacenar archivos de trabajo en Drive personal |
| Usar IA generativa conforme a `politica-uso-aceptable-ia.md` | Pegar datos RESTRINGIDOS en herramientas de IA externas |

---

## 6. Matriz de Severidad de Incidentes de Seguridad

| Severidad | Definición | Ejemplos en contexto MetodologIA | Tiempo de respuesta |
|-----------|-----------|----------------------------------|---------------------|
| **P1 — Crítico** | Datos de clientes comprometidos, acceso no autorizado a sistemas financieros, ransomware activo | Ex-colaborador descarga base completa de clientes del CRM; API key de pasarela de pagos expuesta en repo público; laptop con contratos robada sin cifrado de disco | 30 min respuesta, 4h resolución |
| **P2 — Alto** | Plataforma crítica caída durante servicio activo, credencial individual comprometida | LMS cae durante bootcamp en vivo; empleado cae en phishing y da credenciales de email; se descubre que un ex-facilitador aún tiene acceso al Drive | 2h respuesta, 8h resolución |
| **P3 — Medio** | Problema individual, sin impacto a clientes | Laptop de un usuario no arranca; acceso individual denegado por error de configuración; suscripción de software expiró sin aviso | 4h respuesta, 24h resolución |
| **P4 — Bajo** | Solicitud o mejora | Solicitud de nueva licencia; cambio de permisos en carpeta; actualización de SO pendiente | 24h respuesta, 5 días resolución |

Para incidentes con **datos personales:** seguir `plan-respuesta-brechas-datos.md`
Para incidentes de **infraestructura:** seguir `sop-incidentes-ti.md`

---

## 7. Responsabilidades

| Rol | Responsabilidad de seguridad |
|-----|----------------------------|
| **CTO/CISO** | Definir políticas, auditar cumplimiento, gestionar incidentes |
| **Todo el equipo** | Cumplir políticas, reportar incidentes, usar MFA, no compartir credenciales |
| **Administrador TI** | Gestionar accesos, backups, monitoreo, actualizaciones |
| **COO** | Aprobar presupuesto de seguridad, decisiones de riesgo |

---

## 8. Sanciones

| Infracción | Consecuencia |
|-----------|-------------|
| Compartir credenciales por chat | Amonestación escrita + cambio obligatorio de passwords |
| No activar MFA después de ser notificado | Suspensión de acceso hasta activación |
| Pegar datos RESTRINGIDOS en IA externa | Amonestación grave + reporte de incidente |
| Acceso no autorizado intencional a información | Terminación de relación + posible acción legal (Ley 1273/2009) |
| No cifrar disco de equipo BYOD después de 7 días de la notificación | Suspensión de acceso a datos corporativos |
