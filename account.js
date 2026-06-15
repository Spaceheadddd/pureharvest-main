/* ============================================================
   account.js — PureHarvest account page logic

   Architecture:
   • Session stored in localStorage under key "ph_session"
   • Three clearly-marked SUPABASE SWAP POINTS — when the
     Supabase session is ready, replace only those three
     functions and everything else continues to work
   • Dashboard HTML is fully JS-rendered — the source HTML
     has only an empty <div id="acctDashboard">, so DevTools
     inspect reveals nothing until the user is authenticated
   ============================================================ */


/* ──────────────────────────────────────────────────────────
   SESSION LAYER
   ── SUPABASE SWAP POINT A ──────────────────────────────────
   Replace phGetSession / phSetSession / phClearSession with:
     getSession  → const { data } = await supabase.auth.getSession()
     setSession  → handled automatically by supabase.auth.signInWithOtp()
     clearSession→ await supabase.auth.signOut()
   Also fetch user profile (name, roots, lifetimeSpend) from
   your Supabase "profiles" table after getSession confirms auth.
────────────────────────────────────────────────────────── */
function phGetSession() {
  try { return JSON.parse(localStorage.getItem('ph_session') || 'null'); }
  catch(e) { return null; }
}

function phSetSession(user) {
  /* user shape: { name, identifier, roots, lifetimeSpend, joined } */
  localStorage.setItem('ph_session', JSON.stringify(user));
}

function phClearSession() {
  localStorage.removeItem('ph_session');
}


/* ──────────────────────────────────────────────────────────
   TIER CALCULATOR
   Thresholds and names match ROOTS-PROGRAM.md exactly.
   Based on lifetime spend in INR, not current Roots balance.
────────────────────────────────────────────────────────── */
function phGetTier(lifetimeSpend) {
  if (lifetimeSpend >= 30000) return { name: 'Ancient',  icon: '🌲', mult: 2    };
  if (lifetimeSpend >= 15000) return { name: 'Roots',    icon: '🌳', mult: 1.5  };
  if (lifetimeSpend >= 5000)  return { name: 'Sapling',  icon: '🌿', mult: 1.25 };
  return                             { name: 'Seedling', icon: '🌱', mult: 1    };
}


/* ──────────────────────────────────────────────────────────
   GREETING — time of day
────────────────────────────────────────────────────────── */
function phGreeting() {
  var h = new Date().getHours();
  if (h >= 5  && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 22) return 'Good evening';
  return 'Hey';
}


/* ──────────────────────────────────────────────────────────
   DASHBOARD RENDERER
   Builds and injects the full signed-in dashboard.
   Called only after a confirmed session — container is an
   empty div in source, so inspect shows nothing until authed.
────────────────────────────────────────────────────────── */
function phRenderDashboard(user) {
  var tier         = phGetTier(user.lifetimeSpend || 0);
  var roots        = user.roots || 0;
  var redeemValue  = roots * 10;                       /* 1 Root = ₹10 off */
  var firstName    = (user.name || 'there').split(' ')[0];
  var joinedFormatted = user.joined
    ? new Date(user.joined).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'Recently';

  /* Redemption note — min 3 Roots required to redeem */
  var redeemNote = roots >= 3
    ? 'Worth <strong>₹' + redeemValue + '</strong> off your next order'
    : 'Earn Roots with your first order — redeemable from 3 Roots';

  /* ── Dashboard HTML ─────────────────────────────────────
     Array-of-strings pattern (same as checkout.js) for
     readability when editing individual lines later.
  ──────────────────────────────────────────────────────── */
  var html = [

    /* Greeting bar with sign-out */
    '<div class="acct-db-bar">',
    '  <div>',
    '    <p class="acct-db-greet">' + phGreeting() + ', ' + firstName + '</p>',
    '    <p class="acct-db-since">Member since ' + joinedFormatted + '</p>',
    '  </div>',
    '  <button class="acct-signout-btn" id="acctSignOutBtn">Sign out</button>',
    '</div>',

    /* Roots balance card */
    '<div class="acct-roots-card">',
    '  <div class="acct-roots-top">',
    '    <div>',
    '      <p class="acct-roots-label">Roots Balance</p>',
    '      <p class="acct-roots-num">' + roots + '<span class="acct-roots-unit"> Roots</span></p>',
    '      <p class="acct-roots-redeem">' + redeemNote + '</p>',
    '    </div>',
    '    <div class="acct-tier-badge">',
    '      <span class="acct-tier-icon">' + tier.icon + '</span>',
    '      <span class="acct-tier-name">' + tier.name + '</span>',
    '    </div>',
    '  </div>',
    '  <a href="roots.html" class="acct-roots-link">View Roots Programme →</a>',
    '</div>',

    /* Recent orders — empty state until Supabase order history is wired */
    '<div class="acct-section">',
    '  <p class="acct-section-title">Recent Orders</p>',
    '  <div class="acct-orders-empty">',
    '    <span class="acct-orders-icon">🌿</span>',
    '    <p class="acct-orders-msg">No orders yet — your harvest awaits.</p>',
    '    <a href="shop.html" class="acct-shop-link">Start shopping →</a>',
    '  </div>',
    '</div>',

    /* Profile */
    '<div class="acct-section">',
    '  <p class="acct-section-title">Profile</p>',
    '  <div class="acct-profile-card">',
    '    <div class="acct-profile-row">',
    '      <span class="acct-profile-label">Name</span>',
    '      <span class="acct-profile-val">' + (user.name || '—') + '</span>',
    '    </div>',
    '    <div class="acct-profile-row">',
    '      <span class="acct-profile-label">Contact</span>',
    '      <span class="acct-profile-val">' + (user.identifier || '—') + '</span>',
    '    </div>',
    '    <div class="acct-profile-row">',
    '      <span class="acct-profile-label">Saved address</span>',
    '      <span class="acct-profile-val acct-profile-muted">None saved yet</span>',
    '    </div>',
    /* Edit button disabled — wired up when profile editing is built */
    '    <button class="acct-edit-btn" disabled title="Profile editing coming soon">Edit profile</button>',
    '  </div>',
    '</div>',

  ].join('\n');

  /* Inject into the dashboard container */
  var container = document.getElementById('acctDashboard');
  if (!container) return;
  container.innerHTML = html;
  container.style.display = 'block';

  /* Hide sign-in view — user is authenticated */
  var signinView = document.getElementById('acctSigninView');
  if (signinView) signinView.style.display = 'none';

  /* Sign-out handler */
  document.getElementById('acctSignOutBtn').addEventListener('click', function () {
    phClearSession();
    /* ── SUPABASE SWAP POINT B ──────────────────────────────
       Add: await supabase.auth.signOut()
       before the location.reload() call.
    ─────────────────────────────────────────────────────── */
    location.reload();
  });
}


/* ──────────────────────────────────────────────────────────
   SIGN-IN FLOW
   Validates the identifier, shows "check your inbox" state.
   ── SUPABASE SWAP POINT C ──────────────────────────────────
   In the continueBtn click handler, replace the UI swap with:
     await supabase.auth.signInWithOtp({ email: val })
     or signInWithOtp({ phone: '+91' + val }) for mobile.
   Supabase sends the OTP / magic link automatically.
   On the verify step, listen to supabase.auth.onAuthStateChange
   and call phRenderDashboard() when event === 'SIGNED_IN'.
────────────────────────────────────────────────────────── */
function phInitSignIn() {
  var identInput  = document.getElementById('acctIdentifier');
  var identHint   = document.getElementById('acctIdentifierHint');
  var continueBtn = document.getElementById('acctContinueBtn');
  var sentState   = document.getElementById('acctSentState');
  var sentToEl    = document.getElementById('acctSentTo');
  var backBtn     = document.getElementById('acctBackBtn');
  var signInCard  = document.querySelector('.acct-card');

  if (!identInput) return;   /* guard: only runs on account.html */

  /* Validate: 10-digit Indian mobile or standard email */
  function isValidIdentifier(val) {
    var v = val.trim();
    return /^\d{10}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  /* Clear error state as user types */
  identInput.addEventListener('input', function () {
    identHint.textContent = '';
    identInput.classList.remove('acct-input--error');
  });

  /* Allow Enter key to submit */
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

    /* Show "check your inbox" confirmation state */
    sentToEl.textContent      = val;
    signInCard.style.display  = 'none';
    sentState.style.display   = 'block';

    /* ── SUPABASE SWAP POINT C (continued) ──────────────────
       Replace the two lines above with the actual OTP call:
       supabase.auth.signInWithOtp({ email: val })
         .catch(err => { show error in identHint });
    ─────────────────────────────────────────────────────── */
  });

  /* Back link — reset to identifier input */
  backBtn.addEventListener('click', function () {
    sentState.style.display  = 'none';
    signInCard.style.display = 'block';
    identInput.value         = '';
    identInput.focus();
  });
}


/* ──────────────────────────────────────────────────────────
   INIT
   On page load: check for a session and route accordingly.
   Also updates the ritual drawer account link on this page.
────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  var session = phGetSession();

  if (session) {
    phRenderDashboard(session);
  } else {
    phInitSignIn();
  }
});
