# Aman Yadav — Portfolio

A premium, production-ready developer portfolio built with **Vite**,
**Tailwind CSS**, and **Framer Motion**. Light and dark themes, a full responsive
layout, and a single shared motion language across every section.

## Getting started

```bash
npm install
npm start        # http://localhost:5173
npm run build    # production bundle in dist/
npm test -- --watchAll=false --runInBand
```

Apache hosts receive the SPA route fallback from `public/.htaccess`.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite |
| Styling | Tailwind CSS 3.4 (`tailwind.config.js`, `postcss.config.js`) |
| Animation | Framer Motion 13 + CSS keyframes |
| Icons | `react-icons` (Lucide + Simple Icons) |
| Fonts | Satoshi (Fontshare) for display, Inter + JetBrains Mono (Google) |

## Where things live

```
src/
  config/site.js            ← canonical site URL and SEO defaults
  data/site.js              ← home-page copy, skills, experience and testimonials
  data/projects.js          ← project detail content and screenshot TODOs
  data/contact.js           ← email, phone, location and social/contact links
  pages/                    ← lazy-loaded home, project detail and 404 pages
  theme/ThemeProvider.jsx   ← light/dark state, persistence, animated swap
  lib/motion.js             ← shared easing, durations, variants
  lib/cn.js                 ← class-name joiner
  hooks/                    ← scroll spy, scroll lock
  components/
    ui/                     ← Section, SectionHeading, Reveal, WaveDivider,
                              ThemeToggle, Logo, SmartImage, Counter, TechIcon
    background/             ← AmbientBackground (blobs, grid, particles)
    layout/                 ← Navbar, Footer, BackToTop
    sections/               ← Hero, About, Skills, Experience, Projects,
                              Testimonials, Contact
public/                     ← images, social icons, resume, manifest and SEO files
```

Update site content in `src/data/*.js`. Change the canonical domain in
`src/config/site.js`.

## Design system

### Colour

Themes are driven by CSS custom properties defined in `src/index.css` and
exposed to Tailwind as semantic colour names in `tailwind.config.js`. Each
variable is a space-separated RGB triplet, so opacity modifiers keep working
(`bg-card/60`, `text-primary/70`).

| Token | Light | Dark |
| --- | --- | --- |
| `bg-canvas` | `#F8FAFC` | `#050816` |
| `bg-card` | `#FFFFFF` | `#0D1425` |
| `text-content-strong` | deep navy | white |
| `border-line` | slate 200 | indigo-tinted |
| `text-primary` | purple 600 | purple 400 |
| `text-secondary` | blue 600 | blue 400 |
| `text-accent` | cyan 600 | cyan 400 |

Brand ramps (`brand-*`, `sky-*`, `cyan-*`) are theme-independent and used for
gradients, glows and accents.

### Type

`font-display` → Satoshi (600/700) for headings.
`font-sans` → Inter (400/500) for body.
`font-mono` → JetBrains Mono for code fragments.

Display sizes: `text-display-sm|md|lg|xl` with tightened tracking.

### Reusable classes

Defined in the `@layer components` block of `src/index.css`:

`shell` · `section-y` · `glass` · `glass-strong` · `surface-card` ·
`surface-card-hover` · `gradient-ring` · `btn` `btn-primary` `btn-ghost`
`btn-outline` · `chip` · `tech-pill` · `icon-btn` · `field` · `text-gradient` ·
`eyebrow` · `grid-backdrop` · `glow-blob` · `hairline`

### Motion

`src/lib/motion.js` holds the single easing curve (`cubic-bezier(.22,1,.36,1)`),
the duration scale and the shared variants. Scroll reveals go through
`<Reveal>` / `<RevealGroup>` / `<RevealItem>`, which fade from
`opacity 0 → 1` with a 30px travel and stagger their children.

Section-specific motion:

- **Hero** — staggered entrance, floating tech badges, drifting gradient blobs
- **Skills** — progress bars animate `0% → level` on entering the viewport
- **Experience** — the timeline spine draws as you scroll (`useScroll` + `useSpring`)
- **Projects** — card lift, 4% image zoom, gradient hairline, glow
- **Every section** — closes with the animated purple/blue `WaveDivider`

### Reduced motion

`prefers-reduced-motion: reduce` is honoured everywhere: the CSS media query
collapses animations and transitions, and each component checks
`useReducedMotion()` to drop travel, parallax, autoplay, drag and the particle
field while keeping the layout and a short fade.

## Theming

`ThemeProvider` applies `.dark` to `<html>`, persists the choice under the
`ay-theme` localStorage key, follows the OS preference until the visitor picks a
side, and keeps the `theme-color` meta tag in sync. A small inline script in
`index.html` applies the stored theme *before* first paint, so there is no
flash of the wrong background.

The swap itself is animated: a `theme-transition` class is added for ~560 ms so
backgrounds, borders, shadows and gradients cross-fade rather than snap.

## Contact form

The form validates client-side and sends messages through EmailJS. Copy
`.env.example` to `.env`, then fill in the service ID, template ID and public
key. Configure the EmailJS template to accept `from_name`, `from_email`,
`reply_to`, `subject` and `message`.

## Accessibility

- Skip-to-content link, semantic landmarks and heading order
- Visible focus rings on every interactive element
- `aria-current` on the active nav link, `aria-invalid` + `aria-describedby` on
  form errors, `role="switch"` on the theme toggle
- Decorative SVG and illustration layers marked `aria-hidden`
- Carousel autoplay pauses on hover and focus

## Performance notes

- Animations stick to `transform` and `opacity`
- Images are lazy-loaded and async-decoded (the hero is eager + high priority)
- The particle field is capped and disabled under reduced motion
- Backgrounds are CSS gradients and inline SVG — no video, no 3D, no canvas

## Replacing images

See [`public/assets/README.md`](public/assets/README.md).
