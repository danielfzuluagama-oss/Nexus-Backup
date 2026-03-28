import os
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom

REPO_DIR = "/Users/deonto/Documents/Antigravity/site-metodologia/assets_repo/icons"
CANONICAL_DIR = os.path.join(REPO_DIR, "canonical")
OUTPUT_JSON = os.path.join(REPO_DIR, "inventory.json")
OUTPUT_XML = os.path.join(REPO_DIR, "inventory.xml")
OUTPUT_MD = os.path.join(REPO_DIR, "INVENTARIO.md")

def generate_inventories():
    icons = []
    
    # 1. Read SVGs
    for filename in sorted(os.listdir(CANONICAL_DIR)):
        if filename.endswith(".svg"):
            name = filename[:-4]
            path = os.path.join(CANONICAL_DIR, filename)
            with open(path, 'r') as f:
                content = f.read()
            
            icons.append({
                "name": name,
                "filename": filename,
                "path": f"canonical/{filename}",
                "content": content.strip()
            })

    # 2. Write JSON
    with open(OUTPUT_JSON, 'w') as f:
        json.dump({"icons": icons}, f, indent=2)
    print(f"Generated {OUTPUT_JSON}")

    # 3. Write XML
    root = ET.Element("inventory")
    for icon in icons:
        item = ET.SubElement(root, "icon")
        item.set("name", icon["name"])
        item.set("filename", icon["filename"])
        content_node = ET.SubElement(item, "content")
        content_node.text = icon["content"]

    xml_str = minidom.parseString(ET.tostring(root)).toprettyxml(indent="  ")
    with open(OUTPUT_XML, 'w') as f:
        f.write(xml_str)
    print(f"Generated {OUTPUT_XML}")

    # 4. Write Markdown
    with open(OUTPUT_MD, 'w') as f:
        f.write("# Inventario de Iconos MetodologIA\n\n")
        f.write(f"> Total Iconos: {len(icons)}\n\n")
        f.write("| Icono | Nombre | Archivo | Código SVG |\n")
        f.write("| :---: | :--- | :--- | :--- |\n")
        
        for icon in icons:
            # Markdown image link relative to MD location
            img_link = f"![{icon['name']}](canonical/{icon['filename']})"
            # Escape HTML chars for code block
            svg_code = icon['content'].replace('<', '&lt;').replace('>', '&gt;').replace('\n', '')
            # Truncate SVG code for display if too long
            short_svg = (svg_code[:40] + '...') if len(svg_code) > 40 else svg_code
            
            f.write(f"| {img_link} | **{icon['name']}** | `{icon['filename']}` | `{short_svg}` |\n")
            
    print(f"Generated {OUTPUT_MD}")

if __name__ == "__main__":
    generate_inventories()
