import os
import json

CANONICAL_DIR = "/Users/deonto/Documents/Antigravity/site-metodologia/assets_repo/icons/canonical"
JS_OUTPUT = "/Users/deonto/Documents/Antigravity/site-metodologia/js/icons.js"

TEMPLATE_HEADER = """/**
 * MetodologIA Icon System
 * AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
 * Source: /assets_repo/icons/canonical/
 */

const iconRegistry = {
"""

TEMPLATE_FOOTER = """};

const icons = {
    get: (name, classes = "w-6 h-6") => {
        const path = iconRegistry[name];
        if (!path) {
            console.warn(`Icon "${name}" not found in registry.`);
            return '';
        }
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}">${path}</svg>`;
    },
    
    // Legacy support to replace calls to lucide.createIcons
    createIcons: () => {
        document.querySelectorAll('i[data-lucide]').forEach(el => {
            const iconName = el.getAttribute('data-lucide');
            const classes = el.getAttribute('class') || '';
            const svg = icons.get(iconName, classes);
            if (svg) {
                el.outerHTML = svg;
            }
        });
    }
};

window.icons = icons;
"""

def sync_icons_js():
    js_content = TEMPLATE_HEADER
    
    files = sorted([f for f in os.listdir(CANONICAL_DIR) if f.endswith('.svg')])
    
    for i, filename in enumerate(files):
        name = filename[:-4]
        path = os.path.join(CANONICAL_DIR, filename)
        
        with open(path, 'r') as f:
            svg_content = f.read()
            
        # Extract inner content (remove <svg> wrapper)
        # Assuming standard format: <svg ...> CONTENT </svg>
        start = svg_content.find('>') + 1
        end = svg_content.rfind('</svg>')
        
        if start > 0 and end > 0:
            inner_content = svg_content[start:end].strip()
            # Escape quotes if necessary (simple approach)
            inner_content = inner_content.replace('"', '\\"')
            
            comma = "," if i < len(files) - 1 else ""
            js_content += f'    "{name}": "{inner_content}"{comma}\n'
            print(f"Synced {name}")
        else:
            print(f"Warning: Could not parse {filename}")

    js_content += TEMPLATE_FOOTER
    
    with open(JS_OUTPUT, 'w') as f:
        f.write(js_content)
    
    print(f"Successfully generated {JS_OUTPUT}")

if __name__ == "__main__":
    sync_icons_js()
