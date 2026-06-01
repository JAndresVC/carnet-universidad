---
name: Carné Digital ULACIT
description: Precision-crafted digital student ID generator — dark, official, precise.
colors:
  void-plum-deep:    "#060410"
  void-plum-body:    "#1a0d30"
  void-plum-card:    "#2C1B45"
  void-plum-rich:    "#3D2565"
  interface-violet:  "#7C5DC8"
  soft-lavender:     "#a78bfa"
  lavender-frost:    "#F0EBF8"
  validity-amber:    "#c8a84c"
  text-white:        "#FFFFFF"
  icon-blue:         "#5B55D6"
  icon-green:        "#2EBD6E"
  icon-lime:         "#7CC840"
  icon-orange:       "#F07840"
  error-rose:        "#f87171"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
  card-name:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.2px"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "7.5px"
    fontWeight: 700
    letterSpacing: "1.4px"
    lineHeight: 1
rounded:
  xs:   "4px"
  sm:   "6px"
  md:   "8px"
  lg:   "12px"
  xl:   "16px"
  card: "18px"
  pill: "50px"
spacing:
  xs:  "4px"
  sm:  "8px"
  md:  "12px"
  lg:  "16px"
  xl:  "20px"
  xxl: "28px"
components:
  button-primary:
    backgroundColor: "{colors.lavender-frost}"
    textColor: "{colors.void-plum-card}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
  button-primary-hover:
    backgroundColor: "{colors.text-white}"
    textColor: "{colors.void-plum-card}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
  button-login:
    backgroundColor: "#5B3A9E"
    textColor: "{colors.text-white}"
    rounded: "{rounded.md}"
    padding: "13px 14px"
  button-login-hover:
    backgroundColor: "#6d49b8"
    textColor: "{colors.text-white}"
    rounded: "{rounded.md}"
    padding: "13px 14px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "{colors.text-white}"
    rounded: "{rounded.md}"
    padding: "11px 20px"
  input-default:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "{colors.text-white}"
    rounded: "{rounded.md}"
    padding: "7px 9px"
  input-focus:
    backgroundColor: "rgba(255,255,255,0.08)"
    textColor: "{colors.text-white}"
    rounded: "{rounded.md}"
    padding: "7px 9px"
  nav-link:
    textColor: "rgba(255,255,255,0.38)"
    typography: "{typography.body}"
    padding: "6px 14px"
  nav-link-active:
    textColor: "{colors.text-white}"
    typography: "{typography.body}"
    padding: "6px 14px"
---

# Design System: Carné Digital ULACIT

## 1. Overview

**Creative North Star: "The Carbon Copy"**

Precision-made replica of something institutional, hand-crafted. The interface exists to produce one artifact: a document that looks indistinguishable from an official institutional credential. Every UI decision defers to the card. Surrounding chrome dissolves into the near-black background, leaving only the card as a three-dimensional object suspended in darkness.

The system runs on two opposing forces held in deliberate tension: the near-void background eliminates all visual noise, while the card itself is richly crafted — gradient depth, shadow, micro-detail in typography, a gold validity date, the ULACIT colorbar as a precise institutional signal. The darkness is the silence that makes the card speak.

This system explicitly rejects: government-portal stiffness (heavy borders, bureaucratic form grids); Bootstrap default (undesigned scaffolding, visible framework bones); generic SaaS purple (the kind saturating dashboards and landing pages everywhere).

**Key Characteristics:**
- Near-void backgrounds make the card the only foreground object
- Two-layer logic: the page is infrastructure, the card is product
- System sans at every scale — no decorative typefaces, no expressive weight shifts outside the card
- Labels reduced to near-invisible status markers (ALL CAPS, tiny, 35–38% opacity)
- Interactions feel mechanical: crisp focus states, direct 0.15–0.2s transitions, no bounce or elastic

## 2. Colors: The Void Plum Palette

A near-monochromatic dark system where the only breaks in the violet family are purposeful: gold for institutional authority, lavender for interaction, rose for errors.

### Primary
- **Void Plum Deep** (`#060410`): The absolute background floor. Body ambient (`#1a0d30`) fades toward this at radial center. Tinted just enough toward violet that it reads as belonging to the system, not as generic black.
- **Void Plum Card** (`#2C1B45`): The card's gradient anchor and the primary dark surface. Also the text color on Lavender Frost buttons — completing the chromatic inversion.
- **Void Plum Rich** (`#3D2565`): Card gradient midpoint. Creates the subtle three-dimensional depth illusion in the card face.

### Secondary
- **Interface Violet** (`#7C5DC8`): The functional accent. Field labels on the card, nav active bottom border, input focus borders. Used at reduced opacity (22–60%) everywhere it appears as a structural signal — border, glow, ring. Never fills a large surface.
- **Soft Lavender** (`#a78bfa`): The interactive accent across the free generator — active font button, selected barra option, active nav link indicator. Higher luminance than Interface Violet; more readable on dark backgrounds.

### Tertiary
- **Validity Amber** (`#c8a84c`): The card's validity date text. The only warm-hue break in the entire system. Its rarity is the signal.
- **Error Rose** (`#f87171`): Error states in the login form. Warm-pink rather than saturated red; reads on dark surfaces without shouting.

### Neutral
- **Lavender Frost** (`#F0EBF8`): Tinted off-white. The primary action button background, badge text background. The violet tint keeps it from floating disconnected off the dark surface.
- **Text White** (`#FFFFFF`): Primary text on all dark surfaces — card field values, nav active links, button text on purple fills.

### Brand
- **Icon Quad** (`#5B55D6` / `#2EBD6E` / `#7CC840` / `#F07840`): The four ULACIT institutional colors. Appear only in the logo quad SVG and the ULACIT-mode colorbar. Highly saturated — they are the institution's identity, not this system's tokens.

### Named Rules
**The Amber Lock Rule.** Validity Amber (`#c8a84c`) appears on exactly one element in the entire system: the card's validity date text. Adding it anywhere else destroys the scarcity signal that gives it authority. Prohibited.

**The Quad Separation Rule.** The four ULACIT icon colors are brand property, not design system tokens. Use them only in the logo SVG and the ULACIT colorbar. Never as button fills, badge backgrounds, or hover states.

## 3. Typography

**Font:** System UI stack everywhere — `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif`. No custom typeface loaded. The tool lives on iPhone; SF Pro Display at HiDPI has precision optical hinting that no web font matches at card export resolution.

**Character:** A single voice at different scales. Weight contrast carries the entire hierarchy — 800 and 500 weight of the same family are visually distinct instruments. No font switching; no decorative type.

### Hierarchy
- **Headline** (700, 18–20px, lh 1.3): Login page title, page-level headings. The largest type in the system. Used sparingly — rarely appears outside the login screen.
- **Card Name** (800, 16px, lh 1.2, ls 0.2px): The card's student name field. Smaller than Headline but heavier — 800 weight compensates for size, making it feel authoritative on the card face. Tightest leading in the system.
- **Title** (700, 14px, lh 1.25): Card field values, form input text, ID number. `font-variant-numeric: tabular-nums` on numerical fields for consistent digit width.
- **Body** (500–600, 12–13px, lh 1.5): Button labels, nav links. The floor of legible UI chrome.
- **Label** (700, 7.5–10px, lh 1, ls 1.3–1.8px, ALL CAPS): Card field labels, form section headers, badge text. At this scale, uppercase + tight tracking does all the structural work. Never used for body content — labels only.

### Named Rules
**The Weight-Only Hierarchy Rule.** All type is from the same family at every scale. Distinguish levels through size and weight, never through font switching. A serif accent, display typeface, or mono body would break the system's precision character.

## 4. Elevation

Two-tier model: everything flat except the card, which floats.

**Tier 0 — Flat:** All UI chrome. Nav, form panels, buttons, inputs, overlays. No `box-shadow`. Depth is created through background-opacity layering (RGBA values from 4% to 90%) and hair-thin border opacity (8–25%). The dark surface reads as layered without needing light to cast a shadow.

**Tier 1 — Floating Card:** The ID card only. `box-shadow: 0 20px 50px rgba(44,27,69,0.6), 0 4px 16px rgba(0,0,0,0.5)`. The outer glow is violet-tinted (matching the card's gradient color), the tight inner shadow is neutral-dark. Together they create the illusion of a physical object resting above the surface.

### Shadow Vocabulary
- **Card Float** (`0 20px 50px rgba(44,27,69,0.6), 0 4px 16px rgba(0,0,0,0.5)`): Reserved for the ID card exclusively. The violet-tinted outer glow ties the shadow to the card's own color; a neutral grey shadow would break the coherence.
- **Wallet Panel Blur** (`backdrop-filter: blur(10px)`): Used on the wallet instructions panel only. Tonal depth through blur, not shadow.

### Named Rules
**The Card-Only Float Rule.** The `box-shadow` float treatment is exclusive to the ID card. All other surfaces — form panels, dropdowns, tooltips, modals — must use opacity-layered backgrounds instead. If you reach for `box-shadow` on anything other than the card, stop.

## 5. Components

### Buttons
Two moods. The primary action (download PNG) is a pale pill — near-white against near-black, maximum contrast, impossible to miss. The login/form primary is a filled purple rectangle — assertive, full-width, belongs to the form grid.

- **Shape:** 50px radius (pill) for download/action buttons; 8–10px radius for login and within-form actions
- **Primary (Download):** Lavender Frost (`#F0EBF8`) background, Void Plum Card text. Padding 11px 20px. Hover: brightens to pure `#FFFFFF`, lifts 1px with `translateY(-1px)`.
- **Login / Form Primary:** Mid Violet (`#5B3A9E`) background, white text. Full-width, 10px radius, 13px padding. Hover: lightens to `#6d49b8`, lifts 1px.
- **Ghost:** `rgba(255,255,255,0.06)` background, `rgba(255,255,255,0.12)` border, white text. Secondary actions (Apple Wallet trigger, nav logout). Hover: background lifts to `rgba(255,255,255,0.10)`.
- **Destructive Ghost (Reset):** `rgba(255,255,255,0.04)` background, `rgba(255,255,255,0.10)` border, `rgba(255,255,255,0.35)` text. Hover: tints to `rgba(255,59,59,0.08)` background, `rgba(255,59,59,0.30)` border, rose text. Never uses a filled red background — the ghost treatment contains the destruction signal.

### Inputs / Fields
Recessed into the page — low-opacity surface with hair-thin border, nearly invisible at rest.

- **Style:** `rgba(255,255,255,0.06)` background, `rgba(255,255,255,0.12)` border, 8–10px radius, 7–12px padding
- **Placeholder:** `rgba(255,255,255,0.20–0.30)` — deliberately faint; the field looks empty at rest
- **Focus:** Border shifts to `rgba(124,93,200,0.55–0.60)` (Interface Violet tinted), background lifts to `rgba(255,255,255,0.08–0.09)`. No glow ring, no blur, no `box-shadow`. Transition: 0.2s.
- **Error:** Border turns `#f87171`. Background unchanged. No filled background on error.

### Navigation
- **Style:** 52px sticky bar, `#1a0d30` background (slightly lighter than page body — a tonal step, not a color shift), 1px bottom border at `rgba(124,93,200,0.25)`.
- **Links:** 13px, 500 weight. Default `rgba(255,255,255,0.38)`. Hover `rgba(255,255,255,0.70)`. Active `#FFFFFF` with 2px `#a78bfa` bottom border.
- **Active indicator:** Soft Lavender (`#a78bfa`) — higher luminance than Interface Violet, reads cleanly on the nav background.
- **Brand:** Logo quad SVG + "ULACIT" at 15px/700, subtitle "carnés digitales" at 10px/`rgba(255,255,255,0.40)`.
- **Logout:** Ghost style (8px radius, 12px text). No prominent styling — it should feel like a structural affordance, not an invitation.

### Form Panels
- **Background:** `#1a0d30` — same as nav, forming a unified dark surface language
- **Border:** 1px `rgba(124,93,200,0.22)` — barely-visible violet tint, just enough to define the boundary
- **Radius:** 12px
- **Internal padding:** 16px
- **Section headers:** 10px, 700, ALL CAPS, 1.5px letter-spacing, `rgba(255,255,255,0.38)` — markers not headings

### ID Card (Signature Component)
The system's primary artifact. Every other decision serves this component.

- **Dimensions:** 400×252px (landscape, credit-card proportions). Mobile: `calc(100vw - 32px)` with aspect ratio `400/252` preserved.
- **Background:** `linear-gradient(145deg, #2C1B45 0%, #3a2260 40%, #3D2565 100%)`
- **Overlay sheen:** `linear-gradient(165deg, rgba(255,255,255,0.07) 0%, transparent 45%)` on a `::before` — subtle upper-left gloss
- **Radius:** 18px default; 28px (very rounded) and 6px (square) as generator variants
- **Shadow:** Card Float treatment only. Never modified.
- **Colorbar:** 5px bottom strip. ULACIT variant: hard-stop 4-color gradient (icon-blue / icon-green / icon-lime / icon-orange). Free generator: solid accent, accent gradient, rainbow, or none.
- **Background pattern:** 4% opacity white SVG geometric overlay. On by default in ULACIT generators. Toggleable in free generator. Never increase opacity above 4%.

### Badge Pill
- **Style:** Lavender Frost (`#F0EBF8`) background, Void Plum Card (`#2C1B45`) text
- **Typography:** 8px, 700, ALL CAPS, 1.8px letter-spacing
- **Radius:** 20px (full pill)
- **Padding:** 4px 10px
- Reserved for institution type label ("ESTUDIANTE", "INSTITUCIÓN") in the card header only.

## 6. Do's and Don'ts

### Do:
- **Do** use the `#1a0d30` → `#060410` background spectrum. The near-void body makes the card float.
- **Do** keep Validity Amber (`#c8a84c`) on the card date field exclusively — one token, one purpose.
- **Do** use opacity-layered surfaces (`rgba(255,255,255,0.04–0.10)`) for all UI panels. The only opaque dark fill outside the card is `#1a0d30` for nav and form panels.
- **Do** apply the Card Float shadow (`0 20px 50px rgba(44,27,69,0.6), 0 4px 16px rgba(0,0,0,0.5)`) to the ID card exclusively.
- **Do** write all labels at ALL CAPS with 1.3–1.8px letter-spacing. Lowercase at 7–10px dissolves into the background.
- **Do** use Soft Lavender (`#a78bfa`) for interactive active states (nav indicator, selected segment, active font button). Never as a background fill on surfaces larger than the active indicator.
- **Do** use `font-variant-numeric: tabular-nums` on the ID number and any field displaying numerical codes for consistent column alignment.
- **Do** keep all transitions between 0.15s and 0.2s. The system feels mechanical, not animated.

### Don't:
- **Don't** use heavy borders, stiff form grids, or side-stripe accent borders. This is not a government portal.
- **Don't** use Bootstrap-default aesthetics — visible scaffolding, generic rounded rectangles with flat-blue fills, unstyled form chrome.
- **Don't** use generic SaaS purple — light purple on white, hero sections with big stat numbers, identical card grids.
- **Don't** apply `box-shadow` to anything except the ID card. Form panels, buttons, inputs: flat, always.
- **Don't** use gradient text (`background-clip: text` + gradient). The Validity Amber is a solid color; the constraint is the point.
- **Don't** use the ULACIT icon quad colors (`#5B55D6`, `#2EBD6E`, `#7CC840`, `#F07840`) as UI chrome. They are institutional brand colors, not system tokens.
- **Don't** add a second `box-shadow` to the card or modify the existing violet-tinted outer glow. The dual-shadow treatment is complete as-is.
- **Don't** lower the card's background opacity. The card is the export artifact; it must be fully opaque.
- **Don't** use saturated red (`#ef4444` or similar) for errors. Error Rose (`#f87171`) is the correct value — softer on dark backgrounds, avoids the alarm-red register.
- **Don't** increase the background pattern SVG opacity above 4%. It is a texture, not a visible graphic element.
