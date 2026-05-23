# System Design — Hemang Sharma Portfolio

## Framework: Astro (not Next.js)

The portfolio is ~95% static content — bio, case studies, testimonials. Astro is the right call:

| Factor | Astro | Next.js | React SPA |
|---|---|---|---|
| JS shipped by default | 0kb | ~90kb | ~140kb |
| SEO (portfolio = discovery) | Native | Needs config | Poor |
| MDX for case studies | Built-in | Plugin | Plugin |
| Lighthouse score | 100 trivially | Needs tuning | Hard |
| Routing | File-based, perfect fit | Overkill | Manual |

Use **React islands** (via `client:visible`) only where you need interactivity — the testimonial section, the spiral logo animation, scroll reveals. Everything else ships as plain HTML.

Deploy to **Vercel** or **Cloudflare Pages** (free, CDN-edge, perfect for a static portfolio).

---

## Styling: Tailwind CSS v4

Tailwind v4 is CSS-first — design tokens live in `@theme {}` as CSS custom properties, which maps directly to what this design needs. No JS config file.

---

## Animation: Motion (formerly Framer Motion)

For:
- The spiral/looping `hmng shrma` logo mark in the footer (rotation on scroll)
- Scroll-triggered section reveals (`whileInView`)
- Project card hover lifts
- Page transition fades

Use `motion/react` — tree-shakable, so only what's used ships.

---

## Fonts

From the design the type system has three distinct roles:

```css
/* In @theme {} */

/* Display — large uppercase case study titles, section labels */
--font-display: 'Bricolage Grotesque', sans-serif;
/* → wide tracking, bold weight, slightly quirky — matches the condensed uppercase GINTAA DELIVERY APPLICATION */

/* Body — hero copy, testimonials, descriptions */
--font-body: 'DM Sans', sans-serif;
/* → warm, readable, humanist — matches the flowing paragraph text */

/* Mono — project numbers (01 02 03 04), tags */
--font-mono: 'DM Mono', monospace;
```

Install via `@fontsource` (self-hosted, no Google Fonts waterfall):

```
npm i @fontsource-variable/bricolage-grotesque @fontsource/dm-sans @fontsource/dm-mono
```

---

## Color Tokens

Extracted from the Home frame screenshot:

```css
@theme {
  /* Base */
  --color-ink:    #1E0D0D;   /* Primary dark — nav, footer, main bg */
  --color-cream:  #F4EDD9;   /* Warm off-white — text on dark, light bg */
  --color-muted:  #7A6363;   /* Secondary text, meta labels */

  /* Project card backgrounds — each case study has its own identity */
  --color-gintaa: #D4BF96;   /* Warm tan/beige */
  --color-fnol:   #4A2880;   /* Deep violet */
  --color-bosch:  #E8967A;   /* Burnt salmon */
  --color-bolna:  #192B1A;   /* Dark forest green */

  /* UI */
  --color-border-dark:  rgba(255 255 255 / 0.08);
  --color-border-light: rgba(30 13 13 / 0.12);
  --color-surface:      rgba(255 255 255 / 0.04); /* Subtle card lift on dark */
}
```

---

## Typography Scale

```css
@theme {
  --text-label:   0.9375rem; /* 15px — tags, project numbers */
  --text-body:    1.0625rem; /* 17px — paragraph copy */
  --text-body-lg: 1.3125rem; /* 21px — lead body, work experience */
  --text-h3:      1.75rem;   /* 28px — card sub-headings */
  --text-h2:      3rem;      /* 48px — FEATURED PROJECTS, TESTIMONIALS */
  --text-h1:      4.5rem;    /* 72px — hero display text */

  --leading-tight: 1.1;
  --leading-body:  1.6;
  --tracking-wide: 0.08em;   /* Uppercase labels */
  --tracking-tight: -0.02em; /* Display headings */
}
```

---

## Spacing & Layout Tokens

```css
@theme {
  --max-w-page:    90rem;    /* 1440px — canvas width */
  --px-page:       2.5rem;   /* 40px — outer side margin */
  --px-content:    4rem;     /* 64px — inner content padding */
  --card-h:        25rem;    /* 400px — project card height */
  --section-gap:   6rem;     /* gap between home sections */
}
```

---

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # nav + footer shell
├── pages/
│   ├── index.astro           # Home
│   ├── about.astro           # About
│   ├── projects/
│   │   ├── index.astro       # Projects listing
│   │   ├── gintaa.astro
│   │   ├── fnol.astro
│   │   ├── bosch.astro
│   │   └── bolna.astro
├── components/
│   ├── Nav.astro
│   ├── Footer.astro          # spiral logo lives here
│   ├── ProjectCard.astro     # themed by --color-[project]
│   ├── TagRow.astro          # "01 · Food Delivery · Mobile"
│   ├── ExperienceRow.astro
│   ├── TestimonialGrid.astro
│   └── LogoMark.tsx          # React island — animated spiral
├── styles/
│   └── tokens.css            # all @theme vars above
└── content/
    └── projects/             # MDX for case study long-form
        ├── gintaa.mdx
        ├── fnol.mdx
        ├── bosch.mdx
        └── bolna.mdx
```

---

## Full Dependency List

```json
{
  "dependencies": {
    "astro": "^5",
    "@astrojs/react": "^4",
    "@astrojs/mdx": "^4",
    "@astrojs/tailwind": "^5",
    "tailwindcss": "^4",
    "motion": "^11",
    "react": "^19",
    "react-dom": "^19",
    "@fontsource-variable/bricolage-grotesque": "*",
    "@fontsource/dm-sans": "*",
    "@fontsource/dm-mono": "*"
  }
}
```

---

## Decision Summary

| Decision | Choice | Reason |
|---|---|---|
| Framework | Astro | Static-first, zero JS default, perfect for portfolios |
| Styling | Tailwind v4 | CSS-first tokens, matches design system |
| Animation | Motion (Framer) | React island only where needed |
| Display font | Bricolage Grotesque | Wide, bold, quirky — matches the uppercase card titles |
| Body font | DM Sans | Warm humanist, matches the prose-heavy copy |
| Mono font | DM Mono | Labels, project numbers |
| Hosting | Vercel | Free, CDN-edge, Astro adapter zero-config |
