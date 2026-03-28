---
id: "05"

segmento: "empresas-corporate"
journey: "evaluation"
proceso: "demostrar-valor"
sop: "sop-05-try-and-buy"
ritual-slug: "05-entregar-piloto-institucional"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Solutions Architect / Lead Consultant"
- backup: "Enterprise Account Executive"
frecuencia: "por-evento (Únicamente cuando el RFP exige una Prueba Técnica Obligatoria o el Deal Strategy lo requiere para mitigar el Miedo Financiero C-Level)"
herramientas:

- "Environment de Prueba Aislado ('Sandboxing')"
- "Matriz de Éxito Parametrizada (Success Criteria Agreement - SCA)"
- "Executive Dashboard (Tableau / Looker / PowerBI)"

entry-criteria:

- "Ficha Técnica de Discovery (R04) completada y Pains validados."
- "Contrato Comercial de 'Piloto Pagado' o 'Acuerdo de Prueba Gratuita Restringida (PoC)' firmado por Procuración Licitante."
exit-criteria:

- "Métricas 'Antes y Después' o A/B Testing Científico recolectadas con éxito."
- "El 'Executive Readout' (Reporte Ejecutivo de 3 Láminas) validado por el Champion del Proyecto."
- "Defensa del Piloto ante el Comité Evaluador (Go to R06/R07)."

kpi: "Pilot to Production Conversion Rate (Target: ≥80% de los Pilotos institucionales deben transformarse mágicamente en Contratos Multianuales Completos)"
leading-indicators:

- "Firma del 'Success Criteria Agreement' ANTES del día 1 del Piloto."
- "Uso activo por parte del Grupo de Control durante la Ventana de Prueba."
riesgos-controles:

- riesgo: "Muerte por Alcance Infinito (Scope Creep) en Modo Gratis (Hacerle el trabajo a la empresa de 6 meses en un piloto de 30 días)"

  control: "El Candado de Funcionalidades. Si el Piloto no tiene un Objetivo Micro-Aislado ('Vamos a optimizar SOLO el almacén 3B durante 14 días'), Cancelar Piloto. El cliente corporativo que pide 'Prueba todo en todas las sedes' no quiere probar, quiere consultoría gratis encubierta."

- riesgo: "El Piloto del Huérfano (Se encienden los sistemas el Lunes, y NADIE del lado del cliente los usa durante los 30 días de la prueba, lo que arroja Data = Cero en la lectura final)"

  control: "The Adoption SLA. Cláusula estricta. 'Asignaremos 2 Ingenieros a su PoC. Si su equipo no interactúa en un 80% con el sistema los primeros 7 días, apagamos la prueba y cerramos caso'. Responsabilizar al Cliente Corporate en la evaluación mutua."

- riesgo: "Síndrome de la Data Ciega (Subir la eficiencia un 40% empíricamente pero no lograr medirlo numéricamente porque no tomamos 'Baseline' el Día Cero)"

  control: "La Cátedra de las Bases ('Baseline Mandate'). Prohibido iniciar operaciones sin que el Cliente haya firmado digitalmente el reporte de su ineficiencia actual (Costo Actual vs Eficiencia Actual)."
evidencias:

- "Documento de Acuerdo de Criterios de Éxito (SCA) Firmado"
- "Logs de Adopción de la Prueba"
- "The Boardroom-Ready Executive Summary (El Acta Final)"
---

# Ritual: Entregar Piloto Institucional (Proof of Value) B2B — Empresas/Corporate (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Corporate
> **Objetivo:** En Enterprise, probar no es 'darte una cuenta gratis de 30 días'. Un Proof of Concept (PoC) o Proof of Value (PoV) Institucional es una Cirugía de Ataque Científico. Consiste en entrar a la maquinaria real del cliente corporativo, rodear un solo dolor específico, curarlo violentamente rápido, medir la cura de forma irrefutable (con grupo de control A/B), empaquetar esa data estadística en 3 slides, y ponerlos frente a los Directores para que NO puedan negar matemáticamente que necesitan el Contrato Completo en el R06.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Inmediatamente después del Discovery (R04) o como parte de los entregables obligatorios de un Concurso/RFP B2B fase intermedia.
- **Pre-ritual:** ¿Logró el AE (Ventas) venderle al prospecto corporativo la idea de que "El Piloto No Es Gratis, Cuesta Tiempo y Foco" y el Cliente lo aceptó?
- **Contexto:** El Vicepresidente de Operaciones (El Economic Buyer Mapeado en R03) de la Empresa Objetivo dijo: "Los números de ahorro en papel suenan magníficos, Consultores, pero mi gente lleva 10 años trabajando igual y detesta el cambio. Demuéstramelo asimilando el 5% de la carga de un almacén aislado antes de que yo autorice soltar el cheque por los 50 almacenes". Asimétricamente, esto es una trampa. Toca entrar y ganar.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Orquestar y ejecutar una prueba de resistencia en ambiente controlado y limitado, que produzca 'Hard Data' (Evidencia Financiera Densa) que justifique técnica, operacional y políticamente el Business Case del contrato completo.
- **Definición de Éxito (DoD):**
  - [ ] El Scope del PoC (The Fence) trazado al milímetro (Qué sí probaremos, Qué no).
  - [ ] El Status Quo Financiero (Baseline) documentado con la firma del Champion.
  - [ ] Sandbox Técnico Encendido y Utilizado.
  - [ ] Reporte "Boardroom Ready" Entregado en Sesión C-Level.
- **Definición de Éxito del Corporate Prospect:** "Increíble. La firma MetodologIA no solo arregló el proceso del Sub-Silo 4 en 30 días, sino que nos trajeron un informe proyectado de qué pasaría matemáticamente si escalamos esto a los 29 silos restantes. Hay que pedirle presupuesto a Finanzas mañana."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Enterprise AE | El Gestor del Trato. Garantiza que la Data del Piloto sirva para Cerrar Económicamente el Contrato en R07. Evitar que se vuelva una "consulta técnica para siempre". |
| **Responsible** | Solutions Architect / Lead Consultant | El Científico. Lidera el despliegue de las capacidades aisladas, mide los KPIs, instruye al grupo de control del cliente corporativo. |

| **Consulted** | Champion (Del Cliente) | El Socio Interno. Se le consulta iterativamente si cree que los datos logrados están gustando al Directorio de espaldas a nosotros. |
| **Informed** | Legal B2B | Debe vigilar el cumplimiento del Acuerdo NDA Temporal de transferencia de datos en vivo (Ej. No exponer tarjetas de crédito reales en el piloto logístico). |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Carta Base de Acuerdo de Criterios de Éxito (Success Criteria Agreement - SCA) Validada (Ej. "Victoria = Margen de error bajó del 8% al 3%").
- [ ] Datos y Credenciales Seguras de ingreso a los Silos del Cliente.
- [ ] Check de Seguridad de la Información B2B.

---

## 5. Ejecutar — Parte 1: Inmovilización del Scope y Arquitectura Científica

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Trazado del SCA (Success Criteria Agreement)

**Acción:** AE redacta el SCA y se lo envía al Champion B2B. "Estimado John, el Piloto arranca Lunes. El Éxito (10/10) lo mediremos SÓLO en base a: (1) Reducción de Costo Marginal y (2) Nivel de Clicks del Operario. ¿Firmes?"

**Output:** Trampa de 'Goal-Posts Moving' Desactivada (El cliente corporativo no puede cambiar la meta al final).

### 5.2 — Obtención del Baseline Irrefutable

**Acción:** Architect y AE documentan el Cero. "Día 1: Ustedes hoy procesan 34 facturas/min con 12% Error Rate. Cuestan 3 USD/Factura. Confirmen Baseline".

**Output:** El Punto A de la Geometría Financiera B2B.

### 5.3 — Segregación del Grupo de Control

**Acción:** Architect exige al cliente separar 2 equipos. Equipo Alpha (Sigue usando modelo viejo). Equipo Beta (Usa nuestro Modelo/Consultoría). Tienen que correr paralelos.

**Output:** Creación del Marco Científico Experimental.

### 5.4 — Configuración del Entorno Seguro 'Sandbox'

**Acción:** Delivery enciende IPs temporales, espacios de Slack aislados, software de instancia DEDICADA. Y corre Test de QA interno B2B.

**Output:** Ready for Infiltration.

### 5.5 — El Kick-off Táctil con Nivel Operativo Parcial

**Acción:** Junta de 25 min SOLO con los usuarios del corporativo del 'Equipo Beta'. Exigencia de adopción y explicación del "Why" ('Esta herramienta les quitará de encima los reportes asquerosos del Viernes a las 8 p.m.').

**Output:** Superar Resistencia al Cambio de Nivel Medio.

### 5.6-5.10 — [Distribución de Keys / Asignación Consultiva, Seteo de Logs de Auditoría para ver si el VP que pidió el piloto sí está entrando, Limpieza legal de bases de datos del corporativo para la muestra ciega (Remover PII Data para que el servidor Alpha de MetodologIA no se contamine de riesgo de terceros), Check de pulso Técnico D+1 (Ver si hay rotura estructural de software de ellos vs nuestro)]

---

## 6. Ejecutar — Parte 2: La Guerra de Trincheras (The PoC Window)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Monitoreo de Adopción Temprana D+3

**Acción:** Architect revisa telemetría. Vemos que 4 operarios no están usando el Modelo B2B nuevo. Architect alarma al Champion. "Champion, tu equipo D aún usa el sistema viejo. Muévelos."

**Output:** Corrección de la adopción pasiva. No hay Proof of Value sin Uso Ininterrumpido.

### 6.2 — Optimización a Mitad de Vuelo (Mid-Point Calibration)

**Acción:** Semana 2 de 4. El Architect nota que el parámetro K3 falla. Tunea el sistema / modelo consultivo asíncronamente sin pedir permiso.

**Output:** Celeridad de corrección invisible al cliente C-Level.

### 6.3 — Ejecución del Check-In Semanal C-Level

**Acción:** AE llama 10 mins al Champion. "Reporte de Frente de Batalla. Todo estable. El equipo Beta está adoptando. En 15 días terminamos la medición. ¿Sigues en plan de presupuestar para el R06 si ganamos?".

**Output:** Alineación Comercial Continua (Impide que el piloto devore la Mente Estratégica).

### 6.4 — Identificación Oportunista de 'Mini-Insights' (The Wow Effect)

**Acción:** AI Copilots detecta anomolía interesante. "Oye, durante el piloto notamos que la fábrica bota energía de 2 a 4 PM en el pasillo norte, cosa que ustedes ni sabían".

**Output:** Regalito Excedente de Asimetría Consultiva ('Free Value Give').

### 6.5 — Recolección Final de Data Paramétrica

**Acción:** Día 30 a las 00:00. Corte Quirúrgico. Interrupción del Sandbox. Bajada total de datos de Grupo Alpha y Grupo Beta.

**Output:** Congelamiento de Test en Frío.

### 6.6-6.10 — [Extracción pura de bases JSON o Tablas para cruces estadísticos, Limpieza de anomalías matemáticas ('Ese pico de errores no fue nuestro, fue que se cortó el internet del corporativo el Martes'), Empaquetado de retroalimentación cualitativa informal del equipo Beta ('Pídele a 3 usuarios un quote de porqué no quieren volver al modo antiguo para meterlo en un slide'), Restricción formal de Accesos del Cliente (No hay Free Tier Constante, el piloto terminó y duele perderlo), Pre-Notificación de Fin de Operaciones al Comité Evaluador (Pre-R07)]

---

## 7. Ejecutar — Parte 3: 'Boardroom-Ready' Synthesis

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Limpieza e Integración de la 'Tabla de Verdad'

**Acción:** Architect junta la Baseline (R05.P1) vs Alpha (Grupo Antiguo) vs Beta (Aislado Innovación MetodologIA).

**Output:** El contraste puro B2B (Materia prima del Veredicto).

### 7.2 — Aplicación Matemática del Ahorro Extrapolado

**Acción:** El AE interviene la tabla pura. "Ok. Ahorramos $100 en 1 bodega. Si lo multiplicamos por sus 500 bodegas x 12 meses... esto genera $600,000 USD al Año. The Business Case está vivo."

**Output:** Formación del Insight C-Level Destructor.

### 7.3 — Edición del "Executive Dashboard"

**Acción:** Todo el análisis hiper-avanzado de 15 páginas se Reduce (Violencia Asimétrica Cognitiva) a un Deck de C-Level de EXACTAMENTE 3 Láminas. Lámina 1: Qué medimos. Lámina 2: El Choque (Alpha vs Beta). Lámina 3: La Extrapolación del Dinero Realizado y el Siguiente Paso Inmediato.

**Output:** Munición Digerible para Directores Ocupados Corporativos Típicos.

### 7.4 — Revisión del Champion Pre-Lanzamiento (The Sneak-Peek)

**Acción:** InMail privado al Champion (Contacto nuestro). "Ayer sacamos esto. Antes de la sesión final, necesito que lo veas. ¿Si yo le digo a tu Junta Directiva que ahorraremos 600K con esta data del piloto, me colgarán o firmarán el acuerdo de la propuesta R06?"

**Output:** Inteligencia Sensible Verificada Políticamente ("Oye MetodologIA, no pongas 600K, ellos desconfían de promesas mayores a 200K, modérate a 300K para que sea Tratable").

### 7.5 — Preparación Asimétrica de la Respuesta del RFP Combinado

**Acción:** El AE usa la data del R05 para incrustarla violentamente en su Propuesta R06 Final Oficial que enviará a Compras (Procurement). Ya no son "Estimaciones", es "Métrica Dura Comprobada Empíricamente en su propio Suelo".

**Output:** Deal B2B casi unkillable.

### 7.6-7.10 — [Afinar el guión del Speaker Principal, Ensayo de Objeciones cruzadas Financieras ("¿Y si la adopción total no es como en el piloto?", etc.), Almacenamiento seguro del Activo IP de la Consultora (No cederle nuestras librerías internas como evidencia en el Reporte), Formateo estético del reporte bajo estándar Corporate The Agency, Inyección de adrenalina del equipo comercial ("Señores, el piloto voló, tenemos la licitación").]

---

## 8. Validación y Calidad (QA)

- [ ] Prevención del 'Zombie Pilot': Un error gigantesco del área técnica en B2B Corporate es extender emocionalmente los Pilotos Gratuitos / Pagados Baratos. El cliente miente diciendo: "Sabes qué, mi Gerente no pudo verlo bien y me pidió otros 15 días gratis para terminar de convencerse". FALSO. Quieren free consulting eternizado. QA estricto: El Piloto se APAGA automáticamente en las fechas trazadas en el SLA. Si no lo vieron, lástima. El dolor de perder el sistema es lo que los hace obligar a Compras a firmar Contrato Base Multi-Anual R08.
- [ ] Bloqueo del 'Súper-Reporte Incomprensible': Prohibido enviar documentos de 55 páginas de código y analítica de datos a un CFO. El QA del VP Sales debe destruir el documento si no se entiende en los primeros 3 minutos. Regla Corporate: A mayor rango jerárquico del cliente receptor, menos palabras, más números grandes y proyecciones en % y US$.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Baseline Signed Agreement | PDF Form | CRM B2B Hub | Enterprise AE |
| Log de Grupo de Control Beta | Analytics Tracking | BI / Architecture | Architect |
| 'The 3-Slide' Exec Summary | C-Level Deck | G-Drive Account | Architect + AE |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [06-responder-rfp-propuesta-tecnica-economica](../proposal/estructurar-oferta/sop-06-propuesta/06-responder-rfp-propuesta-tecnica-economica-ritual.md) O saltar a R07 The Pitch si el RFP de Papel ya había sido entregado crudo.
- **Condición de handoff:** El Arquitecto Solucionador de MetodologIA desciende del barco del Piloto sudado pero victorioso. El prospecto VIO la magia operando dentro de su ecosistema caótico y no quiere volver a la Edad de Piedra. La Data empírica C-Level Readiness está terminada y guardada. Se pasa el Batón Nuclear de vuelta a Ventas Enterprise AE para insertarlo en el Documento Burocrático Formal, para blindarlo con acero financiero y rebotarlo contra Producción en el RFP final.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Adopción Sandbox Beta | > 85% Activity Ratio | 🟡 |
| Win-Delta Ahorro/Ganancia | > 15% vs Baseline Viejo | 🟡 |

- **NEXT:** `empresas-corporate → 06 → responder-rfp-propuesta-tecnica-economica`
- **BLOCKERS:** `Problemas en Integración Exógena del Sandbox (Ej. La compañía Target usa un Active Directory Arcaico y legal prohíbe VPN Inbound para los Arquitectos de MetodologIA reventando el SLA de prueba por pura traba burocrática cibernética del corporativo de ellos).`

---

## Modal 10x: "El Destilador de Datos C-Level Corporativos" (Prompt Pro)

**Use case:** Sobreviviste un Proof of Concept de 30 días operando con el Grupo de Control de la Mega Empresa. Tienes 4 Excel brutales de data pura cruda con mil parámetros. El problema es que mañana tienes el Executive Readout con el Comité Directivo en videollamada y debes llevar 3 Slides hiper-asertivas en vez del vómito numérico. Y no se te ocurre cómo volver esos Excels "Insights Financieros de Negocio B2B".

```markdown
PROMPT:
"Actúa como un Top-Tier Management Consultant en McKinsey & Co. de Rango Board-Level y experto Data Storyteller.
Contexto: Nuestra firma [MetodologIA] acaba de terminar un Piloto Tecnológico B2B P2 (Optimización de Flujos Documentales con Agentes LLM). Operamos 3 semanas con el Área Alpha del Cliente.
Misión: Te brindaré el resumen de Data Pura del Piloto abajo. Transfórmalos en el Esqueleto Narrativo para mi PPTX C-Level.
Reglas:
1. Necesito SÓLO EL COPY hiper-dramatizado positivamente para Tres Láminas: (1) El Diagnóstico de la Crisis Actual Confirmada. (2) El Shock del Piloto (The Asymmetric Lift). (3) The Scaling ROI (Proyección a los 30 nodos a 12 meses vista para meter miedo a que NO dejarnos escalar es un harakiri corporativo local).
2. Usa lenguaje Financiero y Operacional Cortante B2B (EBITDA, Opportunity Cost, Headcount Redundancy). Cero "Tuvimos éxito porque el sistema es intuitivo".

[AQUÍ ANEXAS EL RESUMEN DEL EXCELSHEET DE LOS DATA PUNTOS DEL ALPHA VS BETA]"
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Corporate
> **Powered by:** MetodologIA Governance Protocol
