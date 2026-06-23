# 💧 GULPY Marketing Website

Premium single-page marketing site for GULPY — a hydration tracking app.

## Stack
- **React** (JavaScript, no TypeScript)
- **Tailwind CSS v3** — utility-first with custom config
- **Framer Motion** — all animations and transitions

## Quick Start

```bash
npm install
npm start       # dev server at localhost:3000
npm run build   # production build
```

## Structure

```
src/
├── components/
│   ├── Loader.jsx          # Water-fill loading screen
│   ├── ScrollProgress.jsx  # Spring-animated top progress bar
│   ├── Navbar.jsx          # Sticky glass nav + mobile menu
│   ├── Droplets.jsx        # Floating SVG water drops
│   ├── Hero.jsx            # Full-screen hero with animated bottle
│   ├── Why.jsx             # Hydration stats with animated counters
│   ├── Features.jsx        # 6 feature cards with hover effects
│   ├── HowItWorks.jsx      # 4-step sticky timeline
│   ├── AppPreview.jsx      # Interactive phone mockup (4 screens)
│   ├── Waitlist.jsx        # Signup form with localStorage + confetti
│   └── Footer.jsx          # Social links, nav, app store badges
├── hooks/
│   └── useInView.js        # useInView, useScrollY, useScrollProgress, useCounter
├── App.js
├── index.js
└── index.css               # Tailwind + custom animations
```

## Waitlist Data
Submissions are saved to `localStorage` under key `gulpy_waitlist`:
```json
[{ "name": "Alex", "email": "alex@example.com", "joinedAt": "2025-..." }]
```
