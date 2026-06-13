/* ========================================
   PUREHARVEST — IMMERSIVE CHECKOUT OVERLAY
   ==========================================
   3-step purchase flow:
     M1  Order Review
     M2  Delivery Details
     M3  Payment (sticky CTA footer)
     M4  Confirmation

   Injected into every page via <script src="checkout.js">.
   Depends on globals from script.js:
     window.cartItems, window.cartCount
     addToCartItem(), openCartSidebar(), closeCartSidebar()
     updateCartBadge(), renderCartItems()

   Namespace: .co-* (checkout prefix, no conflicts)
   Razorpay: set window.RAZORPAY_KEY before this script loads.
             Falls back to dev-mode confirm if key is absent.
======================================== */

(function () {
  'use strict';


  /* ──────────────────────────────────────
     INJECT OVERLAY HTML
     Self-contained — no external HTML file needed.
     Structure:
       .co-panel (flex column)
         ├── .co-header       (fixed top: progress dots, back, close)
         ├── .co-scrollable   (flex:1, scrolls independently)
         │     └── .co-moment × 4  (only one active at a time)
         └── .co-pay-footer   (sticky bottom: trust + pay — M3 only)
  ────────────────────────────────────── */
  var el = document.createElement('div');
  el.id = 'coOverlay';
  el.className = 'co-overlay';
  el.innerHTML = [
    '<div class="co-panel" id="coPanel">',

    /* ── Header: always visible, outside scroll zone ── */
    '<div class="co-header">',
    '  <button class="co-back" id="coBack" aria-label="Go back">',
    '    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>',
    '  </button>',
    '  <div class="co-dots" id="coDots">',
    '    <span class="co-dot"></span>',
    '    <span class="co-dot"></span>',
    '    <span class="co-dot"></span>',
    '  </div>',
    '  <button class="co-close-btn" id="coClose" aria-label="Close checkout">',
    '    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    '  </button>',
    '</div>',

    /* ── Scrollable content area — all 4 moments live here ── */
    '<div class="co-scrollable" id="coScrollable">',

    /* M1 — Order Review */
    '<div class="co-moment" id="coM1">',
    '  <p class="co-eyebrow">Your Harvest</p>',
    '  <h2 class="co-h2">Review your<br><em>order</em></h2>',
    '  <div class="co-items-list" id="coItemsList"></div>',
    '  <div class="co-divider"></div>',
    '  <div class="co-row">',
    '    <span class="co-label-sm">Subtotal</span>',
    '    <span class="co-total-val" id="coSubtotal">₹0</span>',
    '  </div>',
    '  <div class="co-row">',
    '    <span class="co-label-sm">Shipping</span>',
    '    <span class="co-total-val co-free">Free</span>',
    '  </div>',
    /* Roots earning preview — always shown, updates live */
    '  <div class="co-roots-earn">',
    '    <span>🌱</span>',
    '    <span>You\'ll earn <strong id="coRootsNumM1">0</strong> Roots on this order</span>',
    '  </div>',
    '  <div class="co-trust">',
    '    <span>🌿 Wild-harvested</span>',
    '    <span class="co-trust-sep">·</span>',
    '    <span>Ships in 48h</span>',
    '    <span class="co-trust-sep">·</span>',
    '    <span>FSSAI certified</span>',
    '  </div>',
    '  <button class="co-cta" id="coM1Cta">Continue →</button>',
    '</div>',

    /* M2 — Delivery */
    '<div class="co-moment" id="coM2">',
    '  <p class="co-eyebrow">Delivery</p>',
    '  <h2 class="co-h2">Where shall we<br><em>send it?</em></h2>',
    '  <div class="co-fields">',
    /* Full name */
    '    <div class="co-field">',
    '      <label class="co-label">Full Name</label>',
    '      <input type="text" class="co-input" id="coName" placeholder="Your name" autocomplete="name" />',
    '      <p class="co-field-hint" id="coNameHint"></p>',
    '    </div>',
    /* Phone — enforces Indian mobile format: starts 6-9, 10 digits */
    '    <div class="co-field">',
    '      <label class="co-label">Phone</label>',
    '      <div class="co-phone-row">',
    '        <span class="co-prefix">+91</span>',
    '        <input type="tel" class="co-input co-input-flex" id="coPhone" placeholder="9876543210" maxlength="10" inputmode="numeric" autocomplete="tel" />',
    '      </div>',
    '      <p class="co-field-hint" id="coPhoneHint"></p>',
    '    </div>',
    /* Pincode — live lookup via India Post API, must resolve before Continue */
    '    <div class="co-field">',
    '      <label class="co-label">Pincode</label>',
    '      <div class="co-pin-row">',
    '        <input type="text" class="co-input co-input-pin" id="coPincode" placeholder="400001" maxlength="6" inputmode="numeric" />',
    '        <span class="co-pin-loc" id="coPinLoc"></span>',
    '      </div>',
    '      <p class="co-field-hint" id="coPinHint"></p>',
    '    </div>',
    /* Address */
    '    <div class="co-field">',
    '      <label class="co-label">Address</label>',
    '      <textarea class="co-input co-textarea" id="coAddress" placeholder="House / Flat no., Street, Area" rows="2"></textarea>',
    '      <p class="co-field-hint" id="coAddrHint"></p>',
    '    </div>',
    '  </div>',
    '  <button class="co-cta" id="coM2Cta">Continue to Payment →</button>',
    '</div>',

    /* M3 — Payment (pay button lives in sticky footer, not here) */
    '<div class="co-moment" id="coM3">',
    '  <p class="co-eyebrow">Complete</p>',
    '  <h2 class="co-h2">Complete your<br><em>ritual</em></h2>',
    '  <div class="co-pay-summary" id="coPaySummary"></div>',
    '  <div class="co-pay-addr" id="coPayAddr"></div>',
    '  <div class="co-divider"></div>',
    '  <div class="co-row co-pay-total-row">',
    '    <span class="co-label-sm">Total</span>',
    '    <span class="co-pay-total" id="coPayTotal">₹0</span>',
    '  </div>',
    '  <div class="co-divider"></div>',
    /* Harvest Card / Coupon code field */
    '  <div class="co-discount-section">',
    '    <p class="co-discount-label">Harvest Card or Coupon</p>',
    '    <div class="co-discount-row">',
    '      <input type="text" class="co-code-input" id="coCodeInput" placeholder="Enter code e.g. WELCOME15" maxlength="24" autocomplete="off" />',
    '      <button class="co-code-apply" id="coCodeApply">Apply</button>',
    '    </div>',
    '    <p class="co-code-msg" id="coCodeMsg"></p>',
    '  </div>',
    /* Roots earning reminder — reinforces value proposition at payment step */
    '  <div class="co-roots-earn" id="coRootsEarnM3">',
    '    <span>🌱</span>',
    '    <span>You\'ll earn <strong id="coRootsNumM3">0</strong> Roots · tracked from order 1</span>',
    '  </div>',
    '</div>',

    /* M4 — Confirmation */
    '<div class="co-moment co-moment-confirm" id="coConfirm">',
    '  <div class="co-glow"></div>',
    '  <div class="co-confirm-icon">🌿</div>',
    '  <h2 class="co-h2 co-confirm-h2">Your harvest is<br><em>on its way.</em></h2>',
    '  <p class="co-confirm-sub">A confirmation will be sent to you shortly.</p>',
    '  <div class="co-order-card" id="coOrderCard"></div>',
    '  <button class="co-cta co-cta-ghost" id="coFinish">Continue Shopping</button>',
    '</div>',

    '</div>',/* end .co-scrollable */

    /* ── Sticky pay footer — pinned to bottom of panel ──
       Only shown on M3 (step 3). Contains trust line + pay button.
       Lives outside .co-scrollable so it never scrolls away.
    ── */
    '<div class="co-pay-footer" id="coPayFooter">',
    '  <p class="co-foot-trust">🔒 Secured by Razorpay · SSL encrypted · Ships in 48h</p>',
    '  <button class="co-cta co-cta-honey" id="coPayBtn">',
    '    Pay&nbsp;<span id="coPayAmt">₹0</span>',
    '  </button>',
    '</div>',

    '</div>'/* end .co-panel */
  ].join('');

  document.body.appendChild(el);


  /* ──────────────────────────────────────
     STATE
     _items       — current items array for this checkout
     _step        — active step number (1–4)
     _delivery    — collected M2 delivery details
     _discount    — applied coupon/card { code, amount, type, label }
     _pinVerified — true once India Post API confirmed the pincode
  ────────────────────────────────────── */
  var _items       = [];
  var _step        = 1;
  var _delivery    = {};
  var _discount    = { code: '', amount: 0, type: '', label: '' };
  var _pinVerified = false;


  /* ──────────────────────────────────────
     DOM REFS — cached once after inject
  ────────────────────────────────────── */
  var overlay    = document.getElementById('coOverlay');
  var scrollable = document.getElementById('coScrollable');
  var moments    = overlay.querySelectorAll('.co-moment');
  var dots       = overlay.querySelectorAll('.co-dot');
  var backBtn    = document.getElementById('coBack');
  var closeBtn   = document.getElementById('coClose');
  var payFooter  = document.getElementById('coPayFooter');


  /* ──────────────────────────────────────
     OPEN CHECKOUT
     Global entry point: openCheckout(items).
     items = array of { name, price, size?, imgClass? }
     Falls back to window.cartItems if not passed.
  ────────────────────────────────────── */
  window.openCheckout = function (items) {
    /* Resolve items — use passed array or fall back to global cart */
    _items = (items && items.length) ? items : (window.cartItems ? [].concat(window.cartItems) : []);
    if (!_items.length) return; /* nothing to checkout, do nothing */

    /* Reset checkout state for a clean open */
    _step        = 1;
    _discount    = { code: '', amount: 0, type: '', label: '' };
    _pinVerified = false;

    /* Clear any previous coupon UI from a prior open */
    var codeInput = document.getElementById('coCodeInput');
    var codeMsg   = document.getElementById('coCodeMsg');
    if (codeInput) { codeInput.value = ''; }
    if (codeMsg)   { codeMsg.textContent = ''; codeMsg.className = 'co-code-msg'; }

    renderM1();
    gotoStep(1);

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; /* lock background page scroll */
  };


  /* ──────────────────────────────────────
     CLOSE CHECKOUT
     Removes active class, unlocks page scroll.
  ────────────────────────────────────── */
  function closeCheckout() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* Close via ✕ button */
  closeBtn.addEventListener('click', closeCheckout);

  /* Close via backdrop click (outside the panel) */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeCheckout();
  });


  /* ──────────────────────────────────────
     BACK BUTTON
     Only active on steps 2 and 3.
     Hidden on step 1 and confirmation (step 4).
  ────────────────────────────────────── */
  backBtn.addEventListener('click', function () {
    if (_step > 1 && _step < 4) gotoStep(_step - 1);
  });


  /* ──────────────────────────────────────
     STEP ENGINE
     Switches which moment is visible,
     updates dots, back button, and sticky footer visibility.
  ────────────────────────────────────── */
  function gotoStep(n) {
    _step = n;

    /* Show only the active moment — hide all others */
    moments.forEach(function (m, i) {
      m.classList.toggle('active', i === n - 1);
    });

    /* Fill progress dots up to current step (max 3 — confirmation has none) */
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i < Math.min(n, 3));
    });

    /* Back button: visible on steps 2 and 3 only */
    var showBack = (n > 1 && n < 4);
    backBtn.style.opacity       = showBack ? '1' : '0';
    backBtn.style.pointerEvents = showBack ? '' : 'none';

    /* Sticky pay footer: only visible on M3 */
    payFooter.classList.toggle('visible', n === 3);

    /* Scroll back to top of content when step changes */
    scrollable.scrollTop = 0;
  }


  /* ──────────────────────────────────────
     ORDER TOTAL HELPERS
     rawTotal  — sum of all item prices (before discount)
     calcTotal — after applying _discount.amount
     calcRoots — 1 Root per ₹100 spent (floored)
                 Roots are calculated on rawTotal (pre-discount spend)
  ────────────────────────────────────── */
  function rawTotal() {
    return _items.reduce(function (sum, item) {
      return sum + parseInt(item.price, 10);
    }, 0);
  }

  function calcTotal() {
    return Math.max(0, rawTotal() - _discount.amount);
  }

  function calcRoots(total) {
    return Math.floor(total / 100);
  }


  /* ──────────────────────────────────────
     M1: ORDER REVIEW RENDER
     Groups duplicate items (same name + price + size) into
     single rows showing quantity, to avoid repetitive display.
  ────────────────────────────────────── */
  function renderM1() {
    /* Group items: key = name||price||size */
    var groups = {};
    _items.forEach(function (item) {
      var key = (item.name || '') + '||' + (item.price || 0) + '||' + (item.size || '');
      if (groups[key]) {
        groups[key].qty += 1;
      } else {
        /* Shallow clone so we don't mutate the original items array */
        groups[key] = Object.assign({}, item, { qty: 1 });
      }
    });

    /* Build item rows HTML */
    var html = Object.values(groups).map(function (g) {
      var linePrice = (parseInt(g.price, 10) * g.qty).toLocaleString('en-IN');
      var metaParts = [g.size, g.qty > 1 ? '× ' + g.qty : ''].filter(Boolean);
      return [
        '<div class="co-item">',
        '  <div class="co-item-img ' + (g.imgClass || 'p-honey') + '"></div>',
        '  <div class="co-item-info">',
        '    <p class="co-item-name">' + g.name + '</p>',
        '    <p class="co-item-meta">' + metaParts.join('  ') + '</p>',
        '  </div>',
        '  <p class="co-item-price">₹' + linePrice + '</p>',
        '</div>'
      ].join('');
    }).join('');

    document.getElementById('coItemsList').innerHTML = html;

    /* Update subtotal and Roots preview */
    var total = rawTotal();
    document.getElementById('coSubtotal').textContent   = '₹' + total.toLocaleString('en-IN');
    document.getElementById('coRootsNumM1').textContent = calcRoots(total);
  }

  /* M1 Continue button — no validation needed here */
  document.getElementById('coM1Cta').addEventListener('click', function () {
    gotoStep(2);
  });


  /* ──────────────────────────────────────
     M2: DELIVERY — FIELD REFERENCES
  ────────────────────────────────────── */
  var pinInput   = document.getElementById('coPincode');
  var pinLocEl   = document.getElementById('coPinLoc');
  var pinHintEl  = document.getElementById('coPinHint');
  var phoneInput = document.getElementById('coPhone');
  var phoneHintEl = document.getElementById('coPhoneHint');


  /* ──────────────────────────────────────
     PINCODE LIVE LOOKUP
     Calls India Post API on each 6-digit entry.
     Sets _pinVerified = true only on success.
     If API is down, allows fallback (doesn't block user).
  ────────────────────────────────────── */
  pinInput.addEventListener('input', function () {
    /* Strip non-digits, cap at 6 */
    var pin = pinInput.value.replace(/\D/g, '').slice(0, 6);
    pinInput.value = pin;

    /* Reset verification state on any change */
    pinLocEl.textContent  = '';
    pinHintEl.textContent = '';
    _pinVerified = false;

    /* Only look up when all 6 digits are entered */
    if (pin.length !== 6) return;

    pinLocEl.textContent = '...';
    pinLocEl.style.color = 'rgba(255,255,255,0.35)';

    /* Async API call — India Post Pincode API (free, no auth required) */
    fetch('https://api.postalpincode.in/pincode/' + pin)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data[0].Status === 'Success') {
          var po = data[0].PostOffice[0];
          pinLocEl.textContent = po.District + ', ' + po.State;
          pinLocEl.style.color = 'var(--honey)';
          _pinVerified = true;
        } else {
          pinLocEl.textContent  = '';
          pinHintEl.textContent = 'Pincode not found — please check and re-enter.';
          pinHintEl.style.color = '#f87171';
          _pinVerified = false;
        }
      })
      .catch(function () {
        /* Network or API error — allow checkout to proceed so users aren't blocked */
        pinLocEl.textContent  = '';
        pinHintEl.textContent = 'Could not verify pincode — you may still proceed.';
        pinHintEl.style.color = 'rgba(255,255,255,0.4)';
        _pinVerified = true; /* fallback: don't block on API downtime */
      });
  });


  /* ──────────────────────────────────────
     PHONE NUMBER FORMATTING
     Strip non-digits as user types, cap at 10.
  ────────────────────────────────────── */
  phoneInput.addEventListener('input', function () {
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    phoneHintEl.textContent = '';
  });

  /* Clear error highlight when any input is edited */
  overlay.querySelectorAll('.co-input').forEach(function (inp) {
    inp.addEventListener('input', function () { inp.classList.remove('co-err'); });
  });

  /* ──────────────────────────────────────
     INLINE BLUR VALIDATION
     Show field-level errors as soon as the user leaves a field,
     not only when the CTA is clicked. Gives immediate feedback.
  ────────────────────────────────────── */
  var nameInput   = document.getElementById('coName');
  var nameHintEl  = document.getElementById('coNameHint');
  var addrInput   = document.getElementById('coAddress');
  var addrHintEl  = document.getElementById('coAddrHint');

  /* Name — must not be empty on blur */
  nameInput.addEventListener('blur', function () {
    if (!nameInput.value.trim()) {
      nameInput.classList.add('co-err');
      nameHintEl.textContent = 'Please enter your full name.';
      nameHintEl.style.color = '#f87171';
    }
  });
  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim()) {
      nameInput.classList.remove('co-err');
      nameHintEl.textContent = '';
    }
  });

  /* Phone — show format error on blur if digits entered but invalid */
  phoneInput.addEventListener('blur', function () {
    var ph = phoneInput.value.trim();
    if (ph && !/^[6-9]\d{9}$/.test(ph)) {
      phoneInput.classList.add('co-err');
      phoneHintEl.textContent = 'Enter a valid 10-digit Indian mobile number.';
      phoneHintEl.style.color = '#f87171';
    }
  });

  /* Address — must not be empty on blur */
  addrInput.addEventListener('blur', function () {
    if (!addrInput.value.trim()) {
      addrInput.classList.add('co-err');
      addrHintEl.textContent = 'Please enter your delivery address.';
      addrHintEl.style.color = '#f87171';
    }
  });
  addrInput.addEventListener('input', function () {
    if (addrInput.value.trim()) {
      addrInput.classList.remove('co-err');
      addrHintEl.textContent = '';
    }
  });


  /* ──────────────────────────────────────
     M2: DELIVERY VALIDATION + CONTINUE
     All four fields must pass before moving to M3.
     Phone: must be Indian mobile number (starts 6-9, 10 digits)
     Pincode: must be 6 digits and verified by API
  ────────────────────────────────────── */
  document.getElementById('coM2Cta').addEventListener('click', function () {
    var name    = document.getElementById('coName').value.trim();
    var phone   = document.getElementById('coPhone').value.trim();
    var pincode = document.getElementById('coPincode').value.trim();
    var address = document.getElementById('coAddress').value.trim();

    var valid = true;

    /* Validate: Name must not be empty */
    var nameEl = document.getElementById('coName');
    nameEl.classList.toggle('co-err', !name);
    if (!name) valid = false;

    /* Validate: Phone — Indian mobile format: 10 digits starting with 6, 7, 8, or 9 */
    var phoneEl    = document.getElementById('coPhone');
    var phoneOk    = /^[6-9]\d{9}$/.test(phone);
    phoneEl.classList.toggle('co-err', !phoneOk);
    if (!phoneOk) {
      phoneHintEl.textContent = 'Enter a valid 10-digit Indian mobile number.';
      phoneHintEl.style.color = '#f87171';
      valid = false;
    }

    /* Validate: Pincode — must be 6 digits AND verified by the India Post API */
    var pinEl  = document.getElementById('coPincode');
    var pinOk  = pincode.length === 6 && _pinVerified;
    pinEl.classList.toggle('co-err', !pinOk);
    if (!pinOk) {
      pinHintEl.textContent = pincode.length !== 6
        ? 'Enter your 6-digit pincode.'
        : 'Pincode not yet verified — please wait a moment or re-enter.';
      pinHintEl.style.color = '#f87171';
      valid = false;
    }

    /* Validate: Address must not be empty */
    var addrEl = document.getElementById('coAddress');
    addrEl.classList.toggle('co-err', !address);
    if (!address) valid = false;

    /* Show all errors at once, don't stop at first failure */
    if (!valid) return;

    /* Save delivery details — used in M3 summary and confirmation */
    _delivery = {
      name:     name,
      phone:    phone,
      pincode:  pincode,
      address:  address,
      location: pinLocEl.textContent
    };

    renderM3();
    gotoStep(3);
  });


  /* ──────────────────────────────────────
     COUPON / HARVEST CARD VALIDATION
     Codes are validated client-side for now.
     Harvest Card codes (PH-HARV-*) are stubbed — no backend yet.
     Combined discount cap: 25% of order value.

     TO ADD A COUPON: add an entry to COUPON_CODES below.
     type 'pct' = percentage off | type 'fixed' = fixed INR off
  ────────────────────────────────────── */
  var COUPON_CODES = {
    'WELCOME15':    { type: 'pct',   value: 15, label: '15% off — welcome discount' },
    'FIRSTHARVEST': { type: 'pct',   value: 10, label: '10% off — first harvest' },
    'RITUAL20':     { type: 'pct',   value: 20, label: '20% off — ritual launch' },
    'ARAKU2026':    { type: 'pct',   value: 12, label: '12% off — Araku harvest season' },
    'FRIEND10':     { type: 'pct',   value: 10, label: '10% off — referred by a friend' }
  };

  document.getElementById('coCodeApply').addEventListener('click', function () {
    var raw  = (document.getElementById('coCodeInput').value || '').trim().toUpperCase();
    var msg  = document.getElementById('coCodeMsg');
    var base = rawTotal();

    if (!raw) {
      msg.textContent = 'Enter a code first.';
      msg.className   = 'co-code-msg co-msg-err';
      return;
    }

    /* Harvest Card pattern check — backend required for actual balance lookup */
    if (raw.indexOf('PH-HARV-') === 0) {
      _discount = { code: raw, amount: 0, type: 'harvestcard', label: '' };
      msg.textContent = 'Harvest Cards will be fully redeemable once accounts launch — coming soon!';
      msg.className   = 'co-code-msg co-msg-warn';
      updateM3Totals();
      return;
    }

    /* Coupon code lookup */
    var coupon = COUPON_CODES[raw];
    if (!coupon) {
      _discount = { code: '', amount: 0, type: '', label: '' };
      msg.textContent = 'Code not recognised — check spelling and try again.';
      msg.className   = 'co-code-msg co-msg-err';
      updateM3Totals();
      return;
    }

    /* Calculate discount amount */
    var discountAmt = coupon.type === 'pct'
      ? Math.round(base * coupon.value / 100)
      : coupon.value;

    /* Cap at 25% of order value (combined discount limit — protects margins) */
    var maxDiscount = Math.round(base * 0.25);
    if (discountAmt > maxDiscount) discountAmt = maxDiscount;

    _discount = { code: raw, amount: discountAmt, type: 'coupon', label: coupon.label };
    msg.textContent = coupon.label + ' — ₹' + discountAmt.toLocaleString('en-IN') + ' off applied!';
    msg.className   = 'co-code-msg co-msg-ok';

    updateM3Totals();
  });


  /* ──────────────────────────────────────
     M3: PAYMENT SUMMARY RENDER
     Called when entering M3.
     Shows product names, delivery preview, and order total.
  ────────────────────────────────────── */
  function renderM3() {
    updateM3Totals();

    /* Unique product names summary line (comma-separated) */
    var uniqueNames = [];
    _items.forEach(function (item) {
      if (uniqueNames.indexOf(item.name) === -1) uniqueNames.push(item.name);
    });
    document.getElementById('coPaySummary').textContent = uniqueNames.join(' · ');

    /* Delivery preview — name, pincode, city/state if available */
    document.getElementById('coPayAddr').textContent =
      'Delivering to ' + _delivery.name + ' · ' + _delivery.pincode +
      (_delivery.location ? ', ' + _delivery.location : '');
  }

  /* Update M3 total and pay button amount — called on render and after coupon apply */
  function updateM3Totals() {
    var total = calcTotal(); /* post-discount */
    var roots = calcRoots(rawTotal()); /* Roots based on pre-discount spend */

    document.getElementById('coPayAmt').textContent    = '₹' + total.toLocaleString('en-IN');
    document.getElementById('coPayTotal').textContent  = '₹' + total.toLocaleString('en-IN');
    document.getElementById('coRootsNumM3').textContent = roots;
  }


  /* ──────────────────────────────────────
     PAY BUTTON
     In sticky footer (.co-pay-footer).
     Live mode: opens Razorpay sheet when window.RAZORPAY_KEY is set.
     Dev mode: calls showConfirm directly (no payment gateway).
  ────────────────────────────────────── */
  document.getElementById('coPayBtn').addEventListener('click', function () {
    var total = calcTotal();

    if (typeof Razorpay !== 'undefined' && window.RAZORPAY_KEY) {
      /* ── Live Razorpay payment ── */
      var uniqueNames = [];
      _items.forEach(function (i) { if (uniqueNames.indexOf(i.name) === -1) uniqueNames.push(i.name); });

      var rzp = new Razorpay({
        key:         window.RAZORPAY_KEY,
        amount:      total * 100,           /* Razorpay expects paise, not rupees */
        currency:    'INR',
        name:        'PureHarvest Organics',
        description: uniqueNames.join(', '),
        prefill: {
          name:    _delivery.name,
          contact: '+91' + _delivery.phone  /* phone without country code */
        },
        theme: { color: '#c4903a' },        /* honey amber accent */
        handler: function () { showConfirm(total); }
      });
      rzp.open();
    } else {
      /* ── Dev mode — skip payment, go straight to confirmation ── */
      showConfirm(total);
    }
  });


  /* ──────────────────────────────────────
     CONFIRMATION SCREEN (M4)
     Generates an order ID, sets ETA (today + 5 days),
     shows Roots earned, and clears the cart.
  ────────────────────────────────────── */
  function showConfirm(total) {
    /* Human-readable order ID: PH-YYYY-XXXXX */
    var orderId = 'PH-' + new Date().getFullYear() + '-' +
      Math.random().toString(36).slice(2, 7).toUpperCase();

    /* ETA: 5 days from today */
    var eta    = new Date();
    eta.setDate(eta.getDate() + 5);
    var etaStr = eta.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

    var uniqueNames = [];
    _items.forEach(function (i) { if (uniqueNames.indexOf(i.name) === -1) uniqueNames.push(i.name); });

    var rootsEarned = calcRoots(rawTotal());

    document.getElementById('coOrderCard').innerHTML = [
      '<p class="co-oid">' + orderId + '</p>',
      '<p class="co-oitems">' + uniqueNames.join(' · ') + '</p>',
      '<p class="co-oprice">₹' + total.toLocaleString('en-IN') + '</p>',
      '<p class="co-oroots">🌱 ' + rootsEarned + ' Roots earned — tracked from this order</p>',
      '<p class="co-oeta">Arriving by ' + etaStr + '</p>'
    ].join('');

    /* Clear cart state */
    if (window.cartItems)              { window.cartItems.length = 0; }
    if (window.cartCount !== undefined){ window.cartCount = 0; }
    if (typeof updateCartBadge  === 'function') { updateCartBadge(); }
    if (typeof renderCartItems  === 'function') { renderCartItems(); }

    gotoStep(4);
  }

  /* Confirmation "Continue Shopping" button */
  document.getElementById('coFinish').addEventListener('click', function () {
    closeCheckout();
    if (typeof closeCartSidebar === 'function') closeCartSidebar();
  });

})();
