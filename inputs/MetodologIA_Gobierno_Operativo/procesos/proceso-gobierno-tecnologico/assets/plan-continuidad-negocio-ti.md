# Plan de Continuidad de Negocio — Componente Tecnológico (BCP-TI)

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** CTO / COO
**Cierra:** FMT-08 (Backcasting CTO)

---

## 1. Servicios Críticos y Plan B

| Servicio | Proveedor actual | Criticidad | RTO | Plan B si cae |
|---------|-----------------|-----------|-----|-------------|
| **Email corporativo** | Google Workspace | CRITICO | 2h | Comunicar por WhatsApp Business. Migrar a Microsoft 365 si >24h. |
| **Drive / Almacenamiento** | Google Drive | CRITICO | 4h | Backup en cloud secundario. Acceder desde backup. |
| **LMS / Plataforma educativa** | [Proveedor] | CRITICO (durante bootcamp/workshop) | 2h (si hay evento en vivo) | Sesión por Zoom/Meet + material por Drive. Reprogramar si >4h. |
| **Videoconferencia** | Zoom / Google Meet | ALTO | 1h | Cambiar a la alternativa (Zoom cae → Meet, y viceversa). |
| **CRM** | [Proveedor] | ALTO | 8h | Gestión temporal en spreadsheet. Migrar si >48h. |
| **Facturación electrónica** | [Proveedor DIAN] | ALTO | 24h | Contactar proveedor. Si >48h, evaluar alternativo habilitado por DIAN. |
| **Sitio web** | [Hosting] | MEDIO | 24h | DNS failover a hosting alternativo o página estática temporal. |
| **Dominio / DNS** | [Registrador] | CRITICO | 1h | Min 2 personas con acceso a panel DNS. Auto-renovación activa. |

---

## 2. Business Impact Analysis (BIA)

| Servicio | Revenue por hora en riesgo | Impacto reputacional | Impacto contractual | Prioridad restauración |
|---------|---------------------------|---------------------|--------------------|-----------------------|
| **LMS** (durante evento en vivo) | Alto: ~$500K-2M COP/h (proporcional al precio del servicio / horas) | CRITICO: clientes en vivo ven la falla | Posible reembolso parcial si >2h de caída | 1 |
| **Email corporativo** | Medio: no genera revenue directo pero bloquea comunicación con clientes | ALTO: imagen de desorganización | Retrasos en entregables y propuestas | 2 |
| **Facturación electrónica** | Bajo directo / ALTO indirecto: no se puede facturar = no se cobra | MEDIO | Incumplimiento de plazo DIAN si >5 días | 3 |
| **CRM** | Bajo: datos accesibles por otros medios temporalmente | BAJO | Ninguno directo | 4 |
| **Sitio web** | Variable: si hay campaña activa, alto; si no, bajo | MEDIO: prospects no pueden encontrarnos | Ninguno | 5 |

**Cálculo simplificado:** Si MetodologIA factura ~$100M COP/mes y opera ~160h/mes: el revenue promedio por hora operativa es ~$625K COP/h. Un día completo de caída total = ~$5M COP en revenue en riesgo (sin contar daño reputacional y costo de reembolsos).

---

## 3. Escenarios de Desastre

| Escenario | Probabilidad | Impacto | Respuesta |
|-----------|-------------|---------|-----------|
| Google desactiva la cuenta corporativa | Baja | CRITICO | Backup reciente disponible. Migrar a alternativa en 48h. |
| Laptop del CEO/COO robada o perdida | Media | ALTO | Borrado remoto (si MDM activo). Cambiar passwords de todas las cuentas. |
| Ransomware en equipo del equipo | Baja | ALTO | Aislar equipo. NO pagar. Restaurar de backup. |
| Proveedor LMS cierra operaciones | Muy baja | CRITICO (mediano plazo) | Exportar contenido inmediatamente. Migrar en 30 días. |
| Dominio expira sin renovación | Baja (evitable) | CRITICO | Auto-renovación activa. Verificar trimestralmente. |

---

## 4. Contactos de Emergencia

| Servicio | Proveedor | Contacto soporte | SLA del proveedor | Número de cuenta/contrato |
|---------|-----------|-----------------|-------------------|---------------------------|
| Google Workspace | Google | [URL soporte] | [Según plan] | [___] |
| LMS | [___] | [___] | [___] | [___] |
| Facturación electrónica | [___] | [___] | [___] | [___] |
| Hosting/Dominio | [___] | [___] | [___] | [___] |
| Videoconferencia | [___] | [___] | [___] | [___] |

---

## 5. Schedule de Pruebas de Recuperación y Resultados

| Frecuencia | Tipo | Participantes | Qué se prueba |
|-----------|------|--------------|---------------|
| Semestral | Tabletop: "¿Qué hacemos si X cae?" | CTO + COO + Admin TI | Conocimiento del plan, roles, contactos |
| Anual | Restauración real de backup completo | Admin TI + CTO | Backup funciona, RTO se cumple |
| Anual | Failover de videoconferencia | Facilitador + Admin TI | Cambio de Zoom a Meet en <10 min |

### Log de Pruebas Realizadas

```
## LOG DE PRUEBAS DE RECUPERACION — [Año]

| Fecha | Tipo de prueba | Escenario | Resultado | RTO logrado | Hallazgos | Acciones |
|-------|---------------|-----------|-----------|-------------|-----------|----------|
| [___] | Tabletop | "Google desactiva cuenta" | OK/FALLO | N/A (tabletop) | [___] | [___] |
| [___] | Restauración real | Drive completo desde backup | OK/FALLO | [___]h | [___] | [___] |
```

---

## 6. Verificación de Cobertura de Seguro

| Pregunta | Estado | Notas |
|----------|--------|-------|
| ¿MetodologIA tiene póliza de seguro de responsabilidad civil? | SI / NO / PENDIENTE | Verificar si cubre daños por caída de servicio a clientes |
| ¿Existe póliza de seguro cibernético (cyber insurance)? | SI / NO / PENDIENTE | Cubre: brecha de datos, ransomware, interrupción de negocio por ataque |
| Si hay cyber insurance: ¿cubre pérdida de datos por error del proveedor cloud? | SI / NO / N/A | Muchas pólizas excluyen esto |
| Si hay cyber insurance: ¿cubre costo de notificación a afectados (Ley 1581)? | SI / NO / N/A | Notificar brecha tiene costo operativo y legal |
| ¿La póliza cubre pérdida de revenue por downtime? | SI / NO / N/A | Business interruption coverage |
| **Acción recomendada** | Cotizar cyber insurance básica (~USD$500-2000/año para PYME tech) | Proveedores: Chubb, Sura, AIG Colombia |

---

## 7. Checklist de Verificación Trimestral del BCP

- [ ] ¿Los contactos de emergencia están actualizados?
- [ ] ¿El dominio tiene auto-renovación activa y al menos 2 personas con acceso?
- [ ] ¿Los backups se están ejecutando según frecuencia definida?
- [ ] ¿Se probó restaurar al menos un archivo desde backup este trimestre?
- [ ] ¿Todo el equipo sabe quién es el primer contacto para P1?
- [ ] ¿Los planes B de cada servicio siguen siendo viables? (¿existe la alternativa?)
