import os
import re

# Directories to EXCLUDE (Blocklist)
EXCLUDE_DIRS = {
    'node_modules',
    '.git',
    '.agent',
    '.well-known',
    'archivado',
    'dist', # Usually compiled
    'antigravity-awesome-skills-main [25-01-2026]', # External/Backup
    'assets_repo' # Assets
}

# Replacements map (Old -> New)
REPLACEMENTS = {
    'text-slate-300': 'text-slate-100',
    'text-slate-400': 'text-slate-200',
    'text-slate-500': 'text-slate-300',
    'text-gray-300': 'text-gray-100',
    'text-gray-400': 'text-gray-200',
    # Specific Hex overrides for internal styles
    '#cbd5e1': '#f1f5f9', # slate-300 -> slate-100
    '#94a3b8': '#e2e8f0', # slate-400 -> slate-200
}

BASE_DIR = '/Users/deonto/Documents/Antigravity/site-metodologia'

def update_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        for old, new in REPLACEMENTS.items():
            content = content.replace(old, new)
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filepath}")
        # else:
        #     print(f"Checked (no change): {filepath}")
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def main():
    print(f"Starting UNIVERSAL contrast update in: {BASE_DIR}")
    print(f"Excluding: {', '.join(EXCLUDE_DIRS)}")
    
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        # Modify dirs in-place to prune excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                update_file(filepath)
                count += 1

    print(f"Scan complete. Processed {count} files.")

if __name__ == "__main__":
    main()
