# Formulario F3 — Kickoff

**Version:** 2.0.0
**Fase:** F3 — Kickoff
**Campos:** 8+
**Tiempo de completado:** 20 minutos (colaborativo con cliente en ceremonia de kickoff)

---

## Campos

| # | Campo | Tipo | Obligatorio | Por que este campo |
|---|---|---|---|---|
| 1 | **Stakeholders** (nombre, rol, email, disponibilidad) | Tabla | SI (min 2: SPOC + Sponsor) | Sin stakeholder map, las decisiones se estancan. Saber la disponibilidad evita programar sesiones que nadie atiende. |
| 2 | **Contactos tecnicos** (nombre, rol, accesos que proveera) | Tabla | SI (si servicio requiere accesos) | Los accesos tecnicos son el bloqueador #1 en la primera semana. Identificarlos en kickoff ahorra 5-10 dias de espera. |
| 3 | **Sponsor ejecutivo** (nombre, cargo, email, frecuencia de check-in) | Texto | SI | El sponsor no es decorativo: aprueba cambios de alcance, desbloquea recursos, y escala internamente. Definir frecuencia de check-in evita que se desconecte. |
| 4 | **Criterios de exito** (3-5 metricas SMART) | Texto libre | SI | Si no se definen en el kickoff, al cierre no hay forma objetiva de decir si el proyecto fue exitoso. Ref: `definir-metricas-exito-sop.md` |
| 5 | **Canal de comunicacion preferido** | Seleccion | SI (Email/Slack/Teams/WhatsApp) | Usar el canal incorrecto = mensajes ignorados. WhatsApp funciona en LATAM pero es inapropiado para clientes enterprise que viven en Teams. |
| 6 | **Frecuencia de reportes** | Seleccion | SI (Semanal/Quincenal/Mensual) | Demasiado frecuente = overhead. Poco frecuente = el cliente siente que nadie le informa. Quincenal es el default. |
| 7 | **Formato de reportes** | Seleccion | SI (Email/Presentacion/Dashboard) | Un CxO quiere un executive summary de 1 pagina. Un Coordinador quiere el dashboard con detalle. Preguntar, no asumir. |
| 8 | **Restricciones o fechas criticas del cliente** | Texto libre | NO | Congelamientos de cambio en diciembre, cierres fiscales, fechas de junta directiva, vacaciones colectivas. Ignorar esto causa retrasos evitables. |

---

## Documentos Requeridos

| Documento | Formato | Obligatorio |
|---|---|---|
| Contrato firmado (MSA + ODS) | PDF con firmas | SI |
| Accesos a sistemas/plataformas | Credenciales o invitaciones | SI (si aplica) |
| Organigrama del equipo involucrado | PDF o imagen | Recomendado |

---

## Edge Case: Cliente se niega a compartir stakeholder list

**Situacion:** El SPOC dice "yo manejo todo, no necesitan hablar con nadie mas".

**Protocolo de escalamiento:**
1. Explicar al SPOC por que necesitamos el stakeholder map: "Para asegurar que las decisiones no dependan de una sola persona y que el proyecto no se detenga si usted no esta disponible."
2. Si el SPOC insiste, escalar al sponsor ejecutivo con el mismo mensaje.
3. Si el sponsor tambien se niega: **registrar como riesgo ALTO** en el kickoff. Documentar que MetodologIA advirtio sobre la dependencia de persona unica (bus factor = 1).
4. Continuar con SPOC como unico contacto pero con clausula en la minuta: "El cliente asume el riesgo de retrasos derivados de la no disponibilidad del SPOC."

**Por que importa:** En el 60% de los casos donde solo hay 1 contacto, el proyecto sufre retrasos de 2+ semanas cuando esa persona se va de vacaciones, se enferma, o cambia de rol.

---

v2.0.0 — Anotaciones "por que este campo", protocolo de rechazo de stakeholder list / Javier Montano + Claude
