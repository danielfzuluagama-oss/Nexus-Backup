# SOP L2: Gestión de Cuaderno Devoted por Cliente (v1.0.0)

> [!NOTE]
> **Propósito:** Garantizar que cada cliente de MetodologIA tenga un repositorio de inteligencia fundamentado y soberano en NotebookLM.

---

## 1. Trigger de Activación

Este SOP se activa inmediatamente después de la calificación positiva de un prospecto (Gate G1 del Proceso Comercial).

---

## 2. Pasos del Procedimiento

### Paso 1: Creación de la Infraestructura

- **Acción:** Crear un nuevo cuaderno en NotebookLM con la nomenclatura: `[MetodologIA] - [Nombre del Cliente] - [Proyecto]`.
- **Configuración:** Establecer el idioma a "Español (Latinoamérica)" en los settings de chat si aplica.

### Paso 2: Grounding (Carga de Fuentes)

Cargar al menos los siguientes tres tipos de fuentes:

1. **Discovery Primary:** Transcripción de la llamada de descubrimiento o minutas de reuniones.
2. **Contexto Sectorial:** Reportes de industria del cliente o análisis de competencia.
3. **Propuesta Preliminar:** Documentos de alcance o borradores de Business Case.

### Paso 3: Gobernanza de Fuentes

- **Verificación:** Marcar todas las fuentes como "Soberanas".
- **Limpieza:** Validar que no existan duplicados que puedan sesgar la generación del Studio.

---

## 3. Rituales Asociados

- `L2_RITUAL_INVESTIGACION_NOTEBOOKLM`: Para fundamentar la propuesta.
- `L2_RITUAL_ENRIQUECIMIENTO_FUENTES`: Carga semanal de nuevos datos del cliente.

---

## 4. Gates de Calidad (Checklist)

- [ ] Cuaderno creado con nomenclatura estándar.
- [ ] Al menos 3 fuentes primarias cargadas y revisadas.
- [ ] Acceso compartido con el equipo de cuenta (Account Manager y Orchestrator).

---
**Gobernanza:** MetodologIA Gobierno Operativo (L2)  

**Versión:** 1.0.0
