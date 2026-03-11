# Harrigan Academy — Brand DNA

> **Rule #1:** Never improvise colours, fonts, or design elements. Always refer to this document. When in doubt, ask.

---

## Brand Identity

| Property        | Value                                   |
|----------------|-----------------------------------------|
| Brand Name     | Harrigan Academy                        |
| Tagline        | Fun Online Classes to improve your English! |
| Audience       | Children / young learners of English    |
| Tone           | Fun, friendly, encouraging, professional |

---

## Colours

| Role              | Hex       | Usage                                        |
|------------------|-----------|----------------------------------------------|
| Primary Purple   | `#7B2D8B` | Navbar bg, headlines, buttons, icons, labels |
| Darker Purple    | `#6A2578` | Navbar drawer bg, hover states               |
| Mint/Teal        | `#DCF0ED` | Feature bar background area                  |
| Mint Dark        | `#C5E8E3` | Accent for mint area hover/border            |
| White            | `#FFFFFF` | Navbar text, button text, body bg            |
| Body text        | `#1F2937` (gray-800) | Subheadlines, descriptive text     |

> ⚠️ **Do NOT invent new colours.** No yellow accents, no red, no orange. Strict to the palette above.

---

## Typography

| Property    | Value                            |
|------------|----------------------------------|
| Font Family | **Montserrat** (Google Fonts)   |
| Weights     | 400, 500, 600, 700, 800, 900    |
| Headlines   | `font-black` (900), Primary Purple |
| Body text   | `font-medium` (500), gray-800    |
| Nav links   | `font-semibold` (600), white     |
| Labels      | `font-bold` (700), Primary Purple |

---

## Logo

- **Text only:** "Harrigan Academy" — no icon, no graduation cap, no additional graphic
- Colour: White (`#FFFFFF`) on purple navbar
- Weight: `font-extrabold`
- Do NOT add any logo image or icon

---

## Navigation

Links (in order):
1. Why Us
2. About Our Program
3. Our Teachers
4. FAQ

CTA Button: **"Contact Us"** — white pill, purple text

---

## Hero Section

- **Layout:** Full-bleed background carousel (images cover 100% of section)
- **Images:** Have built-in white/transparent fade on the left side baked in — **do NOT add any CSS overlay or gradient on top**
- **Text position:** Left-aligned, vertically centred, over the image's built-in fade area
- **Content (exact, no additions):**
  - Headline: *Fun Online Classes to improve your English!*
  - Subheadline: *With experienced international teachers who care about your progress.*
  - CTA: **"Start Learning Today"** — purple pill button, white text, `self-start` to prevent stretching
- **No:** badges, tags, "Learn More" link, yellow accent, overlays, or logo icons in this section
- **Carousel:** 5 slides, auto-advance every 5 seconds, dot indicators (`#7B2D8B` active)

---

## Features Bar

- **Background:** `Wavy Cloud Border.png` used as the **actual section background** (`background-image`, `repeat-x`, `auto 100%`)
  - This IS the bar — not a border on top of a flat colour
- **Overlap:** `-42px` negative `margin-top` so the wavy top edge overlaps the hero section bottom
- **Layout:** 4 items in a row (desktop), 2×2 grid (mobile)
- **Each item:** Icon on LEFT, label text on RIGHT (side-by-side, not stacked)
- **Icons:** 4 webp assets from `/assets/icons/`:
  - `icon-virtual-classes.webp` → "Live Virtual Classes"
  - `icon-international.webp` → "International Teachers"
  - `icon-age-ranges.webp` → "For all Age Ranges"
  - `icon-anytime.webp` → "Learn Anytime Anywhere"
- **Label colour:** Primary Purple `#7B2D8B`, `font-bold`

---

## Assets Reference

```
/public/assets/
├── icons/
│   ├── icon-virtual-classes.webp
│   ├── icon-international.webp
│   ├── icon-age-ranges.webp
│   └── icon-anytime.webp
└── images/
    ├── wavy-cloud-border.png        ← FeaturesBar background
    ├── hero-main.png                ← Carousel slide 1
    ├── hero-carousel-2.png
    ├── hero-carousel-3.png
    ├── hero-carousel-4.png
    ├── hero-carousel-5.png
    └── element-*.png                ← Decorative elements (stars, clouds, rainbow)
```

---

## Responsive Breakpoints

| Screen     | Tailwind prefix | Width         |
|-----------|----------------|---------------|
| Mobile    | (default)       | < 640px       |
| Tablet    | `sm:`           | ≥ 640px       |
| Laptop    | `lg:`           | ≥ 1024px      |
| Desktop   | `xl:`           | ≥ 1280px      |

- **Navbar mobile:** hamburger only → full drawer
- **Navbar tablet:** Contact Us + hamburger
- **Navbar desktop:** full inline nav
- **Hero mobile:** shorter height (`min(90vw, 720px)`), smaller fonts
- **Features bar mobile:** 2-column grid

---

## Tech Stack

| Tool        | Version / Notes       |
|------------|----------------------|
| React      | 18 (via Vite)         |
| Tailwind   | v3                    |
| Font       | Google Fonts (Montserrat) |
| Build tool | Vite                  |
| Dev server | `npm run dev` → localhost:5173 |
