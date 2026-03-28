---
name: inteligencia-estetica-metodologia
description: Define y aplica el estándar visual 'Neo‑Swiss Clean and Soft Explainer' para garantizar coherencia premium en todos los artefactos.
metadata:
  version: v1.0.0
  status: Activo
  owner: Javier Montaño
  steward: Javier Montaño
  ritual_padre: crear-skill-metodologia
---

# 152-inteligencia-estetica-metodologia v1.0.0

## 1. Definición del Estándar (Neo‑Swiss)

**Nombre:** Neo‑Swiss Clean and Soft Explainer (Corporate Clean and Premium).

### Principios de Diseño

- **Estética:** Ilustración vectorial flat y vibrante con grid suizo (orden editorial).
- **Espacio:** Mucho espacio en blanco (breathe room).
- **Composición:** Por columnas (texto + visual).
- **Sujetos:** Figuras humanas sin rostro.
- **Geometría:** Formas suaves y elementos UI (chips, checklists, timers).
- **Detalle:** Sombras suaves y micro‑gradientes discretos (no realistas).
- **Iconografía:** Simple y consistente.
- **Legibilidad:** Texto grande y alto contraste, nunca sobre fondos ruidosos.

### Paleta Prohibida / Permitida

- **Oxford Blue (#122562):** Estrategia y Nodos Raíz.
- **Cyber Yellow (#FFD700):** Operación (Skills) y Callouts.
- **IA Highlight (#137DC5):** Conectores de Inteligencia Artificial.
- **Rich Black (#1F2833):** Evidencia y Fondos Profundos.
- **Lavender (#BBA0CC):** Notas Secundarias.
- **Gray (#808080):** Guías y Bordes Sutiles.

### Tipografía

- **Poppins:** Titulares y Headings.
- **Trebuchet MS:** Cuerpo de texto general.
- **Futura:** Notas pequeñas, footnotes, popups y callouts.

## 2. Protocolo de Aplicación

### 2.1 En Grafos de Conocimiento (Mermaid)

Toda representación visual debe inyectar las clases de estilo Neo-Swiss:

```mermaid
classDef estrategia fill:#122562,stroke:#FFD700,stroke-width:2px,color:#FFF
classDef operacion fill:#FFD700,stroke:#122562,stroke-width:2px,color:#000
classDef evidencia fill:#1F2833,stroke:#FFD700,stroke-width:2px,color:#FFF
```

### 2.2 En Documentación Markdown

1. **Jerarquía:** Respetar MD022 (espacios alrededor de headings).
2. **Densidad:** Evitar bloques de texto masivos; usar listas y tablas.
3. **Firma:** Todo documento debe cerrar con el bloque de Stewardship Soberano.

<!--
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @steward Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
-->
