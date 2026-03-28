# Evaluar Criterios de Aprobación — SOP

**Metadata**
- Nivel: Organismo (gate de certificación, compuerta binaria)
- Owner: Facilitador + Coordinador de Programa
- Momento: Semana 16 + buffer de hasta 3 meses post-programa (Sem 17-28)
- Acción: Evaluación binaria de 5 criterios. No hay "notas" ni "rúbricas numéricas".

**Propósito**
Evaluar si cada participante cumple los 5 criterios de aprobación del Programa de Empoderamiento y otorgar certificación (Gate G-CERT). Define entregables, estándares mínimos aceptables, proceso de evaluación, y mecanismo de buffer para quienes necesitan tiempo adicional.

---

## 1. Supuestos

1. **Criterios son conocidos desde Sem 1**: Cada participante recibe en onboarding una hoja de "Los 5 criterios de aprobación". Se reiteran en Sem 4, Sem 8, Sem 12, Sem 14. No es sorpresa.

2. **Entregables son auto-contenidos**: Un evaluador sin contexto de las sesiones puede revisar un entregable (ej. un prompt) y decir "cumple / no cumple". No requiere entrevista adicional de defensa oral.

3. **"Alto rendimiento" tiene definición operativa clara**: No es subjetivo. Un prompt de "alto rendimiento" es uno que: (a) produce resultado útil con estructura clara, (b) usa técnicas de prompt engineering (chain-of-thought, roles, contexto), (c) es reproducible (mismo prompt = resultado similar).

4. **"Valor medible" tiene definición clara**: Automatización/asistencia genera "valor" si: (a) ahorra tiempo (mínimo 2h/semana), (b) mejora calidad de output (comprobable), (c) es sustentable (no es un one-off). Participante debe poder articular: "Antes invertía X tiempo, ahora invierto Y, libero Z para..."

5. **El programa completa su ciclo en Sem 16 + buffer**: Participante no "abandona a mitad". Sí puede necesitar tiempo extra (3 meses máximo) para compilar entregables. Pero el programa pedagógico termina Sem 16.

6. **5/5 criterios es el estándar**: No hay "pasar con 4/5". Es binario: completitud o no completitud. Filosofía MetodologIA: el viaje de transformación requiere todos los pasos.

7. **Certificación abre puerta a Embajadores**: Certificado no es "diploma decorativo". Es acreditación que autoriza a participante a mentorar otros (pequeño impacto social) y acceder a comunidad privada con recursos avanzados.

---

## 2. Límites

- **Buffer máximo 3 meses**: Sem 17 hasta Sem 28 (inclusive). Si participante no certifica en Sem 28, cierre definitivo con reconocimiento de "participación incompleta" (no certificado, pero sí diploma de asistencia).

- **No hay reevaluación después de Sem 28**: Política clara. Protege integridad de certificación. Si alguien en Sem 30 dice "ahora cumplí el criterio 5", respuesta es: "Felicidades, pero la ventana de evaluación cerró. Para próximos programas..."

- **Evaluador es Facilitador + Coordinador**: No delegado a terceros (tutores, AI bots, etc.). La responsabilidad es personal. Si hay duda, ambos conversan y llegan a consenso.

- **No hay "notas parciales"**: No es 4.5/5 o 3.2/5. Es: Criterio 1 ✓ / ✗, Criterio 2 ✓ / ✗, etc. Reduce ambigüedad.

- **Participante no puede apelar después de 7 días de resultado**: Comunicamos resultado (Sem 16 ó Sem 28). Si participante discrepa, tienen 7 días para escribir apelación fundamentada. Pasados 7 días, resultado es final.

---

## 3. Los 5 Criterios (Definición Operativa)

### Criterio 1: Entregar 4 prompts de alto rendimiento

**Definición**: Participante presenta 4 prompts (archivos .txt, documento, o contenido en repositorio) que cumplen:
- Estructura clara: input → instrucción → contexto → output esperado.
- Técnica de prompt engineering: mínimo 2 de estas 5 técnicas:
  - Chain-of-thought ("Piensa paso a paso...")
  - Role assignment ("Eres un experto en...")
  - Ejemplos (few-shot prompting)
  - Restricciones claras ("Máximo 200 palabras", "Solo en español")
  - Iteración (prompt v1 → feedback → prompt v2 optimizado)
- Resultado útil: prompt genera output que participante o alguien puede usar inmediatamente.
- Diversidad: los 4 prompts son para contextos distintos (no 4 variantes del mismo).

**Evaluar**: ¿Cada prompt tiene estructura clara + técnica visible + resultado útil?
- ✓ Cumple: Sí a todo.
- ✗ No cumple: Faltan 2+ de estos aspectos en cualquiera de los prompts.

**Entrega**: Carpeta "Prompts" en repositorio con 4 archivos. Nombre claro: "Prompt_Productividad.txt", "Prompt_Email_Profesional.txt", etc.

---

### Criterio 2: Entregar 4 asistentes personalizados útiles (para sí mismo y para otros)

**Definición**: Participante documenta 4 "asistentes personalizados" que creó usando IA (pueden ser en ChatGPT Custom Instructions, en herramientas como Make/Zapier, o en Notion AI).

Cada asistente debe:
- Tener propósito específico ("Asistente de redacción de mails corporativos").
- Ser reproducible: otro puede usarlo o entender cómo replicarlo.
- Generar valor: ahorra tiempo, mejora calidad, reduce fricción.
- Documentación: 1-2 párrafos explicando qué hace, cómo usarlo, un ejemplo de input/output.

**Evaluar**: ¿Cada asistente es útil, reproducible, documentado?
- ✓ Cumple: Sí a todo en los 4.
- ✗ No cumple: Uno o más asistentes son confusos, no reproducibles, o "teóricos" sin uso real.

**Entrega**: Carpeta "Asistentes" en repositorio con 4 subcarpetas, cada una con archivo de documentación + ejemplo de uso.

---

### Criterio 3: Establecer declaraciones estratégicas, tácticas y operativas claras

**Definición**: Participante documenta (en documento de Notion, Google Doc, o .md en repositorio):
- **Declaración estratégica** (1 párrafo): "¿Quién soy? ¿Cuál es mi propósito en los próximos 12 meses?" (ej. "Soy especialista en procesos; quiero reducir carga administrativa de mi equipo en 40%").
- **Declaración táctica** (3-5 puntos): "¿Cómo usaré IA específicamente para alcanzar eso?" (ej. "Automatizaré reportes semanales", "Crearé asistentes para onboarding", "Documentaré procesos con IA").
- **Declaración operativa** (paso a paso): "¿Cuál es mi forma de trabajo semanal con IA?" (ej. "Lunes: sesión 1h de prompt engineering. Martes-Viernes: uso asistentes en mis tareas. Viernes: review de qué funcionó").

**Evaluar**: ¿Las 3 declaraciones están alineadas, son realistas, y son específicas?
- ✓ Cumple: Las 3 están escritas, son claras, y hay coherencia (estrategia → tácticas → operaciones).
- ✗ No cumple: Faltan una o más, o son genéricas ("Quiero ser productivo con IA").

**Entrega**: 1 documento en repositorio, máx 2 páginas, claro y concreto.

---

### Criterio 4: Construir y documentar una forma de trabajo a su estilo y aplicarla

**Definición**: Participante:
1. **Documenta su forma de trabajo** (cómo integra IA en su rutina diaria/semanal). Documento que describe: horarios, herramientas usadas, flujos (ej. "Lunes 8-9am: reviso emails y uso asistente de síntesis"; "Miércoles 2-3pm: prompt engineering para tarea X").
2. **Aplica esa forma de trabajo** durante mínimo 4 semanas consecutivas (evidencia: screenshots, logs, o anotaciones que muestren uso real).
3. **Refleja sobre lo que funcionó y lo que no**: documento de reflexión de 1-2 párrafos (ej. "El horario de Lunes 8-9am fue óptimo; miércoles 2-3pm no, porque estoy muy ocupado").

**Evaluar**: ¿Forma de trabajo está documentada, fue aplicada realmente, y hay reflexión?
- ✓ Cumple: Sí a todo. Hay evidencia de aplicación (no solo planes teóricos).
- ✗ No cumple: Documentación existe pero no hay evidencia de aplicación, o falta reflexión.

**Entrega**: Carpeta "Forma_de_Trabajo" con: documento de forma de trabajo + evidencia (screenshots, logs, capturas) + reflexión.

---

### Criterio 5: Automatizar o asistir en 4 actividades que generen valor medible

**Definición**: Participante identifica 4 actividades de su trabajo/vida que automatizó o asistió usando IA, tal que:
- Cada actividad ahorra tiempo: mínimo 2h/semana o 8h/mes (estimado o medido).
- El ahorro es medible: "Antes: 5h/semana redactando reportes. Ahora: 1h/semana con asistente. Ahorro: 4h/semana".
- El ahorro es sustentable: no es "un prompt que usé una vez", sino algo que repite cada semana/mes.
- Hay 4 actividades distintas (no variantes de la misma).

**Ejemplos**:
1. Automatizar síntesis de emails largos: -3h/semana.
2. Asistente de respuestas de soporte: -2h/semana.
3. Generación de reportes ejecutivos: -1h/semana.
4. Transcripción de notas de reunión → resumen: -2h/semana.
Total: -8h/semana liberadas.

**Evaluar**: ¿4 actividades distintas, cada una con ahorro medible (≥2h/semana?
- ✓ Cumple: Sí. 4 actividades, cada una con estimación clara de ahorro.
- ✗ No cumple: Menos de 4 actividades, o actividades sin ahorro cuantificado, o "teóricas".

**Entrega**: Documento en repositorio "Automatizaciones_Impacto" con tabla:
| Actividad | Antes (h/semana) | Ahora (h/semana) | Ahorro (h/semana) |
|-----------|------------------|------------------|-------------------|
| Reportes | 5 | 1 | 4 |
| Emails | 3 | 1.5 | 1.5 |
| ... | ... | ... | ... |

---

## 4. Casos Borde (5-7)

1. **Participante entrega prompts pero son de baja calidad**: "Usa ChatGPT para escribir un email" vs. "Usa rol 'especialista de copywriting corporativo', contexto 'email a CEO', restricción 'máx 5 párrafos', ejemplo 'aquí está un mail que funcionó antes'..." El estándar de "alto rendimiento" no es experto-level, pero sí requiere intención y estructura. Si prompts son muy genéricos, pedir revisión. Conversación 1-1: "¿Podrías mejorar estos 2 prompts con más estructura? Tomas 1 semana".

2. **Participante automatizó 4 tareas pero el ahorro es especulativo, no medido**: "Ahorraría 2h/semana si usara esto." Pedir evidencia real: "¿Lo usaste realmente? ¿Cuántas veces? ¿Qué tiempo te ahorró?" Si puede mostrar 2-3 semanas de uso real, ok. Si no, preguntar: "¿Es una automatización teórica o ya está en marcha?" Si es teórica, pedir que la aplique 1 semana y reporte.

3. **Participante con barrera de idioma**: Programa en español, pero sus herramientas están en inglés. ¿Vale? Sí. Criterios no especifican idioma. Si tiene dificultad para documentar en español, Coordinador puede permitir documentación en inglés o spanglish, siempre que sea claro.

4. **Participante que cumple 5/5 en Sem 10**: "Ya hice todos mis entregables, ¿puedo graduarme antes?" Política: no. El programa es 16 semanas de viaje (no solo entregables). Los meses 3-4 son de integración, reflexión, preparación para embajador. Respuesta: "Felicidades por avanzar rápido. Sigues participando en el programa; tus entregables ya están válidos, pero completamos las 16 semanas juntos."

5. **Participante que no entrega nada pero pide certificado porque pagó**: Conversación clara: "El certificado no es por pago, es por completar criterios. Has pagado, tienes acceso a programa y comunidad, pero certificación requiere entregables. ¿Quieres ayuda para empezar?" Si respuesta es "no tengo tiempo", opción: "Te ofrezco buffer de 3 meses sin costo extra. ¿Te interesa?"

6. **Empresa que exige certificación para todos sus empleados sin importar calidad**: "Mis 8 empleados deben tener certificado para poder promocionarlos en la empresa." Respuesta clara: "Certificación es por cumplimiento de criterios, no por presión corporativa. Cada empleado debe pasar evaluación binaria. Podemos ofrecerles soporte intenso en buffer para que todos lo logren, pero el estándar no se flexibiliza." Si empresa insiste, escalar a leadership de MetodologIA para decisión comercial.

7. **Participante que cumple 4/5 pero es "casi": "Mi criterio 5 tiene solo 3.8 automatizaciones, redondeamos a 4?" Política: no. 3.8 ≠ 4. Es <5/5, entra a buffer. Conversación: "Te faltan 0.2 automatizaciones. En el buffer, tomas 1 semana para completar. Entonces certificas sin problema."

---

## 5. Decisiones de Diseño

- **Gate binario (no rúbrica numérica)**: Razón: la rúbrica (1-5 puntos por criterio = 5-25 puntos totales) introduce ambigüedad ("¿Es 3.5 o 4?"). Binario es más justo: cumple o no cumple. Reduce negociación, comunica claridad.

- **5/5 criterios es inviolable**: Flexibilizar a "4/5 es suficiente" degrada integridad. Certificado de MetodologIA significa: "Esta persona pasó el viaje completo, tiene capacidad de empoderador". No podemos certificar a alguien que solo automatizó 3 tareas.

- **Buffer de 3 meses (Sem 17-28)**: Razón: cada persona tiene ritmo distinto. Algunos necesitan 2 semanas extras, otros 8 semanas. 3 meses es ventana generosa sin diluir completitud. Pasados 3 meses, línea en la arena (es psicológico también: "Tienes hasta Sem 28" motiva).

- **Soporte async en buffer**: No abandonamos a participantes rezagados. Sesiones mensuales de Clínica IA (sin obligación de asistencia) + canal de WhatsApp responden <48h. Es soporte real, sin presionar.

- **No hay graduación anticipada**: Razón: el programa pedagógico requiere ciclos semanales, reflexión, integración. Entregar todos los criterios en Sem 10 es síntoma de que: (a) participante es muy capaz (excelente), o (b) criterios son muy fáciles (requiere revisión curricular). En ambos casos, terminar las 16 semanas. El aprendizaje es el viaje, no los entregables.

- **Participante decide si entra a buffer o no**: En Sem 16, si cumple <5/5, ofrecemos buffer. Participante puede: (a) aceptar buffer ("quiero completar"), (b) rechazar ("estoy ocupado, está bien como está"). Si rechaza, recibe "Reconocimiento de Participación" (no certificado, pero sí diploma de asistencia + acceso a comunidad general, no embajadores).

- **Evaluador es humano (no AI)**: Razón: criterios requieren juicio. Un bot diría "prompts ✓ checkmark, 4 asistentes ✓ checkmark". Un facilitador diría "estos prompts son genéricos, hablamos y mejoramos". Juicio humano es irreemplazable aquí.

---

## 6. Anti-Patterns

- **"Todos aprueban"**: Presión de mantener altas tasas de certificación (NPS, reputación) lleva a flexibilizar criterios. "Este participante casi cumple, certificamos para mantenerlo contento." Resultado: certificación pierde valor, egresados débiles, marca dañada. *Cura*: Gate G-CERT es inviolable. Aceptar que <100% certifican. Es ok. Comunicar a liderazgo: "Certificamos a 68% en Sem 16 + 17% en buffer, total 85%. Es saludable."

- **"El entregable perfecto"**: Expectativa de que participante principiante cree prompts "experto-level" o automatizaciones "production-ready". Resultado: participante se desanima ("no es suficiente bueno"), no entra a evaluación. *Cura*: Estándar es "aceptable", no "perfecto". Comunicar: "Tu prompt tiene estructura, usa chain-of-thought, genera resultado útil. Cumple. No necesita ser obra maestra."

- **"Abandonar el buffer"**: Participante entra a buffer (Sem 17), pero facilitador/coordinador desaparecen ("programa terminó"). Participante se siente solo, abandona. *Cura*: Buffer tiene soporte real (Clínica IA 2x/mes, canal WhatsApp, respuesta <48h). Comunicar en Sem 16: "Buffer no es abandono, es apoyo concentrado."

- **"Evaluación opaca"**: Facilitador da resultado ("No cumples") sin explicación. Participante se siente injusticia. *Cura*: Evaluación es transparente. Documento: "Criterio 1: Cumples (aquí están los 4 prompts, todos con estructura). Criterio 2: No cumples (te faltan 1.3 asistentes documentados, acá te muestro qué falta)." Claro.

- **"Apelar sin límite"**: Participante apela resultado cada semana durante 2 meses. Consume recursos, dilata cierre. *Cura*: Ventana de apelación es 7 días. Pasados 7 días, resultado es final. Comunica esto en Sem 16.

---

## 7. Fallbacks

1. **Si evaluador (facilitador) no está disponible en Sem 16**: Coordinador puede evaluar con evidencia clara. Si hay duda, panel: facilitador (vía async) + coordinador conversan y llegan a consenso. Evaluación se dilata máx 1 semana.

2. **Si hay disputa sobre un criterio** (participante dice "cumplí", facilitador dice "no"):
   - Paso 1: Facilitador escribe fundamentación clara de por qué no cumple (máx 200 palabras).
   - Paso 2: Participante responde (máx 200 palabras) argumentando por qué sí cumple.
   - Paso 3: Panel (Coordinador + Facilitador + otro evaluador neutral si hay) revisa ambas posiciones, decide.
   - Tiempo total: máx 2 semanas. Comunicar resultado.

3. **Si participante contesta apelación pero no cumple aún**: Ejemplo, criterio 5 (automatizaciones). Participante dice: "Medí mal, son 3.2 horas de ahorro, no 4." Respuesta: "Entiendo. Toma 1 semana, prueba la automatización 2 veces más, mide bien, y reenvía." Se aceptan cambios en buffer.

4. **Si buffer se extiende más de 3 meses** (participante pide prórroga en Sem 27): Conversación 1-1. Si hay razón válida (enfermedad, cambio laboral imprevisto, etc.), considerar prórroga de 2-4 semanas máximo. Si no hay razón, cierre en Sem 28.

5. **Si facilitador cambia mid-evaluación** (facilitador se desvincula, nuevo evaluador retoma): Nuevo evaluador revisa criterios "en frío" (sin contexto de relación con participante). Puede cambiar resultado. Cura: evitar cambios de evaluador. Si es inevitable, ambos facilitadores conversan, leen notas, llegan a consenso antes de comunicar.

6. **Si participante no contesta comunicaciones durante buffer**: Facilitador intenta contacto en Sem 18, Sem 22, Sem 26. Si no hay respuesta post-Sem 26, enviar último email: "Parece que no continuarás. Cerramos tu participación en Sem 28 con 'participación incompleta'. Si cambias de opinión antes de Sem 28, avísanos." Luego, cierre.

---

## Ejecución Operativa: Las 2 Fases Principales

### Fase 1: PREPARACIÓN (Sem 14)

**Owner**: Coordinador + Facilitador

**Actividades**:
1. **Recordatorio a participantes**: Email + WhatsApp en Sem 14 con asunto "3 semanas para certificación. ¿Cómo vas?"
   - Adjuntar checklist de 5 criterios.
   - Link a repositorio donde subir entregables.
   - Deadline: "Los entregables van máximo Sem 15 mediodía. Sem 16 es evaluación pura."

2. **Dashboard de progreso**: Coordinador crea tabla simple (Google Sheets):
   | Participante | Criterio 1 | Criterio 2 | Criterio 3 | Criterio 4 | Criterio 5 | Status |
   |---|---|---|---|---|---|---|
   | Juan | En progreso | Completado | Completado | Pendiente | Pendiente | 2/5 |
   | María | Completado | Completado | Completado | Completado | Completado | 5/5 ✓ |

   Compartir con facilitador. Identificar: ¿quiénes están 5/5? ¿Quiénes están rezagados?

3. **Contacto personal con rezagados**: Facilitador hace contacto 1-1 con participantes <4/5. Conversación: "Veo que te faltan criterios X, Y. ¿Qué está pasando? ¿Te puedo ayudar a acelerar?"

4. **Sesión de Clínica IA** (Sem 15, opcional): Facilitador ofrece sesión extra (1h) para participantes con dudas específicas. "¿Cómo documento mis asistentes? ¿Qué cuenta como 'alto rendimiento'?"

5. **Repositorio listo**: Confirmación de que todos tienen acceso, saben dónde subir, entienden estructura de carpetas.

**Salida**: Dashboard preparado, participantes recordados, rezagados contactados, Clínica IA ofrecida.

---

### Fase 2: EVALUACIÓN (Sem 16)

**Owner**: Facilitador (evaluador principal) + Coordinador (validador)

**Procedimiento**:

**T-0 (Fin de Sem 15 / inicio de Sem 16)**:
1. **Recolección de entregables**: Participantes suben entregables hasta Sem 15 mediodía. Coordinador verifica que están en repositorio correctamente organizados.

2. **Setup de evaluación**: Facilitador + Coordinador bloquean 4h (pueden ser distribuidas) para evaluar todos los participantes.

**T-1 (Evaluación principal, ~3-4 horas)**:
1. **Revisar entregable de cada criterio**: Por cada participante, revisar:
   - Criterio 1: ¿4 prompts están? ¿Tienen estructura? ¿Técnica visible?
   - Criterio 2: ¿4 asistentes? ¿Documentados? ¿Reproducibles?
   - Criterio 3: ¿3 declaraciones (estratégica, táctica, operativa)? ¿Coherentes?
   - Criterio 4: ¿Forma de trabajo documentada? ¿Evidencia de aplicación? ¿Reflexión?
   - Criterio 5: ¿4 automatizaciones con ahorro medible?

2. **Marcar como ✓ o ✗**: Uso de tabla o documento:
   ```
   JUAN PÉREZ
   Criterio 1: ✓ (4 prompts, buen structure)
   Criterio 2: ✓ (4 asistentes bien documentados)
   Criterio 3: ✓ (3 declaraciones claras)
   Criterio 4: ✗ (forma de trabajo documented, pero evidencia de aplicación es débil, solo 1 semana medida)
   Criterio 5: ✓ (5 automatizaciones, promedio 1.5h/semana de ahorro)

   RESULTADO: 4/5 → BUFFER
   ```

3. **Notas de evaluación**: Para cada ✗, escribir 1-2 frases explicando qué falta. Usar estas notas en comunicación post-resultado.

4. **Coordinador valida**: Coordinador revisa evaluación del facilitador. Si hay desacuerdo, conversan. Consenso. Resultado final.

**T+2 (Comunicación de resultados, <48h post-evaluación)**:

1. **Participantes con 5/5**: Email personalizado:
   ```
   Asunto: 🎉 ¡CERTIFICADO! Felicidades por completar el Programa

   Hola [Nombre],

   Acabamos de evaluar tus entregables y ¡CUMPLES LOS 5 CRITERIOS! 🚀

   - Criterio 1 (Prompts): Cumples
   - Criterio 2 (Asistentes): Cumples
   - Criterio 3 (Declaraciones): Cumples
   - Criterio 4 (Forma de trabajo): Cumples
   - Criterio 5 (Automatizaciones): Cumples

   Tu certificado estará listo el [fecha]. Próxima semana tienes invitación a "Embajadores 101".

   Orgullo de ti. Nos vemos en comunidad.
   [Facilitador]
   ```

2. **Participantes con <5/5**: Email personalizado:
   ```
   Asunto: Resultado de evaluación + Buffer de 3 meses

   Hola [Nombre],

   Revisamos tus entregables. CUMPLES 4/5 criterios. Aquí está el desglose:

   - Criterio 1 (Prompts): Cumples ✓
   - Criterio 2 (Asistentes): Cumples ✓
   - Criterio 3 (Declaraciones): Cumples ✓
   - Criterio 4 (Forma de trabajo): No cumples ✗ — Te falta evidencia clara de aplicación por 4 semanas. Vimos 1 semana, necesitamos 4.
   - Criterio 5 (Automatizaciones): Cumples ✓

   BUENA NOTICIA: Tienes buffer de 3 meses (hasta [fecha Sem 28]) para completar el criterio faltante.

   Te ofrezco:
   - Sesión de Clínica IA 1x/mes (próxima [fecha]), sin obligación de asistencia.
   - Canal de WhatsApp para preguntas (respuesta <48h).
   - Evaluación final en [fecha Sem 28].

   Responde este email si tienes dudas o si necesitas ayuda para empezar.
   ```

3. **Comunicación sincrónica (opcional)**: Si programa lo permite, videollamada grupal de 30min donde facilitador comparte resultados generales (sin datos individuales):
   - "22 participantes cumplieron 5/5 (CERTIFICADOS)."
   - "8 participantes entran a buffer (cumplieron 4/5)."
   - "Explicamos ahora qué significa buffer..."

**Salida**: Resultados comunicados. Certificados emitidos para 5/5. Buffer activado para <5/5.

---

### Fase 3: BUFFER (Sem 17 - Sem 28, si aplica)

**Owner**: Facilitador + Coordinador (soporte async)

**Actividades**:
1. **Clínica IA mensual** (Sem 18, 22, 26): Sesión de 1h, facilitador disponible. Preguntas abiertas sobre el criterio faltante. No obligatoria, pero recomendada. Grabación disponible para async.

2. **Canal de WhatsApp**: Grupo privado "Buffer Sem 16" con participantes en buffer. Participante pregunta, facilitador responde <48h.

3. **Re-evaluación en Sem 28**: Participante reenvía entregables mejorados del criterio faltante. Facilitador re-evalúa.
   - Si ahora cumple: ✓ → CERTIFICACIÓN en Sem 28.
   - Si aún no cumple: ✗ → Cierre con "Participación incompleta" (diploma de asistencia, sin certificado).

4. **Documentación**: Registro claro en base de datos de MetodologIA:
   - Fecha de resultado Sem 16.
   - Criterios cumplidos.
   - Si entra a buffer, fecha de re-evaluación.
   - Resultado final (certificado o participación incompleta).

**Salida**: Buffer completado, certificaciones finales emitidas o participación cerrada.

---

## Métrica de Éxito

| Métrica | Target | Frecuencia | Propósito |
|---------|--------|-----------|----------|
| **Certificación Sem 16** | ≥70% | Post-Sem 16 | Punto de partida |
| **Certificación final** (con buffer) | ≥85% | Post-Sem 28 | Éxito a largo plazo |
| **Criterio más difícil** | Registrar cuál | Post-análisis | Retroalimentar diseño curricular |
| **Tiempo promedio a certificación** | 16 semanas (no buffer) | Reportar | Eficiencia |
| **Apelaciones / disputas** | <5% de participantes | Post-evaluación | Claridad del proceso |

---

## Integraciones

**Upstream**:
- **gestionar-cohorte-sop.md**: Proporciona estado de participantes al final del programa. Facilitador sabe quiénes están listos para evaluación.

**Downstream**:
- **onboarding-comunidad-embajadores-sop.md**: Participantes certificados (5/5) se transfieren a este SOP. Incorporación a Comunidad de Embajadores.

**Cross-functional**:
- **Diseño Curricular**: Feedback sobre criterio más difícil → ajustes en M-04, M-08, M-12.
- **R-03 (Caso de éxito)**: Para cada certificado, Coordinador recolecta: "¿Qué impacto tuvo?" + foto + breve testimonio → va a Comercial.
- **Liderazgo**: Reporte mensual de certificaciones (tasas, tendencias, qué está fallando).

---

## Documentos Relacionados

- gestionar-cohorte-sop.md (antecedente, proporciona participantes)
- onboarding-comunidad-embajadores-sop.md (siguiente paso post-certificación)
- facilitar-ciclo-semanal-sop.md (donde se generan entregables progresivos)
- R-03 (reporte de casos de éxito para comercial)

---

## Checklist de Evaluación

- [ ] Sem 14: Recordatorios enviados a participantes
- [ ] Sem 14: Dashboard de progreso creado
- [ ] Sem 14: Contacto personal con rezagados
- [ ] Sem 15: Clínica IA ofrecida
- [ ] Sem 15 mediodía: Deadline de entregables
- [ ] Sem 16: Evaluación realizada (4h bloqueadas)
- [ ] Sem 16: Coordinador valida resultados
- [ ] Sem 16 T+2: Resultados comunicados
- [ ] Sem 16: Diplomados emitidos (5/5)
- [ ] Sem 16: Buffer activado (<5/5)
- [ ] Sem 18, 22, 26: Clínica IA realizadas
- [ ] Sem 28: Re-evaluación realizada
- [ ] Sem 28 T+2: Certificaciones finales comunicadas
- [ ] Post-Sem 28: Documentación archivada

---

**Versión**: 1.0 | **Fecha**: 2026-03-24 | **Estado**: Publicado
