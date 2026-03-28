# Sistema de Precios y Moneda (v1.0.0)

Este documento define la regla de negocio única y la implementación técnica para el manejo de precios y conversión de moneda en el ecosistema MetodologIA.

## 1. Regla de Oro (Golden Rule)

> **Tasa de Cambio Fija:** `1 USD = 3500 COP`

Esta tasa se utiliza para todas las estimaciones visuales en el sitio web. No es una tasa en tiempo real, es una **constante de negocio** para mantener consistencia en la comunicación de valor.

## 2. Implementación Técnica

### 2.1 Fórmula de Conversión
```javascript
const COP_AMOUNT = 1000000;
const USD_RATE = 3500;
const USD_AMOUNT = Math.round(COP_AMOUNT / USD_RATE);
```

### 2.2 Snippet de Calculadora (JS)
Para secciones como `ruta/index.html` donde se requiere cálculo dinámico:

```javascript
// Data Formatting
function formatMoney(amount, showUSD = true) {
    // 1. Format COP with Spanish locale
    const copFormatted = '$' + amount.toLocaleString('es-CO', { maximumFractionDigits: 0 });
    
    if (!showUSD || amount === 0) return copFormatted;
    
    // 2. Calculate USD (Golden Rule)
    const usd = Math.round(amount / 3500);
    const usdFormatted = usd.toLocaleString('en-US', { maximumFractionDigits: 0 });
    
    // 3. Return HTML String with visual hierarchy
    return `${copFormatted} <span class="text-[10px] text-slate-500 font-normal">~$${usdFormatted} USD</span>`;
}
```

### 2.3 Etiquetas Estáticas (HTML)
Para landing pages donde el precio es fijo (ej. `vision.html`), se debe "quemar" el valor calculado manualmente siguiendo la regla.

**Ejemplo:**
- Precio Base: $18.000.000 COP
- Cálculo: 18,000,000 / 3,500 = 5,142.85 -> $5,143 USD

```html
<div class="price-tag">
    $18.000.000 <span class="currency">COP</span>
    <span class="usd-estimate">~$5,143 USD</span>
</div>
```

## 3. Casos de Uso
1.  **Listas de Precios B2B/B2C**: Mostrar siempre ambas monedas.
2.  **Calculadoras de Presupuesto**: El total debe actualizarse en ambas monedas.
3.  **Modales de Pago/Cotización**: La cotización final se envía en COP, la referencia USD es informativa.
