import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load as loadHtml, type CheerioAPI } from "cheerio";
import type { ProposalStageSection } from "./proposal-artifact.js";
import type { ProposalProcessCatalogItem } from "./operational-catalog.js";

export interface ProposalTemplateMetric {
  value: string;
  label: string;
}

export interface ProposalTemplateReference {
  title: string;
  summary: string;
  meta: string;
}

export interface ProposalTemplateModel {
  clientName: string;
  serviceName: string;
  processName: string;
  requestDate: string;
  summary: string;
  challenge: string;
  approach: string;
  nextStep: string;
  metrics: ProposalTemplateMetric[];
  steps: string[];
  deliverables: string[];
  assets: string[];
  sops: string[];
  gates: string[];
  risks: string[];
  references: ProposalTemplateReference[];
  sections: ProposalStageSection[];
  internalProcessCatalog: ProposalProcessCatalogItem[];
  metodologiaServices: ProposalTemplateReference[];
  metodologiaResources: ProposalTemplateReference[];
  metodologiaFounders: ProposalTemplateReference[];
  intake?: {
    clientName?: string | null;
    serviceName?: string | null;
    objective?: string | null;
    geography?: string | null;
    scope?: string | null;
    timeline?: string | null;
    investment?: string | null;
    nextStep?: string | null;
  };
}

interface CommercialProposalPayload {
  defaults: {
    lang: "es" | "en";
    theme: "dark" | "light";
    view: "resumen" | "detallado" | "inmersivo";
  };
  meta: {
    title: string;
    description: string;
  };
  runtimeConfig: {
    contactEmail: string;
    reserveSubject: string;
    workshopSubject: string;
    links: {
      footerContact: string;
      reserveMailto: string;
      reserveCalendar: string;
      reserveNotebook: string;
      workshopCalendar: string;
      workshopMailto: string;
    };
    pricing: {
      bootcamp: { current: string; regular: string; currency: string };
      assistantUnit: string;
      empowerment: { current: string; regular: string; currency: string };
      workshopBonus: string;
      roiPrice: string;
      automationFactor: string;
    };
  };
  i18n: Record<string, Record<string, string>>;
  i18nHtml: Record<string, Record<string, string>>;
  infoData: Record<string, unknown>;
  modulesData: unknown[];
  assistantNames: unknown[];
  textBySelector: Record<string, string>;
  htmlBySelector: Record<string, string>;
  attributesBySelector: Record<string, Record<string, string | number | boolean>>;
}

const DEFAULT_CONTACT_EMAIL = "contacto@metodologia.info";
const DEFAULT_CURRENCY = "USD";
const TEMPLATE_FILE_NAME = "commercial-proposal-template.html";
const moduleDir = dirname(fileURLToPath(import.meta.url));
const templateHtmlCache = new Map<string, string>();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function compactWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function dedupeStrings(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.map((value) => compactWhitespace(value || "")).filter(Boolean))];
}

function renderInlineList(items: string[], emptyLabel: string): string {
  const values = items.length > 0 ? items : [emptyLabel];
  return values
    .map((item) => `<span class="px-3 py-1 rounded-full text-xs font-semibold" style="background:rgba(255,215,0,0.08);color:var(--text-secondary);border:1px solid rgba(255,215,0,0.12);">${escapeHtml(item)}</span>`)
    .join("");
}

function renderMetricCards(metrics: ProposalTemplateMetric[]): string {
  return metrics
    .slice(0, 4)
    .map((metric) => `
      <div class="kpi-card glass">
        <div class="kpi-value gold-text">${escapeHtml(metric.value)}</div>
        <div class="kpi-label">${escapeHtml(metric.label)}</div>
      </div>
    `.trim())
    .join("");
}

function renderListRows(items: string[], emptyLabel: string): string {
  const values = items.length > 0 ? items : [emptyLabel];
  return values
    .map((item) => `
      <li class="flex items-start gap-3 text-sm" style="color:var(--text-secondary);">
        <i data-lucide="check-circle-2" class="w-4 h-4 mt-0.5 flex-shrink-0" style="color:var(--gold);"></i>
        <span>${escapeHtml(item)}</span>
      </li>
    `.trim())
    .join("");
}

function renderReferenceCards(
  items: ProposalTemplateReference[],
  emptyTitle: string,
  emptySummary: string,
): string {
  const values = items.length > 0
    ? items
    : [{ title: emptyTitle, summary: emptySummary, meta: "Sin evidencia adicional" }];

  return values
    .map((item) => `
      <article class="glass p-6 rounded-2xl reveal">
        <p class="text-xs uppercase tracking-widest font-bold mb-3" style="color:var(--gold);">${escapeHtml(item.meta || "Referencia")}</p>
        <h3 class="font-heading text-lg font-bold mb-3" style="color:var(--text-primary);">${escapeHtml(item.title)}</h3>
        <p class="text-sm leading-relaxed" style="color:var(--text-secondary);">${escapeHtml(item.summary)}</p>
      </article>
    `.trim())
    .join("");
}

function renderProcessCards(items: ProposalProcessCatalogItem[]): string {
  const values = items.length > 0
    ? items
    : [{
      processId: "sin-proceso",
      processName: "Ruta operativa por confirmar",
      summary: "No se detectó un proceso interno suficientemente específico. La propuesta se apoya en el intake, el draft y la evidencia disponible.",
      status: "needs_attention" as const,
      matchReason: "Sin coincidencia suficiente",
      isPrimary: true,
      phases: [],
      gates: [],
      assets: [],
      sops: [],
      relatedProcesses: [],
    }];

  return values
    .slice(0, 4)
    .map((item) => `
      <article class="glass p-6 rounded-2xl reveal">
        <div class="mb-4">
          <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">${escapeHtml(item.isPrimary ? "Respaldo principal" : "Respaldo complementario")}</p>
          <h3 class="font-heading text-lg font-bold" style="color:var(--text-primary);">${escapeHtml(item.processName)}</h3>
        </div>
        <p class="text-sm leading-relaxed mb-4" style="color:var(--text-secondary);">${escapeHtml(item.summary)}</p>
        <p class="text-xs mb-4" style="color:var(--text-muted);">${escapeHtml(item.isPrimary
          ? "Es la capacidad de soporte más cercana al alcance planteado para esta propuesta."
          : "Puede complementar la activación si el alcance final requiere una ruta adicional.")}</p>
        <div class="grid sm:grid-cols-2 gap-4 text-xs">
          <div class="glass p-4 rounded-xl">
            <p class="font-bold mb-2" style="color:var(--text-primary);">Bloques</p>
            <div class="flex flex-wrap gap-2">${renderInlineList(item.phases, "Por confirmar")}</div>
          </div>
          <div class="glass p-4 rounded-xl">
            <p class="font-bold mb-2" style="color:var(--text-primary);">Puntos de validación</p>
            <div class="flex flex-wrap gap-2">${renderInlineList(item.gates, "Por confirmar")}</div>
          </div>
        </div>
      </article>
    `.trim())
    .join("");
}

function renderStageCards(sections: ProposalStageSection[]): string {
  const tags = ["Aterrizar", "Alinear", "Diseñar", "Activar", "Cerrar"];
  return sections
    .slice(0, 4)
    .map((section, index) => `
      <article class="glass p-6 rounded-2xl reveal">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style="background:rgba(255,215,0,0.1);color:var(--gold);">${index + 1}</span>
          <p class="text-xs uppercase tracking-widest font-bold" style="color:var(--gold);">${escapeHtml(tags[index] || `Bloque ${index + 1}`)}</p>
        </div>
        <h3 class="font-heading text-lg font-bold mb-3" style="color:var(--text-primary);">${escapeHtml(section.title)}</h3>
        <p class="text-sm leading-relaxed" style="color:var(--text-secondary);">${escapeHtml(section.body)}</p>
      </article>
    `.trim())
    .join("");
}

function renderIntroLetter(model: ProposalTemplateModel): string {
  const objective = model.intake?.objective || "Alinear el problema, la ruta y el siguiente paso comercial.";
  return `
    <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Propuesta ejecutiva</p>
    <p class="font-heading text-lg font-bold mb-6" style="color:var(--text-primary);">${escapeHtml(model.clientName)} · ${escapeHtml(model.requestDate)}</p>
    <div class="text-sm leading-relaxed space-y-4" style="color:var(--text-secondary);">
      <p style="color:var(--text-primary);font-weight:600;">Esta propuesta reorganiza el pedido alrededor de una ruta accionable para ${escapeHtml(model.clientName)}. No se limita a describir un servicio: deja claro qué se quiere resolver, con qué entregables y qué siguiente conversación conviene activar.</p>
      <p><strong style="color:var(--text-primary);">Objetivo:</strong> ${escapeHtml(objective)}</p>
      <p><strong style="color:var(--text-primary);">Servicio:</strong> ${escapeHtml(model.serviceName)}</p>
      <p><strong style="color:var(--text-primary);">Siguiente paso sugerido:</strong> ${escapeHtml(model.nextStep)}</p>
    </div>
    <div class="mt-6 flex items-center gap-4">
      <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:rgba(255,215,0,0.12);color:var(--gold);">M</div>
      <div>
        <p class="text-sm font-bold" style="color:var(--text-primary);">MetodologIA</p>
        <p class="text-xs" style="color:var(--text-muted);">${escapeHtml(DEFAULT_CONTACT_EMAIL)}</p>
      </div>
    </div>
  `.trim();
}

function renderHeroContent(model: ProposalTemplateModel, primaryMailto: string): string {
  return `
    <div class="grid lg:grid-cols-5 gap-12 items-center">
      <div class="lg:col-span-3 reveal">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);color:var(--gold);">
          <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
          <span>${escapeHtml(model.processName)} · ${escapeHtml(model.requestDate)}</span>
        </div>
        <p class="text-sm font-semibold uppercase tracking-widest mb-3" style="color:var(--gold);">Propuesta comercial</p>
        <h1 class="font-heading font-black text-4xl md:text-6xl leading-tight mb-3" style="color:var(--text-primary);">${escapeHtml(model.serviceName)}</h1>
        <p class="font-heading text-xl md:text-2xl font-medium mb-6" style="color:var(--text-secondary);">Para ${escapeHtml(model.clientName)}</p>
        <div class="gold-divider" style="margin:0 0 1.5rem 0;"></div>
        <p class="text-base md:text-lg leading-relaxed mb-8 max-w-2xl" style="color:var(--text-secondary);">${escapeHtml(model.summary)}</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          ${renderMetricCards(model.metrics)}
        </div>
        <div class="flex flex-wrap gap-4">
          <a href="#journey" class="btn-gold">
            <i data-lucide="route" class="w-4 h-4"></i>
            <span>Ver la ruta</span>
          </a>
          <a href="${escapeHtml(primaryMailto)}" class="btn-ghost">
            <i data-lucide="mail" class="w-4 h-4"></i>
            <span>Conversar el siguiente paso</span>
          </a>
        </div>
      </div>
      <div class="lg:col-span-2 reveal">
        <div class="glass glow-border pulse-glow p-8 rounded-2xl">
          <p class="text-xs uppercase tracking-widest font-semibold mb-4" style="color:var(--gold);">Lectura ejecutiva</p>
          <h3 class="font-heading text-2xl font-bold mb-4" style="color:var(--text-primary);">Servicio: ${escapeHtml(model.serviceName)}</h3>
          <p class="text-sm leading-relaxed mb-6" style="color:var(--text-secondary);">${escapeHtml(model.approach)}</p>
          <ul class="space-y-3 mb-8">
            ${renderListRows(model.deliverables.slice(0, 5), "Entregables por confirmar")}
          </ul>
          <div class="glass p-4 rounded-xl">
            <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Siguiente paso</p>
            <p class="text-sm leading-relaxed" style="color:var(--text-secondary);">${escapeHtml(model.nextStep)}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="punchline reveal mt-16">
      <a href="#hook">Contexto y problema</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderHookContent(model: ProposalTemplateModel): string {
  const scope = model.intake?.scope || "Alcance por confirmar con el cliente.";
  const timeline = model.intake?.timeline || "Cronograma por confirmar.";
  const geography = model.intake?.geography || "Cobertura geográfica por confirmar.";
  return `
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="reveal">
        <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Resumen del problema</p>
        <h2 class="font-heading text-3xl md:text-4xl font-bold mb-8" style="color:var(--text-primary);">Qué necesita resolverse para ${escapeHtml(model.clientName)}</h2>
        <div class="space-y-6">
          <div class="glass p-6 rounded-xl flex items-start gap-4">
            <i data-lucide="target" class="w-8 h-8 flex-shrink-0" style="color:var(--gold);"></i>
            <div>
              <h4 class="font-heading font-semibold mb-1" style="color:var(--text-primary);">Objetivo</h4>
              <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(model.challenge)}</p>
            </div>
          </div>
          <div class="glass p-6 rounded-xl flex items-start gap-4">
            <i data-lucide="layout-panel-left" class="w-8 h-8 flex-shrink-0" style="color:var(--gold);"></i>
            <div>
              <h4 class="font-heading font-semibold mb-1" style="color:var(--text-primary);">Alcance</h4>
              <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(scope)}</p>
            </div>
          </div>
          <div class="glass p-6 rounded-xl flex items-start gap-4">
            <i data-lucide="map-pinned" class="w-8 h-8 flex-shrink-0" style="color:var(--gold);"></i>
            <div>
              <h4 class="font-heading font-semibold mb-1" style="color:var(--text-primary);">Cobertura</h4>
              <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(`${geography} · ${timeline}`)}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="reveal flex justify-center">
        <div class="glass w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center relative">
          <i data-lucide="scan-search" class="w-24 h-24 md:w-32 md:h-32" style="color:var(--gold);opacity:0.5;"></i>
          <div class="absolute inset-0 rounded-full" style="border:1px dashed var(--border-color);"></div>
        </div>
      </div>
    </div>
    <div class="text-center mt-12 reveal">
      <p class="text-lg font-heading font-semibold" style="color:var(--gold);">Intención sobre Intensidad</p>
      <p class="text-sm mt-2 max-w-3xl mx-auto" style="color:var(--text-secondary);">${escapeHtml(model.summary)}</p>
    </div>
    <div class="punchline reveal">
      <a href="#vision">Resultado esperado</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderVisionContent(model: ProposalTemplateModel): string {
  return `
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="reveal flex justify-center order-2 lg:order-1">
        <div class="glass w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center relative">
          <i data-lucide="sparkles" class="w-24 h-24 md:w-32 md:h-32" style="color:var(--gold);opacity:0.5;"></i>
          <div class="absolute inset-0 rounded-full" style="border:1px dashed var(--border-color);"></div>
        </div>
      </div>
      <div class="reveal order-1 lg:order-2">
        <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Resultado esperado</p>
        <h2 class="font-heading text-3xl md:text-4xl font-bold mb-8" style="color:var(--text-primary);">Lo que esta propuesta deja listo para operar</h2>
        <div class="space-y-6">
          <div class="glass p-6 rounded-xl flex items-start gap-4">
            <i data-lucide="compass" class="w-8 h-8 flex-shrink-0" style="color:var(--gold);"></i>
            <div>
              <h4 class="font-heading font-semibold mb-1" style="color:var(--text-primary);">Approach</h4>
              <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(model.approach)}</p>
            </div>
          </div>
          <div class="glass p-6 rounded-xl flex items-start gap-4">
            <i data-lucide="package-check" class="w-8 h-8 flex-shrink-0" style="color:var(--gold);"></i>
            <div>
              <h4 class="font-heading font-semibold mb-1" style="color:var(--text-primary);">Entregables</h4>
              <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(model.deliverables.slice(0, 3).join(" · ") || "Entregables por confirmar")}</p>
            </div>
          </div>
          <div class="glass p-6 rounded-xl flex items-start gap-4">
            <i data-lucide="calendar-check-2" class="w-8 h-8 flex-shrink-0" style="color:var(--gold);"></i>
            <div>
              <h4 class="font-heading font-semibold mb-1" style="color:var(--text-primary);">Siguiente conversación</h4>
              <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(model.nextStep)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="punchline reveal">
      <a href="#journey">Journey de implementación</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderJourneyContent(model: ProposalTemplateModel): string {
  const steps = model.steps.length > 0 ? model.steps : ["Discovery", "Diseño", "Activación"];
  const cards = steps.slice(0, 3).map((step, index) => {
    const supportingText =
      model.sections[index]?.body
      || (index === 0 ? model.challenge : index === 1 ? model.approach : model.nextStep);
    const metaLabel =
      index === 0
        ? model.deliverables[0] || "Contexto comercial"
        : index === 1
          ? model.processName
          : model.gates[0] || "Validación final";

    return {
      number: index + 1,
      title: step,
      tag: index === 0 ? "Aterrizar" : index === 1 ? "Diseñar" : "Activar",
      body: supportingText,
      meta: metaLabel,
      highlighted: index === 1,
      cta: index === 2 ? "Siguiente paso" : "Bloque operativo",
    };
  });

  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Journey</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Ruta sugerida de implementación</h2>
      <p class="text-sm mt-3 max-w-3xl mx-auto" style="color:var(--text-secondary);">La propuesta aterriza el trabajo en una secuencia concreta de pasos, entregables y decisiones.</p>
      <div class="gold-divider"></div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      ${cards.map((card) => `
        <div class="glass p-7 rounded-2xl reveal level-card flex flex-col ${card.highlighted ? "highlighted" : ""}">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style="background:rgba(255,215,0,0.1);color:var(--gold);">${card.number}</span>
            <span class="text-xs uppercase tracking-wider font-semibold" style="color:${card.highlighted ? "var(--gold)" : "var(--text-muted)"};">${escapeHtml(card.tag)}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ml-auto" style="background:${card.highlighted ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.06)"};color:${card.highlighted ? "var(--gold)" : "var(--text-muted)"};">
              ${escapeHtml(card.cta)}
            </span>
          </div>
          <h3 class="font-heading text-lg font-bold mb-2" style="color:var(--text-primary);">${escapeHtml(card.title)}</h3>
          <p class="text-[11px] font-semibold uppercase tracking-wide mb-3" style="color:var(--gold);opacity:0.7;">${escapeHtml(card.meta)}</p>
          <p class="text-sm flex-1" style="color:var(--text-secondary);">${escapeHtml(card.body)}</p>
        </div>`
      ).join("")}
    </div>
    <div class="punchline reveal">
      <a href="#programa">Entregables y bloques de trabajo</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function groupProgramCards(model: ProposalTemplateModel): Array<{
  label: string;
  title: string;
  note: string;
  cards: Array<{ index: number; title: string; body: string; meta: string; icon: string }>;
}> {
  const icons = [
    "target",
    "route",
    "package",
    "compass",
    "layers-3",
    "shield-check",
    "file-stack",
    "bar-chart-3",
    "sparkles",
  ];
  const rawCards = dedupeStrings([
    ...model.deliverables,
    ...model.sections.map((section) => section.title),
    ...model.steps,
  ])
    .slice(0, 9)
    .map((title: string, index: number) => {
      const supportingSection = model.sections[index] ?? model.sections[index % Math.max(model.sections.length, 1)];
      const supportingBody =
        supportingSection?.body
        || (index === 0 ? model.summary : index === 1 ? model.challenge : index === 2 ? model.approach : model.nextStep);
      const meta =
        model.steps[index]
        || model.deliverables[index]
        || model.processName;

      return {
        index,
        title,
        body: supportingBody,
        meta,
        icon: icons[index % icons.length],
      };
    });

  const fallbackCards = rawCards.length > 0
    ? rawCards
    : [{
      index: 0,
      title: model.serviceName,
      body: model.summary,
      meta: model.processName,
      icon: "package",
    }];
  const phaseSize = Math.max(1, Math.ceil(fallbackCards.length / 3));

  return [
    {
      label: "Fase 1",
      title: "Comprender",
      note: model.challenge,
      cards: fallbackCards.slice(0, phaseSize),
    },
    {
      label: "Fase 2",
      title: "Diseñar",
      note: model.approach,
      cards: fallbackCards.slice(phaseSize, phaseSize * 2),
    },
    {
      label: "Fase 3",
      title: "Activar",
      note: model.nextStep,
      cards: fallbackCards.slice(phaseSize * 2),
    },
  ].filter((phase) => phase.cards.length > 0);
}

function renderProgramaContent(model: ProposalTemplateModel): string {
  const phases = groupProgramCards(model);
  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Programa</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Entregables y bloques principales</h2>
      <div class="gold-divider"></div>
      <p class="mt-4 max-w-2xl mx-auto" style="color:var(--text-secondary);">Cada tarjeta resume una parte de la propuesta que sí se puede operar y revisar.</p>
    </div>
    ${phases.map((phase) => `
      <div class="mb-14">
        <div class="flex items-center gap-3 mb-6 reveal">
          <span class="phase-tag" style="background:rgba(255,215,0,0.15);color:var(--gold);">${escapeHtml(phase.label)}</span>
          <span class="font-heading font-semibold" style="color:var(--text-primary);">${escapeHtml(phase.title)}</span>
        </div>
        <p class="text-sm mb-6 reveal" style="color:var(--text-muted);">${escapeHtml(phase.note)}</p>
        <div class="grid md:grid-cols-3 gap-6">
          ${phase.cards.map((card) => `
            <article class="glass p-6 rounded-2xl reveal">
              <div class="flex items-center gap-3 mb-4">
                <span class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style="background:rgba(255,215,0,0.1);color:var(--gold);">${String(card.index + 1).padStart(2, "0")}</span>
                <i data-lucide="${escapeHtml(card.icon)}" class="w-5 h-5" style="color:var(--gold);"></i>
              </div>
              <h4 class="font-heading font-semibold mb-2 text-sm" style="color:var(--text-primary);">${escapeHtml(card.title)}</h4>
              <p class="text-xs font-semibold uppercase tracking-wide mb-2" style="color:var(--gold);opacity:0.7;">${escapeHtml(card.meta)}</p>
              <p class="text-xs" style="color:var(--text-secondary);">${escapeHtml(card.body)}</p>
            </article>
          `).join("")}
        </div>
      </div>
    `).join("")}
    <div class="punchline reveal">
      <a href="#modalidades">Alcance y condiciones base</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
        </div>
    </div>
  `.trim();
}

function renderModalidadesContent(model: ProposalTemplateModel): string {
  const cards = [
    { title: "Alcance", text: model.intake?.scope || "Por confirmar con el cliente." },
    { title: "Geografía", text: model.intake?.geography || "Por confirmar con el cliente." },
    { title: "Cronograma", text: model.intake?.timeline || "Por confirmar con el cliente." },
  ];

  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Modalidades</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Cómo aplicar la propuesta</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      ${cards.map((card) => `
        <div class="glass p-7 rounded-2xl reveal text-center">
          <div class="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4" style="background:rgba(255,215,0,0.1);">
            <i data-lucide="layers-3" class="w-7 h-7" style="color:var(--gold);"></i>
          </div>
          <h3 class="font-heading text-xl font-bold mb-3" style="color:var(--text-primary);">${escapeHtml(card.title)}</h3>
          <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(card.text)}</p>
        </div>
      `.trim()).join("")}
    </div>
    <div class="text-center reveal">
      <p class="glass inline-block px-6 py-3 rounded-xl text-sm" style="color:var(--text-secondary);">${escapeHtml(model.serviceName)} puede activarse de forma incremental y con alcance verificable.</p>
    </div>
    <div class="punchline reveal">
      <a href="#objeciones">Riesgos y supuestos a cuidar</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderObjecionesContent(model: ProposalTemplateModel): string {
  const risks = model.risks.length > 0
    ? model.risks
    : [
      "Validar alcance con los decisores antes de comprometer fechas o volumen.",
      "Confirmar dependencias operativas y owner del proceso.",
      "Asegurar que el siguiente paso tenga responsables y fecha.",
    ];

  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Riesgos</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Lo que conviene cuidar antes de cerrar</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="max-w-4xl mx-auto space-y-6">
      ${risks.slice(0, 5).map((risk) => `
        <div class="glass p-7 rounded-2xl reveal">
          <h3 class="font-heading text-lg font-bold mb-3" style="color:var(--text-primary);"><i data-lucide="triangle-alert" class="w-5 h-5 inline mr-2" style="color:var(--gold);"></i>${escapeHtml(risk)}</h3>
          <p class="text-sm leading-relaxed" style="color:var(--text-secondary);">La propuesta se mantiene conservadora para evitar sobreprometer. Si este punto cambia, debe actualizarse el alcance comercial y el siguiente paso.</p>
        </div>
      `.trim()).join("")}
    </div>
    <div class="punchline reveal">
      <a href="#credenciales">Evidencia y soporte</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderCredencialesContent(model: ProposalTemplateModel): string {
  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Credenciales</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Respaldo y capacidad de ejecución</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
      <div class="space-y-6">
        ${renderReferenceCards(model.references, "Evidencia por confirmar", "La propuesta se apoyó en el draft estructurado, el intake y la base operativa disponible.")}
      </div>
      <div class="space-y-6">
        ${renderProcessCards(model.internalProcessCatalog)}
      </div>
    </div>
    <div class="punchline reveal">
      <a href="#equipo">Equipo y referentes</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderEquipoContent(model: ProposalTemplateModel): string {
  const founders = model.metodologiaFounders.length > 0
    ? model.metodologiaFounders
    : [{
      title: "Equipo MetodologIA",
      summary: "La propuesta puede complementarse con el equipo adecuado una vez se cierre el alcance comercial.",
      meta: "Soporte",
    }];

  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Equipo</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Quiénes respaldan la conversación</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      ${founders.slice(0, 4).map((founder) => `
        <div class="glass p-8 rounded-2xl reveal">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" style="background:linear-gradient(135deg,rgba(255,215,0,0.2),rgba(19,125,197,0.2));border:2px solid rgba(255,215,0,0.3);">
            <span class="font-heading text-xl font-black" style="color:var(--gold);">${escapeHtml(founder.title.slice(0, 1))}</span>
          </div>
          <h3 class="font-heading text-lg font-bold mb-2" style="color:var(--text-primary);">${escapeHtml(founder.title)}</h3>
          <p class="text-xs uppercase tracking-widest font-bold mb-3" style="color:var(--gold);">${escapeHtml(founder.meta || "Equipo")}</p>
          <p class="text-sm leading-relaxed" style="color:var(--text-secondary);">${escapeHtml(founder.summary)}</p>
        </div>
      `.trim()).join("")}
    </div>
    <div class="punchline reveal">
      <a href="#metodologías">Capacidades y recursos</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderPristinoContent(model: ProposalTemplateModel): string {
  const supportChips = [
    model.processName,
    `${Math.max(model.assets.length, 1)} activos base`,
    `${Math.max(model.sops.length, 1)} protocolos`,
    `${Math.max(model.gates.length, 1)} puntos de validación`,
  ];

  return `
    <div class="glass rounded-2xl overflow-hidden reveal" style="border-color:rgba(255,215,0,0.15);">
      <div class="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
        <div class="flex-shrink-0">
          <div class="w-40 h-40 md:w-52 md:h-52 rounded-2xl flex items-center justify-center" style="background:linear-gradient(135deg,rgba(10,18,42,0.96),rgba(30,41,59,0.94));box-shadow:0 0 40px rgba(0,200,255,0.15), 0 0 80px rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.18);">
            <span class="font-heading text-5xl md:text-6xl font-black gold-text">P</span>
          </div>
        </div>
        <div class="flex-1 text-center md:text-left">
          <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Capa operativa</p>
          <h3 class="font-heading text-2xl md:text-3xl font-bold mb-3" style="color:var(--text-primary);">Pristino</h3>
          <p class="text-sm leading-relaxed mb-4" style="color:var(--text-secondary);">
            Pristino funciona aquí como capa de soporte para organizar el contexto, los activos y la trazabilidad de ${escapeHtml(model.serviceName)}. No reemplaza la propuesta: la vuelve más legible, auditable y fácil de iterar sin sacrificar criterio comercial.
          </p>
          <div class="flex flex-wrap gap-3 justify-center md:justify-start">
            ${supportChips.map((chip, index) => `
              <span class="px-3 py-1 rounded-full text-xs font-semibold" style="background:${index % 2 === 0 ? "rgba(255,215,0,0.1)" : "rgba(0,200,255,0.1)"};color:${index % 2 === 0 ? "var(--gold)" : "#00c8ff"};">${escapeHtml(chip)}</span>
            `.trim()).join("")}
          </div>
        </div>
      </div>
    </div>
  `.trim();
}

function renderMetodologiasContent(model: ProposalTemplateModel): string {
  return `
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="reveal">
        <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Capacidades</p>
        <h2 class="font-heading text-3xl md:text-4xl font-bold mb-6" style="color:var(--text-primary);">Servicios y recursos que sostienen la propuesta</h2>
        <p class="text-sm mb-8" style="color:var(--text-secondary);">La conversación comercial se apoya tanto en servicios concretos como en recursos y conocimiento reutilizable.</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs uppercase tracking-widest font-bold mb-3" style="color:var(--gold);">Servicios</p>
            <div class="grid gap-4">${renderReferenceCards(model.metodologiaServices.slice(0, 3), "Servicios por confirmar", "Se podrá complementar la propuesta con el servicio más adecuado cuando se cierre el alcance.")}</div>
          </div>
          <div>
            <p class="text-xs uppercase tracking-widest font-bold mb-3" style="color:var(--gold);">Recursos</p>
            <div class="grid gap-4">${renderReferenceCards(model.metodologiaResources.slice(0, 3), "Recursos por confirmar", "No se detectaron recursos públicos relevantes para este caso en el contexto disponible.")}</div>
          </div>
        </div>
      </div>
      <div class="reveal flex justify-center">
        <div class="glass w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center relative">
          <i data-lucide="book-open" class="w-24 h-24 md:w-32 md:h-32" style="color:var(--gold);opacity:0.5;"></i>
          <div class="absolute inset-0 rounded-full" style="border:1px dashed var(--border-color);"></div>
        </div>
      </div>
    </div>
    <div class="punchline reveal">
      <a href="#roi">Valor esperado</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderRoiContent(model: ProposalTemplateModel): string {
  const investment = model.intake?.investment || "Por confirmar";
  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Valor</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Por qué vale la pena avanzar</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="grid lg:grid-cols-2 gap-12">
      <div class="reveal">
        <div class="glass p-8 rounded-2xl space-y-6">
          <div class="glass p-5 rounded-xl">
            <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Resumen</p>
            <p class="text-sm leading-relaxed" style="color:var(--text-secondary);">${escapeHtml(model.summary)}</p>
          </div>
          <div class="glass p-5 rounded-xl">
            <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Approach</p>
            <p class="text-sm leading-relaxed" style="color:var(--text-secondary);">${escapeHtml(model.approach)}</p>
          </div>
          <div class="glass p-5 rounded-xl">
            <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Inversión</p>
            <p class="text-sm leading-relaxed" style="color:var(--text-secondary);">${escapeHtml(investment)}</p>
          </div>
        </div>
      </div>
      <div class="reveal">
        <div class="glass p-8 rounded-2xl">
          <h3 class="font-heading text-xl font-bold mb-6" style="color:var(--text-primary);">Señales de valor</h3>
          <div class="grid grid-cols-2 gap-4 mb-6">
            ${renderMetricCards(model.metrics)}
          </div>
          <ul class="space-y-3">
            ${renderListRows(model.gates.slice(0, 4), "Gates por confirmar")}
          </ul>
        </div>
      </div>
    </div>
    <div class="punchline reveal">
      <a href="#configurador">Configuración recomendada</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderConfiguradorContent(model: ProposalTemplateModel, primaryMailto: string): string {
  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Configurador</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Configuración sugerida para esta propuesta</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="grid lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-6">
        <div class="glass p-7 rounded-2xl reveal">
          <h4 class="font-heading font-bold mb-2" style="color:var(--text-primary);">Servicio priorizado</h4>
          <p class="text-sm font-semibold mb-2" style="color:var(--gold);">${escapeHtml(model.serviceName)}</p>
          <p class="text-xs" style="color:var(--text-secondary);">${escapeHtml(model.summary)}</p>
        </div>
        <div class="glass p-7 rounded-2xl reveal">
          <h4 class="font-heading font-bold mb-3" style="color:var(--text-primary);">Entregables incluidos</h4>
          <div class="flex flex-wrap gap-2">${renderInlineList(model.deliverables, "Entregables por confirmar")}</div>
        </div>
        <div class="glass p-7 rounded-2xl reveal">
          <h4 class="font-heading font-bold mb-3" style="color:var(--text-primary);">Dependencias visibles</h4>
          <div class="flex flex-wrap gap-2">${renderInlineList(model.gates.concat(model.risks).slice(0, 6), "Sin dependencias explícitas")}</div>
        </div>
      </div>
      <div class="lg:col-span-2">
        <div class="lg:sticky lg:top-28">
          <div class="glass p-8 rounded-2xl glow-border reveal">
            <h4 class="font-heading font-bold text-lg mb-6" style="color:var(--text-primary);">Resumen ejecutivo</h4>
            <div class="space-y-3 mb-6 text-sm">
              <div class="flex justify-between gap-4">
                <span style="color:var(--text-secondary);">Cliente</span>
                <span class="font-semibold" style="color:var(--text-primary);">${escapeHtml(model.clientName)}</span>
              </div>
              <div class="flex justify-between gap-4">
                <span style="color:var(--text-secondary);">Proceso</span>
                <span class="font-semibold" style="color:var(--text-primary);">${escapeHtml(model.processName)}</span>
              </div>
              <div class="flex justify-between gap-4">
                <span style="color:var(--text-secondary);">Fecha</span>
                <span class="font-semibold" style="color:var(--text-primary);">${escapeHtml(model.requestDate)}</span>
              </div>
            </div>
            <a href="${escapeHtml(primaryMailto)}" class="btn-gold w-full justify-center mt-4">
              <span>Solicitar validación comercial</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="punchline reveal">
      <a href="#servicios">Servicios complementarios</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderServiciosContent(model: ProposalTemplateModel): string {
  const extras = [
    ...model.internalProcessCatalog.map((item) => ({
      title: item.processName,
      summary: item.summary,
      meta: item.isPrimary ? "Ruta sugerida" : "Capacidad complementaria",
    })),
    ...model.metodologiaServices,
  ].slice(0, 6);

  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Servicios complementarios</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Qué más puede activarse desde aquí</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="grid gap-6">
      ${renderReferenceCards(extras, "Sin servicios complementarios", "La propuesta queda centrada en el alcance principal detectado.")}
    </div>
    <div class="punchline reveal">
      <a href="#condiciones">Condiciones y supuestos</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderConditionsTable(model: ProposalTemplateModel): string {
  const rows = [
    ["Cliente", model.clientName],
    ["Servicio", model.serviceName],
    ["Alcance", model.intake?.scope || "Por confirmar"],
    ["Geografía", model.intake?.geography || "Por confirmar"],
    ["Cronograma", model.intake?.timeline || "Por confirmar"],
    ["Inversión", model.intake?.investment || "Por confirmar"],
    ["Siguiente paso", model.nextStep],
    ["Gates", model.gates.join(" · ") || "Por confirmar"],
  ];

  return rows
    .map(([label, value]) => `
      <tr>
        <td class="font-semibold" style="color:var(--text-primary);width:30%;">${escapeHtml(label)}</td>
        <td>${escapeHtml(value)}</td>
      </tr>
    `.trim())
    .join("");
}

function renderCondicionesContent(model: ProposalTemplateModel): string {
  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Condiciones</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Supuestos y condiciones de esta versión</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="glass rounded-2xl overflow-hidden reveal max-w-5xl mx-auto">
      <table class="data-table">
        <tbody>
          ${renderConditionsTable(model)}
        </tbody>
      </table>
    </div>
  `.trim();
}

function renderStackContent(model: ProposalTemplateModel): string {
  const rows = [
    ["Activos de soporte", `${Math.max(model.assets.length, 1)} insumos consolidados para esta versión`, "Base de trabajo"],
    ["Protocolos", `${Math.max(model.sops.length, 1)} criterios de ejecución y calidad disponibles`, "Gobernanza"],
    ["Referencias", `${Math.max(model.references.length, 1)} fuentes y evidencias consolidadas`, "Respaldo"],
    ["Pristino", "Capa de consistencia, seguimiento y control de versión para la propuesta", "Operación"],
  ];

  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Stack</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Capacidad de soporte</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="glass rounded-2xl overflow-hidden reveal max-w-4xl mx-auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Detalle</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(([label, value, category]) => `
            <tr>
              <td class="font-semibold" style="color:var(--text-primary);">${escapeHtml(label)}</td>
              <td>${escapeHtml(value)}</td>
              <td><span class="phase-tag" style="background:rgba(255,215,0,0.08);color:var(--text-muted);">${escapeHtml(category)}</span></td>
            </tr>
          `.trim()).join("")}
        </tbody>
      </table>
    </div>
  `.trim();
}

function renderWorkshopContent(model: ProposalTemplateModel): string {
  return `
    <div class="text-center mb-16 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Ruta ampliada</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Cómo se traduce la propuesta en frentes accionables</h2>
      <div class="gold-divider"></div>
      <p class="mt-4 max-w-2xl mx-auto" style="color:var(--text-secondary);">Estos bloques resumen la conversación que conviene validar con el cliente para pasar de intención a activación sin perder claridad comercial.</p>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      ${renderStageCards(model.sections)}
    </div>
  `.trim();
}

function renderWorkshopCtaContent(model: ProposalTemplateModel, primaryMailto: string): string {
  return `
    <div class="glass p-10 md:p-14 rounded-2xl text-center glow-border reveal">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
        style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);color:var(--gold);">
        <i data-lucide="git-branch-plus" class="w-3.5 h-3.5"></i>
        <span>Iteración sugerida</span>
      </div>
      <h2 class="font-heading text-2xl md:text-4xl font-bold mb-4" style="color:var(--text-primary);">
        Qué conviene validar antes de avanzar
      </h2>
      <div class="gold-divider"></div>
      <p class="text-base max-w-2xl mx-auto mb-8 mt-4" style="color:var(--text-secondary);">
        ${escapeHtml(model.nextStep)}
      </p>
      <div class="grid sm:grid-cols-3 gap-4 mb-8 text-left">
        <div class="glass p-5 rounded-xl">
          <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Cliente</p>
          <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(model.clientName)}</p>
        </div>
        <div class="glass p-5 rounded-xl">
          <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Servicio</p>
          <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(model.serviceName)}</p>
        </div>
        <div class="glass p-5 rounded-xl">
          <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color:var(--gold);">Ruta</p>
          <p class="text-sm" style="color:var(--text-secondary);">${escapeHtml(model.processName)}</p>
        </div>
      </div>
      <a href="${escapeHtml(primaryMailto)}" class="btn-gold">
        <i data-lucide="mail" class="w-4 h-4"></i>
        <span>Enviar comentarios y ajustes</span>
      </a>
      <div class="mt-6">
        <p class="text-xs text-center" style="color:var(--text-muted);">
          La siguiente iteración debería confirmar alcance, responsables y orden de activación.
        </p>
      </div>
    </div>
    <div class="punchline reveal mt-12">
      <a href="#final-cta">Ir al cierre</a>
      <div class="mt-3 bounce-slow inline-block">
        <i data-lucide="chevron-down" class="w-5 h-5" style="color:var(--gold);"></i>
      </div>
    </div>
  `.trim();
}

function renderGlossaryContent(model: ProposalTemplateModel): string {
  const entries = [
    {
      term: "Cliente",
      description: `Organización objetivo de esta propuesta: ${model.clientName}.`,
    },
    {
      term: "Servicio",
      description: `Frente principal que se busca activar: ${model.serviceName}.`,
    },
    {
      term: "Proceso",
      description: `Ruta operativa que da contexto a la conversación comercial: ${model.processName}.`,
    },
    {
      term: "Entregable",
      description: "Activo concreto que la propuesta deja claro y verificable para avanzar.",
    },
    {
      term: "Gate",
      description: "Condición de validación que conviene cumplir antes de comprometer el siguiente paso.",
    },
    {
      term: "Riesgo",
      description: "Supuesto o dependencia que puede deteriorar el alcance si no se acuerda a tiempo.",
    },
    {
      term: "Activo de soporte",
      description: "Insumo, pieza base o material de soporte utilizado para construir esta versión.",
    },
    {
      term: "Protocolo",
      description: "Criterio o procedimiento que ayuda a ejecutar la activación con consistencia.",
    },
  ];

  return `
    <div class="text-center mb-12 reveal">
      <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Referencia</p>
      <h2 class="font-heading text-3xl md:text-5xl font-bold" style="color:var(--text-primary);">Glosario</h2>
      <div class="gold-divider"></div>
    </div>
    <div class="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      ${entries.map((entry) => `
        <div class="glass p-4 rounded-xl reveal">
          <strong style="color:var(--gold);">${escapeHtml(entry.term)}</strong>
          <p class="text-xs mt-1" style="color:var(--text-secondary);">${escapeHtml(entry.description)}</p>
        </div>
      `.trim()).join("")}
    </div>
  `.trim();
}

function renderFinalSection(model: ProposalTemplateModel, primaryMailto: string): string {
  return `
    <p class="text-xs uppercase tracking-widest font-bold mb-4" style="color:var(--gold);">Cierre</p>
    <h2 class="font-heading text-3xl md:text-5xl font-bold mb-4" style="color:var(--text-primary);">Siguiente paso recomendado</h2>
    <div class="gold-divider"></div>
    <p class="text-lg mb-10 max-w-3xl mx-auto mt-4" style="color:var(--text-secondary);">${escapeHtml(model.nextStep)}</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="${escapeHtml(primaryMailto)}" class="btn-gold text-base py-4 px-8">
        <i data-lucide="mail" class="w-5 h-5"></i>
        <span>Escribir ahora</span>
      </a>
      <a href="#workshop-section" class="btn-ghost text-base py-4 px-8">
        <i data-lucide="file-stack" class="w-5 h-5"></i>
        <span>Revisar ruta ampliada</span>
      </a>
    </div>
  `.trim();
}

function renderFooterContent(primaryMailto: string): string {
  return `
    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0A122A"/><stop offset="100%" stop-color="#1E293B"/></linearGradient></defs>
          <rect width="36" height="36" rx="10" fill="url(#logoGrad2)"/>
          <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
          <circle cx="18" cy="8" r="2" fill="#FFD700"/>
        </svg>
        <span class="font-heading font-bold" style="color:var(--text-primary);">Metodolog<span class="gold-text">IA</span></span>
      </div>
      <div class="text-center max-w-xl">
        <p class="text-xs" style="color:var(--text-muted);">Innovation Mode: este documento fue generado con asistencia de IA, estructurado para publicación HTML y listo para revisión comercial final.</p>
      </div>
      <a id="footer-contact-link" href="${escapeHtml(primaryMailto)}" class="flex items-center gap-2 text-sm transition-all hover:scale-105" style="color:var(--text-secondary);">
        <i data-lucide="mail" class="w-4 h-4" style="color:var(--gold);"></i>
        <span>${escapeHtml(DEFAULT_CONTACT_EMAIL)}</span>
      </a>
    </div>
  `.trim();
}

function renderGenericModal(
  title: string,
  body: string,
  linkId: string,
  linkHref: string,
  linkLabel: string,
  modalName: string,
): string {
  return `
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-heading text-xl font-bold" style="color:var(--text-primary);">${escapeHtml(title)}</h3>
      <button onclick="closeModal('${escapeHtml(modalName)}')" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-yellow-400/10 transition">
        <i data-lucide="x" class="w-5 h-5" style="color:var(--text-muted);"></i>
      </button>
    </div>
    <p class="text-sm mb-6" style="color:var(--text-secondary);">${escapeHtml(body)}</p>
    <a id="${escapeHtml(linkId)}" href="${escapeHtml(linkHref)}" class="btn-gold w-full justify-center text-sm">
      <i data-lucide="mail" class="w-5 h-5"></i>
      ${escapeHtml(linkLabel)}
    </a>
  `.trim();
}

function buildMailto(email: string, subject: string, bodyLines: string[]): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function buildPrimaryMailto(model: ProposalTemplateModel): string {
  return buildMailto(
    DEFAULT_CONTACT_EMAIL,
    `Propuesta comercial · ${model.clientName} · ${model.serviceName}`,
    [
      "Hola equipo MetodologIA,",
      "",
      `Quiero validar la propuesta para ${model.clientName}.`,
      `Servicio: ${model.serviceName}`,
      `Proceso: ${model.processName}`,
      "",
      `Siguiente paso sugerido: ${model.nextStep}`,
      "",
      "Comentarios o ajustes:",
      "[COMPLETAR]",
    ],
  );
}

function buildTemplatePayload(model: ProposalTemplateModel): CommercialProposalPayload {
  const primaryMailto = buildPrimaryMailto(model);

  return {
    defaults: {
      lang: "es",
      theme: "dark",
      view: "detallado",
    },
    meta: {
      title: `${model.serviceName} · ${model.clientName}`,
      description: compactWhitespace(model.summary).slice(0, 220),
    },
    runtimeConfig: {
      contactEmail: DEFAULT_CONTACT_EMAIL,
      reserveSubject: `Propuesta comercial · ${model.clientName}`,
      workshopSubject: `Siguiente paso · ${model.clientName}`,
      links: {
        footerContact: primaryMailto,
        reserveMailto: primaryMailto,
        reserveCalendar: "",
        reserveNotebook: "",
        workshopCalendar: "",
        workshopMailto: primaryMailto,
      },
      pricing: {
        bootcamp: { current: "", regular: "", currency: DEFAULT_CURRENCY },
        assistantUnit: "",
        empowerment: { current: "", regular: "", currency: DEFAULT_CURRENCY },
        workshopBonus: "",
        roiPrice: "",
        automationFactor: "",
      },
    },
    i18n: {},
    i18nHtml: {},
    infoData: {},
    modulesData: [],
    assistantNames: [],
    textBySelector: {
      "#main-nav button.btn-gold span": "Escribir ahora",
    },
    htmlBySelector: {
      "section.section-pad[style*=\"min-height:auto\"] .glass.p-10.rounded-2xl": renderIntroLetter(model),
      "#hero-content": renderHeroContent(model, primaryMailto),
      "#hook-content": renderHookContent(model),
      "#vision-content": renderVisionContent(model),
      "#journey-content": renderJourneyContent(model),
      "#programa-content": renderProgramaContent(model),
      "#modalidades-content": renderModalidadesContent(model),
      "#objeciones-content": renderObjecionesContent(model),
      "#credenciales-content": renderCredencialesContent(model),
      "#equipo-content": renderEquipoContent(model),
      "#pristino-content": renderPristinoContent(model),
      "#metodologias-content": renderMetodologiasContent(model),
      "#roi-content": renderRoiContent(model),
      "#configurador-content": renderConfiguradorContent(model, primaryMailto),
      "#servicios-content": renderServiciosContent(model),
      "#condiciones-content": renderCondicionesContent(model),
      "#stack-content": renderStackContent(model),
      "#workshop-content": renderWorkshopContent(model),
      "#workshop-cta-content": renderWorkshopCtaContent(model, primaryMailto),
      "#glossary-content": renderGlossaryContent(model),
      "#final-cta > div": renderFinalSection(model, primaryMailto),
      "#final-cta-content": renderFooterContent(primaryMailto),
      "#modal-reserve .modal-content": renderGenericModal("Validar propuesta", "Esta plantilla usa un cierre comercial más simple: la acción principal es responder o pedir ajustes por correo.", "reserve-mailto-link", primaryMailto, "Escribir para validar", "reserve"),
      "#modal-workshop .modal-content": renderGenericModal("Siguiente paso", "Si desea mover la conversación, comparta ajustes, preguntas o condiciones para la siguiente iteración.", "workshop-mailto-link", primaryMailto, "Enviar comentarios", "workshop"),
      "#modal-module .modal-content": renderGenericModal("Detalle del bloque", "Los bloques de esta propuesta se muestran directamente en la página para facilitar revisión y publicación.", "module-mailto-link", primaryMailto, "Contactar", "module"),
      "#modal-info .modal-content": renderGenericModal("Información adicional", "La propuesta ya consolidó el contenido esencial dentro del documento principal.", "info-mailto-link", primaryMailto, "Contactar", "info"),
    },
    attributesBySelector: {
      "#lang-toggle": { style: "display:none" },
      "#view-toggle": { style: "display:none" },
      "#main-nav a[href=\"#journey\"]": { href: "#hook", textContent: "Resumen" },
      "#main-nav a[href=\"#programa\"]": { href: "#journey", textContent: "Ruta" },
      "#main-nav a[href=\"#modalidades\"]": { href: "#programa", textContent: "Entregables" },
      "#main-nav a[href=\"#roi\"]": { href: "#credenciales", textContent: "Respaldo" },
      "#main-nav a[href=\"#configurador\"]": { href: "#final-cta", textContent: "Cierre" },
      "#main-nav button.btn-gold": { onclick: `window.location.href=${JSON.stringify(primaryMailto)};` },
      "#reserve-mailto-link": { href: primaryMailto },
      "#workshop-mailto-link": { href: primaryMailto },
      "#footer-contact-link": { href: primaryMailto },
    },
  };
}

function resolveTemplatePath(fileName: string): string {
  const candidates = [
    resolve(moduleDir, "template-package", fileName),
    resolve(moduleDir, "../../src/proposals/template-package", fileName),
    resolve(process.cwd(), "src/proposals/template-package", fileName),
  ];

  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(`Missing proposal template asset: ${fileName}`);
  }

  return found;
}

function getTemplateHtml(): string {
  const cacheKey = TEMPLATE_FILE_NAME;
  const cached = templateHtmlCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const html = readFileSync(resolveTemplatePath(TEMPLATE_FILE_NAME), "utf8");
  templateHtmlCache.set(cacheKey, html);
  return html;
}

function injectPayload(templateHtml: string, payload: CommercialProposalPayload): string {
  const payloadTagPattern =
    /(<script id="proposal-template-payload" type="application\/json">)([\s\S]*?)(<\/script>)/;

  if (!payloadTagPattern.test(templateHtml)) {
    throw new Error("The commercial proposal template does not expose proposal-template-payload.");
  }

  const serializedPayload = JSON.stringify(payload, null, 2);
  return templateHtml.replace(payloadTagPattern, `$1\n${serializedPayload}\n  $3`);
}

function formatInlineScriptAssignment(name: string, value: unknown): string {
  const serialized = JSON.stringify(value, null, 2).replace(/^/gm, "  ");
  return `  let ${name} = ${serialized};\n`;
}

function replaceInlineScriptAssignment(
  html: string,
  name: string,
  endMarker: string,
  value: unknown,
): string {
  const startMarker = `  let ${name} = `;
  const startIndex = html.indexOf(startMarker);
  if (startIndex === -1) {
    return html;
  }

  const endIndex = html.indexOf(endMarker, startIndex);
  if (endIndex === -1) {
    return html;
  }

  return `${html.slice(0, startIndex)}${formatInlineScriptAssignment(name, value)}${html.slice(endIndex)}`;
}

function scrubEmbeddedTemplateDefaults(
  html: string,
  payload: CommercialProposalPayload,
): string {
  let output = html;
  output = replaceInlineScriptAssignment(output, "runtimeConfig", "\n\n  let infoData = ", payload.runtimeConfig);
  output = replaceInlineScriptAssignment(
    output,
    "infoData",
    "\n\n  /* ==================================================================\n     DATA: 9 MODULES",
    payload.infoData,
  );
  output = replaceInlineScriptAssignment(
    output,
    "modulesData",
    "\n\n  /* ==================================================================\n     ASSISTANT NAMES",
    payload.modulesData,
  );
  output = replaceInlineScriptAssignment(
    output,
    "assistantNames",
    "\n\n  /* ==================================================================\n     i18n DICTIONARIES",
    payload.assistantNames,
  );
  output = replaceInlineScriptAssignment(output, "i18n", "\n\n  let i18nHtml = ", payload.i18n);
  output = replaceInlineScriptAssignment(
    output,
    "i18nHtml",
    "\n\n  /* ==================================================================\n     APPLICATION STATE",
    payload.i18nHtml,
  );
  return output;
}

function applyServerSideSelectorContent(
  $: CheerioAPI,
  map: Record<string, string>,
  mode: "html" | "text",
): void {
  for (const [selector, value] of Object.entries(map)) {
    $(selector).each((_, element) => {
      if (mode === "html") {
        $(element).html(value);
      } else {
        $(element).text(value);
      }
    });
  }
}

function applyServerSideAttributeBindings(
  $: CheerioAPI,
  map: Record<string, Record<string, string | number | boolean>>,
): void {
  for (const [selector, attrs] of Object.entries(map)) {
    $(selector).each((_, element) => {
      for (const [attr, value] of Object.entries(attrs)) {
        if (attr === "textContent") {
          $(element).text(String(value));
        } else if (attr === "innerHTML") {
          $(element).html(String(value));
        } else {
          $(element).attr(attr, String(value));
        }
      }
    });
  }
}

function applyPayloadServerSide(html: string, payload: CommercialProposalPayload): string {
  const $ = loadHtml(html);

  if (payload.meta.title) {
    $("title").text(payload.meta.title);
  }

  if (payload.meta.description) {
    $("meta[name=\"description\"]").attr("content", payload.meta.description);
  }

  applyServerSideSelectorContent($, payload.textBySelector, "text");
  applyServerSideSelectorContent($, payload.htmlBySelector, "html");
  applyServerSideAttributeBindings($, payload.attributesBySelector);

  const output = scrubEmbeddedTemplateDefaults($.html(), payload).replace(
    /^<!doctype html>/i,
    "<!doctype html>",
  );

  return output.startsWith("<!doctype html>") ? output : `<!doctype html>\n${output}`;
}

export function renderProposalTemplate(model: ProposalTemplateModel): string {
  const templateHtml = getTemplateHtml();
  const payload = buildTemplatePayload(model);
  const htmlWithPayload = injectPayload(templateHtml, payload);
  return applyPayloadServerSide(htmlWithPayload, payload);
}
