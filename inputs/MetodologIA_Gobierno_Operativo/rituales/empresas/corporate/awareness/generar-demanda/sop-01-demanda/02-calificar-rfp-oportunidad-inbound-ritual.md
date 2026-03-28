---
id: "02"

segmento: "empresas-corporate"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "02-calificar-rfp-oportunidad-inbound"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Enterprise Account Executive / Bid Manager"
- backup: "Legal Counsel B2B / VP Sales"
frecuencia: "por-evento (cada vez que un Corporativo manda un Documento de Licitación Masiva 'RFP' o un request inbound ciego)"
herramientas:

- "Matriz Dinámica Go / No-Go (Google Sheets Ponderado)"
- "Revisión Rápida de Compliance Legal y Riesgo Financiero"
- "CRM Deal Tracker ('RFP Evaluation Stage')"

entry-criteria:

- "Recepción formal de un Request For Proposal (RFP), Request For Information (RFI), u oportunidad Inbound Corporativa compleja de +50k USD."
- "Pliegos Técnicos / Bases del Concurso adjuntadas y firmadas por la Institución o Empresa."
exit-criteria:

- "Dictamen Formal del Comité Comercial (Go o No-Go)."
- "Si NO-GO: Declinación Elegante enviada a Procurement del cliente B2B."
- "Si GO: Equipo Puesto en modalidad de Bid/Proposal y deal avanzado al R03/R04 en CRM."

kpi: "RFP / Inbound Qualified Win-Rate (Target: Re-seleccionar o Filtrar agresivamente para lograr ganar el ≥25% de los RFPs a los que SÍ decidamos tirarle, abandonando o declinando el resto rápido)"
leading-indicators:

- "Tie-Score Inicial en Matriz Go/No-Go (Target >70 ptos base para avanzar)"
- "Tiempo de Toma de Decisión (RFI a Go/No-Go) (Target < 48 horas)"
riesgos-controles:

- riesgo: "Síndrome del Ciego (Llenar un RFP de 100 páginas que estaba amarrado ('Hardwired') para otra marca desde el inicio)"

  control: "The Insider Rule (La Regla del Infiltrado). Un mandamiento Corporate dice: 'Si recibiste el RFP el Miércoles pero no ayudaste a escribir el Pliego desde Enero, ya lo perdiste'. Si el RFP pide estándares que solo la Competencia A tiene nominalmente, es un engaño procesal. El Go-No-Go Matrix restará 500 puntos y forzará declinación inmediata, ahorrando 4 semanas de trabajo de ingeniería gratis perdido."

- riesgo: "Desangre de Preventas (Poner a 5 Arquitectos top a armar propuestas para proyectos basura Inbound)"

  control: "Descalificación Agresiva Inmediata (Kill it Fast). En empresas Corporate, la gente de ventas tiene que celebrar cuando mata rápido una oportunidad que no correspondía. Devolver tiempo operativo."

- riesgo: "El Complejo del 'Yes Man' del Vendedor (Agarrar contratos institucionales malísimos, bajo presupuesto y mil requisitos legales nocivos, solo por cumplir su 'Cuota del Quarter')"

  control: "Vetaje de Legal / Finanzas en el Go/No-Go Matrix. Si los tiempos de pago exigen Neto-180 días de cobro, el Bid Manager levanta bandera y asesina la propuesta por riesgo de tesorería, ignorando el llanto del AE."
evidencias:

- "Memo del Go/No-Go Evaluado Guardado en CRM"
- "Correo institucional de Aceptación/Declinación a Procurement"
- "Registro del Origen de la Demanda B2B ('Saber cómo nos encontraron')"
---

# Ritual: Calificar RFP / Oportunidad Inbound B2B — Empresas/Corporate (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Corporate
> **Objetivo:** Recibir un RFP o un Brief de Licitación Corporativa gigante parece una bendición financiera ('Wow, Empresa X quiere comprarnos 500k'). Típicamente, el 80% son trampas corporativas: o te usan como relleno legal para justificar comprarle a su amigo de siempre (Vendor #3 Requerido por Compliance), o el alcance te quebrará vivo en la entrega. El R02 es la Muralla de Fuego donde el AE debe sacar sus instintos más psicópatas para **Descalificar**. Si decides entrar ('GO'), es para mandar tropas y armamento entero.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** El momento en que un Request for Proposal (.PDF, Link a Portal B2B SAP, Portal de Compras del Estado, Licitación Privada) aterriza en un inbox de Directivos o Vendedores.
- **Pre-ritual:** ¿Tenemos a mano La Matriz de Ponderación (Go/No-Go Tool)? Evaluar pliegos al ojo ('Yo creo que sí la hacemos') es la receta madre de la quiebra consultiva corporativa.
- **Contexto:** En B2B Básico, el vendedor trata de convencer de entrar al trato. En Corporate B2B, Procurement (Compras de las empresas gigantes) manda un Brief de 50 hojas diciendo "Si no cumples el 99% de esto, pierdes". Y mandan esto a 8 agencias más. Entrar sin inteligencia previa o contactos laterales (C-Level Sponsor) es una apuesta de casino donde la caja siempre gana.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Alinear al Bid Committee (Comité de Licitaciones) para escanear en tiempo récord los requerimientos técnicos y legales del Corporativo, asignarles un puntaje numérico paramétrico de Riesgo vs Probabilidad de Victoria, y matar la oportunidad antes del cierre del Viernes si no es idónea, salvaguardando los recursos humanos de Preventas de la agencia.
- **Definición de Éxito (DoD):**
  - [ ] RFP Leído en su totalidad (Incluyendo Anexos T de Penalidades Ocultas).
  - [ ] Ejecución Punitiva de la Matriz (¿Calificamos? ¿Queremos calificar?).
  - [ ] El Bid Committee asiente unánimemente la orden (GO o NO-GO).
  - [ ] Notificación formal subida a plataformas del cliente.
- **Definición de Éxito del Corporate Prospect (Punto ciego):** "Esta firma MetodologIA declinó con una elegancia y lógica financiera tremenda nuestra invitación de 1 Millón. Dijeron 'Su ecosistema de pagos es asimétrico al estándar de nuestro talento'. Qué nivel de seriedad, quiero contratarlos en el futuro directo".

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | VP of Sales / CEO | El Guardián del Tesoro. El único que autoriza a gastar miles de dólares de HH (Horas-Hombre) armando la propuesta |
| **Responsible** | Enterprise AE | Bid Manager. El orquestador que lee el desastre legal y llena la Matriz Ponderada inicial |

| **Consulted** | Finanzas / Legal | Los Centinelas de los Ratios Netos. Vigilan si los "SLA de penalidad por atraso" de la Empresa X nos pueden llevar a la quiebra técnica |
| **Informed** | Célula Técnica (Delivery) | Preventas que está estirando bajo perfil para armar la solución de Arquitectura del RFP en R06 si se dice GO |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Los Documentos Pliego Bases y Condiciones (PDF / XML) completamente descargados bajo estricto sigilo (NDA Interno).
- [ ] La Matriz de Calificación Cuantitativa (Excelsheet). Parametrizada a 5 vectores críticos.

---

## 5. Ejecutar — Parte 1: El Radar Forense y el 'Triage' del RFP

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Alarma de Caza / Descarga Oficial

**Acción:** AE detecta Entrada RFI/RFP. O Inbound Web. AE inscribe la oportunidad formalmente en Hubspot e inicia reloj de 48 Horas máximas para el 'Triage'.

**Output:** Oportunidad Trackeada Formal ('Status: Evaluating').

### 5.2 — Verificación de Fuego Legal (Fatal Flaws 1)

**Acción:** Legal (o AE entrenado) va a Cláusula de Pagos, Multas y Cesión de Propiedad Intelectual. Si dice "El Proveedor cede 100% de IP o Pagos a Neto-180": Bandera Roja Letal (Auto-Kill).

**Output:** Escape Inmediato al Laberinto de Contratos Tóxicos Industriales.

### 5.3 — The Inside-Job Verification (Fatal Flaws 2)

**Acción:** "Requisitos Técnicos". AE lee. Si el requerimiento técnico pide certificaciones de un software X que no tenemos, pero nuestra Competencia sí tiene (Wire-framing), significa que ellos redactaron el RFP con Procurement del cliente hace meses. El Concurso está amañado tecnológicamente. Auto-kill.

**Output:** Mitigación de Pérdida de Horas Administrativas (No seas el "Caballo de relleno").

### 5.4 — Ejecución de Matriz Objetiva y Vector de Poder

**Acción:** LLenar Matriz: Score de ICP (1-20), Score de Timing Comercial (1-20), Score de Red de Contactos Internos C-Level en la Cuenta (1-20). Si conocemos al de Tecnología 20 Ptos; no conocemos a ABSOLUTAMENTE NADIE = 0 Puntos. Margin Estimado (1-20). Total / 100.

**Output:** Verdad Algorítmica B2B expuesta.

### 5.5 — Estructuración de la Decisión del Triage

**Acción:** Score < 65: No-Go. Score 65 - 75: Marginal (Debe autorizar CEO). Score > 75: Go Total (Destinar Armería Pesada y todo el equipo H2H).

**Output:** Directriz pre-comité preformada.

### 5.6-5.10 — [Análisis rápido de credenciales del cliente en Buró de Crédito industrial o Reputación GTM (¿Tienen fama de demandar proveedores?), Búsqueda cruzada de la Agencia para ver cuántos recursos tenemos amarrados este mes preventivamente, Preparar la Lámina Resumen para la Junta de Comité Exprés, Verificar fecha oficial 'Deadline de Dudas y Clarificaciones del RFP']

---

## 6. Ejecutar — Parte 2: Ceremonia Flash ("The Bid Committee")

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Apertura Táctica de Sesión (15 min Máximo)

**Acción:** Llamada con Finanzas, Tech Lead, AE y Dirección. AE abre: "RFP de Logística Delta. Nos invita a 1.2M de Presupuesto. Nuestra Matriz dictamina SCORE: 60 - Marginal Tendencia Abajo."

**Output:** Neutralidad de Ego lograda preventivamente en mesa chica.

### 6.2 — Proyección del Diagnóstico

**Acción:** AE explica: "Buen margen, pero perdemos porque no conocemos a NADIE dentro que nos sople el budget de competencia, y el Anexo T pide multas agresivas si nos pasamos 1 semana del cronograma".

**Output:** La tensión decisional puesta al centro.

### 6.3 — La Pregunta Letal del CEO

**Acción:** El dueño de los recursos pregunta: "¿Alguien más cree que esta es *Muestra Lucha* (Our fight) de verdad, o nos están llamando a llenar bulto al vendor list corporativo de ellos?"

**Output:** Check de instintos colectivos (The Wisdom of Crowd).

### 6.4 — Fallo Soberano y Veredicto Final

**Acción:** Todos dan 'Pulgar Abajo' O todos dan 'Pulgar Arriba, metamos 4 personas de guardia a redactar'.

**Output:** Alineación Implacable (Una vez decido, no hay arrepentimiento retroactivo).

### 6.5 — Formalización Comercial / CRM Update

**Acción:** Hubspot Update Status. RFP = `Killed - No Go` OR `RFP - GO APPROVED`.

**Output:** Higiene Forense Intacta.

### 6.6-6.10 — [Si es GO: Asignación inmediata del Capos de Células que van a empezar a escribir módulos, Programar la reunión 'Discovery Inverso' (Tratar de saltar fuera de las normas del RFP contactando a algún líder corporativo para buscar su Pain R03), Si es GO: Asignar un 'Legal Bid Manager' para desmenuzar las trampas, Cierre Rápido de sesión, Retomar Operaciones normales del piso GTM]

---

## 7. Ejecutar — Parte 3: Comunicación Externa y Posicionamiento de Estatus

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Escenario A: Ejecución Táctica NO-GO 'El Rechazo C-Level'

**Acción:** AE redacta carta directiva formal de baja al Procurement del Cliente. No poner excusas de cobardía (No poner 'No pasamos sus bases'). Poner la verdad elitista: "Tras analizar la Matriz de Alcance, actualmente nuestros ingenieros y C-Levels están asignados 100% a proyectos donde la gobernanza ética compartida mutua coincide al milímetro con las de los clientes. Observamos asimetrías de arquitectura en su anexo. Elegimos ceder el asiento a firmas más volumétricas esta vez. Saludos The Agency."

**Output:** Declinación de Altísimo Posicionamiento (Psicología Inversa: Te volverán a seguir luego por la brutal arrogancia positiva en defender calidad).

### 7.2 — Escenario B: Ejecución de Entrada (RFP Go)

**Acción:** El AE manda correo / portal de aceptación asertivo. No sumisamente complaciente. "Estimado Comité de Compras. Confirmamos la Intención Incondicional de participar en el Bloque. Mando adjunta Carta de Confidencialidad Inicial".

**Output:** Asentamiento Jurídico / Activación de Fuego en Ecosistema de Adquisición.

### 7.3 — Maniobra Lateral de Exploración Multivía B2B

**Acción:** Si se dijo SÍ. El AE tiene estrictamente prohibido dedicarse únicamente a llenar Pdfs administrativos en silencio ciego las próximas semanas. Esa misma tarde, entra por LinkedIn (Mapeo), caza a los Vicepresidentes dueños que usan el proceso y busca contactarlos (Ir al R03/R04 The Discovery Process) para obtener inteligencia asimétrica NO escrita en el pliego aburrido RFP de Procuramiento.

**Output:** Ventaja Injusta de Propuestas Corporativas.

### 7.4 — Consolidación de Inteligencia Exógena

**Acción:** La agencia extrae información (El Scope de la licitación y el Budget) para almacenarla con fines de data y analítica (Poder saber cuánto cobra nuestra competencia y cómo se mueve el mercado de ese Vertical Pyme Automotriz para la base de datos corporativos de la Agencia).

**Output:** Benchmark Data Actualizada por Gratis.

### 7.5 — Re-Inicio de Motor en Previas Fases u Avance

**Acción:** Flujo cerrado R02.

**Output:** Terminación del Triaje en T-48 horas impecables.

### 7.6-7.10 — [Archivar los RFI perdidos en carpetas 'Killed Bids' por si en 2 años vuelven a licitar la misma cosa saber por qué los matamos moralmente atrás y si modificaron la cláusula asesina, Felicitar la resiliencia del equipo de ventas ante soltar una torta de pastel tóxica demostrando que en B2B es vital tener sangre fría, Cierre de Operaciones Táctica Bid de Fase 1]

---

## 8. Validación y Calidad (QA)

- [ ] Bloqueo del Optimismo Infundado en el Enterprise AE: Los vendedores comisionan por vender. Su instinto humano buscará SIEMPRE darle "GO" a todos los RFPs del Universo, torciendo la Ponderación en el Excel (Score) poniéndole falsos treintas porque "siente de corazón que sí pueden entregarlo". Es tarea de Operaciones y de CEO cruzar la validación de manera draconiana. El optimismo quiebra agencias de consultoría serias.
- [ ] Muerte por Parálisis de Respuesta RFP Burocrático: Llegó el Viernes, pasó una semana y aún el Triage del Go/No-Go no funciona en Hubspot y nadie declinó. Consecuencia: El lunes el AE envía desesperadamente de relleno un PDF asquerosamente mal escrito a procuramiento para "No quedar mal no contestando", bajando el valor de la marca del prestigio Corporate (R01). Tiempo de respuesta de Triage jamás superando D+2 máximo.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Matriz Ponderada Go/No-Go | Base Calc/Datos Puntos| Deal Hub B2B | Bid Manager AE |
| Declinación o Aceptación | PDF Jurídico | Procurement Client | Legal/AE |
| CRM Deal Updated| Flag Move to Killed| Pipeline Midmarket | AE / Revenue |

---

## 10. Cierre y Handoff

- **Siguiente ritual:**
  - [03-calificar-pain-institucional-rfp](../03-calificar-pain-institucional-rfp-ritual.md) SI dijiste 'GO' (Inicia la inteligencia asimétrica saltándote procuramiento burocrático para desnudar la matriz de problemas operacionales).
  - Fin del flujo / Churn SI dijiste 'No-Go' asertivo.
- **Condición de handoff:** Has protegido como Leones los escasos e hiper valiosos recursos de Preventa y Consultoría de la cuenta de Licitaciones tramposas. Tu Pipeline Corporate está limpio. Sabes en qué guerra vale la pena sangrar meses enteros de propuestas inmensas de 80 páginas operativas. Todo el comité asintió su pacto de sangre de llevar el trato 304 al final, pase lo que pase.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Tiempo Decision 'Triage' | < 48 Hrs SLA | 🟡 |
| Win Rate Proyectado GO | >45% Confidencia de Pitch| 🟡 |

- **NEXT:** `empresas-corporate → 03 → calificar-pain-institucional-rfp`
- **BLOCKERS:** `Problemas en comisiones perversas dictadas al equipo comercial que obliguen falsamente al Representante a coger todas las demandas locas bajo amenaza de castigos operativos por 'Poco trabajo', corrompiendo la matriz y el Quality Assurance base Institucional del Triage GTM.`

---

## Modal 10x: "El Detector Quirúrgico de Trampas del RFP" (Prompt Pro)

**Use case:** Son las D-12 Hrs. Acabas de recibir un "Request for Proposal" de 45 páginas y con tu carga mental de la agencia no tienes el silencio cognitivo para leértelo hoy y poder tener lista la Matriz Go/No-Go para la junta del Comité Licitador de Mañana Temprano. Usas la asimetría algorítmica. Le tirarás el Documento Texto Entero al LLM con un Contexto Operacional draconiano para que él señale las banderas rojas.

```markdown
PROMPT:
"Actúa como un Vicepresidente B2B Bid Manager Paranoico y un Consultor de Contratos Enterprise de Licitaciones de Alta Gama en [Tu Industria].
Contexto: Nuestra firma [MetodologIA] atiende corporativos, cobramos alto y requerimos 50% anticipo y firmas Ágiles Asíncronas. Me acaba de caer el documento Base Licitador RFP adjunto de Manufacturas Omega y quiero que evalúes la viabilidad si tiene 'Hardwires' (Trampas insertadas donde claramente lo escribió otra firma competidora amiga del comprador).
Misión: Pasa estas 45 Páginas y devuelveme ÚNICAMENTE una Tabla Cruda (No-Mercy Table) con TRES Columnas.
[1] El requerimiento sospechoso exacto o la Bandera Roja.
[2] ¿Por qué eso es nocivo financieramente / Técnicamente para una consultoría ágil Top Tier como nosotros? 
[3] Veredicto Inversionista: Go, No-Go o Pídele Extensión al cliente con esta táctica.

[AQUÍ ANEXAS EL FULL TEXT RFP B2B O CARGAS PDF DE PROCURADURÍA JURIDICA CORPORATIVA]"
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Corporate
> **Powered by:** MetodologIA Governance Protocol
