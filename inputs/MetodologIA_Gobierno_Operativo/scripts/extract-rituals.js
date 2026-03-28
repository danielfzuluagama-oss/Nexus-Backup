const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../procesos/proceso-comercial');

function getAllRitualHtmls(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    
    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllRitualHtmls(fullPath, arrayOfFiles);
        } else {
            if (file.endsWith("-ritual.html") && !file.includes("template")) {
                arrayOfFiles.push(fullPath);
            }
        }
    });
    return arrayOfFiles;
}

function extractConfig(htmlContent) {
    // Regex to capture the content inside const config = { ... };
    // We assume the format is relatively standard as per templates
    const regex = /const config = (\{[\s\S]*?\});/;
    const match = htmlContent.match(regex);
    if (match && match[1]) {
        try {
            // Use Function constructor to parse relaxed JSON (JS object)
            // This handles unquoted keys, comments, etc which might be in source
            const stripComments = match[1].replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); 
            const parseFn = new Function(`return ${stripComments};`);
            return parseFn();
        } catch (e) {
            console.error("Failed to parse config object:", e.message);
            return null;
        }
    }
    return null;
}

function determineMetadata(filePath) {
    const segments = filePath.split(path.sep);
    const filename = path.basename(filePath, '.html');
    
    // Infer SOP and Segment from path
    // Path usually: .../empresas/references/sop/sop-scouting/references/rituales/...
    const sop = segments.find(s => s.startsWith('sop-'));
    const segment = segments.includes('empresas') ? 'empresas-b2b' : 
                    segments.includes('personas') ? 'personas-b2c' : 
                    segments.includes('aliados') ? 'aliados-gtm' : 'unknown';
    
    return { id: filename, sop, segment };
}

function transformToSchema(oldConfig, meta) {
    const sopName = meta.sop ? meta.sop.replace('sop-', '').charAt(0).toUpperCase() + meta.sop.replace('sop-', '').slice(1) : 'General';
    
    return {
        "$schema": "../../../../templates/playbook-ritual-schema.json",
        "meta": {
            "id": meta.id,
            "segment": meta.segment,
            "sop": meta.sop || "sop-general",
            "version": oldConfig.version ? oldConfig.version.split('|')[0].trim() : "v2.1.0",
            "standard": "Moat Certified",
            "lastUpdated": new Date().toISOString().split('T')[0]
        },
        "playbook": {
            "title": oldConfig.title || "Untitled Ritual",
            "subtitle": oldConfig.subtitle || "Operational Ritual",
            "docType": "Playbook Operativo",
            "sopPhase": sopName,
            "breadcrumb": ["MetodologIA", "Proceso Comercial", `SOP ${sopName}`, oldConfig.title || meta.id],
            "tldr": {
                "hook": "Define la pregunta crítica que este ritual resuelve.",
                "summary": "Resumen ejecutivo de 3 líneas sobre el propósito y resultado esperado.",
                "time": "~30 min",
                "mainOutput": oldConfig.steps && oldConfig.steps.length > 0 ? oldConfig.steps[oldConfig.steps.length-1].output : "Entregable Final"
            },
            "objective": oldConfig.objective || "Objetivo no definido."
        },
        "glossary": oldConfig.glossary || [],
        "steps": oldConfig.steps || [],
        "vitamin": oldConfig.vitamin || "La consistencia vence a la intensidad.",
        "standard": oldConfig.standard || "Sovereign Sales Flow | Bottom-Up Standard"
    };
}

// MAIN EXECUTION
console.log("🔍 Scanning for ritual HTML files...");
const files = getAllRitualHtmls(ROOT_DIR);
console.log(`Found ${files.length} ritual files.`);

let successCount = 0;

files.forEach(file => {
    const htmlContent = fs.readFileSync(file, 'utf8');
    const oldConfig = extractConfig(htmlContent);
    
    if (oldConfig) {
        const meta = determineMetadata(file);
        const newJson = transformToSchema(oldConfig, meta);
        
        const jsonPath = file.replace('.html', '.json');
        fs.writeFileSync(jsonPath, JSON.stringify(newJson, null, 2));
        console.log(`✅ Extracted: ${path.basename(jsonPath)}`);
        successCount++;
    } else {
        console.error(`⚠️ Could not extract config from ${path.basename(file)}`);
    }
});

console.log(`\nExtraction complete. ${successCount}/${files.length} JSONs created.`);
