# Plan de Respuesta a Incidentes de Seguridad de Datos Personales

**Versión:** 2.0.0
**Fecha:** 2026-03-25
**Contexto Legal:** República de Colombia
**Normas aplicables:** Ley 1581/2012 (Art. 17 lit. n), Decreto 1377/2013, Circular 002/2023 SIC
**Cierra:** FM-02 (Backcasting COO)
**Owner:** Oficial de Protección de Datos / COO

> **DISCLAIMER:** Template operativa. Adaptar a la estructura organizacional real y validar con asesor legal.

---

## 1. Propósito

Establecer el procedimiento para **detectar, contener, investigar, notificar y remediar** incidentes de seguridad que comprometan datos personales bajo custodia de MetodologIA, cumpliendo los tiempos y requisitos de la SIC.

---

## 2. Alcance

Aplica a todo incidente que involucre:
- Acceso no autorizado a datos personales
- Pérdida, destrucción o alteración no intencional de datos
- Divulgación no autorizada de datos personales
- Ransomware o malware que afecte bases de datos con información personal

---

## 3. Roles y Responsabilidades

| Rol | Responsabilidad | Titular |
|-----|----------------|---------|
| **Oficial de Protección de Datos (OPD)** | Coordinación general, notificaciones | Por designar |
| **COO** | Decisiones operativas, autorización de comunicaciones | Por designar |
| **CEO** | Aprobación de comunicaciones públicas, contacto con SIC | Por designar |
| **Responsable de TI** | Contención técnica, forensia, restauración | Por designar |
| **Asesor Legal** | Evaluación de obligaciones legales | Firma externa por definir |
| **Comunicaciones** | Comunicaciones internas y externas | Por designar |

---

## 4. Clasificación de Incidentes

| Nivel | Descripción | Ejemplo | Tiempo de respuesta |
|-------|-------------|---------|-------------------|
| **CRITICO** | Datos sensibles comprometidos, >1000 titulares, exposición pública | Base de datos filtrada públicamente | Activación inmediata (0h) |
| **ALTO** | Datos personales comprometidos, <1000 titulares, sin exposición pública | Acceso no autorizado a carpeta con datos de clientes | Activación en <4h |
| **MEDIO** | Posible compromiso, en investigación | Email con datos enviado a destinatario incorrecto | Activación en <8h |
| **BAJO** | Vulnerabilidad detectada sin explotación confirmada | Contraseña débil en sistema con datos personales | Evaluación en <24h |

---

## 5. Procedimiento de Respuesta

### Fase 1: DETECCION (0-2 horas)

| Paso | Acción | Responsable | Evidencia |
|------|--------|------------|-----------|
| 1.1 | Recibir reporte del incidente | Cualquier empleado -> OPD | Registro con timestamp |
| 1.2 | Clasificar severidad | OPD | Formulario de clasificación |
| 1.3 | Activar equipo de respuesta según severidad | OPD | Notificación al equipo |
| 1.4 | Documentar hallazgos iniciales | OPD | Bitácora de incidente iniciada |

### Fase 2: CONTENCION (2-24 horas)

| Paso | Acción | Responsable | Evidencia |
|------|--------|------------|-----------|
| 2.1 | Aislar sistema(s) afectado(s) | TI | Log de acciones técnicas |
| 2.2 | Preservar evidencia forense (logs, imágenes, tráfico) | TI | Copia forense con hash SHA-256 |
| 2.3 | Revocar accesos comprometidos | TI | Lista de accesos revocados |
| 2.4 | Evaluar alcance: datos, titulares, bases afectadas | OPD + TI | Informe de alcance |
| 2.5 | Activar comunicación interna (equipo directivo informado) | COO | Minuta de reunión |

### Fase 3: NOTIFICACION (24-72 horas)

#### Árbol de decisión: ¿Notificar a la SIC?

```
¿Se comprometieron datos personales confirmados?
  ├─ NO → Registrar internamente. No notificar SIC. Cerrar como incidente de seguridad general.
  └─ SÍ → ¿El incidente representa riesgo significativo para los derechos de los titulares?
           ├─ NO (ej. email interno enviado a colega equivocado, sin datos sensibles)
           │     → Notificar titulares afectados. No notificar SIC. Registrar internamente.
           └─ SÍ (datos sensibles, >100 titulares, exposición externa, o acceso malintencionado)
                 → Notificar titulares + Notificar SIC conforme Circular 002/2023.
```

| Paso | Acción | Responsable | Plazo | Evidencia |
|------|--------|------------|-------|-----------|
| 3.1 | Evaluar obligación de notificación (usar árbol arriba) | OPD + Legal | 24h post-contención | Informe legal |
| 3.2 | Notificar a titulares afectados (si aplica) | OPD + Comunicaciones | 72h post-detección | Comunicación con acuse |
| 3.3 | Notificar a la SIC (si aplica) | OPD + Legal + CEO | Conforme plazos SIC | Radicado ante SIC |
| 3.4 | Notificar a clientes corporativos (si datos de sus usuarios) | OPD + Comercial | 24h post-contención | Comunicación contractual |
| 3.5 | Notificar a encargados de tratamiento afectados | OPD | 24h post-contención | Notificación escrita |

**Contenido mínimo de la notificación a titulares:**
1. Descripción del incidente (sin detalles técnicos sensibles)
2. Categorías de datos comprometidos
3. Acciones de contención tomadas
4. Recomendaciones para el titular
5. Canal de contacto para consultas
6. Medidas correctivas planificadas

### Fase 4: ERRADICACION (1-7 días)

| Paso | Acción | Responsable | Evidencia |
|------|--------|------------|-----------|
| 4.1 | Eliminar causa raíz del incidente | TI | Informe técnico |
| 4.2 | Parchear vulnerabilidades identificadas | TI | Log de parches |
| 4.3 | Verificar contención efectiva (re-test) | TI | Resultado de pruebas |
| 4.4 | Restaurar servicios afectados | TI | Confirmación de restauración |

### Fase 5: RECUPERACION Y LECCIONES (7-30 días)

| Paso | Acción | Responsable | Evidencia |
|------|--------|------------|-----------|
| 5.1 | Monitoreo intensivo post-incidente (30 días) | TI | Dashboard de monitoreo |
| 5.2 | Informe completo del incidente (post-mortem) | OPD | Informe final |
| 5.3 | Reunión de lecciones aprendidas | COO | Minuta con acciones correctivas |
| 5.4 | Actualizar controles de seguridad | OPD + TI | Plan de mejora implementado |
| 5.5 | Actualizar este plan si se identifican gaps | OPD | Nueva versión del plan |
| 5.6 | Capacitación al personal (si aplica) | OPD | Registro de capacitación |

---

## 6. Templates de Comunicación

### 6.1 Incidente CRITICO/ALTO — Notificación a titulares

```
Asunto: Aviso importante sobre la seguridad de sus datos — MetodologIA

Estimado/a [nombre del titular]:

Le informamos que el [fecha] identificamos un incidente de seguridad que
pudo haber afectado los siguientes datos personales suyos: [categorías
de datos: nombre, email, teléfono, etc.].

Qué ocurrió: [descripción breve sin detalles técnicos sensibles].

Qué hicimos: Inmediatamente [acciones de contención tomadas].

Qué le recomendamos:
- [Recomendación 1: ej. cambiar contraseña de la plataforma]
- [Recomendación 2: ej. estar atento a comunicaciones sospechosas]

Para consultas: [canal de contacto, ej. incidentes@metodologia.co]

Lamentamos esta situación y estamos comprometidos con la protección de
su información.

MetodologIA — Oficial de Protección de Datos
```

### 6.2 Incidente MEDIO — Notificación interna

```
Asunto: [MEDIO] Incidente de datos — acción requerida

Equipo:

Se ha detectado un incidente de severidad MEDIA:
- Qué: [descripción]
- Cuándo: [fecha/hora de detección]
- Alcance estimado: [número de titulares, tipo de datos]
- Estado: En investigación

Acciones inmediatas requeridas:
- [Responsable TI]: [acción de contención]
- [OPD]: Evaluar obligación de notificación en 24h

Próxima reunión de seguimiento: [fecha/hora]

— OPD
```

### 6.3 Notificación a cliente corporativo (DPA)

```
Asunto: Notificación de incidente de seguridad — Ref. Contrato [ID]

Estimado/a [contacto del cliente]:

Conforme al Acuerdo de Procesamiento de Datos (DPA) vigente entre
MetodologIA y [nombre del cliente], le notificamos que hemos identificado
un incidente de seguridad que podría afectar datos personales procesados
en el contexto de nuestro contrato.

Tipo de incidente: [descripción]
Datos potencialmente afectados: [categorías]
Titulares potencialmente afectados: [cantidad estimada]
Acciones de contención: [resumen]
Estado actual: [en contención / contenido / en remediación]

Quedamos a disposición para coordinación inmediata.

MetodologIA — Oficial de Protección de Datos
Tel: [número de emergencia]
```

---

## 7. Plantilla de Registro de Incidente

```
## REGISTRO DE INCIDENTE DE SEGURIDAD DE DATOS

**ID Incidente:** INC-[AAAA]-[###]
**Fecha/hora de detección:** [_______________]
**Fecha/hora de reporte:** [_______________]
**Reportado por:** [_______________]
**Clasificación:** ☐ CRITICO | ☐ ALTO | ☐ MEDIO | ☐ BAJO

### Descripción del incidente
[_______________]

### Datos comprometidos
- Tipo de datos: [_______________]
- Número estimado de titulares: [_______________]
- Bases de datos afectadas: [_______________]

### Cronología de respuesta
| Hora | Acción | Responsable |
|------|--------|------------|
| [___] | [___] | [___] |

### Notificaciones realizadas
- [ ] Titulares: [Fecha] [Medio]
- [ ] SIC: [Fecha] [Radicado]
- [ ] Clientes corporativos: [Fecha]
- [ ] Encargados: [Fecha]

### Causa raíz
[_______________]

### Acciones correctivas
[_______________]

### Estado
☐ Abierto | ☐ En contención | ☐ En remediación | ☐ Cerrado
```

---

## 8. Métricas Post-Incidente

Después de cada incidente cerrado, registrar:

| Métrica | Valor | Meta |
|---------|-------|------|
| **Tiempo de detección (TTD)** — desde que ocurrió hasta que se detectó | [___] horas | < 24h |
| **Tiempo de contención (TTC)** — desde detección hasta contención | [___] horas | < 4h (Crítico), < 24h (Alto) |
| **Tiempo de notificación (TTN)** — desde detección hasta notificación a titulares | [___] horas | < 72h |
| **Registros afectados** — número total de titulares impactados | [___] | Tender a 0 |
| **Costo del incidente** — horas-persona + costos directos + asesoría legal | COP [___] | Baseline por establecer |
| **Acciones correctivas implementadas** | [___] de [___] | 100% en 30 días |

Estas métricas se consolidan en el informe trimestral de seguridad para la dirección.

---

## 9. Seguro de Responsabilidad Cibernética

| Estado | Detalle |
|--------|---------|
| **¿MetodologIA tiene seguro cyber?** | **NO — RIESGO ABIERTO** |
| Recomendación | Cotizar póliza de responsabilidad cibernética antes de Q3 2026 |
| Cobertura mínima sugerida | Respuesta a incidentes, notificación a titulares, defensa legal, daño reputacional |
| Proveedores a evaluar | Sura, Chubb, AIG (todos ofrecen cyber en Colombia) |
| Responsable de seguimiento | COO |
| Fecha límite | 2026-09-30 |

---

## 10. Simulacros

EL RESPONSABLE realizará un **simulacro de incidente de datos** al menos una vez al año.

| Frecuencia | Tipo | Participantes |
|-----------|------|--------------|
| Anual (obligatorio) | Tabletop exercise completo | Equipo completo de respuesta |
| Semestral (recomendado) | Simulacro parcial (notificación) | OPD + Legal + Comunicaciones |

### Escenarios para tabletop exercise anual

**Escenario 1 — Laptop robada:**
Un consultor de MetodologIA deja su laptop en un café. El equipo contiene: carpeta con datos de 50 participantes de un bootcamp (nombres, emails, empresas), acceso al LMS con sesión abierta, credenciales guardadas en el navegador para Google Workspace.
- Preguntas clave: ¿El disco estaba cifrado? ¿Se puede hacer wipe remoto? ¿Se clasifica como ALTO o MEDIO? ¿Se notifica a los 50 participantes?

**Escenario 2 — Phishing exitoso:**
Un empleado hace clic en un enlace de phishing que imita la página de login de Google Workspace. El atacante obtiene acceso al correo corporativo durante 6 horas antes de que se detecte. En ese correo hay hilos con propuestas comerciales que incluyen nombres, cargos y NIT de clientes prospect.
- Preguntas clave: ¿Cuántos titulares se ven afectados? ¿Los datos de NIT empresarial son "datos personales"? ¿Se notifica a los prospects? ¿Se reporta a la SIC?

**Escenario 3 — Brecha en proveedor:**
El proveedor de LMS notifica que sufrió una brecha. Datos potencialmente expuestos: nombres, emails y progreso académico de todos los usuarios de MetodologIA en la plataforma (aprox. 300 titulares). El proveedor dice que "no hay evidencia de exfiltración".
- Preguntas clave: ¿MetodologIA es responsable de notificar o lo es el proveedor? ¿Qué dice el DPA? ¿Se confía en la evaluación del proveedor o se hace investigación propia? ¿Se activa el plan B para el LMS?

---

## Changelog

- v2.0.0 — Templates de comunicación por severidad, árbol de decisión para notificación SIC, métricas post-incidente, seguro cyber como riesgo abierto, 3 escenarios de tabletop, defaults en roles / Javier Montaño + Claude
- v1.0.0 — Creación inicial / Cierra FM-02 / Javier Montaño + Claude
