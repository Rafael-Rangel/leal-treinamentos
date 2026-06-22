---
name: Industrial Authority
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dadf'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#ebeef3'
  surface-container-high: '#e5e8ee'
  surface-container-highest: '#e0e3e8'
  on-surface: '#181c20'
  on-surface-variant: '#5b403f'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eef1f6'
  outline: '#8f6f6e'
  outline-variant: '#e4bebc'
  surface-tint: '#bb152c'
  primary: '#b7102a'
  on-primary: '#ffffff'
  primary-container: '#db313f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b1'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed023'
  on-secondary-container: '#6f5900'
  tertiary: '#4c5d75'
  on-tertiary: '#ffffff'
  tertiary-container: '#64768f'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#ffe084'
  secondary-fixed-dim: '#eec209'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#d3e4ff'
  tertiary-fixed-dim: '#b6c8e4'
  on-tertiary-fixed: '#091c32'
  on-tertiary-fixed-variant: '#36485f'
  background: '#f7f9ff'
  on-background: '#181c20'
  surface-variant: '#e0e3e8'
  surface-light: '#F8F9FA'
  pure-white: '#FFFFFF'
  navy-authority: '#1A2C42'
typography:
  display-hero:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 20px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap-lg: 120px
  section-gap-md: 80px
  stack-sm: 8px
  stack-md: 16px
---

## Brand & Style

This design system is engineered to project a sense of **unshakeable authority, technical excellence, and uncompromising safety**. Designed for a premium corporate audience in the industrial training sector, the aesthetic balances the raw energy of high-stakes environments with the polished sophistication of a Tier-1 consultancy.

The visual style is **Corporate Minimalism** infused with **High-Contrast Boldness**. It utilizes generous whitespace to signify high-value content, ensuring that dense technical information feels breathable and accessible. The interface should feel "robust" rather than "delicate," employing high-fidelity photorealistic imagery of industrial settings to ground the digital experience in physical reality. We avoid amateur aesthetics by using cinematic lighting, consistent color temperatures, and precise structural alignment.

## Colors

The color palette is rooted in industrial safety and corporate power. 

- **Primary (Alert Red):** Reserved strictly for high-priority Call to Action (CTA) elements and critical highlights. It signals urgency and importance.
- **Secondary (Safety Yellow):** Used sparingly for status indicators, ratings, and secondary accents that require attention without the urgency of red.
- **Tertiary (Navy Deep):** Utilized for premium content blocks and high-authority sections to provide a sophisticated alternative to pure black.
- **Neutral (Deep Charcoal):** The foundation for typography and structural elements, providing a softer, more modern alternative to #000000.
- **Backgrounds:** We utilize a "layered white" approach, alternating between `#FFFFFF` for primary content and `#F8F9FA` for secondary sections to create a subtle visual rhythm.

## Typography

Typography is a key driver of the "Corporate/Robust" narrative. **Montserrat** is used for all headlines; its geometric stability and heavy weight (ExtraBold/Bold) convey strength and reliability. For body copy and functional elements, **Inter** provides high legibility and a clean, technical feel.

Ensure a clear hierarchy by utilizing `display-hero` for main landing sections and `headline-md` for cards. Captions should be set to 70% opacity of the parent text color to maintain a refined visual hierarchy.

## Layout & Spacing

This design system uses a **12-column fluid grid** constrained by a maximum width of 1200px. This ensures optimal readability on ultra-wide monitors while maintaining a tight, professional structure.

- **Vertical Rhythm:** We utilize significant vertical padding (80px to 120px) between sections to emphasize the "Minimalist" and "Premium" nature of the brand.
- **Breakpoints:**
  - **Desktop (1200px+):** 12 columns, 80px margins.
  - **Tablet (768px - 1199px):** 8 columns, 40px margins.
  - **Mobile (< 767px):** 4 columns, 20px margins.
- **Alignment:** All content follows a strict grid alignment. Text-heavy technical sections should use a max-width of 8 columns within the 12-column grid to prevent excessively long line lengths.

## Elevation & Depth

To signify authority and modernity, we employ a **Tonal Layering** approach supplemented by **Glassmorphism**.

1.  **Surface Tiers:** Primary content sits on the base surface. Secondary information (like course filters or sidebars) uses the `surface-light` tone to create a subtle lift.
2.  **Interactive Depth:** Elements like course cards are flat by default with a low-contrast outline. Upon `hover`, they transition to an elevated state using a diffused, low-opacity ambient shadow (0px 10px 30px rgba(0,0,0,0.08)).
3.  **Hero Overlays:** To ensure legibility over high-fidelity imagery, use a linear gradient mask starting from `brand-dark` at 60% opacity at the base, fading to transparent.
4.  **Glassmorphism:** The sticky header should utilize a backdrop-blur (12px) with a semi-transparent white background (85% opacity) to maintain context of the content being scrolled.

## Shapes

The shape language is "Soft-Technical." We use a standard **8px (rounded-lg)** radius for most containers and buttons. This provides a modern, approachable feel without the "playfulness" of pill shapes.

For more technical elements, such as form inputs and utility tags, we reduce the radius to **4px** to evoke a sharper, more precise instrument-like quality. Profile images and student testimonials use **Circular (50%)** crops to provide a human contrast to the otherwise geometric layout.

## Components

- **Buttons:** 
  - **Primary:** Solid `red-alert` background with white `label-md` text. 8px radius.
  - **Secondary:** Outlined with a 2px stroke of `red-alert` or `pure-white` (on dark backgrounds). 
  - **Interaction:** On hover, primary buttons should scale 2% and slightly darken.
- **Input Fields:** 4px radius with a 1px border of `#DEE2E6`. On focus, the border shifts to `navy-authority`.
- **Cards:** Default state has a 1px border in `gray-light`. Hover state removes the border in favor of the diffused shadow defined in Elevation.
- **Chips/Badges:** Use `gray-light` backgrounds for standard labels and `yellow-safety` with charcoal text for "High Demand" or "Certification" tags. 
- **Floating Action Button (FAB):** A circular WhatsApp button in the bottom-right corner, utilizing the brand's green or `red-alert` to ensure visibility.
- **Navigation:** The sticky header uses `label-md` for links with an animated underline transition that expands from the center on hover.