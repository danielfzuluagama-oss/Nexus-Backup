---
name: responsive-design
author: JM Labs (Javier Montaño)
version: 1.0.0
description: >
  Implements responsive web design with mobile-first breakpoints, fluid
  typography, container queries, and adaptive layouts using CSS Grid
  and Flexbox patterns.
  Trigger: "responsive", "breakpoints", "fluid typography", "container queries", "mobile-first"
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
---

# Responsive Design

> "Content is like water. If you put water into a cup, it becomes the cup." — Josh Clark

## TL;DR

Implements responsive web design using mobile-first breakpoints, fluid typography with clamp(), container queries, and modern CSS layout with Grid and Flexbox. Use this skill when building layouts that must work across devices, implementing design system breakpoints, or optimizing existing pages for mobile.

## Procedure

### Step 1: Discover
- Identify target devices and viewport ranges from analytics
- Review design mockups for responsive behavior annotations
- Audit existing breakpoint system and responsive patterns in codebase
- Check for device-specific features: touch, hover, reduced motion

### Step 2: Analyze
- Define breakpoint strategy: mobile-first with min-width media queries
- Identify components that need container queries vs. viewport queries
- Plan fluid typography scale using clamp(min, preferred, max)
- Determine layout strategy per breakpoint: stack, sidebar, grid

### Step 3: Execute
- Implement mobile-first CSS with progressive enhancement at breakpoints
- Set up fluid typography: `font-size: clamp(1rem, 0.5rem + 1.5vw, 1.5rem)`
- Use CSS Grid for page-level layouts, Flexbox for component-level
- Implement container queries for truly reusable responsive components
- Handle responsive images: srcset, sizes, picture element, art direction
- Test touch targets meet minimum 44x44px accessibility requirement

### Step 4: Validate
- Test on real devices, not just browser resize (touch behavior differs)
- Verify no horizontal scroll at any breakpoint
- Confirm text remains readable without zoom at all sizes
- Check that interactive elements are touch-friendly on mobile

## Quality Criteria

- [ ] Mobile-first approach with min-width breakpoints
- [ ] Fluid typography using clamp() for smooth scaling
- [ ] No horizontal scroll at any viewport width
- [ ] Touch targets meet 44x44px minimum on mobile
- [ ] Evidence tags applied to all claims

## Anti-Patterns

- Desktop-first design with max-width breakpoints patching mobile
- Fixed pixel values instead of relative units (rem, em, %)
- Hiding content on mobile instead of redesigning the layout

## Related Skills

- `css-architecture` — CSS methodology supporting responsive patterns
- `design-system` — design tokens for responsive breakpoints and spacing
- `accessibility-design` — responsive design intersects with accessible design
