#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function printUsage() {
  console.error(
    [
      'Uso:',
      '  node generate-commercial-proposal.js <template.html> <payload.json> <output.html>',
      '',
      'Ejemplo:',
      '  node generate-commercial-proposal.js commercial-proposal-template.html commercial-proposal-santafeenergy.payload.json santafeenergy-propuesta-final.html',
    ].join('\n')
  );
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`No se pudo leer JSON: ${filePath}\n${error.message}`);
  }
}

function assertFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`No existe el archivo: ${filePath}`);
  }
}

function injectPayload(templateHtml, payload) {
  const payloadTagPattern =
    /(<script id="proposal-template-payload" type="application\/json">)([\s\S]*?)(<\/script>)/;

  if (!payloadTagPattern.test(templateHtml)) {
    throw new Error(
      'La plantilla no contiene el bloque <script id="proposal-template-payload" type="application/json">.'
    );
  }

  const serializedPayload = JSON.stringify(payload, null, 2);

  return templateHtml.replace(
    payloadTagPattern,
    `$1\n${serializedPayload}\n  $3`
  );
}

function main() {
  const [templatePathArg, payloadPathArg, outputPathArg] = process.argv.slice(2);

  if (!templatePathArg || !payloadPathArg || !outputPathArg) {
    printUsage();
    process.exit(1);
  }

  const templatePath = path.resolve(process.cwd(), templatePathArg);
  const payloadPath = path.resolve(process.cwd(), payloadPathArg);
  const outputPath = path.resolve(process.cwd(), outputPathArg);

  assertFileExists(templatePath);
  assertFileExists(payloadPath);

  const templateHtml = fs.readFileSync(templatePath, 'utf8');
  const payload = readJson(payloadPath);
  const finalHtml = injectPayload(templateHtml, payload);

  fs.writeFileSync(outputPath, finalHtml);

  console.log(`Template: ${templatePath}`);
  console.log(`Payload:  ${payloadPath}`);
  console.log(`Output:   ${outputPath}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
