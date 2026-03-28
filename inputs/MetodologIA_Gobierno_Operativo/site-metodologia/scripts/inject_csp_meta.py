import os
import re

# CSP Policy to Inject (Must match .htaccess logic, but simplified for Meta)
# Note: 'frame-ancestors' is not supported in <meta>, so it is omitted.
CSP_CONTENT = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://www.googletagmanager.com; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
    "img-src 'self' data: https: blob:; "
    "font-src 'self' https://fonts.gstatic.com; "
    "connect-src 'self' https://api.metodologia.info; "
    "object-src 'none'; "
    "base-uri 'self'; "
    "form-action 'self'; "
    "upgrade-insecure-requests;"
)

META_TAG = f'<meta http-equiv="Content-Security-Policy" content="{CSP_CONTENT}">'

BASE_DIR = '/Users/deonto/Documents/Antigravity/site-metodologia'
EXCLUDE_DIRS = {'node_modules', '.git', '.agent', 'archivado', 'dist'}

def inject_csp(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if CSP already exists
        if 'Content-Security-Policy' in content:
            print(f"Skipped (CSP exists): {filepath}")
            return

        # Inject after <head>
        if '<head>' in content:
            new_content = content.replace('<head>', f'<head>\n    {META_TAG}', 1)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected CSP: {filepath}")
        else:
            print(f"Warning: No <head> tag found in {filepath}")
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def main():
    print("Starting CSP Meta Tag Injection...")
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file.endswith('.html'):
                inject_csp(os.path.join(root, file))
    print("Injection complete.")

if __name__ == "__main__":
    main()
