# Layout Patterns Standard

Reusable layout patterns for content sections featuring text + visual columns.

---

## Core Principle: Zigzag Pattern

> **Alternating text/visual placement creates visual rest** for the reader and improves content digestion.

```
Section 1: [Text] [Visual]  ← Text left
Section 2: [Visual] [Text]  ← Text right (zigzag)
Section 3: [Text] [Visual]  ← Text left
Section 4: [Visual] [Text]  ← Text right (zigzag)
```

---

## Implementation

### Pattern A: Text Left, Visual Right
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <!-- Text Column (first on mobile, first on desktop) -->
    <div class="order-1 lg:order-1">
        <!-- Badge, Title, Description -->
    </div>
    <!-- Visual Column (second on mobile, second on desktop) -->
    <div class="order-2 lg:order-2">
        <!-- Card, Diagram, Image -->
    </div>
</div>
```

### Pattern B: Visual Left, Text Right (Zigzag)
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <!-- Visual Column (second on mobile, first on desktop) -->
    <div class="order-2 lg:order-1">
        <!-- Card, Diagram, Image -->
    </div>
    <!-- Text Column (first on mobile, second on desktop) -->
    <div class="order-1 lg:order-2">
        <!-- Badge, Title, Description -->
    </div>
</div>
```

---

## Section Layout Inventory

| Section | Layout | Pattern |
|:--------|:-------|:--------|
| s0-hero | Full-width | Special |
| s1-brecha | Text ← Visual | A |
| s2-trap | Visual ← Text | **B (zigzag)** |
| s3-posibilidades | Centered | Special |
| s4-pivote | Full-width tabs | Special |
| s5-solution | Text ← Visual | A |
| s6-exito | Centered | Special |
| s7-servicios | Grid cards | Special |

---

## Key Rules

1. **Mobile First**: On mobile, text always appears first (`order-1`), visual second (`order-2`)
2. **Desktop Zigzag**: On desktop (`lg:`), alternate between text-left and text-right
3. **Visual Weight**: Visual column should contain the section's "hero highlight" element
4. **Consistent Gaps**: Use `gap-16` for 2-column layouts
5. **Alignment**: Use `items-center` for vertical centering

---

## Quick Reference

| Position | Text Order | Visual Order |
|:---------|:-----------|:-------------|
| Text Left (A) | `order-1 lg:order-1` | `order-2 lg:order-2` |
| Text Right (B) | `order-1 lg:order-2` | `order-2 lg:order-1` |
