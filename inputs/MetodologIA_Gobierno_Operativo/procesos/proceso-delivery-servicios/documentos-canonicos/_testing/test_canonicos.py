#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║  MetodologIA — Ciclo de Testing de Documentos Canónicos     ║
║  Valida 1 archivo a la vez contra reglas canónicas           ║
║  Genera reporte individual + dashboard consolidado           ║
╚══════════════════════════════════════════════════════════════╝
"""

import os
import re
import json
import glob
from datetime import datetime
from pathlib import Path
from collections import defaultdict

# ═══════════════════════════════════════════════════════════════
# CONFIGURACIÓN
# ═══════════════════════════════════════════════════════════════

BASE = "/sessions/ecstatic-keen-heisenberg/mnt/MetodologIA_Gobierno_Operativo/procesos/proceso-delivery-servicios/documentos-canonicos"
OUTPUT_DIR = "/sessions/ecstatic-keen-heisenberg/mnt/MetodologIA_Gobierno_Operativo/procesos/proceso-delivery-servicios/documentos-canonicos/_testing"

SEGMENTS = ["personas", "empresas", "aliados", "resellers", "marca-blanca"]

# ═══════════════════════════════════════════════════════════════
# VALIDITY MATRIX — defines which service×segment combos are required
# Values: "required" (✅), "restricted" (⚠️), "excluded" (❌)
# Source of truth: 00-matriz-alcance-servicio-segmento.md §4
# ═══════════════════════════════════════════════════════════════
VALIDITY_MATRIX = {
    # WORKSHOPS
    "ws-01":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "ws-02":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "ws-03":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "ws-04":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "ws-05":  {"personas": "required", "empresas": "required", "aliados": "excluded", "resellers": "required", "marca-blanca": "excluded"},
    "ws-06":  {"personas": "required", "empresas": "required", "aliados": "excluded", "resellers": "required", "marca-blanca": "excluded"},
    "ws-07":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "ws-08":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "ws-09":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "excluded"},
    "ws-10":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "ws-11":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "excluded"},
    "ws-12":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    # BOOTCAMPS (base 5)
    "bc-01":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "bc-02":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "excluded"},
    "bc-03":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "bc-04":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "bc-05":  {"personas": "required", "empresas": "required", "aliados": "excluded", "resellers": "required", "marca-blanca": "excluded"},
    # BOOTCAMPS BRIDGE (not in original 28 matrix, but exist as docs)
    "bc-06":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "excluded"},
    "bc-07":  {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "excluded"},
    # PROGRAMAS ELITE
    "pe-01":  {"personas": "required", "empresas": "required", "aliados": "restricted", "resellers": "excluded", "marca-blanca": "excluded"},
    "pe-02":  {"personas": "excluded", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    # CONSULTORIA
    "con-t1": {"personas": "excluded", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "con-t2": {"personas": "excluded", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "con-t3": {"personas": "excluded", "empresas": "required", "aliados": "required", "resellers": "excluded", "marca-blanca": "required"},
    # TECNOLOGIA
    "tec-01": {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "tec-02": {"personas": "restricted", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "tec-03": {"personas": "required", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "tec-04": {"personas": "required", "empresas": "required", "aliados": "excluded", "resellers": "excluded", "marca-blanca": "excluded"},
    # ESTRATEGIA
    "est-01": {"personas": "excluded", "empresas": "required", "aliados": "required", "resellers": "required", "marca-blanca": "required"},
    "est-02": {"personas": "required", "empresas": "required", "aliados": "restricted", "resellers": "required", "marca-blanca": "excluded"},
}

# Service line labels for grouping
SERVICE_LINES = {
    "workshop": [f"ws-{i:02d}" for i in range(1, 13)],
    "bootcamp": [f"bc-{i:02d}" for i in range(1, 8)],
    "programa-elite": ["pe-01", "pe-02"],
    "consultoria": ["con-t1", "con-t2", "con-t3"],
    "tecnologia": [f"tec-{i:02d}" for i in range(1, 5)],
    "estrategia": ["est-01", "est-02"],
}

# Known service IDs and their expected properties
SERVICE_CATALOG = {
    # Workshops (3h, prices vary by segment)
    "ws-01": {"name": "Ecosistema IA", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-02": {"name": "Advanced Prompting", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-03": {"name": "Second Brain", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-04": {"name": "Productividad GTD", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-05": {"name": "Moving Motivators", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-06": {"name": "Happiness Canvas", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-07": {"name": "Team Canvas", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-08": {"name": "De Ocupado a Productivo", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-09": {"name": "Qué Pasa con IA", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-10": {"name": "Ideación con IA", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-11": {"name": "Ética Gobernanza", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    "ws-12": {"name": "Exponential Leadership", "line": "workshop", "duration_h": 3, "price_personas": 200000},
    # Bootcamps (3 semanas / 20-24h)
    "bc-01": {"name": "Office Automation", "line": "bootcamp", "duration_w": 3},
    "bc-02": {"name": "Sales with AI", "line": "bootcamp", "duration_w": 3},
    "bc-03": {"name": "Ways of Working", "line": "bootcamp", "duration_w": 3},
    "bc-04": {"name": "Amplified Work", "line": "bootcamp", "duration_w": 3},
    "bc-05": {"name": "Vibe Coding", "line": "bootcamp", "duration_w": 3},
    "bc-06": {"name": "Trabajar Amplificado", "line": "bootcamp", "duration_w": 3, "is_bridge": True, "bridge_to": "PE-01"},
    "bc-07": {"name": "Trabajo Agéntico", "line": "bootcamp", "duration_w": 3, "is_bridge": True, "bridge_to": "PE-02"},
    # Programas Élite (16 semanas)
    "pe-01": {"name": "Empoderamiento", "line": "programa-elite", "duration_w": 16},
    "pe-02": {"name": "Digital Champions", "line": "programa-elite", "duration_w": 16},
    # Consultoría
    "con-t1": {"name": "Diagnóstico", "line": "consultoria"},
    "con-t2": {"name": "Tracción", "line": "consultoria"},
    "con-t3": {"name": "Evolución", "line": "consultoria"},
    # Tecnología
    "tec-01": {"name": "Asistentes IA", "line": "tecnologia"},
    "tec-02": {"name": "Agentes IA", "line": "tecnologia"},
    "tec-03": {"name": "Mini Apps", "line": "tecnologia"},
    "tec-04": {"name": "Sitios Web", "line": "tecnologia"},
    # Estrategia
    "est-01": {"name": "EstrategIA Empresarial", "line": "estrategia"},
    "est-02": {"name": "EstrategIA Personal", "line": "estrategia"},
}

# Pathway rules: which personal-path services should reference which next steps
PATHWAY_PERSONAL = {
    "ws-08": {"next": ["BC-06", "Trabajar Amplificado"], "destination": ["PE-01", "Empoderamiento"]},
    "bc-06": {"next": ["EST-02", "EstrategIA Personal"], "destination": ["PE-01", "Empoderamiento"]},
    "est-02": {"next": ["PE-01", "Empoderamiento"], "destination": ["PE-01"]},
}

PATHWAY_ENTERPRISE = {
    "ws-01": {"next": ["BC-07", "Trabajo Agéntico"], "destination": ["PE-02", "Digital Champions"]},
    "ws-02": {"next": ["BC-07", "Trabajo Agéntico"], "destination": ["PE-02", "Digital Champions"]},
    "ws-10": {"next": ["BC-07", "Trabajo Agéntico"], "destination": ["PE-02", "Digital Champions"]},
    "bc-07": {"next": ["EST-01", "EstrategIA Empresarial"], "destination": ["PE-02", "Digital Champions"]},
    "est-01": {"next": ["PE-02", "Digital Champions"], "destination": ["PE-02"]},
}

# Segment labels expected in document content
SEGMENT_LABELS = {
    "personas": ["PERSONAS", "Personas", "B2C", "Individuos"],
    "empresas": ["EMPRESAS", "Empresas", "B2B", "Corporativo"],
    "aliados": ["ALIADOS", "Aliados", "Partner", "Alianza"],
    "resellers": ["RESELLERS", "Resellers", "Reseller", "Canal"],
    "marca-blanca": ["MARCA BLANCA", "Marca Blanca", "White Label", "marca-blanca", "MARCA_BLANCA"],
}


# ═══════════════════════════════════════════════════════════════
# TEST RULES (cada regla = función que retorna lista de issues)
# ═══════════════════════════════════════════════════════════════

class Issue:
    """Represents a single test finding."""
    def __init__(self, severity, rule_id, message, line=None, context=None):
        self.severity = severity  # CRITICAL, WARNING, INFO
        self.rule_id = rule_id
        self.message = message
        self.line = line
        self.context = context

    def to_dict(self):
        d = {"severity": self.severity, "rule": self.rule_id, "message": self.message}
        if self.line:
            d["line"] = self.line
        if self.context:
            d["context"] = self.context[:120]
        return d

    def __str__(self):
        loc = f" (L{self.line})" if self.line else ""
        return f"[{self.severity}] {self.rule_id}{loc}: {self.message}"


def parse_file_identity(filepath):
    """Extract service_id, segment, line from filepath."""
    fname = Path(filepath).stem  # e.g. ws-01-personas or bc-06-maestro
    parts = fname.split("-")

    # Detect maestro docs
    if fname.endswith("-maestro"):
        service_id = "-".join(parts[:-1])  # bc-06
        return {"service_id": service_id, "segment": "maestro", "filename": fname}

    # Regular segment docs: {id}-{segment}
    # IDs can be: ws-01, bc-06, pe-01, con-t1, tec-01, est-01
    # Try matching known patterns
    for prefix_len in [2, 3]:  # ws-01 = 2 parts, con-t1 = 2 parts
        candidate_id = "-".join(parts[:prefix_len])
        candidate_seg = "-".join(parts[prefix_len:])
        if candidate_id in SERVICE_CATALOG and candidate_seg in SEGMENTS:
            return {"service_id": candidate_id, "segment": candidate_seg, "filename": fname}

    # Fallback: last part is segment
    candidate_seg = parts[-1]
    candidate_id = "-".join(parts[:-1])
    if candidate_seg in SEGMENTS or candidate_seg == "maestro":
        return {"service_id": candidate_id, "segment": candidate_seg, "filename": fname}

    return {"service_id": fname, "segment": "unknown", "filename": fname}


def test_structure_sections(content, lines, identity):
    """T-STR: Validate required sections exist (segment-aware)."""
    issues = []
    seg = identity["segment"]
    content_lower = content.lower()

    # Define required sections with segment-specific equivalents
    if seg in ["aliados"]:
        required = [
            ("Ficha Rápida", "T-STR-01", []),
            ("Modelo de Co-Delivery", "T-STR-02", ["co-delivery", "modelo de alianza", "definición y alcance"]),
            ("Certificación", "T-STR-03", ["requisitos", "certificación del facilitador", "audiencia"]),
            ("Propuesta de Valor", "T-STR-04", ["propuesta de valor para el aliado"]),
            ("Contenido", "T-STR-05", ["contenido y contextualización", "contenido licenciado", "estructura y contenido"]),
        ]
    elif seg in ["resellers"]:
        required = [
            ("Ficha Rápida", "T-STR-01", []),
            ("Modelo de Distribución", "T-STR-02", ["modelo de distribución", "modelo de negocio", "definición y alcance"]),
            ("Kit de Ventas", "T-STR-03", ["kit de ventas", "proceso de venta", "requisitos", "audiencia"]),
            ("Propuesta de Valor", "T-STR-04", ["propuesta de valor para el reseller"]),
            ("Modelo Económico", "T-STR-05", ["modelo económico", "comisiones", "estructura y contenido"]),
        ]
    elif seg in ["marca-blanca"]:
        required = [
            ("Ficha Rápida", "T-STR-01", []),
            ("Modelo de Licenciamiento", "T-STR-02", ["modelo de licenciamiento", "licencia", "definición y alcance"]),
            ("Personalización", "T-STR-03", ["personalización", "certificación", "audiencia"]),
            ("Modelo Económico", "T-STR-04", ["modelo económico", "propuesta de valor"]),
            ("Contenido Licenciado", "T-STR-05", ["contenido licenciado", "contenido incluido", "estructura y contenido"]),
        ]
    else:
        # Standard personas/empresas/maestro sections
        required = [
            ("Ficha Rápida", "T-STR-01", []),
            ("Definición y Alcance", "T-STR-02", ["definición", "alcance"]),
            ("Audiencia", "T-STR-03", ["audiencia", "público"]),
            ("Propuesta de Valor", "T-STR-04", ["propuesta de valor"]),
            ("Estructura y Contenido", "T-STR-05", ["estructura", "contenido"]),
        ]

    for section_name, rule_id, alternatives in required:
        found = section_name.lower() in content_lower
        if not found:
            for alt in alternatives:
                if alt.lower() in content_lower:
                    found = True
                    break
        if not found:
            issues.append(Issue("WARNING", rule_id,
                f"Sección '{section_name}' (o equivalente) no encontrada"))

    return issues


def test_naming_convention(filepath, content, identity):
    """T-NAM: Validate filename matches content metadata."""
    issues = []
    sid = identity["service_id"]
    seg = identity["segment"]
    fname = Path(filepath).name

    # Check filename pattern
    if seg != "maestro" and seg != "unknown":
        expected_pattern = f"{sid}-{seg}.md"
        if fname != expected_pattern:
            issues.append(Issue("CRITICAL", "T-NAM-01",
                f"Filename '{fname}' no coincide con patrón esperado '{expected_pattern}'"))

    # Check that Código: in content matches
    code_match = re.search(r'\*\*Código:\*\*\s*(\S+)', content)
    if code_match:
        code_in_doc = code_match.group(1).strip().rstrip("|").strip()
        expected_code = f"{sid.upper()}-{seg.upper()}".replace("-", "-")
        # Normalize for comparison
        norm_doc = code_in_doc.upper().replace("_", "-")
        norm_exp = expected_code.upper().replace("_", "-")
        if norm_doc != norm_exp:
            issues.append(Issue("WARNING", "T-NAM-02",
                f"Código en doc '{code_in_doc}' no coincide con esperado '{expected_code}'"))
    else:
        if seg != "maestro":
            issues.append(Issue("INFO", "T-NAM-03",
                "No se encontró campo **Código:** en el documento"))

    # Check parent directory matches service line
    parent_dir = Path(filepath).parent.name
    if sid in SERVICE_CATALOG:
        expected_slug_start = sid
        if not parent_dir.startswith(expected_slug_start):
            issues.append(Issue("CRITICAL", "T-NAM-04",
                f"Archivo en directorio '{parent_dir}' pero service_id es '{sid}'"))

    return issues


def test_segment_alignment(content, identity):
    """T-SEG: Validate segment references are correct for this file."""
    issues = []
    seg = identity["segment"]
    if seg == "maestro" or seg == "unknown":
        return issues

    # Check that correct segment label appears
    expected_labels = SEGMENT_LABELS.get(seg, [])
    found_any = False
    for label in expected_labels:
        if label in content:
            found_any = True
            break
    if not found_any:
        issues.append(Issue("CRITICAL", "T-SEG-01",
            f"Documento para segmento '{seg}' no contiene ninguna etiqueta esperada: {expected_labels}"))

    # Check for WRONG segment contamination
    wrong_segments = {s: labels for s, labels in SEGMENT_LABELS.items() if s != seg}
    content_upper = content.upper()

    # Only flag if the wrong segment appears as "Segmento:" header value
    # Use FIRST line that starts with **Segmento:** to avoid false positives
    seg_header_match = re.search(r'^\*\*Segmento:\*\*\s*(.+)', content, re.MULTILINE)
    if seg_header_match:
        seg_value = seg_header_match.group(1).strip()
        for wrong_seg, wrong_labels in wrong_segments.items():
            for label in wrong_labels:
                if label.upper() in seg_value.upper() and label.upper() not in [l.upper() for l in expected_labels]:
                    # Filter out common false positives
                    # "B2B"/"B2C" appear everywhere, "personas" appears in "50-500 personas"
                    if label.upper() in ["B2B", "B2C"]:
                        continue
                    # "Personas" as a word (e.g. "50-500 personas") is not a segment reference
                    if label == "Personas" and re.search(r'\d+.*personas', seg_value, re.IGNORECASE):
                        continue
                    if label == "PERSONAS" and re.search(r'\d+.*personas', seg_value, re.IGNORECASE):
                        continue
                    # "Partner" in aliados context for resellers — check if it's standalone
                    if label == "Partner" and seg == "resellers":
                        # "Partner" appearing in a reseller doc is contextually expected
                        continue
                    issues.append(Issue("CRITICAL", "T-SEG-02",
                        f"Header Segmento contiene '{label}' (segmento incorrecto '{wrong_seg}') — archivo es para '{seg}'",
                        context=seg_value))

    return issues


def test_pricing_consistency(content, identity):
    """T-PRC: Validate pricing/economic model is present (segment-aware)."""
    issues = []
    seg = identity["segment"]
    sid = identity["service_id"]

    if seg == "maestro" or seg == "unknown":
        return issues

    content_lower = content.lower()

    # Channel segments use economic models, not direct pricing
    if seg in ["aliados", "resellers", "marca-blanca"]:
        economic_keywords = ["modelo económico", "comisión", "revenue share", "licencia",
                           "wholesale", "margen", "precio mínimo", "valor facturado",
                           "inversión anual", "cop", "10/20/70", "10%", "20%", "70%"]
        found = any(kw in content_lower for kw in economic_keywords)
        if not found:
            issues.append(Issue("WARNING", "T-PRC-04",
                f"Doc '{seg}' no contiene modelo económico (comisión, wholesale, licencia, etc.)"))
    else:
        # Standard B2C/B2B pricing check
        price_match = re.search(r'\*\*Precio\s*canónico:\*\*\s*(.+)', content, re.IGNORECASE)
        if not price_match:
            price_match = re.search(r'\*\*Precio:\*\*\s*(.+)', content, re.IGNORECASE)
        if not price_match:
            price_match = re.search(r'\*\*Inversión:\*\*\s*(.+)', content, re.IGNORECASE)

        if price_match:
            price_text = price_match.group(1).strip()
            if "{{" in price_text:
                issues.append(Issue("CRITICAL", "T-PRC-01",
                    f"Precio tiene placeholder sin resolver: '{price_text}'"))
        else:
            # Check if COP appears anywhere as fallback
            if "cop" not in content_lower and "gratuito" not in content_lower and "pipeline" not in content_lower:
                issues.append(Issue("WARNING", "T-PRC-04",
                    "No se encontró campo de Precio canónico ni referencia a COP"))

    return issues


def test_placeholder_residuals(content, lines):
    """T-PLH: Detect unresolved {{ }} placeholders."""
    issues = []
    placeholder_pattern = re.compile(r'\{\{[^}]*\}\}')

    for i, line in enumerate(lines, 1):
        matches = placeholder_pattern.findall(line)
        for match in matches:
            issues.append(Issue("CRITICAL", "T-PLH-01",
                f"Placeholder sin resolver: '{match[:60]}'", line=i, context=line.strip()))

    return issues


def test_pathway_references(content, identity):
    """T-PTH: Validate pathway references (next step, bridge, destination)."""
    issues = []
    sid = identity["service_id"]
    seg = identity["segment"]

    if seg == "maestro":
        return issues

    # Check personal pathway
    if sid in PATHWAY_PERSONAL and seg == "personas":
        pathway = PATHWAY_PERSONAL[sid]
        for keyword in pathway.get("destination", []):
            if keyword not in content:
                issues.append(Issue("WARNING", "T-PTH-01",
                    f"Pathway personal: no se encontró referencia a destino '{keyword}' en doc personas"))
                break

    # Check enterprise pathway
    if sid in PATHWAY_ENTERPRISE and seg == "empresas":
        pathway = PATHWAY_ENTERPRISE[sid]
        for keyword in pathway.get("destination", []):
            if keyword not in content:
                issues.append(Issue("WARNING", "T-PTH-02",
                    f"Pathway enterprise: no se encontró referencia a destino '{keyword}' en doc empresas"))
                break

    # Bridge bootcamps must reference their target program (by ID or name)
    if sid in SERVICE_CATALOG:
        cat = SERVICE_CATALOG[sid]
        if cat.get("is_bridge"):
            target_id = cat["bridge_to"]  # e.g. "PE-01"
            # Accept either the ID or the program name
            target_names = {
                "PE-01": ["PE-01", "Empoderamiento", "empoderamiento"],
                "PE-02": ["PE-02", "Digital Champions", "Digital Champion", "digital champions"],
            }
            acceptable = target_names.get(target_id, [target_id])
            found = any(name in content for name in acceptable)
            if not found:
                issues.append(Issue("CRITICAL", "T-PTH-03",
                    f"Bootcamp puente ({sid}) no referencia su programa destino '{target_id}' (ni por ID ni por nombre)"))

    return issues


def test_duration_consistency(content, identity):
    """T-DUR: Validate duration is mentioned (segment-aware)."""
    issues = []
    sid = identity["service_id"]
    seg = identity["segment"]

    if seg == "maestro" or seg == "unknown" or sid not in SERVICE_CATALOG:
        return issues

    cat = SERVICE_CATALOG[sid]
    content_lower = content.lower()

    # Channel segments may state duration differently (e.g., "8 horas" for marca blanca vs "3 horas" standard)
    # Just check that SOME duration reference exists
    duration_keywords = ["hora", "semana", "sesión", "sesion", "día", "dia", "duración", "duracion", "1 día", "intensivo"]

    has_duration = any(kw in content_lower for kw in duration_keywords)
    if not has_duration:
        issues.append(Issue("WARNING", "T-DUR-01",
            "No se encontró ninguna referencia a duración en el documento"))
        return issues

    # For standard segments (personas, empresas), check specific values
    if seg in ["personas", "empresas"]:
        if cat.get("duration_h"):
            expected = f"{cat['duration_h']} hora"
            alt = f"{cat['duration_h']}h"
            if expected not in content_lower and alt not in content_lower:
                issues.append(Issue("INFO", "T-DUR-02",
                    f"Duración estándar '{cat['duration_h']}h' no encontrada (puede ser formato diferente)"))

        if cat.get("duration_w"):
            expected_w = str(cat["duration_w"])
            if f"{expected_w} semana" not in content_lower:
                issues.append(Issue("INFO", "T-DUR-03",
                    f"Duración estándar '{expected_w} semanas' no encontrada (puede ser formato diferente)"))

    return issues


def test_compensation_model(content, identity):
    """T-CMP: Validate economic/compensation model presence for channel segments."""
    issues = []
    seg = identity["segment"]
    sid = identity["service_id"]

    if seg in ["maestro", "unknown"]:
        return issues

    content_lower = content.lower()

    # Channel segments MUST have economic model
    if seg in ["aliados", "resellers", "marca-blanca"]:
        economic_keywords = ["10/20/70", "10%", "20%", "70%", "compensación", "revenue share",
                           "comisión", "modelo económico", "wholesale", "margen", "licencia anual",
                           "inversión", "facturación"]
        has_model = any(kw in content_lower for kw in economic_keywords)
        if not has_model:
            issues.append(Issue("WARNING", "T-CMP-01",
                f"Doc '{seg}' no menciona modelo económico/compensación"))

    return issues


def test_minimum_depth(content, identity):
    """T-DEP: Validate document has sufficient depth (not stub)."""
    issues = []
    word_count = len(content.split())

    # Segment docs should have meaningful content
    if identity["segment"] not in ["maestro", "unknown"]:
        if word_count < 200:
            issues.append(Issue("CRITICAL", "T-DEP-01",
                f"Documento es un stub ({word_count} palabras). Mínimo esperado: 200"))
        elif word_count < 500:
            issues.append(Issue("WARNING", "T-DEP-02",
                f"Documento corto ({word_count} palabras). Recomendado: 500+"))
    else:
        # Maestro docs should be more detailed
        if word_count < 500:
            issues.append(Issue("WARNING", "T-DEP-03",
                f"Documento maestro corto ({word_count} palabras). Esperado: 500+"))

    return issues


def test_cross_references(content, identity):
    """T-XRF: Validate internal cross-references are valid."""
    issues = []

    # Find all service ID references in content
    ref_pattern = re.compile(r'\b(WS-\d{2}|BC-\d{2}|PE-\d{2}|CON-T\d|TEC-\d{2}|EST-\d{2})\b', re.IGNORECASE)
    refs = ref_pattern.findall(content)

    for ref in refs:
        ref_lower = ref.lower()
        if ref_lower not in SERVICE_CATALOG:
            issues.append(Issue("WARNING", "T-XRF-01",
                f"Referencia a servicio '{ref}' que no existe en el catálogo"))

    return issues


def test_date_validity(content, identity):
    """T-DAT: Validate dates are reasonable."""
    issues = []

    date_pattern = re.compile(r'\b(\d{4}-\d{2}-\d{2})\b')
    dates = date_pattern.findall(content)

    for date_str in dates:
        try:
            d = datetime.strptime(date_str, "%Y-%m-%d")
            if d.year < 2024 or d.year > 2027:
                issues.append(Issue("INFO", "T-DAT-01",
                    f"Fecha '{date_str}' fuera del rango esperado (2024-2027)"))
        except ValueError:
            issues.append(Issue("INFO", "T-DAT-02",
                f"Fecha con formato inválido: '{date_str}'"))

    return issues


# ═══════════════════════════════════════════════════════════════
# TEST RUNNER
# ═══════════════════════════════════════════════════════════════

ALL_TESTS = [
    ("T-STR", "Estructura de Secciones", test_structure_sections),
    ("T-NAM", "Convención de Nombres", test_naming_convention),
    ("T-SEG", "Alineación de Segmento", test_segment_alignment),
    ("T-PRC", "Consistencia de Pricing", test_pricing_consistency),
    ("T-PLH", "Placeholders Residuales", test_placeholder_residuals),
    ("T-PTH", "Referencias de Pathway", test_pathway_references),
    ("T-DUR", "Consistencia de Duración", test_duration_consistency),
    ("T-CMP", "Modelo de Compensación", test_compensation_model),
    ("T-DEP", "Profundidad Mínima", test_minimum_depth),
    ("T-XRF", "Cross-References", test_cross_references),
    ("T-DAT", "Validez de Fechas", test_date_validity),
]


def run_tests_on_file(filepath):
    """Run all tests on a single file. Returns test report dict."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    identity = parse_file_identity(filepath)

    report = {
        "file": filepath,
        "filename": Path(filepath).name,
        "service_id": identity["service_id"],
        "segment": identity["segment"],
        "word_count": len(content.split()),
        "line_count": len(lines),
        "timestamp": datetime.now().isoformat(),
        "tests_run": [],
        "issues": [],
        "score": 0,
    }

    total_issues = {"CRITICAL": 0, "WARNING": 0, "INFO": 0}

    for test_id, test_name, test_fn in ALL_TESTS:
        # Call with appropriate signature
        if test_fn == test_structure_sections:
            issues = test_fn(content, lines, identity)
        elif test_fn == test_naming_convention:
            issues = test_fn(filepath, content, identity)
        elif test_fn == test_placeholder_residuals:
            issues = test_fn(content, lines)
        else:
            issues = test_fn(content, identity)

        test_result = {
            "test_id": test_id,
            "test_name": test_name,
            "status": "PASS" if not issues else ("FAIL" if any(i.severity == "CRITICAL" for i in issues) else "WARN"),
            "issues_count": len(issues),
        }
        report["tests_run"].append(test_result)

        for issue in issues:
            report["issues"].append(issue.to_dict())
            total_issues[issue.severity] += 1

    # Score: 100 - (CRITICAL*15 + WARNING*5 + INFO*1), min 0
    deductions = total_issues["CRITICAL"] * 15 + total_issues["WARNING"] * 5 + total_issues["INFO"] * 1
    report["score"] = max(0, 100 - deductions)
    report["summary"] = {
        "critical": total_issues["CRITICAL"],
        "warnings": total_issues["WARNING"],
        "info": total_issues["INFO"],
        "total": sum(total_issues.values()),
        "verdict": "PASS" if total_issues["CRITICAL"] == 0 and total_issues["WARNING"] <= 2 else (
            "CONDITIONAL" if total_issues["CRITICAL"] == 0 else "FAIL"
        )
    }

    return report


def discover_files():
    """Discover all canonical .md files to test."""
    pattern = os.path.join(BASE, "**", "*.md")
    all_files = sorted(glob.glob(pattern, recursive=True))
    # Exclude governance/meta files and legacy
    excluded = ["00-matriz-alcance", "00-template-canonico", "_legacy", "_testing"]
    return [f for f in all_files if not any(ex in f for ex in excluded)]


def format_file_report(report):
    """Generate human-readable report for a single file."""
    r = report
    s = r["summary"]

    # Verdict emoji
    verdict_icon = {"PASS": "✅", "CONDITIONAL": "⚠️", "FAIL": "❌"}[s["verdict"]]

    lines = []
    lines.append(f"{'═' * 70}")
    lines.append(f"  {verdict_icon} TEST REPORT: {r['filename']}")
    lines.append(f"{'═' * 70}")
    lines.append(f"  Service: {r['service_id'].upper()}  |  Segment: {r['segment'].upper()}")
    lines.append(f"  Words: {r['word_count']}  |  Lines: {r['line_count']}  |  Score: {r['score']}/100")
    lines.append(f"  Verdict: {s['verdict']}  ({s['critical']} critical, {s['warnings']} warn, {s['info']} info)")
    lines.append(f"{'─' * 70}")

    # Tests summary
    for t in r["tests_run"]:
        icon = {"PASS": "✓", "WARN": "~", "FAIL": "✗"}[t["status"]]
        lines.append(f"  [{icon}] {t['test_id']} {t['test_name']}: {t['status']} ({t['issues_count']} issues)")

    # Issues detail
    if r["issues"]:
        lines.append(f"{'─' * 70}")
        lines.append("  ISSUES DETAIL:")
        for issue in r["issues"]:
            loc = f" L{issue['line']}" if issue.get('line') else ""
            lines.append(f"    [{issue['severity']}] {issue['rule']}{loc}: {issue['message']}")
            if issue.get("context"):
                lines.append(f"           → {issue['context']}")

    lines.append(f"{'═' * 70}")
    lines.append("")
    return "\n".join(lines)


def generate_dashboard(all_reports, coverage=None):
    """Generate consolidated HTML dashboard with coverage heatmap."""
    total = len(all_reports)
    passed = sum(1 for r in all_reports if r["summary"]["verdict"] == "PASS")
    conditional = sum(1 for r in all_reports if r["summary"]["verdict"] == "CONDITIONAL")
    failed = sum(1 for r in all_reports if r["summary"]["verdict"] == "FAIL")
    avg_score = sum(r["score"] for r in all_reports) / total if total else 0

    # Aggregate issues by rule
    rule_counts = defaultdict(int)
    severity_counts = {"CRITICAL": 0, "WARNING": 0, "INFO": 0}
    for r in all_reports:
        for issue in r["issues"]:
            rule_counts[issue["rule"]] += 1
            severity_counts[issue["severity"]] += 1

    # Sort by count
    top_rules = sorted(rule_counts.items(), key=lambda x: -x[1])[:15]

    # Group by service line
    line_stats = defaultdict(lambda: {"total": 0, "pass": 0, "fail": 0, "avg_score": 0, "scores": []})
    for r in all_reports:
        sid = r["service_id"]
        if sid in SERVICE_CATALOG:
            line = SERVICE_CATALOG[sid]["line"]
        else:
            line = "unknown"
        line_stats[line]["total"] += 1
        line_stats[line]["scores"].append(r["score"])
        if r["summary"]["verdict"] == "PASS":
            line_stats[line]["pass"] += 1
        elif r["summary"]["verdict"] == "FAIL":
            line_stats[line]["fail"] += 1

    for k, v in line_stats.items():
        v["avg_score"] = sum(v["scores"]) / len(v["scores"]) if v["scores"] else 0

    # Build existing files lookup for heatmap
    existing_pairs = set()
    file_scores = {}
    for r in all_reports:
        pair = (r["service_id"], r["segment"])
        existing_pairs.add(pair)
        file_scores[pair] = r["score"]

    # Build HTML
    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Testing Dashboard — Documentos Canónicos MetodologIA</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ background: hsl(222,29%,12%); color: #e2e8f0; font-family: 'Montserrat', sans-serif; padding: 20px; }}
h1, h2, h3 {{ font-family: 'Poppins', sans-serif; color: #FFFFFF; }}
.header {{ text-align: center; padding: 30px 0; border-bottom: 2px solid #FFD700; margin-bottom: 30px; }}
.header h1 {{ font-size: 2em; }}
.header .subtitle {{ color: #cbd5e1; margin-top: 8px; }}
.ia-gold {{ background: linear-gradient(135deg, #FFD700, #FFA000); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
.kpi-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 30px; }}
.kpi {{ background: hsl(220,34%,18%); border-radius: 12px; padding: 20px; text-align: center; border: 1px solid rgba(255,255,255,0.08); }}
.kpi .value {{ font-size: 2.4em; font-weight: 700; font-family: 'Poppins'; }}
.kpi .label {{ font-size: 0.85em; color: #cbd5e1; margin-top: 4px; }}
.pass {{ color: #34d399; }}
.warn {{ color: #F97316; }}
.fail {{ color: #ef4444; }}
.info-color {{ color: #FFD700; }}
.score {{ color: #FFD700; }}
.section {{ background: hsl(220,34%,18%); border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.08); }}
table {{ width: 100%; border-collapse: collapse; margin-top: 12px; }}
th {{ background: hsl(220,30%,23%); color: #FFD700; padding: 10px 12px; text-align: left; font-size: 0.85em; }}
td {{ padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.85em; }}
tr:hover {{ background: hsl(220,30%,23%); }}
.badge {{ display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 0.75em; font-weight: 600; }}
.badge-pass {{ background: rgba(52,211,153,0.15); color: #34d399; }}
.badge-conditional {{ background: rgba(249,115,22,0.15); color: #F97316; }}
.badge-fail {{ background: rgba(239,68,68,0.15); color: #ef4444; }}
.progress-bar {{ background: rgba(255,255,255,0.08); border-radius: 6px; height: 8px; overflow: hidden; }}
.progress-fill {{ height: 100%; border-radius: 6px; transition: width 0.5s; }}
.filter-bar {{ display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }}
.filter-btn {{ padding: 6px 16px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); background: hsl(220,34%,18%); color: #cbd5e1; cursor: pointer; font-size: 0.85em; }}
.filter-btn.active {{ background: #FFD700; color: hsl(222,29%,12%); border-color: #FFD700; font-weight: 600; }}
.timestamp {{ text-align: center; color: #cbd5e1; font-size: 0.8em; margin-top: 30px; }}
.heatmap-grid {{ display: grid; grid-template-columns: 140px repeat(5, 1fr); gap: 2px; margin-top: 16px; font-size: 0.72em; }}
.heatmap-header {{ background: hsl(220,30%,23%); color: #FFD700; padding: 8px 6px; text-align: center; font-weight: 700; font-family: 'Poppins', sans-serif; }}
.heatmap-label {{ background: hsl(220,30%,23%); color: #e2e8f0; padding: 6px 8px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }}
.heatmap-cell {{ padding: 6px 4px; text-align: center; border-radius: 4px; font-weight: 600; cursor: default; position: relative; }}
.heatmap-cell.exists {{ background: rgba(52,211,153,0.2); color: #34d399; }}
.heatmap-cell.missing {{ background: rgba(239,68,68,0.25); color: #ef4444; animation: pulse-red 2s ease-in-out infinite; }}
.heatmap-cell.restricted {{ background: rgba(249,115,22,0.2); color: #F97316; }}
.heatmap-cell.excluded {{ background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.15); }}
.heatmap-cell.line-sep {{ border-top: 2px solid rgba(255,215,0,0.3); }}
@keyframes pulse-red {{ 0%,100% {{ opacity: 1; }} 50% {{ opacity: 0.6; }} }}
.heatmap-legend {{ display: flex; gap: 16px; margin: 12px 0; flex-wrap: wrap; font-size: 0.8em; }}
.heatmap-legend span {{ display: flex; align-items: center; gap: 4px; }}
.heatmap-legend .dot {{ width: 12px; height: 12px; border-radius: 3px; display: inline-block; }}
.coverage-ring {{ width: 120px; height: 120px; position: relative; }}
.coverage-ring svg {{ transform: rotate(-90deg); }}
.coverage-ring .ring-label {{ position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.6em; font-weight: 800; font-family: 'Poppins', sans-serif; }}
.tab-bar {{ display: flex; gap: 0; margin-bottom: 0; border-bottom: 2px solid rgba(255,255,255,0.08); }}
.tab-btn {{ padding: 10px 20px; border: none; background: transparent; color: #cbd5e1; cursor: pointer; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.85em; border-bottom: 3px solid transparent; transition: all 0.3s; }}
.tab-btn.active {{ color: #FFD700; border-bottom-color: #FFD700; }}
.tab-btn:hover {{ color: #FFD700; }}
.tab-content {{ display: none; padding-top: 20px; }}
.tab-content.active {{ display: block; }}
</style>
</head>
<body>
<div class="header">
    <h1>Testing & Coverage Dashboard</h1>
    <div class="subtitle">Documentos Canónicos — Metodolog<span class="ia-gold">IA</span> Gobierno Operativo</div>
    <div class="subtitle">{datetime.now().strftime('%Y-%m-%d %H:%M')}</div>
</div>

<div class="kpi-grid">
    <div class="kpi"><div class="value score">{coverage['total_existing'] if coverage else total}/{coverage['total_needed'] if coverage else '?'}</div><div class="label">Cobertura Matrix</div></div>
    <div class="kpi"><div class="value {'pass' if coverage and coverage['coverage_pct'] >= 90 else 'warn' if coverage and coverage['coverage_pct'] >= 70 else 'fail'}">{coverage['coverage_pct']:.0f}%</div><div class="label">% Cobertura</div></div>
    <div class="kpi"><div class="value fail">{coverage['total_gaps'] if coverage else '?'}</div><div class="label">Docs Pendientes</div></div>
    <div class="kpi"><div class="value pass">{passed}/{total}</div><div class="label">Tests PASS</div></div>
    <div class="kpi"><div class="value score">{avg_score:.0f}</div><div class="label">Score Promedio</div></div>
    <div class="kpi"><div class="value fail">{severity_counts['CRITICAL']}</div><div class="label">Issues Críticos</div></div>
</div>

<div class="tab-bar">
    <button class="tab-btn active" onclick="showTab('coverage')">Cobertura Matrix</button>
    <button class="tab-btn" onclick="showTab('health')">Salud por Línea</button>
    <button class="tab-btn" onclick="showTab('issues')">Top Issues</button>
    <button class="tab-btn" onclick="showTab('results')">Resultados</button>
    <button class="tab-btn" onclick="showTab('gaps')">Gaps Pendientes</button>
</div>

<!-- TAB 1: COVERAGE HEATMAP -->
<div class="tab-content active" id="tab-coverage">
<div class="section">
    <h2>Matriz de Cobertura SERVICE × SEGMENT</h2>
    <div class="heatmap-legend">
        <span><span class="dot" style="background:rgba(52,211,153,0.4)"></span> Existe (score)</span>
        <span><span class="dot" style="background:rgba(239,68,68,0.4)"></span> Falta (requerido)</span>
        <span><span class="dot" style="background:rgba(249,115,22,0.3)"></span> Falta (restringido)</span>
        <span><span class="dot" style="background:rgba(255,255,255,0.05)"></span> N/A (excluido)</span>
    </div>
    <div class="heatmap-grid">
        <div class="heatmap-header">SERVICIO</div>
        <div class="heatmap-header">PERSONAS</div>
        <div class="heatmap-header">EMPRESAS</div>
        <div class="heatmap-header">ALIADOS</div>
        <div class="heatmap-header">RESELLERS</div>
        <div class="heatmap-header">MARCA BL.</div>"""

    # Build heatmap rows (outside f-string context)
    prev_line = None
    for line_name, sids in SERVICE_LINES.items():
        for sid in sids:
            if sid not in VALIDITY_MATRIX:
                continue
            sname = SERVICE_CATALOG.get(sid, {}).get("name", sid)
            sline = SERVICE_CATALOG.get(sid, {}).get("line", "")
            is_line_sep = (sline != prev_line)
            prev_line = sline
            sep_class = " line-sep" if is_line_sep else ""

            html += f'\n        <div class="heatmap-label{sep_class}" title="{sid.upper()}: {sname}">{sid.upper()} {sname[:16]}</div>'

            for seg in SEGMENTS:
                status = VALIDITY_MATRIX[sid].get(seg, "excluded")
                pair = (sid, seg)
                if pair in existing_pairs:
                    score = file_scores.get(pair, 0)
                    if score >= 95:
                        cell_style = "background:rgba(52,211,153,0.25); color:#34d399;"
                    elif score >= 80:
                        cell_style = "background:rgba(52,211,153,0.15); color:#34d399;"
                    else:
                        cell_style = "background:rgba(249,115,22,0.2); color:#F97316;"
                    html += f'<div class="heatmap-cell{sep_class}" style="{cell_style}" title="{sid}-{seg} Score:{score}">{score}</div>'
                elif status == "required":
                    html += f'<div class="heatmap-cell missing{sep_class}" title="FALTA: {sid}-{seg}.md (requerido)">GAP</div>'
                elif status == "restricted":
                    html += f'<div class="heatmap-cell restricted{sep_class}" title="FALTA: {sid}-{seg}.md (restringido)">OPT</div>'
                else:
                    html += f'<div class="heatmap-cell excluded{sep_class}" title="N/A">\u2014</div>'

    html += """
    </div>
</div>

<div class="section">
    <h2>Cobertura por Segmento</h2>
    <table>
        <tr><th>Segmento</th><th>Existentes</th><th>Requeridos</th><th>Gaps</th><th>Cobertura</th></tr>"""

    if coverage:
        for seg in SEGMENTS:
            sc = coverage["segment_coverage"][seg]
            pct = (sc["existing"] / sc["required"] * 100) if sc["required"] else 0
            bar_color = "#34d399" if pct >= 90 else ("#FFD700" if pct >= 70 else "#ef4444")
            html += f"""
        <tr>
            <td><strong>{seg.upper()}</strong></td>
            <td class="pass">{sc['existing']}</td>
            <td>{sc['required']}</td>
            <td class="fail">{sc['gaps']}</td>
            <td><div class="progress-bar"><div class="progress-fill" style="width:{pct:.0f}%;background:{bar_color}"></div></div> {pct:.0f}%</td>
        </tr>"""

    html += """
    </table>
</div>
</div>

<!-- TAB 2: HEALTH BY LINE -->
<div class="tab-content" id="tab-health">
<div class="section">
    <h2>Salud por Línea de Servicio</h2>
    <table>
        <tr><th>Línea</th><th>Docs Testeados</th><th>Docs Requeridos</th><th>PASS</th><th>FAIL</th><th>Score Avg</th><th>Cobertura</th><th>Health</th></tr>"""

    for line_name in ["workshop", "bootcamp", "programa-elite", "consultoria", "tecnologia", "estrategia"]:
        st = line_stats.get(line_name, {"total": 0, "pass": 0, "fail": 0, "avg_score": 0})
        lc = coverage["line_coverage"].get(line_name, {"required": 0, "existing": 0, "pct": 0}) if coverage else {"required": "?", "existing": "?", "pct": 0}
        pct_test = (st["pass"] / st["total"] * 100) if st["total"] else 0
        cov_pct = lc["pct"] if isinstance(lc["pct"], (int, float)) else 0
        bar_color = "#34d399" if pct_test >= 80 else ("#FFD700" if pct_test >= 50 else "#ef4444")
        cov_color = "#34d399" if cov_pct >= 90 else ("#FFD700" if cov_pct >= 70 else "#ef4444")
        html += f"""
        <tr>
            <td><strong>{line_name.upper()}</strong></td>
            <td>{st['total']}</td>
            <td>{lc['required']}</td>
            <td class="pass">{st['pass']}</td>
            <td class="fail">{st['fail']}</td>
            <td>{st['avg_score']:.0f}/100</td>
            <td style="color:{cov_color};font-weight:700">{cov_pct:.0f}%</td>
            <td><div class="progress-bar"><div class="progress-fill" style="width:{pct_test:.0f}%;background:{bar_color}"></div></div></td>
        </tr>"""

    html += """
    </table>
</div>
</div>

<!-- TAB 3: TOP ISSUES -->
<div class="tab-content" id="tab-issues">
<div class="section">
    <h2>Top Issues por Regla</h2>
    <table>
        <tr><th>Regla</th><th>Count</th><th>Barra</th></tr>"""

    max_count = top_rules[0][1] if top_rules else 1
    for rule, count in top_rules:
        pct = count / max_count * 100
        html += f"""
        <tr>
            <td><code>{rule}</code></td>
            <td>{count}</td>
            <td><div class="progress-bar" style="width:200px"><div class="progress-fill" style="width:{pct:.0f}%;background:#F97316"></div></div></td>
        </tr>"""

    html += """
    </table>
</div>
</div>

<!-- TAB 4: FILE RESULTS -->
<div class="tab-content" id="tab-results">
<div class="section">
    <h2>Resultados por Archivo</h2>
    <div class="filter-bar">
        <button class="filter-btn active" onclick="filterTable('all')">Todos</button>
        <button class="filter-btn" onclick="filterTable('FAIL')">Solo FAIL</button>
        <button class="filter-btn" onclick="filterTable('CONDITIONAL')">Solo CONDITIONAL</button>
        <button class="filter-btn" onclick="filterTable('PASS')">Solo PASS</button>
    </div>
    <table id="results-table">
        <tr><th>#</th><th>Archivo</th><th>Servicio</th><th>Segmento</th><th>Score</th><th>Critical</th><th>Warn</th><th>Verdict</th></tr>"""

    for i, r in enumerate(sorted(all_reports, key=lambda x: x["score"]), 1):
        s = r["summary"]
        badge_class = {"PASS": "badge-pass", "CONDITIONAL": "badge-conditional", "FAIL": "badge-fail"}[s["verdict"]]
        html += f"""
        <tr data-verdict="{s['verdict']}">
            <td>{i}</td>
            <td><code>{r['filename']}</code></td>
            <td>{r['service_id'].upper()}</td>
            <td>{r['segment'].upper()}</td>
            <td><strong>{r['score']}</strong></td>
            <td class="fail">{s['critical']}</td>
            <td class="warn">{s['warnings']}</td>
            <td><span class="badge {badge_class}">{s['verdict']}</span></td>
        </tr>"""

    html += """
    </table>
</div>
</div>

<!-- TAB 5: GAPS PENDIENTES -->
<div class="tab-content" id="tab-gaps">
<div class="section">
    <h2>Documentos Pendientes por Prioridad</h2>"""

    if coverage and coverage["priority_map"]:
        current_prio = None
        for item in coverage["priority_map"]:
            if item["priority"] != current_prio:
                if current_prio is not None:
                    html += "</table>"
                current_prio = item["priority"]
                prio_colors = {"P0-CRITICAL": "#ef4444", "P1-HIGH": "#F97316", "P2-MEDIUM": "#FFD700", "P3-LOW": "#cbd5e1"}
                prio_color = prio_colors.get(current_prio, "#cbd5e1")
                html += f"""
    <h3 style="color:{prio_color};margin:20px 0 8px;border-left:4px solid {prio_color};padding-left:12px">{current_prio}</h3>
    <table>
        <tr><th>Archivo Pendiente</th><th>Servicio</th><th>Línea</th><th>Status</th></tr>"""
            html += f"""
        <tr>
            <td><code>{item['sid']}-{item['seg']}.md</code></td>
            <td>{item['name']}</td>
            <td>{item['line'].upper()}</td>
            <td><span class="badge" style="background:rgba(255,255,255,0.08);color:{prio_color}">{item['status']}</span></td>
        </tr>"""
        html += "</table>"
    else:
        html += "<p style='color:#34d399;text-align:center;padding:40px'>Cobertura 100% — no hay gaps pendientes</p>"

    html += """
</div>
</div>

<div class="timestamp">Generado por Metodolog<span class="ia-gold">IA</span> Testing Engine v2.0 — Coverage Edition</div>

<script>
function filterTable(verdict) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('#results-table tr[data-verdict]').forEach(row => {
        row.style.display = (verdict === 'all' || row.dataset.verdict === verdict) ? '' : 'none';
    });
}
function showTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
}
</script>
</body>
</html>"""

    return html


def analyze_coverage(existing_files):
    """Analyze coverage: existing docs vs VALIDITY_MATRIX requirements.
    Returns coverage_data dict with gaps, stats, priorities."""

    # Build set of existing (service_id, segment) pairs
    existing_pairs = set()
    for fp in existing_files:
        identity = parse_file_identity(fp)
        sid = identity["service_id"]
        seg = identity["segment"]
        if seg not in ["maestro", "unknown"]:
            existing_pairs.add((sid, seg))

    # Analyze each cell in the validity matrix
    total_required = 0
    total_restricted = 0
    total_excluded = 0
    total_existing = 0
    gaps_required = []   # MUST create — highest priority
    gaps_restricted = [] # SHOULD create — medium priority
    extra_docs = []      # Docs that exist but aren't in matrix

    # Per-service and per-segment stats
    service_coverage = {}
    segment_coverage = {seg: {"required": 0, "existing": 0, "gaps": 0} for seg in SEGMENTS}

    for sid, segs in VALIDITY_MATRIX.items():
        service_coverage[sid] = {"required": 0, "existing": 0, "gaps_required": [], "gaps_restricted": []}
        for seg, status in segs.items():
            if status == "required":
                total_required += 1
                service_coverage[sid]["required"] += 1
                segment_coverage[seg]["required"] += 1
                if (sid, seg) in existing_pairs:
                    total_existing += 1
                    service_coverage[sid]["existing"] += 1
                    segment_coverage[seg]["existing"] += 1
                else:
                    service_coverage[sid]["gaps_required"].append(seg)
                    segment_coverage[seg]["gaps"] += 1
                    gaps_required.append((sid, seg))
            elif status == "restricted":
                total_restricted += 1
                segment_coverage[seg]["required"] += 1
                if (sid, seg) in existing_pairs:
                    total_existing += 1
                    service_coverage[sid]["existing"] += 1
                    segment_coverage[seg]["existing"] += 1
                else:
                    service_coverage[sid]["gaps_restricted"].append(seg)
                    gaps_restricted.append((sid, seg))
            else:
                total_excluded += 1

    # Detect extra docs not in matrix
    for sid, seg in existing_pairs:
        if sid not in VALIDITY_MATRIX:
            extra_docs.append((sid, seg, "service_not_in_matrix"))
        elif seg not in VALIDITY_MATRIX[sid]:
            extra_docs.append((sid, seg, "segment_not_mapped"))
        elif VALIDITY_MATRIX[sid][seg] == "excluded":
            extra_docs.append((sid, seg, "excluded_but_exists"))

    # Per-line coverage
    line_coverage = {}
    for line_name, sids in SERVICE_LINES.items():
        line_req = 0
        line_exist = 0
        line_gaps = []
        for sid in sids:
            if sid in VALIDITY_MATRIX:
                for seg, status in VALIDITY_MATRIX[sid].items():
                    if status in ["required", "restricted"]:
                        line_req += 1
                        if (sid, seg) in existing_pairs:
                            line_exist += 1
                        else:
                            line_gaps.append(f"{sid}-{seg}")
        line_coverage[line_name] = {
            "required": line_req,
            "existing": line_exist,
            "pct": (line_exist / line_req * 100) if line_req else 0,
            "gaps": line_gaps,
        }

    # Priority classification for gaps
    priority_map = []
    for sid, seg in gaps_required:
        sname = SERVICE_CATALOG.get(sid, {}).get("name", sid)
        line = SERVICE_CATALOG.get(sid, {}).get("line", "unknown")
        # Priority: workshops/bootcamps B2C/B2B > channel > elite/consultoria channel
        if seg in ["personas", "empresas"]:
            prio = "P0-CRITICAL"
        elif line in ["workshop", "bootcamp"]:
            prio = "P1-HIGH"
        else:
            prio = "P2-MEDIUM"
        priority_map.append({"sid": sid, "seg": seg, "name": sname, "line": line, "priority": prio, "status": "required"})

    for sid, seg in gaps_restricted:
        sname = SERVICE_CATALOG.get(sid, {}).get("name", sid)
        line = SERVICE_CATALOG.get(sid, {}).get("line", "unknown")
        priority_map.append({"sid": sid, "seg": seg, "name": sname, "line": line, "priority": "P3-LOW", "status": "restricted"})

    priority_map.sort(key=lambda x: x["priority"])

    total_needed = total_required + total_restricted
    coverage_pct = (total_existing / total_needed * 100) if total_needed else 0

    return {
        "total_required": total_required,
        "total_restricted": total_restricted,
        "total_excluded": total_excluded,
        "total_needed": total_needed,
        "total_existing": total_existing,
        "total_gaps": len(gaps_required) + len(gaps_restricted),
        "coverage_pct": coverage_pct,
        "gaps_required": gaps_required,
        "gaps_restricted": gaps_restricted,
        "extra_docs": extra_docs,
        "service_coverage": service_coverage,
        "segment_coverage": segment_coverage,
        "line_coverage": line_coverage,
        "priority_map": priority_map,
    }


def generate_gap_report(coverage_data):
    """Generate text report of coverage gaps."""
    cd = coverage_data
    lines = []
    lines.append(f"{'═' * 70}")
    lines.append(f"  COVERAGE GAP REPORT — MetodologIA Documentos Canónicos")
    lines.append(f"  Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"{'═' * 70}")
    lines.append(f"")
    lines.append(f"  📊 COBERTURA GLOBAL: {cd['total_existing']}/{cd['total_needed']} = {cd['coverage_pct']:.1f}%")
    lines.append(f"     • Required (✅): {cd['total_required']} celdas")
    lines.append(f"     • Restricted (⚠️): {cd['total_restricted']} celdas")
    lines.append(f"     • Excluded (❌): {cd['total_excluded']} celdas")
    lines.append(f"     • Existentes: {cd['total_existing']} docs")
    lines.append(f"     • Gaps: {cd['total_gaps']} docs pendientes")
    lines.append(f"")
    lines.append(f"{'─' * 70}")
    lines.append(f"  📈 COBERTURA POR LÍNEA DE SERVICIO")
    lines.append(f"{'─' * 70}")
    for ln, lc in cd["line_coverage"].items():
        bar = "█" * int(lc["pct"] / 5) + "░" * (20 - int(lc["pct"] / 5))
        lines.append(f"  {ln.upper():20s} {bar} {lc['existing']:3d}/{lc['required']:3d} ({lc['pct']:.0f}%)")
        if lc["gaps"]:
            lines.append(f"    Gaps: {', '.join(lc['gaps'][:10])}{'...' if len(lc['gaps']) > 10 else ''}")

    lines.append(f"")
    lines.append(f"{'─' * 70}")
    lines.append(f"  📈 COBERTURA POR SEGMENTO")
    lines.append(f"{'─' * 70}")
    for seg in SEGMENTS:
        sc = cd["segment_coverage"][seg]
        pct = (sc["existing"] / sc["required"] * 100) if sc["required"] else 0
        bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
        lines.append(f"  {seg.upper():15s} {bar} {sc['existing']:3d}/{sc['required']:3d} ({pct:.0f}%)")

    lines.append(f"")
    lines.append(f"{'─' * 70}")
    lines.append(f"  🎯 DOCS PENDIENTES POR PRIORIDAD ({cd['total_gaps']} total)")
    lines.append(f"{'─' * 70}")
    current_prio = None
    for item in cd["priority_map"]:
        if item["priority"] != current_prio:
            current_prio = item["priority"]
            lines.append(f"\n  [{current_prio}]")
        lines.append(f"    • {item['sid']}-{item['seg']}.md — {item['name']} ({item['line']}) [{item['status']}]")

    if cd["extra_docs"]:
        lines.append(f"\n{'─' * 70}")
        lines.append(f"  ⚠️ DOCS EXTRA (existen pero no están en la matriz)")
        lines.append(f"{'─' * 70}")
        for sid, seg, reason in cd["extra_docs"]:
            lines.append(f"    • {sid}-{seg}.md — {reason}")

    lines.append(f"\n{'═' * 70}")
    return "\n".join(lines)


def main():
    """Main testing cycle — one file at a time."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    files = discover_files()
    print(f"\n{'═' * 70}")
    print(f"  MetodologIA — Ciclo de Testing de Documentos Canónicos")
    print(f"  {len(files)} archivos descubiertos")
    print(f"{'═' * 70}\n")

    all_reports = []
    pass_count = 0
    fail_count = 0
    conditional_count = 0

    for idx, filepath in enumerate(files, 1):
        fname = Path(filepath).name
        print(f"  [{idx:3d}/{len(files)}] Testing: {fname} ...", end=" ")

        report = run_tests_on_file(filepath)
        all_reports.append(report)

        verdict = report["summary"]["verdict"]
        if verdict == "PASS":
            print(f"✅ PASS (score: {report['score']})")
            pass_count += 1
        elif verdict == "CONDITIONAL":
            print(f"⚠️  CONDITIONAL (score: {report['score']}, {report['summary']['warnings']}w)")
            conditional_count += 1
        else:
            print(f"❌ FAIL (score: {report['score']}, {report['summary']['critical']}c {report['summary']['warnings']}w)")
            fail_count += 1

    # ── Coverage Analysis ──
    coverage = analyze_coverage(files)

    # Save individual reports (text)
    report_text = []
    for r in all_reports:
        report_text.append(format_file_report(r))

    report_path = os.path.join(OUTPUT_DIR, "test-report-detallado.txt")
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(f"MetodologIA — Test Report Detallado\n")
        f.write(f"Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"Archivos: {len(all_reports)}\n\n")
        f.write("\n".join(report_text))

    # Save JSON (includes coverage)
    json_path = os.path.join(OUTPUT_DIR, "test-results.json")
    json_output = {
        "metadata": {
            "timestamp": datetime.now().isoformat(),
            "total_files_tested": len(all_reports),
            "coverage": {
                "total_needed": coverage["total_needed"],
                "total_existing": coverage["total_existing"],
                "total_gaps": coverage["total_gaps"],
                "coverage_pct": round(coverage["coverage_pct"], 1),
            }
        },
        "reports": all_reports,
        "gaps": [{"service": s, "segment": g, "priority": next((p["priority"] for p in coverage["priority_map"] if p["sid"] == s and p["seg"] == g), "?")} for s, g in coverage["gaps_required"] + coverage["gaps_restricted"]],
    }
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_output, f, indent=2, ensure_ascii=False)

    # Save coverage gap report
    gap_report_path = os.path.join(OUTPUT_DIR, "coverage-gap-report.txt")
    with open(gap_report_path, 'w', encoding='utf-8') as f:
        f.write(generate_gap_report(coverage))

    # Save dashboard HTML
    dashboard_path = os.path.join(OUTPUT_DIR, "test-dashboard.html")
    with open(dashboard_path, 'w', encoding='utf-8') as f:
        f.write(generate_dashboard(all_reports, coverage))

    # Final summary
    avg_score = sum(r['score'] for r in all_reports)/len(all_reports) if all_reports else 0
    print(f"\n{'═' * 70}")
    print(f"  RESUMEN FINAL")
    print(f"{'─' * 70}")
    print(f"  ✅ PASS:        {pass_count:3d} / {len(all_reports)}")
    print(f"  ⚠️  CONDITIONAL: {conditional_count:3d} / {len(all_reports)}")
    print(f"  ❌ FAIL:        {fail_count:3d} / {len(all_reports)}")
    print(f"  Score promedio:  {avg_score:.1f}/100")
    print(f"{'─' * 70}")
    print(f"  📊 COBERTURA MATRIX: {coverage['total_existing']}/{coverage['total_needed']} = {coverage['coverage_pct']:.1f}%")
    print(f"  🔴 Gaps obligatorios: {len(coverage['gaps_required'])}")
    print(f"  🟡 Gaps restringidos: {len(coverage['gaps_restricted'])}")
    print(f"{'─' * 70}")
    print(f"  Outputs:")
    print(f"    → {report_path}")
    print(f"    → {json_path}")
    print(f"    → {gap_report_path}")
    print(f"    → {dashboard_path}")
    print(f"{'═' * 70}\n")

    return all_reports


if __name__ == "__main__":
    main()
