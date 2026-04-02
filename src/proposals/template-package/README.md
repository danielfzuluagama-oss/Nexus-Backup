# Proposal Bot Template Package

Paquete final para reemplazar la plantilla del repositorio del bot sin volver a tocar el diseño base.

## Archivos incluidos

- `commercial-proposal-template.html`
  Plantilla principal. Conserva diseño, layout, interacciones, tema, reveal y estructura visual.

- `commercial-proposal-payload.blank.json`
  Payload mínimo para que el bot lo rellene.

- `commercial-proposal-payload.schema.json`
  Esquema de tipos del payload.

- `commercial-proposal-payload.contract.json`
  Contrato expandido con todas las claves y estructuras detectadas en la plantilla original.

- `commercial-proposal-santafeenergy.payload.json`
  Ejemplo real de uso con contenido basado en Santa Fe Energy.

- `generate-commercial-proposal.js`
  Script generador que incrusta un payload en la plantilla y produce el HTML final.

## Flujo recomendado para el bot

1. El bot genera un `payload.json`.
2. El bot o tu pipeline ejecuta:

```bash
node generate-commercial-proposal.js \
  commercial-proposal-template.html \
  commercial-proposal-santafeenergy.payload.json \
  santafeenergy-propuesta-final.html
```

3. El resultado es un HTML final listo para enviar.

## Qué debe rellenar el bot

Prioridad recomendada:

1. `meta`
   Título y descripción del documento.

2. `runtimeConfig`
   Email de contacto, links de CTA y pricing si aplica.

3. `htmlBySelector`
   Para reemplazar secciones completas sin tocar CSS.
   Selectores clave ya expuestos en la plantilla:
   `#hero-content`
   `#hook-content`
   `#vision-content`
   `#journey-content`
   `#programa-content`
   `#modalidades-content`
   `#objeciones-content`
   `#credenciales-content`
   `#equipo-content`
   `#metodologias-content`
   `#roi-content`
   `#configurador-content`
   `#servicios-content`
   `#condiciones-content`
   `#stack-content`
   `#workshop-content`
   `#final-cta-content`

4. `textBySelector`
   Para microcopys puntuales.

5. `attributesBySelector`
   Para mostrar, ocultar o retocar elementos sin modificar el HTML fuente.

## Estrategia de integración

Si tu bot hoy genera HTML directo, la recomendación es cambiarlo a este patrón:

1. Generar `payload.json`.
2. Inyectarlo en `commercial-proposal-template.html`.
3. Exportar el HTML final.

Eso evita que el bot:

- rompa el layout
- degrade la UI
- repita estilos inline pobres
- pierda consistencia entre propuestas

## Reemplazo en el repositorio del bot

Ruta mínima sugerida en tu repo:

- `templates/commercial-proposal-template.html`
- `templates/commercial-proposal-payload.schema.json`
- `templates/commercial-proposal-payload.contract.json`
- `scripts/generate-commercial-proposal.js`

Y opcionalmente:

- `examples/commercial-proposal-santafeenergy.payload.json`

## Nota práctica

La plantilla ya quedó preparada para overrides seguros:

- Si el payload no trae un campo, la plantilla cae en defaults.
- Si el payload trae `htmlBySelector`, puedes reemplazar bloques enteros.
- Si el payload trae precios, el runtime los usa también en ROI y configuraciones donde siga aplicando.
