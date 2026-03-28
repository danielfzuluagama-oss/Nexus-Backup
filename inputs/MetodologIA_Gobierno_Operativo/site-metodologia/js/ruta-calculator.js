// Level Data
const levelsData = {
    n0: {
        title: "N0: Diagnóstico Estratégico",
        type: "🎁 GRATIS",
        typeColor: "text-emerald-400 bg-emerald-500/10",
        description: "Detectamos exactamente dónde falla tu sistema hoy. Un examen completo de tu forma de trabajar para saber qué arreglar primero.",
        keypoints: ["Mapa de pérdidas de tiempo", "Identificación de fricciones", "Plan de mejora rápida", "Sesión 1:1 para aclarar dudas"],
        benefits: ["Claridad total sobre tu situación actual", "Priorización basada en impacto", "Sin costo, sin compromiso"],
        cta: { text: "Agendar Diagnóstico", href: "https://calendar.app.google/c8g8uWnxZT7SeM1T9" }
    },
    n1: {
        title: "N1: EstrategIA Personal",
        type: "COACHING",
        typeColor: "text-blue-400 bg-blue-500/10",
        description: "Diseñamos tu hoja de ruta personal hacia la soberanía digital, profesional y estratégica. Definimos metas claras y el camino para alcanzarlas.",
        keypoints: ["Plan de carrera digital personalizado", "Objetivos trimestrales medibles", "18 horas de coaching 1:1", "Acceso a metodología probada"],
        benefits: ["Dirección clara sin perder tiempo", "Acompañamiento experto", "Resultados medibles desde el día 1"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    },
    n2: {
        title: "N2: Ofimática con IA",
        type: "BOOTCAMP",
        typeColor: "text-cyan-400 bg-cyan-500/10",
        description: "Deja que el computador haga tu trabajo repetitivo. Automatiza correos, reportes y presentaciones con IA.",
        keypoints: ["Redacción automática de emails", "Generación de reportes", "Presentaciones en minutos", "Análisis de datos con IA"],
        benefits: ["Ahorra 5-10 horas semanales", "Entregas de mayor calidad", "Menos estrés, más creatividad"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    },
    n3: {
        title: "N3: Gestión Comercial con IA",
        type: "BOOTCAMP",
        typeColor: "text-amber-400 bg-amber-500/10",
        description: "Encuentra clientes y cierra tratos más rápido. La IA te ayuda a personalizar cada conversación sin cansarte.",
        keypoints: ["Prospección inteligente", "Personalización masiva", "Seguimiento automatizado", "Análisis de objeciones"],
        benefits: ["Más reuniones calificadas", "Mayor tasa de cierre", "Pipeline predecible"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    },
    n4: {
        title: "N4: Formas de Trabajo",
        type: "BOOTCAMP",
        typeColor: "text-yellow-400 bg-yellow-500/10",
        description: "Organiza tus datos y flujos para que las herramientas funcionen sin errores. La base de todo sistema eficiente.",
        keypoints: ["Estructuración de información", "Flujos de trabajo optimizados", "Reglas de orden digital", "Integración de herramientas"],
        benefits: ["Menos errores humanos", "Procesos replicables", "Equipo alineado"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    },
    n5: {
        title: "N5: Trabajar Amplificado",
        type: "BOOTCAMP",
        typeColor: "text-purple-400 bg-purple-500/10",
        description: "Adopta IA generativa a fondo: prompting avanzado, asistentes personalizados, automatizaciones con n8n, mini apps y soluciones agénticas.",
        keypoints: ["Prompting de alto rendimiento", "Creación de asistentes IA", "Automatizaciones con n8n", "Análisis y mejora de procesos"],
        benefits: ["Dominio de IA generativa", "Soluciones agénticas propias", "Procesos optimizados"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    },
    n6: {
        title: "N6: GerencIA de Proyectos",
        type: "BOOTCAMP",
        typeColor: "text-emerald-400 bg-emerald-500/10",
        description: "Dirige no solo personas, sino procesos inteligentes. Ten control total de lo que pasa en tu operación.",
        keypoints: ["Dashboards de productividad", "Gestión de agentes IA", "Métricas en tiempo real", "Gobierno de automatizaciones"],
        benefits: ["Visibilidad 360°", "Decisiones basadas en datos", "Escalabilidad operativa"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    },
    n7: {
        title: "N7: Programa de Empoderamiento",
        type: "PROGRAMA ÉLITE",
        typeColor: "text-pink-400 bg-pink-500/10",
        description: "Pasas de usuario a diseñador. Diseñas procesos que otros no pueden ver. Soberanía total.",
        keypoints: ["Diseño de sistemas propios", "Mentalidad de diseñador", "Creación de frameworks", "Certificación de experto"],
        benefits: ["Independencia tecnológica", "Diferenciación profesional", "Capacidad de enseñar a otros"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    },
    n8: {
        title: "N8: Vibe Coding",
        type: "BOOTCAMP",
        typeColor: "text-yellow-400 bg-yellow-500/10",
        description: "Si puedes explicar cómo quieres que funcione una app, puedes construirla. Crea software sin código difícil.",
        keypoints: ["Desarrollo con IA", "Aplicaciones personalizadas", "Automatizaciones avanzadas", "APIs y conexiones"],
        benefits: ["Tu propio software", "Sin dependencia de devs", "Ideas → Realidad en horas"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    },
    n9: {
        title: "N9: Digital Champions",
        type: "PROGRAMA ÉLITE",
        typeColor: "text-red-400 bg-red-500/10",
        description: "Te conviertes en quien guía a los demás. Eres el experto que (r)evoluciona equipos y organizaciones.",
        keypoints: ["Liderazgo de (r)evolución", "Mentoría de equipos", "Estrategia organizacional", "Certificación Champion"],
        benefits: ["Autoridad reconocida", "Impacto multiplicado", "Acceso a red de líderes"],
        cta: { text: "Simular Inversión", href: "cotizador.html" }
    }
};

function openLevelModal(level) {
    const data = levelsData[level];
    if (!data) return;
    
    const content = `
        <div class="mb-6">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold ${data.typeColor} mb-4">${data.type}</span>
            <h3 class="text-2xl font-bold text-white mb-3">${data.title}</h3>
            <p class="text-slate-100 leading-relaxed">${data.description}</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div>
                <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">¿Qué Incluye?</h4>
                <ul class="space-y-2">
                    ${data.keypoints.map(k => `
                        <li class="flex items-start gap-2 text-sm text-slate-100">
                            <svg class="w-4 h-4 text-brand-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>${k}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div>
                <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Beneficios</h4>
                <ul class="space-y-2">
                    ${data.benefits.map(b => `
                        <li class="flex items-start gap-2 text-sm text-slate-100">
                            <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            <span>${b}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
        
        <a href="${data.cta.href}" class="w-full py-3 bg-[var(--brand-gold)] text-slate-950 font-bold rounded-xl hover:bg-[var(--brand-gold-dark)] transition-all flex items-center justify-center gap-2">
            ${data.cta.text}
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
    `;
    
    document.getElementById('level-modal-content').innerHTML = content;
    const modal = document.getElementById('level-modal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.card-glass').classList.remove('scale-95');
    modal.querySelector('.card-glass').classList.add('scale-100');
    if (typeof icons !== 'undefined') icons.createIcons();
}

function closeLevelModal() {
    const modal = document.getElementById('level-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.card-glass').classList.add('scale-95');
    modal.querySelector('.card-glass').classList.remove('scale-100');
}

document.getElementById('level-modal').addEventListener('click', (e) => {
    if (e.target.id === 'level-modal') closeLevelModal();
});

document.addEventListener('DOMContentLoaded', () => {
    if (typeof icons !== 'undefined') icons.createIcons();
});
