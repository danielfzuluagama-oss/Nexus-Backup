# Formulario F0 — Contacto Inicial

**Version:** 2.0.0
**Fase:** F0 — Awareness
**Campos:** 3 (minimo viable)
**Tiempo de completado:** <30 segundos

---

## Campos

| # | Campo | Tipo | Obligatorio | Validacion | Por que este campo |
|---|---|---|---|---|---|
| 1 | **Nombre completo** | Texto | SI | Min 2 caracteres | Personalizar el primer contacto. Un "Hola [nombre]" convierte 2x mas que un "Hola". |
| 2 | **Email** | Email | SI | Formato email valido + dominio no desechable | Canal principal de follow-up. Rechazar dominios temporales (mailinator, guerrilla, etc.) para evitar leads basura. |
| 3 | **Empresa** | Texto | NO | Libre | Permite pre-calificar B2B vs B2C antes de la primera llamada. Opcional para no frenar al curioso individual. |

---

## Variantes A/B

### Variante A: Landing page (default)
Campos 1-3 tal como estan arriba. Usar para paginas de servicio, blog con CTA, homepage.

### Variante B: Registro de evento
| # | Campo | Tipo | Obligatorio |
|---|---|---|---|
| 1 | Nombre completo | Texto | SI |
| 2 | Email | Email | SI |
| 3 | Empresa | Texto | NO |
| 4 | **Nombre del evento** | Pre-llenado (hidden) | SI |

**Por que:** Permite atribuir el lead al evento especifico para medir ROI de cada actividad.

### Variante C: Referido
| # | Campo | Tipo | Obligatorio |
|---|---|---|---|
| 1 | Nombre completo | Texto | SI |
| 2 | Email | Email | SI |
| 3 | Empresa | Texto | NO |
| 4 | **Quien te refirio** | Texto | NO |

**Por que:** Los leads referidos convierten 3-5x mas. Saber quien refirio permite agradecer al referente y activar el programa de advocacy.

---

## Aviso de Privacidad (texto al pie del formulario)

> Al enviar este formulario, autoriza el tratamiento de sus datos personales conforme a nuestra [Politica de Privacidad](link). Sus datos seran utilizados unicamente para contactarle sobre nuestros servicios. Puede ejercer sus derechos de acceso, rectificacion y supresion escribiendo a [email OPD].

---

## Regla de Datos

- **NO recolectar:** telefono, cargo, tamano de empresa, presupuesto (todo eso va en F1)
- **Proposito:** Crear el primer registro con minima friccion
- **Siguiente paso:** Sales Rep contacta al lead -> completa F1 en la primera interaccion

---

v2.0.0 — Variantes A/B/C, anotaciones "por que este campo", validacion anti-spam / Javier Montano + Claude
