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
    '    <span class="co-total-val" id="coShipping">—</span>',
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

    /* M2 — Delivery (structured address fields, pincode-driven auto-fill) */
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

    /* Email — needed for order confirmations and WhatsApp fallback */
    '    <div class="co-field">',
    '      <label class="co-label">Email</label>',
    '      <input type="email" class="co-input" id="coEmail" placeholder="you@example.com" autocomplete="email" inputmode="email" />',
    '      <p class="co-field-hint" id="coEmailHint"></p>',
    '    </div>',

    /* Phone + Pincode — side by side; pincode drives city/state auto-fill */
    '    <div class="co-phone-pin-row">',
    '      <div class="co-field co-field--phone">',
    '        <label class="co-label">Phone</label>',
    '        <div class="co-phone-row">',
    '          <span class="co-prefix">+91</span>',
    '          <input type="tel" class="co-input co-input-flex" id="coPhone" placeholder="9876543210" maxlength="10" inputmode="numeric" autocomplete="tel" />',
    '        </div>',
    '        <p class="co-field-hint" id="coPhoneHint"></p>',
    '      </div>',
    '      <div class="co-field co-field--pin">',
    '        <label class="co-label">Pincode</label>',
    '        <input type="text" class="co-input" id="coPincode" placeholder="530015" maxlength="6" inputmode="numeric" />',
    '        <span class="co-pin-loc" id="coPinLoc"></span>',
    '        <p class="co-field-hint" id="coPinHint"></p>',
    '      </div>',
    '    </div>',

    /* Flat and Building — side by side, comes before locality for natural address flow */
    '    <div class="co-field-row">',
    '      <div class="co-field">',
    '        <label class="co-label">Flat / House no.</label>',
    '        <input type="text" class="co-input" id="coFlat" placeholder="Apt 4B" autocomplete="address-line1" />',
    '        <p class="co-field-hint" id="coFlatHint"></p>',
    '      </div>',
    '      <div class="co-field">',
    '        <label class="co-label">Building</label>',
    '        <input type="text" class="co-input" id="coBuilding" placeholder="Palm Heights" autocomplete="address-line2" />',
    '      </div>',
    '    </div>',

    /* Area / Locality — free text, user fills manually */
    '    <div class="co-field">',
    '      <label class="co-label">Area / Locality</label>',
    '      <input type="text" class="co-input" id="coArea" placeholder="e.g. Koramangala, Bandra West" autocomplete="address-level3" />',
    '      <p class="co-field-hint" id="coAreaHint"></p>',
    '    </div>',

    /* City + State — read-only, auto-filled from pincode lookup; always side by side */
    '    <div class="co-field-row co-field-row--inline">',
    '      <div class="co-field">',
    '        <label class="co-label">City</label>',
    '        <input type="text" class="co-input co-input-auto" id="coCity" placeholder="Auto-filled" readonly />',
    '      </div>',
    '      <div class="co-field">',
    '        <label class="co-label">State</label>',
    '        <input type="text" class="co-input co-input-auto" id="coState" placeholder="Auto-filled" readonly />',
    '      </div>',
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
    '  <div class="co-row">',
    '    <span class="co-label-sm">Shipping</span>',
    '    <span class="co-total-val" id="coM3Shipping">—</span>',
    '  </div>',
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

    /* Clear M2 fields from any previous checkout session */
    [nameInput, emailInput, phoneInput, pinInput, areaInput, flatInput, cityInput, stateInput].forEach(function (el) {
      if (el) el.value = '';
    });
    var buildingInput = document.getElementById('coBuilding');
    if (buildingInput) buildingInput.value = '';
    if (pinLocEl)  { pinLocEl.textContent = ''; }


    renderM1();
    gotoStep(1);

    overlay.classList.add('active');

    /* Silently pre-detect state from IP (best-effort, runs in background) */
    setTimeout(prefillFromIP, 400);

    /* iOS scroll lock: body.style.overflow='hidden' alone doesn't stop momentum
       scroll on Safari. Save the current scroll position, then pin the body with
       position:fixed so the page can't move behind the checkout panel. */
    var _scrollY = window.scrollY;
    document.body.style.overflow   = 'hidden';
    document.body.style.position   = 'fixed';
    document.body.style.top        = '-' + _scrollY + 'px';
    document.body.style.width      = '100%';
    document.body.dataset.scrollY  = _scrollY; /* store so closeCheckout can restore */
  };


  /* ──────────────────────────────────────
     CLOSE CHECKOUT
     Removes active class, unlocks page scroll.
  ────────────────────────────────────── */
  function closeCheckout() {
    overlay.classList.remove('active');

    /* Restore scroll position: undo the position:fixed lock set in openCheckout.
       Read the stored Y value before clearing styles, then jump back to it. */
    var sy = parseInt(document.body.dataset.scrollY || '0', 10);
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top      = '';
    document.body.style.width    = '';
    window.scrollTo(0, sy);
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

  /* Shipping: free on orders ₹999+, else ₹99 flat */
  function calcShipping() {
    return rawTotal() >= 999 ? 0 : 99;
  }

  function calcTotal() {
    return Math.max(0, rawTotal() + calcShipping() - _discount.amount);
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

    /* Update subtotal, shipping row, and Roots preview */
    var total    = rawTotal();
    var shipping = calcShipping();
    var shipEl   = document.getElementById('coShipping');
    document.getElementById('coSubtotal').textContent   = '₹' + total.toLocaleString('en-IN');
    document.getElementById('coRootsNumM1').textContent = calcRoots(total);
    if (shipEl) {
      if (shipping === 0) {
        shipEl.textContent  = 'Free';
        shipEl.className    = 'co-total-val co-free';
      } else {
        shipEl.textContent  = '₹' + shipping;
        shipEl.className    = 'co-total-val co-shipping-fee';
      }
    }
  }

  /* M1 Continue button — no validation needed here */
  document.getElementById('coM1Cta').addEventListener('click', function () {
    gotoStep(2);
  });


  /* ──────────────────────────────────────
     M2: DELIVERY — FIELD REFERENCES
     All inputs grabbed once and reused by handlers below.
  ────────────────────────────────────── */
  var nameInput    = document.getElementById('coName');
  var nameHintEl   = document.getElementById('coNameHint');
  var emailInput   = document.getElementById('coEmail');
  var emailHintEl  = document.getElementById('coEmailHint');
  var phoneInput   = document.getElementById('coPhone');
  var phoneHintEl  = document.getElementById('coPhoneHint');
  var pinInput     = document.getElementById('coPincode');
  var pinLocEl     = document.getElementById('coPinLoc');
  var pinHintEl    = document.getElementById('coPinHint');
  var areaInput    = document.getElementById('coArea');
  var areaHintEl   = document.getElementById('coAreaHint');
  var flatInput    = document.getElementById('coFlat');
  var flatHintEl   = document.getElementById('coFlatHint');
  var cityInput    = document.getElementById('coCity');
  var stateInput   = document.getElementById('coState');


  /* Cache: pincode → { district, state } — avoids repeat API calls per session */
  var _pinCache = {};

  /* Clear .co-err highlight whenever user edits any field */
  overlay.querySelectorAll('.co-input').forEach(function (inp) {
    inp.addEventListener('input', function () { inp.classList.remove('co-err'); });
  });


  /* ──────────────────────────────────────
     SILENT IP PRE-DETECTION
     Called once when checkout opens.
     Uses ipapi.co (free, 1000/day) to infer the user's state.
     VPN check: if IP says non-India but device timezone = Asia/Kolkata
     → assume the user is in India (VPN active), still pre-fill.
     Result goes into State field if empty and pincode lookup hasn't filled it yet.
  ────────────────────────────────────── */
  function prefillFromIP() {
    /* Skip if state is already filled from a previous pincode lookup */
    if (stateInput.value) return;

    fetch('https://ipapi.co/json/')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        /* Timezone-based VPN bypass: device timezone wins over IP country */
        var tz      = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var inIndia = (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta');
        var ipIndia = (d.country_code === 'IN');

        if (!inIndia && !ipIndia) return; /* Genuinely outside India — don't pre-fill */

        /* Only pre-fill state if still empty — don't overwrite user entry */
        if (!stateInput.value && d.region) {
          stateInput.value = d.region;
        }
        /* Pre-fill city too if empty */
        if (!cityInput.value && d.city) {
          cityInput.value = d.city;
        }
      })
      .catch(function () { /* fail silently — pre-fill is best-effort */ });
  }


  /* ──────────────────────────────────────
     PINCODE LIVE LOOKUP (CACHED)
     Fires immediately on 6th digit (no blur needed).
     Checks _pinCache first — instant fill if already looked up this session.
     On API success: fills City + State inputs and shows district badge.
     On failure: clears auto-fills, shows error, doesn't block continue.
  ────────────────────────────────────── */
  pinInput.addEventListener('input', function () {
    /* Strip non-digits, cap at 6 */
    var pin = pinInput.value.replace(/\D/g, '').slice(0, 6);
    pinInput.value = pin;

    /* Clear previous result on every change */
    pinLocEl.textContent  = '';
    pinHintEl.textContent = '';
    _pinVerified          = false;

    if (pin.length !== 6) return;

    /* Cache hit — instant fill, no network */
    if (_pinCache[pin]) {
      var cached = _pinCache[pin];
      pinLocEl.textContent = cached.district + ', ' + cached.state;
      pinLocEl.style.color = 'var(--honey)';
      cityInput.value      = cached.district;
      stateInput.value     = cached.state;
      _pinVerified         = true;
      return;
    }

    /* Show spinner immediately so user sees feedback on 6th keystroke */
    pinLocEl.textContent = 'checking…';
    pinLocEl.style.color = 'rgba(255,255,255,0.35)';

    /* India Post Pincode API — free, no auth */
    fetch('https://api.postalpincode.in/pincode/' + pin)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data[0].Status === 'Success') {
          var po       = data[0].PostOffice[0];
          var district = po.District;
          var state    = po.State;

          /* Store in cache so repeat lookups are instant */
          _pinCache[pin] = { district: district, state: state };

          pinLocEl.textContent = district + ', ' + state;
          pinLocEl.style.color = 'var(--honey)';
          cityInput.value      = district;
          stateInput.value     = state;
          _pinVerified         = true;
        } else {
          pinLocEl.textContent  = '';
          pinHintEl.textContent = 'Pincode not found — please check and re-enter.';
          pinHintEl.style.color = '#f87171';
          cityInput.value       = '';
          stateInput.value      = '';
          _pinVerified          = false;
        }
      })
      .catch(function () {
        /* API down — don't block checkout, just note it */
        pinLocEl.textContent  = '';
        pinHintEl.textContent = 'Could not verify pincode — you may still proceed.';
        pinHintEl.style.color = 'rgba(255,255,255,0.4)';
        _pinVerified          = true; /* fallback: don't block on API downtime */
      });
  });


  /* ──────────────────────────────────────
     PHONE NUMBER FORMATTING
     Strip non-digits as user types, cap at 10.
  ────────────────────────────────────── */
  phoneInput.addEventListener('input', function () {
    phoneInput.value       = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    phoneHintEl.textContent = '';
  });





  /* ──────────────────────────────────────
     INLINE BLUR VALIDATION
     Show field-level errors as the user leaves each field,
     not only when Continue is clicked — gives immediate feedback.
  ────────────────────────────────────── */

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

  /* Returns true if a digit repeats 8+ times — catches fakes like 6000000006 */
  function hasRepeatDigit(ph) {
    for (var d = 0; d <= 9; d++) {
      if ((ph.split(String(d)).length - 1) >= 8) return true;
    }
    return false;
  }

  /* Phone — validate format on blur */
  phoneInput.addEventListener('blur', function () {
    var ph = phoneInput.value.trim();
    if (ph && (!/^[6-9]\d{9}$/.test(ph) || hasRepeatDigit(ph))) {
      phoneInput.classList.add('co-err');
      phoneHintEl.textContent = 'Enter a valid 10-digit Indian mobile number.';
      phoneHintEl.style.color = '#f87171';
    }
  });

  /* Area — must not be empty on blur */
  areaInput.addEventListener('blur', function () {
    if (!areaInput.value.trim()) {
      areaInput.classList.add('co-err');
      areaHintEl.textContent = 'Please enter your area or locality.';
      areaHintEl.style.color = '#f87171';
    }
  });
  areaInput.addEventListener('input', function () {
    if (areaInput.value.trim()) {
      areaInput.classList.remove('co-err');
      areaHintEl.textContent = '';
    }
  });

  /* Flat — must not be empty on blur */
  flatInput.addEventListener('blur', function () {
    if (!flatInput.value.trim()) {
      flatInput.classList.add('co-err');
      flatHintEl.textContent = 'Enter your flat or house number.';
      flatHintEl.style.color = '#f87171';
    }
  });
  flatInput.addEventListener('input', function () {
    if (flatInput.value.trim()) {
      flatInput.classList.remove('co-err');
      flatHintEl.textContent = '';
    }
  });


  /* ──────────────────────────────────────
     M2: DELIVERY VALIDATION + CONTINUE
     Validates: name, phone (Indian format), pincode (6-digit + verified),
     area, and flat/house no. City + State are auto-filled so not re-validated.
  ────────────────────────────────────── */
  document.getElementById('coM2Cta').addEventListener('click', function () {
    var name    = nameInput.value.trim();
    var email   = emailInput.value.trim();
    var phone   = phoneInput.value.trim();
    var pincode = pinInput.value.trim();
    var area    = areaInput.value.trim();
    var flat    = flatInput.value.trim();
    var city    = cityInput.value.trim();
    var state   = stateInput.value.trim();

    var valid = true;

    /* Name */
    nameInput.classList.toggle('co-err', !name);
    if (!name) {
      nameHintEl.textContent = 'Please enter your full name.';
      nameHintEl.style.color = '#f87171';
      valid = false;
    }

    /* Email — required for order confirmation */
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    emailInput.classList.toggle('co-err', !emailOk);
    if (!emailOk) {
      emailHintEl.textContent = 'Enter a valid email address.';
      emailHintEl.style.color = '#f87171';
      valid = false;
    }

    /* Phone — Indian mobile: starts 6–9, 10 digits, no repeated digit 8+ times */
    var phoneOk = /^[6-9]\d{9}$/.test(phone) && !hasRepeatDigit(phone);
    phoneInput.classList.toggle('co-err', !phoneOk);
    if (!phoneOk) {
      phoneHintEl.textContent = 'Enter a valid 10-digit Indian mobile number.';
      phoneHintEl.style.color = '#f87171';
      valid = false;
    }

    /* Pincode — 6 digits and verified (or API fell back) */
    var pinOk = pincode.length === 6 && _pinVerified;
    pinInput.classList.toggle('co-err', !pinOk);
    if (!pinOk) {
      pinHintEl.textContent = pincode.length !== 6
        ? 'Enter your 6-digit pincode.'
        : 'Pincode not yet verified — please wait a moment or re-enter.';
      pinHintEl.style.color = '#f87171';
      valid = false;
    }

    /* Area / locality */
    areaInput.classList.toggle('co-err', !area);
    if (!area) {
      areaHintEl.textContent = 'Please enter your area or locality.';
      areaHintEl.style.color = '#f87171';
      valid = false;
    }

    /* Flat / house number */
    flatInput.classList.toggle('co-err', !flat);
    if (!flat) {
      flatHintEl.textContent = 'Enter your flat or house number.';
      flatHintEl.style.color = '#f87171';
      valid = false;
    }

    /* City and state: must be auto-filled — prompt if pincode wasn't verified */
    if (!city || !state) {
      pinHintEl.textContent = 'Enter and verify your pincode to auto-fill city and state.';
      pinHintEl.style.color = '#f87171';
      pinInput.classList.add('co-err');
      valid = false;
    }

    if (!valid) return;

    /* Build full address string for display in M3 and confirmation */
    var building  = document.getElementById('coBuilding').value.trim();
    var addrParts = [flat, building, area, city, state, pincode].filter(Boolean);

    /* Save structured delivery data — used in M3 display and order confirmation */
    _delivery = {
      name:     name,
      email:    email,
      phone:    phone,
      pincode:  pincode,
      area:     area,
      flat:     flat,
      building: building,
      city:     city,
      state:    state,
      address:  addrParts.join(', ') /* full address string for display */
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

    /* Delivery preview — structured address: name · flat, area, city pincode */
    var addrLine = [_delivery.flat, _delivery.area, _delivery.city].filter(Boolean).join(', ')
                 + (_delivery.pincode ? ' ' + _delivery.pincode : '');
    document.getElementById('coPayAddr').textContent =
      'Delivering to ' + _delivery.name + ' · ' + addrLine;
  }

  /* Update M3 total and pay button amount — called on render and after coupon apply */
  function updateM3Totals() {
    var total    = calcTotal(); /* post-discount, includes shipping */
    var shipping = calcShipping();
    var roots    = calcRoots(rawTotal()); /* Roots on pre-discount product spend only */

    var m3Ship = document.getElementById('coM3Shipping');
    if (m3Ship) {
      if (shipping === 0) {
        m3Ship.textContent = 'Free';
        m3Ship.className   = 'co-total-val co-free';
      } else {
        m3Ship.textContent = '₹' + shipping;
        m3Ship.className   = 'co-total-val co-shipping-fee';
      }
    }

    document.getElementById('coPayAmt').textContent     = '₹' + total.toLocaleString('en-IN');
    document.getElementById('coPayTotal').textContent   = '₹' + total.toLocaleString('en-IN');
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
