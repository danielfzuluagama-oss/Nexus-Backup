# SOP: Recolección Progresiva de Datos del Cliente

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** Operaciones / Sales Rep
**Cierra:** FM-14 (Backcasting COO)

---

## 1. Propósito

Gobernar qué datos se pueden recolectar en cada fase del onboarding, garantizando que:
- No se pidan datos innecesarios que generen fricción
- No se reciban datos personales de terceros antes de tener base legal (NDA + Habeas Data)
- Se cumpla la Ley 1581/2012 en cada momento

---

## 2. Principio: Mínimo Necesario por Fase

**Regla de oro:** En cada fase, recolectar SOLO los datos que se necesitan para avanzar a la siguiente fase. Nunca más.

---

## 3. Matriz de Datos Permitidos por Fase

### F0 — Awareness (Contacto Inicial)

| Permitido | Prohibido |
|-----------|-----------|
| Nombre del contacto | Datos financieros |
| Email del contacto | Datos de empleados del cliente |
| Empresa (opcional) | Información confidencial del negocio |
| Área de interés | Documentación formal |

**Base legal:** Aviso de privacidad en web (consentimiento implícito para estos datos mínimos).

### F1 — Diagnóstico

| Permitido | Prohibido |
|-----------|-----------|
| Todo lo de F0 + | Datos personales de empleados del cliente |
| Industria, tamaño, rol | Documentos internos del cliente |
| Madurez IA (1-5) | Datos financieros detallados |
| Dolor/necesidad (texto libre) | Listas de personal |
| Método de contacto preferido | Accesos a sistemas |

**Base legal:** Consentimiento verbal o implícito (formulario web). Suficiente para datos no sensibles del contacto directo.

**⚠️ ALERTA FM-14:** Si el cliente envía espontáneamente datos personales de terceros (ej. "aquí va la lista de mi equipo"), el Sales Rep debe:
1. **NO abrir ni procesar el archivo**
2. Responder: "Agradecemos la información, pero antes de recibir datos de su equipo necesitamos formalizar un NDA y autorización de tratamiento de datos. ¿Podemos avanzar con eso primero?"
3. Registrar el incidente como riesgo

### F2 — Contratación

| Permitido | Prohibido |
|-----------|-----------|
| Todo lo anterior + | Datos sensibles (salud, orientación, biométricos) |
| Razón social, NIT | Contraseñas o credenciales de producción |
| Representante legal | Información clasificada sin NDA firmado |
| Datos de facturación | |
| Documentación formal (Cámara, RUT, Cédula) | |
| Datos de empleados **SOLO si NDA + Habeas Data firmados** | |

**Base legal:** NDA firmado + Autorización Habeas Data firmada + Contrato en proceso.

**Gate:** `checklist-pre-firma.md` — NDA y Habeas Data deben estar firmados ANTES de recibir datos de terceros.

### F3 — Kickoff

| Permitido | Prohibido |
|-----------|-----------|
| Todo lo anterior + | Datos que no son necesarios para el servicio |
| Stakeholders con roles y contactos | Información personal no relacionada |
| Contactos técnicos | |
| Accesos a sistemas (con contrato firmado) | |
| Criterios de éxito | |
| Organigrama | |

**Base legal:** Contrato firmado (MSA + ODS). DPA firmado si se procesan datos.

### F4 — Operación

| Permitido | Prohibido |
|-----------|-----------|
| Todo lo anterior + | Datos fuera del alcance de la ODS |
| Feedback, NPS | Datos de clientes del cliente (sin sub-DPA) |
| Aceptaciones de hitos | |
| Change requests | |
| Datos de uso de plataforma (si aplica) | |

**Base legal:** Contrato vigente + DPA (si aplica) + Consentimiento para NPS/encuestas.

---

## 4. Procedimiento ante Recepción No Solicitada de Datos

Si en CUALQUIER fase se reciben datos que NO corresponden a esa fase:

| Paso | Acción | Responsable |
|------|--------|------------|
| 1 | **No procesar.** No abrir archivos con datos personales de terceros si no hay base legal. | Receptor |
| 2 | Notificar al cliente que necesita firmar documentos previos (NDA, Habeas Data, DPA según el caso) | Sales Rep / PM |
| 3 | Si ya se abrieron/procesaron los datos inadvertidamente, notificar al Oficial de Protección de Datos | Receptor → OPD |
| 4 | Registrar como incidente menor en `registro-riesgos-onboarding.md` | PM |
| 5 | Una vez firmados los documentos, solicitar reenvío formal de los datos | Sales Rep / PM |

---

## 5. Consentimiento por Fase

| Fase | Tipo de consentimiento | Documento |
|------|----------------------|-----------|
| F0 | Implícito (aviso web) | `politica-de-privacidad.md` publicada |
| F1 | Implícito (formulario) o verbal | Aviso de privacidad en formulario |
| F2 | Expreso y escrito | `autorizacion-habeas-data.md` firmado |
| F3 | Contractual | MSA + ODS + DPA (si aplica) |
| F4 | Contractual + consentimiento para encuestas | Contrato + aviso al inicio de encuesta |

---

## 6. Checklist de Compliance por Transición

### F0 → F1
- [ ] Aviso de privacidad visible en formulario/web
- [ ] Lead registrado solo con datos de F0

### F1 → F2
- [ ] Score del lead ≥12 (ref: `rubrica-scoring-leads.md`)
- [ ] No se han recibido datos personales de terceros sin NDA

### F2 → F3
- [ ] NDA firmado
- [ ] Habeas Data firmado (si aplica)
- [ ] DPA firmado (si se procesan datos de empleados del cliente)
- [ ] `checklist-pre-firma.md` completado
- [ ] Contrato firmado

### F3 → F4
- [ ] Kickoff ejecutado
- [ ] SLA baseline firmado
- [ ] Métricas de éxito acordadas
- [ ] Accesos entregados por el cliente

---

## Changelog

- v1.0.0 — Creación inicial / Cierra FM-14 / Javier Montaño + Claude
