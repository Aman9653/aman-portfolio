# Assets

Everything here is a **placeholder**. Drop a real file in at the same path with
the same name and it appears on the site — no code changes needed.

If a file is missing, `SmartImage` renders a branded gradient tile instead of a
broken image, so the layout never breaks while you're swapping things in.

## What to replace

| File | Used by | Suggested size |
| --- | --- | --- |
| `aman-yadav-resume.pdf` | Every "Download Resume" button | — |
| `images/developer-hero.svg` | Hero illustration | 720 × 620 (or a 1400 × 1200 photo) |
| `images/developer-portrait.svg` | About profile card | 520 × 620 portrait |
| `images/project-live-tracking.svg` | Projects grid | 1464 × 1040 (7:5) |
| `images/project-event-management.svg` | Projects grid | 1464 × 1040 |
| `images/project-fitness-tracker.svg` | Projects grid | 1464 × 1040 |
| `images/project-commerce-dashboard.svg` | Projects grid | 1464 × 1040 |
| `images/project-chat-app.svg` | Projects grid | 1464 × 1040 |
| `images/project-portfolio-cms.svg` | Projects grid | 1464 × 1040 |
| `images/avatar-1.svg` … `avatar-6.svg` | Testimonial cards | 320 × 320 square |

## Using a different format

The paths live in [`src/data/site.js`](../../src/data/site.js). To switch from
SVG to a photo, change the extension there:

```js
photo: '/assets/images/developer-portrait.jpg',
```

Prefer WebP or optimised JPEG for photographs, and keep project screenshots
around 1400 px wide — they're displayed at roughly half that on a 2× screen.

## Favicon and social preview

`public/favicon.ico`, `public/logo192.png` and `public/logo512.png` are still the
Create React App defaults. `logo512.png` doubles as the Open Graph preview image
referenced in `public/index.html`.
