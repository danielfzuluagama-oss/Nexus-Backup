const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_FILE = path.join(__dirname, '../recursos/biblioteca-universal/prompts_universales.json');
const OUTPUT_FILE = path.join(__dirname, '../recursos/biblioteca-universal/prompts_universales.js');

// Helper to format title
function formatTitle(id) {
    // Remove category prefix if present (e.g., "analisis_swot" -> "swot")
    // But actually, we want the full thing humanized, maybe better to keep category?
    // The current UI does: .slice(1) to remove category prefix. 
    // Let's replicate the logic but safer.
    
    // Heuristic: If it has underscores, split by them.
    const parts = id.split('_');
    
    // If it starts with a known category (analisis, marketing, etc), maybe we keep it or remove it?
    // Current UI removes the first part: .slice(1). Let's stick to that if it makes sense.
    // However, some IDs might be just "swot" (no underscore).
    // Let's be smart: if >1 part, drop first. Else keep all.
    
    let words = parts;
    if (parts.length > 1) {
        words = parts.slice(1);
    }
    
    const title = words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
    return title || id.charAt(0).toUpperCase() + id.slice(1);
}

// Helper to extract category using the first part of ID
function extractCategory(id) {
    return id.split('_')[0] || 'default';
}

function extractParamCount(content) {
    const matches = content.match(/{\[\w+\]}/g);
    return matches ? [...new Set(matches)].length : 0;
}

try {
    const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
    const json = JSON.parse(rawData);
    
    const enrichedData = Object.entries(json).map(([id, content]) => {
        return {
            id: id,
            label_title: formatTitle(id),
            category: extractCategory(id),
            content: content,
            paramCount: extractParamCount(content)
        };
    });
    
    const jsContent = `window.promptsUniversales = ${JSON.stringify(enrichedData, null, 2)};`;
    
    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log(`Successfully enriched ${enrichedData.length} prompts.`);
    console.log(`Wrote to ${OUTPUT_FILE}`);
    
} catch (error) {
    console.error('Error processing prompts:', error);
    process.exit(1);
}
