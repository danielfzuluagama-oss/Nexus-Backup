import os
import json

# --- 1. CONFIGURATION: PRE-DEFINED SCHEMAS ---

BASE_URL = "https://www.metodologia.info"
LOGO_URL = "https://www.metodologia.info/assets/logo.png" # Placeholder/Relative path logic handled below if needed

# Global Organization Schema (Main Entity)
SCHEMA_ORG = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MetodologIA",
    "alternateName": "Metodologia.info",
    "url": BASE_URL,
    "logo": LOGO_URL,
    "description": "Metodologías de alto rendimiento potenciadas con Inteligencia Artificial. Success as a Service.",
    "founder": {
        "@type": "Person",
        "name": "Javier Montaño"
    },
    "sameAs": [
        "https://www.linkedin.com/company/metodologia-info",
        "https://www.instagram.com/metodologia.info"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "email": "contacto@metodologia.info",
        "contactType": "customer service"
    }
}

# Personal Brand Schema (for Nosotros/Mision)
SCHEMA_PERSON = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Javier Montaño",
    "jobTitle": "CEO & Founder",
    "worksFor": {
        "@type": "Organization",
        "name": "MetodologIA"
    },
    "description": "Estratega digital especializado en la convergencia de metodologías ágiles e Inteligencia Artificial.",
    "url": f"{BASE_URL}/nosotros/index.html"
}

# Course Schema (for Bootcamp)
SCHEMA_BOOTCAMP = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Bootcamp Gestión Comercial con IA",
    "description": "Programa intensivo de 18 horas para revolucionar procesos comerciales B2B utilizando Inteligencia Artificial.",
    "provider": {
        "@type": "Organization",
        "name": "MetodologIA",
        "sameAs": BASE_URL
    },
    "educationalCredentialAwarded": "Certificación en Gestión Comercial con IA",
    "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT18H"
    },
    "offers": {
        "@type": "Offer",
        "category": "Paid",
        "priceCurrency": "COP",
        "price": "12000000"
    }
}

# Service Schema (for Servicios page)
SCHEMA_SERVICES = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Consultoría y Formación Corporativa",
    "provider": {
        "@type": "Organization",
        "name": "MetodologIA"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo de Servicios MetodologIA",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Workshops de IA"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Bootcamps Especializados"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Consultoría Tracción & Revolución"
                }
            }
        ]
    }
}

# --- 2. LOGIC: FILE MAPPING ---

# Map file paths (relative to root) to specific schemas
# 'GLOBAL' means apply SCHEMA_ORG
TARGET_MAP = {
    "index.html": ["GLOBAL"],
    "ruta/index.html": ["GLOBAL"],
    "recursos/index.html": ["GLOBAL"],
    "contacto/index.html": ["GLOBAL"],
    "empresas/index.html": ["GLOBAL"],
    "empresas/bootcamp-ventas-ia.html": ["GLOBAL", "BOOTCAMP"], # multiple schemas
    "personas/index.html": ["GLOBAL"],
    "servicios/index.html": ["GLOBAL", "SERVICES"],
    "nosotros/index.html": ["GLOBAL", "PERSON"],
    "nosotros/mision.html": ["GLOBAL", "PERSON"],
    "nosotros/ecosistema.html": ["GLOBAL"],
    "legal/terminos.html": ["GLOBAL"],
    "legal/privacidad.html": ["GLOBAL"]
}

# --- 3. EXECUTION ---

def inject_json_ld(file_path, schema_keys):
    """Injects JSON-LD script block into the head of the HTML file."""
    
    full_path = os.path.abspath(file_path)
    if not os.path.exists(full_path):
        print(f"⚠️ File not found: {file_path}")
        return

    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already injected (naive check)
        if 'marketing/aeo-guide' in content: # Just a dummy check, better to check for unique Schema
             # Actually, let's just check for specific unique strings from our schemas to avoid duplication
             pass 

        # Prepare Schemas
        schemas_to_inject = []
        if "GLOBAL" in schema_keys and '"@type": "Organization"' not in content:
            schemas_to_inject.append(SCHEMA_ORG)
        if "PERSON" in schema_keys and '"@type": "Person"' not in content:
            schemas_to_inject.append(SCHEMA_PERSON)
        if "BOOTCAMP" in schema_keys and '"@type": "Course"' not in content:
            schemas_to_inject.append(SCHEMA_BOOTCAMP)
        if "SERVICES" in schema_keys and '"@type": "Service"' not in content:
            schemas_to_inject.append(SCHEMA_SERVICES)

        if not schemas_to_inject:
            print(f"⏩ Skipping {file_path} (Schemas already present or distinct).")
            return

        # Build JSON-LD blocks
        injection_block = ""
        for sc in schemas_to_inject:
            json_str = json.dumps(sc, indent=4, ensure_ascii=False)
            injection_block += f'\n<script type="application/ld+json">\n{json_str}\n</script>\n'

        # Inject before </head>
        if '</head>' in content:
            new_content = content.replace('</head>', f'{injection_block}</head>')
            
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✅ Injected schemas into {file_path}")
        else:
            print(f"❌ Could not find </head> in {file_path}")

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")

def main():
    print("🚀 Starting AEO Schema Injection...")
    for rel_path, schema_list in TARGET_MAP.items():
        inject_json_ld(rel_path, schema_list)
    print("✨ AEO Injection Complete!")

if __name__ == "__main__":
    main()
