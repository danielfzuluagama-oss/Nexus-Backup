# Politica SAGRILAFT — Sistema de Autocontrol y Gestion del Riesgo de LA/FT

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Cierra:** FMF-14 (Backcasting CFO)
**Base legal:** Ley 1121/2006, Resolucion 100-006/2020 Supersociedades, Circular Basica Juridica SFC

> **DISCLAIMER:** Politica de referencia. Adaptar al tamano y complejidad de la empresa. Validar con asesor en prevencion LA/FT.

---

## 1. Proposito

Prevenir que MetodologIA sea utilizada para lavar activos o financiar terrorismo, cumpliendo las exigencias de la Supersociedades para empresas del sector real.

---

## 2. Aplica Si / Regimen Aplicable

| Condicion | Regimen | Obligaciones |
|----------|---------|-------------|
| Ingresos o activos >=30.000 UVT (~$1.412M en 2026) | **SAGRILAFT completo** | KYC, monitoreo, ROS, oficial de cumplimiento, informe anual |
| Ingresos o activos <30.000 UVT | **PTEE simplificado** (Programa de Transparencia y Etica Empresarial) | KYC basico, politica anti-soborno, canal de denuncias |
| Empresa nueva sin historico | Evaluar con proyeccion de primer ano | Implementar PTEE como minimo |

**Estado actual MetodologIA:** Evaluar anualmente. Si esta por debajo del umbral, aplica PTEE.

### Que Exige el PTEE (Regimen Simplificado)

| Elemento | Descripcion | Obligatorio |
|---------|------------|------------|
| Politica de transparencia y etica empresarial | Documento que declara compromiso anti-LA/FT y anti-soborno | SI |
| KYC basico de contrapartes | Identificacion + consulta en listas restrictivas | SI |
| Canal de denuncias | Mecanismo para reportar sospechas internamente | SI |
| Capacitacion basica | Al menos 1 vez/ano a todo el equipo | SI |
| Oficial de cumplimiento | Designar responsable (puede ser el representante legal en PYMES) | SI |
| Informe anual al maximo organo social | Presentar resultados de la gestion PTEE | SI |
| Monitoreo transaccional avanzado | Alertas automaticas, scoring de riesgo | NO (solo SAGRILAFT) |
| Reporte a UIAF | Solo si se detecta operacion sospechosa | SI (si aplica) |

---

## 3. Elementos del Sistema SAGRILAFT Completo

### 3.1 Identificacion y Conocimiento del Cliente/Contraparte (KYC)

Antes de vincular a un cliente B2B, aliado GTM, embajador, o proveedor:

| Verificacion | Documento soporte | Responsable |
|-------------|------------------|------------|
| Identidad (NIT, Camara Comercio, cedula rep. legal) | Ya cubierto en `formulario-f2-contratacion.md` | Operaciones |
| Beneficiario final (persona natural que controla >5%) | Declaracion de beneficiario final | Operaciones |
| Consulta en listas restrictivas (OFAC, ONU, Policia, Procuraduria, Contraloria) | Pantallazo con fecha | Operaciones |
| PEP (Persona Expuesta Politicamente) | Declaracion del cliente/contraparte | Operaciones |
| Origen de fondos (para pagos >$10M COP) | Declaracion de origen | Finanzas |

**Integracion con Due Diligence existente:** El `checklist-due-diligence-proveedores.md` ya cubre los items 1-3. Para SAGRILAFT/PTEE, agregar items 4-5 al mismo checklist. **NO duplicar formularios** — usar un solo flujo de vinculacion que cubra ambos.

### 3.2 Monitoreo de Operaciones

| Senal de alerta | Accion |
|----------------|--------|
| Pago en efectivo por montos altos | Rechazar. Toda transaccion debe ser bancarizada. |
| Cliente pide facturar a nombre de tercero sin justificacion | Escalar a Oficial de Cumplimiento |
| Pagos desde cuentas en jurisdicciones de alto riesgo | Verificar con compliance antes de aceptar |
| Embajador con comisiones desproporcionadas vs. gestion | Revisar con Director de Ecosistema |

### 3.3 Reporte de Operaciones Sospechosas (ROS)

Si se detecta una operacion sospechosa:
1. **NO alertar** al cliente/contraparte
2. Reportar internamente al Oficial de Cumplimiento
3. El Oficial evalua y, si procede, reporta a la **UIAF**

### 3.4 Oficial de Cumplimiento

| Aspecto | Detalle |
|---------|---------|
| **Designado por** | Junta Directiva / Representante Legal |
| **Requisitos** | Conocimiento en prevencion LA/FT, independencia funcional |
| **Puede ser** | El COO o un profesional externo (si la empresa es pequena) |
| **Responsabilidades** | Implementar SAGRILAFT/PTEE, capacitar equipo, gestionar ROS, actualizar politica anualmente |

---

## 4. Procedimiento de Vinculacion con KYC

| Paso | Accion | Responsable |
|------|--------|------------|
| 1 | Recopilar documentos de identidad (ya cubierto en F2/due diligence) | Operaciones |
| 2 | Consultar listas restrictivas | Operaciones |
| 3 | Solicitar declaracion de beneficiario final y PEP | Operaciones |
| 4 | Si aparece en listas o es PEP: escalar a Oficial de Cumplimiento | Operaciones |
| 5 | Oficial decide: vincular con monitoreo reforzado o NO vincular | Oficial |
| 6 | Registrar resultado en expediente | Operaciones |

---

## 5. Informe Anual de Cumplimiento (Template)

**Presentar al maximo organo social (Asamblea) antes del 31 de marzo.**

```
## INFORME ANUAL — GESTION SAGRILAFT/PTEE [ANO]

### 1. Resumen ejecutivo
- Regimen aplicable: SAGRILAFT / PTEE
- Total contrapartes vinculadas en el ano: ____
- Consultas en listas restrictivas realizadas: ____
- Alertas generadas: ____
- ROS presentados a UIAF: ____

### 2. Gestion de riesgos
- Nuevos factores de riesgo identificados: ____
- Contrapartes con monitoreo reforzado: ____
- Contrapartes rechazadas por riesgo LA/FT: ____

### 3. Capacitacion
- Sesiones realizadas: ____
- Porcentaje del equipo capacitado: ____

### 4. Recomendaciones para el proximo periodo
- ____

Oficial de Cumplimiento: _______________
Fecha: _______________
```

---

## 6. Capacitacion

| Audiencia | Frecuencia | Contenido |
|----------|-----------|-----------|
| Todo el equipo | Anual | Que es LA/FT, senales de alerta, como reportar |
| Sales Reps y Operaciones | Anual + al ingreso | KYC, listas, PEP, procedimiento de vinculacion |
| Oficial de Cumplimiento | Anual | Actualizacion normativa, reportes UIAF, gestion de riesgos |

---

## Changelog

- v2.0.0 — Regimen PTEE simplificado, template informe anual, integracion con due diligence existente
- v1.0.0 — Creacion inicial
