import os
import re

# Directories to EXCLUDE
EXCLUDE_DIRS = {
    'node_modules',
    '.git',
    '.agent',
    '.well-known',
    'archivado',
    'dist',
    'assets_repo'
}

BASE_DIR = '/Users/deonto/Documents/Antigravity/site-metodologia'

def update_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Replace bg-slate-950 ONLY in <body> tag
        # Regex explanation:
        # (<body[^>]*class="[^"]*)  -> Capture body tag start, up to class quote, and some classes
        # \bbg-slate-950\b          -> The exact class to replace
        # Replacement: \1bg-slate-900
        # We need to be careful if bg-slate-950 is at the end or middle. 
        # Better approach: find the body tag, then replace within it?
        # Or simple regex substitute which matches the whole group.
        
        # Pattern covers: <body class="bg-slate-950 ..."> or <body class="... bg-slate-950">
        content = re.sub(
            r'(<body[^>]*class="[^"]*)\bbg-slate-950\b', 
            r'\1bg-slate-900', 
            content,
            flags=re.IGNORECASE
        )

        # 2. Update gradient stops that blend to body (to-slate-950 -> to-slate-900)
        # This ensures heroes fade to the new body color
        content = content.replace('to-slate-950', 'to-slate-900')
        content = content.replace('via-slate-950', 'via-slate-900')
        # We generally don't want to change from-slate-950 unless we are sure, but usually 'from' is the top color.
        # If the top is dark, and we want it lighter? No, hero tops can stay dark. 
        # Usually gradients fade TO the background.
        
        # 3. Handle explicit background divs that mimic body (like global containers)
        # If there's a div with exact same classes as body?
        # No, safe to stick to gradients and body.
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filepath}")
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def main():
    print(f"Starting Body Background Lightening (950 -> 900) in: {BASE_DIR}")
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                update_file(filepath)
                count += 1

    print(f"Scan complete. Processed {count} files.")

if __name__ == "__main__":
    main()
