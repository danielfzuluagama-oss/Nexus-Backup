/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */

/**
 * Ruta de Evolución - Cotizador Data & Logic
 * Externalized JavaScript for cleaner HTML and better maintainability
 */

// === DETAILS MODAL DATA ===
const detailsData = {
    diagnostic: {
        title: "Diagnóstico (N0)",
        description: "Encontramos los puntos exactos donde estás perdiendo tiempo y dinero. Es como un examen médico para tu forma de trabajar.",
        icon: "search", color: "text-emerald-400", bg: "bg-emerald-500/10",
        deliverables: ["Mapa de pérdidas de tiempo", "Plan de mejora rápida", "Manual de qué arreglar primero", "Sesión para aclarar dudas"]
    },
    empoderamiento: {
        title: "Empoderamiento (N7)",
        description: "Pasas de ser un usuario a ser el jefe de la tecnología. Aprendes a diseñar procesos que otros simplemente no pueden ver.",
        icon: "zap", color: "text-brand-gold", bg: "bg-brand-gold/10",
        deliverables: ["Tu propio sistema de trabajo", "Diseño de procesos que no fallan", "Cómo pensar como un arquitecto", "Diploma de Experto Digital"]
    },
    champions: {
        title: "Campeones Digitales (N9)",
        description: "Te conviertes en la persona que guía a los demás. Eres el experto que asegura que la tecnología sea un motor y no una carga.",
        icon: "trophy", color: "text-purple-400", bg: "bg-purple-500/10",
        deliverables: ["Guía para liderar equipos", "Control total de herramientas", "Plan para crecer sin límites", "Certificado de Líder Digital"]
    },
    foundation: {
        title: "Acompañamiento Estratégico",
        description: "Estamos contigo para asegurar que todo salga bien. No compras un curso, compras un resultado.",
        icon: "compass", color: "text-blue-400", bg: "bg-blue-500/10",
        deliverables: ["Plan de vida y trabajo digital", "Metas claras para tu éxito", "Cuidado ante riesgos digitales", "Tu socio experto siempre a mano"]
    },
    bootcamp_ofimatica: {
        title: "Ofimática Inteligente (N1-N2)",
        description: "Deja que el computador escriba correos, analice datos y cree presentaciones por ti.",
        icon: "monitor", color: "text-blue-400", bg: "bg-blue-500/10",
        deliverables: ["Textos y correos que se escriben solos", "Reportes automáticos", "Presentaciones rápidas y bonitas"]
    },
    bootcamp_ventas: {
        title: "Ventas con IA (N3)",
        description: "Encuentra clientes y cierra tratos más rápido. La IA te ayuda a hablar con más gente de forma personal.",
        icon: "trending-up", color: "text-rose-400", bg: "bg-rose-500/10",
        deliverables: ["Voz y tono para vender", "Filtro de clientes favoritos", "Seguimiento que no cansa"]
    },
    bootcamp_formas: {
        title: "Orden Digital (N4)",
        description: "Si tus datos están ordenados, el trabajo es fácil. Aprendes a organizar tu información.",
        icon: "database", color: "text-emerald-400", bg: "bg-emerald-500/10",
        deliverables: ["Tu base de datos organizada", "Reglas de orden para tu equipo", "Flujo de información perfecto"]
    },
    bootcamp_amplificado: {
        title: "Cadenas de Trabajo (N5)",
        description: "Conecta tus herramientas para que hablen entre ellas. Haz que una tarea dispare la siguiente automáticamente.",
        icon: "link", color: "text-blue-400", bg: "bg-blue-500/10",
        deliverables: ["Tareas que se hacen solas", "Herramientas conectadas", "Menos clics, más resultados"]
    },
    bootcamp_gerencia: {
        title: "Liderazgo de Sistemas (N6)",
        description: "Aprende a dirigir no solo personas, sino también procesos inteligentes.",
        icon: "shield", color: "text-purple-400", bg: "bg-purple-500/10",
        deliverables: ["Diseño de equipo digital", "Cómo revisar que todo funcione", "Sistemas de seguridad y control"]
    },
    bootcamp_coding: {
        title: "Crea tus Herramientas (N8)",
        description: "Si puedes explicar cómo quieres que funcione una aplicación, puedes construirla.",
        icon: "code", color: "text-amber-400", bg: "bg-amber-500/10",
        deliverables: ["Tu propia aplicación lista", "Software hecho a tu medida", "Independencia tecnológica"]
    }
};

// === B2B MULTIPLIERS ===
const B2B_MULTIPLIERS = {
    program: 13.33333333,   // $2.4M → $32M
    foundation: 5.29411765, // $3.4M → $18M
    bootcamp: 15,           // $800k → $12M
    diagnostic: 1           // Free stays free
};

// === CONTENT DATA (B2C/B2B) ===
const CONTENT_DATA = {
    'B2C': {
        'hero-title': 'Tu Ruta a la <span class="text-brand-gold">Soberanía</span> Digital',
        'hero-desc': 'Deja de usar herramientas y empieza a diseñarlas. Un camino para profesionales y freelancers que buscan ser dueños de su tiempo.'
    },
    'B2B': {
        'hero-title': '<span class="text-brand-gold">Sistemas</span> de Alto Rendimiento',
        'hero-desc': 'Transforme su nómina en una orquesta de alta eficiencia. Diseñamos el sistema operativo que su empresa necesita para escalar sin fricción.'
    }
};

// === UTILITY FUNCTIONS ===
const MANTRA = "La excelencia no se compra. Se diseña, se cocrea y se comparte.";

function formatMoney(amount, showUSD = true) {
    const copFormatted = '$' + amount.toLocaleString('es-CO', { maximumFractionDigits: 0 });
    if (!showUSD || amount === 0) return copFormatted;
    const usd = Math.round(amount / 3500);
    const usdFormatted = usd.toLocaleString('en-US', { maximumFractionDigits: 0 });
    return `${copFormatted} <span class="text-[10px] text-slate-200 font-normal">~$${usdFormatted} USD</span>`;
}

function getMultiplier(type, pricingMode) {
    return pricingMode === 'B2B' ? (B2B_MULTIPLIERS[type] || 1) : 1;
}

function updateContent(mode) {
    const data = CONTENT_DATA[mode];
    if (!data) return;
    for (const [id, content] of Object.entries(data)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = content;
    }
    if (mode === 'B2B') {
        document.body.classList.add('b2b-mode');
        document.body.classList.remove('b2c-mode');
    } else {
        document.body.classList.add('b2c-mode');
        document.body.classList.remove('b2b-mode');
    }
}

// Export for use in HTML
window.rutaData = {
    detailsData,
    B2B_MULTIPLIERS,
    CONTENT_DATA,
    MANTRA,
    formatMoney,
    getMultiplier,
    updateContent
};
