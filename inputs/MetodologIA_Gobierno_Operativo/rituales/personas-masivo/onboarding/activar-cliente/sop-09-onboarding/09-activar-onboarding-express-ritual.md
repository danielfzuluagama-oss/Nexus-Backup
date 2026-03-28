---
id: "09"

segmento: "personas-masivo"
journey: "onboarding"
proceso: "activar-cliente"
sop: "sop-09-onboarding"
ritual-slug: "09-activar-onboarding-express"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Community Manager / CX Lead"
- backup: "Content Lead"
frecuencia: "asincrónica automática (trigger post-acceso R08)"
herramientas:

- "LMS (Plataforma de Cursos) / Notion"
- "Email Automation (Onboarding Sequence)"
- "Herramienta de Video Asíncrono (Loom/Vimeo)"

entry-criteria:

- "Compra completada (Ritual 08)"
- "Credenciales de acceso entregadas y funcionales"
exit-criteria:

- "Cliente inicia sesión por primera vez en <24h"
- "Video de bienvenida consumido"
- "Cliente completó su 'Quick Win' configurativo en ≤72h"

kpi: "Activation Rate (Target: ≥60% inician sesión y completan el setup en las primeras 72h)"
leading-indicators:

- "First-login Time (Tiempo entre compra e ingreso)"
- "Welcome Video Completion Rate (Drop-off del video 1)"
- "Quick Win Submission Rate"

riesgos-controles:

- riesgo: "Comprador Fantasma (Compra por impulso y nunca usa el producto)"

  control: "El onboarding NO enseña teoría, fuerza una acción mecánica (Ej. 'Copia este template ahora') para romper la inercia."

- riesgo: "Abrumar al usuario el Día 1 con toda la plataforma"

  control: "Onboarding Express: Módulos bloqueados (Drip) excepto el Módulo 0 (Setup) para enfocar visión de túnel."

- riesgo: "Miedo a la tecnología / Ansiedad de plataforma"

  control: "Soporte proactivo en la H+24. 'Noté que no has entrado, ¿tienes algún problema con la contraseña?'"
evidencias:

- "Log de Primer Login en LMS"
- "Marca de finalización del Módulo 0 (Onboarding)"
- "Asset de Quick Win guardado en el perfil del usuario"
---

# Ritual: Activar Onboarding Express — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Regla de Activación:** Darle acceso a alguien no es activarlo. En digital masivo, si el cliente no logra una victoria micrométrica en las primeras 72 horas, estadísticamente se convierte en un "Churn silencioso" (no refunda, pero nunca lo usa y nunca vuelve a comprar).
> **Onboarding Express:** Entrar → Ver instrucciones (90s) → Ejecutar Setup (15m) → Sentir progreso.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** El cronómetro comienza en el instante en que el sistema de Delivery (R08) envía el correo con las credenciales.
- **Pre-ritual:** ¿El "Módulo 0" o "Start Here" de la plataforma está publicado, pulido y es lo primero que se ve al loguearse?
- **Contexto:** El nivel de dopamina del cliente post-compra baja rápidamente. Necesitamos inyectar seguridad técnica (el login funciona) y claridad táctica (sé exactamente qué hacer los próximos 15 minutos). No es momento para soltarle videos teóricos de 1 hora.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Lograr que el cliente rompa la barrera de la inacción ingresando a la plataforma y completando una tarea mecánica sencilla que lo prepare para el consumo del valor core.
- **Definición de Éxito (DoD):**
  - [ ] Primer login confirmado en sistema
  - [ ] Video de "Start Here" (Onboarding) visualizado
  - [ ] Quick Win de Setup completado
  - [ ] Estado en CRM cambia de `Customer_New` a `Customer_Activated`
- **Definición de Éxito del Lead:** "Pensé que configurar esto iba a ser un lío, pero el video de bienvenida era claro, di 3 clics y ya dejé todo listo para empezar el programa real."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | CX Lead | Tasa de activación temprana de la cohorte |
| **Responsible** | Automation Ops | Orquestación de los nudges (recordatorios) por email/WhatsApp |

| **Consulted** | Content Lead | Diseño del Quick Win inicial |
| **Informed** | Product Led | Datos sobre dónde se atasca la gente el Día 1 |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Secuencia de correos de Activación (Día 1, Día 2, Día 3) configurada en CRM.
- [ ] Módulo "Start Here" en la plataforma posicionado como único paso obvio.
- [ ] Video de Bienvenida grabado (Max 2 mins, Tono Neo-Swiss: directo y profesional).
- [ ] Tarea de Quick Win diseñada (Ej. Duplicar un tablero de Notion, llenar un quiz de basal, unirse al Discord).

---

## 5. Ejecutar — Parte 1: Inmersión y Setup

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Disparar Email de Onboarding Opcional (Post-Bienvenida)

**Acción:** 2 horas después de la compra (R08), enviar "Day 1: Roadmap".

**Script:** "[Nombre], revisé y tu acceso está activo. No intentes ver todo hoy. Tu único objetivo hoy es entrar a [Link], ver el video 'Start Here' de 2 minutos y [Ejecutar Quick Win]. Eso es todo."
**Output:** Expectativa simplificada.

### 5.2 — Dashboard de Plataforma: Visión de Túnel

**Regla de UX:** El usuario entra al LMS y solo tiene un botón gigante que dice "Empieza por aquí". El resto del menú debe estar atenuado visualmente.

**Output:** Cero fatiga de decisión.

### 5.3 — El Video de Expectativas (90 Segundos)

**Acción:** Video embebido autoplay.

**Estructura del Script:**

- Bienvenida validante ("Tomaste una gran decisión").
- La Regla del Juego ("Esto no es Netflix, aquí se implementa").
- La Única Tarea ("Baja y haz clic en duplicar el template base. Nos vemos en el Módulo 1").

**Output:** Cambio de mindset de consumidor a implementador.

### 5.4 — Ejecución del Quick Win Configurativo

**Contexto:** Un quick win de onboarding NO es aprender una habilidad, es preparar la cancha. (Ej. Hacerse la cuenta en X plataforma suplementaria, unirse al chat de cohortes, o llenar un formulario basal de sus métricas de hoy).

**Output:** Micro-victoria mecánica.
**Evidencia:** Form Submit / Discord API.

### 5.5 — El "Dopamine Hit" Automático

**Acción:** Apenas el LMS/Sistema detecta el quick win completado, dispara confeti digital o un correo instantáneo.

**Script:** "¡Check! Setup listo. Tienes la maquinaria andando. Ahora sí, te abrí el Módulo 1. Empieza cuando quieras."
**Output:** Refuerzo conductual positivo.

### 5.6 — Rutina de Nudge: El Despistado (+24h)

**Contexto:** Compró pero el LMS registra que NUNCA hizo login.

**Acción:** Disparar correo "Soporte Preventivo".
**Script:** "Hola [nombre], soy [Humano de CX]. El sistema me avisa que no has podido entrar. Nueve de cada diez veces es porque el correo del password cayó en Spam o hubo un typo en el email. Dime con un simple 'Sí' si necesitas que te resetee la clave manualmente."

**Output:** Re-engagement técnico.

### 5.7 — Rutina de Nudge: El Procrastinador (+48h)

**Contexto:** Hizo login pero no completó el Quick Win.

**Acción:** Disparar correo de anclaje de dolor.
**Script:** "Entraste a la plataforma pero no hiciste el [Quick Win]. Sin ese paso, el método para resolver [Dolor inicial de R03] no arranca. Te toma literalmente 5 minutos. Dale click aquí."

**Output:** Recovery de activación.

### 5.8 — Taggear Activación en CRM (El Hito)

**Acción:** Una vez que logramos el DoD, el sistema actualiza el Lead Status. Se detienen los recordatorios de onboarding.

**Output:** Tag `Onboarded_Activated`.

### 5.9 — Transición a Delivery (Apertura de Módulos)

**Acción:** El LMS desbloquea el contenido Core (R10) o inicia el Drip Schedule.

**Output:** Handoff interno de plataforma.

### 5.10 — Monitorear Activation Rate Diario

**Acción:** Registrar cuántos leads de la cohorte del día de hoy están "En rojo" (sin activar >72h).

**Output:** Panel de salud de cohorte.

---

## 6-7. Ejecutar — Parte 2 y 3: Rescate y Escalada

### 6.1-6.5 — Escalada a WhatsApp Operativo (Si pasan >96h sin login, un humano escribe un mensaje de soporte directo)

### 6.6-6.10 — Analizar correlación entre el tiempo de primer login y el refund rate (Los que tardan +72h en entrar tienen 5x más chances de pedir devoluciones)

### 7.1-7.5 — Auditar grabaciones de sesión (ej. Hotjar en el LMS) para ver dónde se confunden durante el Quick Win

### 7.6-7.10 — Optimizar el video "Start Here", cortar grasa, documentar mejoras

---

## 8. Validación y Calidad (QA)

- [ ] "Frictionless Login" testeado semanalmente (ej. Magic Links funcionando).
- [ ] Video "Start Here" debe tener caption automáticos para quienes navegan sin sonido.
- [ ] No enviamos upsells, cross-sells ni invitaciones a programas paralelos durante esta ventana de 72h. Foco absoluto en la activación de la compra original.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| First-Login Status | Data Log | LMS -> CRM | Ops / Automation |
| Completitud Módulo 0 | % Flag | Perfil Estudiante | CX Lead |
| Nudges de Recuperación| Email Outbound | CRM Send Log | Marketing Ops |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [10-entregar-valor-inmediato](../../delivery/entregar-valor/sop-10-delivery/10-entregar-valor-inmediato-ritual.md).
- **Condición de handoff:** El cliente está dentro de la casa, sabe dónde están los interruptores de luz, la silla y el escritorio. Está listo metodológicamente para consumir conocimiento y ejecutarlo.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Activation Rate (72h) | ≥60% de los buyers | 🟡 |
| Welcome Video View | ≥80% completitud | 🟡 |

- **NEXT:** `personas-masivo → 10 → entregar-valor-inmediato`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Activation Sequence Builder" (Prompt Pro)

**Use case:** Estás migrando la academia a un nuevo LMS y necesitas rediseñar la experiencia y los correos para que el Onboarding sea a prueba de fallos.

```markdown
PROMPT:
"Actúa como un Learning Experience Designer brillante enfocando la retención Día 1.
Vendimos [Producto Dgital]. Nuestro Quick Win/Setup es [Tarea, ej: Unirse al Discord y presentarse con este template].
Redacta la cadencia estricta de onboarding (Nudges):
1. Guión exacto para el Video de 90s 'Start Here' (Directo, firme, marcando el ritmo Neo-Swiss).
2. Asunto y cuerpo del 'Nudge del Despistado' (Hora 24, asumiendo falla técnica).
3. Asunto y cuerpo del 'Nudge del Procrastinador' (Hora 48, recordando el 'Costo de Inacción' original si no arranca).
Cero lenguaje corporativo. Habla de humano a humano cuidando el journey de su estudiante."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
