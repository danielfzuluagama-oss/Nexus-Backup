# Knowledge Graph: Cognitive Loop of `crear-skill-metodologia`

## 1. Mapa de Relaciones Lógicas (Moat Edition)

El skill opera como un sistema de **Retroalimentación de Triple Loop**. El BoK fundamenta la lógica, los Use Cases validan la utilidad y el "Factor Sorpresa" garantiza la diferenciación competitiva (Moat).

## 2. Diagrama de Arquitectura (Sovereign UI)

```mermaid
graph TD
    %% Classes Definition
    classDef strategy fill:#122562,stroke:#0f1d4f,stroke-width:2px,color:#fff;
    classDef skill fill:#FFD700,stroke:#d4af00,stroke-width:2px,color:#000;
    classDef evidence fill:#1F2833,stroke:#000,stroke-width:2px,color:#fff;
    classDef loop fill:#f5f5f5,stroke:#137DC5,stroke-width:1px,stroke-dasharray: 5 5;

    %% Nodes
    Trigger((User Request)):::strategy
    Scaffold[SCAFFOLD: Estructura de Sub-Repo]:::skill
    Pulse[PULSE: Forjado de 5 Pilares]:::skill
    Map[MAP: Knowledge Graph v2]:::skill
    Op[OPERATIONALIZE: Paso a Paso]:::skill
    Resonate[RESONATE: Triple Loop Validation]:::skill
    Certify[CERTIFY: Excellence Gate 10/10]:::strategy
    
    Output[[Sovereign Asset Certificado]]:::evidence

    %% Relationships
    Trigger --> Scaffold
    Scaffold --> Pulse
    Pulse --> Map
    Map --> Op
    Op --> Resonate
    Resonate --> Certify
    Certify --> Output

    subgraph TripleLoop [Triple Loop Cycle]
        Resonate -.-> |Ontology| Pulse
        Resonate -.-> |Excellence| Scaffold
        Resonate -.-> |Adversarial| Op
    end

    %% Apply Classes
    class TripleLoop loop;
```

## 3. Dinámica de Ejecución

El "Factor Sorpresa" se activa en la fase **Resonate**, donde el agente inyecta lógica defensiva y trazabilidad de élite basada en los pilares forjados en la fase **Pulse**.

---

### Cognitive Architecture v2.2.0 (Moat Edition)

![Knowledge Graph](../assets/kg_skill_forge_final_1375_1771183547379.png)
