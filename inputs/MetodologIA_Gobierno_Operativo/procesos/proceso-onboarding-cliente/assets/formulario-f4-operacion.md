# Formulario F4 — Operacion

**Version:** 2.0.0
**Fase:** F4 — Operacion (ongoing)
**Uso:** Recolectar feedback y aceptaciones durante la ejecucion del servicio

---

## Instrumentos de F4

### A. Acta de Entrega de Hito

| Campo | Tipo | Por que este campo |
|---|---|---|
| Nombre del hito | Texto | Trazabilidad contra la ODS. |
| Fecha de entrega | Fecha | Medir cumplimiento vs. SLA de plazos. |
| Descripcion de lo entregado | Texto | Evidencia de lo que se entrego (no lo que se planeo). |
| Criterios de aceptacion | Checklist | Pre-acordados en la ODS. Si no estan definidos, el "aceptado" es subjetivo. |
| Resultado | Aceptado / Aceptado con observaciones / Rechazado | Las observaciones se convierten en items de la siguiente iteracion. Un rechazo activa re-trabajo con analisis de causa raiz. |
| Observaciones | Texto libre | Captura el "por que" detras de observaciones o rechazo. |
| Firma SPOC cliente | Firma + fecha | Aceptacion formal. Sin firma, no hay cierre de hito ni facturacion. |
| Firma Delivery Lead | Firma + fecha | MetodologIA confirma que el entregable cumple sus propios estandares de calidad. |

### B. Encuesta NPS

| Pregunta | Tipo | Por que esta pregunta |
|---|---|---|
| Que tan probable es que recomiende MetodologIA a un colega? | Escala 0-10 | NPS estandar. Permite benchmarking cross-industria. |
| Que es lo que mas valora del servicio? | Texto libre | Identifica los diferenciadores percibidos para reforzarlos en marketing y ventas. |
| Que mejoraria? | Texto libre | Feedback accionable para mejora continua. |

**Frecuencia:** Al cierre de cada hito o mensual (lo que ocurra primero).

**Benchmarks NPS por industria (referencia para interpretar resultados):**

| Industria del cliente | NPS "bueno" | NPS "excelente" | Fuente de benchmark |
|---|---|---|---|
| Tecnologia / SaaS | >= 30 | >= 50 | Bain & Company |
| Servicios financieros | >= 20 | >= 40 | Bain & Company |
| Consultoria / servicios profesionales | >= 40 | >= 60 | CustomerGauge |
| Manufactura | >= 25 | >= 45 | CustomerGauge |
| Gobierno / sector publico | >= 15 | >= 30 | Referencia interna |

**Nota:** Estos son benchmarks del NPS del *cliente del cliente* hacia su industria. El NPS de MetodologIA hacia el cliente deberia superar el benchmark de consultoria (>= 40 = bueno, >= 60 = excelente). Si estamos debajo de 40, hay un problema sistemico.

### C. Solicitud de Cambio (Change Request)

| Campo | Tipo | Obligatorio | Por que este campo |
|---|---|---|---|
| Descripcion del cambio solicitado | Texto | SI | Que quiere el cliente que cambie. |
| Justificacion | Texto | SI | Evita change requests caprichosos. Si no hay justificacion de negocio, empujar de vuelta. |
| Impacto estimado en alcance | Texto | SI | Hace visible que "solo un cambio pequeno" puede alterar todo el plan. |
| Impacto estimado en timeline | Texto | SI | El cliente debe entender que mas alcance = mas tiempo (o mas equipo). |
| Impacto estimado en costo | COP/USD | SI | Transparencia financiera. Si hay costo adicional, se formaliza antes de ejecutar. |
| Solicitante | Nombre + cargo | SI | Trazabilidad. Solo el SPOC o sponsor pueden solicitar cambios formales. |
| Aprobacion MetodologIA | Aprobado / Rechazado / Requiere ODS adicional | SI | Si requiere ODS adicional, se activa el proceso de expansion (pre-sales -> nueva ODS). |
| Firma ambas partes | Firma + fecha | SI | Sin firma, el change request no se ejecuta. Protege a ambas partes. |

---

v2.0.0 — Anotaciones "por que este campo", benchmarks NPS por industria / Javier Montano + Claude
