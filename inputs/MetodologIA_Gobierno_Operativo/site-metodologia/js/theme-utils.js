/**
 * MetodologIA Theme Utilities (v5.2)
 * Unified access to the 'Deep Soul' design tokens at runtime.
 */

const MetodologiaTheme = {
    /**
     * Fetches a token value from the CSS custom properties (:root).
     * @param {string} tokenName - The name of the token without the '--' prefix.
     * @returns {string} The computed value of the token.
     */
    getToken: (tokenName) => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(`--${tokenName}`).trim();
    },

    /**
     * Standard color shortcuts for high-frequency use.
     */
    colors: {
        gold: () => MetodologiaTheme.getToken('brand-gold'),
        bgBody: () => MetodologiaTheme.getToken('bg-body'),
        bgPrimary: () => MetodologiaTheme.getToken('bg-primary'),
        textSec: () => MetodologiaTheme.getToken('text-secondary')
    }
};

window.MetodologiaTheme = MetodologiaTheme;
console.log('💎 MetodologIA Theme Orchestrator (v5.2) Initialized.');
