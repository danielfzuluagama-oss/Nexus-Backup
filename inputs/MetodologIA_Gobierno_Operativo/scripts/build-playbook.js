const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, '../templates/playbook-ritual-template.html');
const SCHEMA_PATH = path.join(__dirname, '../templates/playbook-ritual-schema.json');

/**
 * Validates the ritual data against the schema (basic validation)
 * @param {Object} data 
 */
function validateData(data) {
    if (!data.meta || !data.playbook || !data.glossary || !data.steps) {
        throw new Error("Invalid JSON: Missing top-level required fields (meta, playbook, glossary, steps)");
    }
    if (data.steps.length < 8 || data.steps.length > 10) {
        console.warn(`[WARN] Ritual ${data.meta.id} has ${data.steps.length} steps. Standard is 8-10.`);
    }
    return true;
}

/**
 * Builds a single playbook HTML file
 * @param {string} jsonPath Absolute path to the ritual JSON file
 * @param {string} [outputPath] Optional output path. Defaults to same dir as JSON, replacing .json with .html
 */
function buildPlaybook(jsonPath, outputPath) {
    try {
        console.log(`Building: ${path.basename(jsonPath)}`);
        
        // 1. Read Data
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(rawData);
        
        // 2. Validate
        validateData(data);

        // 3. Read Template
        let template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

        // 4. Inject Data
        // Replace JSON data block
        const placeholderStart = '/*PLAYBOOK_DATA*/';
        const placeholderEnd = '/*END_PLAYBOOK_DATA*/';
        
        const startIndex = template.indexOf(placeholderStart);
        const endIndex = template.indexOf(placeholderEnd);

        if (startIndex === -1 || endIndex === -1) {
            throw new Error("Template placeholder markers not found.");
        }

        const injection = JSON.stringify(data, null, 2);
        
        let newContent = template.substring(0, startIndex + placeholderStart.length) + 
                         injection + 
                         template.substring(endIndex);

        // EXTRA: Replace Metadata Placeholders in HTML
        const displayTitle = data.playbook.title || data.meta.id;
        newContent = newContent.replace(/PLAYBOOK_TITLE/g, displayTitle);
        newContent = newContent.replace(/PLAYBOOK_ID/g, data.meta.id);

        // 5. Write Output
        const finalPath = outputPath || jsonPath.replace('.json', '.html');
        fs.writeFileSync(finalPath, newContent);
        
        console.log(`✅ Generated: ${finalPath}`);
        return true;

    } catch (error) {
        console.error(`❌ Error building ${jsonPath}:`, error.message);
        return false;
    }
}

// CLI Interface
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("Usage: node build-playbook.js <path-to-json-file> [--all]");
    process.exit(1);
}

if (args[0] === '--all') {
    // Determine root directory to scan (parent of scripts/)
    const rootDir = path.join(__dirname, '../rituales');
    console.log(`Scanning for *ritual.json in ${rootDir}...`);
    
    // Recursive find function not implemented for simplicity, relying on 'find' command or specific listing usually.
    // For now, let's assume we pass a specific file or we might expand this later.
    // Given the environment constraints, recursive search in JS:
    
    function getAllFiles(dirPath, arrayOfFiles) {
        files = fs.readdirSync(dirPath);
        arrayOfFiles = arrayOfFiles || [];
        files.forEach(function(file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            } else {
                if (file.endsWith("ritual.json") || (file.endsWith(".json") && file.includes("-ritual"))) {
                    arrayOfFiles.push(path.join(dirPath, "/", file));
                }
            }
        })
        return arrayOfFiles;
    }

    try {
        const allJson = getAllFiles(rootDir);
        console.log(`Found ${allJson.length} ritual JSON files.`);
        let successCount = 0;
        allJson.forEach(f => {
            if (buildPlaybook(f)) successCount++;
        });
        console.log(`Build complete. ${successCount}/${allJson.length} successful.`);
    } catch (e) {
        console.error("Scan error:", e);
    }

} else {
    // Build single file
    const targetFile = path.resolve(args[0]);
    if (!fs.existsSync(targetFile)) {
        console.error("File not found:", targetFile);
        process.exit(1);
    }
    buildPlaybook(targetFile);
}
