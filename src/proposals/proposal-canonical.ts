export interface ProposalCanonicalNavLink {
  href: string;
  label: string;
}

export interface ProposalCanonicalSection {
  id: string;
  heading: string;
}

export const PROPOSAL_CANONICAL_BRAND_TOKENS = [
  "glass-nav",
  "gold-divider",
  "btn-gold",
  "ambient-circle",
  "proposal-template-payload",
  "MetodologIA",
] as const;

export const PROPOSAL_CANONICAL_NAV_LINKS: ProposalCanonicalNavLink[] = [
  { href: "#hook", label: "Resumen" },
  { href: "#journey", label: "Ruta" },
  { href: "#programa", label: "Entregables" },
  { href: "#credenciales", label: "Respaldo" },
  { href: "#final-cta", label: "Cierre" },
] as const;

export const PROPOSAL_CANONICAL_SECTIONS: ProposalCanonicalSection[] = [
  { id: "hero", heading: "Propuesta comercial" },
  { id: "hook", heading: "Resumen del problema" },
  { id: "vision", heading: "Resultado esperado" },
  { id: "journey", heading: "Journey" },
  { id: "programa", heading: "Programa" },
  { id: "modalidades", heading: "Modalidades" },
  { id: "objeciones", heading: "Riesgos" },
  { id: "credenciales", heading: "Credenciales" },
  { id: "equipo", heading: "Equipo" },
  { id: "metodologías", heading: "Capacidades" },
  { id: "roi", heading: "Valor" },
  { id: "configurador", heading: "Configurador" },
  { id: "servicios", heading: "Servicios complementarios" },
  { id: "condiciones", heading: "Condiciones" },
  { id: "stack", heading: "Stack" },
  { id: "workshop-section", heading: "Ruta ampliada" },
  { id: "final-cta", heading: "Cierre" },
] as const;

export const PROPOSAL_CANONICAL_FORBIDDEN_PATTERNS = [
  /\bhttps?:\/\/\S+/i,
  /\bwww\.\S+/i,
  /Proceso\s+detectado/i,
  /Entregable\s+solicitado/i,
  /Resumen\s+del\s+proceso/i,
  /Pasos?\s+recomendados/i,
  /Gates?\s+a\s+respetar/i,
  /Evidencia\s+requerida/i,
  /Riesgos?\s+clave/i,
  /Contrato\s+de\s+salida\s+obligatorio/i,
  /Plantilla\s+controlada/i,
  /Documento\s+listo\s+para\s+compartir/i,
  /Notas,\s*bloques?\s+y\s+decisiones(?:\s+de\s+esta\s+versi[oó]n)?/i,
  /Bloques?\s+devueltos?\s+por\s+el\s+bot/i,
  /SCAFFOLD\s+INICIAL/i,
  /^\s*Limite\s*:/im,
  /^ETAPA\s+\d+/im,
  /quiero\s+que\s+me\s+ayudes?\s+a\s+const?ruir/i,
  /(?:bootcamp|consultoria|programa-elite)\/assets/i,
  /\breferences\/\S*/i,
  /\btemplate-package\/\S*/i,
  /\b[\w./-]+\.(?:md|html|json|ya?ml)\b/i,
  /CAO\s+Bootcamp/i,
  /Chief\s+Agentic\s+Officer/i,
  /Convocatoria\s+Creyentes/i,
  /Edici[oó]n\s+Creyentes/i,
  /Quito\s+2026/i,
  /Workshop\s+Zero\s+Risk/i,
  /De\s+Ocupado\s+a\s+Productivo/i,
] as const;
