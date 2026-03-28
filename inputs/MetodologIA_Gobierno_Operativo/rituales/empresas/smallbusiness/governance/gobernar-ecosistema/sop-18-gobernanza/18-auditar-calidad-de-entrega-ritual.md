---
id: "18"

segmento: "empresas-smallbusiness"
journey: "governance"
proceso: "gobernar-ecosistema"
sop: "sop-18-gobernanza"
ritual-slug: "18-auditar-calidad-de-entrega"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Quality Lead / Operations Director"
- backup: "Customer Success Head"
frecuencia: "trimestral (Al cierre de cada Q fiscal interno de la Agencia)"
herramientas:

- "Dashboard de QA Maestro (Google Sheets/Looker Studio)"
- "CRM Reports (NPS Aggregate, Deal Time-to-closed)"
- "Revisión Forense Aleatoria (Gong Calls Analysis)"

entry-criteria:

- "Mínimo N=5 programas / cuentas de SmallBusiness procesadas y marcadas como `Closed-Delivered` en el último Q."
- "Base de datos con al menos 70% de las Net Promoter Scores recolectadas de esas cuentas."
exit-criteria:

- "Auditoría de Delivery QX completada (Quality Score Board)."
- "Cuellos de botella sistémicos de la agencia aislados y definidos (Ej: 'Nuestros consultores tardan mucho en el R09 Onboarding')."
- "Memo accionable trimestral disparado a todo el escuadrón operativo (Post-Mortem)."

kpi: "Delivery Quality Aggregate Score (Target: ≥85/100 como índice combinando NPS Promedio + SLA Compliance)"
leading-indicators:

- "Tendencia Trimestral de Quejas Directas de C-Levels (Target: < 2 por Q)"
- "Tiempo promedio de Onboarding R09 en el Portafolio PyME (Target Reducción YoY)"
riesgos-controles:

- riesgo: "Muerte por la Falsa Subjetividad ('Al cliente no le gustó el PDF, seguro el consultor es malo')"

  control: "Triangulación Cuantitativa Base B2B. La calidad no se mide en sonrisas; se mide matemáticamente. Quality Score = (NPS [0-40 pts]) + (Adopción de Plataforma > 50% [0-30 pts]) + (Evidencia de ROI Táctico en R11 [0-30 pts]). Si es mayor a 85, el delivery es Oro."

- riesgo: "Síndrome de Enmascaramiento por parte de Delivery"

  control: "Quality Audit no depende del equipo que entrega. El AE (Sales) o QA auditan a Operaciones para evitar manipulación de percepción. División estricta Iglesia/Estado para la Verdad corporativa."

- riesgo: "Castigar a los Facilitadores por métricas viciadas (El cliente abandonó porque la Pyme quebró, no porque nuestro programa sea aburrido)"

  control: "Categorización de Detractores. Segmentar el Churn o Baja Nota en causas internas (Nuestra Culpa) y Causas Externas Exógenas (Su Culpa)."
evidencias:

- "Documento Quarterly Delivery Audit Final (QDA) archivado en Drive Management"
- "Minuta de Sesión Interna de Corrección de Procesos (The War Room Meeting)"
- "Notificaciones push sobre re-entrenamientos necesarios en Playbooking"
---

# Ritual: Auditar Calidad de Entrega — Empresas/SmallBusiness (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Small Business
> **Objetivo:** Ritual de Back-Office. No es cara al cliente; es Cara al Alma de la Consultoría. Sin un bucle de auditoría estricta cada 90 días, la entropía degrada la excelencia Operacional. Vas a vender cosas (R08) que tu equipo no estará cumpliendo en estándares Gold (R10) y terminarás colapsando la retención en masa (R15). R18 detiene el Desangre Oculto y premia a los Ejecutores Brillantes.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Se ejecuta cíclicamente los días 1-5 de cada inicio de nuevo Trimestre Fiscal (Q1, Q2, etc).
- **Pre-ritual:** La tablatura de base de datos de los R11s (Manejo del Éxito) y NPS del último trimestre está limpia y consolidada.
- **Contexto:** En la vorágine de Consultoría PyME (High volume, middle tier), la agencia se vuelve una maquila si no frena. Todos corren apagando incendios. R18 obliga a Operations Director a frenar los motores, pararse sobre una colina en silencio, y mirar matemáticamente qué "engranaje" de los Consultores, Project Managers o Materiales está rechinando sistemáticamente, antes de que el motor funda.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Ejecutar la extracción sin pasiones del estado higiénico general de la entrega final de valor corporativo de MetodologIA, aislando fallas repetitivas, identificando el Talento Top de Delivery y pivotando los Procedimientos (SOPs) anómalos.
- **Definición de Éxito (DoD):**
  - [ ] Compilación matemática de Quality Score Dashboard realizada.
  - [ ] Casos atípicos graves ("Outliers Negativos") investigados a profundidad.
  - [ ] 3 Recomendaciones de 'Hard Pivot' al Playbook Táctico General definidas y firmadas por Dirección.
- **Definición de Éxito Interno:** "Hicimos la Q-Audit y confirmamos que la Plantilla Financiera 2.4 que le dábamos a las PyMEs es demasiado pesada; las 5 empresas a las que se la entregamos votaron 6/10. Anexado Tarea Backlog para simplificarla la próxima semana. Salvamos futuras bajas."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Operations Director | Salvaguardar la Excelencia Operativa Mínima Viable del 100% de la Cartera PyME |
| **Responsible** | Quality Lead / QA | Armar la Analítica, ejecutar muestreos, detectar fallas |

| **Consulted** | Consultores Lider (Facilitadores) | Proveer contexto cualitativo a por qué una métrica fracasó duro en Octubre |
| **Informed** | Sales & AE Team | Feedback inverso: "Cuidado Ventas, le están prometiendo a las Pymes algo en R08 que nosotros no estamos pudiendo dar en R10. Ajusten guion de Venta". |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Cierre Contable/Operativo de Q anterior Completado.
- [ ] Export de CSV / API Link de los Resultados NPS + Tiempos de Onboarding + Health Scores de todo la Cohorte PyME de ese trimestre.

---

## 5. Ejecutar — Parte 1: Extracción Analítica Fría (Data-Mining)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Pulling Metrics Global

**Acción:** QA extrae del CRM tres (3) vectores. Ratio de NPS (0 a 10), Ratio de Tiempo de Consumo de Módulos (Adopción), Ratio de Promesa Cumplida ("¿Arreglamos X problema logístico?").

**Output:** Tablatura Cruda Consolidada N=100% Cartera QX.

### 5.2 — Cálculo del Quality Score 4.1 Máster

**Acción:** Correr Fórmula Matemática: NPS (40% de peso) + Consumo Técnico (30%) + Impacto Documentado Formal (30%).

**Output:** Indicador Agregado de Delivery de 0 a 100 ptos. (Score > 85 = Green, >70 = Yellow, <70 = Red Alert).

### 5.3 — Aislamiento Sistemático de Cuellos Múltiples

**Acción:** QA busca clústeres. "¿Es casualidad que las únicas 3 cuentas que churrearon (salieron) en el Q3 estaban operadas por el mismo Junior Consultant? O ¿Fue porque les vendimos el paquete Advanced de HR a empresas de menos de 10 empleados?".

**Output:** Hipótesis Correlativa de Riesgo levantada.

### 5.4 — Selección de Incidentes Críticos (Random Call QA)

**Acción:** Quality Assurance agarra 2 grabaciones aleatorias de Gong/Zoom del Ritual 10 de Cuentas B2B al azar. Verifica tono, puntualidad, dominio metodológico del staff frente a la empresa cliente.

**Output:** Muestreo Ciego del Standard de Franquicia.

### 5.5 — Estructuración de Memo Trimestral (QDA Board)

**Acción:** Redactar los Hallazgos. "Cosas que salieron brutal 🟢: Entregas Onboarding Ligeros logran 90% engagement en semana 1. Cosas Rotas 🔴: Módulo Financiero retrasa el QBR por exceso de cálculos; CEOs PYME odian esto."

**Output:** Radiografía Organizacional Operativa.

### 5.6-5.10 — [Separación de datos contaminados (Un cliente Pyme que entró solo 3 días en el trimestre y quebró no puede destruir el NPS del Consultor de facto), Inclusión de Notas felicitatorias con Nombres Propios ('El NPS de Marta P. es de 10 perfecto este Q'), Bloqueo agenda para WAR ROOM C-Levels]

---

## 6. Ejecutar — Parte 2: The "War Room" Alignment (Toma de Decisión)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Apertura de Mesa con el Ejecutivo

**Acción:** Minuto 0 de Junta Trimestral de Calidad Interna con Ops y Sales Directors. OPs Director: "El Score Anual va en 86 Ptos. Mantenemos Bandera Verde. Pero tenemos sangrado microscópico en Cohorte Noviembre. Presento data."

**Output:** Shock Cognitivo Institucional Fijo.

### 6.2 — Proyección del Diagnóstico

**Acción:** QA Muestra gráficas (Sin emociones, full data cruda). Y lanza la bomba: "La mitad de las quejas son sobre los entregables técnicos pesados."

**Output:** Recepción Directiva de Realidad B2B.

### 6.3 — Resolución de Carga (Ajuste de Playbook)

**Acción:** Decisión Directiva Exprés. "¿Ajustamos el proceso, matamos el material o re-entrenamos personal?"

**Output:** Pivot Táctico Autorizado ('Cámbiese la Plantilla de 10 Hojas a 3 Hojas').

### 6.4 — Feed-back Loop para Ventas B2B

**Acción:** QA le dice a VP de Ventas: "Diles a tus AEs que dejen de vender en R08 que somos 'Auditoría Fiscal 24/7', porque el contrato dice 5 sesiones semanales y los clientes de Pyme pelean creyendo que somos despachos en sitio." (Alineando Promesa y Ejecución).

**Output:** Contención de Expectativas de Onboarding en Front-Line.

### 6.5 — Firma de Acuerdos del War Room

**Acción:** Se genera el Acta de Q y se postea en el Hub Operativo Interno. "Nuevas reglas de Vuelo B2B Pyme".

**Output:** Cierre de brechas legislativas institucionales.

### 6.6-6.10 — [Asignación de tickets en Jira/Asana para rehacer los PDFs defectuosos que hundieron el NPS, Agendamiento de sesión 1-on-1 disciplinaria suave con consultores que consistentemente arrojan calidad amarilla, Autorización de Bonos económicos pactados para la Célula con mayor Quality Score Promedio de la consultora (Game Theory B2B para premiar Excelencia Operativa)]

---

## 7. Ejecutar — Parte 3: Comunicación e Integración Sistémica

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — All-Hands Memo Release (Difusión de Tribu)

**Acción:** QA envía el correo masivo o post en Slack "State of the Agency - QX". Resumaniza los datos para todo el equipo para no ser tirano y destaca las felicitaciones 80% y las crudas lecciones 20%.

**Output:** Transparencia Radical Cultural interna de MetodologIA.

### 7.2 — Update de Rituales Recursivo

**Acción:** Si se decidió que la Sesión de Onboarding (R09) debe durar 30 mins y no 60 mins. QA edita el R09 y notifica cambio de versión a `v2.1.0`. Modificación in situ.

**Output:** El Sistema evoluciona y se autodevora sus fallas (Antifragilidad).

### 7.3 — Reentrenamiento Lite y Fast

**Acción:** Se lanza un mini video asíncrono obligatorio de Ops (3 Minutos) al canal interno: "Compañeros, la Plantilla C cambió hoy por hallazgos de calidad en PyME Industrial. Acá abajo adjunto link, de ahora en adelante usaremos esta."

**Output:** Despliegue de actualización biológica del conocimiento.

### 7.4 — Limpieza Arquitectural de Base

**Acción:** QA borra todos los clones obsoletos de herramientas y plantillas reportadas en la Auditoría de Pyme C para no contaminar futuros leads.

**Output:** Higiene Digital Estricta.

### 7.5 — Fin de Ciclo Auditor

**Acción:** QA y Operaciones regresan al Tridente Operativo. Reloj Cíclico en ceros esperando otros 90 días o el Trigger Anual.

**Output:** La Matriz Gubernamental Duerme.

### 7.6-7.10 — [Validación cruzada de que los Playbooks de IA y de Hubspot templates quedaron actualizados realmente por los administradores de software interno, Descartar métricas de la empresa PyME que estuvo reportando datos locos, Respirar institucionalmente al saber que el negocio es predecible en su excelencia, Cierre del ritual de MetodologIA B2B Operations]

---

## 8. Validación y Calidad (QA)

- [ ] Prevención de la Politización Interna: Una auditoría de Calidad Interna B2B que se ejecuta de modo vengativa o subjetiva (usando la data para castigar a un Project Manager que le cae mal a Dirección) destruye la Cultura de Transparencia de la Consultora. Los números son neutros; el tratamiento a las personas del equipo debe ser enérgico para subir a oro, no tiránico.
- [ ] Muerte por Parálisis de Datos (Big Data Coma): QA no puede demorarse 23 días haciendo Reportes de Excel complejos de correlación cuántica y grafiquitos para medir a los clientes PyME. Extraen 3 ratios, se meten al Cuarto de Guerra y dictaminan acción el Día 3 del Quarter. La pyme es rápida, la auditoría debe fluir rápido y arrojar Órdenes (To-Do's).

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Quality Score Dashboard QX| Sheets / Looker| Hub Ops | QA Lead |
| All-Hands QX Quality Memo | Documento Notion | Slack General | VP of Delivery / QA |
| Actualización de Rituales | Commit de Version L1| MetodologIA Repo| Knowledge Manager|

---

## 10. Cierre y Handoff

- **Siguiente ritual:** `RE-INICIO INFINITO` — Este es el techo orbital final del ciclo general Pyme. Desde esta gobernanza, el sistema se retroalimenta para asegurar que los ciclos comerciales de nuevos prospectos (R01-R17) que están perpetuamente ocurriendo ahora estén blindados con una armadura de retención más resistente.
- **Condición de handoff:** Diagnóstico del sistema maestro extraído y ejecutado. El motor de MetodologIA B2B está regulado para garantizar promesas al CEO PyME que realmente podemos sostener con alta rentabilidad interna.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Entrega Base Auditada | Score Consolidado > 85 | 🟡 |
| Acciones QA Aplicadas | 100% Bugs Internos | 🟡 |

- **NEXT:** `SEGMENTO COMPLETO Pyme — FIN (RETORNO DE FLYWHEEL a MACRO-SISTEMA)`
- **BLOCKERS:** `Directivos Comerciales bloqueando actualizaciones porque 'el Playbook clásico nos está funcionando' rehusándose a iterar sus modelos asimétricos frente a feedback obvio y doloroso de la analítica QA (Ceguera Institucional Grave).`

---

## Modal 10x: El "Destilador Cíclico de Verdad B2B" (Prompt Pro)

**Use case:** Estás cerrando las filas del Q. Tienes en un CSV todas las sugerencias locas, quejas tibias, encuestas NPS y correos frustrados de 30 Empresarios de Pymes que atendieron este último trimestre. A simple vista, parece ruido quejumbroso. Quieres que el LLM devore el archivo, ignore el llanto irrelevante y aísle The Root Cause Operation (La Única Falla que si la arreglas elimina el 80% de ese ruido futuro), emitiéndote el plan de acción como Chief Quality Officer.

```markdown
PROMPT:
"Actúa como un Black Belt en Lean Six Sigma y Quality Assurance Director de una Top Consulting Firm.
Te voy a pegar abajo el volcado en crudo (Feedback bruto y NPS Comments) de mis últimos 30 CEOs PyME atendidos en el Q3. Son Pymes industriales y logísticas.
Misión: Pasa toda esa data por un filtro de Pareto extremo 80/20. No me des un resumen blando de 'La gente opina que...'. Ignora cosas menores aisladas. Entrégame Específicamente un diagnóstico brutal aislando EL ÚNICO PROCEDIMIENTO TÉCNICO INTERNO QUE TENEMOS ROTO (El common denominator del dolor del grupo), y diséñame TRES pasos para que mañana modifique mi Procedimiento Base para eliminarlo de las entregas del Vendedor y Operativo.
Tono: Frío Analítico Quirúrgico de Sala de Juntas CEO B2B.

[PEGA AQUI LOS COMENTARIOS BRUTOS]"
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Small Business
> **Powered by:** MetodologIA Governance Protocol
