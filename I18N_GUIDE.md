# I18n (Language) Guide — Harrigan Academy

This guide explains how the multi-language system works and how to add or update translations.

## How It Works

The site uses a lightweight React Context system — no external libraries needed.

```
src/i18n/
  en.js       ← English (source of truth)
  ru.js       ← Russian
  ja.js       ← Japanese
  index.jsx   ← I18nProvider context + useI18n hook
```

Every component calls `const { t } = useI18n()` to get the strings for the active language. The language switcher is built into the Navbar (globe icon on desktop, pill buttons in mobile drawer).

## Adding or Editing Translations

### Step 1 — Edit `en.js` first
`en.js` is the **source of truth**. Always add new strings here first.

```js
// Example: adding a new string
contact: {
  ...
  newField: 'Book Now',  // ← add here first
}
```

### Step 2 — Mirror the key in `ru.js` and `ja.js`
Add the **exact same key** with the translated value:

```js
// ru.js
contact: {
  ...
  newField: 'Забронировать',
}

// ja.js
contact: {
  ...
  newField: '今すぐ予約',
}
```

> [!IMPORTANT]
> If a key exists in `en.js` but is missing from `ru.js` or `ja.js`, that section will either show `undefined` or inherit the English text (for sections using `en.X` as a placeholder). Always keep all three files in sync.

### Step 3 — Use it in a component
```jsx
import { useI18n } from '../i18n/index.jsx'

export default function MyComponent() {
  const { t } = useI18n()
  return <button>{t.contact.newField}</button>
}
```

---

## Completing the Russian & Japanese Translations

The `ru.js` and `ja.js` files currently contain partial translations (marked with `// TODO_RU:` or `// TODO_JA:`). Sections that need a professional human translation are still using English placeholder text via `en.hero.slides` etc.

To complete a section, open the locale file and replace the `en.X` references with translated arrays:

```js
// ru.js — replace placeholder with real translations
hero: {
  cta: 'Начать обучение',
  slides: [
    { title: 'Весёлые онлайн-уроки английского!', subtitle: '...' },
    // ... (5 slides total, matching the order in en.js)
  ],
},
```

---

## Adding a New Language

1. Copy `en.js` → `xx.js` (replace `xx` with the locale code, e.g. `ar`, `de`)
2. Translate all strings in the new file
3. Register it in `src/i18n/index.jsx`:

```js
import xx from './xx.js'

export const LOCALES = {
  en: { label: 'EN', nativeLabel: 'English', strings: en },
  ru: { label: 'RU', nativeLabel: 'Русский', strings: ru },
  ja: { label: 'JA', nativeLabel: '日本語',  strings: ja },
  xx: { label: 'XX', nativeLabel: 'Language Name', strings: xx }, // ← add here
}
```

The language switcher in the Navbar will automatically show the new option.

---

## File Structure Reference

| Key path | Used in |
|---|---|
| `t.nav.*` | Navbar |
| `t.hero.slides[i].title/subtitle` | HeroSection |
| `t.hero.cta` | HeroSection button |
| `t.features.*` | FeaturesBar labels |
| `t.whyUs.sectionTitle` / `t.whyUs.cards[i]` | WhyUsSection |
| `t.about.sectionTitle` / `t.about.slides[i]` | AboutSection |
| `t.testimonials.eyebrow/sectionTitle/items[i]` | TestimonialsSection |
| `t.contact.*` | ContactSection |
| `t.footer.*` | Footer |
