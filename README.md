# Scrapbook Portfolio — Design-System Recreation

A faithful **recreation of the layout, design language, and interactions** of a
scrapbook/travel-journal style product-design portfolio, rebuilt from scratch as a
modern **Next.js 16 + React 19 + Tailwind v4** app.

> **Content note:** This is the *design system* — layout, typography, color, motion,
> and component patterns — populated with **placeholder content** and **original,
> generic decorative artwork**. It intentionally does **not** copy the reference
> site's personal text, photographs, or hand-drawn illustrations. Swap in your own
> name, copy, images, and projects before publishing.

## Stack

- Next.js 16 (App Router, Turbopack, React Compiler)
- React 19 + TypeScript
- Tailwind CSS v4 (`@theme` tokens in `globals.css`)
- `next/font/google` for all typefaces

## Design tokens

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#171717` | page background |
| `coral` | `#e35342` | primary accent |
| `paper` / `paper-light` | `#f2e3cf` / `#f5ece3` | cream surfaces, notebook paper |
| `blue` / `green` | `#2164ff` / `#83b918` | small pops |

**Fonts:** DM Sans (body), JetBrains Mono (typewriter labels), Averia Serif Libre
(serif display), Gochi Hand (handwriting), Lilita One (poster display).

**Scrapbook primitives** (in `src/app/globals.css`): `.paper`, `.notebook`,
`.graph`, `.spiral-top`, `.sticker` (hover-lift cards), `.tape`, `.perf` (ticket
perforation), `.doodle-rail` (edge decorations), `.reveal` (scroll-in).

## Pages

| Route | Recreates |
| --- | --- |
| `/` | Hero postcard greeting + scattered device-mockup project grid |
| `/about` | Spiral-bound notebook bio + photo slots + energy/nerd-out postcards |
| `/work` | Luggage tag, wristband, event ticket, retro Mac, "Side Quests" notebook |
| `/case-studies/[slug]` | Templated case study (overview → problem → process → solution → outcome) |

## Develop

```bash
npm install
npm run dev      # http://localhost:3000 (or next free port)
npm run build    # production build — clean, 9 static routes
```

## Make it yours

1. **Text:** search for `[your name]`, `your signature`, and `Placeholder` strings.
2. **Projects:** edit the `projects` array in `src/app/page.tsx` and the `studies`
   map in `src/app/case-studies/[slug]/page.tsx`.
3. **Images:** the `PhotoSlot` / `ScreenStub` components are placeholders — replace
   with `next/image` pointing at your own assets in `public/`.
4. **Doodles:** `public/doodle-rail.svg` is generic line-art; swap for your own.
5. **Links:** wire the footer `socials` (in `src/components/Footer.tsx`) to your real
   profiles.
