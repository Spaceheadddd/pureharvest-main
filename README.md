# PureHarvest Organics

Official website for **PureHarvest Organics** — a brand rooted in the sacred forests of Araku Valley, Eastern Ghats, India. Raw honey, forest spices, single-origin coffee, and wild dry fruits, sourced directly from indigenous tribal families.

Designed & developed by **Arcane Labs** · Est. 2026

---

## Stack

Pure HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies. Served statically.

---

## Folder Structure

```
PureHarvest - Main/
│
├── index.html              Homepage — hero, collection, featured product, subscriptions, journal, B2B, footer
├── shop.html               Browse / View All — 4-col grid, filter tabs by category
├── product-honey.html      Product page — Forest Honey (full scroll-to-buy funnel)
│
├── contact.html            Contact page — form + studio address
├── privacy.html            Privacy Policy
├── terms.html              Terms & Conditions (20 sections)
├── refund.html             Refund & Returns Policy
├── shipping.html           Shipping Policy
├── cookie.html             Cookie Policy
│
├── style.css               Global stylesheet — CSS variables, all components
├── legal.css               Styles scoped to legal/policy pages
├── script.js               All JavaScript — cart, search, carousel, animations, product interactions
│
├── assets/                 Static assets (images, fonts — currently empty; CSS gradients used as placeholders)
│
├── README.md               This file
└── CHANGELOG.md            Session-by-session build log
```

---

## Pages — Current State

| Page | Status | Notes |
|---|---|---|
| `index.html` | ✅ Live | Homepage, full sections |
| `shop.html` | ✅ Live | 4-col grid, filters |
| `product-honey.html` | ✅ Live | Full funnel, 13 sections |
| `contact.html` | ✅ Live | Form + address |
| `privacy.html` | ✅ Live | Full policy |
| `terms.html` | ✅ Live | 20 sections incl. Cybersecurity, IP, OTP auth |
| `refund.html` | ✅ Live | Full policy |
| `shipping.html` | ✅ Live | Rate table |
| `cookie.html` | ✅ Live | Category breakdown |
| `product-coffee.html` | ⏳ Planned | Next product page |
| `product-dryfruits.html` | ⏳ Planned | — |
| `product-spices.html` | ⏳ Planned | — |
| `story.html` | ⏳ Planned | Brand origin, tribal community story |
| `journal/` | ⏳ Planned | Editorial / blog |

---

## Key Features

**Cart system** — Sidebar drawer with add/remove/total, cart dot badge on header, persistent across page interactions.

**Search overlay** — Full-screen search with real-time product filtering. Keyboard shortcut: `⌘K` / `Ctrl+K`.

**Navigation drawer** — Mobile-first slide-up drawer with category orbs and animated section links.

**Product cards** — Portrait layout (`4/5` aspect ratio), size selector with live price update, Add to Cart wired to global cart, star rating injection.

**Product page funnel** — Hero → Taste Profile → Why Different → Batch Transparency → Ritual → Benefits → Story → Source → Reviews → FAQ → Close CTA → Related. All Add to Cart buttons open cart sidebar.

**Copy protection** — `user-select: none` + JS block on copy/cut/contextmenu.

**Sticky bar** — Appears on product page after hero scrolls out of view. Updates with size/price state.

**Reviews marquee** — Horizontal auto-scroll on desktop, pauses on hover. Static stacked cards on mobile.

---

## CSS Variables (design tokens)

```css
--forest:    #1a3028   /* primary dark green */
--forest-2:  #0d2018   /* deeper green (CTAs, dark sections) */
--honey:     #c4903a   /* amber accent */
--honey-dk:  #a06820   /* hover state for honey */
--off-white: #fafaf8   /* page background */
--warm:      #f5f0e8   /* warm section backgrounds */
--serif:     'Cormorant Garamond'
--sans:      'DM Sans'
--r-lg:      28px      /* card border radius */
--r-pill:    999px     /* pill/button radius */
```

---

## Running Locally

```bash
npx serve -l 3456 .
```

Open `http://localhost:3456`.

---

## Known Issues

- **Carousel** — snap + drag behaviour on the homepage product carousel needs revisiting
- **Product photography** — CSS gradient placeholders in use; real product photos are the biggest pending upgrade
- **Search scope** — spotlight search shows products only; should include page content (T&C, privacy, etc.)
- **Review system** — hardcoded; needs backend or third-party integration (Stamped, Okendo, etc.)

---

## Planned — Full Roadmap

**Customer-facing**
- Product pages per category (coffee, dry fruits, spices)
- Our Story
- Journal / Blog
- Rituals
- Sustainability

**Accounts & Portals** *(requires backend — recommended: Next.js + NestJS + Supabase)*
- User Accounts — orders, Harvest Credits rewards, profile
- Staff Portal
- Admin Dashboard
- B2B / Wholesale Portal
- Investor Relations

---

## Credits

Designed & developed by **Arcane Labs**.  
Brand — PureHarvest Organics · Est. 2026 · Araku Valley, India.
