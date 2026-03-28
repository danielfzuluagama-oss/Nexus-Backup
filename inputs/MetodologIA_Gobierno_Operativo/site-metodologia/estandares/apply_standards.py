#!/usr/bin/env python3
"""
Apply footer micro-interactions CSS, fix file signatures, and inject breadcrumbs.
"""

import os
import re

BASE_DIR = "/Users/deonto/Documents/Antigravity/Simple_site"

# CSS to inject (footer micro-interactions + breadcrumbs)
FOOTER_CSS = '''
        /* Footer Micro-Interactions */
        .footer-link {
            position: relative;
            color: #94a3b8;
            transition: color 0.25s ease, transform 0.25s ease;
        }
        .footer-link:hover {
            color: #fbbf24;
            transform: translateX(4px);
        }
        .footer-link-active {
            color: #FFD700 !important;
            font-weight: 600;
        }
        .footer-link-active::before {
            content: '›';
            margin-right: 0.5rem;
            color: #FFD700;
            font-weight: 700;
        }
        .footer-glow-line {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.1) 20%, rgba(255, 215, 0, 0.4) 50%, rgba(255, 215, 0, 0.1) 80%, transparent 100%);
            position: absolute;
            top: 0;
            width: 100%;
            opacity: 0.5;
        }
        .footer-section-title {
            position: relative;
            display: inline-block;
        }
        .footer-section-title::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 2rem;
            height: 2px;
            background: linear-gradient(90deg, #FFD700, transparent);
            opacity: 0.5;
        }
        
        /* Breadcrumbs */
        .breadcrumbs {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.75rem;
            color: #94a3b8;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 20;
        }
        .breadcrumb-link {
            color: #64748b;
            text-decoration: none;
            transition: color 0.2s ease;
        }
        .breadcrumb-link:hover {
            color: #FFD700;
        }
        .breadcrumb-separator {
            color: #475569;
            font-size: 0.65rem;
        }
        .breadcrumb-current {
            color: #e2e8f0;
            font-weight: 500;
        }'''

# Pages to process with their breadcrumb labels
PAGES = {
    "index.html": None, # Root, no breadcrumbs needed
    "ruta/index.html": None, # Done manually
    "recursos/index.html": None, # Done manually
    "contacto/index.html": None, # Done manually
    "empresas/index.html": ("Servicios", "Empresas"),
    "empresas/bootcamp-ventas-ia.html": ("Servicios › Empresas", "Bootcamp Ventas IA"),
    "personas/index.html": ("Servicios", "Personas"),
    "servicios/index.html": ("", "Servicios"), # Direct child of Home
    "nosotros/index.html": ("", "Nosotros"),
    "nosotros/mision.html": ("Nosotros", "Misión"),
    "nosotros/ecosistema.html": ("Nosotros", "Ecosistema"),
    "legal/terminos.html": ("", "Términos y Condiciones"),
    "legal/privacidad.html": ("", "Política de Privacidad"),
}

def get_breadcrumb_html(parent_path, current_label, depth):
    """Generate breadcrumb HTML based on depth."""
    prefix = "../" * depth if depth > 0 else ""
    
    breadcrumbs_inner = f'<a href="{prefix}index.html" class="breadcrumb-link">Home</a>'
    
    if parent_path:
        # Check if parent path actually has a link (e.g. Servicios might just be text if no landing page)
        # For simplicity, we keep it text for now unless we know the URL. 
        # But per standard, usually intermediate steps are links if they exist.
        breadcrumbs_inner += f' <span class="breadcrumb-separator">›</span> <span class="breadcrumb-link">{parent_path}</span>'
    
    breadcrumbs_inner += f' <span class="breadcrumb-separator">›</span> <span class="breadcrumb-current">{current_label}</span>'

    return f'''            <!-- Breadcrumbs -->
            <nav aria-label="Breadcrumb" class="breadcrumbs mb-8">
                {breadcrumbs_inner}
            </nav>'''

def fix_signature(content):
    """Convert JS-style comment at start of file to HTML comment."""
    if content.strip().startswith("/**"):
        # Find the closing */
        end_comment = content.find("*/")
        if end_comment != -1:
            comment_block = content[:end_comment+2]
            # Replace /** with <!-- and */ with -->
            new_comment = comment_block.replace("/**", "<!--").replace("*/", "-->")
            # Clean up the lines inside to remove * prefix if desired, or just wrap it.
            # Simple approach: just change the delimiters.
            
            # Better approach: Reconstruct it cleanly
            lines = comment_block.split('\n')
            new_lines = ["<!--"]
            for line in lines[1:-1]:
                clean_line = line.strip().lstrip('*').strip()
                if clean_line:
                    new_lines.append(f"  {clean_line}")
            new_lines.append("-->")
            
            new_comment_block = '\n'.join(new_lines)
            return new_comment_block + content[end_comment+2:], True
    return content, False

def inject_footer_css(content):
    """Inject footer CSS before closing </style> tag."""
    if '.footer-link {' in content:
        return content, False
    
    head_end = content.find('</head>')
    if head_end == -1: return content, False
    
    style_end_pos = content.rfind('</style>', 0, head_end)
    if style_end_pos == -1: return content, False
    
    new_content = content[:style_end_pos] + FOOTER_CSS + '\n    ' + content[style_end_pos:]
    return new_content, True

def apply_footer_classes(content):
    """Apply footer CSS classes to HTML elements."""
    modified = False
    
    if '<div class="footer-glow-line">' not in content:
        pattern = r'(<!-- Background Decorations -->\s*\n\s*)(<div class="absolute top-0)'
        replacement = r'\1<div class="footer-glow-line"></div>\n        \2'
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            content = new_content
            modified = True
            
    # Add footer-section-title
    if 'footer-section-title' not in content:
        pattern = r'<h4 class="text-white font-semibold text-sm uppercase tracking-wider">([^<]+)</h4>'
        replacement = r'<h4 class="text-white font-semibold text-sm uppercase tracking-wider footer-section-title">\1</h4>'
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            content = new_content
            modified = True

    # Replace footer link classes
    if 'footer-link' not in content:
        pattern = r'class="text-slate-400 hover:text-yellow-400 text-sm transition-colors"'
        replacement = 'class="footer-link text-sm"'
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            content = new_content
            modified = True
            
    return content, modified

def inject_breadcrumbs(content, parent_label, current_label, depth):
    """Inject breadcrumbs into the Hero section."""
    if 'class="breadcrumbs' in content:
        return content, False

    breadcrumbs_html = get_breadcrumb_html(parent_label, current_label, depth)
    
    # Strategy: Look for the first container inside the main hero section
    
    # List of known container patterns in Hero sections
    patterns = [
        # Standard generic 7xl
        f'class="max-w-7xl mx-auto px-6 relative z-10 w-full">',
        # Personas 4xl center
        f'class="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">',
        # Nosotros container-max
        f'class="container-max relative z-10 w-full text-center py-20">',
        # Empresas specific
        f'class="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">',
        # Contacto specific
        f'class="container mx-auto max-w-4xl relative z-10">',
        # Generic fallback
        f'class="container mx-auto px-6 pt-32 pb-20 relative z-10">',
    ]

    for pattern in patterns:
        if pattern in content:
            replacement = f'{pattern}\n{breadcrumbs_html}'
            content = content.replace(pattern, replacement, 1)
            return content, True

    # Regex Fallback: Find any div with relative and z-10 in the first 100 lines of body/main if possible
    # (Not implementing heavy regex to avoid false positives, trusting patterns for now)

    print(f"    ⚠️ Could not find injection point for breadcrumbs")
    return content, False

def process_file(filepath, breadcrumb_info):
    full_path = os.path.join(BASE_DIR, filepath)
    if not os.path.exists(full_path): return

    with open(full_path, 'r', encoding='utf-8') as f: content = f.read()
    
    original_content = content
    changes = []
    
    # 1. Fix Signature
    content, fixed_sig = fix_signature(content)
    if fixed_sig: changes.append("Signature Fixed")
    
    # 2. Inject CSS
    content, css_added = inject_footer_css(content)
    if css_added: changes.append("CSS Added")
    
    # 3. Apply Footer Classes
    content, footer_mod = apply_footer_classes(content)
    if footer_mod: changes.append("Footer Classes Applied")
    
    # 4. Inject Breadcrumbs (if info provided)
    if breadcrumb_info:
        parent, label = breadcrumb_info
        depth = filepath.count('/')
        content, breadcrumbs_added = inject_breadcrumbs(content, parent, label, depth)
        if breadcrumbs_added: changes.append("Breadcrumbs Injected")
    
    if content != original_content:
        with open(full_path, 'w', encoding='utf-8') as f: f.write(content)
        print(f"✅ {filepath}: {', '.join(changes)}")
    else:
        print(f"➡️ {filepath}: No changes")

def main():
    print("🚀 Starting Site Fixes...\n")
    for filepath, info in PAGES.items():
        process_file(filepath, info)
    print("\n✨ Done!")

if __name__ == '__main__':
    main()
