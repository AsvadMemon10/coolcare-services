# Design Brief — CoolCare Services

## Direction

**Cool Serene Premium** — Light, airy, professional AC service website with confident technician authority and spa-like calm aesthetic. Cool blue backbone suggests temperature control and reliability.

## Tone

Refined minimalism with human warmth. Strong commitment to cool blues (deep ocean primary) paired with crisp white space, avoiding corporate coldness while maintaining expert credibility.

## Differentiation

Floating "Book Service" button with smooth hover elevation. Service cards that lift subtly on interaction. Bold geometric typography (Space Grotesk) creates visual hierarchy without decoration.

## Color Palette

| Token      | OKLCH           | Role                                    |
| ---------- | --------------- | --------------------------------------- |
| background | 0.98 0.008 230  | Cool off-white, main page background    |
| foreground | 0.18 0.015 230  | Deep blue-grey, primary text            |
| card       | 1.0 0.004 230   | Pure white, elevated sections           |
| primary    | 0.42 0.14 240   | Deep ocean blue, trust & reliability    |
| accent     | 0.6 0.15 170    | Vibrant teal, CTAs & highlights         |
| muted      | 0.94 0.01 230   | Light grey-blue, secondary sections     |
| border     | 0.9 0.008 230   | Subtle separators                       |

## Typography

- Display: **Space Grotesk** — Modern, geometric, tech-forward. Hero headings, service titles.
- Body: **General Sans** — Clean, professional, highly readable. All paragraph text, labels, CTAs.
- Scale: Hero `text-5xl md:text-7xl font-bold`, section headings `text-3xl md:text-5xl font-bold`, labels `text-sm font-semibold uppercase tracking-widest`, body `text-base md:text-lg`

## Elevation & Depth

Layered surface hierarchy using subtle cool-toned shadows (blue opacity, not grey). Cards lift on hover without bulky effects. Header has soft border-bottom for zone separation.

## Structural Zones

| Zone           | Background        | Border           | Notes                                           |
| -------------- | ----------------- | ---------------- | ----------------------------------------------- |
| Header/Nav     | bg-card           | border-b         | Clean top navigation with brand                 |
| Hero Section   | bg-background     | —                | Full-width with dual CTA buttons                |
| Services       | bg-card           | —                | 5-card grid, alternating subtle backgrounds    |
| Why Choose     | bg-muted (20%)    | —                | 5-item grid, subtle background for contrast    |
| Contact        | bg-card           | border-t         | Phone, address, hours, footer alignment        |
| Floating BTN   | bg-accent         | —                | Fixed bottom-right, smooth animations           |

## Spacing & Rhythm

Section gaps `py-16 md:py-24`, card padding `p-6 md:p-8`, internal spacing with consistent 4px/8px micro-units. Generous negative space on mobile, denser on desktop. Alternating section backgrounds create visual rhythm.

## Component Patterns

- **Buttons**: Primary (blue bg, white text, rounded-md) with smooth hover transition. Secondary (teal accent, outlined). Floating button uses elevation shadow.
- **Cards**: `rounded-lg` (8px), `bg-card` with `shadow-subtle`, hover scales slightly and shadow elevates to `shadow-elevated`.
- **Badges/Pills**: Teal accent background, rounded-full, for service highlights.

## Motion

- **Entrance**: Cards slide-up on scroll with `animation-slide-up 0.3s ease-out`. Fade-in for text content.
- **Hover**: Button color shift + shadow elevation `transition-smooth`. Card lift via `translate-y-1` + shadow change.
- **Decorative**: Floating button subtle pulse on load (low-intensity, professional context).

## Constraints

- No gradients on text (readability first).
- Shadows always use cool blue tones, never grey.
- Border-radius consistent: `rounded-lg` (8px) for most elements, `rounded-md` (6px) for buttons, `rounded-full` for badges.
- Maximum two font weights per section (regular + bold).
- Mobile-first: all breakpoints use `sm:`, `md:`, `lg:` prefixes.
- No transparency tricks — maintain AA+ contrast always.

## Signature Detail

**Floating "Book Service" button** with dual-action micro-interaction: smooth hover lift (shadow elevation), subtle pulse on page load, opens modal with form. Occupies fixed position, never obscures critical content. Teal accent color separates it from primary blue UI, drawing focus.
