# Design System Document: The Monolith Editorial

 

## 1. Overview & Creative North Star

**Creative North Star: "The Kinetic Gallery"**

This design system moves beyond the "wireframe" utility to create a high-end, editorial fitness experience. The goal is to treat athlete data and workout content as high-art. By stripping away the "noise" of traditional UI—borders, heavy shadows, and saturated colors—we create a focused, high-performance environment. We utilize **intentional asymmetry**, where large display typography anchors the layout, and content "breathes" through expansive white space. The result is a system that feels authoritative, silent, and premium.

 

---

 

## 2. Colors: Tonal Depth & The "No-Line" Rule

The palette is strictly grayscale, but it is never "flat." We use tonal shifts to define architecture.

 

### The "No-Line" Rule

**Explicit Instruction:** 1px solid borders are prohibited for sectioning. Separation of concerns must be achieved through background color shifts. A `surface-container-low` section sitting on a `surface` background is the only acceptable way to define a layout block. 

 

### Surface Hierarchy & Nesting

Treat the UI as a series of stacked, physical layers. 

- **Base Layer:** `surface` (#f9f9f9) for the global canvas.

- **Sectioning:** Use `surface-container` (#eeeeee) for large content blocks.

- **The Nested Card:** An inner card should use `surface-container-lowest` (#ffffff) to "pop" against a `surface-container` background.

 

### Glass & Gradient Rule

To provide "soul" to the grayscale, main CTAs (using `primary` #000000) should possess a subtle, nearly imperceptible gradient transitioning to `primary-container` (#3b3b3b). Floating navigation bars or top-level headers should utilize **Glassmorphism**: 

- **Fill:** `surface` at 80% opacity.

- **Effect:** 16px Backdrop Blur. 

This ensures the UI feels integrated and architectural rather than a series of disconnected boxes.

 

---

 

## 3. Typography: Editorial Authority

We use a dual-font strategy to balance performance (Inter) with personality (Lexend).

 

| Level | Token | Font | Size | Weight/Notes |

| :--- | :--- | :--- | :--- | :--- |

| **Display** | `display-lg` | Lexend | 3.5rem | Tight tracking (-2%). Use for PRs/Big Stats. |

| **Headline** | `headline-lg` | Lexend | 2.0rem | Bold. The primary anchor for page titles. |

| **Title** | `title-lg` | Inter | 1.375rem | Medium. For card titles and section headers. |

| **Body** | `body-md` | Inter | 0.875rem | Regular. Optimized for workout instructions. |

| **Label** | `label-md` | Inter | 0.75rem | All-caps, tracked out +10% for metadata. |

 

**Editorial Hierarchy:** Always pair a `display-lg` metric (e.g., "245 lbs") with a `label-md` descriptor ("SQUAT MAX"). The contrast between the heavy Lexend and the light Inter creates the "high-end" feel.

 

---

 

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are a last resort. Depth is a product of tone and blur.

 

*   **The Layering Principle:** Achieve lift by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural, soft lift.

*   **Ambient Shadows:** If a floating action button (FAB) or modal requires a shadow, use a "Large/Soft" approach: `Y: 24px, Blur: 48px, Color: on-surface (4% opacity)`. It should look like a soft glow of light, not a "drop shadow."

*   **The Ghost Border:** If a border is required for input accessibility, use `outline-variant` (#c6c6c6) at **20% opacity**. Never use a 100% opaque border.

*   **Glassmorphism:** Use semi-transparent layers for elements that scroll over content. This maintains the "Kinetic" nature of the fitness app, letting the user see the "ghost" of their workout data beneath the navigation.

 

---

 

## 5. Components: Minimalist Primitives

 

### Buttons

*   **Primary:** Solid `primary` (#000000). Corner radius: `md` (0.375rem). Text: `on-primary` (#e2e2e2). 

*   **Secondary:** Ghost style. No background. `outline` (#777777) at 20% opacity border.

*   **Tertiary:** Text-only. `on-surface` (#1a1c1c) bold.

 

### Cards & Lists

*   **Prohibition:** No divider lines between list items. 

*   **The Solution:** Use 16px or 24px of vertical white space from the 8px grid system. For lists, use alternating `surface` and `surface-container-low` backgrounds to create a "Zebra" stripe effect that is modern and clean.

 

### Input Fields

*   **Outlined Style:** Use the `Ghost Border` (20% opacity `outline-variant`). 

*   **Active State:** The border transitions to 100% `primary` (#000000) but stays at 1px thickness. No heavy "glow" effects.

 

### Fitness-Specific Components

*   **Progress Rings:** Use `primary` (#000000) for the progress and `surface-container-highest` (#e2e2e2) for the track.

*   **The "Split-Hero" Metric:** A full-width `surface-container-highest` block at the top of the screen featuring a `display-lg` stat aligned to the left, with body text pushed to the far right. This intentional asymmetry breaks the "mobile template" feel.

 

---

 

## 6. Do's and Don'ts

 

### Do

*   **Do** use extreme vertical spacing. If you think there’s enough space, add 8px more.

*   **Do** use `lexend` for anything that needs to feel "heavy" or "strong" (weights, reps, times).

*   **Do** use `surface-container` tiers to group related exercises without drawing boxes around them.

 

### Don't

*   **Don't** use 1px solid black lines. It makes the app look like a literal wireframe rather than a finished product.

*   **Don't** use standard Material shadows. They are too "software-heavy" for this editorial look.

*   **Don't** use icons with fills. Use "Outlined" or "Lightweight" icon sets to match the clean Inter typography.

*   **Don't** center-align everything. Use left-aligned headlines with right-aligned metadata to create sophisticated visual tension.
