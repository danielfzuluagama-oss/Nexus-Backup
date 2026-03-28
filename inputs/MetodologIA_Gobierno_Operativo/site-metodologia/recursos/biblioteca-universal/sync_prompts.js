const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'prompts_universales.json');
const jsPath = path.join(__dirname, 'prompts_universales.js');

try {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const promptsJson = JSON.parse(rawData);

    const promptsArray = Object.entries(promptsJson).map(([id, content]) => {
        // Derive Metadata
        const parts = id.split('_');
        let category = 'general';
        
        // Determine Category and Label Title
        let label_title = id;
        
        if (id === 'a') {
            category = 'a';
            label_title = 'A';
        } else if (parts.length > 1) {
            category = parts[0];
            // Remove category prefix and capitalize words for title
            label_title = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        } else {
            // Fallback for single word IDs that aren't 'a'
            label_title = id.charAt(0).toUpperCase() + id.slice(1);
        }

        // Extract Keywords
        const keywordSection = content.match(/===keywords\n(.*?)(\n\n===|$)/s);
        let keywords = [];
        if (keywordSection) {
            try {
                keywords = JSON.parse(keywordSection[1].trim());
            } catch (e) {
                console.warn(`Failed to parse keywords for ${id}`);
            }
        }

        // Count Params
        // Matches {[paramName]}
        const paramMatches = content.match(/\{\[.*?\]\}/g);
        const paramCount = paramMatches ? new Set(paramMatches).size : 0;

        return {
            id,
            label_title,
            category,
            content,
            paramCount,
            keywords
        };
    });

    const jsContent = `window.promptsUniversales = ${JSON.stringify(promptsArray, null, 2)};`;
    
    fs.writeFileSync(jsPath, jsContent);
    console.log(`Successfully synced ${promptsArray.length} prompts from JSON to JS.`);
    console.log(`Updated: ${jsPath}`);

} catch (error) {
    console.error('Error syncing prompts:', error);
    process.exit(1);
}
