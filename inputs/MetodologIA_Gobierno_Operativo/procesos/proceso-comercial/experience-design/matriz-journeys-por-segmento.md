# Matriz de Customer Journeys por Segmento — MetodologIA

> **Documento**: Matriz de Journeys (Journey Map Index) — Versión Mejorada 3.0
> **Versión**: 3.0 — Especificacion Completa de Segmentacion 2026
> **Fecha**: 2026-03-24
> **Dependencia**: Service Blueprint General v2.0

---

## 1. Supuestos de Segmentacion

Esta taxonomia de 7 segmentos responde a criterios estrategicos especificos. Es fundamental documentar POR QUE estos segmentos y no otros, y qué poblacion **deliberadamente excluimos**.

### 1.1 Razon de los 7 Segmentos Actuales

Los segmentos fueron seleccionados porque:

1. **Tienen pains y triggers diferentes**: No se puede usar el mismo messaging para un CEO enfrentando presion de board que para un estudiante perdiendo competitividad vs. pares.
2. **Requieren delivery differentiated**: F3 (Practica) para P2 (estudiante) es "bootcamp grupal virtual"; para P3 es "coaching 1:1 executive". El molde no sirve.
3. **Tienen WTP (Willingness To Pay) diferente**: P1 paga $200k-$800k COP; P3 paga $800k-$2.4M COP; P4 paga $0-$800k COP variable. Pricing universal no funciona.
4. **Tienen ciclos de venta diferentes**: P1 decide en 1-2 semanas; E3 en 8-16 semanas. Sales process diferenciada es obligatoria.
5. **Tienen density > 10% of TAM**: Solo incluimos segmentos que representan al menos 10% del mercado adresable. Evitamos "niche puro" no escalable.

### 1.2 Segmentos Deliberadamente Excluidos

| Segmento Potencial | Razon de Exclusion | Documento de Justificacion |
|---|---|---|
| **Freelancers** | Overlap 70% con P1 (Profesional en Transicion). No justifica SOP separada. P1 ya cubre freelancers que sienten estancamiento. | Ver sop-discovery-b2c análisis de mercado |
| **Retirees / Pensionados** | WTP muy bajo (<$100k COP), trigger intrinseco bajo ("no necesito para trabajo"), adhesion <5%. ROI campana negligible. | Analisis cohorte Q2 2025 |
| **Government Agencies** | B2B pero con procurement 16-24 semanas, presupuesto anual fijo, requiere compliance/auditorias que no tenemos. Risk > return. | Strategic exclusion — future opportunity |
| **NGOs / Nonprofit** | Presupuesto $0-$50k COP. Trigger "somos pobres" hace que no perciban valor de pago. Mejor cobrir via partnerships/scholarship. | Nonprofit strategy doc (separate) |
| **K-12 Teachers** | Nivel educativo diferente (F2 seria "basico basico"), WTP $0-$50k COP, ciclos anuales. School budgets complejos. No escalable. | Analisis educacion formal |
| **Medical / Legal Professionals** | Sobrerimunerados (WTP >$2M) pero con compliance regulatorio tan alto que excede nuestro scope. Mejor via alianzas. | Strategic focus — healthcare partnerships |
| **Pure hobbyists (sin aplicacion laboral)** | 0% de progresion a F3. Engagement metrics muertas. No discriminamos en la puerta pero no crean cohorte separada. | Behavioral data |

### 1.3 Poblacion No Alcanzada

- **Poblacion offline**: Sin acceso estable a internet (rural profundo, bandas bajas). TAM residual <3%.
- **Poblacion no hispanohablante**: Exluimos non-LATAM para simplificar (futura expansion).
- **Poblacion sin capacidad lectoescritura digital**: No alcanzamos (sin apoyo asincronico suficiente).

---

## 2. Criterios de Inclusion/Exclusion por Segmento

Para cada segmento, definimos filtros exactos, verificables y operacionalizables. Estos criterios se usan en:
- **Scoring de leads** (CRM/pipeline)
- **Ad targeting** (Meta, LinkedIn, Google)
- **Intake discovery** (validacion manual en F1)

### B2C — PERSONAS

#### P1: Profesional en Transicion

| Dimension | Criterio INCLUSION | Criterio EXCLUSION |
|---|---|---|
| **Edad** | 25-50 anos | <25 o >50 (ver P2, P4) |
| **Estatus Laboral** | Empleado, freelancer, o en proceso de cambio | Desempleado sin antecedentes; estudiante; jubilado |
| **Seniority** | IC (Individual Contributor), Team Lead, Senior (no C-suite) | Manager, Director, C-level (ver P3) |
| **Trigger Activacion** | Ha vivido 1+ de: despido, restructura, cambio tecnologico, estancamiento salarial en último 12 meses | No hay trigger visible; carriera estable sin presion |
| **Budget Disponible** | Self-funded o presupuesto personal $200k+ COP | Presupuesto 0 (estudiante) o solo corporativo |
| **Motivacion Primaria** | "Proteger/reinventar mi carrera" | "Curiosidad general" sin presion personal |
| **Presencia Digital** | LinkedIn activo (mín. 50 conexiones), Instagram o TikTok | Sin presencia; Facebook solamente |
| **Tipo de Rol** | Tech, marketing, ventas, RRHH, finanzas, operaciones, educacion | Medico, abogado, obrero, deportista (especialidades con compliance alto) |

**Score Inclusion**: Debe cumplir >=5 de 8 criterios.

#### P2: Estudiante Universitario

| Dimension | Criterio INCLUSION | Criterio EXCLUSION |
|---|---|---|
| **Edad** | 18-26 anos | <18 o >26 (ver P1, P4) |
| **Status Academico** | Matriculado actualmente en carrera pregrado/posgrado | Egresado; dropouts; estudiante de cursos libres |
| **Disciplina** | Carrera orientada a mercado laboral (Ing, Admin, Marketing, etc.) | Artes puras, deporte profesional, carreras <<6 anos |
| **Trigger Activacion** | Proche a tesis, practicas, busqueda de primer empleo, beca competitiva | Sin aplicacion academica o laboral proxima |
| **Budget Disponible** | Capacidad pagar $0-$200k COP (subsidios, cuotas, familia) | Presupuesto $0 y sin capacidad (hardship) |
| **Presencia Digital** | Instagram activo, TikTok, Discord academico, o comunidad LinkedIn | Sin redes; solamente correo universitario |
| **Motivacion Primaria** | "Ventaja competitiva vs. pares" o "aplicacion academica inmediata" | "Hobby futuro" sin urgencia |
| **Contexto** | En LATAM (zona horaria compatible, contexto economico) | Fuera de LATAM (timezone, moneda, context gaps) |

**Score Inclusion**: Debe cumplir >=5 de 8 criterios.

#### P3: Ejecutivo / C-Level

| Dimension | Criterio INCLUSION | Criterio EXCLUSION |
|---|---|---|
| **Edad** | 35-60 anos | <35 (ver P1); >60 (ver P4) |
| **Seniority** | C-suite (CEO, CTO, CMO, CFO, COO), VP, o Director con >5 reportes directos | Team lead <5 reportes; IC; estudiante |
| **Sector** | Cualquier sector B2B o B2C excepto Government/NGO | Government, NGO, militar |
| **Trigger Activacion** | 1+ de: presion board, competidores en IA, necesidad transformacion digital, succession planning en última 12 meses | Empresa estable sin disruption; lider no expuesto a board |
| **Budget Disponible** | Autoridad para gastar $800k+ COP sin aprobaciones multiples | Presupuesto limitado; debe justificar a board |
| **Presencia Digital** | LinkedIn activo con 500+ conexiones; articulos publicados o speaking | Sin LinkedIn; bajo profile publico |
| **Motivacion Primaria** | "Dirigir transformacion IA de mi organizacion" o "no parecer obsoleto ante board" | "Conocimiento personal" sin presion organizacional |
| **Time Availability** | Disponible para 4-6 horas/mes en programa (coaching 1:1) | Demasiado ocupado (<2 horas/mes promedio) |

**Score Inclusion**: Debe cumplir >=6 de 8 criterios. (Más exigente porque asimetria time/money.)

#### P4: Adulto Autodidacta

| Dimension | Criterio INCLUSION | Criterio EXCLUSION |
|---|---|---|
| **Edad** | 30-65 anos | <30 o >65 (ver P1, P3) |
| **Estatus Laboral** | Activo laboralmente o jubilado parcial (consultor, remoto) | Desempleado sin historico; incapaz trabajar |
| **Motivacion Primaria** | "No quedarme atras" o "curiosidad sobre IA" | Profesional con trigger urgente (ver P1) |
| **Education** | High school completo; no necesariamente carrera universitaria | Analfabetismo digital; sin capacidad lectoescritura |
| **Budget Disponible** | Capaz pagar $0-$800k COP (flexible, sensible a precio) | Presupuesto 0 absoluto (extrema pobreza) |
| **Trigger Activacion** | 1+ de: hijos usan IA, medios hablan, amigos mencionan, evento publico sobre IA | Sin exposicion; desinteres total |
| **Presencia Digital** | Facebook, WhatsApp activos; posible TikTok | Sin conexion digital; telefono solo |
| **Actitud Riesgo** | Openness a aprender; "quiero probar" | Desconfianza, "eso es para otros" |

**Score Inclusion**: Debe cumplir >=5 de 8 criterios.

### B2B — EMPRESAS

#### E1: Small Business (1-20 empleados)

| Dimension | Criterio INCLUSION | Criterio EXCLUSION |
|---|---|---|
| **Size** | 1-20 empleados verificables | >20 empleados; solopreneur puro sin perspectiva |
| **Tipo** | Startup, PYME, o emprendimiento establecido (<10 anos) con crecimiento potencial | Empresa familiar estatica; negocio de subsistencia puro |
| **Decision Maker** | Fundador/CEO que ejecuta y decide (misma persona) | Comites; requires matriz de aprobacion |
| **Sector** | Cualquiera excepto extractiva (minas, petroleo profundo) | Sectores altamente regulados (financiero estricto, salud) |
| **Trigger Activacion** | 1+ de: escalamiento bloqueado, manual labor >30% del tiempo, perdida de deals por velocidad, competencia usando IA | Operacion estable sin presion; decrecimiento |
| **Budget Disponible** | $200k-$2M COP anuales para learning/tools (justificable contra ahorro de horas) | $0 presupuesto formal; cash flow negativo |
| **Tech Affinity** | Usa herramientas basicas (Slack, WhatsApp, Gmail) | Resistance total a herramientas digitales |
| **Presencia Online** | Instagram, WhatsApp, sitio web basico | Sin web; sin social media |

**Score Inclusion**: Debe cumplir >=5 de 8 criterios.

#### E2: Enterprise / Mid-Market (21-200 empleados)

| Dimension | Criterio INCLUSION | Criterio EXCLUSION |
|---|---|---|
| **Size** | 21-200 empleados verificables | <21 o >200 (ver E1, E3) |
| **Madurez** | Empresa establecida (>3 anos), con procesos documentados, equipo especializado | Startup con procesos ad-hoc; empresa estatica |
| **Decision Maker** | 2+ de: Gerente General, Director Comercial, Director RRHH, CTO | Solo fundador; requiere comite > 5 personas |
| **Sector** | Cualquier B2B o B2C, excepto extraction/government | Extremadamente regulado (bancos tier-1); government; NGO |
| **Trigger Activacion** | 1+ de: pipeline lento, win rate <30%, inconsistencia equipo comercial, perdida de talento a competencia IA | Crecimiento organico estable; sin presion IA |
| **Budget Disponible** | $2M-$20M COP anuales para consulting/training/tools | Presupuesto adhoc solo; no presupuesto formal |
| **Ciclo Venta Expectativa** | Autoridad tomar decision en 4-8 semanas (negocios con RFP normales) | Requiere 12+ semanas; procurement super rigido |
| **Presencia B2B** | LinkedIn activo; articulos/webinars; reputacion en industria | Desconocida; sin presencia publico |

**Score Inclusion**: Debe cumplir >=6 de 8 criterios.

#### E3: Corporate (200+ empleados)

| Dimension | Criterio INCLUSION | Criterio EXCLUSION |
|---|---|---|
| **Size** | 200+ empleados; multi-divisional o multinacional | <200 empleados (ver E2) |
| **Tipo** | Corporacion establecida, mercado publico o privado estable | Startup sin traction; empresa en transicion/crisis |
| **Decision Making** | Comite de compra (C-suite + procurement + RRHH + TI) | Single decision maker; founder-run |
| **Sector** | Cualquiera EXCEPTO: gobierno, defensa, servicios financieros tier-1 | Government; sistema financiero regulado; defensa |
| **Trigger Activacion** | 1+ de: transformacion IA mandatada por board, perdida de market share por lentitud digital, necesidad scale L&D, governance IA | Operacion estable; compliance perfecto |
| **Budget Disponible** | $5M-$50M+ COP anuales en transformacion digital | Presupuesto limitado; no puede justificar programa |
| **Ciclo Venta Expectativa** | 8-16 semanas (RFP, legal, procurement standard) | >16 semanas por compliance extremo |
| **Referencia / Social Proof** | Deseo replicar caso exitoso de competitor o peer | No tiene benchmarks; resistencia cambio |

**Score Inclusion**: Debe cumplir >=6 de 8 criterios. (Más exigente por ciclo complejo.)

---

## 3. Reglas de Asignacion: Multi-Segment Conflicts

Un cliente potencial puede cumplir criterios de multiples segmentos. Necesitamos reglas de desempate explicitas.

### 3.1 Principio Base

**Prioridad = Trigger + WTP + Seniority (en ese orden).**

Un lead entra en el segmento donde **su trigger urgente + capacity to pay + seniority time disponible** sea MAS ALTO.

### 3.2 Ejemplos Practicos

| Escenario | Criterios Cumplidos | Asignacion Ganadora | Razon |
|---|---|---|---|
| **Caso 1**: Sofia, 35 anos, ex-estudiante, ahora ejecutiva P3. Ha vivido layoff (P1 trigger). Budget $1.5M (P3 WTP). | P1 + P3 | **P3** | P3 trigger (board pressure) > P1 trigger (layoff); P3 WTP > P1 WTP; P3 seniority requiere tiempo, Sofia puede dar. ROI P3 es 3x. |
| **Caso 2**: Juan, 24 anos, estudiante de Ing pero trabaja part-time como freelancer. Trigger: necesita portfolio (P2). Earns $400k/mes (P1 WTP). | P1 + P2 | **P2** | Status academico P2 > P1 (esta en carrera). Trigger academico es URGENTE (tesis en 6 meses). WTP irrelevante porque P2 presupuesto es <$200k. Delivery P2 es mejor ROI (grupal). |
| **Caso 3**: Mariana, 42 anos, freelancer sin estancamiento claro. Curiosidad sobre IA (P4 trigger). Puede pagar $600k (P1 WTP). | P1 + P4 | **P1** | Estatus freelancer profesional > curiosidad; WTP $600k dice que tiene income/assets; presupuesto personal implica trigger profesional real. Journey P1 es más agresivo, mejor match. |
| **Caso 4**: Startup de 8 personas, CEO decide. Escalamiento bloqueado (E1 trigger). CEO podria tomar decision sola pero empresa crece. | E1 + E2 | **E1** | Size 8 < 21 threshold; E1 ciclo 1-3 semanas vs. E2 ciclo 4-8 semanas. Startup creciendo es E1, sera E2 en 24 meses. Delivery E1 es más apropiada hoy. |
| **Caso 5**: Empresa 150 personas, Gerente Comercial da referencia, pero CEO toma todas las decisiones finales (estilo founder). | E2 + E3 | **E2** | <200 personas threshold; decision maker == 1 (CEO solo). E2 ciclo 4-8 semanas es realista. Requiere business case (E2) no comite (E3). |

### 3.3 Algoritmo de Asignacion (Pseudocodigo)

```
IF (cliente.edad == 25-50) AND (cliente.trigger_laboral == URGENTE) THEN
  → Candidato P1
ELSE IF (cliente.edad == 18-26) AND (cliente.status == ESTUDIANTE_ACTIVO) THEN
  → Candidato P2 (PRIORIDAD MAXIMA si edad < 24)
ELSE IF (cliente.seniority == C_LEVEL OR DIRECTOR_5PLUS) AND (cliente.edad >= 35) THEN
  → Candidato P3 (PRIORIDAD si trigger board/transformacion)
ELSE IF (cliente.edad >= 30) AND (cliente.trigger == CURIOSIDAD_SIN_URGENCIA) THEN
  → Candidato P4

// Reglas de desempate:
IF (dos_segmentos_aplican) THEN
  RETURN max_score(TRIGGER_URGENCY, WTP, DISPONIBILIDAD_TIEMPO)
ELSE
  RETURN segmento_unico

// Special cases:
IF (cliente.edad >= 50) AND (cliente.laboral_activo) THEN
  // Podria ser P4 o P1; P4 si no hay trigger urgente; P1 si si.
  IF (cliente.trigger == URGENTE) THEN P1 ELSE P4
```

---

## 4. Lifecycle Transitions: De un Segmento a Otro

Los clientes no permanecen en un segmento eternamente. A medida que envejecen, cambian status o crecen sus empresas, pueden **transicionar** a segmentos diferentes.

Documentamos aqui todas las transiciones posibles, con implicaciones para retención y upsell.

### 4.1 Transiciones B2C (Personas)

#### P2 (Estudiante) → P1 (Profesional)

| Momento | Trigger | Cambios de Expectativas | Accion Operativa |
|---|---|---|---|
| **Cuando** | Graduacion o inicio primer empleo (age ~22-26) | Presupuesto cambia de <$200k a $200k-$800k; trigger cambia de "ventaja academica" a "competitividad laboral" | En F5 (Advocacy), inicia conversacion sobre roles post-graduacion; propone upsell P1 |
| **Journey Implicada** | P2 estaba en CJ-P2 (bootcamp grupal). P1 requiere CJ-P1 (ruta personal + bootcamp) | Molde diferente; expectations de 1:1 vs grupal | Transition SOP: ofrecer 1 sesion discovery P1 gratuita para re-disenar ruta |
| **Producto Implicado** | P2: Bootcamp $200k; P1: Ruta + Bootcamp $400k-$800k | Escalada de valor. Plus side: alumni loyalty | Propuesta: "Ahora que trabajas, aqui esta tu ruta profesional adaptada" |
| **Retention** | P2s que no transicionan a P1 tienden a dropout (80% drop post-firma). Alta importancia. | Alumni P2 que consiguen empleo → follow-up inmediato | Crear ritual "Te felicito por tu primer empleo" con oferta P1 especial |

#### P1 (Profesional) → P3 (Ejecutivo)

| Momento | Trigger | Cambios de Expectativas | Accion Operativa |
|---|---|---|---|
| **Cuando** | Promocion a manager/director con 5+ reportes; edad ~35-40 | Trigger muta de "proteger carrera" a "dirigir transformacion"; WTP sube a $800k-$2.4M | En F4/F5, detectar promocion; conversacion proactiva |
| **Journey Implicada** | P1: Bootcamp + ruta personal. P3: Coaching executive + mentoria + speaking | 1:1 coaching es MAS denso; agenda menos flexible (board meetings) | Transition SOP: 1 sesion "Post-promotion coaching" diseñada para nuevos leaders |
| **Producto Implicado** | P1: Bootcamp $400k-$800k; P3: Coaching + programa $800k-$2.4M | Upsell cleanly. Ofertar "upgrade" a P3 con descuento (alumni loyalty) | Prop: "Ahora liderasás, aprende a dirigir IA en tu equipo" |
| **Retention** | P1s que no transicionan a P3 cuando califican → churn risk (pierden relevancia) | Proactivamente identificar promotions via LinkedIn; alcanzar antes que competa | Crear alert: cuando alumni P1 publica "now manager at X" |

#### P4 (Autodidacta) → P1 (Profesional)

| Momento | Trigger | Cambios de Expectativas | Accion Operativa |
|---|---|---|---|
| **Cuando** | P4 obtiene oportunidad laboral nueva / regresa a fuerza laboral; edad 40-55 | Trigger muta de "curiosidad" a "aplicacion laboral urgente"; WTP permanece flexible $200k-$800k | En F4, detectar cambio laboral (LinkedIn); re-engage proactivamente |
| **Journey Implicada** | P4: Bootcamp basico + guias. P1: Ruta + bootcamp intensive | P1 requiere mayor rigor; P4 fue "light version" | Transition SOP: "Ahora que trabajas con IA, vamos a profesionalizar tu practica" |
| **Producto Implicado** | P4: Bootcamp $100k-$300k; P1: Programa completo $400k-$800k | Upsell a version "profesional"; aprovechar momentum de nuevo rol | Prop: "Tu nueva posicion en [Company] — programa acelerado P1" |
| **Retention** | P4s en transicion laboral son altamente engageados. Win rate F1→F3 = 70%+ | Timing critico: capturar en los primeros 30 dias de nuevo rol | Crear workflow: P4 update perfil LinkedIn → auto-email transition offer |

#### No Transiciones (Regresion)

| Escenario | Trigger | Implicacion | Accion |
|---|---|---|---|
| **P1 loss of employment (layoff, voluntary exit)** | P1 entra en desempleo. Presupuesto → $0; urgencia → sigue alta pero capacidad → 0 | Cliente "stuck". No puede pagar; no es P4 (falta trigger de edad/curiosidad) | Crear programa "Transicion de Carrera" con payment plan; convertir a alumni ambassadors |
| **P3 downward mobility (demotion, company exit)** | P3 pierde seniority. WTP baja; trigger se vuelve mas "survival" que "transformacion" | Rare pero ocurre en crisis economicas. Cliente siente humillacion; retention risk. | Discreet check-in. Oferta: "Programa P1 intensivo para rebuilding" con confidencialidad |
| **P2 abandono academico** | P2 deja carrera. Status → freelancer/desempleado. Trigger desaparece. | Typically no re-engagement. Pero si consigue empleo → P1. | Alumni care: ofrecer "puente a empleo" con network |

### 4.2 Transiciones B2B (Empresas)

#### E1 (Small Business) → E2 (Enterprise)

| Momento | Trigger | Cambios de Expectativas | Accion Operativa |
|---|---|---|---|
| **Cuando** | Empresa crece 21+ empleados; gerente general contrata director especializado; presupuesto formal aparece | Decision-making muta de "CEO solo" a "comite 2-3 personas"; ciclo venta 1-3 semanas → 4-8 semanas | En F4/F5, detectar crecimiento (web, LinkedIn); oferta de "scale-up program" |
| **Journey Implicada** | E1: Workshop express, bootcamp equipo, playbook basico. E2: Roadmap, business case, bootcamp corporate + implementacion | Molde E2 es mucho mas formal; requiere governance | Transition SOP: "Ahora que escalan, vamos a formalizar operacion IA" |
| **Producto Implicado** | E1: Bootcamp $500k-$2M; E2: Programa completo $5M-$20M | Massive upsell. E1 que crece a E2 = cliente lifetime value 5x | Prop: "Programa de escalamiento: de 20 a 200 personas, operacion IA-powered" |
| **Retention** | E1s que crecen pero NO modernizar → churn a competencia que maneja E2. Critical risk. | Proactivamente engagear cuando empresa es 15-20 empleados (pre-crossing). | Crear "growth milestone" alerts: funding round, nuevas contrataciones, office expansion |

#### E2 (Enterprise) → E3 (Corporate)

| Momento | Trigger | Cambios de Expectativas | Accion Operativa |
|---|---|---|---|
| **Cuando** | Empresa crece 200+ empleados; multi-area; IPO o acquisition; presupuesto transformacion formal | Decision-making = comite 4-5+ personas + legal/compliance; ciclo 4-8 semanas → 8-16 semanas | En F5, proponer "enterprise partnership" con governance formal |
| **Journey Implicada** | E2: Bootcamp + business case. E3: Programa a medida, deployment multi-area, cultura IA-native | E3 requiere custom design; no es replicable; requiere executive coaching | Transition SOP: "Transformacion organizacional IA — diseño a medida" |
| **Producto Implicado** | E2: Programa $5M-$20M; E3: Programa $10M-$50M+ con retainer anual | Massive value. E2→E3 = partner de largo plazo, not transactional | Prop: "Transformacion IA multi-area — diseño 3 meses, deploy 12 meses" |
| **Retention** | E2 que se "vuelve E3" pero no encuentra partner → vendor-shopping; churn. | Proactivamente proponer escalada de contrato 12-24 meses ANTES de que publiquen IPO. | Crear "corporate readiness" offer: "Si planeas salir a bolsa, este programa es prerequisito" |

#### No Transiciones (Regresion)

| Escenario | Trigger | Implicacion | Accion |
|---|---|---|---|
| **E2 / E3 reorganizacion o crisis** | Empresa reduce headcount; departamentos se cierren; presupuesto L&D congelado | Customer en suspension. Puede quedar estancado 6-12 meses. | Check-in de "weathering crisis". Oferta: "Programa de agilidad operacional en tiempos dificiles" |
| **E1 cierre o pivot** | PYME cierra o cambia radicalmente de modelo (ej: SaaS → servicio) | Churn definitivo. No recovery path. | Alumni care: mantenerse en contacto. Posible future re-engagement si vuelve a escalar. |

---

## 5. Taxonomia de Segmentos (Revisada)

```
MetodologIA
├── B2C — PERSONAS
│   ├── P1: Profesional en Transicion (28-50, employed/freelancer, trigger urgente)
│   ├── P2: Estudiante Universitario (18-26, pregrado/posgrado, trigger academico/empleo proximo)
│   ├── P3: Ejecutivo / C-Level (35-60, VP+, trigger board/transformacion)
│   └── P4: Adulto Autodidacta (30-65, curious, trigger "no quedarme atras")
│
└── B2B — EMPRESAS
    ├── E1: Small Business (1-20 empleados, CEO = decision maker)
    ├── E2: Enterprise / Mid-Market (21-200 empleados, comite 2-3 personas)
    └── E3: Corporate (200+ empleados, comite 4+ personas + legal)

NOTA: Poblaciones excluidas documentadas en seccion 1.2
```

---

## 6. Fichas Compactas de Sub-Segmento

(Condensado de detalle full — ver CJ files para especificacion completa)

### B2C — PERSONAS

| Segmento | Perfil | Trigger | WTP | Ciclo Venta | Canal Preferido | CJ Reference |
|---|---|---|---|---|---|---|
| **P1** | 28-50, empleado/freelancer, IC-Manager, tech/biz roles | Despido, estancamiento, tech amenaza | $200k-$800k COP | 1-2 semanas | LinkedIn, Instagram, referral | CJ-P1-profesional-transicion.md |
| **P2** | 18-26, estudiante activo pregrado/posgrado | Tesis, practicas, competencia becas | $0-$200k COP | Impulsivo (días) | Instagram, TikTok, campus | CJ-P2-estudiante-universitario.md |
| **P3** | 35-55, VP/Director/CEO, 5+ reportes | Board pressure, competidor IA, innovacion | $800k-$2.4M COP | 2-4 semanas | LinkedIn, referral pares, eventos | CJ-P3-ejecutivo-clevel.md |
| **P4** | 30-65, activo laboral o consultor, no tech necessarily | Hijos con IA, medios, amigos, evento | $0-$800k COP variable | Lenta, necesita prueba social | Facebook, WhatsApp, boca a boca | CJ-P4-autodidacta.md |

### B2B — EMPRESAS

| Segmento | Size | Tipo | Decision Maker | Trigger | WTP | Ciclo Venta | CJ Reference |
|---|---|---|---|---|---|---|---|
| **E1** | 1-20 | Startup, PYME, emprendimiento | CEO/Founder (solo) | Escalamiento, manual labor, perdida deals | $200k-$2M | 1-3 semanas | CJ-E1-small-business.md |
| **E2** | 21-200 | Empresa establecida, procesos definidos | Gerente General + Director Comercial | Pipeline lento, win rate bajo, talento | $2M-$20M | 4-8 semanas | CJ-E2-enterprise-midmarket.md |
| **E3** | 200+ | Corporacion, multi-area, complejo | C-suite + Procurement + RRHH + TI | Transformacion IA, board mandate, scale | $5M-$50M+ | 8-16 semanas | CJ-E3-corporate.md |

---

## 7. Matriz Cruzada: Segmentos x Fases del Blueprint

```
                F0           F1            F2           F3            F4           F5
             AWARENESS   DIAGNOSTICO    DISENO      PRACTICA     AUTONOMIA    ADVOCACY
            ─────────── ──────────── ─────────── ──────────── ──────────── ────────────
P1 Prof.   │ LinkedIn  │ Diag 1:1   │ Ruta      │ Bootcamp   │ Auton.Kit  │ LinkedIn  │
Transic.   │ IG,Ref    │ Express    │ Personal  │ IA+Certif  │ Personal   │ Testimon. │
           ├───────────┼────────────┼───────────┼────────────┼────────────┼───────────┤
P2 Estud.  │ IG,TikTok │ Auto-diag  │ Micro-    │ Bootcamp   │ Templates  │ UGC,      │
Universit. │ Campus    │ Digital    │ Ruta      │ Grupal     │ + Prompts  │ Referral  │
           ├───────────┼────────────┼───────────┼────────────┼────────────┼───────────┤
P3 Ejecut. │ LinkedIn  │ Diag VIP   │ Ruta      │ Coaching   │ Mentoria   │ Speaking, │
C-Level    │ Referrals │ Exec.      │ Executive │ 1:1 Exec   │ Async VIP  │ Case Stdy │
           ├───────────┼────────────┼───────────┼────────────┼────────────┼───────────┤
P4 Adulto  │ Facebook  │ Diag       │ Ruta      │ Bootcamp   │ Guias      │ Boca a    │
Autodidc.  │ WhatsApp  │ Amigable   │ Basica    │ Ofimatica  │ Paso a Paso│ Boca      │
           ├───────────┼────────────┼───────────┼────────────┼────────────┼───────────┤
E1 Small   │ IG,WA     │ Diag Biz   │ Workshop  │ Bootcamp   │ Playbook   │ Referral  │
Business   │ Local     │ Express    │ Express   │ Equipo     │ Basico     │ Alianza   │
           ├───────────┼────────────┼───────────┼────────────┼────────────┼───────────┤
E2 Enterp. │ LinkedIn  │ Discovery  │ Roadmap   │ Bootcamp   │ Champions  │ Case      │
Mid-Market │ Aliados   │ Corporat.  │ + B.Case  │ Corp+Impl  │ Internos   │ Study,QBR │
           ├───────────┼────────────┼───────────┼────────────┼────────────┼───────────┤
E3 Corp.   │ C-Level   │ Discovery  │ Programa  │ Deploy     │ Cultura    │ Expansion │
Corporate  │ Referrals │ Multi-area │ A medida  │ Multi-area │ AI-native  │ Upsell    │
           └───────────┴────────────┴───────────┴────────────┴────────────┴───────────┘
```

---

## 8. Prioridad de Journey Maps a Desarrollar

| # | Journey Map | Segmento | Prioridad | Revenue Potencial (anual) | Justificacion |
|---|-------------|----------|-----------|-----------|---------------|
| J0 | **CJ General MetodologIA** | Todos | P0 — Critico | N/A (fundacional) | North star; alinea toda la organizacion |
| J1 | CJ Profesional en Transicion | P1 | P1 — Alta | $8M-$16M | Mayor volumen actual (40% pipeline); WTP moderado |
| J2 | CJ Ejecutivo / C-Level | P3 | P1 — Alta | $4M-$8M | Ticket promedio mas alto ($800k-$2.4M); ciclo 2-4 sem |
| J3 | CJ Enterprise Mid-Market | E2 | P1 — Alta | $6M-$12M | Recurrencia annual; expansion upsell; ciclo estandar |
| J4 | CJ Estudiante Universitario | P2 | P2 — Media | $2M-$4M | Pipeline futuro; volumen alto; low immediate revenue |
| J5 | CJ Small Business | E1 | P2 — Media | $1M-$2M | Puente B2C→B2B; alto churn; bajo LTV |
| J6 | CJ Corporate | E3 | P2 — Media | $3M-$6M | Complejidad alta, revenue alto, but 8-16 week cycles |
| J7 | CJ Adulto Autodidacta | P4 | P3 — Baja | $0.5M-$1M | Masa critica baja; bajo ticket; curiosidad ≠ commitment |

**Total TAM Potencial B2C**: $15M-$29M anual
**Total TAM Potencial B2B**: $10M-$20M anual
**Total TAM MetodologIA**: $25M-$49M anual (3-5 anos)

---

## 9. Relacion con SOPs Existentes (Actualizada)

| Fase Blueprint | SOPs B2C (personas/) | SOPs B2B (empresas/) | Status |
|---|---|---|---|
| F0 Awareness | sop-scouting-b2c, sop-nurturing | — | ✅ Created |
| F1 Diagnostico | sop-discovery-b2c | sop-discovery | ✅ Created |
| F2 Diseno | sop-structuring-b2c | sop-structuring | ✅ Created |
| F3 Practica | sop-delivery-b2c | sop-delivery | ✅ Created (marzo 2026) |
| F4 Autonomia | sop-success-b2c | sop-success | ✅ Created |
| F5 Advocacy | sop-success-b2c (referral loop) | sop-success (QBR, expansion) | ✅ Created |

**Nota**: G1 y G2 (delivery SOPs pendientes) ahora RESOLVED. Documentos creados en marzo 2026.

---

## 10. Gaps Documentales Detectados (Con Ownership)

| # | Gap | Impacto | Accion Requerida | Owner | Target Date | Status |
|---|-----|---------|------|---|---|---|
| G1 | ~~No existe SOP de delivery/practica B2C~~ | Alto | ~~Crear sop-delivery-b2c~~ | — | — | ✅ Closed (sop-delivery-b2c created) |
| G2 | ~~No existe SOP de delivery/practica B2B~~ | Alto | ~~Crear sop-delivery-b2b~~ | — | — | ✅ Closed (sop-delivery created) |
| G3 | Blueprint web desactualizado (4 fases vs 6) | Medio | Actualizar HTML en metodologia.info + add emociones | @marketing | 2026-04-15 | In-Progress |
| G4 | ~~No hay journey maps formalizados~~ | Alto | ~~Este documento + CJs detallados~~ | — | — | ✅ Closed |
| G5 | Segmentacion P2 (estudiantes) sin SOPs propios | Medio | Crear variantes simplificadas discovery + delivery P2 | @producto | 2026-05-15 | Pending |
| G6 | Segmentacion E3 (corporate) sin proceso diferenciado | Medio | Crear SOP discovery-corporate + deployment-corporate | @producto | 2026-05-15 | Pending |
| G7 | Falta "Reglas de Asignacion" clarity en CRM | Medio | Documentar scoring logic + crear fields CRM (NUEVO) | @ops | 2026-04-01 | Open |
| G8 | Falta "Lifecycle Transitions" playbook | Bajo | Crear guia operativa: como pasar P1→P3, E1→E2, etc. | @operaciones | 2026-06-01 | Pending |

---

## 11. Gobierno

**SSOT Hierarchy:**
```
Service Blueprint General v2.0 (source of truth para fases)
    ↓
Matriz de Journeys por Segmento (ESTE DOCUMENTO — index de segmentos)
    ↓
CJ Individuales por Segmento (especificacion operativa)
    ↓
SOPs por Fase (ejecucion diaria)
```

**Vigencia**: Actualizacion al crear/modificar cualquier journey individual o segmento. Quarterly review minimum.

**Propietario**: Director de Producto + Director de Operaciones.

**Ultimo Update**: 2026-03-24 (added: segmentation assumptions, inclusion/exclusion criteria, assignment rules, lifecycle transitions, SOP status updates)

