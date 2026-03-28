# Checklist de Due Diligence para Proveedores

**Versión:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Operaciones
**Cierra:** FM-12 (Backcasting COO)
**Uso:** Completar ANTES de contratar o renovar con cualquier proveedor

---

## 1. Niveles de Due Diligence

No todos los proveedores requieren el mismo escrutinio. Usar el tier correspondiente:

| Tier | Criterio | Secciones requeridas | Aprobador |
|------|----------|---------------------|-----------|
| **LIGHT** | Valor < 10M COP/año **Y** no procesa datos personales **Y** no es servicio crítico | A + B + G | Operaciones |
| **STANDARD** | Valor 10M-50M COP/año **O** procesa datos personales **O** acceso a info confidencial | A + B + C + D + E + F + G | Director de área |
| **ENHANCED** | Valor > 50M COP/año **O** servicio crítico para la operación | Todo + Plan de salida obligatorio (Sección H) | CEO |

**Responsable:** Operaciones (con apoyo de TI y Legal según corresponda)
**Tiempo estimado:** LIGHT: 30 min / STANDARD: 1-2 horas / ENHANCED: 2-4 horas

---

## SECCIÓN A: IDENTIFICACIÓN DEL PROVEEDOR

- [ ] **Razón social:** [_______________]
- [ ] **NIT / Tax ID:** [_______________]
- [ ] **País de constitución:** [_______________]
- [ ] **Dirección:** [_______________]
- [ ] **Representante legal:** [_______________]
- [ ] **Contacto comercial:** [_______________] / Email: [_______________]
- [ ] **Sitio web:** [_______________]
- [ ] **Servicio a contratar:** [_______________]
- [ ] **Categoría:** ☐ Tecnología / ☐ Formación / ☐ Profesional / ☐ Infraestructura / ☐ Financiero / ☐ Otro
- [ ] **Tier de due diligence:** ☐ LIGHT / ☐ STANDARD / ☐ ENHANCED

---

## SECCIÓN B: EXISTENCIA LEGAL Y FINANCIERA

- [ ] **Cámara de Comercio vigente (o equivalente)** verificada
  - Fecha de constitución: [_______________]
  - Estado: ☐ Activo | ☐ Inactivo (BLOQUEADOR)
- [ ] **RUT vigente** (si Colombia) o registro fiscal equivalente verificado
- [ ] **No aparece en listas restrictivas** (OFAC, Lista Clinton, ONU, listas SIC)
  - Verificación realizada: ☐ SÍ | ☐ NO (BLOQUEADOR)
  - Herramienta usada: [_______________]
- [ ] **Antigüedad mínima:** >= 2 años de operación (o justificación si <2 años)
- [ ] **Referencias comerciales:** Al menos 2 clientes verificables
  - Referencia 1: [_______________] / Contacto: [_______________]
  - Referencia 2: [_______________] / Contacto: [_______________]

---

## SECCIÓN C: CAPACIDAD TÉCNICA Y OPERATIVA

- [ ] **Experiencia en servicios similares** demostrada (portafolio, casos de éxito)
- [ ] **Equipo asignado:** Personal calificado para el servicio
  - Perfil principal: [_______________]
- [ ] **Disponibilidad y SLA ofrecido:**
  - Uptime comprometido: [___]%
  - Tiempo de respuesta a incidentes: [___] horas
- [ ] **Plan de continuidad de negocio:** ¿Tiene BCP documentado?
  - ☐ SÍ (solicitar copia) | ☐ NO (riesgo medio)
- [ ] **Plan B identificado:** Si este proveedor falla, ¿existe alternativa?
  - Alternativa: [_______________] | ☐ No hay alternativa (riesgo alto — ver Sección H)

---

## SECCIÓN D: SEGURIDAD Y PROTECCIÓN DE DATOS

- [ ] **¿Procesará datos personales?** ☐ SÍ | ☐ NO
- Si SÍ:
  - [ ] **DPA (Data Processing Agreement) firmado** o por firmar
  - [ ] **Política de privacidad** del proveedor revisada
  - [ ] **Certificaciones de seguridad:** ☐ ISO 27001 | ☐ SOC 2 | ☐ Otra: [___] | ☐ Ninguna
  - [ ] **Ubicación de los datos:** [País/Región]
  - [ ] **Cifrado en tránsito y reposo:** ☐ SÍ | ☐ NO (BLOQUEADOR si datos personales)
  - [ ] **Proceso de notificación de brechas:** ☐ Documentado | ☐ No documentado (riesgo)
  - [ ] **Retención y eliminación de datos:** Política clara y conforme a Ley 1581/2012

---

## SECCIÓN E: TÉRMINOS CONTRACTUALES

- [ ] **Contrato con cláusula de confidencialidad** (o NDA separado)
- [ ] **SLA con penalizaciones** incluido en contrato
- [ ] **Cláusula de terminación** con plazo razonable (<=30 días para portabilidad)
- [ ] **Cláusula de propiedad intelectual** clara
- [ ] **Cláusula de auditoría** (derecho a auditar al proveedor)
- [ ] **Responsabilidad y limitaciones** definidas
- [ ] **Ley aplicable:** Colombia (o jurisdicción aceptable)

---

## SECCIÓN F: EVALUACIÓN DE RIESGO

| Dimensión | Descripción del riesgo | Nivel |
|-----------|----------------------|-------|
| Concentración (único proveedor para servicio crítico) | [___] | ☐ Alto / ☐ Medio / ☐ Bajo |
| Financiero (proveedor inestable) | [___] | ☐ Alto / ☐ Medio / ☐ Bajo |
| Datos personales (procesa datos sensibles) | [___] | ☐ Alto / ☐ Medio / ☐ Bajo |
| Reputacional (asociación con proveedor cuestionado) | [___] | ☐ Alto / ☐ Medio / ☐ Bajo |
| Operacional (sin BCP ni alternativa) | [___] | ☐ Alto / ☐ Medio / ☐ Bajo |

**Riesgo consolidado:** ☐ Alto (requiere aprobación CEO) | ☐ Medio (aprobación Director) | ☐ Bajo (aprobación Operaciones)

---

## SECCIÓN G: DECISIÓN

- [ ] **APROBADO** — Proceder con contratación
- [ ] **APROBADO CON CONDICIONES** — Condiciones: [_______________]
- [ ] **RECHAZADO** — Motivo: [_______________]

**Aprobador:** [_______________]
**Fecha:** [_______________]
**Próxima re-verificación:** [fecha — 12 meses desde aprobación]

---

## SECCIÓN H: PLAN DE SALIDA (Obligatorio para proveedores ENHANCED y críticos)

Antes de firmar con cualquier proveedor marcado como "crítico" o tier ENHANCED, documentar:

| Campo | Respuesta |
|-------|-----------|
| **Proveedor alternativo identificado** | [nombre o "no existe — riesgo aceptado por CEO"] |
| **Plazo de migración estimado** | [___] días/semanas |
| **Datos portables:** ¿Se pueden exportar los datos en formato estándar? | ☐ SÍ (formato: ___) / ☐ NO (riesgo) |
| **Costo estimado de migración** | COP [___] |
| **Cláusula de asistencia post-terminación** | ☐ Incluida en contrato / ☐ No incluida (negociar) |
| **Trigger de activación del plan de salida** | [ej. SLA incumplido 3 meses consecutivos, brecha de datos, quiebra] |

---

## SECCIÓN I: RE-VERIFICACIÓN ANUAL

Para proveedores existentes, completar anualmente:

| Verificación | Estado | Fecha |
|-------------|--------|-------|
| Cámara de Comercio / registro vigente | ☐ OK / ☐ Alerta | [___] |
| Listas restrictivas (OFAC, Clinton, ONU) | ☐ Limpio / ☐ Alerta | [___] |
| Certificaciones de seguridad vigentes | ☐ OK / ☐ Vencida / ☐ N/A | [___] |
| SLA cumplido en el último año | ☐ Sí (___%) / ☐ No (___%) | [___] |
| Incidentes de seguridad reportados | ☐ Ninguno / ☐ [cantidad]: [resumen] | [___] |
| DPA vigente (si procesa datos) | ☐ Vigente / ☐ Vencido (BLOQUEADOR) | [___] |
| Plan B actualizado (si crítico) | ☐ Vigente / ☐ Desactualizado | [___] |
| **Decisión de continuidad** | ☐ Continuar / ☐ Renegociar / ☐ Reemplazar | [___] |

**Responsable de re-verificación:** Operaciones
**Aprobador:** Mismo tier que la contratación original

---

## Changelog

- v2.0.0 — Tiers de due diligence (LIGHT/STANDARD/ENHANCED), plan de salida obligatorio para críticos, re-verificación anual, tiempos estimados por tier, próxima re-verificación en decisión / Javier Montaño + Claude
- v1.0.0 — Creación inicial / Cierra FM-12 / Javier Montaño + Claude
