# PureHarvest Roots Program
**The Loyalty System Rooted in the Forest**

*Internal Strategy Document — Arcane Labs × PureHarvest Organics*
*Version 1.0 — June 2026*

---

## Table of Contents

1. [Overview & Philosophy](#overview)
2. [Core Mechanics — Earn & Redeem](#core-mechanics)
3. [The Critical Math Warning](#critical-math)
4. [Minimum Balance Rule](#minimum-balance)
5. [Tier Structure](#tiers)
6. [Redemption Table](#redemption-table)
7. [Shipping Policy with Roots](#shipping)
8. [Full Product Purchase with Roots](#full-product)
9. [Margin Analysis by Category](#margin-analysis)
10. [Average Spend Calculations](#avg-spend)
11. [Scenarios & Examples](#scenarios)
12. [The Loss Scenario — When Does it Break?](#loss-scenario)
13. [Bonus Roots — All Triggers](#bonus-roots)
14. [Environmental Impact Layer](#impact)
15. [Grove Ambassador Program](#grove)
16. [Gift Cards & Coupons](#gift-coupons)
17. [P&L Summary Table](#pl-summary)
18. [Household Shift Strategy](#household-shift)
19. [Nudge Cadence](#nudge)
20. [Open Questions & Decisions](#open-questions)

---

## 1. Overview & Philosophy {#overview}

The Roots Program is PureHarvest's loyalty ecosystem. It is not a discount mechanism. It is a **relationship architecture** designed to:

- Reward **Loyalty** — sustained purchase behaviour over time
- Reward **Time** — deeper tiers require real spending history, not one-off bulk buys
- Reward **Impact** — every purchase contributes to Araku Valley reforestation

**The core goal: Household Shift.**
Convert single-product buyers into full-pantry PureHarvest families — Honey, Coffee, Spices, and Dry Fruits embedded into their weekly ritual.

The name **Roots** was chosen because it is the only word that captures the entire brand — the forest roots, the tribal community's roots in the land, the products' origin, and the customer's deepening connection to all of it. It works across all product categories, unlike "Nectar" which anchors only to honey.

---

## 2. Core Mechanics — Earn & Redeem {#core-mechanics}

### Earn Rate
```
1 Root per ₹100 spent
```
Every product. Every order. Every channel.

### Redemption Rate
```
1 Root = ₹10 in redemption value
```

> **⚠️ Critical Distinction — Read This First**
>
> The earn rate (₹100 → 1 Root) and the redemption value (1 Root → ₹10) are **intentionally asymmetric**. This is how all sustainable loyalty programs work globally — from Starbucks to airlines to D2C brands.
>
> A customer who spends ₹1,000 earns 10 Roots. Those 10 Roots are worth ₹100 off. That is a **10% effective return**, which is comfortably covered by product margins (see Section 9).
>
> **Never make these 1:1.** If 1 Root = ₹100 off (matching the earn rate), the programme is a 100% cashback scheme and will result in guaranteed losses. See Section 12.

### The Simple Summary
```
Spend ₹100  →  Earn 1 Root  →  Worth ₹10 in future
```
Every ₹10 earned costs PureHarvest ₹10 off a future order — funded by the margins on the original ₹100 sale.

---

## 3. The Critical Math Warning {#critical-math}

**Scenario flagged during design:**
> "Say a user reaches 100 Roots = ₹10,000 spend. 100 - 3 = 97 Roots redeemable."

Let's resolve this precisely:

| | Earn Side | Redeem Side |
|---|---|---|
| Rate | ₹100 spend = 1 Root | 1 Root = ₹10 off |
| 100 Roots represent | ₹10,000 historical spend | ₹1,000 in redemption value |
| 97 Roots (after 3 minimum) | — | ₹970 off |

**Effective return: ₹970 off ₹10,000 spent = 9.7%**

At blended 45% margin: ₹10,000 × 45% = ₹4,500 gross profit → minus ₹970 = **₹3,530 net = 35.3%** ✅

This is **not a loss**. The programme is sustainable.

The loss only occurs if someone interprets "100 Roots" as "₹10,000 in redemption value." That interpretation is wrong and must never appear in UX, comms, or internal documentation.

**Rule to enforce:** Never show Roots as equivalent to their earn-side INR value. Always show them as their redemption value (× ₹10).

---

## 4. Minimum Balance Rule {#minimum-balance}

> **A customer must always retain a minimum of 3 Roots after any redemption.**

To redeem 10 Roots (minimum redemption), a customer needs **13 Roots** in their account.

**Why this matters:**
1. Customers are always "in" the programme — they never start from zero
2. Psychologically, they feel invested even after redeeming
3. It reduces the effective discount from 10% to **7.7%** at base tier

**Calculation:**
- Need ₹1,300 spend to have 13 Roots (10 redeemable + 3 kept)
- Get ₹100 off that ₹1,300 spend
- Effective: ₹100 / ₹1,300 = **7.7%**

This 2.3% reduction in effective discount is invisible to the customer but meaningful to the business.

---

## 5. Tier Structure {#tiers}

Tiers are based on **lifetime cumulative spend**, not Roots balance. Status never expires, never resets. This rewards sustained loyalty, not one-off purchases.

| Tier | Icon | Lifetime Spend | Earn Multiplier | Monetary Benefits | Experiential Benefits |
|---|---|---|---|---|---|
| **Seedling** | 🌱 | ₹0 – ₹4,999 | 1× | Standard earn | Welcome Roots, Birthday bonus |
| **Sapling** | 🌿 | ₹5,000 – ₹14,999 | 1.25× | Free shipping always | Early harvest drops access |
| **Roots** | 🌳 | ₹15,000 – ₹29,999 | 1.5× | Quarterly harvest gift | Limited batch access, Priority support |
| **Ancient** | 🌲 | ₹30,000+ | 2× | Free products periodically | Batch naming rights, Forest visit invite, Dedicated contact, Co-creation |

**Design note on Ancient tier:** The most valuable benefits at Ancient are **experiential, not monetary**. Batch naming rights cost ₹0. A forest visit invite (once a year, for a customer spending ₹30,000+) is a brand moment, not a loss. This is how the highest tier remains sustainable despite 2× multiplier.

### Time to Tier — Household Buyer vs Single-Product Buyer

| Customer Type | Monthly Spend | Months to Sapling | Months to Roots | Months to Ancient |
|---|---|---|---|---|
| Single-product (honey only) | ₹700 | 8 months | 22 months | 43 months |
| Regular (2 categories) | ₹1,500 | 4 months | 10 months | 20 months |
| Household (all 4 categories) | ₹3,000 | 2 months | 5 months | 10 months |
| Bulk quarterly | ₹6,500 | 1 month | 3 months | 5 months |

The tier design creates a visible incentive to buy more categories more often. A household buyer reaches Ancient in 10 months. A single-product buyer takes 43 months. The gap is the upsell engine.

---

## 6. Redemption Table {#redemption-table}

All tiers redeem at the same rate. Earn multiplier affects how fast you accumulate — not what each Root is worth.

| Roots Redeemed | Redemption Value | Bonus | Notes |
|---|---|---|---|
| 10 Roots | ₹100 off | — | Minimum redemption |
| 25 Roots | ₹275 off | +10% | Encourages holding longer |
| 50 Roots | ₹600 off | +20% | Sweet spot for most users |
| 100 Roots | ₹1,100 off | +10% | Large accumulation reward |

**Per-order redemption cap:** Maximum 15% of order value, regardless of Roots balance. This prevents the compounding loss risk on small orders.

**Example:** Customer has 200 Roots but orders ₹500 worth. Max redemption = ₹75 (15% of ₹500) = 7.5 Roots redeemed.

---

## 7. Shipping Policy with Roots {#shipping}

**Current policy:** Free shipping on orders over ₹900. PureHarvest bears cost below ₹900.

**Recommendation: Roots CANNOT be used to pay for shipping directly.**

**Reasoning:**
- Shipping is a pure cost with no margin to absorb a discount
- Free shipping is already earned at ₹900+ (affects most orders)
- Tier benefits include free shipping from Sapling upward
- Allowing Roots on shipping creates a zero-margin path (Roots on product + Roots on shipping = zero cash)

**One exception — the smart workaround:**
If a customer's order is below ₹900 and they want free shipping, they can apply Roots to bring the **product total** up to ₹900, unlocking free shipping. This drives larger orders rather than subsidising shipping directly.

**Example:** Cart = ₹750. Customer applies 15 Roots (₹150 off). Wait — Roots reduce the price, which makes it further from ₹900. So this specific exception doesn't work directly.

**Better rule:** Sapling and above always get free shipping, period. Seedling pays shipping on sub-₹900 orders. Roots cannot be applied to shipping line items.

---

## 8. Full Product Purchase with Roots {#full-product}

**Can a user pay for an entire product using only Roots?**

**Answer: Yes, with a minimum cash component condition.**

### The Math

**Forest Honey 500g at ₹699:**
- Full Roots redemption needed: 70 Roots (₹700 ÷ ₹10)
- Plus minimum balance: 3 Roots
- Total Roots needed in account: 73 Roots
- To earn 73 Roots: ₹7,300 historical spend

**PureHarvest P&L on this relationship:**

| | Value |
|---|---|
| Historical revenue received | ₹7,300 |
| Blended gross profit (45%) | ₹3,285 |
| Cost of giving free honey (COGS at 40%) | ₹280 |
| **Net profit on relationship** | **₹3,005 = 41.2%** ✅ |

Full product redemption is sustainable when viewed as a **relationship cost**, not a transaction cost.

**However — the minimum cash condition:**
We recommend requiring a minimum ₹199 cash component on any order that uses Roots for partial/full product redemption. This ensures:
- The customer is making an active purchase decision (not just draining Roots)
- Avoids zero-revenue orders
- Shipping charges are covered

**Without minimum cash condition risk:**
If a customer redeems 70 Roots for ₹700 honey and pays ₹0:
- Revenue from this transaction: ₹0
- COGS: ₹280
- PureHarvest loss on transaction: ₹280
- BUT: Over lifetime, PureHarvest earned ₹3,285 profit getting here
- Net relationship is still profitable — but it creates an accounting anomaly (negative-revenue order)

**Recommendation:** Allow full product Roots redemption. Require minimum ₹199 cash. Cap at 85% of cart value redeemable by Roots (the 15% cash minimum rule equivalent).

---

## 9. Margin Analysis by Category {#margin-analysis}

### Given margins:
- Honey: 50–70% (using 60% average, conservative)
- Coffee: 30% (lowest — needs care)
- Spices: 50%
- Dry Fruits: 40%
- **Blended average (equal category mix):** 45%

### Base Tier (Seedling, 1×, effective discount 7.7%):

| Category | Gross Margin | Loyalty Cost | Net Margin | Profitable? |
|---|---|---|---|---|
| Honey (low) | 50% | 7.7% | **42.3%** | ✅ Strong |
| Honey (avg) | 60% | 7.7% | **52.3%** | ✅ Strong |
| Honey (high) | 70% | 7.7% | **62.3%** | ✅ Very Strong |
| Coffee | 30% | 7.7% | **22.3%** | ✅ Acceptable |
| Spices | 50% | 7.7% | **42.3%** | ✅ Strong |
| Dry Fruits | 40% | 7.7% | **32.3%** | ✅ Good |
| **Blended** | **45%** | **7.7%** | **37.3%** | ✅ Strong |

### Ancient Tier (2×, effective discount ~15.4%):

| Category | Gross Margin | Loyalty Cost | Net Margin | Profitable? |
|---|---|---|---|---|
| Honey (avg) | 60% | 15.4% | **44.6%** | ✅ Strong |
| Coffee | 30% | 15.4% | **14.6%** | ⚠️ Marginal |
| Spices | 50% | 15.4% | **34.6%** | ✅ Good |
| Dry Fruits | 40% | 15.4% | **24.6%** | ✅ Acceptable |
| **Blended** | **45%** | **15.4%** | **29.6%** | ✅ Sustainable |

**⚠️ Coffee at Ancient tier is the tightest case (14.6% net margin).**

**Mitigation options:**
1. Roots multipliers cap at 1.5× for coffee specifically (flagged in product rules)
2. Coffee Roots redemption capped at 50 Roots max per order
3. Price coffee at 5% premium to absorb Ancient tier cost (recommended)

---

## 10. Average Spend Calculations {#avg-spend}

### Product Price Reference

| Product | Size | Price |
|---|---|---|
| Forest Honey | 500g | ₹699 |
| Forest Honey | 1kg | ₹1,299 |
| Araku Arabica Coffee | 250g | ₹599 |
| Wild Turmeric / Spices | Bundle | ₹449–799 |
| Mixed Dry Fruits | 250g | ₹499–799 |

### Average Order Value by Customer Type

| Customer Type | Typical Cart | Avg Order Value | Roots Earned (base) |
|---|---|---|---|
| First-time / Casual | 1 product | ₹650 | 6 Roots |
| Regular buyer | 2 products | ₹1,350 | 13 Roots |
| Household (all 4) | 4 products | ₹2,800 | 28 Roots + bonuses |
| Bulk quarterly | 4+ bulk sizes | ₹6,500 | 65 Roots + bulk bonus |
| Annual pantry stock | Full range | ₹18,000+ | 180+ Roots |

### Annualised Spend by Tier (modelled):

| Tier | Avg Order | Orders/Year | Annual Spend | Roots/Year (w/ multiplier) |
|---|---|---|---|---|
| Seedling | ₹700 | 3 | ₹2,100 | ~25 Roots |
| Sapling | ₹1,500 | 5 | ₹7,500 | ~95 Roots |
| Roots | ₹3,000 | 6 | ₹18,000 | ~275 Roots |
| Ancient | ₹5,000 | 8 | ₹40,000 | ~810 Roots |

### Gross profit per tier annually (blended 45%):

| Tier | Annual Revenue | Gross Profit (45%) | Est. Loyalty Cost | Net Profit |
|---|---|---|---|---|
| Seedling | ₹2,100 | ₹945 | ~₹80 | ₹865 |
| Sapling | ₹7,500 | ₹3,375 | ~₹420 | ₹2,955 |
| Roots | ₹18,000 | ₹8,100 | ~₹1,270 | ₹6,830 |
| Ancient | ₹40,000 | ₹18,000 | ~₹3,800 | ₹14,200 |

Ancient customers generate ₹14,200 net profit annually. The loyalty programme cost for them is ₹3,800 — 21% of gross profit, well within the range of customer acquisition and retention spend for a D2C brand.

---

## 11. Scenarios & Examples {#scenarios}

### Scenario A — First-time honey buyer becomes household customer

**Profile:** Priya, 29, Hyderabad. Discovers PureHarvest through Instagram.

**Order 1 (Month 1):** Forest Honey 500g — ₹699
- Earns: 6 Roots + 2 welcome bonus = **8 Roots**
- Nudge shown: *"5 more Roots and you unlock ₹100 off"*

**Order 2 (Month 2):** Honey 1kg — ₹1,299 (sees nudge, upgrades to 1kg)
- Earns: 12 Roots
- Balance: 20 Roots — **first redemption unlocked** ✅
- Uses 10 Roots: **₹100 off next order**
- Lifetime spend: ₹1,998

**Order 3 (Month 3):** Coffee 250g + Spice Bundle — ₹1,048 (new category curiosity)
- Earns: 10 Roots + 2 category bonus × 2 = **14 Roots**
- Balance: 24 Roots (after using 10)
- Lifetime spend: ₹3,046

**Order 4 (Month 5):** Full household pack — ₹2,800 (all 4 categories)
- Earns: 28 Roots + 20 Forest Family bonus = **48 Roots**
- Balance: 72 Roots
- Lifetime spend: ₹5,846 → **Sapling unlocked** 🌿

**Priya P&L for PureHarvest:**
| | Value |
|---|---|
| Revenue received | ₹5,846 |
| Gross profit (45% blend) | ₹2,631 |
| Roots discount given | ₹100 (10 Roots) |
| Net profit | **₹2,531 = 43.3%** ✅ |

---

### Scenario B — Bulk household quarterly buyer

**Profile:** Rahul, 42, Bangalore. Family of 5. Orders quarterly.

**Each order:** ₹6,500 (all 4 categories, 1kg honey, 500g coffee, bulk spices, 500g dry fruits)

**Year 1 at Roots tier (1.5× after Month 3):**
- Roots earned: 4 orders × 65 base × 1.5 = 390 Roots
- Bulk order bonus: 4 × 15 = 60 Roots
- Forest Family bonus: 4 × 20 = 80 Roots
- Category exploration (new): +6 Roots (year 1)
- **Total year 1: 536 Roots**

**Redemptions (redeems at 25 Roots each quarter):**
- 4 × 25 Roots = 100 Roots → ₹1,100 off (with 10% bonus)
- Balance end of year: 436 Roots

**Rahul P&L Year 1:**
| | Value |
|---|---|
| Revenue | ₹26,000 |
| Blended COGS (52% blended, honey-heavy) | ₹13,520 |
| Gross profit | ₹12,480 (48%) |
| Roots discount given | ₹1,100 |
| Net profit | **₹11,380 = 43.8%** ✅ |

---

### Scenario C — Ancient tier, aggressive redeemer

**Profile:** Kavitha, 38, Chennai. Spends ₹5,000/order, 8 orders/year. Ancient tier.

**Annual spend:** ₹40,000

**Roots earned (2× multiplier):**
- Base: 400 Roots × 2 = 800 Roots
- Bulk bonuses, Forest Family, etc.: ~120 Roots
- Birthday: 5 Roots
- **Total: ~925 Roots/year**

**Maximum aggressive redemption:**
Redeems 50 Roots per order (max bonus tier) × 8 orders = 400 Roots = ₹4,800 off

**Balance end of year:** 525 Roots (kept accumulating)

**Kavitha P&L:**
| | Value |
|---|---|
| Revenue | ₹40,000 |
| Gross profit (45%) | ₹18,000 |
| Max loyalty cost | ₹4,800 |
| Net profit | **₹13,200 = 33%** ✅ |

Even the most aggressive Ancient redeemer leaves 33% net margin. The 15% order cap prevents runaway redemption.

---

### Scenario D — Coffee-heavy order at Ancient tier (worst case)

**Profile:** Coffee enthusiast, Ancient tier, orders ₹3,000 of coffee only.

- Earns: 30 Roots × 2 (Ancient) = 60 Roots
- Max redemption this order: 15% of ₹3,000 = ₹450 = 45 Roots
- Effective discount: 15%
- Coffee margin: 30%
- Net margin: **30% - 15% = 15%** ⚠️ Marginal

**Mitigation:** Coffee earns at 1× regardless of tier (multiplier only on honey/spices/dry fruits). Or price coffee 5-8% higher to absorb.

---

## 12. The Loss Scenario — When Does It Break? {#loss-scenario}

### Loss Case 1: 1:1 Parity (Earn = Redeem value)

If someone designs the system as "1 Root = ₹100 off" (matching earn rate):
- Spend ₹10,000 → 100 Roots → ₹10,000 off → **revenue = ₹0**
- COGS still exists: ₹5,500 loss
- **Result: ₹5,500 net loss per ₹10,000 in supposed revenue** ❌

**Never allow this. Redemption must always be ₹10 per Root, not ₹100.**

### Loss Case 2: Stacking without caps

If Roots + coupon + gift card all stack without a combined cap:
- 10 Roots = ₹100 off
- Coupon: 15% off = ₹150 on ₹1,000
- Gift card: ₹200 off
- Total discount: ₹450 on ₹1,000 order = 45% discount
- Coffee margin 30% = **15% net loss** ❌

**Rule:** Combined discount cap = 25% of order value. Roots, coupons, and gift cards together cannot exceed this.

### Loss Case 3: Over-generous bulk bonuses

If bulk order bonuses are too high (e.g., +100 Roots on ₹10,000 order):
- Base: 100 Roots (₹1,000 value)
- Bonus: +100 Roots (₹1,000 value)
- Total: 200 Roots = ₹2,000 off ₹10,000 = 20% effective
- At 30% coffee margin: **10% net** — borderline

**Rule:** Bulk bonuses capped at 15 Roots per order regardless of order size.

### Loss Case 4: Ancient × Bulk × Category bonus stacking

- Ancient multiplier: 2×
- Bulk bonus: 15 Roots
- Forest Family bonus: 20 Roots
- Base on ₹3,000 order: 30 × 2 = 60 Roots
- Total: 95 Roots = ₹950 off ₹3,000 = 31.7%
- At 30% coffee: **−1.7% loss** ❌

**Mitigation rules:**
1. Bonuses (bulk, Forest Family, category) are always at 1× regardless of tier — only base spend earns the multiplier
2. Per-order redemption cap (15%) prevents immediate redemption of stacked Roots

---

## 13. Bonus Roots — All Triggers {#bonus-roots}

| Trigger | Roots | Frequency | Notes |
|---|---|---|---|
| Welcome | +2 | Once, first order | Endowed progress effect |
| Birthday month | +5 | Annual | No purchase required |
| New category explored | +2 | Once per category | Max 4× lifetime (8 Roots) |
| All 4 categories (Forest Family) | +20 | First time only | Major milestone |
| Write a review (verified) | +1 | Per product, max 4 | |
| Subscribe (monthly box) | +10% on every renewal | Per subscription order | Subscription loyalty |
| Refer a friend | +5 | Per successful referral | No cap |
| Seasonal Double Roots event | 2× earn | 7-day windows | Harvest season, Diwali, etc. |
| Bulk order ₹5,000+ | +5 | Per qualifying order | Cap at 5 per order |
| Bulk order ₹10,000+ | +15 | Per qualifying order | Cap at 15 per order |

**All bonuses earn at 1× — the tier multiplier applies only to base spend Roots.**

---

## 14. Environmental Impact Layer {#impact}

**1% of every order value → Araku Valley Reforestation Fund**

This is non-negotiable and brand-defining. It is not a loyalty mechanic — it is a brand promise.

| Order Value | Forest Contribution | Approx. Trees |
|---|---|---|
| ₹700 | ₹7 | 0.07 trees |
| ₹2,800 | ₹28 | 0.28 trees |
| ₹6,500 | ₹65 | 0.65 trees |
| ₹40,000/year | ₹400 | 4 trees |

*At ₹100 per tree, based on local reforestation partnerships. Adjust as partners are onboarded.*

**Customer-facing:**
- Impact dashboard showing total trees contributed
- Milestone certificate at 5 trees, 10 trees, 25 trees
- Named grove for Ancient tier members (the forest they've contributed to carries their name)

**Cost to PureHarvest:** 1% of revenue. At 45% margin, this is 2.2% of gross profit. Fully absorbable.

---

## 15. Grove Ambassador Program {#grove}

An invite-only layer above the Roots programme. All Grove members are also Roots members — their purchases earn Roots normally. Grove adds a referral income stream.

| Tier | Referrals | Roots per Referral | Additional Benefits |
|---|---|---|---|
| Sprout | 1–5 | +5 Roots | Personal code, early product access |
| Branch | 6–20 | +8 Roots | Free product monthly, co-branded content rights |
| Grove | 21+ | +10 Roots OR cash opt-in | Revenue share, forest visit, exclusive products |

**Cash commission (Grove tier only):**
₹50–150 per successful referral depending on referred customer's first order value. This competes with Roots redemption for high-volume ambassadors and must be budgeted as a customer acquisition cost (CAC substitute).

**Economics:** If CAC via paid ads is ₹800–1,200 per customer, a ₹150 referral commission per Grove-sourced customer is 5× more efficient. Grove pays for itself.

---

## 16. Gift Cards & Coupons {#gift-coupons}

### Gift Cards — Rebrand Recommendation

Do not call them "Gift Cards." Rebrand to **Harvest Cards**.

A Harvest Card is a stored-value instrument — not a loyalty mechanism. It is purchased by one person, gifted to another. When redeemed, it functions as cash against an order.

**Denominations:** ₹500 / ₹1,000 / ₹2,000 / ₹5,000

**Code format:** `PH-HARV-XXXX-XXXX` — readable, brandable.

**Digital experience:** An email/PDF with forest imagery, the recipient's name, and the Harvest Card code on a beautifully designed card. That is the product. The code is the mechanism.

**Do Harvest Cards earn Roots?**
- The buyer: Yes, if they're a logged-in Roots member purchasing a Harvest Card, they earn Roots on the purchase value.
- The recipient: If they redeem a Harvest Card and are a Roots member, they earn Roots on the order value (the Harvest Card is treated as payment, same as cash).

### Coupons — Do We Need Them?

**Yes.** Coupons serve a different function than Roots:

| | Roots | Coupons |
|---|---|---|
| Purpose | Ongoing loyalty retention | Campaign-specific acquisition/conversion |
| Recipient | Existing customers | New or lapsed customers |
| Economics | Self-funded by margin | Marketing budget |
| Expiry | 12 months inactivity | Campaign window |
| Examples | — | `ARAKU2026`, `FIRSTHARVEST`, `DIWALI15` |

**Coupon code naming convention:** Always product/season/campaign tied. Never random strings. Examples:
- `WELCOME15` — 15% off first order
- `ARAKU2026` — Araku harvest season special
- `RITUAL20` — new ritual pack launch
- `FRIEND10` — referral discount

**Stacking rule:** Roots + Coupon can stack, but total discount cap = 25% of order value. System enforces this automatically.

**Should Roots and Coupons stack?**
Recommendation: Allow stacking with the 25% combined cap. Preventing stacking frustrates loyal customers who have Roots and also received a campaign coupon. The cap protects margins.

---

## 17. P&L Summary Table {#pl-summary}

### At base tier (7.7% effective discount after minimum balance rule):

| Category | Margin | After Loyalty | After 1% Forest Fund | Final Net |
|---|---|---|---|---|
| Honey (low) | 50% | 42.3% | 41.3% | ✅ 41.3% |
| Honey (avg) | 60% | 52.3% | 51.3% | ✅ 51.3% |
| Honey (high) | 70% | 62.3% | 61.3% | ✅ 61.3% |
| Coffee | 30% | 22.3% | 21.3% | ✅ 21.3% |
| Spices | 50% | 42.3% | 41.3% | ✅ 41.3% |
| Dry Fruits | 40% | 32.3% | 31.3% | ✅ 31.3% |
| **Blended avg** | **45%** | **37.3%** | **36.3%** | ✅ **36.3%** |

### At Ancient tier (15.4% effective discount):

| Category | Margin | After Loyalty | After 1% Forest Fund | Final Net |
|---|---|---|---|---|
| Honey (avg) | 60% | 44.6% | 43.6% | ✅ 43.6% |
| Coffee | 30% | 14.6% | 13.6% | ⚠️ Marginal |
| Spices | 50% | 34.6% | 33.6% | ✅ 33.6% |
| Dry Fruits | 40% | 24.6% | 23.6% | ✅ 23.6% |
| **Blended** | **45%** | **29.6%** | **28.6%** | ✅ **28.6%** |

**All categories except coffee-only Ancient customers are comfortably profitable.**

---

## 18. Household Shift Strategy {#household-shift}

The single most important metric for the Roots programme is not retention rate — it is **category expansion per customer**.

### Category Completion Bonuses (buy all 4 categories):

| Categories in One Order | Bonus Roots |
|---|---|
| 2 categories | +5 |
| 3 categories | +10 |
| All 4 (Forest Family) | +20 |

### The Upsell Nudge Engine

At cart, show:
> *"Add ₹299 of Wild Turmeric — unlock 10 bonus Roots and complete your Forest Family set."*

This nudge increases average order value AND drives category exploration simultaneously.

### Subscription as Household Anchor

A monthly ritual box (all 4 categories, curated by PureHarvest) is the strongest household shift mechanism:
- Subscriber AOV: ₹2,500–3,500/month
- +10% Roots on every renewal
- Subscribers cannot lose Roots from inactivity while subscribed
- Churn prevention: cancelling means losing the Roots streak

---

## 19. Nudge Cadence {#nudge}

**Nudge emails fire every 3 months of inactivity** (not 3 months from joining — 3 months since last purchase).

| Inactivity Period | Email | Message |
|---|---|---|
| 3 months | Nudge 1 | *"Your Roots are waiting for you."* |
| 6 months | Nudge 2 | *"Your Roots expire in 6 months — here's what you've built."* |
| 9 months | Nudge 3 | *"Final reminder — your Roots expire in 90 days. We're saving your spot."* + special bonus offer |
| 12 months | Expiry | Roots expire. Account resets to 3 Roots (minimum balance preserved). |

**Expiry logic:** Roots expire after 12 months of **no purchase** (inactivity, not time from earning). A customer who buys every 11 months never loses Roots.

---

## 20. Open Questions & Decisions {#open-questions}

The following need decisions before full implementation:

| # | Question | Options | Recommended |
|---|---|---|---|
| 1 | Coffee multiplier at Ancient tier | Full 2× / Cap at 1× for coffee / Price increase | Cap at 1.5× for coffee |
| 2 | Full product Roots redemption | Allow with minimum cash / Disallow / Allow with cap | Allow, 85% cap, ₹199 min cash |
| 3 | Harvest Card earns Roots for buyer | Yes / No | Yes |
| 4 | Roots stack with coupons | Stack with 25% cap / No stacking | Stack, 25% combined cap |
| 5 | Roots on shipping | Never / Sapling+ only / All tiers | Never directly |
| 6 | Subscription Roots bonus | +10% / +5% / Flat bonus | +10% on every renewal |
| 7 | Grove cash commission | Yes, from Grove tier / Never | Yes, Grove tier only |
| 8 | Seasonal double Roots | Blanket 2× / Category-specific / Product-specific | Blanket 2×, 7-day windows |
| 9 | Roots on GST portion | Earn on full MRP / Earn on ex-GST | Earn on ex-GST (consult CA) |

---

*Document maintained by Arcane Labs. Last updated: June 2026.*
*All financial models are projections based on stated margins. Actual performance will vary.*
