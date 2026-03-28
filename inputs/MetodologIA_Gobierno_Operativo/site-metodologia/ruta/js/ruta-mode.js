/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */

/**
 * Ruta Mode Toggle - Personas vs Empresas
 * Centraliza la lógica de modo para toda la sección Ruta.
 * consume data/business-logic.json para desacoplar contenido.
 */

// Estado global
let rutaMode = 'personas'; // default
let configData = null; // Will load from JSON

// Inicializar modo desde sessionStorage y cargar JSON
async function initRutaMode() {
    const saved = sessionStorage.getItem('rutaMode');
    if (saved && (saved === 'personas' || saved === 'empresas')) {
        rutaMode = saved;
    }
    
    // FETCH JSON
    try {
        const response = await fetch('../data/business-logic.json');
        configData = await response.json();
    } catch (e) {
        console.error('Error loading business logic:', e);
        // Fallback minimal or alert?
        return; 
    }

    updateToggleUI();
    updateAllContent();
}

// Cambiar modo
function setRutaMode(mode) {
    if (mode !== 'personas' && mode !== 'empresas') return;
    rutaMode = mode;
    sessionStorage.setItem('rutaMode', mode);
    updateToggleUI();
    updateAllContent();
}

// Obtener modo actual
function getRutaMode() {
    return rutaMode;
}

// Obtener variante de contenido
function getContent(key) {
    if (!configData) return '';
    return configData[rutaMode][key] || configData['personas'][key]; // Fallback to personas if key missing
}

// Actualizar UI del toggle
function updateToggleUI() {
    const togglePersonas = document.getElementById('toggle-personas');
    const toggleEmpresas = document.getElementById('toggle-empresas');
    
    if (!togglePersonas || !toggleEmpresas) return;
    
    if (rutaMode === 'personas') {
        togglePersonas.classList.add('active');
        toggleEmpresas.classList.remove('active');
        document.body.classList.remove('mode-empresas');
    } else {
        togglePersonas.classList.remove('active');
        toggleEmpresas.classList.add('active');
        document.body.classList.add('mode-empresas');
    }
}

// Actualizar todo el contenido dinámico
function updateAllContent() {
    if (!configData) return;
    
    const content = configData[rutaMode];
    
    // Update elements by data-ruta-content attribute
    document.querySelectorAll('[data-ruta-content]').forEach(el => {
        const key = el.dataset.rutaContent;
        if (content[key]) {
            // Use innerHTML for elements that may contain HTML tags
            if (key === 'heroSubtitle' || key === 'rutaHeroTitle' || key === 'rutaHeroSubtitle') {
                el.innerHTML = content[key];
            } else {
                el.textContent = content[key];
            }
        }
    });
    
    // Update inputs by data-ruta-value attribute
    document.querySelectorAll('[data-ruta-value]').forEach(el => {
        const key = el.dataset.rutaValue;
        if (content[key] !== undefined) {
            el.value = content[key];
            // Trigger change event
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
    
    // Update labels by data-ruta-label attribute
    document.querySelectorAll('[data-ruta-label]').forEach(el => {
        const key = el.dataset.rutaLabel;
        if (content[key]) {
            // Find the text part or update the whole label if simple
            // We use innerHTML to support the <span class='text-slate-200'> tags from JSON
            
            // Check if it's a wrapper with input inside (complex case) or valid label
            // For simple labels (like our headings or separate labels), innerHTML is fine.
            // For labels that wrap inputs, we must be careful not to destroy input.
            
            if (el.children.length === 0 || (el.children.length === 1 && el.querySelector('span'))) {
                 el.innerHTML = content[key];
            } else {
                // If mixed content(e.g., text + input), try to find the text node or span
                // Simplest strategy for our current HTML: Most labels are separate elements or flex containers
                // Let's assume the label text is in a <span data-label-text> or just the first text node.
                
                // If the element has an input, we usually want to update the text sibling.
                const textNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
                if (textNode) {
                    // This is hard to do with innerHTML on a text node. 
                    // Better approach: Wrap the text in a span if possible, or replace the node.
                    const span = document.createElement('span');
                    span.innerHTML = content[key];
                    el.replaceChild(span, textNode);
                } else {
                    // Check if there is a span that holds the text
                    const span = el.querySelector('span:not([id])'); // avoid replacing specific dynamic spans if any
                    if (span) span.innerHTML = content[key];
                }
            }
        }
    });
    
    // Update visibility by data-ruta-show attribute
    document.querySelectorAll('[data-ruta-show]').forEach(el => {
        const showFor = el.dataset.rutaShow;
        if (showFor === rutaMode || showFor === 'both') {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
    
    // Toggle Company Inputs Visibility
    const companyInputs = document.getElementById('company-inputs');
    if (companyInputs) {
        if (content.showCompanyInputs) {
            companyInputs.classList.remove('hidden');
        } else {
            companyInputs.classList.add('hidden');
        }
    }

    // Fire custom event for page-specific handlers (like recalculating ROI)
    document.dispatchEvent(new CustomEvent('rutaModeChanged', { detail: { mode: rutaMode, config: configData } }));
    
    // Check SME Rule if in enterprise mode
    if (rutaMode === 'empresas') {
        checkSMERule();
    } else {
        hideSMENotification();
    }
}

// SME Rule Logic
function checkSMERule() {
    const headCountInput = document.getElementById('headcount');
    const yearsInput = document.getElementById('years-business');
    const notification = document.getElementById('sme-notification');
    
    if (!headCountInput || !yearsInput || !notification) return;
    
    const employees = parseInt(headCountInput.value) || 0;
    const years = parseInt(yearsInput.value) || 0;
    
    // Rule: <= 10 employees AND <= 3 years
    if (employees > 0 && employees <= 10 && years > 0 && years <= 3) {
        notification.classList.remove('hidden');
    } else {
        notification.classList.add('hidden');
    }
}

function hideSMENotification() {
    const notification = document.getElementById('sme-notification');
    if (notification) notification.classList.add('hidden');
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRutaMode);
} else {
    initRutaMode();
}
