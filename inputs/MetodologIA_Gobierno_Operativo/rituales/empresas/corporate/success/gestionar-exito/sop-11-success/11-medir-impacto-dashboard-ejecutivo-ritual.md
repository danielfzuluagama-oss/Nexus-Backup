---
id: "11"

segmento: "empresas-corporate"
journey: "success"
proceso: "gestionar-exito"
sop: "sop-11-success"
ritual-slug: "11-medir-impacto-dashboard-ejecutivo"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Customer Success Director"
- backup: "Data Architect / Operations Mng"
frecuencia: "continua (Reporte Ejecutivo automatizado semanal The Board, Juntas trimestrales)"
herramientas:

- "The Sovereign C-Level BI Dashboard (Metabase / PowerBI Embedded)"
- "Calculadora de ROI Dinámica"
- "Sistema de Alertas de Churn (Health Scoring Multivariante)"

entry-criteria:

- "El despliegue Masivo B2B (R10) superó los 30 Días Estables en Producción."
- "El SOW Y1 Trazó los Acuerdos Netos Financieros Base (R08) a cumplir."
exit-criteria:

- "El Dashboard Ejecutivo es consumido mensualmente por al menos 2 C-Levels del Cliente."
- "Asimetría Matemática Confirmada (El Retorno Económico superó al Coste Mensual)."
- "El Riesgo de Cancelación de Contrato Y2 (Churn Risk) cae a menos de 5% Técnico."

kpi: "Executive Engagement Rate (Target: >80% de los Reportes de Impacto deben ser leídos, clickeados o presentados ante el Directorio Cliente, comprobando que somos Relevantes y Visibles Típicamente)"
leading-indicators:

- "Fluctuación del Engagement Temporal (Los picos de uso en el Dashboard B2B concuerdan con sus Cierres Fiscales Quarter)."
- "Tasa de 'Exports to PDF/Excel' del Dashboard por el Champion (Indica que usa nuestra metadata para defender SUS propios KPIs Internos)."
riesgos-controles:

- riesgo: "Muerte por Irrelevancia Métrica (Entregarle al CFO un Dashboard hermoso lleno de métricas 'Vanidad' SaaS como 'Login Mensuales', y él odiando la firma porque su OpeEx Logístico sigue igual)"

  control: "The Dollar-Sign Rule. El Dashboard C-Level Corporate TIENE ESTRICTO PROGRESO DIRECTO al P&L. L1 siempre debe ser 'Horas Ahorradas x Salario Base = Margen Dólares'. La métrica de uso y los logins van en anexos del Administrador, NUNCA en Ejecutivos."

- riesgo: "Síndrome de The Silent Bleed ('El Sangrado Silencioso'. Las analíticas marcan verde, los pagos entran, pero un Sub-Silo del Corporate abandonó el sistema hace 60 días sin quejarse a soporte)"

  control: "The Zero-Activity Trigger. Programación Inflexible en BI MetodologIA. Si Sub-Nodo Y1 en Corporate X pasa 7 Días Hábiles a Cero Consultas API, Alarma Automática L3 al CS Director. La proactividad asimétrica intercepta el abismo de aburrimiento antes del Churn."

- riesgo: "La Autopsia C-Level Falsa (El Equipo del Cliente miente a su propio Jefe diciendo que MetodologIA se atrasó, para cubrir sus propias demoras internas operativas)"

  control: "The Mutual Traceability Wall. El Dashboard R11 tiene el módulo 'Dependencias Pendientes del Cliente'. Cuando su CFO abra el Reporte P&L verá con asombro rojo: 'Meta XYZ está Atrasa 14 Días PORQUE la contraparte de ustedes IT Aún No nos Entrega Accesos P2'. Blindaje político asimétrico total."
evidencias:

- "Acceso C-Level Compartido Activo con Telemetría Log"
- "Reportes Extractos en Email Automatizados QBR"
- "Alarma Cero-Intervención de CSM Resuelta en Logs"
---

# Ritual: Medir Impacto con Dashboard Ejecutivo B2B — Empresas/Corporate (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Corporate
> **Objetivo:** En Enterprise, probar que funcionas no es que el usuario final diga "Me gusta la IA MetodologIA". Vives y Mueres por Tabuladores Financieros de Gran Escala. El R11 "Dashboard Ejecutivo" no es una tarea de armar gráficas lindas; es el Escudo Anti-Despidos B2B. Mantiene la memoria viva del cliente de porqué nos paga mensualmente un Retainer de Consultoría y Licencias Multi-Millonario. Si el CFO NO puede ver su Retorno a 1 Click, pedirá Cancelar Contrato para recortar Gastos. El R11 es Ventas Psicológicas Invisibles.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Semanas Post-R10 (El Éxito del Onboarding Mass Deployment). El humo de la batalla se disipó y empiezan las Operaciones Regulares de Retención (BAU = Business As Usual).
- **Pre-ritual:** ¿Las APIs nativas o el ERP de ellos está mandando limpiamente los PINGs y Cierres de Transacción hacia el LakeHouse de MetodologIA para pintar el PowerBI?
- **Contexto:** El Vicepresidente Operacional B2B que firmó GTM el Contrato te apoyó, pero pasan 4 meses y se le olvidó porqué peleó por ti, ahora le importan los recortes Q3. El R11 revive su pasión técnica enviándole mensualmente Oximelatonina Política: "Mire Jefe Cliente, gracias a nosotros gastó $400K menos este Semestre".

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Orquestar el Sistema de Medios Científicos Asimétricos (Dashboards/Alertas) para visibilizar permanentemente la Ganancia P&L atribuida al Escuadrón MetodologIA, a fin de defender el TCO (Total Cost of Ownership) frente al Directorio del Cliente.
- **Definición de Éxito (DoD):**
  - [ ] Modelos de BI Construidos desde la Baseline Estricta lograda en el Piloto (R05).
  - [ ] Paneles Estilizados para Nivel 1 (C-Level), Nivel 2 (Mng), Nivel 3 (Soporte).
  - [ ] Rutina de Extracción Automática de Emails Set-Up (Para los Viejos Directores que Exigen PDF y Odian los Links Ariba/BI).
  - [ ] Detecciones de Baja Adopción (Silent Bleed) conectadas al Hubspot CS.
- **Definición de Éxito del Corporate Prospect:** "Lo que me fascina de MetodologIA no es solo que arreglaron el problema del proceso, es la Gobernanza GTM Financiera. Cada primero de mes me despierto con un Resumen Táctico de Cúanto Ahorramos, Qué Nodos fallaron un poco, y Cómo lo van a resolver ellos autónomamente. No tengo que pensar en The Agency operando porque se gobiernan con data dura".

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | C-Success Director / Head of CS | Responde por The Gross Retention Limit (>95% en Corporates). Protege el ARR del Ecosistema Asegurándose que el cliente Mida y Sepa Cuánto Gana Conmigo Mensualmente. |
| **Responsible** | Data Architect / Data Analyst | The Builder. Extrae y convierte la basura de Bases de Datos Legacy en el Cubo OLAP Precioso que el CFO desea. Dibuja The Board. |

| **Consulted** | Delivery / AE Original | El AE que vendió evalúa si las gráficas le sirven o no para hacer Upsells R14. El Delivery confirma que los datos en vivo sí reflejan su esfuerzo de integración. |
| **Informed** | Enterprise Account Executive | Lo mira en silencio meses post-venta asombrándose de la estabilidad. Se frota la mano aguardando R15 Renovation B2B. |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Matriz de BaseLine "The Initial Paint" que Extraímos Empírica del R05 (Toma Cero). (Nunca levantes un Dashboard si no sabes Cúal era el problema Viejo Exacto de ellos a comparar).
- [ ] Mapeo Total de Los Nombres, Apellidos y Emails de los 15 Titulares de Comando (Comité Directivo B2B que consumirá Data).

---

## 5. Ejecutar — Parte 1: Inserción de Colectores Biométricos B2B

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Trazado del Flujo de Eventos Hacia 'Data Warehouse MetodologIA'

**Acción:** Architect diseña Webhooks/Connectores con Data Lakes del Cliente o APIs Nativas SaaS propias. Se traen Eventos Brutos a nuestro AWS S3 / BigQuery.

**Output:** Petróleo Crudo Financiero.

### 5.2 — Transformación de la Vista OLAP (El Filtro Mágico)

**Acción:** SQL Eng limpia Ruido. "El ERP cliente bota 12 estados de ticket. Solo me interesan 3 para probar la velocidad The Agency (Opened, Closed by AgentIA, Failed)".

**Output:** Modelo Dimensional Listo para Gráfica (Dbt/SQL Data B2B).

### 5.3 — Creación Categórica 'Panel C-Level Absoluto' (L1)

**Acción:** Data Analist Crea Pestaña 'Executive'. Obligatorio 3 Bloques Grandes en Tipografía 48px: Ahorro $, Tiempo Ahorrado en Horas, SLA Técnico Nube Cumplimiento %.

**Output:** Interfase diseñada contra ceguera corporativa.

### 5.4 — Panel de Capilaridad Intermedia (Managers L2)

**Acción:** Segunda Pestaña. Desplegable de Departamentos. "Ah, yo soy Manager Chile. Entro a la pestaña, filtro por mi País, mi departamento, Oh, mi Adopción está al 43%. Tengo que regañar yo a mi personal de escritorio".

**Output:** Externalización y Delegación de Gestión de Cambio (Accountability Transfer).

### 5.5 — Construcción Del Hub de Evidencia Oculta de Soporte (L3)

**Acción:** Última pestaña del Tablero: El Log File de Excusas. Contiene el historial de Caídas Propias Y las Caídas del Cliente.

**Output:** Documento Categórico Neutral (Nadie discute con The Log Machine).

### 5.6-5.10 — [Configuración de Access Control Groups IAM B2B ('El de Finanzas Chile no debe ver la data de RRHH Brasil', Segregación Data-Risk OBLIGATORIA al 100%), Inmersión en Herramienta de Diseño Gráfico 'Neumorphism B2B Theme' ('El Tablero debe sentirse visualmente una Obra de Ingeniería Elite Apple'), Testing Empírico con Data Sintética previo a exponer la url al Banco B2B/Empresa, Pruebas de Carga de Dashboarding, Emisión Controlada del Link Oficial 'Alpha Version' al CS Director B2B local]

---

## 6. Ejecutar — Parte 2: El 'Silent Automation' y Pushing

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Activación de The Push Protocol (Alimentación Zonda)

**Acción:** Se activa Reporte 'Pulse B2B' Semanal a la Bandeja C-Level los días Lunes 8:00 A.M. (Un ejecutivo corporativo clásico jamás recuerda su clave de Metabase para entrar al dashboard manual; debes empujarle The PDF por el mail forzosamente para crear un hábito).

**Output:** Garantía Orgánica de Consumo del Informe Asimétrico.

### 6.2 — Programación de 'Health Triggers' al Equipo CSM Interno MetodologIA

**Acción:** Data Lead Inyecta la Regla: `[Sí (Usuarios_Activos_Semana) < (Baseline_Expected_Y1 * 0.70) => Dispara Ticket Alerta Roja HubSpot para Engagement Leader B2B]`.

**Output:** Alarma Sísmica Temprana Anti-Cancelaciones Masivas.

### 6.3 — Sincronización del "Value Delivered" con CRMs Financieros

**Acción:** Conectar Las métricas de ROI Finalizadas hacia HubSpot Properties Automáticos para que el CFO B2B Internal P&L de The Agency pueda ver qué tratos están rindiendo Frutos para Casos de Estudio R16 Embajadores.

**Output:** Creación del Ciclo Multiplicador Asimétrico de La Agencia.

### 6.4 — Adiestramiento C-Level para Interpretar Dashboard

**Acción:** Junta Relámpago (15 mins) del Engagement Lead B2B. "Estimado VP, así lee El Dashboard que le armamos: Verde Bueno, Rojo Llamarnos. Aquí exporta a Powerpoint cuando entre al Directorio".

**Output:** Reducción Cero Fricciones Interfaz.

### 6.5 — Inyección Oportunista de 'El Sugestionador Automático'

**Acción:** Debajo del Gráfico Espléndido de 1 Millon Ahorrado, agregar una caja de Insight Textual (Asesoría Pasiva): 'Notamos que el Sub-silo Bogotá tuvo un Desempeño 120%. Sugerimos lanzar una revisión de Metodologías ahí para premiarlos'.

**Output:** El Producto SaaS B2B o Framework Habla Como Un Consultor De Nivel BCG (No un software Frío Aburrido).

### 6.6-6.10 — [Limpieza programada SQL Garbage Menusal de Base Logs Históricos, Verificación Mensual B2B Ops (Ver que un Update de Plataforma Azure no rompió la sincronía del Cubo de Data Y estén entrando Datos Flat Nulos), The Quarterly Big Compilation Extractor (Hacerle el Documento Macro para R13 El Informe Trimestral), Check de Confianza Cliente 'Oculto' ('Champion.. ¿Te están sirviendo los mails M2 que caen solos de nosotros para pelear tu presupuebsto interno? Respuesta Positiva = Retención Asegurada Y2').]

---

## 7. Ejecutar — Parte 3: Re-Orientación al ROI y The Fix

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Sesión Interna Intercepción CSM B2B

**Acción:** Lunes Tarde. Analista de Cust-Success MetodologIA revisa su Alarm Center. "Equipo, el Dashboard Reporta Rojo Nivel C3 en el Módulo Logístico Norteamérica Corporate X. Bajó un 40% el uso la Noche a Mañana en todo este Y1."

**Output:** Reacción Preventiva Operacional Temprana B2B.

### 7.2 — 'The Under-Radar Investigation'

**Acción:** CSM no manda un correo al cliente preguntando "Oye qué te pasó". CSM MetodologIA Analiza Logs Internos Silenciosamente. "Oh, resulta que IT cliente metió un Update de Antivirus ForcePoint GPO que bloqueó la IP a nuestros servidores L4".

**Output:** Solución y Certeza GTM B2B (Data Asimétrica Elite Base).

### 7.3 — Escalación a The Steering Committee Nivel Media

**Acción:** CSM Llama al Champion de Ops de Ellos y su IT. "Señores L2 Clientes, su Antivirus nos Tumbó el Módulo 3. Arréglalo Jueves. Cópiale a VP porque el ROI del Lunes de él saldrá con caída por esto."

**Output:** Devolver La 'Deuda Técnica' al causante corporativo Real para Salvar Contrato.

### 7.4 — Restabilización Y Corrección Táctica Módulo

**Acción:** Cliente Arregla. Línea Recta Retorna al Verde Hermoso.

**Output:** El Músculo P&L De La Retención. Nadie en ventas B2B vive de Adquisiciones; The Valuation de la Consultora Depende de Net Retention Rate Masiva Operacional Multi Año (El Valor se compone Tácito).

### 7.5 — Elevación Estratégica Post Métrica The Seed of Expansion R12 R14

**Acción:** CSM Anota mentalmente al ver picos gigantescos en un Uso. (Oh Vaya, el área Administrativa lo usa TANTO que revienta la gráfica y eso que no les dimos Taller. Deben adorarlo. Hora de venderles Licencias Extra R14 / Expandir Valor a su Vicepresidencia Oculta Adyacente).

**Output:** Insight De Prospección Inteligente Intramuros Oculto Corporate.

### 7.6-7.10 — [Renegociación Amistosa de Expectativas Base ('Champion, vamos TAN Bien que tu ROI Prometido R05 Quedó Corto, subamos The Goal-Post juntos'), Modificación de las Reglas Custom P&L Internas Del Dashboard, Cierre Contable de Tiempos HH Mensuales Del Arquitecto DataOps Mantenimiento Mensual, Enviar Actualizaciones Asertivas Del Producto A Toda La Base Directiva Por Intermedio Del Tablero Central ('Nuevos Paneles V4 Habilitados Hoy Mute').]

---

## 8. Validación y Calidad (QA)

- [ ] Bloqueo Paranoico de la Fugas de Datos Intra-Filial: Corporativos gigantes odian que el Gerente de Centroamérica pueda ver secretamente los salarios y rendimientos de la Gerencia de Europa Oeste dentro The Dashboard. QA B2B Exige: Testear Role-Level Security (RLS Segregación) T-12 horas antes de Mandar Enlaces en Vivo Asimétricos. El cruce es muerte legal SOC Institucional P&L.
- [ ] Regla de 'Cero Discrepancias Financieras Vivas'. El Dashboard B2B Corporate que te construyó tu Agencia Pinta en "Dólares", y El ERP SAP Nube Privada del Cliente también. Si nuestro Dashboard marca "Ahórraste \$10,000" y El de su CFO Real marca "$2,000", Eres un Mentiroso Oficial Corporativo Despido Masivo. QA DataLead: Siempre Re-Validar contra Su Fuente De Verdad P&L. B2B Corporate = Math Driven Always Base.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Executive Intelligence Dashboard | Portal URL Oculto Secure| Metabase / PowerBI B2B | Data Architect Lead |
| Automatic Push Report | PDF Mail Semanal Cron | Bandejas C-Level T-1 | Sistem Ops |
| Alertas Churn Activas | Tickets Support Hubspot| Pipeline CS B2B | CS Director GTM |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [12-implementar-centro-excelencia-ia](12-implementar-centro-excelencia-ia-ritual.md) O R13 Business Review Directo Formal.
- **Condición de handoff:** Has puesto The Data Mirror. La corporación Cliente ya no trabaja a ciegas con metodologías abstractas o Agentes "Chéveres". Trabaja en Dólares, Horas y Productividad. Mantuiviste viva la llama de la Decisión B2B Original (R04 y R06). Ahora que adoran a tu firma B2B (Porque lograste Resultados Base Asimétricos), es hora de infectar biológicamente al Corporate Cliente entero armando El CoE (Center of Excellence IA) R12 para que los Evangelizadores Mutantes dentro del Organigrama Cliente Vendan Nivel Interno Tus Módulos Expandidos Puros R14.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Discrepancia Data Base | < 2% Error Margin Ops | 🟡 |
| Dashboard C-Level View Rate| > 85% Quarterly Logs | 🟡 |

- **NEXT:** `empresas-corporate → 12 → implementar-centro-excelencia-ia`
- **BLOCKERS:** `Problemas Si IT Del Cliente Es Hyper Legacy (Solo Servidores Privados 2004 Desconectados a la pared Inamovibles). Sin Extracción The Data Warehouse de Métrica Clara al Exterior The Dashboard Pierde Automación y Toca Pagar a un Analista Pobre de Junior A Sacar PDFs Manuales el Jueves en Excel Reduciendo The Margin Absoluto del Account B2B Operativo GTM.`

---

## Modal 10x: "El Transformador de Excusas a ROI Asimétrico" (Prompt Pro)

**Use case:** Es Final de Mes Operativo M4 post-rollout. El C-Level de la empresa quiere ver Ahorro Neto. Pero tus métricas solo muestran "Tickets Procesados" y "Resolución Media". Sabes que mandarle "Hicimos 4,000 Transacciones" no impresiona a un CFO Institucional The B2B Elite. Tienes que calcular (Castear) la "Basura Operativa de Logs" hacia "The CFO Language P&L Savings Projection". Activas al Copiloto Elite para diseñar las Fórmulas que pondrás en PowerBI.

```markdown
PROMPT:
"Actúa como un Vicepresidente Elite Mckinsey B2B Analytics y Director de Estrategia CFO-Cloud Tier 1.
Contexto: Como MetodologIA IA, estamos midiendo el Éxito Corporate Cliente Z. No tengo dólares medidos directamente, necesito extrapolarlos. Sólo tengo estas métricas crudas tontas del Backend Server:
[Cantidad de Procesos Automáticos Logrados Mes: 8,400]
[Tiempo Medio Por Proceso Reducido a: 2 Mins vs Los 18 Mins que ellos tardaban]
[Tasa de Error Actual: 1% vs Su 8% Histórico].
Misión: Conviérteme estos 3 indicadores técnicos En 3 Formulaciones Matemáticas Brillantes en Lenguaje Económico para meter en su Executive Dashboard. Yo le doy esto:
Asume un FTE (Empleado Full Time) Cuesta \$45 USD la hora allá en USA B2B Corporate. Asume que Un Error Penalidad Cuesta \$200 Arreglar Mínimo Operativo. 
Genera 1. El Cost Avoidance Dollar Formula. 2. The Opportunity Capacity Lift (En Horas Rescatadas equivalentes a personal nuevo Gratis). 3. El Risk Mitigation Ahorro $. Entrégame la métrica Final calculada en Texto Impactante 3 Bullets Listos para Pegar en el Summary Report B2B C-Level Siguiente. Demuestra agresividad Asimétrica P&L GTM Financiería Pura P2."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Corporate
> **Powered by:** MetodologIA Governance Protocol
