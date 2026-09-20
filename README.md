# Ceramica Pietraru

Premium, storytelling-first website for a traditional handmade pottery studio in Horezu, Romania.

**Cinci generații. Un meșteșug. Lucrat manual în Horezu.**

## Tech stack

- Next.js (App Router)
- React + TypeScript (strict)
- Tailwind CSS
- Motion for React (`motion/react`)
- next/font (Fraunces + Manrope)
- Lucide React
- next/image

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project structure

```
app/                  # Routes (home, poveste, colectii, produse/[slug], atelier)
components/
  animation/          # Reveal, StaggerText, ParallaxImage
  cart/               # Cart provider (localStorage)
  home/               # Homepage sections
  layout/             # Header, footer, cart drawer, search
  products/           # Product card/grid/gallery/purchase
  storytelling/       # RotatingPot + scroll story
  ui/                 # Button, container, decorative lines
data/                 # products, navigation, story, i18n/ro
lib/                  # utils, metadata, contact constants
public/images/        # Brand photography + placeholders
```

## Product data

All demo products live in [`data/products.ts`](data/products.ts).

Replace this file with real inventory (or wire a CMS/Shopify later). Keep the `Product` type stable so UI components continue to work.

## Images

See [`ASSETS.md`](ASSETS.md) for the full photography checklist.

Key brand images already in place:

- `/public/images/hero/building-exterior.jpg`
- `/public/images/workshop/pot-building.jpg`

Placeholder SVGs exist under `/public/images/pottery/` and `/public/images/process/`.

## RotatingPot (scroll-linked 360°)

Component: `components/storytelling/rotating-pot.tsx`  
Section: `components/storytelling/rotating-pot-section.tsx`

Uses Motion `useScroll` + `useTransform` so the pot rotates **0 → 360°** as the storytelling chapters scroll past a sticky visual.

### Modes

**Single cutout (current):**

```tsx
<RotatingPot
  mode="single"
  src="/images/pottery/rotating-pot.svg"
  alt="..."
  scrollProgress={scrollYProgress}
/>
```

**Frame sequence (upgrade path):**

1. Export frames to e.g. `/public/images/pottery/spin/frame-00.webp` … `frame-35.webp`
2. Pass ordered paths:

```tsx
<RotatingPot
  mode="sequence"
  frames={framePaths}
  alt="..."
  scrollProgress={scrollYProgress}
/>
```

3. Prefer fewer / smaller frames on mobile; do not preload dozens of huge assets eagerly.

`prefers-reduced-motion` disables scroll-linked rotation and shows a static pot.

## Contact details

Update placeholders in [`lib/contact.ts`](lib/contact.ts):

```ts
export const CONTACT = {
  address: "TODO",
  phone: "TODO",
  email: "TODO",
  hours: "TODO",
  mapUrl: "TODO",
  instagram: "TODO",
  facebook: "TODO",
}
```

Do not invent real-world contact data.

## Translations

Romanian copy lives in [`data/i18n/ro.ts`](data/i18n/ro.ts). Keys are structured so an English dictionary can be added later without rewriting components.

## Cart / Stripe

Cart UX is implemented with React context + `localStorage`:

- add / remove / update quantity
- subtotal
- drawer + empty state

**TODO:** Stripe Checkout integration. Checkout button is intentionally disabled with a TODO note — no fake payments.

Suggested next step:

1. Create Stripe products or use Price IDs mapped from `data/products.ts`
2. Add a Route Handler `app/api/checkout/route.ts`
3. Redirect the cart drawer CTA to the Checkout Session URL

## SEO

- Metadata API in `lib/metadata.ts` + page-level overrides
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- JSON-LD: LocalBusiness (layout), Product + BreadcrumbList (product pages)

Set `NEXT_PUBLIC_SITE_URL` in production (defaults to `https://ceramicapietraru.ro`).

## Deploy on Vercel

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set env: `NEXT_PUBLIC_SITE_URL=https://your-domain.tld`
4. Deploy (framework preset: Next.js)

## License / content

Brand photography and copy belong to Ceramica Pietraru. Demo product prices are placeholders only.
