/**
 * CTAHandler.js - Motor de Interacción Inteligente para MetodologIA
 * Gestiona dinámicamente los CTAs de correo para reducir fricción y elevar el profesionalismo.
 */

class CTAHandler {
    constructor() {
        this.ctaData = null;
        this.isLoaded = false;
        this.init();
    }

    async init() {
        try {
            // Obtener la ruta base para encontrar el JSON
            const scripts = document.getElementsByTagName('script');
            let basePath = '.';
            for (let script of scripts) {
                if (script.src.includes('CTAHandler.js')) {
                    basePath = script.src.substring(0, script.src.lastIndexOf('/'));
                    break;
                }
            }

            const response = await fetch(`${basePath}/cta-data.json`);
            this.ctaData = await response.json();
            this.isLoaded = true;
            this.bindEvents();
            console.log('🚀 CTAHandler: Motor de CTAs activado.');
        } catch (error) {
            console.error('❌ CTAHandler: Error al cargar el inventario de CTAs:', error);
            // Fallback: tratar de enlazar eventos aunque no haya datos (para no romper el sitio)
            this.bindEvents();
        }
    }

    bindEvents() {
        // Usar delegación de eventos para mayor eficiencia
        document.addEventListener('click', (e) => {
            const ctaElement = e.target.closest('[data-cta]');
            if (ctaElement) {
                e.preventDefault();
                const ctaId = ctaElement.getAttribute('data-cta');
                this.executeCTA(ctaId, ctaElement);
            }
        });

        // Efecto WOW: Tooltip informativo al pasar el mouse (opcional y discreto)
        document.addEventListener('mouseover', (e) => {
            const ctaElement = e.target.closest('[data-cta]');
            if (ctaElement && !ctaElement.hasAttribute('title')) {
                const ctaId = ctaElement.getAttribute('data-cta');
                if (this.ctaData && this.ctaData[ctaId]) {
                    ctaElement.setAttribute('title', `Abrirá tu correo para: ${this.ctaData[ctaId].subject}`);
                }
            }
        });
    }

    executeCTA(id, element) {
        if (!this.isLoaded || !this.ctaData || !this.ctaData[id]) {
            console.warn(`⚠️ CTAHandler: No se encontró configuración para el CTA "${id}".`);
            // Intentar usar el href original si existe como respaldo
            const originalHref = element.getAttribute('href');
            if (originalHref && originalHref.startsWith('mailto:')) {
                window.location.href = originalHref;
            }
            return;
        }

        const config = this.ctaData[id];
        const subject = encodeURIComponent(config.subject);
        const body = encodeURIComponent(config.body);
        const mailtoLink = `mailto:${config.email}?subject=${subject}&body=${body}`;

        // Efecto WOW: Animación de feedback visual antes de abrir el correo
        this.animateFeedback(element);

        // Pequeño delay para dejar que la animación brille
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 300);
    }

    animateFeedback(element) {
        const originalContent = element.innerHTML;
        const feedbackColor = 'var(--brand-gold-dark)'; // Brand Gold

        element.style.transform = 'scale(0.95)';
        element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Si el elemento tiene un icono de Lucide, podemos hacerlo brillar
        const icon = element.querySelector('i[data-lucide], svg');
        if (icon) {
            icon.style.filter = `drop-shadow(0 0 8px ${feedbackColor})`;
            icon.style.color = feedbackColor;
        }

        setTimeout(() => {
            element.style.transform = 'scale(1.05)';
        }, 100);

        setTimeout(() => {
            element.style.transform = '';
        }, 400);
    }
}

// Auto-instanciar globalmente
window.ctaHandler = new CTAHandler();
