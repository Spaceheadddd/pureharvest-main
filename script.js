/* ========================================
   PUREHARVEST — HOMEPAGE INTERACTIONS
   v2.0 — Full Redesign
======================================== */

/* ========================================
   HEADER — HIDE ON SCROLL DOWN
======================================== */

const siteHeader = document.getElementById('siteHeader');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  if (currentY > lastScrollY && currentY > 120) {
    siteHeader.classList.add('hidden');
  } else {
    siteHeader.classList.remove('hidden');
  }

  lastScrollY = currentY;
}, { passive: true });


/* ========================================
   RITUAL DRAWER — OPEN / CLOSE
======================================== */

const menuToggle   = document.getElementById('menuToggle');
const ritualDrawer = document.getElementById('ritualDrawer');
const closeDrawerBtn = document.getElementById('closeDrawer');
const menuOverlay  = document.getElementById('menuOverlay');

function openMenu() {
  ritualDrawer.classList.add('active');
  menuOverlay.classList.add('active');
  menuToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  ritualDrawer.classList.remove('active');
  menuOverlay.classList.remove('active');
  menuToggle.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMenu);
closeDrawerBtn.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* =================================
   MOBILE NATIVE DRAWER SYSTEM
================================= */

const drawer =
document.querySelector(".ritual-drawer");

let startY = 0;
let currentY = 0;

let isDragging = false;


/* ================================
   TOUCH START
================================ */

drawer.addEventListener("touchstart", (e) => {

  /*
    ONLY ENABLE DRAG
    IF USER IS AT TOP
  */

  if (drawer.scrollTop <= 0) {

    startY =
    e.touches[0].clientY;

    isDragging = true;

    drawer.style.transition =
    "none";

  }

}, { passive: true });


/* ================================
   TOUCH MOVE
================================ */

drawer.addEventListener("touchmove", (e) => {

  if (!isDragging) return;

  /* ALLOW NORMAL SCROLL
  WHEN USER IS SCROLLING INSIDE MENU CONTENT */
  
  if (drawer.scrollTop > 0) return;

  currentY =
  e.touches[0].clientY;

  let diff =
  currentY - startY;

  /*
    ONLY DRAG DOWN
  */

  if (diff > 0) {

    /*
      SLOW RESISTANCE
      MAKES IT FEEL PREMIUM
    */

    let dragAmount =
    diff * 0.92;

    drawer.style.transform =
    `translateY(${dragAmount}px)`;

  }

}, { passive: true });


/* ================================
   TOUCH END
================================ */

drawer.addEventListener("touchend", () => {

  if (!isDragging) return;

  isDragging = false;

  drawer.style.transition =
  "transform 0.42s cubic-bezier(0.32,0.72,0,1)";

  let diff =
  currentY - startY;

  /*
    CLOSE THRESHOLD
  */

  if (diff > 160) {

    closeDrawer();

  }

  else {

    /*
      SNAP BACK
    */

    drawer.style.transform =
    "translateY(0)";

  }

});

/* ================================
   TUTORIAL HINT AUTO HIDE
================================ */
setTimeout(() => {

  document
    .querySelector(".drawer-grip")
    ?.classList.add("hide-hint");

}, 5000);

/* ================================
   CLOSE FUNCTION
================================ */

function closeDrawer() {

  drawer.style.transform =
  "translateY(100%)";

  setTimeout(() => {

    drawer.classList.remove("active");

    /*
      RESET POSITION
    */

    drawer.style.transform =
    "";

  }, 400);

}

/* ========================================
   DRAWER ORBS — ACTIVE STATE
======================================== */

document.querySelectorAll('.orb').forEach(orb => {
  orb.addEventListener('click', () => {
    document.querySelectorAll('.orb').forEach(o => o.classList.remove('orb-active'));
    orb.classList.add('orb-active');
  });
});


/* ========================================
   SIZE SELECTOR
======================================== */

const size500     = document.getElementById('size500');
const size1000    = document.getElementById('size1000');
const productPrice = document.getElementById('productPrice');
const gramPrice    = document.getElementById('gramPrice');

function setSize(size) {
  if (size === '500') {
    size500.classList.add('sz-active');
    size1000.classList.remove('sz-active');
    animateFeatPrice(699, '₹1.40 per gram · Incl. taxes');
  } else {
    size1000.classList.add('sz-active');
    size500.classList.remove('sz-active');
    animateFeatPrice(1299, '₹1.29 per gram · Incl. taxes');
  }
}

/*
  animateFeatPrice — counts the displayed price up or down to the target value,
  like the B2B stat animation. Duration and easing are tuned for a satisfying feel.

  To adjust speed: change `dur` (ms) — lower = faster, higher = slower.
  To adjust easing: swap the ease function inside tick().
    - Count-up uses ease-out cubic (fast start, slows at end).
    - Count-down uses ease-in-out (gentle start, gentle end).
*/
let _featPriceRaf = null; // tracks current animation frame so we can cancel on rapid switches

function animateFeatPrice(targetValue, note) {
  const dur = 520; // ms — adjust here to change animation speed

  if (_featPriceRaf) { cancelAnimationFrame(_featPriceRaf); _featPriceRaf = null; }

  const currentText  = productPrice.textContent.replace(/[₹,]/g, '');
  const currentValue = parseInt(currentText) || 699;
  const diff         = targetValue - currentValue;

  gramPrice.textContent = note;
  if (diff === 0) return;

  const start = performance.now();

  function tick(now) {
    const elapsed  = Math.min(now - start, dur);
    const progress = elapsed / dur;

    // Ease-out for rising price, ease-in-out for falling price
    const eased = diff > 0
      ? 1 - Math.pow(1 - progress, 3)           // ease-out cubic (count up)
      : progress < 0.5                            // ease-in-out (count down)
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const current = Math.round(currentValue + diff * eased);
    productPrice.textContent = '₹' + current.toLocaleString('en-IN');

    if (progress < 1) { _featPriceRaf = requestAnimationFrame(tick); }
    else { _featPriceRaf = null; }
  }

  _featPriceRaf = requestAnimationFrame(tick);
}

if (size500 && size1000) {
  size500.addEventListener('click',  () => setSize('500'));
  size1000.addEventListener('click', () => setSize('1000'));
}


/* ========================================
   ADD TO CART (Featured Product)
======================================== */

const addToCart = document.getElementById('addToCart');

if (addToCart) {
  addToCart.addEventListener('click', () => {
    const price = parseInt((productPrice?.textContent || '').replace(/[₹,]/g, '')) || 699;
    addToCartItem('Araku Forest Honey', price, 'feat-img', addToCart);
    addToCart.textContent = '✓ Added to Ritual';
    addToCart.style.background = '#16a34a';
    setTimeout(() => {
      addToCart.textContent = 'Add to Ritual →';
      addToCart.style.background = '';
    }, 1600);
  });
}


/* (p-add handlers moved below with cart integration) */


/* ========================================
   NEWSLETTER
======================================== */

const newsletterBtn = document.getElementById('newsletterBtn');
const emailInput    = document.getElementById('emailInput');

if (newsletterBtn && emailInput) {
  newsletterBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      emailInput.style.borderColor = '#ef4444';
      emailInput.focus();

      setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
      return;
    }

    const originalText = newsletterBtn.textContent;
    newsletterBtn.textContent = '✓ Joined the Circle!';
    newsletterBtn.style.background = '#16a34a';
    emailInput.value = '';
    emailInput.style.borderColor = '';

    setTimeout(() => {
      newsletterBtn.textContent = originalText;
      newsletterBtn.style.background = '';
    }, 2400);
  });

  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') newsletterBtn.click();
  });
}


/* ========================================
   SCROLL REVEAL — INTERSECTION OBSERVER
======================================== */

const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/* ========================================
   PARALLAX — HONEY SPHERE
======================================== */

const honeySphere = document.querySelector('.honey-sphere');
const sphereGlow  = document.querySelector('.sphere-glow');

if (honeySphere) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    if (scrolled < window.innerHeight * 1.2) {
      const offset = scrolled * 0.08;
      honeySphere.style.transform = `translate(-50%, calc(-50% - ${offset}px))`;
      if (sphereGlow) {
        sphereGlow.style.transform = `translateX(-50%) translateY(${offset * 0.4}px)`;
      }
    }
  }, { passive: true });
}


/* ========================================
   SMOOTH SCROLL — ANCHOR LINKS
======================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      /*e.preventDefault();*/
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ========================================
   MARQUEE — PAUSE ON HOVER
======================================== */

const marqueeReel = document.querySelector('.marquee-reel');

if (marqueeReel) {
  marqueeReel.addEventListener('mouseenter', () => {
    marqueeReel.style.animationPlayState = 'paused';
  });
  marqueeReel.addEventListener('mouseleave', () => {
    marqueeReel.style.animationPlayState = 'running';
  });
}


/* ========================================
   CART STATE
======================================== */

let cartItems = [];
let cartCount = 0;

function getCartTotal() {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}

function updateCartBadge() {
  const dot = document.querySelector('.cart-dot');
  if (dot) {
    dot.textContent = cartCount || '';
    dot.style.display = cartCount > 0 ? 'flex' : 'none';
  }
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const totalEl   = document.getElementById('cartTotal');
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🌿</div>
        <p>Your basket is empty.</p>
        <p style="font-size:13px;color:var(--muted)">Add something from the harvest.</p>
      </div>`;
  } else {
    container.innerHTML = cartItems.map((item, i) => `
      <div class="cart-line-item">
        <div class="cli-img ${item.imgClass}"></div>
        <div>
          <p class="cli-name">${item.name}</p>
          <p class="cli-price">₹${item.price}</p>
        </div>
        <button class="cli-remove" data-index="${i}">✕</button>
      </div>`).join('');

    container.querySelectorAll('.cli-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        cartItems.splice(idx, 1);
        cartCount = Math.max(0, cartCount - 1);
        updateCartBadge();
        renderCartItems();
      });
    });
  }

  if (totalEl) totalEl.textContent = `₹${getCartTotal().toLocaleString('en-IN')}`;
}

function addToCartItem(name, price, imgClass, triggerEl) {
  cartItems.push({ name, price: parseInt(price), imgClass: imgClass || '' });
  cartCount++;
  updateCartBadge();
  renderCartItems();

  /* Celebration burst */
  const rect = triggerEl.getBoundingClientRect();
  const burst = document.createElement('div');
  burst.className = 'cart-burst';
  burst.style.left = (rect.left + rect.width / 2 - 30) + 'px';
  burst.style.top  = (rect.top  + rect.height / 2 - 30) + 'px';
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 600);
}


/* ========================================
   SEARCH OVERLAY
======================================== */

const searchOverlay = document.getElementById('searchOverlay');
const searchInput   = document.getElementById('searchInput');
const searchClose   = document.getElementById('searchClose');
const searchBackdrop = document.getElementById('searchBackdrop');
const searchResults  = document.getElementById('searchResults');
const searchBtn      = document.querySelector('.hdr-btn[aria-label="Search"]');

const ALL_PRODUCTS = [
  { name: 'Forest Honey',       sub: 'Deep & Rich · Single Origin',        price: 699,  img: 'p-forest',    cat: 'honey'     },
  { name: 'Wildflower Honey',   sub: 'Light & Floral · Multi-Bloom',       price: 649,  img: 'p-wildflower', cat: 'honey'    },
  { name: 'Acacia Honey',       sub: 'Mild & Delicate · Golden Clear',     price: 749,  img: 'p-acacia',    cat: 'honey'     },
  { name: 'Multiflora Honey',   sub: 'Balanced & Smooth · Every Season',   price: 599,  img: 'p-multiflora', cat: 'honey'   },
  { name: 'Wild Almonds',       sub: 'Raw & Unroasted · Forest Foraged',   price: 849,  img: 'p-df-1',      cat: 'dryfruits' },
  { name: 'Araku Cashews',      sub: 'Creamy & Whole · Single Estate',     price: 999,  img: 'p-df-2',      cat: 'dryfruits' },
  { name: 'Sun-Dried Raisins',  sub: 'Naturally Sweet · Sulphite-Free',    price: 549,  img: 'p-df-3',      cat: 'dryfruits' },
  { name: 'Araku Arabica',      sub: 'Single Origin · Light Roast',        price: 599,  img: 'p-cof-1',     cat: 'coffee'    },
  { name: 'Forest Dark Roast',  sub: 'Bold & Earthy · Shade Grown',        price: 649,  img: 'p-cof-2',     cat: 'coffee'    },
  { name: 'Valley Blend',       sub: 'Smooth & Balanced · Daily Ritual',   price: 499,  img: 'p-cof-3',     cat: 'coffee'    },
  { name: 'Wild Turmeric',      sub: 'High Curcumin · Forest Grown',       price: 349,  img: 'p-sp-1',      cat: 'spices'    },
  { name: 'Araku Black Pepper', sub: 'Wild Harvested · Intensely Aromatic',price: 429,  img: 'p-sp-2',      cat: 'spices'    },
  { name: 'Green Cardamom',     sub: 'Fragrant & Whole · Eastern Ghats',   price: 499,  img: 'p-sp-3',      cat: 'spices'    },
];

function openSearch() {
  searchOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput && searchInput.focus(), 100);
  renderSearchResults('');
}

function closeSearch() {
  searchOverlay.classList.remove('active');
  document.body.style.overflow = '';
  if (searchInput) searchInput.value = '';
  if (searchResults) searchResults.innerHTML = '';
}

function renderSearchResults(query) {
  if (!searchResults) return;
  const q = query.trim().toLowerCase();
  const hits = q
    ? ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q))
    : ALL_PRODUCTS.slice(0, 6);

  if (hits.length === 0) {
    searchResults.innerHTML = `<div style="padding:24px;text-align:center;color:var(--muted);font-size:14px">No results for "${query}"</div>`;
    return;
  }

  searchResults.innerHTML = hits.map(p => `
    <div class="sr-item" data-product="${p.name}" data-price="${p.price}" data-img="${p.img}">
      <div class="sr-thumb ${p.img}"></div>
      <div>
        <p class="sr-name">${p.name}</p>
        <p class="sr-sub">${p.sub}</p>
      </div>
      <span class="sr-price">₹${p.price}</span>
    </div>`).join('');

  searchResults.querySelectorAll('.sr-item').forEach(item => {
    item.addEventListener('click', () => {
      addToCartItem(item.dataset.product, item.dataset.price, item.dataset.img, item);
      closeSearch();
      openCartSidebar();
    });
  });
}

if (searchBtn) searchBtn.addEventListener('click', openSearch);
if (searchClose) searchClose.addEventListener('click', closeSearch);
if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);
if (searchInput) {
  searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
  searchInput.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
}


/* ========================================
   CART SIDEBAR
======================================== */

const cartSidebar  = document.getElementById('cartSidebar');
const cartClose    = document.getElementById('cartClose');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartBtn      = document.querySelector('.cart-hdr-btn');

function openCartSidebar() {
  if (!cartSidebar) return;
  cartSidebar.classList.add('active');
  /* iOS scroll lock: position:fixed prevents momentum scroll leaking through
     on Safari — same pattern used in checkout. Saves scrollY so close restores it. */
  var _sy = window.scrollY;
  document.body.style.overflow  = 'hidden';
  document.body.style.position  = 'fixed';
  document.body.style.top       = '-' + _sy + 'px';
  document.body.style.width     = '100%';
  document.body.dataset.cartSy  = _sy;
  renderCartItems();
}

function closeCartSidebar() {
  if (!cartSidebar) return;
  cartSidebar.classList.remove('active');
  /* Restore exact scroll position after unlocking body */
  var sy = parseInt(document.body.dataset.cartSy || '0', 10);
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top      = '';
  document.body.style.width    = '';
  window.scrollTo(0, sy);
}

if (cartBtn)      cartBtn.addEventListener('click', openCartSidebar);
if (cartClose)    cartClose.addEventListener('click', closeCartSidebar);
if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartSidebar);

const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (typeof openCheckout === 'function' && cartItems.length) {
      closeCartSidebar();
      setTimeout(() => openCheckout(cartItems), 200);
    }
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeCartSidebar(); closeSearch(); }
});

updateCartBadge();


/* ========================================
   PRODUCT CARD — ADD & BUY NOW
======================================== */

document.querySelectorAll('.p-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const name  = btn.dataset.product || 'Item';
    const price = btn.dataset.price   || 0;
    const card  = btn.closest('.p-card');
    const imgEl = card ? card.querySelector('.p-img') : null;
    const imgClass = imgEl ? [...imgEl.classList].find(c => c !== 'p-img') : '';

    addToCartItem(name, price, imgClass, btn);

    const orig = btn.textContent;
    btn.textContent = '✓ Added';
    btn.style.background = 'var(--forest)';
    btn.style.color = 'white';
    btn.style.borderColor = 'var(--forest)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 1400);
  });
});

document.querySelectorAll('.p-buy').forEach(btn => {
  btn.addEventListener('click', () => {
    const name     = btn.dataset.product || 'Item';
    const price    = btn.dataset.price   || 0;
    const card     = btn.closest('.p-card');
    const imgEl    = card ? card.querySelector('.p-img') : null;
    const imgClass = imgEl ? [...imgEl.classList].find(c => c !== 'p-img') : '';

    if (typeof openCheckout === 'function') {
      openCheckout([{ name, price, imgClass }]);
    } else {
      addToCartItem(name, price, imgClass, btn);
      openCartSidebar();
    }
  });
});


/* ========================================
   CATEGORY FILTER
======================================== */

const cfTabs   = document.querySelectorAll('.cf-tab');
const pCards   = document.querySelectorAll('.p-card[data-category]');
const harvestLabel = document.getElementById('harvestLabel');
const viewAllLink  = document.getElementById('viewAllLink');

const catLabels = {
  honey:     '( honey )',
  dryfruits: '( dry fruits )',
  coffee:    '( coffee )',
  spices:    '( forest spices )',
};

cfTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    cfTabs.forEach(t => t.classList.remove('cf-active'));
    tab.classList.add('cf-active');

    const cat = tab.dataset.cat;
    if (harvestLabel) harvestLabel.textContent = catLabels[cat] || '( harvest )';

    pCards.forEach(card => {
      card.classList.toggle('p-hidden', card.dataset.category !== cat);
    });

    // Snap back to start when switching categories
    if (productCarousel) productCarousel.scrollTo({ left: 0, behavior: 'smooth' });
    updateCarouselProgress();
  });
});

// "View All" — navigates to the full shop page

/* ── Carousel: progress bar + drag-to-scroll ──────────────────
   Progress fill reflects how far the user has scrolled.
   Mouse drag works like a real carousel on desktop.
─────────────────────────────────────────────────────────────── */
const productCarousel = document.getElementById('productCarousel');
const carouselFill    = document.getElementById('carouselFill');

function updateCarouselProgress() {
  if (!productCarousel || !carouselFill) return;
  const max = productCarousel.scrollWidth - productCarousel.clientWidth;
  // If everything fits, fill 100%; otherwise reflect scroll position
  const pct = max > 0 ? (productCarousel.scrollLeft / max) * 100 : 100;
  carouselFill.style.width = pct + '%';
}

if (productCarousel) {
  // Update fill on scroll
  productCarousel.addEventListener('scroll', updateCarouselProgress, { passive: true });
  // Update fill on window resize (viewport change affects visible area)
  window.addEventListener('resize', updateCarouselProgress);
  // Set initial fill
  updateCarouselProgress();

  // Drag-to-scroll on desktop
  let isDragging = false, dragStartX = 0, scrollAtDragStart = 0;

  productCarousel.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.pageX - productCarousel.offsetLeft;
    scrollAtDragStart = productCarousel.scrollLeft;
    productCarousel.classList.add('dragging');
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    productCarousel.classList.remove('dragging');
  });

  productCarousel.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - productCarousel.offsetLeft;
    productCarousel.scrollLeft = scrollAtDragStart - (x - dragStartX);
  });

  productCarousel.addEventListener('mouseleave', () => {
    isDragging = false;
    productCarousel.classList.remove('dragging');
  });
}


/* ========================================
   B2B STATS — COUNT-UP ANIMATION
======================================== */

const statNums = document.querySelectorAll('.b-num[data-count]');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur    = 1800;
    const start  = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));


/* ========================================
   PRODUCT CARD — SIZE SELECTOR (500g / 1kg)
   Dynamically injects size toggle into any card with data-price-500 + data-price-1kg.
   To add a new size tier: add data-price-XXX to the card and extend the button list below.
======================================== */

document.querySelectorAll('.p-card[data-price-500]').forEach(card => {
  if (card.querySelector('.p-sizes')) return; // already present (hardcoded in HTML)
  const p500 = card.dataset['price-500'];
  const p1kg = card.dataset['price-1kg'];
  const pInfo   = card.querySelector('.p-info');
  const pBottom = card.querySelector('.p-bottom');
  if (!pInfo || !pBottom || !p500 || !p1kg) return;

  const sizes = document.createElement('div');
  sizes.className = 'p-sizes';
  sizes.innerHTML = `
    <button class="p-sz p-sz-active" data-size="500">500g</button>
    <button class="p-sz" data-size="1kg">1 kg</button>`;
  pInfo.insertBefore(sizes, pBottom);

  sizes.querySelectorAll('.p-sz').forEach(btn => {
    btn.addEventListener('click', () => {
      sizes.querySelectorAll('.p-sz').forEach(b => b.classList.remove('p-sz-active'));
      btn.classList.add('p-sz-active');

      const price = btn.dataset.size === '500' ? p500 : p1kg;
      const priceEl = card.querySelector('.p-price');
      const addBtn  = card.querySelector('.p-add');
      const buyBtn  = card.querySelector('.p-buy');
      if (priceEl) priceEl.textContent = '₹' + price;
      if (addBtn)  addBtn.dataset.price = price;
      if (buyBtn)  buyBtn.dataset.price = price;
    });
  });
});


/* ========================================
   SUBSCRIPTION MODAL — MULTI-STEP FLOW
======================================== */

const subModal         = document.getElementById('subModal');
const subModalBackdrop = document.getElementById('subModalBackdrop');
const subModalClose    = document.getElementById('subModalClose');
const subNext1         = document.getElementById('subNext1');
const subNext2         = document.getElementById('subNext2');
const subSubscribeBtn  = document.getElementById('subSubscribeBtn');
const subDoneBtn       = document.getElementById('subDoneBtn');
const subQuickBtn      = document.getElementById('subQuickBtn');

function openSubModal() {
  if (!subModal) return;
  subModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  goToSubStep(1);
}

function closeSubModal() {
  if (!subModal) return;
  subModal.classList.remove('active');
  document.body.style.overflow = '';
}

function goToSubStep(step) {
  document.querySelectorAll('.sub-step').forEach(s => {
    s.classList.toggle('sub-step-hidden', parseInt(s.id.replace('subStep', '')) !== step);
  });
  document.querySelectorAll('.sub-step-dot').forEach(dot => {
    const n = parseInt(dot.dataset.step);
    dot.classList.toggle('sub-dot-active', n === step);
    dot.classList.toggle('sub-dot-done',   n < step);
  });
}

// Open modal from all subscribe buttons + "Start from Scratch"
document.querySelectorAll('.sub-open-modal').forEach(btn => {
  btn.addEventListener('click', openSubModal);
});

// Rhythm option selection
document.querySelectorAll('.sub-rhythm-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.sub-rhythm-opt').forEach(o => o.classList.remove('sub-rhythm-active'));
    opt.classList.add('sub-rhythm-active');
  });
});

// Back buttons
document.querySelectorAll('.sub-modal-back').forEach(btn => {
  btn.addEventListener('click', () => goToSubStep(parseInt(btn.dataset.back)));
});

// Step navigation
if (subNext1) subNext1.addEventListener('click', () => goToSubStep(2));
if (subNext2) subNext2.addEventListener('click', () => goToSubStep(3));

// Quick path — skip to email (step 3), pre-selects all categories
if (subQuickBtn) {
  subQuickBtn.addEventListener('click', () => {
    document.querySelectorAll('.sub-harvest-chip input').forEach(cb => { cb.checked = true; });
    goToSubStep(3);
  });
}

// Subscribe CTA — validate email then show success
if (subSubscribeBtn) {
  subSubscribeBtn.addEventListener('click', () => {
    const emailEl = document.getElementById('subEmail');
    const email   = emailEl ? emailEl.value.trim() : '';
    if (!email || !email.includes('@') || !email.includes('.')) {
      if (emailEl) {
        emailEl.classList.add('input-error');
        emailEl.focus();
        setTimeout(() => emailEl.classList.remove('input-error'), 2000);
      }
      return;
    }
    goToSubStep(4);
  });
}

if (subDoneBtn)       subDoneBtn.addEventListener('click',       closeSubModal);
if (subModalClose)    subModalClose.addEventListener('click',    closeSubModal);
if (subModalBackdrop) subModalBackdrop.addEventListener('click', closeSubModal);

// ESC closes sub modal too
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && subModal?.classList.contains('active')) closeSubModal();
});


/* ========================================
   PUREHARVEST WORDMARK — SCROLL-DRIVEN STAGGER
   Letters reveal left-to-right as you scroll
   into the footer. Each letter has its own
   scroll threshold — stop halfway and half
   the letters are visible.

   TWO THINGS TO TUNE:
   1. SCROLL_WINDOW (below) — fraction of the viewport
      height you scroll through before all letters appear.
      Because the wordmark is at the very bottom of the
      page, keep this ≤ 0.20 or letters won't fully reveal
      on mobile devices.
      0.10 = instant pop-in, 0.15 = default, 0.20 = slowest safe
   2. CSS transition duration in style.css
      (search "letter animation speed")
======================================== */
(function () {
  const SCROLL_WINDOW = 0.15; // ← tune scroll distance (0.10 instant → 0.20 slowest safe)

  const wordmark = document.querySelector('.footer-wordmark');
  if (!wordmark) return;

  // Wrap each character in a span (no inline delays — scroll drives timing)
  wordmark.innerHTML = wordmark.textContent.split('').map(char =>
    `<span class="wm-char">${char}</span>`
  ).join('');

  const charEls = [...wordmark.querySelectorAll('.wm-char')];
  const total   = charEls.length;

  function update() {
    const rect     = wordmark.getBoundingClientRect();
    const vh       = window.innerHeight;
    // progress: 0 when wordmark hits bottom of viewport → 1 after scrolling SCROLL_WINDOW×vh
    const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * SCROLL_WINDOW)));

    charEls.forEach((el, i) => {
      el.classList.toggle('wm-in', progress >= i / (total - 1));
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // run on load in case already in view
})();


/* ========================================
   ARCANE LABS — CHARACTER SCRAMBLE
   Hover "Arcane Labs" in the footer to
   trigger a shuffle that settles back
   to the original text.
   chars: pool of random characters used
   speed: ms per frame (lower = faster)
======================================== */
(function () {
  const el = document.getElementById('arcaneText');
  if (!el) return;

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  const SPEED = 38; // ms per frame — lower = faster scramble
  const original = 'Arcane Labs';

  let rafId = null;
  let frame = 0;
  let queue = [];

  function rand(str) { return str[Math.floor(Math.random() * str.length)]; }

  function run() {
    cancelAnimationFrame(rafId);
    frame = 0;
    queue = original.split('').map((char, i) => ({
      final: char,
      // spaces resolve instantly; other chars get a staggered end frame
      end: char === ' ' ? 0 : 6 + i * 3 + Math.floor(Math.random() * 8)
    }));
    tick();
  }

  function tick() {
    let html = '';
    let done = true;

    queue.forEach(({ final, end }) => {
      if (final === ' ') { html += ' '; return; }
      if (frame >= end) {
        html += final;
      } else {
        done = false;
        html += `<span class="scramble-char">${rand(CHARS)}</span>`;
      }
    });

    el.innerHTML = html;
    frame++;
    if (!done) rafId = setTimeout(() => { rafId = requestAnimationFrame(tick); }, SPEED);
  }

  el.addEventListener('mouseenter', run);
})();


/* Card click → product page (desktop + mobile) */
document.querySelectorAll('.p-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('.p-add, .p-buy, .p-sz, .p-arrow')) return;
    window.location.href = 'product-honey.html';
  });
});


/* ========================================
   PRODUCT CARD — TRUST RATING INJECTION
   Injects star rating + review count below subtitle on every card.
======================================== */
document.querySelectorAll('.p-card').forEach(card => {
  if (card.querySelector('.p-rating')) return;
  const pSub = card.querySelector('.p-sub');
  if (!pSub) return;
  const div = document.createElement('div');
  div.className = 'p-rating';
  div.innerHTML = `<span class="p-stars">★★★★★</span><span class="p-rcount">4.8 &nbsp;·&nbsp; 200+ reviews</span>`;
  pSub.after(div);
});


/* ========================================
   COPY PROTECTION
   Disables text selection, copy, cut, and right-click across all pages.
======================================== */
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('cut', e => e.preventDefault());
document.addEventListener('contextmenu', e => e.preventDefault());


/* ========================================
   COOKIE CONSENT BANNER
   Shows on first visit; dismissed state stored in localStorage.
   Accepting sets ph_cookies = {analytics:true, marketing:true}.
   "Manage" links to cookie.html for granular preferences.
======================================== */
(function () {
  if (localStorage.getItem('ph_cookies')) return; /* already decided */

  /* Build banner */
  var banner = document.createElement('div');
  banner.id        = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.innerHTML =
    '<div class="cookie-inner">' +
      '<p class="cookie-text">We use cookies to personalise your experience and analyse traffic. ' +
        '<a href="cookie.html">Cookie Policy</a>' +
      '</p>' +
      '<div class="cookie-btns">' +
        '<a href="cookie.html" class="cookie-manage">Manage preferences</a>' +
        '<button class="cookie-accept" id="cookieAccept">Accept All</button>' +
      '</div>' +
    '</div>';

  /* Show after a short delay so it doesn't flash on landing */
  setTimeout(function () {
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add('cookie-banner--visible'); });
  }, 800);

  /* Accept — save preference and slide out */
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'cookieAccept') {
      localStorage.setItem('ph_cookies', JSON.stringify({ analytics: true, marketing: true }));
      banner.classList.remove('cookie-banner--visible');
      setTimeout(function () { banner.remove(); }, 400);
    }
  });
})();


/* ========================================
   SESSION — shared across all pages
   Reads ph_session from localStorage so the ritual drawer
   can reflect sign-in state on every page without a backend.
   Swap phGetSession internals for supabase.auth.getSession()
   when the Supabase session is ready.
======================================== */
function phGetSession() {
  try { return JSON.parse(localStorage.getItem('ph_session') || 'null'); }
  catch(e) { return null; }
}

/* Update the "My Account" ritual drawer link based on session state.
   Signed out → "Sign In / Access orders & rewards"
   Signed in  → user's name + Roots balance */
function phUpdateDrawer() {
  /* First nav link in the drawer is always the account / sign-in entry */
  var link = document.querySelector('.drawer-nav .d-link:first-child');
  if (!link) return;

  var nameEl = link.querySelector('.d-link-name');
  var subEl  = link.querySelector('.d-link-sub');
  var user   = phGetSession();

  if (user) {
    if (nameEl) nameEl.textContent = user.name || 'My Account';
    if (subEl)  subEl.textContent  = (user.roots || 0) + ' Roots · View account';
  } else {
    if (nameEl) nameEl.textContent = 'Sign In';
    if (subEl)  subEl.textContent  = 'Access orders & rewards';
  }
}

phUpdateDrawer();
