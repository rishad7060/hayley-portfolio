# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint (uses `eslint-config-next` core-web-vitals + typescript presets)

There is no test runner configured.

## Architecture

Single-page marketing site for "BONGO — Radiant Beauty Studio", built on Next.js 16 App Router with React 19 and the React Compiler enabled (`next.config.ts` → `reactCompiler: true`). TypeScript strict mode; path alias `@/*` → `src/*`.

### Data flow: content is data, not code

All user-facing copy, imagery, links, and section structure live in `src/data/placeholder.json`. Every section component on the homepage is a presentational component that receives a `data` prop sliced from that JSON in `src/app/page.tsx`:

```
page.tsx → placeholderData.{navbar,hero,about,services,products,values,testimonials,footer}
         → <Section data={...} />
```

`src/data/types.ts` declares the full shape of this JSON (`PlaceholderData` and its sub-interfaces). When editing content, edit the JSON; when adding new content fields, update both `types.ts` and the section component's local prop interface (section components currently re-declare their own `*Data` interfaces inline rather than importing from `types.ts` — keep them in sync). Note: `FAQ.tsx` is an exception — it imports `placeholderData` directly instead of taking a `data` prop.

### Layout shell

`src/app/layout.tsx` wraps the entire app in `<SmoothScroll>` (Lenis + Framer Motion's frame loop — see `src/components/SmoothScroll.tsx`) and renders a `<FloatingBadge>` credit link. Two Google fonts are loaded via `next/font`: Inter Tight (body, exposed as `--font-inter-tight`) and Michroma (logo, exposed as `--font-michroma` and usable via the `font-logo` utility defined in `globals.css`).

### Styling system

- Tailwind CSS v4 (PostCSS plugin `@tailwindcss/postcss`), configured entirely in `src/app/globals.css` via `@theme inline` — there is no `tailwind.config.js`.
- Design tokens are CSS variables in `:root` / `.dark` using `oklch()`. Theme is a minimalist black-and-white palette; dark mode inverts it.
- shadcn/ui is configured in `components.json` (style: `new-york`, base: `neutral`, RSC enabled, icons: lucide). Generated primitives live in `src/components/ui/`.
- `cn()` in `src/lib/utils.ts` = `clsx` + `tailwind-merge`. Use it for all conditional class composition.

### Component organization

- `src/components/sections/` — full-width homepage sections (Navbar, Hero, About, Services, Products, Values, Testimonials, FAQ, Footer). These are `"use client"` components because they use Framer Motion animations and React state.
- `src/components/ui/` — shadcn primitives plus project-specific UI helpers (e.g. `RollingText` for the hover roll-up text effect used across sections).
- `src/components/` root — app-level wrappers (`SmoothScroll`, `FloatingBadge`).

### Animation conventions

Framer Motion is used heavily. Sections consistently use the easing tuple `[0.25, 0.46, 0.45, 0.94] as const` (cast is required for Framer Motion's type) and `whileInView` with `viewport={{ once: true, margin: "-100px" }}` for scroll-triggered reveals. Stagger children via `staggerChildren` on container variants. Intro animations use `initial` + `animate`.

### Images

`next.config.ts` allows SVGs (`dangerouslyAllowSVG: true`) and remote images from `placehold.co` — the placeholder JSON references many `https://placehold.co/...` URLs during content scaffolding. Local assets live under `public/assets/`.

## Project conventions

- In-page navigation uses hash links (`#about`, `#services`, etc.); Lenis smooth-scrolls them. Most nav CTAs in placeholder data currently point to `#footer`.
- Every section component is `"use client"` — adding a new section should follow the same pattern (motion + data prop).
- Don't introduce a `tailwind.config.js`; extend tokens by editing `@theme inline` in `globals.css`.
