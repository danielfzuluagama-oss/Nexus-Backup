#!/usr/bin/env python3
"""
MetodologIA HTML Generator — Neo-Swiss Clean and Soft Explainer
Converts all governance .md files to branded HTML with consistent aesthetic.
"""
import os, re, html as htmlmod

BASE = os.path.dirname(os.path.abspath(__file__))
PROCESOS = os.path.join(os.path.dirname(os.path.dirname(BASE)), 'procesos')
OUT = os.path.join(BASE, 'html')
os.makedirs(OUT, exist_ok=True)

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{title} — MetodologIA</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{{--navy:#122562;--gold:#FFD700;--blue:#137DC5;--dark:#1F2833;--lavender:#BBA0CC;--grey:#808080;--bg:#FAFBFD;--surface:#FFFFFF;--border:#E8ECF1;--text-1:#1F2833;--text-2:#4A5568;--text-3:#808080;--radius:10px}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:'Trebuchet MS',Verdana,sans-serif;background:var(--bg);color:var(--text-1);line-height:1.7;padding:0}}
.doc-header{{background:var(--navy);color:#fff;padding:32px 40px 24px;position:relative;overflow:hidden}}
.doc-header::after{{content:'';position:absolute;top:-50%;right:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(255,215,0,.08),transparent 70%);border-radius:50%}}
.doc-header h1{{font-family:'Poppins',sans-serif;font-size:1.6rem;font-weight:700;color:var(--gold);letter-spacing:-.3px;position:relative}}
.doc-header .meta{{font-family:'Futura','Century Gothic',sans-serif;font-size:.72rem;color:rgba(255,255,255,.6);margin-top:6px;position:relative}}
.doc-header .back{{position:absolute;top:16px;right:24px;padding:6px 14px;border-radius:6px;border:1px solid rgba(255,255,255,.2);background:transparent;color:rgba(255,255,255,.7);cursor:pointer;font-family:'Futura','Century Gothic',sans-serif;font-size:.72rem;text-decoration:none;transition:all .2s}}
.doc-header .back:hover{{background:var(--gold);color:var(--navy);border-color:var(--gold)}}
.doc-body{{max-width:820px;margin:0 auto;padding:32px 40px 60px}}
h1{{font-family:'Poppins',sans-serif;font-size:1.5rem;font-weight:700;color:var(--navy);margin:32px 0 12px;border-bottom:2px solid var(--gold);padding-bottom:8px}}
h2{{font-family:'Poppins',sans-serif;font-size:1.15rem;font-weight:700;color:var(--navy);margin:28px 0 10px;border-left:4px solid var(--gold);padding-left:12px}}
h3{{font-family:'Poppins',sans-serif;font-size:.95rem;font-weight:600;color:var(--navy);margin:20px 0 8px}}
h4{{font-family:'Poppins',sans-serif;font-size:.85rem;font-weight:600;color:var(--blue);margin:16px 0 6px}}
p{{margin:8px 0;font-size:.88rem}}
ul,ol{{margin:8px 0 8px 24px;font-size:.85rem}}
li{{margin:4px 0}}
strong{{color:var(--navy)}}
blockquote{{border-left:3px solid var(--lavender);padding:12px 16px;margin:12px 0;background:rgba(187,160,204,.06);border-radius:0 var(--radius) var(--radius) 0;font-size:.82rem;color:var(--text-2)}}
code{{background:rgba(18,37,98,.06);padding:2px 6px;border-radius:4px;font-size:.8rem;color:var(--navy)}}
pre{{background:var(--dark);color:#e2e8f0;padding:16px 20px;border-radius:var(--radius);overflow-x:auto;font-size:.78rem;line-height:1.5;margin:12px 0}}
pre code{{background:none;padding:0;color:inherit}}
table{{width:100%;border-collapse:collapse;margin:12px 0;font-size:.8rem}}
th{{background:var(--navy);color:#fff;padding:10px 12px;text-align:left;font-family:'Poppins',sans-serif;font-weight:600;font-size:.72rem;text-transform:uppercase;letter-spacing:.5px}}
td{{padding:8px 12px;border-bottom:1px solid var(--border);vertical-align:top}}
tr:hover td{{background:rgba(19,125,197,.03)}}
hr{{border:none;border-top:1px solid var(--border);margin:24px 0}}
.chip{{display:inline-block;font-size:.65rem;padding:2px 8px;border-radius:6px;font-family:'Futura','Century Gothic',sans-serif;font-weight:600}}
.chip-gold{{background:rgba(255,215,0,.12);color:#B8860B}}
.chip-blue{{background:rgba(19,125,197,.1);color:var(--blue)}}
.chip-red{{background:rgba(239,68,68,.08);color:#DC2626}}
.footer{{text-align:center;padding:20px;font-size:.68rem;color:var(--text-3);font-family:'Futura','Century Gothic',sans-serif;border-top:1px solid var(--border);margin-top:32px}}
@media print{{.doc-header .back{{display:none}}body{{padding:0}}.doc-body{{max-width:100%}}}}
@media(max-width:768px){{.doc-body{{padding:20px}}.doc-header{{padding:24px 20px 16px}}.doc-header h1{{font-size:1.2rem}}}}
</style>
</head>
<body>
<div class="doc-header">
  <a href="../index.html" class="back">← Hub</a>
  <h1>{title}</h1>
  <div class="meta">{meta}</div>
</div>
<div class="doc-body">
{body}
</div>
<div class="footer">MetodologIA — Gobierno Operativo v2.0 | Neo-Swiss Clean</div>
</body>
</html>"""

def md_to_html(md_text):
    """Simple markdown to HTML converter — handles headers, tables, lists, code, bold, links."""
    lines = md_text.split('\n')
    html_lines = []
    in_table = False
    in_code = False
    in_list = False
    list_type = None

    for line in lines:
        stripped = line.strip()

        # Code blocks
        if stripped.startswith('```'):
            if in_code:
                html_lines.append('</code></pre>')
                in_code = False
            else:
                lang = stripped[3:].strip()
                html_lines.append(f'<pre><code>')
                in_code = True
            continue
        if in_code:
            html_lines.append(htmlmod.escape(line))
            continue

        # Empty line
        if not stripped:
            if in_list:
                html_lines.append(f'</{list_type}>')
                in_list = False
                list_type = None
            if in_table:
                html_lines.append('</table>')
                in_table = False
            html_lines.append('')
            continue

        # Table
        if '|' in stripped and stripped.startswith('|'):
            cells = [c.strip() for c in stripped.split('|')[1:-1]]
            if all(c.replace('-','').replace(':','') == '' for c in cells):
                continue  # separator row
            if not in_table:
                html_lines.append('<table>')
                in_table = True
                tag = 'th'
            else:
                tag = 'td'
            row = ''.join(f'<{tag}>{inline(c)}</{tag}>' for c in cells)
            html_lines.append(f'<tr>{row}</tr>')
            continue

        if in_table and '|' not in stripped:
            html_lines.append('</table>')
            in_table = False

        # Headers
        if stripped.startswith('######'):
            html_lines.append(f'<h6>{inline(stripped[6:].strip())}</h6>')
            continue
        if stripped.startswith('#####'):
            html_lines.append(f'<h5>{inline(stripped[5:].strip())}</h5>')
            continue
        if stripped.startswith('####'):
            html_lines.append(f'<h4>{inline(stripped[4:].strip())}</h4>')
            continue
        if stripped.startswith('###'):
            html_lines.append(f'<h3>{inline(stripped[3:].strip())}</h3>')
            continue
        if stripped.startswith('##'):
            html_lines.append(f'<h2>{inline(stripped[2:].strip())}</h2>')
            continue
        if stripped.startswith('#'):
            html_lines.append(f'<h1>{inline(stripped[1:].strip())}</h1>')
            continue

        # HR
        if stripped in ('---', '***', '___'):
            html_lines.append('<hr>')
            continue

        # Blockquote
        if stripped.startswith('>'):
            html_lines.append(f'<blockquote>{inline(stripped[1:].strip())}</blockquote>')
            continue

        # Unordered list
        if stripped.startswith('- ') or stripped.startswith('* '):
            if not in_list or list_type != 'ul':
                if in_list: html_lines.append(f'</{list_type}>')
                html_lines.append('<ul>')
                in_list = True
                list_type = 'ul'
            content = stripped[2:].strip()
            # Handle checkbox
            if content.startswith('[ ]'):
                content = '☐ ' + content[3:].strip()
            elif content.startswith('[x]') or content.startswith('[X]'):
                content = '☑ ' + content[3:].strip()
            html_lines.append(f'<li>{inline(content)}</li>')
            continue

        # Ordered list
        m = re.match(r'^(\d+)\.\s+(.+)', stripped)
        if m:
            if not in_list or list_type != 'ol':
                if in_list: html_lines.append(f'</{list_type}>')
                html_lines.append('<ol>')
                in_list = True
                list_type = 'ol'
            html_lines.append(f'<li>{inline(m.group(2))}</li>')
            continue

        # Close list if not continuing
        if in_list:
            html_lines.append(f'</{list_type}>')
            in_list = False
            list_type = None

        # Paragraph
        html_lines.append(f'<p>{inline(stripped)}</p>')

    if in_list: html_lines.append(f'</{list_type}>')
    if in_table: html_lines.append('</table>')
    if in_code: html_lines.append('</code></pre>')

    return '\n'.join(html_lines)

def inline(text):
    """Handle inline markdown: bold, italic, code, links."""
    text = htmlmod.escape(text)
    # Code (before bold to avoid conflict)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    # Bold
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    # Italic
    text = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', text)
    # Links
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2" target="_blank">\1</a>', text)
    # Checkbox markers
    text = text.replace('☐', '<span style="color:var(--grey)">☐</span>')
    text = text.replace('☑', '<span style="color:var(--blue)">☑</span>')
    return text

def extract_meta(md_text):
    """Extract version, date, owner from frontmatter-style lines."""
    meta_parts = []
    for line in md_text.split('\n')[:10]:
        if line.startswith('**') and ':**' in line:
            meta_parts.append(line.replace('**','').strip())
    return ' | '.join(meta_parts[:4]) if meta_parts else 'MetodologIA Gobierno Operativo v2.0'

def extract_title(md_text):
    """Extract first H1."""
    for line in md_text.split('\n'):
        if line.startswith('# '):
            return line[2:].strip()
    return 'Documento'

def process_file(md_path, rel_path):
    """Convert a single .md to .html."""
    with open(md_path, 'r', encoding='utf-8') as f:
        md = f.read()

    title = extract_title(md)
    meta = extract_meta(md)
    body = md_to_html(md)

    # Output filename: replace / with -- for flat structure
    out_name = rel_path.replace('/', '--').replace('.md', '.html')
    out_path = os.path.join(OUT, out_name)

    html_content = HTML_TEMPLATE.format(title=htmlmod.escape(title), meta=htmlmod.escape(meta), body=body)

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    return out_name

# Directories to process
DIRS = [
    'proceso-presales',
    'proceso-operaciones-comerciales',
    'proceso-onboarding-cliente',
    'proceso-gobierno-financiero',
    'proceso-gobierno-tecnologico',
    'proceso-gobierno-talento-humano',
    'proceso-diseno-metodologico',
    'proceso-customer-success',
    'proceso-comunidad-contenido',
    'proceso-certificacion-calidad',
    'proceso-vigilancia-tecnologica',
    'proceso-comercial/meta',
]

count = 0
for dir_name in DIRS:
    dir_path = os.path.join(PROCESOS, dir_name)
    if not os.path.exists(dir_path):
        print(f"SKIP: {dir_name} (not found)")
        continue
    for root, dirs, files in os.walk(dir_path):
        for fname in sorted(files):
            if not fname.endswith('.md'):
                continue
            full_path = os.path.join(root, fname)
            rel = os.path.relpath(full_path, PROCESOS)
            out = process_file(full_path, rel)
            count += 1
            print(f"  [{count:3d}] {rel} → {out}")

# Also process MAPA-DE-PROCESOS.md
mapa_path = os.path.join(PROCESOS, '..', 'MAPA-DE-PROCESOS.md')
if os.path.exists(mapa_path):
    with open(mapa_path, 'r', encoding='utf-8') as f:
        md = f.read()
    title = extract_title(md)
    meta = extract_meta(md)
    body = md_to_html(md)
    out_path = os.path.join(OUT, 'MAPA-DE-PROCESOS.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(HTML_TEMPLATE.format(title=htmlmod.escape(title), meta=htmlmod.escape(meta), body=body))
    count += 1
    print(f"  [{count:3d}] MAPA-DE-PROCESOS.md → MAPA-DE-PROCESOS.html")

print(f"\n✅ {count} archivos HTML generados en {OUT}")
