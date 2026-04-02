import { extractClientNameFromRequest, extractRequestedServiceName, formatProposalDisplayName, isGenericCommercialProcessName, } from "./proposal-artifact.js";
const LOCATION_HINTS = [
    "ecuador",
    "colombia",
    "mexico",
    "mexico",
    "peru",
    "chile",
    "argentina",
    "espana",
    "spain",
    "usa",
    "estados unidos",
    "quito",
    "guayaquil",
    "bogota",
    "medellin",
    "cali",
    "lima",
    "madrid",
    "barcelona",
    "miami",
];
const SCOPE_HINTS = [
    "workshop zero risk",
    "workshop",
    "bootcamp",
    "programa de empoderamiento",
    "programa",
    "consultoria estrategica",
    "consultoria",
    "implementacion",
    "implementacion agentica",
    "acompanamiento",
    "capacitacion",
    "assessment",
    "diagnostico",
    "presencial",
    "virtual",
    "hibrido",
    "hibrida",
    "cohorte",
    "equipo",
];
const INVESTMENT_HINTS = [
    "usd",
    "cop",
    "eur",
    "mxn",
    "iva",
    "presupuesto",
    "rango",
    "inversion",
    "inversion",
    "cotizacion",
    "cotizacion",
];
const OBJECTIVE_FOCUS_PATTERNS = [
    /ofim[aá]tica con ia/i,
    /google workspace/i,
    /gemini/i,
    /propuestas?\s+comerciales?/i,
    /presentaciones?/i,
    /workshop/i,
    /bootcamp/i,
    /cl[ií]nica/i,
    /masterclass/i,
    /\b\d+\s*horas?\b/i,
    /\b\d+\s*(?:a|-)\s*\d+\s*personas?\b/i,
    /\bsemana\b/i,
    /\bcronograma\b/i,
];
const OBJECTIVE_NOISE_PATTERNS = [
    /\bhttps?:\/\/\S+/gi,
    /\bwww\.\S+/gi,
    /\bhttps?\b/gi,
    /\b(?:com|co|org|net|io|info|site)\b(?=\s|$)/gi,
    /\bquiero\s+que\s+me\s+ayudes?\s+a\s+const?ruir\b/gi,
    /\bQuiero que hagas una propuesta comercial\b/gi,
    /\bNecesito una propuesta comercial\b/gi,
    /\bpropuesta comercial para el cliente\b/gi,
    /\bpropuesta comercial\b/gi,
    /\bverifica(?:r)?\s+la\s+plantilla(?:\s+de)?\b/gi,
    /\bplantilla(?:\s+de)?(?:\s+propuesta)?(?:\s+html)?\b/gi,
    /\btodo\s+lo\s+que\s+debas\s+llenar\s+en\s+ella\b/gi,
    /\bpreg[úu]ntamelo\s+antes\s+de\s+generarla\b/gi,
    /\bpretendo\s+generar\b/gi,
    /\bque\s+mas\s+datos\s+necesitas\b/gi,
    /\bhola\s+estas\s+ahi\b/gi,
    /\b(?:publ[ií]cala|publicala)\s+en\s+github\b[^.\n]*/gi,
    /\b(?:publ[ií]cala|publicala)\s+en\s+el\s+repositorio\s+de\s+github\b[^.\n]*/gi,
    /\brepositorio\s+de\s+github(?:\s+de\s+propuestas?\s+comerciales?)?\b[^.\n]*/gi,
    /\benv[ií]ame\s+el\s+link\s+de\s+descarga\s+de\s+github\b[^.\n]*/gi,
    /\barchivo\s+html\s+de\s+la\s+propuesta\b/gi,
    /\bhtml entregable\b/gi,
    /\bbloques?\s+devueltos?\s+por\s+el\s+bot\b/gi,
    /\bnotas?,\s*bloques?\s+y\s+decisiones(?:\s+de\s+esta\s+versi[oó]n)?\b/gi,
    /\b(?:bootcamp|consultoria|programa-elite)\/assets\b/gi,
    /\breferences\/\S*/gi,
    /\btemplate-package\/\S*/gi,
    /\b[\w./-]+\.(?:md|html|json|ya?ml)\b/gi,
    /\bRevisa toda tu\b/gi,
    /\bRecorre todos los SOP(?:s)?\b/gi,
    /\bdocumentes muy bien\b/gi,
];
function compactWhitespace(value) {
    return value
        .replace(/\r/g, "")
        .replace(/\u202f/g, " ")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}
function stripMarkdown(value) {
    return compactWhitespace(value
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/__(.*?)__/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
        .replace(/^\s*[-*]\s+/gm, "")
        .replace(/\|/g, " | "));
}
function normalizeForMatching(value) {
    return stripMarkdown(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s/-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
function stripObjectiveNoise(value) {
    let cleaned = stripMarkdown(value);
    for (const pattern of OBJECTIVE_NOISE_PATTERNS) {
        cleaned = cleaned.replace(pattern, " ");
    }
    cleaned = cleaned
        .replace(/^(?:quiero|necesito|haz|hace|quisiera|por favor)\s+(?:que\s+)?(?:hagas|haga|generes|genere|armes|arme|redactes|redacte|construyas|construya)\s+(?:una\s+)?propuesta(?:\s+comercial)?(?:\s+para(?:\s+el)?(?:\s+cliente)?)?/i, " ")
        .replace(/^(?:quiero\s+que\s+me\s+ayudes?\s+a\s+const?ruir)\b/i, " ")
        .replace(/^(?:en\s+el\s+)?(?:cual|que)\s+se\s+/i, " ")
        .replace(/\bpara\s+que\s+(?:documentes|describas|detalles?|revises?|armes?|construyas?)\b/gi, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
    return cleaned;
}
function normalizeCandidate(value) {
    const normalized = stripObjectiveNoise(value)
        .replace(/\s+/g, " ")
        .replace(/^[^,]{1,120},\s*(?:en\s+el\s+)?(?:cual|que)\s+se\s+/i, "")
        .replace(/^(?:se\s+)?(?:ejecutar[áa]|impartir[áa]|desarrollar[áa]|realizar[áa]|aplicar[áa])\s+/i, "")
        .replace(/\b(?:cliente|servicio|objetivo|cronograma|moneda|pais|país|modalidad|siguiente paso)\b.*$/i, "")
        .trim();
    return normalized
        .replace(/[|:;,.\-]+$/g, "")
        .trim();
}
function takeExcerpt(value, maxLength = 140) {
    const compact = normalizeCandidate(stripObjectiveNoise(value ?? ""));
    if (!compact)
        return null;
    if (compact.length <= maxLength)
        return compact;
    const shortened = compact.slice(0, maxLength);
    const breakpoint = shortened.lastIndexOf(" ");
    return `${(breakpoint > 60 ? shortened.slice(0, breakpoint) : shortened).trim()}...`;
}
function dedupe(values) {
    return [...new Set(values)];
}
function collectHintMatches(text, hints) {
    const normalizedText = normalizeForMatching(text);
    return dedupe(hints
        .filter((hint) => normalizedText.includes(normalizeForMatching(hint)))
        .map((hint) => normalizeCandidate(hint)));
}
function extractObjective(text, context) {
    if (context.executionPack?.objective) {
        return takeExcerpt(context.executionPack.objective, 160);
    }
    const explicitPatterns = [
        /\b(?:objetivo|objetivos|problema|problemas|reto|retos|necesidad|necesidades)\s*[:\-]\s*([^\n.]{10,180})/i,
        /\bpara\s+(resolver|mejorar|acelerar|reducir|fortalecer|transformar|automatizar|desarrollar|implementar|lanzar)\b([^.\n]{8,160})/i,
        /\b(?:busca|buscar|necesita|requiere)\s+(?:resolver|mejorar|acelerar|reducir|fortalecer|transformar|automatizar|desarrollar|implementar|lanzar)\b([^.\n]{8,160})/i,
    ];
    for (const pattern of explicitPatterns) {
        const match = text.match(pattern);
        if (!match)
            continue;
        const candidate = match.length >= 3 && match[2]
            ? `${match[1]}${match[2]}`
            : (match[1] ?? "");
        const normalized = takeExcerpt(candidate, 160);
        if (normalized && normalized.length >= 12) {
            return normalized;
        }
    }
    const labeledServiceMatch = text.match(/\bservicio\s*[:\-]\s*([^\n.]{4,180})/i);
    const labeledServiceObjective = takeExcerpt(stripObjectiveNoise(labeledServiceMatch?.[1] ?? ""), 160);
    if (labeledServiceObjective
        && OBJECTIVE_FOCUS_PATTERNS.some((pattern) => pattern.test(labeledServiceObjective))) {
        return labeledServiceObjective;
    }
    const cleanedClauses = stripObjectiveNoise(text)
        .split(/[.!?\n]+/)
        .map((clause) => clause.trim())
        .filter((clause) => clause.length >= 8);
    const focusedClause = cleanedClauses.find((clause) => OBJECTIVE_FOCUS_PATTERNS.some((pattern) => pattern.test(clause)));
    const fallbackClause = focusedClause ?? cleanedClauses[0] ?? null;
    if (fallbackClause) {
        const normalized = normalizeCandidate(fallbackClause);
        if (normalized.length >= 12) {
            return normalized.length <= 160
                ? normalized
                : `${normalized.slice(0, 157).trim()}...`;
        }
        const cleanedFallback = stripObjectiveNoise(fallbackClause);
        if (cleanedFallback.length >= 12) {
            return cleanedFallback.length <= 160
                ? cleanedFallback
                : `${cleanedFallback.slice(0, 157).trim()}...`;
        }
    }
    if (context.executionPack?.summary) {
        return takeExcerpt(context.executionPack.summary, 160);
    }
    return null;
}
function extractGeography(text) {
    const parenthetical = text.match(/\(([^)]+)\)/);
    if (parenthetical) {
        const candidate = takeExcerpt(parenthetical[1], 80);
        if (candidate && candidate.length <= 40) {
            return candidate;
        }
    }
    const locationMatches = collectHintMatches(text, LOCATION_HINTS);
    if (locationMatches.length > 0) {
        return locationMatches.join(" | ");
    }
    return null;
}
function extractScope(text) {
    const scopeMatches = collectHintMatches(text, SCOPE_HINTS);
    if (scopeMatches.length > 0) {
        return scopeMatches.join(" | ");
    }
    const participantPattern = /\b(?:para|con)\s+(\d{1,3}\s*(?:personas?|participantes?|lideres?|líderes?|equipos?))/i;
    const participantMatch = text.match(participantPattern);
    if (participantMatch?.[1]) {
        return takeExcerpt(participantMatch[1], 80);
    }
    return null;
}
function extractTimeline(text) {
    const matches = dedupe([
        ...(text.match(/\b\d+\s*(?:semanas?|meses?|dias?|dias|horas?)\b/gi) ?? []),
        ...(text.match(/\bQ[1-4]\s*20\d{2}\b/gi) ?? []),
        ...(text.match(/\b(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)\s+20\d{2}\b/gi) ?? []),
    ].map((value) => normalizeCandidate(value)));
    const startPattern = text.match(/\b(?:inicio|inicia|arranque|fecha objetivo)\s*[:\-]?\s*([^\n.]{6,80})/i);
    const startValue = takeExcerpt(startPattern?.[1], 100);
    const timelineEntries = dedupe([
        ...(startValue ? [startValue] : []),
        ...matches,
    ]);
    if (timelineEntries.length > 0) {
        return timelineEntries.join(" | ");
    }
    return null;
}
function extractInvestment(text) {
    const amountMatch = text.match(/(?:USD|COP|EUR|MXN|\$)\s?[\d.,]+(?:\s*(?:USD|COP|EUR|MXN))?/i);
    if (amountMatch?.[0]) {
        const amount = normalizeCandidate(amountMatch[0]);
        if (/iva/i.test(text)) {
            return `${amount} con IVA`;
        }
        return amount;
    }
    const hintMatches = collectHintMatches(text, INVESTMENT_HINTS);
    if (hintMatches.length > 0) {
        return hintMatches.join(" | ");
    }
    return null;
}
function extractNextStep(text) {
    const explicitPattern = /\b(?:siguiente paso|next step|cierre esperado)\s*[:\-]\s*([^\n.]{8,180})/i;
    const explicitMatch = text.match(explicitPattern);
    if (explicitMatch?.[1]) {
        return takeExcerpt(explicitMatch[1], 140);
    }
    const stepPattern = /\b(?:reunion|reunion|llamada|presentacion|presentacion|version final|contrato|firma|aprobacion|aprobacion)\b[^.\n]{0,90}/i;
    const stepMatch = text.match(stepPattern);
    return takeExcerpt(stepMatch?.[0], 140);
}
function buildSnapshot(text, context = {}) {
    const inferredServiceName = context.serviceName?.trim()
        || extractRequestedServiceName(text)
        || context.executionPack?.deliverable
        || null;
    return {
        clientName: extractClientNameFromRequest(text),
        serviceName: inferredServiceName && !isGenericCommercialProcessName(inferredServiceName)
            ? formatProposalDisplayName(inferredServiceName)
            : null,
        objective: extractObjective(text, context),
        geography: extractGeography(text),
        scope: extractScope(text),
        timeline: extractTimeline(text),
        investment: extractInvestment(text),
        nextStep: extractNextStep(text),
    };
}
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
export function assessProposalIntake(text, context = {}) {
    const snapshot = buildSnapshot(text, context);
    const fields = [
        {
            id: "client_name",
            label: "Cliente",
            prompt: "Nombre exacto del cliente o empresa.",
            required: true,
            value: snapshot.clientName,
        },
        {
            id: "service_name",
            label: "Servicio",
            prompt: "Servicio, programa u oferta que quieres proponer.",
            required: true,
            value: snapshot.serviceName,
        },
        {
            id: "objective",
            label: "Objetivo o problema",
            prompt: "Problema, meta o resultado que la propuesta debe resolver.",
            required: true,
            value: snapshot.objective,
        },
        {
            id: "geography",
            label: "Pais o mercado",
            prompt: "Pais, ciudad o mercado al que aplica la propuesta.",
            required: false,
            value: snapshot.geography,
        },
        {
            id: "scope",
            label: "Modalidad y alcance",
            prompt: "Modalidad y alcance: workshop, programa, bootcamp, presencial/virtual, numero de personas, etc.",
            required: false,
            value: snapshot.scope,
        },
        {
            id: "timeline",
            label: "Cronograma",
            prompt: "Fecha objetivo, duracion o ventana de ejecucion.",
            required: false,
            value: snapshot.timeline,
        },
        {
            id: "investment",
            label: "Moneda e inversion",
            prompt: "Moneda y si deseas incluir inversion, rango o dejarla pendiente.",
            required: false,
            value: snapshot.investment,
        },
        {
            id: "next_step",
            label: "Siguiente paso",
            prompt: "Siguiente paso esperado: reunion, version final, contrato, presentacion, etc.",
            required: false,
            value: snapshot.nextStep,
        },
    ];
    const missingRequiredFields = fields.filter((field) => field.required && !field.value);
    const missingRecommendedFields = fields.filter((field) => !field.required && !field.value);
    const recommendedFieldsPresent = fields.filter((field) => !field.required && field.value).length;
    const weightedTotal = fields.reduce((sum, field) => sum + (field.required ? 2 : 1), 0);
    const weightedPresent = fields.reduce((sum, field) => sum + (field.value ? (field.required ? 2 : 1) : 0), 0);
    return {
        isReady: missingRequiredFields.length === 0 && recommendedFieldsPresent >= 2,
        completenessScore: Math.round((weightedPresent / weightedTotal) * 100),
        snapshot,
        fields,
        missingRequiredFields,
        missingRecommendedFields,
    };
}
export function buildProposalClarificationReply(assessment) {
    const knownFields = assessment.fields.filter((field) => field.value);
    const missingFields = [
        ...assessment.missingRequiredFields,
        ...assessment.missingRecommendedFields,
    ];
    const lines = [
        "Antes de generar la propuesta completa necesito cerrar algunos datos para no dejar campos vacios en la plantilla.",
        `Completitud detectada: <b>${assessment.completenessScore}%</b>.`,
    ];
    if (knownFields.length > 0) {
        lines.push("", "<b>Ya tengo identificado:</b>");
        for (const field of knownFields) {
            lines.push(`- <b>${escapeHtml(field.label)}:</b> ${escapeHtml(field.value ?? "")}`);
        }
    }
    lines.push("", "<b>Confirma por favor:</b>");
    for (const field of missingFields) {
        const suffix = field.required ? "Obligatorio." : "Recomendado.";
        lines.push(`- <b>${escapeHtml(field.label)}:</b> ${escapeHtml(field.prompt)} ${suffix}`);
    }
    lines.push("", "Puedes responder en un solo mensaje usando este formato:");
    for (const field of missingFields) {
        lines.push(`${escapeHtml(field.label)}: ...`);
    }
    lines.push("", "Si aun no quieres fijar inversion, responde \"pendiente\" y genero la propuesta sin ese numero final.");
    return lines.join("\n");
}
