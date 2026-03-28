/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */

/**
 * Cotizador Personas Logic
 * Hardcoded for B2C experience.
 */

const rutaMode = 'personas';
let configData = null;

// Init
async function initCotizador() {
    // 1. Load Data
    try {
        const response = await fetch('../data/business-logic.json');
        configData = await response.json();
    } catch (e) {
        console.error('Error loading logic:', e);
        return;
    }

    // 2. Apply Content
    updateContent();
    
    // 3. Hide Enterprise Inputs (Extra Safety)
    const companyInputs = document.getElementById('company-inputs');
    if (companyInputs) companyInputs.classList.add('hidden');
}

function updateContent() {
    if (!configData) return;
    const content = configData['personas'];
    
    // Update elements by data-ruta-content
    document.querySelectorAll('[data-ruta-content]').forEach(el => {
        const key = el.dataset.rutaContent;
        if (content[key]) {
            if (key === 'heroSubtitle' || key.includes('Label')) {
                el.innerHTML = content[key];
            } else {
                el.textContent = content[key];
            }
        }
    });
    
    // Update labels (using innerHTML for bilingual spans)
    document.querySelectorAll('[data-ruta-label]').forEach(el => {
        const key = el.dataset.rutaLabel;
        if (content[key]) {
            if (el.children.length === 0 || (el.children.length === 1 && el.querySelector('span'))) {
                 el.innerHTML = content[key];
            } else {
                // Complex label handling (text node replacement)
                const textNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
                if (textNode) {
                    const span = document.createElement('span');
                    span.innerHTML = content[key];
                    el.replaceChild(span, textNode);
                } else {
                    const span = el.querySelector('span:not([id])');
                    if (span) span.innerHTML = content[key];
                }
            }
        }
    });
}

// Global accessor for calculations (used by cotizador.html logic)
window.configData = configData; // Will be null initially, but that's ok

document.addEventListener('DOMContentLoaded', initCotizador);
