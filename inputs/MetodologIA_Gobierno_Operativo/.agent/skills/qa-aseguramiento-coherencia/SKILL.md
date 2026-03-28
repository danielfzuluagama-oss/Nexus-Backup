# MetodologIA QA: Aseguramiento de Coherencia Táctica

> **Owner**: Javier Montaño
> **Steward**: Javier Montaño
> **Version**: 1.0.0
> **Status**: IN_FORGE

## 1. El Rol del QA en MetodologIA

Este skill no es un revisor ortográfico; es el **Arquitecto de la Verdad**. Su misión es garantizar que el conocimiento de Javier Montaño se transmita sin degradación a través de las 3 capas: **Macro (Procesos)**, **Mesos (SOPs)** y **Atómica (Rituales)**.

> [!IMPORTANT]
> La "Coherencia Máxima" ocurre cuando el **Grafo Visual**, el **Mermaid Técnico** y el **Texto de Referencia** dicen exactamente lo mismo sin contradicciones.

## 2. El Protocolo de Verificación Cruzada (PVC)

Para cada skill auditado, se deben validar 3 bucles de coherencia:

### Loop 1: Simetría Visual-Semántica

* **Check**: ¿El PNG de `assets/` refleja el Mermaid de `meta/`?
* **Failure**: Desactualización visual. El usuario ve algo que la IA no procesa.

### Loop 2: Conectividad Jerárquica

* **Check Proceso**: ¿El Proceso mapea SOPs existentes en `.agent/skills/`?
* **Check SOP**: ¿El SOP mapea Rituales existentes?
* **Failure**: "Orphan Step". Un paso que apunta a la nada o a un ritual no definido.

### Loop 3: Integridad de los 5 Pilares

* **Check**: ¿El `paso-a-paso.md` usa los prompts definidos en `prompts.md`?
* **Check**: ¿Los `use-cases.md` están alineados con el `estado-del-arte.md`?

## 3. Guardrails de QA

* **Zero Tolerance Policy**: Si se detecta una contradicción entre `SKILL.md` y sus referencias, el skill se marca como `UNSAFE`.
* **Path Absolute Rule**: Todas las referencias a herramientas u otros skills deben usar paths absolutos o relativos validados.
* **Evidence Requirement**: No existe la "opinión" de QA. Todo hallazgo debe citar el archivo y la línea exacta de la desviación.

## 4. Checklist de Certificación QA

* [ ] **Pilar 1 (SOTA):** ¿Está actualizado a las últimas versiones de herramientas?
* [ ] **Pilar 2 (BoK):** ¿Contiene la teoría de base (Triple Loop, ReAct, etc.)?
* [ ] **Pilar 3 (Best Practices):** ¿Define 3 "DOs" y 3 "DONTs"?
* [ ] **Pilar 4 (Use Cases):** ¿Hay ejemplos reales de aplicación?
* [ ] **Pilar 5 (Prompts):** ¿Los prompts están optimizados para el skill objetivo?
* [ ] **Visual:** ¿El Knowledge Graph usa la paleta Oxford Blue, Cyber Yellow y Rich Black?

---
> [!NOTE]
> *Este skill es un artefacto soberano de MetodologIA. © 2026 Javier Montaño.*
