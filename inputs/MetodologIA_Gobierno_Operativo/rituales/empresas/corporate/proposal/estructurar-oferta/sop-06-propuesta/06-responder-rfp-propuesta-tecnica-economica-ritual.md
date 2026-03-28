---
id: "06"

segmento: "empresas-corporate"
journey: "proposal"
proceso: "estructurar-oferta"
sop: "sop-06-propuesta"
ritual-slug: "06-responder-rfp-propuesta-tecnica-economica"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Bid Manager / Enterprise AE"
- backup: "Solutions Architect / CFO"
frecuencia: "por-evento (Cierre de calendario formal de recepción de documentos de un Request For Proposal o Post-Piloto)"
herramientas:

- "Base de Conocimiento RFP (Loopio / AI RFP Auto-responder)"
- "Plantillas Maestras Corporate (Word/PDF Formal Institucional)"
- "Calculadora de Riesgo de TCOO (Total Cost of Ownership & Operations)"

entry-criteria:

- "Evaluación de Pain Completa (R04) y Data del Piloto de Robustez Documentada (R05)."
- "Comité de Bid Management dio el GO Asintótico en el R02 previamente."
exit-criteria:

- "El 'Bidding Package' completo está depositado en el portal B2B del proveedor/cliente."
- "Se incluyeron los Anexos de Garantías y Casos de Éxito de 3ra Parte (Referenciadores)."
- "Se logró blindar el Precio Premium contra regateos base gracias al Anclaje Técnico."

kpi: "RFP Progression Win-Rate (Target: ≥40% de las Propuestas enviadas son llamadas a Short-list R07 (Terna finalista), dejando morir al 60% que solo pedían 'Tres cotizaciones de regla')"
leading-indicators:

- "Porcentaje de respuesta T-24 del Deadline Oficial (No enviar propuestas quemando gomas el último minuto de cierre corporativo)."
- "Reducción en Correcciones Financieras Internas (Finanzas aprueba Modelo al 1er pase)."
riesgos-controles:

- riesgo: "Síndrome del Robot Administrativo 'Copy/Paste' (Rellenar el formato del RFP del cliente corporativo copiando textos genéricos de la página web de la firma que no hablan del dolor del cliente)"

  control: "La Ley de 'The Hook In Every Box'. Por más aburrida que sea la sección C-2 de 'Normas Técnicas' en el RFP, debes inyectar un destello del 'Pain Documentado' en R04 para que el evaluador despierte de su propia inercia burocrática."

- riesgo: "Muerte por Comoditización del Precio (Terminar en una hoja de Excel gigante donde Procuramiento del cliente simplemente nos pone al lado de 3 firmas mediocres y elige al Postor más Bajo)"

  control: "Cambiar Las Reglas Escritas (The Disruptive Baseline). Prohibido rellenar solo con precios en el template del cliente. Adicionalmente de cumplir su tonto archivo base, el Anexo de MetodologIA incluirá el 'Total Return on Investment Matrix', re-encuadrando el precio barato de la competencia como 'Un agujero negro de Costo oculto'."

- riesgo: "Descuadre del Escuadrón (Legal no leyó la sección técnica e incluyeron algo que viola un acuerdo en la propuesta Económica; la bomba estalla en Auditoría pre-firma R08)"

  control: "The Unified Bid Freeze. Queda congelada y prohibida la entrega de la propuesta B2B al cliente si no fue revisada en sala unificada por 30 mins el día D-1 por Legal, Arquitectura y Dirección."
evidencias:

- "Macro Documento Consolidado PDF (Bidding Package B2B)"
- "Matriz Financiera de Márgenes de Resguardo Interno (Venta Real vs Coste Subyacente)"
- "Constancia de Recepción Válida del Portal Gubernamental o Corporativo B2B"
---

# Ritual: Responder RFP con Propuesta Técnica y Económica B2B — Empresas/Corporate (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Corporate
> **Objetivo:** 'Un RFP B2B no se gana en el precio. Un RFP se gana demostrando que TÚ ERES la opción con Cero Riesgos Políticos para el Mando Medio (Procurement) y Alto (C-Level). Si ellos confían que con MetodologIA no serán despedidos si el macroproyecto multi-millonario sale mal, te darán a ti su dinero, incluso si cobramos un 30% Premium sobre el promedio comercial'. El R06 es el ritual del Formateo de la Percepción Pura y Dominancia en Papel.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Semanas 3-4 del proceso Corporativo. Después de haber extraído los secretos políticos en el Discovery (R04) y comprobado hipótesis de fuerza en R05. Tienes T-Minus 4 Días antes de que cierre la postulación en portal ciego.
- **Pre-ritual:** ¿Recibimos todas las "Dudas y Respuestas Cruzadas Oficiales" que Procuramiento le mandó a todas las firmas competidoras que publicaron sus propios cuestionamientos?
- **Contexto:** En B2B Midmarket/Enterprise, rara vez pasas de la Discovery a "Aquí te la envío al correo general, léela e impulsa el contrato". No. Tienes que formatearla en Las Reglas del Cliente, que son horripilantes anexos de Compliance ISO, Prácticas, Acuerdos, Resúmenes Ejecutivos y Desgloses económicos por FTEs (Hora/Hombre).

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Ensamblar y Orquestar una Propuesta B2B Modular Magistral, donde el núcleo Técnico enamore al Equipo Usuario, el núcleo Económico justifique el ROI al CFO, y la forma pase de tilde todos los absurdos bloqueos de Procurement e IT.
- **Definición de Éxito (DoD):**
  - [ ] El RFP y sus requerimientos legales de forma cumplidos al 100%.
  - [ ] El Executive Summary B2B redactado y aislado (Página 1 y 2).
  - [ ] Casilleros Técnicos vinculados a The Pains Reales (Insight Asimétrico B2B).
  - [ ] La Propuesta está Subida / Consignada formalmente al Bid-Box Corporate o Portal Ariba de SAP Cliente antes de la Hoja de Corte en Frio.
- **Definición de Éxito del Corporate Prospect:** "Miren chicos del Comité evaluador, recibimos 5 PDFs. Tres no leyeron el anexo D sobre gobernanza y los rechazo. Miren el de MetodologIA, de plano en la página 2 ya me resolvieron el problema de flujo de caja que tuvimos en la junta... esta gente compite en otra liga y ni los hemos vuelto a llamar."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | VP of Sales / CEO | Revisor final de Macro-Riesgos. (Autoriza el Margin Asignado a Venta, no podemos perder dinero por ganar el deal). |
| **Responsible** | Enterprise AE / Bid Manager | El Ensamblador y Redactor Político de Alto Nivel B2B Empresarial |

| **Consulted** | Technical Architect + Legal | Proveen la masa técnica de las capacidades corporativas de la agencia (Data, Security, Cloud Integrations), y libran el check jurídico |
| **Informed** | Finance / RevOps | Guardan copia del Pipeline Total para poder hacer proyecciones de Quarter B2B (Revenue Projections de la firma). |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Resultados del Discovery Pains (R04) + Resultados Paramétricos del Piloto PoC (R05).
- [ ] La matriz Maestra de Insumos del Cliente Abierta frente al Bid Manager.
- [ ] Base LLM Entrenada en Documentos Corporativos Históricos listos para reciclar arquitectura técnica rápida.

---

## 5. Ejecutar — Parte 1: El Executive Summary y Blueprint Técnico

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Redacción de "El Único Documento que sí Leen" (Executive Summary)

**Acción:** AE escribe las 2 Páginas Base enfocadas puramente al Pain y CODN (Cost of Doing Nothing) descubierto en el R04. Se ancla la promesa superior aquí.

**Output:** El 'Hook' Presidencial (Arma Biológica C-Level).

### 5.2 — Mapeo de Requisitos Formales de Pliego

**Acción:** AE distribuye el Trabajo pesado RFP de 50 preguntas. "Preguntas de ISO27000: Las contesta el Tech. Las Fiscales y Normativas: Legal. Las de Gobernanza IA Consultiva, las hago yo las AE".

**Output:** Silos de redacción delegados.

### 5.3 — Relleno Táctico con Modelos Base (LLM/Loopio)

**Acción:** Usar repositorios / AI tools para auto-responder el 80% de preguntas inútiles del corporativo ("Cuántos metros cuadrados tiene su oficina"). Rápido, pulcro.

**Output:** Eliminación de fricción de tiempo de propuestas masivas.

### 5.4 — Inyección Asimétrica de Calidad Consultiva (Secciones Técnicas)

**Acción:** AE audita la respuestas Generadas. Cuando un requisito pide "Cronograma de Ejecución", en lugar de solo listar Fechas, el equipo diagrama "Las Zonas Críticas" de fricción y dice CÓMO las sobrepasarán usando Inteligencia Artificial.

**Output:** The Ghost of Seniority impregnado en el PDF Administrativo.

### 5.5 — El Re-encuadre del Riesgo Arquitectónico

**Acción:** Architect añade Sección de Seguridad B2B (Si el Corporativo es Institucional, le asusta la nube). Documentar cómo el Framework Sovereign MetodologIA está encapsulado en SOC2 local.

**Output:** Aprobación ciega del área de Riesgo / IT del cliente.

### 5.6-5.10 — [Alineamiento de casos de uso anónimos pero espejo ('Casos Globales Fortune 50 parecidos al suyo'), Incorporación del CV y Resumen de los miembros 'Estrella' que integrarán el Kickoff R09 (Corporate adora comprar títulos nobiliarios del personal de su firma proveedora), Verificación del control de Cambios (¿Procuramiento cambió un archivo anexo ayer en la noche? Mapearlo antes del ensamble), Consolidación del Archivo Maestro The Proposal Draft T-48]

---

## 6. Ejecutar — Parte 2: La Blindadura Financiera ('The Commercial Bid')

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Formulación Punitiva de The Margin

**Acción:** CFO + Director corren la matriz interna ("Ok, El alcance técnico requiere 5 consultores 300 Hrs... su costo quemado GTM interno nuestro es $30K USD, el Gross Cost P&L, tenemos que lanzarlo con MarkUp de Firma de Riesgo, y amortizador de Legal corporativo... Sale Mínimo $85K Floor, y un Premium Target $110,000USD. Anotado P&L").

**Output:** Falsa percepción mitigada (No cobrar barato para entrar).

### 6.2 — Alineación a la Estructura de Procurement (Format Rule B2B)

**Acción:** Si el cliente en el RFP dice "Solo quiero Precios Fijos (Flat-Rate)", y NO admite T&M (Time and Materials)... El Bid Manager obedece PERO mete las limitantes del Flat Rate en piedra ("Hasta N iteraciones máximo en Scope cerrado").

**Output:** Cumplimiento vs Cuidado Fiduciario Combinado B2B.

### 6.3 — La Trilogía de Opciones Corporativas (Opcional - Anchor Pricing B2B)

**Acción:** Si el RFP deja libertad. AE no presenta 1 precio. Presenta Tres Ofertas B2B Escalonadas. Tier-3 Táctico, Tier-2 Transformation (El que queremos vender realmente que coincide su pain R04), Tier-1 Imperial Alliance (Súper Caro para forzar anclaje).

**Output:** Fenómeno de Señuelo Psicológico Corporate ('Goldilock Pricing').

### 6.4 — Diseño de Condiciones de SLA

**Acción:** Legal pone asteriscos robustos B2B en el Contrato Base. "Firmamos estos precios pero si sus equipos se desaparecen por vacaciones, MetodologIA cobra stand-by. Multiplica por D+21 de penalidad mutua".

**Output:** Resguardo Operacional Táctico de Cuentas Agresivas.

### 6.5 — Compilación del TCO Económico

**Acción:** Elaborar lámina final de "Resumen Financiero del ROI y P&L Retorno".

**Output:** El Regalo de Reyes al CFO Evaluador del proyecto.

### 6.6-6.10 — [Verificación final cruzada de Ceros Económicos ("Revise ese 0 de más, no cobramos 1 Millón, son 100K"), Preparación del Archivo Excel nativo de precios (Muchas procurement corporate exigen excel destapados no pdfs de precios), Anclaje de bonos de Descuento vs Pago asertivo ("Podemos ceder un -4% SI y SÓLO SÍ hay Pago Neto a 15 y no 60 de Corporación").]

---

## 7. Ejecutar — Parte 3: 'El Bidding Freeze' o Ensamblaje Crudo

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — El Bid Freeze T-24 Horas

**Acción:** La guerra literaria se estanca. Call de 20 Mins. Todos los jefes de B2B MetodologIA miran el PDF Final en pantalla.

**Output:** Identificación final de Inconsistencias (Quality Bid).

### 7.2 — Verificación Formal de Checklist Procurement

**Acción:** Bid Manager agarra el PDF Aburrido de Instrucciones de cliente y marca físicamente. "Documento firmado de Anticorrupción Institucional... Listo." "Anexo Certificado Bancario Internacional... Listo."

**Output:** Reducción Categórica de Rechazo Formal (Si no pones un papel de estos, te ELIMINAN de manera automatizada aunque seas McKinsey).

### 7.3 — Cosmética y Diseño Brand 'MetodologIA Sovereign'

**Acción:** Exportar Todo bajo The B2B Template de Alta Gama. Cero estridencias, alineación Helvetica / Inter Pura. Colores Dark.

**Output:** 'Premium Feel Perception Transfer' al Evaluador del Comité.

### 7.4 — Subida y Consignación Digital (El Botón Verde)

**Acción:** The Upload Day. Entrar al Portal Ariba o enviar Mail Encriptado a la Junta 12 Hrs completas antes del vencimiento.

**Output:** Control y Calma Operativa de la Agencia. Evita el "Se nos cayó el internet a la 23:55 de la noche, perdimos el negocio de 1 Millon".

### 7.5 — Documentación de Repositorio de Sabiduría Asimétrica

**Acción:** Archivar automáticamente esta hermosa propuesta al Hub de LLM o Base General para reciclarla en RFPs de cuentas idénticas el año que viene en otro corporativo similar en la Vertical que aplique.

**Output:** Rango de Operatividad Industrial Incremental de la Consultoría (Snowball effect proposal making).

### 7.6-7.10 — [Comentario por WhatsApp al 'Champion' Mapeado que la bomba ya está mandada y pregúntele si tienen sesión hoy, Updatear Base CRM Financiera Típica, 'Descansar Batallones Operativos a la espera de Pitch', Reclasificar Oportunidad Formal B2B (Mover a 'In R06 / Technical Submitted Review Proposal'), Pre-Alerta para R07 'The Shortlist Call Pitch'.]

---

## 8. Validación y Calidad (QA)

- [ ] Bloqueo del Descuadre de Promesa vs Equipo Técnico: Un error recurrente es que Ventas redacta cosas en el Bid Document Corporate que la herramienta MetodologIA no domina ("Sí, logramos integración C++ en Legacy Systems en 3 días"). QA Estricta: Un Director de Tecnología B2B o el Head Arquitecto TIENE que firmar de Okey la sección "Alcance Técnico" impidiendo que una Propuesta enviada se vuelva la tumba operativa en el R09 Onboarding B2B.
- [ ] Muerte Administrativa: Fallar en enviar "La copia del registro fiscal actualizada o la fianza de cumplimiento al 10%" por creer que no importaba que era trivial. Procurement Corporativo ES trivial. O juegan su juego con papeles exactos en RFPs formales gigantes, o ni los leen y los botan. QA es 'El Papel en Caja'.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Core Bid Package | The Executive B2B PDF | Base RFP Folders B2B | Bid Manager AE |
| Resguardo Matemático Margin| Hoja Calc de Gross y Cost| CRM B2B Hub | AE / CFO |
| Acuse Jurídico o Digital de Recibo| Correo de Procurement | CRM B2B Hub | AE |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [07-presentar-ante-comite-evaluacion](../sop-07-cierre/07-presentar-ante-comite-evaluacion-ritual.md). (El 'Shortlisting Call'. Te avisan si pasaste de la Pila de 15 Oferentes a Los Tres Top que van a ir a Defender El Trono de Hierro presencialmente para Ganársela de cara frente a la Junta).
- **Condición de handoff:** El AE y el Squad MetodologIA han depositado una carga Nuclear y Legal. Tienen un documento que resume inteligencia, que duele a los tomadores de decisiones justos que tienen miedo en el comité B2B Corporativo, y que la matriz financiera blinda a la Agencia en Tiempos de Entrega Cerdos de los que hay que escapar o ganar jugosamente primas altas si se logra todo a tiempo.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Bidding Win Ponderado Interno | > 85% Conviccion Bid Board| 🟡 |
| Cumplimiento Format RFP | 100% de la Lista Exigible Check| 🟡 |

- **NEXT:** `empresas-corporate → 07 → presentar-ante-comite-evaluacion`
- **BLOCKERS:** `Problemas en los tiempos de elaboración donde los arquitectos consultivos en campo están hiper-ocupados y no envían insumos requeridos para los Bidders / AEs causando que las propuestas salgan delgadas y corporativamente asquerosas.`

---

## Modal 10x: "El Hacker de Resúmenes Ejecutivos B2B" (Prompt Pro)

**Use case:** Tienes construidas las 48 páginas aburridas de tu RFP, y todas son espectaculares a nivel de software/tecnología y consultoría. Pero sabes que el CEO Logístico Corporate que te va a firmar no pasará de la Página 2 (El Executive Summary). Estás bloqueado y todo lo que tratas de escribir suena al cliché ("Somos una firma de vanguardia..."). Debes llamar al LLM Corporativo para que agarre el Scope y Construya un Trueno Analítico Hipnótico.

```markdown
PROMPT:
"Actúa como un Top-Tier B2B Proposition Writer 'Bid Master' (Dominio Alto Corporate Licitaciones) y un Psicólogo Económico.
Contexto: Nuestra firma [MetodologIA] construirá una Plataforma Inteligente Multimodal para los Seguros AXXA B2B (Prospecto Corporate) por $700K USD. Ellos Pierden Hoy $4.5 MUSD anuales en la manualidad legal y operativa del 70% de las pólizas y el Comité quiere cambiar eso (Ahorrar Dinero). Aprobamos Discovery y Piloto el mes pasado. Toda la carne está.
Misión: Escríbeme puramente la Estructura para EL RESUMEN EJECUTIVO TÁCTICO B2B FRONT-PAGE de la Mega-Propuesta. 
Necesito que se estructure así y sea violento analíticamente para Procurement C-Level:
1. 'The Situation' (Demuestra que conocemos su sangre y su meta estratégica macro mejor que ellos basándote en la info que te paso debajo).
2. 'The MetodologIA Sovereign Advantage' (¿Por qué nuestro abordaje Asimétrico aplasta al 'Business As Usual' de las otras 3 agencias que compiten por esto, pero sin nombrarlos a ellos, solo demeritando sus capacidades genéricas logísticas en el ecosistema mundial?).
3. The Mathematical Promise (El resumen crudo de la tabla Financiera C-Level con ROI).

[AQUÍ ANEXAS RAW DATA DEL B2B CORPORATE DEAL DEL CRM CON LAS METRICAS DE PAIN DEL DISCOVERY]"
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Corporate
> **Powered by:** MetodologIA Governance Protocol
