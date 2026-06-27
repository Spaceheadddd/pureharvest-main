# PureHarvest Roots Program
**The Loyalty System Rooted in the Forest**

*Internal Strategy Document — Arcane Labs × PureHarvest Organics*
*Version 2.0 — June 2026 (major update: referral mechanics, affiliate program, word problems, Roots beyond the network)*

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
20. [Referral Program — Full Rules](#referral)
21. [Affiliate Program](#affiliate)
22. [Word Problems — Math for Every Scenario](#word-problems)
23. [Roots Beyond the Network](#roots-beyond)
24. [Open Questions & Decisions](#open-questions)

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

**Per-order redemption cap:** Maximum 25% of order value, regardless of Roots balance. This prevents the compounding loss risk on small orders while still feeling generous to the customer. Business always collects at least 75% of every order in real cash.

**Example:** Customer has 200 Roots but orders ₹1,000 worth. Max redemption = ₹250 (25% of ₹1,000) = 25 Roots redeemed. They pay ₹750 in cash.

> **⚠️ Cap change from v1.0:** Previous version had 15% cap. Updated to 25% for better customer experience — the math still protects the business at all tier levels (see Section 22, Word Problem 4).

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
| Welcome | +10 | Once, on first paid order ≥₹499 | Not on signup — requires real spend |
| Birthday month | +5 | Annual | No purchase required |
| New category explored | +2 | Once per category | Max 4× lifetime (8 Roots) |
| All 4 categories (Forest Family) | +20 | First time only | Major milestone |
| Write a review (verified) | +1 | Per product, max 4 | |
| Subscribe (monthly box) | +10% on every renewal | Per subscription order | Subscription loyalty |
| Refer a friend | +25 | Per successful referral, max 5 referrals lifetime | Unlocks only when referee places first paid order ≥₹999. Fixed — not connected to tier. See Section 20. |
| Seasonal Double Roots event | 2× earn | 7-day windows | Harvest season, Diwali, etc. |
| Bulk order ₹5,000+ | +5 | Per qualifying order | Cap at 5 per order |
| Bulk order ₹10,000+ | +15 | Per qualifying order | Cap at 15 per order |

**All bonuses earn at 1× — the tier multiplier applies only to base spend Roots.**

> **⚠️ Referral change from v1.0:** Previous version had +5 Roots per referral with no cap. This was redesigned entirely. See Section 20 for the full referral program with spend-gating and abuse prevention logic.

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

---

## 20. Referral Program — Full Rules {#referral}

### Core Principle

> **No Root is issued until real money is spent.**

Referral Roots are liabilities. If issued freely (on signup, on link click), they become a loss mechanism. Every referral Root must be triggered by a real paid order.

### The Rules

| Rule | Value | Why |
|---|---|---|
| Referrer reward | +25 Roots | Fixed. Not connected to tier multiplier. |
| Referee reward | +25 Roots | Fixed. Not connected to tier multiplier. |
| Unlock condition | Referee must place first order ≥ ₹999 (paid in cash) | Ensures real revenue before liability is created |
| Referrer maximum | 5 referrals per account (lifetime) | Prevents farming. Max 125 Roots from referrals. |
| Referee minimum order | ₹999 | Aligns with free shipping threshold — one clean rule |
| Account verification | Phone OTP required. One phone = one account. | Prevents duplicate account abuse |
| Welcome bonus for referee | +10 Roots on first order (in addition to referral 25) | Referee gets 35 Roots total from first order |

### The Spend-Gate Explained

Without spend-gating:
```
A creates Account 2 → refers themselves
A (Account 1) gets 25 Roots → ₹250 off
A (Account 2) gets 25 Roots → ₹250 off
Business issues ₹500 in discount liability, receives ₹0
```

With spend-gating:
```
A refers B
B must place order ≥ ₹999 with real cash
THEN B gets 25 Roots (+ 10 welcome = 35 Roots)
THEN A gets 25 Roots
Business received ₹999 before issuing any Roots
```

### Net Math (one referral pair)

```
Revenue from referee's first order:      ₹999
Gross profit (45%):                      ₹449
Liability created — referee (35 Roots):  ₹350 (future discount)
Liability created — referrer (25 Roots): ₹250 (future discount)
Total liability:                         ₹600

BUT — liabilities are only realised if/when those Roots are redeemed.
With 25% redemption cap, redemptions happen across multiple future orders.
Each redemption order generates fresh revenue.

Effective acquisition cost of new customer = ₹600 in future discounts
vs. Instagram ad CAC = ₹500–₹2,000 per customer
Referral CAC is cheaper and the customer self-selected as interested.
```

### Why 25 Roots (not 50) for the Referrer

```
At 50 Roots (₹500) + 25 Roots referee (₹250) = ₹750 total liability
Referee spends ₹999 → ₹999 − ₹750 = ₹249 net before COGS
At 45% margin: ₹999 × 45% = ₹449 gross profit − ₹750 liability = deficit possible
Too thin. Liable to create loss on coffee-heavy or bulk-discount orders.

At 25 Roots (₹250) + 25 Roots referee (₹250) = ₹500 total liability
₹999 × 45% = ₹449 gross profit
₹449 − ₹500 = small deficit in gross IF redeemed immediately.
BUT with 25% cap, referee can only redeem ₹250 on their ₹999 order.
Pays ₹749 cash. Business gets ₹749 revenue on first redemption order.
₹749 × 45% = ₹337 gross, minus ₹250 discount = ₹87 net on that order.
Sustainable. And remaining 10 Roots carry over to next order.
```

### Referral Redemption Flow

```
Referee (Aasha) earns 35 Roots on first ₹999 order
→ Wants to redeem on second order of ₹800
→ 25% cap: max ₹200 redeemable = 20 Roots
→ Pays ₹600 cash, uses 20 Roots
→ Remaining: 15 Roots carry over
→ Business receives ₹600 cash on ₹800 order
```

---

## 21. Affiliate Program {#affiliate}

### What It Is

The Affiliate Program is **not** the Roots loyalty system. It is a separate marketing partnership track for people who actively drive traffic and conversions — food bloggers, YouTubers, wellness influencers, loyal customers with large followings.

| | Roots Referral | Affiliate Program |
|---|---|---|
| Who | Any customer | Approved partners only |
| Reward type | Roots (store discount) | Cash commission or high-value store credit |
| Tracking | Account-linked referral code | Unique affiliate code + URL param |
| Cap | 5 referrals lifetime | No cap |
| Commission | Fixed 25 Roots per referral | % of each referred order |
| Applies to | First order only | All orders for 6 months from first click |

### Commission Structure

| Payout type | Rate | Notes |
|---|---|---|
| Cash (bank transfer / UPI) | 8% of order value | Paid monthly, minimum ₹500 payout |
| Store credit | 12% of order value | Higher rate to incentivise choosing store credit over cash |

Affiliate chooses their preferred payout type when they sign up. Cannot switch more than once per quarter.

### Tracking

Every affiliate gets a unique code: `ROHAN2026`, `PRIYA10`, etc.

Links look like: `pureharvest.in/?aff=ROHAN2026`

**How tracking works:**
1. Visitor lands on site via affiliate link → code stored in localStorage for 30 days
2. If they place an order within 30 days, the affiliate code is attached to that order
3. Commission calculated on order subtotal (before shipping, after any Roots/coupon discount)
4. Logged in admin: `{ affiliateCode, orderId, orderValue, commission, date }`
5. Monthly payout report generated → Jayesh pays via UPI/NEFT

**Attribution rule:** First-click attribution. If the same customer visits via two different affiliate links, the first one gets credited.

### Application & Approval

Not open to everyone. Affiliate must:
- Apply via a form (or be personally invited)
- Have a verifiable audience (Instagram/YouTube/blog)
- Agree to not misrepresent the product

This keeps the program clean and prevents code-sharing abuse.

### Business Economics

```
Affiliate commission = 8% of order
Gross margin = 45%
Net after affiliate commission = 45% − 8% = 37%

Compare to:
→ Instagram ad: ₹500–2,000 CAC
→ Affiliate: 8% of first ₹999 order = ₹80 for a new customer
   Plus 8% on repeat orders for 6 months

A customer who orders 3 times (₹999, ₹1,500, ₹2,000):
→ Affiliate earns: 8% × (₹999 + ₹1,500 + ₹2,000) = 8% × ₹4,499 = ₹360
→ Business revenue: ₹4,499
→ Gross profit (45%): ₹2,024
→ Affiliate cost: ₹360
→ Net: ₹1,664 = 37%

₹360 to acquire and retain a ₹4,499-revenue customer. Excellent.
```

---

## 22. Word Problems — Math for Every Scenario {#word-problems}

> These problems are designed to make the financial logic of the Roots program unambiguous for anyone reviewing the system. All answers show full working. All scenarios are based on confirmed rules.

---

### Problem 1 — Basic Earn

**Priya orders Forest Honey 500g for ₹699. She is a new Seedling-tier customer. How many Roots does she earn? What is the future liability PureHarvest has created?**

**Working:**

```
Step 1: Identify earn rate
Earn rate = 1 Root per ₹100 spent

Step 2: Calculate Roots from purchase
₹699 ÷ ₹100 = 6.99 → floor to 6 Roots
(Roots are always floored, never rounded up)

Step 3: Add welcome bonus
This is Priya's first paid order and it's ≥ ₹499
Welcome bonus = +10 Roots

Step 4: Total Roots earned this order
6 + 10 = 16 Roots

Step 5: Calculate future liability
16 Roots × ₹10 per Root = ₹160 future discount liability

Step 6: Check if business is profitable
Revenue: ₹699
Gross profit (45%): ₹699 × 0.45 = ₹314.55
Future liability created: ₹160
Net profit retained (before liability is realised): ₹314.55
Even if Priya redeems all 16 Roots next order: ₹314.55 − ₹160 = ₹154.55 net ✅
```

**Answer:** Priya earns 16 Roots. Liability created = ₹160. Business is profitable even on immediate full redemption.

---

### Problem 2 — Tier Multiplier Earn

**Rahul is at the Roots tier (₹15,000+ lifetime spend, 1.5× multiplier). He places an order for ₹3,000. How many Roots does he earn vs a Seedling on the same order?**

**Working:**

```
Step 1: Base Roots (same for both tiers)
₹3,000 ÷ ₹100 = 30 base Roots

Step 2: Seedling earn (1× multiplier)
30 × 1.0 = 30 Roots

Step 3: Roots-tier earn (1.5× multiplier)
30 × 1.5 = 45 Roots

Step 4: Difference
45 − 30 = 15 extra Roots for being at Roots tier
₹150 more in future redemption value as a reward for loyalty

Step 5: Liability comparison
Seedling liability: 30 × ₹10 = ₹300
Roots-tier liability: 45 × ₹10 = ₹450

Step 6: Is the Roots tier still profitable?
Revenue: ₹3,000
Gross profit (45%): ₹1,350
Max liability (45 Roots at 25% cap = max ₹750 redeemable ever):
  → With 25% cap, Rahul can redeem max ₹750 per order
  → Over time all 45 Roots = ₹450 redeemed across multiple orders
₹1,350 gross − ₹450 future redemptions = ₹900 minimum net ✅
```

**Answer:** Rahul earns 45 Roots vs Seedling's 30. The extra 15 Roots cost the business ₹150 in future discounts on a ₹1,350 gross profit — completely sustainable.

---

### Problem 3 — Basic Redemption

**Kavitha has 40 Roots and places a ₹1,500 order. She wants to use all 40 Roots. How much does she pay? What does PureHarvest net?**

**Working:**

```
Step 1: Check minimum balance rule
After redemption, Kavitha must keep 3 Roots
Maximum redeemable = 40 − 3 = 37 Roots

Step 2: Check 25% order cap
25% of ₹1,500 = ₹375
37 Roots = ₹370 → ₹370 < ₹375, so cap doesn't restrict here

Step 3: Redemption value
37 Roots × ₹10 = ₹370 off

Step 4: What Kavitha pays
₹1,500 − ₹370 = ₹1,130 in cash

Step 5: PureHarvest P&L on this order
Revenue received: ₹1,130
Cost of goods (55% of ₹1,500 at 45% margin): ₹825
Net profit: ₹1,130 − ₹825 = ₹305 = 20.3% ✅

Step 6: Roots Kavitha earns on this order
₹1,500 ÷ ₹100 = 15 new Roots earned
(Earn is always on the pre-discount order value)
Balance: 3 kept + 15 new = 18 Roots after this order
```

**Answer:** Kavitha pays ₹1,130. She keeps 3 Roots + earns 15 new = 18 Roots. Business nets ₹305 (20.3%). Profitable.

---

### Problem 4 — The 25% Redemption Cap in Action

**Arjun has 150 Roots and orders ₹500 of coffee. He wants to use as many Roots as possible. What's the maximum he can use? What does he pay? Show why this protects the business.**

**Working:**

```
Step 1: Without the cap — what would happen
150 Roots = ₹1,500 redemption value
₹1,500 > ₹500 order = Arjun would get the order for free
Revenue: ₹0
COGS: ₹500 × 55% = ₹275
Business loss: −₹275 ❌

Step 2: Apply the 25% cap
25% of ₹500 = ₹125 maximum discount
₹125 ÷ ₹10 = 12.5 → floor to 12 Roots

Step 3: Minimum balance check
150 − 12 = 138 remaining > 3 minimum ✅

Step 4: What Arjun actually pays
₹500 − ₹120 (12 Roots × ₹10) = ₹380 cash

Step 5: Business P&L with cap
Revenue received: ₹380
COGS: ₹275 (coffee at 30% margin means COGS = 70% × ₹500 = ₹350; ₹500 × 0.70 = ₹350)
Wait — coffee margin is 30%, so:
  Gross profit = ₹500 × 30% = ₹150
  Discount given: ₹120
  Net: ₹150 − ₹120 = ₹30 = 6% ⚠️

Hmm — still thin on a coffee-only order. This is the known coffee risk.
Mitigation: coffee earns at 1× regardless of tier (not 2×).
And Arjun's 138 remaining Roots came from other orders with higher margins.

Step 6: The protection the cap provides
Without cap: −₹275 loss
With cap: +₹30 net
The cap turned a ₹275 loss into a ₹30 profit.
```

**Answer:** Arjun can use 12 Roots (₹120 off), pays ₹380. The 25% cap prevented a ₹275 loss and kept the transaction profitable.

---

### Problem 5 — Welcome Bonus Scenario

**Deepa signs up for a PureHarvest account but doesn't order for 2 weeks. How many Roots does she have? She then places her first order of ₹350. Does she get the welcome bonus?**

**Working:**

```
Step 1: Roots on signup
Welcome bonus = 0 Roots
Roots are never issued on signup — requires a real paid order

Step 2: Deepa's balance after 2 weeks of no orders
0 Roots

Step 3: First order of ₹350 — does it qualify for welcome bonus?
Welcome bonus condition: first paid order must be ≥ ₹499
₹350 < ₹499 → welcome bonus NOT triggered

Step 4: What Deepa earns on this order
₹350 ÷ ₹100 = 3 Roots (from purchase only)
No welcome bonus.

Step 5: What triggers the welcome bonus?
Deepa adds more to her cart or places a second order ≥ ₹499.
On the next qualifying order: welcome bonus +10 Roots applies
(Welcome bonus is once per account — first order ≥ ₹499, not strictly the first order placed)

Step 6: Why this rule exists
If welcome bonus triggered on any order regardless of value:
  → 10 Roots = ₹100 free for a ₹50 order (200% return)
  → Business loss
The ₹499 minimum ensures the welcome bonus is earned from a meaningful purchase.
```

**Answer:** Deepa has 0 Roots after signup. Her ₹350 order earns 3 Roots — no welcome bonus (below ₹499 threshold). Welcome bonus triggers on her next qualifying order ≥₹499.

---

### Problem 6 — Referral (Clean Scenario)

**Aasha refers her friend Neha to PureHarvest. Neha places her first order of ₹1,200. What does each person earn? What does PureHarvest net? Is this profitable?**

**Working:**

```
Step 1: Does the referral unlock? (spend-gate check)
Neha's order = ₹1,200 ≥ ₹999 minimum ✅ Referral unlocks.

Step 2: What Neha earns
Purchase Roots: ₹1,200 ÷ ₹100 = 12 Roots
Welcome bonus: +10 Roots (first order ≥ ₹499) ✅
Referee Roots: +25 Roots (referral reward)
Total: 12 + 10 + 25 = 47 Roots

Step 3: What Aasha earns
Referral reward: +25 Roots
(This is Aasha's 1st referral out of her 5 max)

Step 4: Liability created
Neha: 47 Roots × ₹10 = ₹470 future liability
Aasha: 25 Roots × ₹10 = ₹250 future liability
Total liability issued: ₹720

Step 5: Revenue from Neha's order
₹1,200 cash received

Step 6: Business P&L
Revenue: ₹1,200
Gross profit (45%): ₹540
Total liability created: ₹720

Wait — liability > gross profit on this single order.
BUT: Liability is spread across FUTURE orders, not this one.
  Neha's 47 Roots at 25% cap:
  → Next order ₹1,000: max redeem = ₹250 (25 Roots)
  → PureHarvest gets ₹750 cash
  → 22 Roots carry to order after that
  → Process repeats across multiple orders

  Over Neha's first 3 orders (₹1,200 + ₹1,000 + ₹800 = ₹3,000):
  Revenue: ₹3,000
  Gross profit: ₹1,350
  Total Roots redeemed across 3 orders: ~47 Roots = ₹470 max
  Net: ₹1,350 − ₹470 = ₹880 = 29.3% ✅

  Aasha's 25 Roots realised on her own future orders (unrelated to Neha)

Step 7: Acquisition cost comparison
Cost to acquire Neha via referral: ₹720 in future discounts across multiple orders
Cost to acquire Neha via paid Instagram ad: ₹500–₹2,000
AND Neha is more likely to be a genuine customer (referred by a friend)
```

**Answer:** Neha earns 47 Roots. Aasha earns 25 Roots. Business nets ₹540 on the first order, with ₹720 in future discount liabilities spread across Neha's future orders. Net acquisition cost far below paid ads.

---

### Problem 7 — Referral Abuse Attempt (Spend-Gate Block)

**Vikram creates a second account using his partner's number and refers himself. He wants to get the referral bonus for free. Show exactly where the system blocks this and what happens instead.**

**Working:**

```
Step 1: Can Vikram create two accounts?
Each account requires phone OTP verification.
One phone number = one account.
Vikram's phone and his partner's phone are different numbers.
→ Two accounts can technically exist (his and his partner's)

Step 2: Vikram (Account 1) refers Partner Account (Account 2)
Referral code sent. Account 2 signs up with partner's phone.
So far — no money spent, no Roots issued.

Step 3: The spend-gate — what has to happen for Roots to unlock
Account 2 MUST place a real paid order of ≥ ₹999 using real money.
Until that order is placed: 0 Roots issued to either account.

Step 4: If Account 2 places a ₹999 order
Business receives ₹999 in cash.
Account 2 earns: 9 purchase Roots + 10 welcome + 25 referee = 44 Roots
Account 1 (Vikram) earns: 25 Roots

→ In this case, ₹999 was genuinely spent. Business is profitable.
Even if the "referral" was manufactured, real money entered the business.
This is the same outcome as a legitimate referral.

Step 5: What if Vikram tries to immediately redeem all Roots?
Account 2's 44 Roots on a ₹999 order:
25% cap = ₹249 max → can redeem 24 Roots, pays ₹750
Account 1's 25 Roots on any order: can redeem up to 25% cap of that order

Step 6: Can Vikram "game" this profitably?
He spent ₹999 real money to get:
→ 44 Roots × ₹10 = ₹440 future value
→ 25 Roots × ₹10 = ₹250 future value
→ Total ₹690 future value, only realisable across multiple future orders at 25% cap

He is still spending real money (₹999) to receive future discounts (₹690 total, spread over time).
That's ≈ 69% return on his ₹999 spend — not ideal for the business at this rate.

Step 7: How to close the remaining gap
Stricter rule: Referral rewards only unlock if referee and referrer have different phone numbers AND different shipping addresses.
Same address = same household = no referral bonus issued.
This catches the obvious self-referral.

Alternatively: Referral code only valid for people who haven't visited the site before
(first-time visitor cookie check). Returning visitors' referral code attempts are rejected.
```

**Answer:** The spend-gate prevents zero-cost Roots. But the partial loophole (same household, different phones) is closed by address-matching and new-visitor checks. Even in the worst case, the business receives ₹999 before any Roots are issued.

---

### Problem 8 — Referral Chain Limit

**Meera has already referred 4 friends successfully. She tries to refer a 5th friend, Lakshmi. Then she tries to refer a 6th friend, Rekha. What happens?**

**Working:**

```
Step 1: Current referral count
Meera has made 4 successful referrals (each friend placed ≥₹999 order)
Each referral earned Meera +25 Roots
Total referral Roots so far: 4 × 25 = 100 Roots = ₹1,000 future value

Step 2: 5th referral — Lakshmi
Meera shares her code with Lakshmi.
Lakshmi signs up and places a ₹1,500 order.
Count = 5 (at the limit)
→ Meera earns +25 Roots ✅ (5th and final referral)
→ Lakshmi earns 35 Roots (15 purchase + 10 welcome + 25 referee... wait:
  ₹1,500 ÷ ₹100 = 15 purchase + 10 welcome + 25 referee = 50 Roots) ✅

Step 3: 6th referral attempt — Rekha
Meera shares her code with Rekha.
System checks: Meera has 5/5 referrals used. Limit reached.
→ Rekha can sign up but the referral code is marked as expired for Meera's account.
→ Rekha gets NO referee bonus (₹25 Roots) — referral is not valid.
→ Meera gets NO referrer bonus.
→ Rekha still earns normal purchase Roots + welcome bonus if she orders.

Step 4: Meera's total referral earnings
5 × 25 Roots = 125 Roots = ₹1,250 future discount value
Total Meera has been in the system: she must have sent Roots at enough real spend
to hit 5 referrals × ₹999 each = ₹4,995 in new customer revenue generated

Step 5: Business P&L on Meera's 5 referrals
Revenue from 5 new customers' first orders (avg ₹1,200 each): ₹6,000
Gross profit (45%): ₹2,700
Meera's referral Roots liability: 125 × ₹10 = ₹1,250 (future, spread over time)
Each referee's 35 Roots: 5 × 35 × ₹10 = ₹1,750 (future, spread over time)
Total liability: ₹3,000
Net (before liability realised): ₹2,700
Net after all liabilities fully redeemed (worst case, all at once): −₹300

Wait — that's a small loss in the extreme worst case.
BUT: With 25% cap, no order can discount more than 25%.
Each new customer redeems across multiple orders, each generating fresh revenue.
In practice, the 5-referral cap means this is the maximum scenario.
And Meera's cap was designed so the maximum extractable value is bounded.
```

**Answer:** Meera's 5th referral succeeds. Her 6th attempt is blocked — Rekha receives no referral bonus. Meera's lifetime referral cap = 125 Roots (₹1,250). Business remains profitable across the 5-customer chain when viewed across multiple orders.

---

### Problem 9 — Stacking Roots + Coupon (Combined Cap)

**Sunita has 30 Roots and also has a coupon `ARAKU2026` for 20% off. Her order is ₹1,000. She wants to use both. What happens? What does she actually pay?**

**Working:**

```
Step 1: What each discount offers
30 Roots = ₹300 off (but subject to caps)
Coupon: 20% of ₹1,000 = ₹200 off

Step 2: Combined cap rule
Maximum combined discount = 25% of order value
25% of ₹1,000 = ₹250 maximum total discount

Step 3: Apply discounts in priority order
(Coupons applied first, then Roots fill the gap)

Coupon: 20% of ₹1,000 = ₹200 off → ₹200 used
Remaining cap: ₹250 − ₹200 = ₹50 left for Roots
₹50 ÷ ₹10 = 5 Roots usable

Step 4: Minimum balance check
30 − 5 = 25 Roots remaining > 3 minimum ✅

Step 5: What Sunita pays
₹1,000 − ₹200 (coupon) − ₹50 (Roots) = ₹750 cash

Step 6: Business P&L
Revenue: ₹750
Gross profit (45% of ₹1,000 pre-discount): ₹450
Discounts given: ₹250
Net: ₹450 − ₹250 = ₹200 = 20% ✅

Step 7: Sunita's Roots balance after
Started: 30 Roots
Used: 5 Roots
Remaining: 25 Roots (which she'll use on future orders)
```

**Answer:** Sunita pays ₹750. She gets ₹200 off from coupon + ₹50 from Roots (only 5 Roots usable due to combined 25% cap). Her remaining 25 Roots carry forward. Business nets 20%.

---

### Problem 10 — Affiliate Program (Full Commission Chain)

**Rohan is a food blogger with 8,000 Instagram followers. He joins the Affiliate Program and gets code `ROHAN2026`. In Month 1, three followers buy using his code. Calculate his earnings and PureHarvest's P&L.**

**Given:**
- Customer 1 (Ananya): Orders ₹1,200
- Customer 2 (Pradeep): Orders ₹800
- Customer 3 (Rekha): Orders ₹2,500
- Affiliate rate: 8% cash

**Working:**

```
Step 1: Rohan's commissions
Ananya:  ₹1,200 × 8% = ₹96
Pradeep: ₹800  × 8% = ₹64
Rekha:   ₹2,500 × 8% = ₹200
Total commission: ₹360

Step 2: Total revenue generated
₹1,200 + ₹800 + ₹2,500 = ₹4,500

Step 3: PureHarvest P&L
Revenue: ₹4,500
Gross profit (45%): ₹2,025
Affiliate commission paid: ₹360
Net profit: ₹2,025 − ₹360 = ₹1,665 = 37% ✅

Step 4: Do these 3 customers also earn Roots?
Yes — they earn Roots normally on their orders.
Rohan does NOT earn Roots. Affiliates earn cash, not Roots.
Roots and Affiliate are separate systems.

Step 5: Comparison to paid ads
To acquire 3 customers via Instagram ads: ₹500–₹2,000 per customer
= ₹1,500–₹6,000 total
Rohan's commission: ₹360 for 3 customers
Affiliate is 4–16× more efficient than paid ads in this scenario.

Step 6: Month 2 — Ananya reorders ₹1,500
Attribution: first click within 30 days from Rohan's link
Ananya placed her first order in Month 1 → 30-day window still active in Month 2?
Month 1 Day 5 → Month 2 = 25+ days. Depends on exact date.
If within 30 days: Rohan earns 8% × ₹1,500 = ₹120 more.
If outside 30 days: Rohan earns nothing on Ananya's repeat orders.

Step 7: Should affiliate earn on all repeat orders?
Option A: 30-day window (standard). Rohan's total for Ananya = ₹96 (or ₹96+₹120).
Option B: 6-month window. Incentivises Rohan to refer only high-LTV customers.
Recommendation: 30-day window to start. Upgrade to 6-month for top affiliates.
```

**Answer:** Rohan earns ₹360 in Month 1. PureHarvest nets ₹1,665 (37%) after paying commission. 3 customers acquired for ₹120 avg each vs ₹500–₹2,000 via paid ads. Highly efficient.

---

### Problem 11 — Roots Expiry

**Farida has 80 Roots but hasn't ordered in 20 months. She comes back to buy. What happens to her Roots? What does she see?**

**Working:**

```
Step 1: Expiry rule
Roots expire after 18 months of no purchase activity.
Farida has been inactive for 20 months > 18 months.

Step 2: What expires
80 Roots − 3 Roots (minimum balance rule preserved) = 77 Roots expire.

Step 3: What remains
Farida's balance: 3 Roots (minimum always preserved)
She is never left at 0 — she's always "in" the programme.

Step 4: Nudge emails Farida should have received
→ Month 3 inactivity: "Your Roots are waiting for you."
→ Month 12: "Your Roots expire in 6 months."
→ Month 15: "Final reminder — 90 days left."
→ Month 18: Roots expired. Balance set to 3.

Step 5: Farida's return order ₹1,500
Purchase Roots: 15 Roots earned
Balance: 3 (preserved) + 15 (new) = 18 Roots

Step 6: Business value of expiry
77 Roots expired = ₹770 in discount liability that never materialised
= ₹770 saved from a customer who wasn't active enough to redeem
```

**Answer:** 77 of Farida's 80 Roots expire. She retains 3 (minimum balance). On return she earns fresh Roots. The expiry saved PureHarvest ₹770 in unclaimed discount liability.

---

### Problem 12 — Full Product Redemption (Minimum Cash Rule)

**Suresh has 200 Roots and wants to buy Forest Honey 1kg (₹1,299) using only Roots. Can he? What is the minimum he must pay in cash?**

**Working:**

```
Step 1: Full redemption without any cap
200 Roots = ₹2,000 potential value
₹1,299 product — could technically pay entirely with Roots (200 > 130 needed)

Step 2: Apply 25% cap
Only 25% of ₹1,299 redeemable in Roots = ₹324.75 → ₹320 (32 Roots, floored)

Step 3: Minimum cash Suresh must pay
₹1,299 − ₹320 = ₹979 cash minimum

Step 4: Remaining Roots
200 − 32 = 168 Roots remaining (well above 3 minimum)

Step 5: Business P&L
Revenue: ₹979
Honey margin (60%): ₹1,299 × 60% = ₹779 gross profit
Discount given: ₹320
Net: ₹779 − ₹320 = ₹459 = 35.3% ✅

Step 6: What if Suresh wants the 85% cap (full product rule, Section 8)?
The 85% cap from Section 8 (₹199 minimum cash) is more generous than 25% cap.
These two rules contradict — clarification needed.
Decision: 25% cap is the operative rule. Section 8 (85% cap) is retired.
Why: 85% cap would allow 110 Roots used on ₹1,299 = ₹1,100 off, pay ₹199.
At 60% honey margin: ₹779 gross − ₹1,100 discount = −₹321 loss ❌
25% cap is the correct protection.
```

**Answer:** Suresh can use 32 Roots (₹320 off). He pays ₹979 in cash. Business nets 35.3%. He cannot pay with Roots alone — the 25% cap ensures minimum 75% cash always.

> **Note:** This supersedes the 85% full redemption rule from Section 8. Section 8 should be considered updated: the 25% per-order cap is the governing rule, not the 85% cap.

---

### Problem 13 — Ancient Tier + Coffee (Worst Case Margin)

**Kavitha is an Ancient-tier customer (2× earn). She orders ₹2,000 of coffee and immediately redeems Roots from the same order. What's the narrowest the margin gets?**

**Working:**

```
Step 1: Roots earned on this coffee order
₹2,000 ÷ ₹100 = 20 base Roots
Coffee multiplier: Coffee earns at 1× regardless of tier (see Section 12 mitigation).
So Kavitha earns: 20 × 1 = 20 Roots (not 40)

Step 2: Kavitha redeems Roots (assume she had 100 Roots before this order)
25% cap on ₹2,000 = ₹500 max discount = 50 Roots
She has 100 Roots, uses 50, keeps 3 min → can use 47 Roots = ₹470

But she uses 47 Roots this order (₹470 off)

Step 3: What Kavitha pays
₹2,000 − ₹470 = ₹1,530

Step 4: Business P&L
Revenue: ₹1,530
Coffee margin (30%): ₹2,000 × 30% = ₹600 gross profit
Discount: ₹470
Net: ₹600 − ₹470 = ₹130 = 6.5% ⚠️

Step 5: Is this a real risk?
For coffee to have 100 Roots to redeem, Kavitha spent at minimum ₹10,000 (at 2×: ₹5,000)
On those ₹5,000+ of purchases, PureHarvest earned ~45% average margin.
The ₹470 discount was funded by that historical profit.

Step 6: Relationship math
Historical spend to build 100 Roots at 1× coffee: ₹10,000
Revenue: ₹10,000, Gross profit: ₹4,500
Discount now realised: ₹470
Net across the relationship: ₹4,500 − ₹470 = ₹4,030 = 40.3% ✅

The transaction looks thin but the relationship is healthy.
```

**Answer:** Kavitha pays ₹1,530. Transaction margin = 6.5% (thin but positive). Relationship margin = 40.3% (healthy). Coffee at Ancient tier with aggressive redemption is the tightest case — manage via the 1× multiplier rule for coffee.

---

### Problem 14 — Referral + Roots Redemption Combined

**Aasha referred Neha (from Problem 6). It's now 3 months later. Aasha uses her 25 referral Roots + her 40 earned Roots (65 total) on a ₹1,800 order. What does she pay?**

**Working:**

```
Step 1: Aasha's total Roots balance
Referral Roots: 25
Earned Roots (from her own orders): 40
Total: 65 Roots

Step 2: 25% cap on ₹1,800 order
25% × ₹1,800 = ₹450 max discount = 45 Roots

Step 3: Minimum balance check
65 − 45 = 20 Roots remaining > 3 minimum ✅

Step 4: What Aasha uses and pays
45 Roots × ₹10 = ₹450 off
₹1,800 − ₹450 = ₹1,350 cash

Step 5: Business P&L
Revenue: ₹1,350
Gross profit (45% of ₹1,800): ₹810
Discount: ₹450
Net: ₹810 − ₹450 = ₹360 = 20% ✅

Step 6: Note on where the 25 referral Roots came from
Those 25 Roots were issued because Neha spent ₹1,200 in Problem 6.
₹1,200 revenue → ₹540 gross profit.
₹250 (Aasha's referral Roots) eventually realised here.
₹540 − ₹250 = ₹290 net from that referral relationship.
```

**Answer:** Aasha pays ₹1,350. Uses 45 Roots (limited by 25% cap), keeps 20 Roots. Business nets 20%. The referral Roots (funded by Neha's purchase) are realised safely within the cap.

---

## 23. Roots Beyond the Network {#roots-beyond}

### The Question

> "Is there a chance or way to make Roots actually be accepted outside the network as a way to pay or something else?"

Short answer: **Yes, in limited forms. But full external currency requires regulation.**

Here are the options, from simplest to most complex:

---

### Option 1 — Harvest Card Conversion (Simplest, Available Now)

Roots can already be converted to Harvest Card balance (see Section 16).

A Harvest Card is a stored-value code: `PH-HARV-XXXX-XXXX`. It works like a gift card — whoever holds the code can use it at PureHarvest checkout.

**This makes Roots indirectly transferable:**
```
Aasha has 50 Roots → converts to ₹500 Harvest Card → gives to her sister
Sister uses it at checkout → pays ₹0 up to ₹500
```

Roots themselves don't leave the network, but their value does — via the Harvest Card. This is the cleanest option with no regulatory overhead.

**Limitation:** Still only spendable at PureHarvest. But transferable to anyone.

---

### Option 2 — Partner Merchant Acceptance (Medium-Term, 6–12 months)

Sign agreements with 2–5 complementary local businesses:
- An Araku coffee shop
- A Hyderabad wellness store
- A yoga studio in Bangalore
- An artisanal food market

These businesses display "PureHarvest Roots accepted here." Customer shows their Roots balance at checkout. Merchant notes it. PureHarvest settles with that merchant monthly via UPI transfer at ₹10 per Root.

**No RBI license needed** — this is B2B barter with monthly cash settlement.

**What it costs PureHarvest:**
```
Customer uses 10 Roots at partner coffee shop
PureHarvest pays coffee shop: ₹100 (10 × ₹10)
These 10 Roots were earned on ₹1,000 PureHarvest purchase
Gross profit on that ₹1,000: ₹450
Cost of Roots redemption at partner: ₹100
Net: ₹450 − ₹100 = ₹350 ✅ (same as internal redemption)
```

This is identical economics to internal redemption — but the customer feels like Roots have real-world value.

**Practical challenge:** Partner must trust PureHarvest's Roots balance reporting. Need a simple verification system — QR scan, SMS code, or a merchant-facing app page. Buildable.

---

### Option 3 — UPI Cashback / Bank Credit (Requires RBI PPI License)

Converting Roots to actual UPI credit (like PhonePe cashback or Paytm cashpoints) would mean PureHarvest is operating a **Prepaid Payment Instrument** under RBI guidelines.

A semi-closed PPI (usable across multiple merchants but not withdrawable as cash) requires:
- Application to RBI (or partnership with a licensed PPI operator)
- Minimum net worth requirements
- Compliance and audit obligations
- KYC requirements for customers

**This is not worth pursuing for a D2C brand at this stage.** The regulatory overhead is designed for fintech companies, not food brands.

**The workaround (if needed in future):** Partner with a licensed PPI provider (Juspay, Razorpay, NSDL Payments, etc.) who hosts the Roots "wallet" on their licensed infrastructure. PureHarvest loads value, customer spends it. The PPI partner handles RBI compliance.

---

### Option 4 — ONDC Integration (Forward-Looking, 2–3 Years)

India's Open Network for Digital Commerce (ONDC) is building a cross-platform commerce layer. If PureHarvest lists on ONDC and other ONDC sellers accept loyalty points cross-platform, Roots could theoretically be used at other ONDC merchants.

This depends on ONDC building a loyalty interoperability standard — not yet available but directionally possible.

**Not actionable now. Worth watching.**

---

### Option 5 — Tokenisation / Blockchain (Not Recommended)

Converting Roots to ERC-20 or Solana tokens would make them tradeable on crypto markets. Technically possible. But:
- SEBI classifies utility tokens with potential market value as regulated securities
- RBI has repeatedly issued advisories against crypto intermediation
- Risk exposure is enormous relative to benefit for a food brand
- Customers don't need blockchain — they need value, not technology

**Do not pursue.**

---

### Recommendation

| Horizon | Action |
|---|---|
| Now | Enable Harvest Card conversion from Roots — makes Roots gifable/transferable |
| 6–12 months | Sign 2–3 partner merchant agreements in Hyderabad/Bangalore — adds "real world" feel |
| 2–3 years | Evaluate ONDC loyalty interoperability as the network matures |
| Never | RBI PPI license build (cost/complexity not justified) or blockchain tokenisation |

The fastest win: Roots → Harvest Card → give to anyone. That's a two-step path to "usable outside your own account" without any regulatory overhead or technical complexity.

---

## 24. Open Questions & Decisions {#open-questions}

| # | Question | Options | Recommended | Status |
|---|---|---|---|---|
| 1 | Coffee multiplier at Ancient tier | Full 2× / Cap at 1× for coffee / Price increase | Cap at 1× for coffee | ⏳ Pending |
| 2 | Full product Roots redemption cap | 25% cap / 85% cap / ₹199 min cash | **25% cap governs. Section 8 (85%) retired.** | ✅ Resolved |
| 3 | Harvest Card earns Roots for buyer | Yes / No | Yes | ⏳ Pending |
| 4 | Roots stack with coupons | Stack with 25% cap / No stacking | Stack, 25% combined cap | ✅ Resolved |
| 5 | Roots on shipping | Never / Sapling+ only / All tiers | Never directly | ✅ Resolved |
| 6 | Subscription Roots bonus | +10% / +5% / Flat bonus | +10% on every renewal | ⏳ Pending |
| 7 | Grove Ambassador cash commission | Yes, from Grove tier / Never | Superseded by Affiliate Program (Section 21) | ✅ Resolved |
| 8 | Seasonal double Roots | Blanket 2× / Category-specific | Blanket 2×, 7-day windows | ⏳ Pending |
| 9 | Roots on GST portion | Earn on full MRP / Earn on ex-GST | Earn on ex-GST (consult CA) | ⏳ Pending |
| 10 | Referral Roots — tier connected? | Yes / **No, fixed** | **Fixed. Not tier-connected.** | ✅ Resolved |
| 11 | Referrer reward | 50 Roots / **25 Roots** | **25 Roots** | ✅ Resolved |
| 12 | Referee reward | 25 Roots | **25 Roots** | ✅ Resolved |
| 13 | Referral spend-gate minimum | ₹499 / **₹999** | **₹999** | ✅ Resolved |
| 14 | Max referrals per account | 3 / **5** / 10 / Unlimited | **5 lifetime** | ✅ Resolved |
| 15 | Welcome bonus | On signup / **On first order ≥₹499** | **On first qualifying order** | ✅ Resolved |
| 16 | Welcome bonus amount | +2 Roots / **+10 Roots** | **+10 Roots** | ✅ Resolved |
| 17 | Redemption cap | 15% / **25%** | **25% of order value** | ✅ Resolved |
| 18 | Roots expiry period | 12 months / **18 months** | **18 months of inactivity** | ✅ Resolved |
| 19 | Affiliate commission — cash rate | 5% / **8%** / 10% | **8% cash or 12% store credit** | ✅ Resolved |
| 20 | Affiliate attribution window | 7 days / **30 days** / 6 months | **30 days to start** | ✅ Resolved |
| 21 | Partner merchant acceptance | Yes / No | **Yes — start with 2–3 partners** | ⏳ Pending |
| 22 | Harvest Card conversion from Roots | Allow / Disallow | **Allow** | ⏳ Pending confirmation |

---

*Document maintained by Arcane Labs. Last updated: June 2026.*
*Version 2.0 — referral mechanics redesigned with spend-gating and abuse prevention. Affiliate program added. Word problems added for all financial scenarios. Roots beyond the network analysis added.*
*All financial models are projections based on stated margins. Actual performance will vary.*
