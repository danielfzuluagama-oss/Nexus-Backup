/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */

/**
 * Bootcamp Amplificación Profesional - Data & Logic
 * Externalized JavaScript for cleaner HTML and better maintainability
 */

// === DATA SOURCES ===

const modulesData = {
    0: { titulo: "Nivelación", subtitulo: "Fase 0", color: "cyan", beneficio: "Base sólida con mindset estratégico y herramientas configuradas.", entregable: "Glosario y Setup Completo", duracion: "2h" },
    1: { titulo: "Business Model You", subtitulo: "Hito 1", color: "emerald", beneficio: "Visualiza tu carrera como un sistema.", entregable: "Canvas Personal v1.0", duracion: "2h" },
    2: { titulo: "Propósito y Marca", subtitulo: "Hito 2", color: "teal", beneficio: "Clarifica tu identidad profesional.", entregable: "Brand Book Personal", duracion: "2h" },
    3: { titulo: "Sistema Productivo", subtitulo: "Hito 3", color: "blue", beneficio: "Estructura tus flujos de trabajo.", entregable: "Dashboard Operativo", duracion: "2h" },
    4: { titulo: "Plan de Carrera", subtitulo: "Hito 4", color: "cyan", beneficio: "Hoja de ruta con hitos claros.", entregable: "Roadmap Profesional", duracion: "2h" },
    5: { titulo: "Metas y Métricas", subtitulo: "Hito 5", color: "indigo", beneficio: "OKRs personales para monitorear avance.", entregable: "Tablero de OKRs", duracion: "2h" },
    6: { titulo: "IA Personal", subtitulo: "Hito 6", color: "purple", beneficio: "Tu Segundo Cerebro Activo con IA.", entregable: "Pack de Prompts + GPTs", duracion: "2h" },
    7: { titulo: "Modelo de Ingresos", subtitulo: "Hito 7", color: "amber", beneficio: "Estructura de monetización.", entregable: "Plan de Monetización", duracion: "2h" },
    8: { titulo: "Finanzas Personales", subtitulo: "Hito 8", color: "green", beneficio: "Gestión de recursos económicos.", entregable: "Dashboard Financiero", duracion: "2h" },
    9: { titulo: "Networking y Despliegue", subtitulo: "Hito 9", color: "orange", beneficio: "Visibilidad y conexiones clave.", entregable: "Plan de Go-to-Market", duracion: "2h" }
};

const faqData = [
    { q: "¿Necesito conocimientos técnicos previos?", a: "No. Solo saber usar un navegador y tener curiosidad." },
    { q: "¿Qué pasa si no puedo asistir a una sesión?", a: "Todas las sesiones son grabadas. Acceso de por vida." },
    { q: "¿Es solo para emprendedores?", a: "No. Para cualquier profesional que quiera gestionar su carrera estratégicamente." },
    { q: "¿Cuánto tiempo debo dedicarle?", a: "18 horas (+2 opcionales). Recomendamos 2h adicionales/semana para implementar." },
    { q: "¿Puedo tomarlo con mi equipo?", a: "Sí, hasta 3 personas: Solo (profundidad), Dupla (accountability), Terna (sincronización)." }
];

// === UTILITY FUNCTIONS ===

function getColorClasses(color) {
    const colorMap = {
        'purple': { border: 'border-purple-500', bg: 'bg-purple-500/20', text: 'text-purple-400' },
        'blue': { border: 'border-blue-500', bg: 'bg-blue-500/20', text: 'text-blue-400' },
        'cyan': { border: 'border-cyan-500', bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
        'emerald': { border: 'border-emerald-500', bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
        'teal': { border: 'border-teal-500', bg: 'bg-teal-500/20', text: 'text-teal-400' },
        'indigo': { border: 'border-indigo-500', bg: 'bg-indigo-500/20', text: 'text-indigo-400' },
        'amber': { border: 'border-amber-500', bg: 'bg-amber-500/20', text: 'text-amber-400' },
        'green': { border: 'border-green-500', bg: 'bg-green-500/20', text: 'text-green-400' },
        'orange': { border: 'border-orange-500', bg: 'bg-orange-500/20', text: 'text-orange-400' }
    };
    return colorMap[color] || colorMap['blue'];
}

function generateMailto(programName) {
    const subject = encodeURIComponent('Solicitud: Bootcamp Amplificación');
    const body = encodeURIComponent(`Hola equipo MetodologIA,\n\nMe interesa conocer más sobre ${programName}.\n\nNombre: [Completar]\nEmail: [Completar]\n\nGracias.`);
    return `mailto:contacto@metodologia.com?subject=${subject}&body=${body}`;
}

// === MODAL FUNCTIONS ===

function closeModal(modal) {
    if (typeof modal === 'string') modal = document.getElementById(modal);
    if (!modal) return;
    modal.classList.add('hidden');
    if (modal.parentElement === document.body && !modal.id) modal.remove();
    document.body.classList.remove('overflow-hidden');
}

function openModuleModal(id) {
    const data = modulesData[id];
    if (!data) return;
    const colors = getColorClasses(data.color);
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4';
    modal.innerHTML = `
        <div class="bg-slate-900 border ${colors.border} rounded-2xl max-w-md w-full p-8">
            <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center ${colors.text} font-bold text-lg">${id}</div>
                <div>
                    <span class="${colors.text} text-xs font-bold uppercase">${data.subtitulo}</span>
                    <h3 class="text-xl font-bold text-white">${data.titulo}</h3>
                </div>
            </div>
            <p class="text-slate-300 mb-4">${data.beneficio}</p>
            <div class="flex justify-between text-sm text-slate-100 mb-6 p-3 bg-white/5 rounded-lg">
                <span>⏱️ ${data.duracion}</span>
                <span>📦 ${data.entregable}</span>
            </div>
            <button onclick="closeModal(this.closest('.fixed'))" class="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.classList.add('overflow-hidden');
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
}

// === RENDER FUNCTIONS ===

function renderFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;
    container.innerHTML = faqData.map(item => `
        <details class="group bg-white/5 border border-white/5 rounded-xl">
            <summary class="p-4 cursor-pointer text-white font-medium flex items-center justify-between">
                ${item.q}
                <span class="text-slate-100 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="px-4 pb-4 text-slate-100 text-sm">${item.a}</p>
        </details>
    `).join('');
}

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', () => {
    renderFAQ();
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
