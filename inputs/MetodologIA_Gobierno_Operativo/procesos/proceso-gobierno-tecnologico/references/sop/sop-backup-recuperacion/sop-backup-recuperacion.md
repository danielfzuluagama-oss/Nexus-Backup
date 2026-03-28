# SOP: Backup y Recuperación de Datos

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** CTO / Admin TI
**Cierra:** FMT-03 (Backcasting CTO)

---

## 1. Propósito

Garantizar que la información crítica de MetodologIA tiene copias de respaldo automatizadas, verificadas, y que se puede restaurar dentro de un RTO aceptable.

---

## 2. Clasificación de Datos y Política de Backup

| Categoría | Ejemplos | RPO | RTO | Frecuencia backup |
|-----------|----------|-----|-----|-------------------|
| **Crítico** | Contratos, EEFF, base de clientes, facturación | 1 día | 4 horas | Diario |
| **Importante** | Material de cursos, propuestas, SOPs, governance | 1 semana | 24 horas | Semanal |
| **Operativo** | Emails, chat logs, documentos en progreso | 1 semana | 48 horas | Semanal (auto por plataforma) |

---

## 3. Estrategia de Backup: 3-2-1

- **3** copias de cada dato crítico (original + 2 backups)
- **2** tipos de medio (ej. Drive + otro cloud, o Drive + disco externo cifrado)
- **1** copia offsite (fuera de la ubicación principal)

---

## 4. Decisión: Cloud-to-Cloud vs Cloud-to-Local

| Factor | Cloud-to-Cloud | Cloud-to-Local |
|--------|---------------|---------------|
| **Costo mensual** | ~USD$10-30/mes (Backupify, Spanning, CloudAlly) | ~USD$0/mes (una vez comprado disco ~USD$80-150) |
| **Automatización** | Completamente automático | Requiere script + disciplina manual |
| **Acceso remoto** | Desde cualquier lugar | Solo desde ubicación física |
| **Riesgo de pérdida** | Bajo (redundancia del proveedor) | Medio (robo, daño físico, incendio) |
| **Independencia** | Depende de otro proveedor cloud | No depende de internet ni de terceros |
| **Velocidad de restauración** | Minutos a horas | Horas (transportar disco + restaurar) |

**Decisión MetodologIA:** Cloud-to-cloud como PRIMARY backup (automatizado, accesible). Disco externo cifrado como SECONDARY para datos CRÍTICOS (contratos, EEFF), actualizado mensualmente.

---

## 5. Procedimiento de Backup

### Backup Automático

| Fuente | Destino backup | Frecuencia | Método | Responsable |
|--------|---------------|-----------|--------|------------|
| Google Drive corporativo | Cloud secundario | Diario | Sync automático o herramienta backup | Admin TI |
| Sistema contable | Export a Drive + copia en disco cifrado | Semanal | Export manual o automático | Contador + Admin TI |
| CRM / Pipeline | Export CSV/JSON a Drive | Semanal | Export manual | Operaciones |
| Repo de governance | Git + sync a cloud secundario | Diario | Git push | Admin TI |
| Email | Google Vault (si G-Suite Business+) | Continuo | Automático por Google | Admin TI |

### Verificación de Backup

| Acción | Frecuencia | Responsable |
|--------|-----------|------------|
| Verificar que el backup diario se ejecutó (revisar logs) | Semanal | Admin TI |
| Restaurar un archivo aleatorio del backup | Mensual | Admin TI |
| Simulacro de restauración completa (un sistema) | Semestral | CTO + Admin TI |

---

## 6. Procedimiento de Restauración

| Paso | Acción | Responsable |
|------|--------|------------|
| 1 | Identificar qué datos se perdieron y desde cuándo | Admin TI |
| 2 | Localizar el backup más reciente con los datos | Admin TI |
| 3 | Restaurar en ubicación temporal (NO sobreescribir directamente) | Admin TI |
| 4 | Verificar integridad de datos restaurados | Admin TI + owner de los datos |
| 5 | Mover a ubicación definitiva | Admin TI |
| 6 | Documentar: qué se perdió, causa, tiempo de recuperación | Admin TI |

---

## 7. Retención de Backups

| Tipo | Retención |
|------|----------|
| Backups diarios | 30 días (rolling) |
| Backups semanales | 12 semanas (rolling) |
| Backups mensuales | 12 meses (rolling) |
| Backup de cierre fiscal anual | 10 años (conforme a política de archivo documental) |

---

## 8. Log de Pruebas de Backup

```
## LOG DE PRUEBAS DE BACKUP — [Año]

| Fecha | Tipo de prueba | Qué se probó | Resultado | Tiempo restauración | Problemas encontrados | Responsable |
|-------|---------------|-------------|-----------|--------------------|-----------------------|------------|
| [___] | Archivo aleatorio | Contrato-XYZ.pdf desde backup cloud | OK / FALLO | 15 min | Ninguno | [___] |
| [___] | Restauración completa | Drive completo de proyecto ABC | OK / FALLO | 2h 30min | Archivos >100MB tardaron más | [___] |
| [___] | Disco externo | EEFF Q1 desde disco cifrado | OK / FALLO | 45 min | Disco necesitaba actualización | [___] |
```

---

## 9. Estimación de Costos de Infraestructura de Backup

| Componente | Costo mensual estimado (USD) | Notas |
|-----------|------------------------------|-------|
| Herramienta cloud-to-cloud (ej. CloudAlly, Spanning) | $10-30 | Depende de # usuarios y volumen |
| Almacenamiento en cloud secundario (ej. AWS S3 Glacier, Backblaze B2) | $2-10 | Para archivos históricos y cierre fiscal |
| Disco externo cifrado (compra única) | ~$100-150 (una vez) / $0 mensual | SSD 1TB cifrado para datos CRÍTICOS |
| Google Vault (si se activa) | Incluido en Google Workspace Business+ | Verificar plan contratado |
| **TOTAL estimado** | **$12-40/mes** + **$100-150 una vez** | |

**ROI:** El costo de perder Drive corporativo sin backup (reconstrucción + revenue perdido) se estima en $30M-80M COP. El backup cuesta ~$50K-150K COP/mes. La relación costo/beneficio es >200:1.
