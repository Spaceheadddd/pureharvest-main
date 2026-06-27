/* ============================================================
   account.js — PureHarvest Account Dashboard
   v3.0 — 6-tab wallet dashboard
   Tabs: Home | Mini Harvest | Orders | Roots | Wallet | Grove

   SUPABASE SWAP POINTS — search "SUPABASE SWAP POINT" for the
   three places to wire real auth + data when Supabase is ready.
   ============================================================ */


/* ──────────────────────────────────────────────────────────
   SESSION LAYER
   ── SUPABASE SWAP POINT A ─────────────────────────────────
   Replace phGetSession / phSetSession / phClearSession with:
     getSession  → const { data } = await supabase.auth.getSession()
     setSession  → handled automatically by supabase.auth.signInWithOtp()
     clearSession→ await supabase.auth.signOut()
   Also fetch user profile from Supabase "profiles" table after auth.
──────────────────────────────────────────────────────────── */
function phGetSession() {
  try { return JSON.parse(localStorage.getItem('ph_session') || 'null'); }
  catch (e) { return null; }
}

function phSetSession(user) {
  /* user shape: { name, identifier, roots, rootsEarned, rootsRedeemed,
     lifetimeSpend, referrals, referralCode, joined, harvestCard, groveStatus,
     addresses: [{ id, label, name, phone, email, pincode, flat, building, area,
       city, state, usageCount, lastUsedAt }] (max 2 — see phAddrPickDefault/
       phAddrUpsert/phAddrDelete/phAddrTouch in checkout.js, shared with the
       Profile tab's address book) } */
  localStorage.setItem('ph_session', JSON.stringify(user));
}

function phClearSession() {
  localStorage.removeItem('ph_session');
}


/* ──────────────────────────────────────────────────────────
   DEMO MODE
   PIN-protected preview. Change DEMO_PIN to update access.
   Demo session persists to localStorage like a real session (see phSetSession
   call on PIN success below) so checkout.js and a page reload can see it too.
   Sign-out clears it the same way a real session would.
──────────────────────────────────────────────────────────── */
var DEMO_PIN = '2580';

/* Demo user profile */
var DEMO_SESSION = {
  name:          'Jayesh Sudhakar',
  identifier:    'jayeshsudhakar@gmail.com',
  roots:         142,           /* current Roots balance */
  rootsEarned:   210,           /* lifetime Roots credited */
  rootsRedeemed: 68,            /* lifetime Roots spent (210 − 68 = 142) */
  lifetimeSpend: 18500,         /* cumulative INR spend; determines tier */
  referrals:     1,             /* successful referrals used (max 5) */
  referralCode:  'JAYESH26',
  joined:        '2026-01-15',
  harvestCard:   0,             /* Harvest Card balance in INR */
  groveStatus:   'approved',    /* 'none' | 'pending' | 'approved' */
  isDemo:        true,
  addresses: [                  /* saved checkout addresses — max 2, picked/auto-saved in checkout.js M2, managed in the Profile tab */
    { id: 'addr_demo_1', label: 'Home', name: 'Jayesh Sudhakar', phone: '9876543210', email: 'jayeshsudhakar@gmail.com',
      pincode: '530015', flat: 'Apt 4B', building: 'Palm Heights', area: 'Rushikonda', city: 'Visakhapatnam', state: 'Andhra Pradesh',
      usageCount: 5, lastUsedAt: Date.now() - 86400000 },  /* used most — wins as the default that auto-fills M2 */
    { id: 'addr_demo_2', label: 'Work', name: 'Jayesh Sudhakar', phone: '9876543210', email: 'jayeshsudhakar@gmail.com',
      pincode: '530003', flat: '3rd Floor', building: 'Tech Park One', area: 'Madhurawada', city: 'Visakhapatnam', state: 'Andhra Pradesh',
      usageCount: 2, lastUsedAt: Date.now() - 7 * 86400000 }
  ],
};

/* Demo orders — 4 recent orders shown in Orders tab and activity feed
   Lifetime spend of ₹18,500 represents all historical purchases;
   only the 4 most recent are displayed here. */
var DEMO_ORDERS = [
  { id: 'PH-2026-0004', date: '13 Jun 2026', items: 'Forest Honey 500g × 2', total: '₹1,398', status: 'Delivered', rootsEarned: 20, cn: 'PHDEMO1234IN' },
  { id: 'PH-2026-0003', date: '22 May 2026', items: 'Araku Coffee 250g × 1',  total: '₹649',   status: 'Delivered', rootsEarned: 9,  cn: null },
  { id: 'PH-2026-0002', date: '14 Apr 2026', items: 'Forest Honey 1kg, Wild Pepper × 2', total: '₹2,248', status: 'Delivered', rootsEarned: 34, cn: null },
  { id: 'PH-2026-0001', date: '28 Jan 2026', items: 'Forest Honey 500g × 1',  total: '₹699',   status: 'Delivered', rootsEarned: 7,  cn: null },
];

/* Demo Roots ledger
   PRODUCTION NOTE: Each earn entry needs { amount, earnedAt, expiresAt }
   so the 12-month rolling expiry can be enforced per-batch.
   Store as rows in a Supabase "roots_ledger" table. */
var DEMO_ROOTS_HISTORY = [
  { label: 'Order PH-2026-0004',  date: '13 Jun 2026', amount: +20, type: 'earn',   expiresAt: '2027-06-13' },
  { label: 'Redeemed at checkout', date: '5 May 2026',  amount: -25, type: 'redeem', expiresAt: null },
  { label: 'Order PH-2026-0003',  date: '22 May 2026', amount: +9,  type: 'earn',   expiresAt: '2027-05-22' },
  { label: 'Referral — Neha S.',  date: '14 Apr 2026', amount: +25, type: 'earn',   expiresAt: '2027-04-14' },
  { label: 'Order PH-2026-0002',  date: '14 Apr 2026', amount: +34, type: 'earn',   expiresAt: '2027-04-14' },
  { label: 'Redeemed at checkout', date: '20 Mar 2026', amount: -43, type: 'redeem', expiresAt: null },
  /* The two entries below have expiresAt set close to 90 days out (for demo expiry warning) */
  { label: 'Order PH-2026-0001',  date: '28 Jan 2026', amount: +7,  type: 'earn',   expiresAt: '2026-09-28' },
  { label: 'Welcome bonus',        date: '15 Jan 2026', amount: +10, type: 'earn',   expiresAt: '2026-09-15' },
  { label: 'Past orders',          date: 'Nov 2025',    amount: +93, type: 'earn',   expiresAt: '2026-11-30' },
];

/* Active subscriptions */
var DEMO_SUBSCRIPTIONS = [
  { name: 'Forest Honey 500g', interval: 'Monthly', next: '13 Jul 2026', price: '₹699', status: 'active' },
];

/* Mini Harvest product catalogue */
var DEMO_PRODUCTS = [
  { name: 'Forest Honey', size: '500g · Raw',    price: '₹699',   roots: 10, emoji: '🍯', ritual: true,  tierPick: false },
  { name: 'Araku Coffee', size: '250g · Medium', price: '₹649',   roots: 9,  emoji: '☕', ritual: true,  tierPick: false },
  { name: 'Forest Honey', size: '1kg · Raw',     price: '₹1,299', roots: 19, emoji: '🍯', ritual: false, tierPick: true  },
  { name: 'Wild Pepper',  size: '100g · Araku',  price: '₹349',   roots: 5,  emoji: '🌶', ritual: false, tierPick: true  },
  { name: 'Dry Apricots', size: '250g · Ladakh', price: '₹499',   roots: 7,  emoji: '🟡', ritual: false, tierPick: false },
  { name: 'Ceylon Cinn.', size: '50g · Ceylon',  price: '₹279',   roots: 4,  emoji: '🌿', ritual: false, tierPick: false },
];


/* ──────────────────────────────────────────────────────────
   TIER CALCULATOR
   Thresholds match ROOTS-PROGRAM.md. Based on lifetime spend.
──────────────────────────────────────────────────────────── */
function phGetTier(lifetimeSpend) {
  if (lifetimeSpend >= 30000) return { name: 'Ancient',  icon: '🌲', mult: 2    };
  if (lifetimeSpend >= 15000) return { name: 'Roots',    icon: '🌳', mult: 1.5  };
  if (lifetimeSpend >= 5000)  return { name: 'Sapling',  icon: '🌿', mult: 1.25 };
  return                             { name: 'Seedling', icon: '🌱', mult: 1    };
}

/* Returns progress toward next tier for the animated progress bar */
function phGetTierProgress(lifetimeSpend) {
  if (lifetimeSpend >= 30000) return { next: null,      pct: 100, remaining: 0 };
  if (lifetimeSpend >= 15000) return { next: 'Ancient', nextIcon: '🌲', pct: Math.round((lifetimeSpend - 15000) / 15000 * 100), remaining: 30000 - lifetimeSpend };
  if (lifetimeSpend >= 5000)  return { next: 'Roots',   nextIcon: '🌳', pct: Math.round((lifetimeSpend - 5000)  / 10000 * 100), remaining: 15000 - lifetimeSpend };
  return                             { next: 'Sapling', nextIcon: '🌿', pct: Math.round(lifetimeSpend / 5000 * 100),             remaining: 5000  - lifetimeSpend };
}


/* ──────────────────────────────────────────────────────────
   TIME-OF-DAY GREETING — returns part-of-day word
──────────────────────────────────────────────────────────── */
function phGreeting() {
  var h = new Date().getHours();
  if (h >= 5  && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}


/* ──────────────────────────────────────────────────────────
   ROOTS EXPIRY WARNING
   Scans the ledger for earn batches expiring within 90 days.
   Returns { count, date } if any are found; null otherwise.
──────────────────────────────────────────────────────────── */
function phRootsExpiryWarning(rootsHistory) {
  var today    = new Date();
  var deadline = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
  var count    = 0;
  var earliest = null;

  rootsHistory.forEach(function (tx) {
    if (tx.type !== 'earn' || !tx.expiresAt) return;
    var exp = new Date(tx.expiresAt);
    if (exp > today && exp <= deadline) {
      count += tx.amount;
      if (!earliest || exp < earliest) earliest = exp;
    }
  });

  if (count <= 0) return null;
  var fmtDate = earliest.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return { count: count, date: fmtDate };
}


/* ──────────────────────────────────────────────────────────
   TOOLTIP SYSTEM
   Add data-tip="..." to any element to make it reveal a
   popover on click. One tooltip open at a time.
   Closes on next click anywhere outside.
──────────────────────────────────────────────────────────── */
function phInitTooltips() {
  document.querySelectorAll('[data-tip]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();

      /* Close any open tooltip; if this button is the source, just toggle off */
      var existing = document.querySelector('.ph-tip-bubble');
      if (existing) {
        var wasThisBtn = existing._src === btn;
        existing.remove();
        if (wasThisBtn) return;
      }

      var tip = document.createElement('div');
      tip.className   = 'ph-tip-bubble';
      tip._src        = btn;
      tip.textContent = btn.getAttribute('data-tip');
      document.body.appendChild(tip);

      /* Position below the button, clamped to viewport edges */
      var rect = btn.getBoundingClientRect();
      var tipW = Math.min(240, window.innerWidth - 24);
      var left = rect.left + rect.width / 2 - tipW / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - tipW - 12));

      tip.style.cssText = [
        'width:'  + tipW + 'px',
        'top:'    + (rect.bottom + window.scrollY + 8) + 'px',
        'left:'   + left + 'px',
      ].join(';');

      /* Auto-close on next click anywhere */
      setTimeout(function () {
        document.addEventListener('click', function closeIt() {
          tip.remove();
          document.removeEventListener('click', closeIt);
        }, { once: true });
      }, 0);
    });
  });
}


/* ──────────────────────────────────────────────────────────
   COUNT-UP ANIMATION
   Ticks a number from 0 to target over ~650ms.
   el: DOM element whose textContent is updated each frame.
──────────────────────────────────────────────────────────── */
function phCountUp(el, target) {
  if (!el || !target) return;
  var duration  = 650;
  var stepTime  = 16;
  var steps     = Math.ceil(duration / stepTime);
  var increment = target / steps;
  var current   = 0;
  var timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}


/* ══════════════════════════════════════════════════════════
   PANEL BUILDERS
   Each returns an HTML string injected into #phPanel.
   ══════════════════════════════════════════════════════════ */


/* ──────────────────────────────────────────────────────────
   HOME — Greeting · Harvest Vault · Tier Ladder ·
          Achievements · Recent activity
──────────────────────────────────────────────────────────── */
function phBuildHomePanel(user, orders, rootsHistory) {
  var tier        = phGetTier(user.lifetimeSpend || 0);
  var progress    = phGetTierProgress(user.lifetimeSpend || 0);
  var roots       = user.roots || 0;
  var card        = user.harvestCard || 0;
  var vaultTotal  = (roots * 10) + card;
  var firstName   = (user.name || 'there').split(' ')[0];
  var todayFmt    = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  /* Progress bar HTML */
  var progressHtml = progress.next
    ? '<div class="ph-prog-wrap"><div class="ph-prog-bar" id="phHomeProgBar" style="width:0%"></div></div>' +
      '<p class="ph-prog-meta">₹' + progress.remaining.toLocaleString('en-IN') + ' more to <strong>' + progress.nextIcon + ' ' + progress.next + '</strong></p>'
    : '<p class="ph-prog-meta ph-prog-meta--max">You\'ve reached the highest tier 🌲</p>';

  /* 4-tier ladder — all tiers visible, current one highlighted */
  var tierDefs = [
    { name: 'Seedling', icon: '🌱', range: '₹0 – ₹4,999',      earn: '₹100 = 1 Root' },
    { name: 'Sapling',  icon: '🌿', range: '₹5,000 – ₹14,999',  earn: '₹100 = 1.25 Roots' },
    { name: 'Roots',    icon: '🌳', range: '₹15,000 – ₹29,999', earn: '₹100 = 1.5 Roots' },
    { name: 'Ancient',  icon: '🌲', range: '₹30,000+',           earn: '₹100 = 2 Roots' },
  ];

  var tierRows = tierDefs.map(function (t) {
    var isCur = t.name === tier.name;
    return '<div class="ph-tier-row' + (isCur ? ' ph-tier-row--cur' : '') + '">' +
      '<div class="ph-tier-row-left">' +
        '<span class="ph-tier-row-icon">' + t.icon + '</span>' +
        '<div><p class="ph-tier-row-name">' + t.name + (isCur ? '<span class="ph-you-pill">You</span>' : '') + '</p>' +
        '<p class="ph-tier-row-range">' + t.range + ' · <strong>' + t.earn + '</strong></p></div>' +
      '</div></div>';
  }).join('');

  /* Achievement badges — earned state based on user data */
  var badges = [
    { label: 'First Harvest',  earned: orders && orders.length > 0 },
    { label: 'Loyal Root',     earned: (user.rootsEarned || 0) >= 50 },
    { label: 'Friend Bringer', earned: (user.referrals  || 0) >= 1 },
    { label: 'Ancient',        earned: (user.lifetimeSpend || 0) >= 30000 },
    { label: 'Grove Member',   earned: user.groveStatus === 'approved' },
  ];

  var badgeHtml = badges.map(function (b) {
    return '<span class="ph-badge' + (b.earned ? ' ph-badge--earned' : ' ph-badge--locked') + '">' +
      (b.earned ? '✓ ' : '○ ') + b.label + '</span>';
  }).join('');

  /* Recent activity — last 3 Roots history items */
  var feedRows = rootsHistory.slice(0, 3).map(function (tx) {
    var amtHtml = tx.amount > 0
      ? '<span class="ph-feed-earn">+' + tx.amount + ' Roots</span>'
      : '<span class="ph-feed-redeem">' + tx.amount + ' Roots</span>';
    return '<div class="ph-feed-row"><span class="ph-feed-label">' + tx.label + ' · ' + tx.date + '</span>' + amtHtml + '</div>';
  }).join('');

  return [
    /* Harvest Vault — hero card: Roots count is the primary number, INR is secondary */
    '<div class="ph-vault-card">',
    '  <p class="ph-vault-label">Harvest Vault <button class="ph-tip" data-tip="Roots (₹10 each) + Harvest Card balance. Redeem Roots or load them to your card.">i</button></p>',
    '  <p class="ph-vault-val">' + roots + '<span class="ph-vault-unit"> Roots</span></p>',   /* Roots first, large serif */
    '  <p class="ph-vault-sub">= ₹' + vaultTotal.toLocaleString('en-IN') + ' redemption value' + (card > 0 ? ' · ₹' + card.toLocaleString('en-IN') + ' on card' : '') + '</p>',
    '  <div class="ph-vault-chips">',
    /* Roots chip: count first, then INR equivalent below it */
    '    <div class="ph-vault-chip">' +
    '      <p class="ph-vault-chip-l">Roots</p>' +
    '      <p class="ph-vault-chip-v">' + roots + ' Roots</p>' +
    '      <p class="ph-vault-chip-inr">₹' + (roots * 10).toLocaleString('en-IN') + '</p>' +
    '    </div>',
    /* Harvest Card chip: INR is the only unit here so show it directly */
    '    <div class="ph-vault-chip">' +
    '      <p class="ph-vault-chip-l">Harvest Card</p>' +
    '      <p class="ph-vault-chip-v">₹' + card.toLocaleString('en-IN', { minimumFractionDigits: 2 }) + '</p>' +
    '    </div>',
    '  </div>',
    '  <div class="ph-vault-actions">',
    '    <button class="ph-vault-action ph-vault-action--primary" data-goto="roots">Redeem Roots</button>',
    '    <button class="ph-vault-action" data-goto="wallet">Load Card</button>',
    '    <button class="ph-vault-action" data-goto="roots">Refer &amp; Earn</button>',
    '  </div>',
    '</div>',

    /* Full tier ladder */
    '<div class="ph-card">',
    '  <p class="ph-card-label">Your tier <button class="ph-tip" data-tip="Tier is based on total lifetime spend and never resets.">i</button></p>',
    tierRows,
    progressHtml,
    '</div>',

    /* Achievement badges */
    '<div class="ph-card">',
    '  <p class="ph-card-label">Achievements</p>',
    '  <div class="ph-badges">' + badgeHtml + '</div>',
    '</div>',

    /* Recent activity feed */
    '<div class="ph-card">',
    '  <p class="ph-card-label">Recent activity</p>',
    feedRows || '<p class="ph-empty-msg">No activity yet.</p>',
    '</div>',

  ].join('\n');
}


/* ──────────────────────────────────────────────────────────
   MINI HARVEST — The Harvest Market
   Shows "Your Ritual" (reorder) if orders exist,
   or a welcome CTA if this is a fresh account.
──────────────────────────────────────────────────────────── */
function phBuildHarvestPanel(user, orders, products) {
  var tier      = phGetTier(user.lifetimeSpend || 0);
  var hasOrders = orders && orders.length > 0;

  /* Product card HTML */
  function prodCard(p) {
    return '<div class="ph-prod">' +
      '<div class="ph-prod-img">' + p.emoji + '</div>' +
      '<div class="ph-prod-body">' +
        '<p class="ph-prod-name">' + p.name + '</p>' +
        '<p class="ph-prod-size">' + p.size + '</p>' +
        '<div class="ph-prod-foot">' +
          /* Roots first, price second — consistent with user's display preference */
          '<div><p class="ph-prod-roots">+' + p.roots + ' Roots</p><p class="ph-prod-price">' + p.price + '</p></div>' +
          '<button class="ph-prod-add" data-product="' + p.name + '">+ Add</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* "Your Ritual" section — shown only if customer has past orders */
  var ritualSection = hasOrders
    ? '<p class="ph-section-label">Your ritual <span class="ph-section-muted">— reorder from your last harvest</span></p>' +
      '<div class="ph-prod-grid">' + products.filter(function (p) { return p.ritual; }).map(prodCard).join('') + '</div>'
    : '<div class="ph-harvest-welcome">' +
        '<p class="ph-harvest-welcome-icon">🌿</p>' +
        '<p class="ph-harvest-welcome-title">Start your first Harvest</p>' +
        '<p class="ph-harvest-welcome-sub">No orders yet — your ritual begins here.</p>' +
        '<a href="product-honey.html" class="ph-harvest-cta">Explore the full catalogue →</a>' +
      '</div>';

  var tierPicks = products.filter(function (p) { return p.tierPick; }).map(prodCard).join('');

  return [
    /* Eyebrow + big serif title — matches the eyebrow/headline pattern used
       throughout checkout, gives this tab the same visual weight Roots (hero
       number) and Wallet (3D card) already have instead of a flat small label */
    '<div class="ph-harvest-hdr">',
    '  <p class="ph-harvest-eyebrow">Quick Reorder</p>',
    '  <p class="ph-harvest-title">The Harvest Market</p>',
    '  <p class="ph-harvest-sub">Your usual picks, fresh arrivals, and what’s in season.</p>',
    '</div>',

    ritualSection,

    '<p class="ph-section-label" style="margin-top:20px">' + tier.icon + ' ' + tier.name + ' tier picks</p>',
    '<div class="ph-prod-grid">' + tierPicks + '</div>',

    '<div class="ph-harvest-footer">',
    '  <a href="product-honey.html" class="ph-view-all-link">View full catalogue →</a>',
    '</div>',
  ].join('\n');
}


/* ──────────────────────────────────────────────────────────
   ORDERS — Subscriptions sub-section · Order history
──────────────────────────────────────────────────────────── */
function phBuildOrdersPanel(orders, subscriptions) {

  /* Subscription rows — each has a "Manage" toggle */
  var subContent = subscriptions && subscriptions.length
    ? subscriptions.map(function (s, idx) {
        var key = 'sub' + idx;
        return '<div class="ph-sub-row">' +
          '<div class="ph-sub-info">' +
            '<p class="ph-sub-name">' + s.name + ' <span class="ph-sub-tag">' + s.interval + '</span></p>' +
            '<p class="ph-sub-meta">Next: ' + s.next + ' · ' + s.price + '</p>' +
          '</div>' +
          '<button class="ph-sub-manage-btn" data-sub="' + key + '">Manage</button>' +
        '</div>' +
        /* Inline management panel — hidden by default */
        '<div class="ph-sub-manage-panel" id="phSubPanel_' + key + '" style="display:none">' +
          '<button class="ph-sub-action" data-action="pause">⏸ Pause subscription</button>' +
          '<button class="ph-sub-action" data-action="skip">⏭ Skip next delivery</button>' +
          '<button class="ph-sub-action ph-sub-action--danger" data-action="cancel">✕ Cancel subscription</button>' +
        '</div>';
      }).join('')
    : '<p class="ph-empty-msg">No active subscriptions. <a href="index.html#subscriptions" class="ph-link">Explore plans →</a></p>';

  /* Order history rows */
  var orderContent = orders && orders.length
    ? orders.map(function (o) {
        return '<div class="ph-order-row">' +
          '<div class="ph-order-left">' +
            '<p class="ph-order-id">' + o.id + '</p>' +
            '<p class="ph-order-items">' + o.items + '</p>' +
            '<p class="ph-order-date">' + o.date + '</p>' +
          '</div>' +
          '<div class="ph-order-right">' +
            '<p class="ph-order-total">' + o.total + '</p>' +
            '<span class="ph-order-badge">' + o.status + '</span>' +
            '<p class="ph-order-roots-earned">+' + o.rootsEarned + ' Roots</p>' +
            (o.cn ? '<a href="track.html?cn=' + o.cn + '" class="ph-track-link">Track →</a>' : '') +
          '</div>' +
        '</div>';
      }).join('')
    : '<div class="ph-orders-empty"><span>🌿</span><p>No orders yet — your harvest awaits.</p><a href="product-honey.html" class="ph-link">Start shopping →</a></div>';

  return [
    '<div class="ph-section-head"><p class="ph-section-label">Your subscriptions</p></div>',
    '<div class="ph-card ph-sub-card">' + subContent + '</div>',

    '<div class="ph-section-head" style="margin-top:20px"><p class="ph-section-label">Order history</p></div>',
    '<div class="ph-card ph-orders-card">' + orderContent + '</div>',
  ].join('\n');
}


/* ──────────────────────────────────────────────────────────
   ROOTS — Balance hero · Stats · Expiry warning ·
           Tier ladder with earn rates · Referral ·
           Roots history
──────────────────────────────────────────────────────────── */
function phBuildRootsPanel(user, rootsHistory) {
  var tier      = phGetTier(user.lifetimeSpend || 0);
  var progress  = phGetTierProgress(user.lifetimeSpend || 0);
  var roots     = user.roots         || 0;
  var earned    = user.rootsEarned   || roots;
  var redeemed  = user.rootsRedeemed || 0;
  var spend     = user.lifetimeSpend || 0;
  var refCode   = user.referralCode  || '';
  var referrals = user.referrals     || 0;
  var expiry    = phRootsExpiryWarning(rootsHistory);

  /* Progress bar toward next tier */
  var progressHtml = progress.next
    ? '<div class="ph-prog-wrap" style="margin-top:14px"><div class="ph-prog-bar" id="phRootsProgBar" style="width:0%"></div></div>' +
      '<p class="ph-prog-meta">₹' + progress.remaining.toLocaleString('en-IN') + ' more to <strong>' + progress.nextIcon + ' ' + progress.next + '</strong> · higher tier = more Roots per ₹100</p>'
    : '<p class="ph-prog-meta ph-prog-meta--max" style="margin-top:12px">You\'ve reached the highest tier 🌲</p>';

  /* Full tier ladder — earn rate displayed explicitly (not just multiplier) */
  var tierDefs = [
    { name: 'Seedling', icon: '🌱', range: '₹0 – ₹4,999',      earn: '₹100 = 1 Root' },
    { name: 'Sapling',  icon: '🌿', range: '₹5,000 – ₹14,999',  earn: '₹100 = 1.25 Roots' },
    { name: 'Roots',    icon: '🌳', range: '₹15,000 – ₹29,999', earn: '₹100 = 1.5 Roots' },
    { name: 'Ancient',  icon: '🌲', range: '₹30,000+',           earn: '₹100 = 2 Roots' },
  ];

  var tierRows = tierDefs.map(function (t) {
    var isCur = t.name === tier.name;
    return '<div class="ph-tier-row' + (isCur ? ' ph-tier-row--cur' : '') + '">' +
      '<div class="ph-tier-row-left">' +
        '<span class="ph-tier-row-icon">' + t.icon + '</span>' +
        '<div>' +
          '<p class="ph-tier-row-name">' + t.name + (isCur ? '<span class="ph-you-pill">You</span>' : '') + '</p>' +
          '<p class="ph-tier-row-range">' + t.range + '</p>' +
        '</div>' +
      '</div>' +
      '<p class="ph-tier-row-earn">' + t.earn + '</p>' +
    '</div>';
  }).join('');

  /* Roots transaction history */
  var histRows = rootsHistory.map(function (tx) {
    var cls = tx.amount > 0 ? 'ph-hist-earn' : 'ph-hist-redeem';
    var str = tx.amount > 0 ? '+' + tx.amount + ' Roots' : tx.amount + ' Roots';
    return '<div class="ph-hist-row">' +
      '<div><p class="ph-hist-label">' + tx.label + '</p><p class="ph-hist-date">' + tx.date + '</p></div>' +
      '<span class="' + cls + '">' + str + '</span>' +
    '</div>';
  }).join('');

  return [
    /* Roots balance hero — number uses count-up + CSS float animation */
    '<div class="ph-roots-hero">',
    '  <div>',
    '    <p class="ph-roots-hero-label">Your Balance</p>',
    '    <p class="ph-roots-hero-num"><span id="phRootsNum" class="ph-roots-float">0</span><span class="ph-roots-unit"> Roots</span></p>',
    '    <p class="ph-roots-hero-val">Worth ₹' + (roots * 10).toLocaleString('en-IN') + ' off your next order</p>',
    '  </div>',
    '  <a href="roots.html" class="ph-roots-prog-link">Programme →</a>',
    '</div>',

    /* 3-stat strip */
    '<div class="ph-stat-row">',
    '  <div class="ph-stat"><p class="ph-stat-val">' + earned   + '</p><p class="ph-stat-label">Total Earned</p></div>',
    '  <div class="ph-stat-div"></div>',
    '  <div class="ph-stat"><p class="ph-stat-val">' + redeemed + '</p><p class="ph-stat-label">Redeemed</p></div>',
    '  <div class="ph-stat-div"></div>',
    '  <div class="ph-stat"><p class="ph-stat-val">₹' + spend.toLocaleString('en-IN') + '</p><p class="ph-stat-label">Lifetime Spend</p></div>',
    '</div>',

    /* Expiry warning — yellow banner if any Roots expire within 90 days */
    expiry
      ? '<div class="ph-expiry-warn">⚠ <strong>' + expiry.count + ' Roots</strong> expiring ' + expiry.date + ' — redeem before they expire.</div>'
      : '',

    /* Tier overview with earn rates */
    '<div class="ph-card">',
    '  <p class="ph-card-label">Tier overview <button class="ph-tip" data-tip="Tier is determined by lifetime spend and never resets. Reach higher tiers to earn more Roots per ₹100.">i</button></p>',
    tierRows,
    progressHtml,
    '</div>',

    /* Referral card — shows 25 + 10 breakdown clearly */
    '<div class="ph-card ph-referral-card">',
    '  <p class="ph-card-label">Refer a friend or family <button class="ph-tip" data-tip="Your friend earns 25 referral + 10 welcome bonus = 35 Roots. You earn 25. Their first order must be ≥ ₹999.">i</button></p>',
    '  <div class="ph-ref-breakdown">',
    '    <div class="ph-ref-side"><p class="ph-ref-amount">25</p><p class="ph-ref-who">You earn</p></div>',
    '    <div class="ph-ref-sep">→</div>',
    '    <div class="ph-ref-side">',
    '      <p class="ph-ref-amount">35</p><p class="ph-ref-who">They earn</p>',
    '      <p class="ph-ref-split">25 referral + 10 welcome</p>',
    '    </div>',
    '  </div>',
    '  <div class="ph-ref-code-row">',
    '    <span class="ph-ref-code">' + refCode + '</span>',
    '    <button class="ph-ref-copy" id="phRefCopy" data-code="' + refCode + '">Copy</button>',
    '  </div>',
    '  <p class="ph-ref-used">' + referrals + ' of 5 referrals used · first order ≥ ₹999 required</p>',
    '</div>',

    /* Roots transaction history */
    '<div class="ph-card">',
    '  <p class="ph-card-label">Roots history</p>',
    histRows || '<p class="ph-empty-msg">No transactions yet.</p>',
    '</div>',

  ].join('\n');
}


/* ──────────────────────────────────────────────────────────
   WALLET — Harvest Card explanation · 3D card visual ·
            Load from Roots (inline expand) · Benefits list
──────────────────────────────────────────────────────────── */
function phBuildWalletPanel(user) {
  var roots    = user.roots || 0;
  var inrVal   = roots * 10;
  var cardName = (user.name || '').toUpperCase();
  var tier     = phGetTier(user.lifetimeSpend || 0);

  /* Roots history — last 5 entries for wallet view */
  var histEntries = (user.isDemo ? DEMO_ROOTS_HISTORY : []).slice(0, 5);
  var histRows = histEntries.map(function (tx) {
    var cls = tx.amount > 0 ? 'ph-hist-earn' : 'ph-hist-redeem';
    var str = tx.amount > 0 ? '+' + tx.amount + ' Roots' : tx.amount + ' Roots';
    return '<div class="ph-hist-row">' +
      '<div><p class="ph-hist-label">' + tx.label + '</p><p class="ph-hist-date">' + tx.date + '</p></div>' +
      '<span class="' + cls + '">' + str + '</span>' +
    '</div>';
  }).join('');

  return [
    /* Roots Card — 3D flip, Roots as the primary balance */
    '<div class="ph-card-scene" id="phCardScene">',
    '  <div class="ph-card-inner" id="phCardInner">',

    /* FRONT — Roots count as the hero number */
    '    <div class="ph-card-face ph-card-front">',
    '      <div class="ph-hcard-top">',
    '        <span class="ph-hcard-brand">Roots Card</span>',
    '      </div>',
    '      <div>',
    '        <p class="ph-hcard-bal" id="phHcardBal">' + roots + '<span class="ph-hcard-bal-unit"> Roots</span></p>',
    '        <p class="ph-hcard-roots-line"><span class="ph-hcard-roots-eq">≈ ₹' + inrVal.toLocaleString('en-IN') + ' off at checkout</span></p>',
    '      </div>',
    '      <div class="ph-hcard-bot">',
    '        <span class="ph-hcard-num">PH ···· ···· ···· 2026</span>',
    '        <span class="ph-hcard-name">' + cardName + '</span>',
    '      </div>',
    '      <p class="ph-hcard-hint">tap to flip</p>',
    '    </div>',

    /* BACK — tier badge + how Roots work at checkout + support note */
    '    <div class="ph-card-face ph-card-back">',
    '      <div class="ph-hcard-back-tier">',
    '        <span class="ph-hcard-back-tier-icon">' + tier.icon + '</span>',
    '        <span class="ph-hcard-back-tier-name">' + tier.name + ' Member</span>',
    '      </div>',
    '      <p class="ph-hcard-back-title">Using Roots</p>',
    '      <p class="ph-hcard-back-sub">At checkout, choose "Pay with Roots." Each Root gives ₹10 off your order. No conversion needed — just instant savings.</p>',
    '      <p class="ph-hcard-back-note">1 Root = ₹10 · Expires after 12 months · hello@pureharvest.in</p>',
    '    </div>',

    '  </div>',
    '</div>',

    /* Quick stats strip — value available + last earned */
    '<div class="ph-stat-row">',
    '  <div class="ph-stat">',
    '    <p class="ph-stat-val">₹' + inrVal.toLocaleString('en-IN') + '</p>',
    '    <p class="ph-stat-label">Available</p>',
    '  </div>',
    '  <div class="ph-stat-div"></div>',
    '  <div class="ph-stat">',
    '    <p class="ph-stat-val">' + roots + '</p>',
    '    <p class="ph-stat-label">Roots balance</p>',
    '  </div>',
    '  <div class="ph-stat-div"></div>',
    '  <div class="ph-stat">',
    '    <p class="ph-stat-val">₹10</p>',
    '    <p class="ph-stat-label">Per Root</p>',
    '  </div>',
    '</div>',

    /* How to pay — 3 simple steps */
    '<div class="ph-card">',
    '  <p class="ph-card-label">How to pay with Roots</p>',
    '  <div class="ph-benefit-row"><span class="ph-benefit-icon">🛒</span>',
    '    <div><p class="ph-benefit-name">Add items to cart</p><p class="ph-benefit-desc">Shop normally — any products, any order size</p></div></div>',
    '  <div class="ph-benefit-row"><span class="ph-benefit-icon">🌱</span>',
    '    <div><p class="ph-benefit-name">Select "Pay with Roots" at checkout</p><p class="ph-benefit-desc">Choose how many Roots to apply — 1 Root = ₹10 off your total</p></div></div>',
    '  <div class="ph-benefit-row"><span class="ph-benefit-icon">✓</span>',
    '    <div><p class="ph-benefit-name">Savings applied instantly</p><p class="ph-benefit-desc">No codes or conversions — Roots deducted directly at payment</p></div></div>',
    '  <div class="ph-benefit-row"><span class="ph-benefit-icon">🎁</span>',
    '    <div><p class="ph-benefit-name">Gift Roots to anyone</p><p class="ph-benefit-desc">Share a gift code redeemable at checkout — no account needed</p></div></div>',
    '</div>',

    /* Roots history */
    '<div class="ph-card">',
    '  <p class="ph-card-label">Roots history</p>',
    histRows || '<p class="ph-card-empty">No transactions yet — earn Roots on your first order.</p>',
    '</div>',

  ].join('\n');
}


/* ──────────────────────────────────────────────────────────
   GROVE — Ambassador programme
   Toggle between "Approved" view and "New member" (apply) view.
   Demo always shows Approved by default; toggle lets us preview both
   states for planning and design review.
──────────────────────────────────────────────────────────── */
function phBuildGrovePanel(user, viewMode) {
  var mode = viewMode || (user.groveStatus === 'approved' ? 'approved' : 'new');

  /* Demo planning toggle */
  var toggleHtml = '<div class="ph-grove-toggle">' +
    '<span class="ph-grove-toggle-label">View as:</span>' +
    '<button class="ph-grove-toggle-btn' + (mode === 'approved' ? ' active' : '') + '" id="phGroveApproved">Approved</button>' +
    '<button class="ph-grove-toggle-btn' + (mode === 'new'      ? ' active' : '') + '" id="phGroveNew">New member</button>' +
  '</div>';

  /* Benefits rows — same list used in both views */
  var benefitDefs = [
    { icon: '💰', name: '8% cash commission',     desc: 'On every order placed via your affiliate link' },
    { icon: '🌿', name: 'Early harvest access',    desc: 'Seasonal drops before public release' },
    { icon: '🔗', name: 'Your affiliate link',     desc: 'pureharvest.in/?ref=' + (user.referralCode || 'CODE') },
    { icon: '📅', name: 'Monthly UPI payouts',      desc: 'Commission transferred on the 1st of each month' },
    { icon: '✦',  name: 'Grove badge',              desc: 'Visible on your account and public profile' },
  ];

  var benefitRows = benefitDefs.map(function (b) {
    return '<div class="ph-benefit-row"><span class="ph-benefit-icon">' + b.icon + '</span>' +
      '<div><p class="ph-benefit-name">' + b.name + '</p><p class="ph-benefit-desc">' + b.desc + '</p></div></div>';
  }).join('');

  /* Approved view */
  var approvedContent =
    '<div class="ph-grove-status ph-grove-status--approved">' +
      '<span class="ph-grove-dot">●</span>' +
      '<div><p class="ph-grove-status-title">Grove Member — Approved</p><p class="ph-grove-status-sub">Active since June 2026</p></div>' +
    '</div>' +
    '<div class="ph-what-is"><p class="ph-what-is-text">As a Grove Ambassador you represent PureHarvest, earn a cash commission on every order placed through your link, and get early access to seasonal harvests before public release.</p></div>' +
    '<div class="ph-card"><p class="ph-card-label">Your benefits</p>' + benefitRows + '</div>' +
    /* Stats — this month + lifetime side by side */
    '<p class="ph-card-label" style="margin:16px 0 8px">Your numbers</p>' +
    '<div class="ph-grove-stats">' +
      '<div class="ph-grove-stat"><p class="ph-grove-stat-label">Orders this month</p><p class="ph-grove-stat-val">3</p></div>' +
      '<div class="ph-grove-stat"><p class="ph-grove-stat-label">Commission this month</p><p class="ph-grove-stat-val ph-grove-pos">₹360</p></div>' +
      '<div class="ph-grove-stat"><p class="ph-grove-stat-label">Lifetime orders</p><p class="ph-grove-stat-val">3</p></div>' +
      '<div class="ph-grove-stat"><p class="ph-grove-stat-label">Lifetime commission</p><p class="ph-grove-stat-val ph-grove-pos">₹360</p></div>' +
    '</div>';

  /* New member / apply view */
  var newContent =
    '<div class="ph-grove-teaser">' +
      '<p class="ph-grove-teaser-title">Apply for Grove</p>' +
      '<p class="ph-grove-teaser-sub">Grove is PureHarvest\'s ambassador programme — any customer can apply. We review each application personally and respond within 48 hours.</p>' +
    '</div>' +
    '<div class="ph-card"><p class="ph-card-label">Benefits you\'ll unlock</p>' + benefitRows + '</div>' +
    '<div class="ph-card">' +
      '<p class="ph-card-label">Apply now</p>' +
      '<div class="ph-grove-form">' +
        '<input type="text" class="ph-grove-input" placeholder="Your name" />' +
        '<input type="text" class="ph-grove-input" placeholder="Instagram / platform (optional)" />' +
        '<textarea class="ph-grove-textarea" rows="3" placeholder="Why do you love PureHarvest? (2–3 sentences)"></textarea>' +
        '<button class="ph-grove-apply-btn">Submit application</button>' +
        '<p class="ph-grove-form-note">Reviewed within 48 hours — we\'ll reply via email.</p>' +
      '</div>' +
    '</div>';

  return [
    toggleHtml,
    mode === 'approved' ? approvedContent : newContent,
  ].join('\n');
}


/* ══════════════════════════════════════════════════════════
   POST-RENDER EVENT WIRERS
   Called after each panel's HTML is injected.
   ══════════════════════════════════════════════════════════ */

/* Wire Home — animate progress bar after render */
function phWireHome(progress) {
  if (progress.next) {
    setTimeout(function () {
      var bar = document.getElementById('phHomeProgBar');
      if (bar) bar.style.width = Math.min(progress.pct, 100) + '%';
    }, 80);
  }
}

/* Wire Mini Harvest — "Add" demo toast feedback */
function phWireHarvest() {
  document.querySelectorAll('.ph-prod-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.textContent = '✓ Added';
      btn.disabled    = true;
      setTimeout(function () {
        btn.textContent = '+ Add';
        btn.disabled    = false;
      }, 1500);
      /* SUPABASE SWAP POINT D: trigger real add-to-cart here */
    });
  });
}

/* Wire Orders — subscription manage expand/collapse + sub-actions */
function phWireOrders() {
  /* Toggle the inline management panel for each subscription */
  document.querySelectorAll('.ph-sub-manage-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key   = btn.getAttribute('data-sub');
      var panel = document.getElementById('phSubPanel_' + key);
      if (!panel) return;
      var isOpen = panel.style.display !== 'none';
      panel.style.display = isOpen ? 'none' : 'block';
      btn.textContent     = isOpen ? 'Manage' : 'Close';
    });
  });

  /* Subscription action buttons (pause / skip / cancel) */
  document.querySelectorAll('.ph-sub-action').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var action = btn.getAttribute('data-action');
      /* Cancel requires a second tap to confirm — prevents accidents */
      if (action === 'cancel' && !btn.getAttribute('data-confirm')) {
        btn.textContent = 'Tap again to confirm cancellation';
        btn.setAttribute('data-confirm', '1');
        return;
      }
      /* Demo: show a "Saved" message, then reset the panel */
      var mgmtPanel = btn.closest('.ph-sub-manage-panel');
      if (mgmtPanel) {
        mgmtPanel.innerHTML = '<p class="ph-sub-saved">Saved — we\'ll update your subscription. 🌿</p>';
        setTimeout(function () {
          mgmtPanel.style.display = 'none';
          mgmtPanel.innerHTML     = '';
          /* Reset the Manage button label */
          var key = mgmtPanel.id.replace('phSubPanel_', '');
          var manageBtn = document.querySelector('[data-sub="' + key + '"]');
          if (manageBtn) manageBtn.textContent = 'Manage';
        }, 2200);
      }
    });
  });
}

/* Wire Roots — referral copy, progress bar animation, count-up */
function phWireRoots(roots, progress) {
  /* Referral code copy button */
  var copyBtn = document.getElementById('phRefCopy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var code = copyBtn.getAttribute('data-code');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).catch(function () {});
      }
      copyBtn.textContent = 'Copied!';
      setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1800);
    });
  }

  /* Animate progress bar */
  if (progress.next) {
    setTimeout(function () {
      var bar = document.getElementById('phRootsProgBar');
      if (bar) bar.style.width = Math.min(progress.pct, 100) + '%';
    }, 80);
  }

  /* Count-up on the Roots balance number */
  setTimeout(function () {
    phCountUp(document.getElementById('phRootsNum'), roots);
  }, 100);
}

/* Wire Wallet — 3D card flip on click/tap */
function phWireWallet(user) {
  var scene = document.getElementById('phCardScene');
  var inner = document.getElementById('phCardInner');
  if (!scene || !inner) return;

  var front = inner.querySelector('.ph-card-front');
  var back  = inner.querySelector('.ph-card-back');

  /* rotY rests at exactly 0 (front) or ±180 (back) — never accumulates past a single flip's
     worth of rotation. The sign only matters for which way the OUTGOING flip spins (set by
     tapped side); the return trip always settles back to 0 the way it came. Shared with the
     tilt handler below so the two never fight over what the "resting" rotation should be. */
  var rotY       = 0;
  var isFlipping = false; /* true for the duration of the flip's own transition — tilt and mouseleave must not touch transform/transition while this is set, or they hijack the flip mid-flight and the card visibly stutters/re-flips */

  function isFlipped() {
    return rotY !== 0;
  }

  /* Flip — direction follows the tapped side: right half spins one way, left half the other,
     on both the front and the back, since this only reads where on the card you clicked.
     Ignored entirely while a flip is already animating, so rapid clicks/taps can't stack. */
  scene.addEventListener('click', function (e) {
    if (isFlipping) return;
    var rect = scene.getBoundingClientRect();
    var tappedRight = (e.clientX - rect.left) > rect.width / 2;
    rotY = isFlipped() ? 0 : (tappedRight ? 180 : -180); /* always exactly 0 or ±180 — no accumulating past one flip */
    inner.classList.toggle('ph-card-flipped', isFlipped());
    isFlipping = true;
    inner.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    inner.style.transform = 'rotateY(' + rotY + 'deg)';
    setTimeout(function () { isFlipping = false; }, 700);
  });

  /* Cursor-driven tilt — all 4 corners respond to mouse position, on either face */
  scene.addEventListener('mousemove', function (e) {
    if (isFlipping) return; /* let the flip finish its own transition untouched */
    var rect = scene.getBoundingClientRect();
    var nx = (e.clientX - rect.left) / rect.width  * 2 - 1; /* -1 left -> +1 right */
    var ny = (e.clientY - rect.top)  / rect.height * 2 - 1; /* -1 top  -> +1 bottom */
    var tiltY =  nx * 10; /* cursor right -> right edge tilts away */
    var tiltX = -ny * 7;  /* cursor bottom -> bottom edge tilts away */
    inner.style.transition = 'transform 0.08s linear';
    inner.style.transform = 'rotateX(' + tiltX + 'deg) rotateY(' + (rotY + tiltY) + 'deg)'; /* tilt rides on top of the current flip rotation */

    /* Shimmer light follows cursor X, sweeping fully off either edge of the card */
    var pct = nx * 220; /* maps -1..+1 to -220%..+220% — clears both edges completely */
    var activeFace = isFlipped() ? back : front;
    if (activeFace) activeFace.style.setProperty('--sh-x', pct + '%');
  });

  /* On leave — ease back to the resting flip rotation (no tilt) and hide the shimmer.
     Guarded the same way: mid-flip, the card's perspective-foreshortened bounding box can
     shrink thin enough near 90° that the cursor falls "outside" it and this fires — without
     the guard it would hijack the flip's own transition exactly like mousemove did. */
  scene.addEventListener('mouseleave', function () {
    if (isFlipping) return;
    inner.style.transition = 'transform 0.5s ease';
    inner.style.transform  = 'rotateY(' + rotY + 'deg)';
    if (front) front.style.setProperty('--sh-x', '-220%');
    if (back)  back.style.setProperty('--sh-x', '-220%');
  });
}

/* Wire Grove — toggle between Approved and New Member views */
function phWireGrove(user) {
  var panel = document.getElementById('phPanel');

  var approvedBtn = document.getElementById('phGroveApproved');
  var newBtn      = document.getElementById('phGroveNew');

  if (approvedBtn) {
    approvedBtn.addEventListener('click', function () {
      panel.innerHTML = phBuildGrovePanel(user, 'approved');
      phInitTooltips();
      phWireGrove(user);
    });
  }
  if (newBtn) {
    newBtn.addEventListener('click', function () {
      panel.innerHTML = phBuildGrovePanel(user, 'new');
      phInitTooltips();
      phWireGrove(user);
    });
  }
}


/* ──────────────────────────────────────────────────────────
   PROFILE — account details + saved-address book
   The address CRUD itself (phAddrUpsert / phAddrDelete) lives in
   checkout.js as plain globals, shared with the M2 pill picker —
   this tab is just where the full management UI (rename, edit,
   delete, add up to 2) lives, per [[feedback_checkout_ux_friction]]:
   checkout stays lean, account settings holds the heavier UI.
──────────────────────────────────────────────────────────── */
function phBuildProfilePanel(user) {
  var tier      = phGetTier(user.lifetimeSpend || 0);
  var joinedFmt = user.joined
    ? new Date(user.joined).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'Recently';

  return [
    '<div class="ph-card">',
    '  <p class="ph-card-label">Profile</p>',
    '  <div class="ph-profile-row"><span class="ph-profile-row-label">Name</span><span class="ph-profile-row-val">' + (user.name || '—') + '</span></div>',
    '  <div class="ph-profile-row"><span class="ph-profile-row-label">Email / Phone</span><span class="ph-profile-row-val">' + (user.identifier || '—') + '</span></div>',
    '  <div class="ph-profile-row"><span class="ph-profile-row-label">Member since</span><span class="ph-profile-row-val">' + joinedFmt + '</span></div>',
    '  <div class="ph-profile-row"><span class="ph-profile-row-label">Tier</span><span class="ph-profile-row-val">' + tier.icon + ' ' + tier.name + '</span></div>',
    '</div>',

    '<div class="ph-card">',
    '  <p class="ph-card-label">Saved addresses <span class="ph-profile-addr-count">' + (user.addresses || []).length + '/2</span></p>',
    '  <div id="phAddrList"></div>',
    '  <button type="button" class="ph-profile-add-btn" id="phAddAddrBtn">+ Add address</button>',
    '  <div id="phAddrFormWrap"></div>',
    '</div>'
  ].join('\n');
}

/* Plain text fields here — unlike checkout's M2, there's no live India
   Post lookup needed for managing an already-saved address at leisure. */
function phBuildAddrForm(addr) {
  addr = addr || {};
  return [
    '<div class="ph-addr-form">',
    '  <input type="text" class="ph-grove-input" id="phAfName" placeholder="Full name" value="' + (addr.name || '') + '" />',
    '  <div class="ph-addr-form-row">',
    '    <input type="text" class="ph-grove-input" id="phAfPhone" placeholder="Phone" maxlength="10" value="' + (addr.phone || '') + '" />',
    '    <input type="text" class="ph-grove-input" id="phAfEmail" placeholder="Email" value="' + (addr.email || '') + '" />',
    '  </div>',
    '  <div class="ph-addr-form-row">',
    '    <input type="text" class="ph-grove-input" id="phAfFlat" placeholder="Flat / House no." value="' + (addr.flat || '') + '" />',
    '    <input type="text" class="ph-grove-input" id="phAfBuilding" placeholder="Building" value="' + (addr.building || '') + '" />',
    '  </div>',
    '  <input type="text" class="ph-grove-input" id="phAfArea" placeholder="Area / Locality" value="' + (addr.area || '') + '" />',
    '  <div class="ph-addr-form-row">',
    '    <input type="text" class="ph-grove-input" id="phAfCity" placeholder="City" value="' + (addr.city || '') + '" />',
    '    <input type="text" class="ph-grove-input" id="phAfState" placeholder="State" value="' + (addr.state || '') + '" />',
    '  </div>',
    '  <div class="ph-addr-form-row">',
    '    <input type="text" class="ph-grove-input" id="phAfPincode" placeholder="Pincode" maxlength="6" value="' + (addr.pincode || '') + '" />',
    '    <input type="text" class="ph-grove-input" id="phAfLabel" placeholder="Label (e.g. Home, Work)" maxlength="20" value="' + (addr.label || '') + '" />',
    '  </div>',
    '  <div class="ph-addr-form-actions">',
    '    <button type="button" class="ph-grove-apply-btn" id="phAfSave">Save</button>',
    '    <button type="button" class="ph-addr-form-cancel" id="phAfCancel">Cancel</button>',
    '  </div>',
    '</div>'
  ].join('');
}

function phWireProfile(user) {
  var listEl   = document.getElementById('phAddrList');
  var formWrap = document.getElementById('phAddrFormWrap');
  var addBtn   = document.getElementById('phAddAddrBtn');
  var delArm   = null;

  function refreshAddBtn() {
    if (addBtn) addBtn.style.display = (user.addresses || []).length >= 2 ? 'none' : '';
  }

  function refreshList() {
    var addrs = user.addresses || [];
    listEl.innerHTML = addrs.length ? addrs.map(function (a) {
      var armed = delArm === a.id;
      return [
        '<div class="ph-addr-card">',
        '  <div class="ph-addr-card-main">',
        '    <p class="ph-addr-card-label">' + a.label + '</p>',
        '    <p class="ph-addr-card-summary">' + [a.flat, a.area, a.city, a.state, a.pincode].filter(Boolean).join(', ') + '</p>',
        '  </div>',
        '  <div class="ph-addr-card-actions">',
        '    <button type="button" class="ph-addr-edit-btn" data-edit="' + a.id + '">Edit</button>',
        '    <button type="button" class="ph-addr-del-btn' + (armed ? ' ph-addr-del-btn--armed' : '') + '" data-del="' + a.id + '">' + (armed ? 'Confirm?' : 'Delete') + '</button>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('') : '<p class="ph-card-empty">No saved addresses yet — one is saved automatically the next time you check out.</p>';

    listEl.querySelectorAll('[data-edit]').forEach(function (el) {
      el.addEventListener('click', function () {
        var addr = addrs.filter(function (a) { return a.id === el.getAttribute('data-edit'); })[0];
        openForm(addr);
      });
    });
    listEl.querySelectorAll('[data-del]').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.getAttribute('data-del');
        if (delArm !== id) { delArm = id; refreshList(); return; } /* first click arms it, second confirms */
        user.addresses = phAddrDelete(user.addresses || [], id);
        phSetSession(user);
        delArm = null;
        formWrap.innerHTML = '';
        refreshList();
        refreshAddBtn();
      });
    });
  }

  function openForm(addr) {
    formWrap.innerHTML = phBuildAddrForm(addr || {});
    document.getElementById('phAfCancel').addEventListener('click', function () { formWrap.innerHTML = ''; });
    document.getElementById('phAfSave').addEventListener('click', function () {
      var fields = {
        name: document.getElementById('phAfName').value.trim(),
        phone: document.getElementById('phAfPhone').value.trim(),
        email: document.getElementById('phAfEmail').value.trim(),
        flat: document.getElementById('phAfFlat').value.trim(),
        building: document.getElementById('phAfBuilding').value.trim(),
        area: document.getElementById('phAfArea').value.trim(),
        city: document.getElementById('phAfCity').value.trim(),
        state: document.getElementById('phAfState').value.trim(),
        pincode: document.getElementById('phAfPincode').value.trim()
      };
      var labelVal = document.getElementById('phAfLabel').value.trim();
      if (labelVal) fields.label = labelVal; /* blank → phAddrUpsert assigns Home/Work automatically */

      var result = phAddrUpsert(user.addresses || [], addr && addr.id ? addr.id : null, fields);
      user.addresses = result.addresses;
      phSetSession(user);
      formWrap.innerHTML = '';
      refreshList();
      refreshAddBtn();
    });
  }

  if (addBtn) addBtn.addEventListener('click', function () { openForm(null); });

  refreshList();
  refreshAddBtn();
}


/* ──────────────────────────────────────────────────────────
   TAB SWITCHER
   Single content div (#phPanel) rebuilt on every tab switch.
   Cleaner than 6 hidden divs — event listeners are always fresh.
──────────────────────────────────────────────────────────── */
function phInitTabs(user, orders, rootsHistory, subscriptions, products) {
  var nav   = document.getElementById('acctNav');
  var panel = document.getElementById('phPanel');
  if (!nav || !panel) return;

  var tabs = nav.querySelectorAll('.ph-tab');

  function switchTab(name) {
    /* Update active visual state on nav buttons */
    tabs.forEach(function (t) {
      t.classList.toggle('ph-tab--active', t.getAttribute('data-tab') === name);
    });

    /* Build and inject the panel HTML for the selected tab */
    switch (name) {
      case 'home':
        panel.innerHTML = phBuildHomePanel(user, orders, rootsHistory);
        phWireHome(phGetTierProgress(user.lifetimeSpend || 0));
        break;
      case 'harvest':
        panel.innerHTML = phBuildHarvestPanel(user, orders, products);
        phWireHarvest();
        break;
      case 'orders':
        panel.innerHTML = phBuildOrdersPanel(orders, subscriptions);
        phWireOrders();
        break;
      case 'roots':
        panel.innerHTML = phBuildRootsPanel(user, rootsHistory);
        phWireRoots(user.roots || 0, phGetTierProgress(user.lifetimeSpend || 0));
        break;
      case 'wallet':
        panel.innerHTML = phBuildWalletPanel(user);
        phWireWallet(user); /* pass full user so confirm can mutate .roots and .harvestCard */
        break;
      case 'grove':
        panel.innerHTML = phBuildGrovePanel(user);
        phWireGrove(user);
        break;
      case 'profile':
        panel.innerHTML = phBuildProfilePanel(user);
        phWireProfile(user);
        break;
    }

    /* Wire data-tip tooltips in freshly-rendered content */
    phInitTooltips();

    /* Wire any cross-tab data-goto links in the new panel */
    panel.querySelectorAll('[data-goto]').forEach(function (el) {
      el.addEventListener('click', function () {
        switchTab(el.getAttribute('data-goto'));
      });
    });

    /* Trigger CSS fade-up animation on the panel */
    panel.classList.remove('ph-panel-anim');
    void panel.offsetWidth; /* force reflow so animation restarts */
    panel.classList.add('ph-panel-anim');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* Tab button clicks */
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchTab(tab.getAttribute('data-tab'));
    });
  });

  /* Default tab on first load */
  switchTab('home');
}


/* ──────────────────────────────────────────────────────────
   DASHBOARD RENDERER
   Builds the shell HTML (greeting bar + 6-tab nav + panel div).
   The source HTML has only an empty <div id="acctDashboard">
   so nothing leaks in DevTools until the user is authenticated.
──────────────────────────────────────────────────────────── */
function phRenderDashboard(user) {
  var firstName = (user.name || 'there').split(' ')[0];
  var joinedFmt = user.joined
    ? new Date(user.joined).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'Recently';

  /* In demo mode pull from the demo data constants above.
     In production these come from Supabase queries. */
  var orders        = user.isDemo ? DEMO_ORDERS        : [];
  var rootsHistory  = user.isDemo ? DEMO_ROOTS_HISTORY : [];
  var subscriptions = user.isDemo ? DEMO_SUBSCRIPTIONS : [];
  var products      = user.isDemo ? DEMO_PRODUCTS      : [];

  var html = [
    /* Greeting bar — persistent above the tab nav.
       Shows greeting + member-since. The Home panel no longer repeats the greeting. */
    '<div class="ph-db-bar">',
    '  <div class="ph-db-bar-left">',
    '    <p class="ph-db-greet">Good <em class="ph-db-time">' + phGreeting() + '</em>, ' + firstName + '</p>',
    '    <p class="ph-db-since">Member since ' + joinedFmt + '</p>',
    '  </div>',
    '  <button class="ph-signout" id="phSignOut">Sign out</button>',
    '</div>',

    /* 6-tab navigation */
    '<nav class="ph-nav" id="acctNav">',
    '  <button class="ph-tab" data-tab="home">Home</button>',
    '  <button class="ph-tab" data-tab="harvest">Mini Harvest</button>',
    '  <button class="ph-tab" data-tab="orders">Orders</button>',
    '  <button class="ph-tab" data-tab="roots">Roots</button>',
    '  <button class="ph-tab" data-tab="wallet">Wallet</button>',
    '  <button class="ph-tab" data-tab="grove">Grove</button>',
    '  <button class="ph-tab" data-tab="profile">Profile</button>',
    '</nav>',

    /* Single panel content div — rebuilt on each tab switch */
    '<div class="ph-panel" id="phPanel"></div>',

  ].join('\n');

  var container = document.getElementById('acctDashboard');
  if (!container) return;
  container.innerHTML = html;
  container.style.display = 'block';

  /* Hide the sign-in view */
  var signinView = document.getElementById('acctSigninView');
  if (signinView) signinView.style.display = 'none';

  /* Wire sign-out */
  document.getElementById('phSignOut').addEventListener('click', function () {
    phClearSession();
    /* ── SUPABASE SWAP POINT B ──────────────────────────────
       Add: await supabase.auth.signOut()
       before the location.reload() call.
    ─────────────────────────────────────────────────────── */
    location.reload();
  });

  /* Start tabs — renders Home tab by default */
  phInitTabs(user, orders, rootsHistory, subscriptions, products);
}


/* ──────────────────────────────────────────────────────────
   DEMO PIN PAD
   Full-screen overlay with 4-dot indicator and numpad.
   Correct PIN → persists the demo session and renders the demo dashboard.
   Supports both tap/click and physical keyboard.
──────────────────────────────────────────────────────────── */
function phShowPinPad() {
  var overlay = document.createElement('div');
  overlay.className = 'acct-pin-overlay';
  overlay.id        = 'acctPinOverlay';

  overlay.innerHTML = [
    '<div class="acct-pin-panel">',
    '  <button class="acct-pin-close" id="acctPinClose" aria-label="Close">✕</button>',
    '  <p class="acct-pin-eyebrow">DEMO ACCESS</p>',
    '  <p class="acct-pin-title">Enter PIN</p>',
    '  <p class="acct-pin-sub">Preview the PureHarvest dashboard &amp; tracking</p>',
    '  <div class="acct-pin-dots" id="acctPinDots">',
    '    <span class="acct-pin-dot"></span>',
    '    <span class="acct-pin-dot"></span>',
    '    <span class="acct-pin-dot"></span>',
    '    <span class="acct-pin-dot"></span>',
    '  </div>',
    '  <p class="acct-pin-error" id="acctPinError"></p>',
    '  <div class="acct-pin-pad">',
    '    <button class="acct-pin-key" data-key="1">1</button>',
    '    <button class="acct-pin-key" data-key="2">2</button>',
    '    <button class="acct-pin-key" data-key="3">3</button>',
    '    <button class="acct-pin-key" data-key="4">4</button>',
    '    <button class="acct-pin-key" data-key="5">5</button>',
    '    <button class="acct-pin-key" data-key="6">6</button>',
    '    <button class="acct-pin-key" data-key="7">7</button>',
    '    <button class="acct-pin-key" data-key="8">8</button>',
    '    <button class="acct-pin-key" data-key="9">9</button>',
    '    <span class="acct-pin-key acct-pin-key--empty"></span>',
    '    <button class="acct-pin-key" data-key="0">0</button>',
    '    <button class="acct-pin-key acct-pin-key--del" id="acctPinDel">⌫</button>',
    '  </div>',
    '</div>',
  ].join('\n');

  document.body.appendChild(overlay);
  requestAnimationFrame(function () { overlay.classList.add('acct-pin-overlay--visible'); });

  var entered  = '';
  var dots     = overlay.querySelectorAll('.acct-pin-dot');
  var errorEl  = document.getElementById('acctPinError');
  var dotsWrap = document.getElementById('acctPinDots');

  function refreshDots() {
    dots.forEach(function (dot, i) {
      dot.classList.toggle('acct-pin-dot--filled', i < entered.length);
    });
  }

  function closePad(keyHandler) {
    overlay.classList.remove('acct-pin-overlay--visible');
    setTimeout(function () { overlay.remove(); }, 350);
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
  }

  function addDigit(key) {
    if (entered.length >= 4) return;
    entered += key;
    errorEl.textContent = '';
    refreshDots();

    if (entered.length === 4) {
      if (entered === DEMO_PIN) {
        dotsWrap.classList.add('acct-pin-dots--success');
        setTimeout(function () {
          closePad(kbHandler);
          phSetSession(DEMO_SESSION); /* persist so checkout.js (and a page reload) can see this session too — sign-out still clears it */
          phRenderDashboard(DEMO_SESSION);
        }, 380);
      } else {
        dotsWrap.classList.add('acct-pin-dots--shake');
        setTimeout(function () {
          dotsWrap.classList.remove('acct-pin-dots--shake');
          entered = '';
          refreshDots();
          errorEl.textContent = 'Incorrect PIN — try again.';
        }, 520);
      }
    }
  }

  overlay.querySelectorAll('.acct-pin-key[data-key]').forEach(function (btn) {
    btn.addEventListener('click', function () { addDigit(btn.getAttribute('data-key')); });
  });

  document.getElementById('acctPinDel').addEventListener('click', function () {
    entered = entered.slice(0, -1);
    errorEl.textContent = '';
    refreshDots();
  });

  document.getElementById('acctPinClose').addEventListener('click', function () {
    closePad(kbHandler);
  });

  function kbHandler(e) {
    if (e.key >= '0' && e.key <= '9') { addDigit(e.key); return; }
    if (e.key === 'Backspace') {
      entered = entered.slice(0, -1);
      errorEl.textContent = '';
      refreshDots();
      return;
    }
    if (e.key === 'Escape') closePad(kbHandler);
  }
  document.addEventListener('keydown', kbHandler);
}


/* ──────────────────────────────────────────────────────────
   SIGN-IN FLOW
   Validates identifier, shows "check your inbox" state.
   ── SUPABASE SWAP POINT C ──────────────────────────────────
   In the continueBtn handler, replace the UI swap with:
     await supabase.auth.signInWithOtp({ email: val })
     or signInWithOtp({ phone: '+91' + val }) for mobile.
   Listen to supabase.auth.onAuthStateChange and call
   phRenderDashboard() when event === 'SIGNED_IN'.
──────────────────────────────────────────────────────────── */
function phInitSignIn() {
  var identInput  = document.getElementById('acctIdentifier');
  var identHint   = document.getElementById('acctIdentifierHint');
  var continueBtn = document.getElementById('acctContinueBtn');
  var sentState   = document.getElementById('acctSentState');
  var sentToEl    = document.getElementById('acctSentTo');
  var backBtn     = document.getElementById('acctBackBtn');
  var signInCard  = document.querySelector('.acct-card');

  if (!identInput) return;

  /* Validate: 10-digit Indian mobile or standard email */
  function isValidIdentifier(val) {
    var v = val.trim();
    return /^\d{10}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  identInput.addEventListener('input', function () {
    identHint.textContent = '';
    identInput.classList.remove('acct-input--error');
  });

  identInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') continueBtn.click();
  });

  continueBtn.addEventListener('click', function () {
    var val = identInput.value.trim();
    if (!isValidIdentifier(val)) {
      identHint.textContent = 'Enter a valid 10-digit mobile number or email address.';
      identInput.classList.add('acct-input--error');
      identInput.focus();
      return;
    }
    sentToEl.textContent     = val;
    signInCard.style.display = 'none';
    sentState.style.display  = 'block';
    /* SUPABASE SWAP POINT C: supabase.auth.signInWithOtp({ email: val }) */
  });

  backBtn.addEventListener('click', function () {
    sentState.style.display  = 'none';
    signInCard.style.display = 'block';
    identInput.value         = '';
    identInput.focus();
  });

  /* Demo login button — opens PIN pad */
  var demoBtn = document.getElementById('acctDemoBtn');
  if (demoBtn) {
    demoBtn.addEventListener('click', phShowPinPad);
  }
}


/* ──────────────────────────────────────────────────────────
   INIT — check for a persisted session on page load
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  var session = phGetSession();
  if (session) {
    phRenderDashboard(session);
  } else {
    phInitSignIn();
  }
});
