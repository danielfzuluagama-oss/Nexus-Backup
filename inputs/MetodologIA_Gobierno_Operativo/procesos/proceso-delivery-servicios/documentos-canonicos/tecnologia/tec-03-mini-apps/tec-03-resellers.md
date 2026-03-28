# TEC-03 — Mini Apps Inteligentes
## Documento Canónico | Segmento: RESELLERS

**Código:** TEC-03-RESELLERS | **Versión:** 1.0 | **Fecha:** 2026-03-24
**Segmento:** Resellers (10/20/70 Revenue Share Model)

---

## 1. Ficha Rápida
**Modelo de venta y ejecución** de mini apps inteligentes a través de resellers certificados. Reseller vende y ejecuta con playbook; 10/20/70 revenue share.

| Aspecto | Detalle |
|--------|---------|
| **Precio mínimo cliente** | COP 2M (app mínima) |
| **Alcance** | 1-4 mini apps por proyecto |
| **Modelo de ingresos** | 10% MetodologIA, 20% Reseller venta, 70% Facilitador ejecución |
| **Tiempo de desarrollo** | 4-12 semanas por app |
| **Tech stack** | React, Next.js, Flutter, custom APIs |
| **Certificación** | Requerida (comercial y técnica) |

---

## 2. Propuesta de Valor para el Reseller

- **Mercado accesible:** Clientes buscan apps específicas de bajo costo.
- **Ingresos de venta:** 20% comisión perpetua.
- **Menor complejidad:** Smaller scope que sistemas grandes = ejecución más rápida.
- **Escalable:** Un facilitador puede ejecutar 4-6 apps simultáneamente.
- **Boilerplates:** Templating reduce tiempo y costo de desarrollo.
- **Soporte MetodologIA:** QA, escalations, helpdesk 24h.

---

## 3. Modelo de Co-Delivery

### Estructura 10/20/70
- **Reseller (20%):** Prospección, venta, relación cliente (pre y post-venta).
- **Facilitador (70%):** Discovery, diseño, desarrollo, deployment.
- **MetodologIA (10%):** Metodología, QA, escalations, soporte técnico.

### Roles Detallados

**Reseller (Vender):**
- Identificar necesidades de apps en cliente.
- Discovery inicial (con templates MetodologIA).
- Estimación preliminar de scope y tech.
- Presentación de propuesta y demo.
- Negociación comercial y contrato.
- Relación post-venta (upgrades, nuevas apps).

**Facilitador (Ejecutar):**
- Discovery detallado con cliente.
- Diseño UX/UI (wireframes, mockups).
- Tech stack selection.
- Desarrollo frontend y backend.
- Testing y optimización.
- Deployment en hosting cliente o MetodologIA.
- Capacitación técnica del cliente.

**MetodologIA (Metodología + QA):**
- Discovery playbook.
- Design system templates.
- Boilerplate starter.
- Tech stack decision support.
- Code review y quality assurance.
- Helpdesk 24h.
- Training a Facilitador.

---

## 4. Requisitos de Certificación

### Para Reseller
**Comercial:**
1. Experiencia en venta de software/apps (2+ años).
2. Cartera activa: 2+ clientes actuales.
3. Capacitación MetodologIA: 1 día (discovery, tech choices, propuesta, playbook).
4. Evaluación: Presentar propuesta de mini app a caso de ejemplo.

**Recertificación:** Anual (3 horas).

### Para Facilitador
**Técnico:**
1. Experiencia full-stack (2+ años) con React, Next.js, O Flutter.
2. Conocimiento de APIs, databases, deployment platforms.
3. Capacitación MetodologIA: 3 días (app architecture, frontend, backend, deployment, testing).
4. Evaluación: Desarrollar mini app en 3 semanas (observado).
5. Code review exitoso por lead técnico MetodologIA.

**Recertificación:** Anual (6 horas).

### Beneficios de Certificación
- Discovery playbook.
- Design system templates.
- Boilerplate starter code (GitHub).
- Tech stack decision guide.
- Helpdesk prioritario.
- Badge de certificación.
- Acceso a comunidad de resellers.

---

## 5. Metodología

**Playbook MetodologIA:**

1. **Discovery (1-2 semanas):**
   - MVP definition (user stories, wireframes).
   - Tech stack decision (React/Next.js vs Flutter).
   - Integration requirements (APIs, databases).
   - Performance targets (Lighthouse score 90+).

2. **Design (1 semana):**
   - UI/UX mockups (Figma).
   - Design system appliance.
   - Component planning.

3. **Desarrollo (2-8 semanas):**
   - Frontend: Components, state, UI.
   - Backend: APIs, logic, databases.
   - Integration: Third-party APIs, IA si aplica.
   - Testing (unit, integration, e2e).
   - Performance optimization.

4. **Piloto (1 semana):**
   - User acceptance testing.
   - Bug fixes.
   - Performance validation.

5. **Go-Live (1 semana):**
   - Deployment (Vercel, AWS, Firebase).
   - Monitoring setup.
   - User training.
   - Documentation.

6. **Post-Launch (Continua):**
   - Monitoreo de performance.
   - Bug fixes y mejoras.
   - Soporte técnico (primer año).

**Estándares de Calidad:**
- Performance: Lighthouse 90+.
- Security: OWASP top 10 compliance.
- Code review: Obligatorio (MetodologIA antes de go-live).
- Uptime: 99%+.

---

## 6. Branding

- **Cliente ve:** Marca del Reseller; MetodologIA como "Technology Partner".
- **Internamente:** Marca MetodologIA en documentación técnica.
- **Propuesta:** Template MetodologIA + logo Reseller.
- **App:** 100% marca cliente.

**Restricciones:**
- Reseller NO puede afirmar ser propietario del boilerplate.
- DEBE atribuir framework a MetodologIA.
- NO puede certificar otros resellers.

---

## 7. Modelo Económico (10/20/70)

### Ejemplo Numérico

**Cliente invierte COP 5M en mini app simple:**
| Rol | Porcentaje | Monto |
|-----|-----------|-------|
| Reseller | 20% | COP 1M |
| Facilitador | 70% | COP 3.5M |
| MetodologIA | 10% | COP 0.5M |

**Cliente invierte COP 15M en mini app con IA:**
| Rol | Porcentaje | Monto |
|-----|-----------|-------|
| Reseller | 20% | COP 3M |
| Facilitador | 70% | COP 10.5M |
| MetodologIA | 10% | COP 1.5M |

### Estructura de Costos
- **Costo facilitador:** COP 2-3M/app (sueldo, overhead).
- **Ingresos reseller:** COP 1-3M/app (20% cliente).
- **Rentabilidad:** Requiere volumen (4-6 apps/año).

### Términos de Pago
- **MetodologIA cobra directo al cliente:** 10% cada milestone.
- **Reseller comisión:** Después de facilitador.
- **Milestone:** 30% inicio, 40% mid-dev, 30% go-live.

---

## 8. Calidad y Estándares

### Code Review Obligatorio
- **Antes de go-live:** Todo código pasa review MetodologIA.
- **Criterios:** Arquitectura, seguridad, performance, best practices.
- **Tiempo:** 3-5 días laborales.

### Métricas de Éxito
| Métrica | Meta |
|---------|------|
| Performance (Lighthouse) | 90+ |
| Uptime | 99%+ |
| Load time | <2 segundos |
| User satisfaction | 4+/5 estrellas |
| Time-to-market | ±1 semana estimado |

### Auditoría Anual
- MetodologIA audita 15% de proyectos (random).
- Evaluación de facilitador (performance, feedback).
- Revisión de apps en producción.

---

## 9. Operación y Handoff

### Pre Go-Live
1. Reseller confirma fecha y scope con cliente.
2. Facilitador prepara documentación (arquitectura, runbook, training deck).
3. MetodologIA completa code review y aprueba.
4. User acceptance testing.
5. Capacitación cliente (4-8 horas).

### Post-Lanzamiento (Primer Año Incluido)
- **Soporte técnico:** Facilitador lidera; MetodologIA escalation.
- **Response time:** 24-48h Facilitador, 24h MetodologIA si escalado.
- **Monitoreo:** Diario primera semana; luego semanal.
- **Iteraciones:** Hasta 2 menores/mes (UX tweaks, bug fixes).
- **Cambios mayores:** Presupuesto adicional (COP 2M-8M).

### Post-Primer Año
- Soporte optional: 15% de inversión inicial/año.
- Nuevas apps: Modelo 10/20/70 nuevamente.

---

## 10. KPIs

### Para Reseller
| KPI | Meta |
|-----|------|
| Clientes anuales | 4-8 |
| Apps anuales | 6-12 |
| Valor promedio/app | COP 5M-10M |
| Ingresos anuales | COP 6M-18M |
| Client satisfaction | 4+/5 estrellas |
| Repeat rate | 70%+ (nuevas apps) |

### Para Facilitador
| KPI | Meta |
|-----|------|
| Apps completadas/año | 6-8 |
| Apps en producción | 24-32 |
| Performance (Lighthouse avg) | 92+ |
| Code review pass rate | 95%+ (1st attempt) |
| Client satisfaction | 4+/5 estrellas |
| Uptime avg | 99.5%+ |

---

## 11. Términos

- **Vigencia:** 2 años; renovación automática anual.
- **Exclusividad:** No exclusivo.
- **Territorios:** Sin restricción.
- **Rescisión:** 30 días por incumplimiento.
- **IP:** App = cliente; Boilerplate = MetodologIA.
- **Confidencialidad:** NDA.

---

## 12. Escalación

**Conflictos Reseller ↔ Facilitador:**
- Mediación MetodologIA.
- Arbitraje final por MetodologIA.

**Calidad incumplida:**
- MetodologIA interviene y corrige (sin costo).
- Riesgo de descertificación si patrón de incumplimiento.

---

**Próximo paso:** Contacto con Equipo de Canales de MetodologIA para onboarding y capacitación.
