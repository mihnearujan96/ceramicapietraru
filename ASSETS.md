# Photography & asset checklist

Replace SVG placeholders with real workshop photography before launch. Prefer AVIF/WebP, consistent lighting, and natural clay tones.

## Already supplied

| Path | Notes |
| --- | --- |
| `/public/images/hero/building-exterior.jpg` | Full courtyard + pot-building façade |
| `/public/images/workshop/pot-building.jpg` | Close view of the pot-shaped building |

## Required for RotatingPot

| Asset | Spec | Why |
| --- | --- | --- |
| Transparent pot cutout | PNG/WebP, front-facing, ~1600px tall, transparent background | Current `mode="single"` rotation looks best with a real vessel silhouette |
| Optional 360° sequence | 24 or 36 frames, same framing, WebP | Upgrade `RotatingPot` to `mode="sequence"` for a true product spin |
| Optional 3D model | glTF/GLB | Future replacement while keeping scroll progress contract |

Suggested sequence path:

```
/public/images/pottery/spin/frame-00.webp
/public/images/pottery/spin/frame-01.webp
…
```

## Product photography

Replace each `/public/images/pottery/*.svg` used in `data/products.ts`:

- Farfurii (plate front + slight angle)
- Căni (side + handle detail)
- Străchini
- Vase
- Ulcioare
- Piese decorative

Shoot on warm neutral backgrounds (`#F5EFE5` / stone / wood). Avoid heavy props that fight the object.

## Process section

| Path | Subject |
| --- | --- |
| `/public/images/process/hands-clay.webp` | Hands shaping clay |
| `/public/images/process/wheel.webp` | Pottery wheel in use |
| `/public/images/process/decor.webp` | Painting / horn decoration detail |
| `/public/images/process/fire.webp` | Kiln / fire / loading shelves |

## Family story

| Path | Subject |
| --- | --- |
| `/public/images/family/archive-01.webp` | Archival family photograph |
| Optional portraits | Living generations at the wheel (with consent) |

**Do not invent names, dates, or awards** in captions until verified.

## Workshop / storefront

- Interior atelier
- Shop display / shelves
- Courtyard pottery tables
- Detail of white painted motifs on the building
- Romanian craft context (without stock-photo clichés)

## Performance notes

- Export hero images at 2400px longest edge max
- Provide 1x/2x where needed; let `next/image` handle responsive sizes
- Lazy-load everything below the fold
- For spin sequences: lazy-decode frames; consider loading sequence only on `lg+` or after idle
