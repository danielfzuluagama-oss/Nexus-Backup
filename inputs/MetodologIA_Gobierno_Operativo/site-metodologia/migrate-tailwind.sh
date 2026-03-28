#!/bin/bash
# Tailwind Migration Script
# Replaces CDN + inline config with local CSS

cd /Users/deonto/Documents/Antigravity/site-metodologia

# Function to get correct relative path to dist/output.css
get_css_path() {
    local file="$1"
    local depth=$(echo "$file" | tr -cd '/' | wc -c)
    depth=$((depth - 6))  # Adjust for base path depth
    
    local prefix=""
    for ((i=0; i<depth; i++)); do
        prefix="../$prefix"
    done
    echo "${prefix}dist/output.css"
}

# Files to migrate (excluding already migrated ones)
FILES=(
    "vision.html"
    "sitemap.html"
    "legal/terminos.html"
    "legal/privacidad.html"
    "contacto/index.html"
    "servicios/index.html"
    "recursos/index.html"
    "recursos/catalogo/index.html"
    "recursos/ebooks/index.html"
    "recursos/playbooks/index.html"
    "recursos/automatizaciones/index.html"
    "recursos/flujos-manus/index.html"
    "recursos/flujos-genspark/index.html"
    "recursos/miniapps-claude/index.html"
    "recursos/miniapps-aistudio/index.html"
    "recursos/prototipos-lovable/index.html"
    "recursos/prototipos-stitch/index.html"
    "recursos/prototipos-v0/index.html"
    "recursos/asistentes-gpt/index.html"
    "recursos/asistentes-gemini/index.html"
    "recursos/a-medida/index.html"
    "recursos/premium/index.html"
    "recursos/premium/catalogo/index.html"
    "recursos/premium/ebooks/index.html"
    "recursos/premium/playbooks/index.html"
    "recursos/premium/automatizaciones/index.html"
    "recursos/premium/flujos-manus/index.html"
    "recursos/premium/flujos-genspark/index.html"
    "recursos/premium/miniapps-claude/index.html"
    "recursos/premium/miniapps-aistudio/index.html"
    "recursos/premium/prototipos-lovable/index.html"
    "recursos/premium/prototipos-stitch/index.html"
    "recursos/premium/prototipos-v0/index.html"
    "recursos/premium/asistentes-gpt/index.html"
    "recursos/premium/asistentes-gemini/index.html"
    "personas/autodiagnostico.html"
    "personas/bootcamp-amplificacion-profesional.html"
    "personas/consultive-workshops-estrategia-personal.html"
    "personas/dossier_amplificacion_profesional_b2c.html"
    "empresas/diagnostico-gratuito.html"
    "empresas/workshop-alineacion-comercial.html"
    "empresas/bootcamp-ventas-ia.html"
    "empresas/dossier_amplificacion_empresarial_b2b.html"
    "nosotros/ecosistema.html"
    "templates/landing-page.html"
    "templates/content-page.html"
)

echo "🔄 Migrating HTML files to local Tailwind CSS..."
echo ""

migrated=0
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        # Check if file still has CDN
        if grep -q "cdn.tailwindcss.com" "$file"; then
            # Calculate relative path
                        depth=$(echo "$file" | tr -cd '/' | wc -c)
            prefix=""
            for ((i=0; i<depth; i++)); do
                prefix="../$prefix"
            done
            css_path="${prefix}dist/output.css"
            
            # Replace CDN script with local CSS link
            # This handles the common pattern: <script src="https://cdn.tailwindcss.com"></script>
            sed -i '' "s|<script src=\"https://cdn.tailwindcss.com\"></script>|<!-- Tailwind (Local Build) -->\n    <link rel=\"stylesheet\" href=\"$css_path\">|g" "$file"
            
            # Remove tailwind.config blocks (multi-line) - simplified approach
            # This removes lines containing tailwind.config until closing </script>
            perl -i -0pe 's/<script>\s*tailwind\.config.*?<\/script>//gs' "$file"
            
            echo "✅ $file → $css_path"
            ((migrated++))
        else
            echo "⏭️  $file (already migrated)"
        fi
    else
        echo "⚠️  $file (not found)"
    fi
done

echo ""
echo "✅ Migration complete! $migrated files updated."
echo ""
echo "💡 Remember to run: npm run build:css"
echo "   to regenerate output.css after any Tailwind config changes."
