/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */

/**
 * Cotizador MetodologIA - Decoupled JavaScript
 * Full pricing calculator logic for the Route Evolution page
 */

// === DATA SOURCES ===

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
        title: "Ofimática Inteligente (N2)", description: "Deja que el computador escriba correos, analice datos y cree presentaciones por ti.",
        icon: "monitor", color: "text-blue-400", bg: "bg-blue-500/10",
        deliverables: ["Textos y correos automáticos", "Reportes automáticos", "Presentaciones rápidas"]
    },
    bootcamp_ventas: {
        title: "Ventas con IA (N3)", description: "Encuentra clientes y cierra tratos más rápido.",
        icon: "trending-up", color: "text-rose-400", bg: "bg-rose-500/10",
        deliverables: ["Voz y tono para vender", "Filtro de clientes favoritos", "Seguimiento automático"]
    },
    bootcamp_formas: {
        title: "Orden Digital (N4)", description: "Organiza tu información para que las herramientas funcionen sin errores.",
        icon: "database", color: "text-emerald-400", bg: "bg-emerald-500/10",
        deliverables: ["Base de datos organizada", "Reglas de orden", "Flujo de información perfecto"]
    },
    bootcamp_amplificado: {
        title: "Cadenas de Trabajo (N5)", description: "Conecta tus herramientas para que hablen entre ellas.",
        icon: "link", color: "text-blue-400", bg: "bg-blue-500/10",
        deliverables: ["Tareas automáticas", "Herramientas conectadas", "Menos clics, más resultados"]
    },
    bootcamp_gerencia: {
        title: "Liderazgo de Sistemas (N6)", description: "Aprende a dirigir no solo personas, sino también procesos inteligentes.",
        icon: "shield", color: "text-purple-400", bg: "bg-purple-500/10",
        deliverables: ["Diseño de equipo digital", "Revisión de funcionamiento", "Sistemas de control"]
    },
    bootcamp_coding: {
        title: "Crea tus Herramientas (N8)", description: "Si puedes explicar cómo quieres que funcione una app, puedes construirla.",
        icon: "code", color: "text-brand-gold", bg: "bg-brand-gold/10",
        deliverables: ["Tu propia aplicación", "Software a tu medida", "Independencia tecnológica"]
    }
};

const B2B_MULTIPLIERS = { program: 13.33, foundation: 5.29, bootcamp: 15, diagnostic: 1 };
const MANTRA = "La excelencia no se compra. Se diseña, se cocrea y se comparte.";

// === STATE ===
let pricingMode = 'B2C';
let selectedPaymentMethod = 'contado';

// === UTILITY FUNCTIONS ===

function formatMoney(amount, showUSD = true) {
    const copFormatted = '$' + amount.toLocaleString('es-CO', { maximumFractionDigits: 0 });
    if (!showUSD || amount === 0) return copFormatted;
    const usd = Math.round(amount / 3500);
    return `${copFormatted} <span class="text-[10px] text-slate-200">~$${usd} USD</span>`;
}

function getMultiplier(type) {
    return pricingMode === 'B2B' ? (B2B_MULTIPLIERS[type] || 1) : 1;
}

// === MODAL FUNCTIONS ===

function openDetails(key) {
    const data = detailsData[key];
    if (!data) return;
    
    const modal = document.getElementById('details-modal');
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-description').innerText = data.description;
    
    const iconCont = document.getElementById('modal-icon-container');
    iconCont.className = `inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 border border-white/10 ${data.bg}`;
    iconCont.innerHTML = icons.get(data.icon, `w-6 h-6 ${data.color}`);
    
    document.getElementById('modal-deliverables').innerHTML = data.deliverables.map(item => `
        <li class="flex items-start gap-2 text-sm text-slate-300">
            <svg class="w-4 h-4 ${data.color} mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>${item}</span>
        </li>
    `).join('');
    
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.card-glass').classList.remove('scale-95');
    modal.querySelector('.card-glass').classList.add('scale-100');
}

function closeDetails() {
    const modal = document.getElementById('details-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.card-glass').classList.add('scale-95');
    modal.querySelector('.card-glass').classList.remove('scale-100');
}

function openComprometer() {
    const checkboxes = document.querySelectorAll('.pricing-checkbox');
    const activeItems = [];
    let totalForCheck = 0;

    checkboxes.forEach(chk => {
        if (chk.checked) {
            const basePrice = parseInt(chk.dataset.price);
            const type = chk.dataset.type;
            const price = basePrice * getMultiplier(type);
            totalForCheck += price;
            activeItems.push({
                name: chk.parentElement.querySelector('.font-bold, .text-sm').innerText,
                price: price
            });
        }
    });

    if (activeItems.length === 0) {
        alert('Por favor selecciona al menos un servicio.');
        return;
    }

    const modal = document.getElementById('comprometer-modal');
    const modalSummary = document.getElementById('modal-summary');
    const finalPriceContado = totalForCheck * 0.9;
    
    modalSummary.innerHTML = activeItems.map(item => `
        <div class="flex justify-between text-slate-300 text-xs mb-1">
            <span>${item.name}</span>
            <span class="font-mono text-slate-200">${formatMoney(item.price)}</span>
        </div>
    `).join('');
    
    document.getElementById('modal-final-price').innerHTML = formatMoney(finalPriceContado);
    
    // Generate mailto
    const settingsList = activeItems.map(item => `• ${item.name}`).join('%0A');
    const subject = encodeURIComponent('Consulta: Mi Ruta de (R)Evolución');
    const emailBody = `Hola equipo,%0A%0AHe seleccionado:%0A${settingsList}%0A%0AInversión: ${document.getElementById('modal-final-price').innerText}%0A%0A¿Cuándo podemos conversar?`;
    document.getElementById('mailto-cta').href = `mailto:contacto@metodologia.info?subject=${subject}&body=${emailBody}`;
    
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.card-glass').classList.remove('scale-95');
    modal.querySelector('.card-glass').classList.add('scale-100');
}

function closeComprometer() {
    const modal = document.getElementById('comprometer-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.card-glass').classList.add('scale-95');
    modal.querySelector('.card-glass').classList.remove('scale-100');
}

// === PRICING LOGIC ===

function selectPaymentOption(method) {
    selectedPaymentMethod = method;
    calculate();
}

function togglePricingMode() {
    pricingMode = pricingMode === 'B2C' ? 'B2B' : 'B2C';
    const toggleIndicator = document.getElementById('toggle-indicator');
    const toggleButton = document.getElementById('pricing-mode-toggle');
    const executionContext = document.getElementById('execution-context');
    
    if (pricingMode === 'B2B') {
        toggleIndicator.classList.remove('translate-x-1');
        toggleIndicator.classList.add('translate-x-9');
        toggleButton.classList.add('bg-purple-600');
        toggleButton.classList.remove('bg-slate-700');
        executionContext.innerHTML = `
            <div class="flex items-center justify-center gap-2 mb-2">
                ${icons.get('briefcase', 'w-4 h-4 text-purple-400')}
                <span class="text-sm font-bold text-white">Modelo B2B (Empresas)</span>
            </div>
            <p class="text-xs text-slate-100">Ejecución para hasta 20 personas por servicio.</p>
        `;
        executionContext.className = 'card-glass p-4 rounded-xl border border-purple-500/20 text-center';
    } else {
        toggleIndicator.classList.remove('translate-x-9');
        toggleIndicator.classList.add('translate-x-1');
        toggleButton.classList.remove('bg-purple-600');
        toggleButton.classList.add('bg-slate-700');
        executionContext.innerHTML = `
            <div class="flex items-center justify-center gap-2 mb-2">
                ${icons.get('info', 'w-4 h-4 text-blue-400')}
                <span class="text-sm font-bold text-white">Modelo B2C (Personas)</span>
            </div>
            <p class="text-xs text-slate-100">Incluye 1 cupo individual.</p>
        `;
        executionContext.className = 'card-glass p-4 rounded-xl border border-blue-500/20 text-center';
    }
    
    updatePriceLabels();
    calculate();
}

function updatePriceLabels() {
    const priceDisplays = document.querySelectorAll('[data-price-display]');
    priceDisplays.forEach(el => {
        const basePrice = parseInt(el.dataset.priceDisplay);
        const type = el.dataset.type;
        const displayPrice = basePrice * getMultiplier(type);
        el.innerHTML = formatMoney(displayPrice);
    });
    
    const priceLabels = document.querySelectorAll('[data-price-label]');
    priceLabels.forEach(el => {
        const type = el.dataset.priceLabel;
        if (pricingMode === 'B2C') {
            if (type === 'program') el.innerHTML = 'Base: $2.4M c/u';
            if (type === 'foundation') el.innerHTML = 'Base: $3.4M';
            if (type === 'bootcamp') el.innerHTML = 'Base: $800k c/u';
        } else {
            if (type === 'program') el.innerHTML = 'B2B: $32M c/u';
            if (type === 'foundation') el.innerHTML = 'B2B: $18M';
            if (type === 'bootcamp') el.innerHTML = 'B2B: $12M c/u';
        }
    });
}

function calculate() {
    const checkboxes = document.querySelectorAll('.pricing-checkbox');
    let totalList = 0;

    checkboxes.forEach(chk => {
        if (chk.checked) {
            const basePrice = parseInt(chk.dataset.price);
            const type = chk.dataset.type;
            totalList += basePrice * getMultiplier(type);
        }
    });

    // Scenarios
    const finalPriceContado = totalList * 0.90;  // 10% discount
    const scenario3M = totalList / 3;
    const scenario12M_Quota = (totalList * 0.88) / 12;

    // Update UI
    document.getElementById('list-price').innerHTML = formatMoney(totalList);
    
    // Render Payment Options
    const paymentContainer = document.getElementById('payment-options');
    if (paymentContainer && totalList > 0) {
        const isActive = (m) => selectedPaymentMethod === m;
        const getBorder = (m, def) => isActive(m) ? "border-brand-gold ring-2 ring-brand-gold/50 bg-slate-900 shadow-[0_0_20px_var(--brand-gold-glow)]" : def;

        let html = `
            <div class="text-center mb-4 pb-4 border-b border-white/10">
                <div class="text-xs text-slate-200 uppercase tracking-wider mb-1">Total Base</div>
                <div class="text-2xl font-bold text-white">${formatMoney(totalList)}</div>
            </div>
            
            <div onclick="selectPaymentOption('contado')" class="relative overflow-hidden rounded-xl border ${getBorder('contado', 'border-brand-gold/40')} transition-all cursor-pointer p-4 mb-3">
                <div class="absolute top-0 right-0 bg-brand-gold text-black text-[10px] font-bold px-2 py-1 rounded-bl">10% OFF</div>
                <div class="text-xs text-brand-gold font-bold uppercase mb-1">Pago de Contado</div>
                <div class="text-2xl font-bold text-white">${formatMoney(finalPriceContado)}</div>
            </div>
        `;
        
        if (pricingMode === 'B2C') {
            html += `
                <div onclick="selectPaymentOption('credito3')" class="rounded-xl border ${getBorder('credito3', 'border-white/10')} transition-all cursor-pointer p-4 mb-3">
                    <div class="text-xs text-blue-400 font-bold uppercase mb-1">3 Cuotas</div>
                    <div class="text-xl font-bold text-white">${formatMoney(scenario3M)} <span class="text-xs text-slate-200">/mes</span></div>
                </div>
                
                <div onclick="selectPaymentOption('afiliado')" class="rounded-xl border ${getBorder('afiliado', 'border-white/10')} transition-all cursor-pointer p-4">
                    <div class="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5">Membresía</div>
                    <div class="text-xs text-emerald-400 font-bold uppercase mb-1">Afiliado 12 Meses</div>
                    <div class="text-xl font-bold text-white">${formatMoney(scenario12M_Quota)} <span class="text-xs text-slate-200">/mes</span></div>
                    <div class="text-[10px] text-emerald-400/80">-12% OFF + Beneficios</div>
                </div>
            `;
        }
        
        html += `
            <button onclick="openComprometer()" class="w-full mt-6 py-3 bg-brand-gold text-black font-bold rounded-xl hover:bg-brand-gold-dark transition-all">
                Continuar con mi Ruta
            </button>
        `;
        
        paymentContainer.innerHTML = html;
    } else if (paymentContainer) {
        paymentContainer.innerHTML = '<div class="text-slate-200 italic text-center py-8">Selecciona servicios para ver opciones de pago</div>';
    }

    // Update main price display
    const finalValues = { 'contado': finalPriceContado, 'credito3': scenario3M, 'afiliado': scenario12M_Quota };
    const currentPrice = finalValues[selectedPaymentMethod] || finalPriceContado;
    const finalPriceEl = document.getElementById('final-price');
    if (finalPriceEl) finalPriceEl.innerHTML = formatMoney(currentPrice);
}

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', () => {
    // Init checkboxes
    document.querySelectorAll('.pricing-checkbox').forEach(chk => {
        chk.addEventListener('change', calculate);
    });
    
    // Init toggle
    const toggleBtn = document.getElementById('pricing-mode-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', togglePricingMode);
    
    // Modal close on backdrop
    ['details-modal', 'comprometer-modal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (id === 'details-modal') closeDetails();
                else closeComprometer();
            }
        });
    });
    
    // Initialize view
    updatePriceLabels();
    calculate();
    if (typeof icons !== 'undefined') icons.createIcons();
});
