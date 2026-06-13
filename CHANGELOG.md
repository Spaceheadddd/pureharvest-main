# Changelog

All notable changes to the PureHarvest website are documented here.
Newest entries are at the top.

---

## [Unreleased] — 2026-06-14

### Added
- **`checkout.js`** — Immersive 3-moment checkout overlay (Order Review → Delivery → Payment → Confirmation). Self-contained IIFE injected into `document.body`. Features: item grouping/deduplication, pincode validation via India Post API (`api.postalpincode.in`), Razorpay integration with dev-mode fallback, order ID generation (`PH-YYYY-XXXXX`), cart clear + badge update on confirm, full-screen on mobile (`100dvh`, `border-radius: 0`), sheet slide-up on desktop.
- **`ROOTS-PROGRAM.md`** — Full internal strategy document for the PureHarvest Roots loyalty programme. Covers: earn/redeem mechanics, tier structure (Seedling → Sapling → Roots → Ancient), margin analysis by category (Honey 50-70%, Coffee 30%, Spices 50%, Dry Fruits 40%), 4 detailed customer scenarios with P&L, minimum balance rule (always keep 3 Roots), redemption bonus tiers, shipping policy (no Roots on shipping), full product redemption math, loss scenario analysis (1:1 parity danger), Grove Ambassador overlay, Harvest Card + coupon design, nudge email cadence.

### Changed
- **`style.css`**
  - Mobile newsletter input height fix: `flex: none; width: 100%; height: 76px` — overrides `flex: 1` which was setting `flex-basis: 0%` in the column flex layout and overriding explicit height
  - Checkout overlay styles (`.co-*` namespace): dark forest green panel, honey accent, shake animation for validation errors, mobile full-screen, desktop bottom-sheet
- **`script.js`**
  - `#checkoutBtn` wired to `openCheckout(cartItems)` after closing sidebar (200ms delay)
  - `.p-buy` (Buy Now) handlers updated to call `openCheckout` directly, bypassing cart
- **`product-honey.html`**
  - `#pdBuy` wired to `openCheckout` with size/qty array
  - `<script src="checkout.js">` injected
- **All 9 HTML files** — `<script src="checkout.js">` injected after `<script src="script.js">`

---

## [Unreleased] — 2026-06-11

### Changed
- **All HTML pages** (index, contact, cookie, privacy, product-honey, refund, shipping, shop, terms): ritual drawer orbs converted from `<div class="orb">` to `<a href="product-honey.html" class="orb">` — all 4 orbs (Honey, Dry Fruits, Coffee, Spices) now navigate to the product page. Global `a { text-decoration: none; color: inherit; }` ensures no visual change.

---

## [c89346d] — 2026-06-11

### Added
- **`product-honey.html`** — Full scroll-to-buy funnel for Forest Honey. 13 sections:
  - Hero: 2-col desktop layout, star rating (4.8 · 312 reviews), size toggle (500g / 1 kg), qty stepper, live price, Add to Cart + Buy Now, trust strip
  - Sticky buy bar: fixed bottom, appears after hero scrolls out of view
  - Taste Profile: flavour note pills, texture/intensity/sweetness slider bars, colour swatch, crystallisation explainer, pairing chips
  - Why Different: 4-col differentiation grid (Never Heated · Wild Hive · Single Origin · Tribe-Harvested)
  - Batch Transparency: batch card AV-2026-01, Post-Monsoon 2026, origin, altitude, FSSAI certified, lab tested
  - How to Use / Ritual: 3 portrait gradient cards
  - Benefits: 4-col grid (Enzyme-Rich · Prebiotic · Natural Energy · Skin Nourishment)
  - Product Story: editorial 2-col pull-quote layout
  - From the Source: dark green 2-col section with text left, honey image right
  - Customer Reviews: rating summary + 5-star bar breakdown + horizontal marquee on desktop (pauses on hover)
  - FAQ Accordion: 6 questions, first open by default
  - Close CTA: dark forest section, size toggle, live price, amber add-to-cart
  - Related Harvest: carousel with 4 cross-category products
  - Add to Cart (all 3 CTAs) opens cart sidebar after 400ms delay
  - "Write a Review" links to contact.html

- **`shop.html`** — Full shop/browse page:
  - Hero with category heading
  - Filter tabs (All / Honey / Coffee / Dry Fruits / Spices) wired to show/hide cards
  - 4-col product grid, responsive 2-col at 1100px, 1-col at 600px
  - 100px side margins on desktop, 40px tablet, 16px mobile

### Changed
- **`script.js`**
  - Homepage carousel: drag-to-scroll on desktop, progress bar fill, scroll reset on category switch
  - Product card click navigates to `product-honey.html` (excludes Add/Buy/Size/Arrow clicks)
  - Size injection guard (`if card.querySelector('.p-sizes') return`) prevents duplicate buttons on shop.html
  - Star rating injection (★★★★★ 4.8 · 200+ reviews) on all product cards
  - Copy/cut/contextmenu protection events
  - `addToCartItem` featured product button now calls function correctly

- **`style.css`**
  - Product card redesign: `.p-card-top` changed from absolute overlay to static header bar
  - `.p-img-wrap` inset padding 15px all sides; `.p-img` portrait `aspect-ratio: 4/5`
  - `.p-cat` colour changed to dark forest green text
  - Trust rating styles (`.p-rating`, `.p-stars`, `.p-rcount`)
  - `user-select: none` copy protection with text-field override
  - Removed drawer gesture animation (unused)
  - Collection/carousel alignment fixes

- **`terms.html`**
  - Added Harvest Credits subsection (s9)
  - Replaced Account Security with Passwordless OTP Authentication (s10)
  - Added Arcane Labs design/code IP clause (s11)
  - Added AI Features — Arcane Labs Exclusive Technology clause (s11)
  - Added Cybersecurity section (new s13): IT Act 2000 ss. 43/66/66C/66F, IPC 1860, responsible disclosure
  - Renumbered old s13–s19 → s14–s20
  - Updated Est. 2018 → Est. 2026 throughout

- **All HTML pages** (`contact`, `cookie`, `privacy`, `refund`, `shipping`): Est. 2026 in footer

---

## [2a529d3] — Prior session

### Added
- `contact.html` — Contact page with form, studio address, social links
- `privacy.html` — Full Privacy Policy (GDPR / IT Act 2000 compliant)
- `terms.html` — Full Terms & Conditions (20 sections)
- `refund.html` — Refund & Returns policy
- `shipping.html` — Shipping policy with rate table
- `cookie.html` — Cookie Policy with category breakdown
- Footer navigation links across all pages

---

## [91034a6] — Prior session

### Added / Changed
- Homepage sections: brand mission, origin story, filterable product collection, category showcase, featured product, testimonials, journal preview, B2B/exports, subscription plans with 3-step modal, newsletter capture, footer
- Cart sidebar with add/remove/total
- Navigation drawer with category orbs
- Search overlay with product results
- Scroll-driven footer wordmark animation
- Stat counter animations on scroll

---

## Known Issues / Next

- **Carousel behaviour** — snap and drag interaction needs revisiting
- **Product photography** — gradient placeholders in place; real photos will be the biggest visual upgrade
- **Other product pages** — `product-coffee.html`, `product-dryfruits.html`, `product-spices.html` to be built
- **Real review system** — reviews are currently hardcoded; needs a backend or third-party integration
- **Spotlight search** — currently scoped to products only; should include page content
