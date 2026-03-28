# Formulario F1 — Diagnostico

**Version:** 2.0.0
**Fase:** F1 — Diagnostico
**Campos:** 6
**Tiempo de completado:** 5 minutos (guiado por Sales Rep)

---

## Campos

| # | Campo | Tipo | Obligatorio | Opciones/Validacion | Por que este campo |
|---|---|---|---|---|---|
| 1 | **Industria** | Seleccion | SI | Tecnologia / Financiero / Educacion / Salud / Manufactura / Retail / Gobierno / Otro | Determina que servicios del catalogo aplican y que regulaciones considerar (Ej: Financiero = SFC, Salud = INVIMA/habeas data reforzado). |
| 2 | **Tamano de empresa** | Seleccion | SI | 1-10 / 11-50 / 51-200 / 201-1000 / 1000+ | Define si el engagement es SMB o Enterprise. Cambia el pricing model, la complejidad del delivery, y el nivel de seniority del equipo asignado. |
| 3 | **Rol del contacto** | Seleccion | SI | CxO/VP / Director / Gerente / Coordinador / Especialista / Otro | Un CxO busca impacto estrategico; un Coordinador busca resolver un problema tactico. Cambia el pitch y la propuesta de valor. |
| 4 | **Madurez en IA/Transformacion (1-5)** | Escala | SI | 1=Nada, 2=Explorando, 3=Primeros pilotos, 4=Operando, 5=Optimizando | Evita vender un programa avanzado a quien necesita alfabetizacion basica (o viceversa). Madurez 1-2 = bootcamp/sensibilizacion. 3-4 = consultoria de implementacion. 5 = optimizacion/gobierno. |
| 5 | **Principal dolor o necesidad** | Texto libre | SI | Min 20 caracteres | Las propias palabras del cliente revelan urgencia, presupuesto implicito, y si el dolor es real o aspiracional. |
| 6 | **Metodo de contacto preferido** | Seleccion | SI | Email / WhatsApp / Llamada / Teams/Zoom | Respetar la preferencia del cliente en el primer contacto aumenta la tasa de respuesta al follow-up en un 30%. |

---

## Preguntas adicionales por industria

Despues de completar los 6 campos base, el Sales Rep hace **1-2 preguntas de profundizacion** segun la industria seleccionada:

| Industria | Preguntas adicionales | Razon |
|---|---|---|
| **Financiero / Banca** | "Estan regulados por la SFC?" / "Tienen oficial de cumplimiento asignado al proyecto?" | Define si necesitamos involucrar a nuestro equipo de compliance desde pre-sales. |
| **Salud** | "Manejan datos clinicos de pacientes?" / "Tienen comite de etica o IRB?" | Si hay datos clinicos, el onboarding requiere Habeas Data reforzado y posiblemente Data Protection Impact Assessment. |
| **Gobierno** | "El proceso de compra es por licitacion, convenio, o contratacion directa?" / "Tienen CDP aprobado?" | Cambia completamente los tiempos y el gate de F2 (ver variante sector publico en el proceso master). |
| **Manufactura** | "Los datos son de planta (OT) o corporativos (IT)?" / "Tienen redes segmentadas IT/OT?" | Datos de planta implican cyberseguridad industrial, tiempos de acceso mas largos, y posibles restricciones de conectividad. |
| **Startup (1-50 personas)** | "Tienen equipo tecnico dedicado o el CTO hace todo?" / "Cual es su runway actual?" | Si no hay equipo tecnico, el delivery es mas hands-on. Si el runway es <6 meses, evaluar riesgo de no-pago. |
| **Educacion** | "Es educacion superior, K-12, o corporativa?" / "Hay semestres o calendarios que condicionen el timeline?" | El calendario academico es un hard constraint. Un piloto en julio puede ser imposible si no hay estudiantes. |
| **Retail** | "Tienen operacion omnicanal o solo fisica/digital?" / "Cual es su pico estacional?" | No iniciar proyectos complejos 30 dias antes del Black Friday / Navidad. |

---

## Regla de Datos

- **NO recolectar en esta fase:** datos personales de terceros, datos financieros, documentacion formal
- **Consentimiento:** Verbal o implicito (formulario web con aviso de privacidad). Suficiente para esta fase.

---

v2.0.0 — Preguntas por industria, anotaciones "por que este campo" / Javier Montano + Claude
