# MetodologIA Animation Library

## Micro-animations

### Pulse

```css
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
```

### Float

```css
.float {
    animation: float 3s ease-in-out infinite;
}
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
```

## Hover Effects

### Hover Lift

```css
.hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

### Hover Glow

```css
.hover-glow:hover {
    box-shadow: 0 0 30px var(--brand-gold-glow);
}
```

## Entrance Animations

### Fade In Up

```css
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

### Staggered Entrance

```css
.stagger-in:nth-child(1) { animation-delay: 0.1s; }
.stagger-in:nth-child(2) { animation-delay: 0.2s; }
.stagger-in:nth-child(3) { animation-delay: 0.3s; }
.stagger-in:nth-child(4) { animation-delay: 0.4s; }
```

## Premium Effects

### Shimmer Sweep

```css
@keyframes shimmerSweep {
    100% { transform: translateX(100%); }
}
```

### Glowing Border

```css
@keyframes borderGlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

### Mesh Gradient Move

```css
@keyframes meshMove {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.02); }
}
```

## Transition Standards

| Tipo | Duración | Easing |
| :--- | :--- | :--- |
| **Rápida** | 150ms | `ease-out` |
| **Normal** | 300ms | `ease` |
| **Smooth** | 500ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Slow** | 800ms | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

> **Referencia:** `estilos/vision.css`, `estilos/recursos.css`
