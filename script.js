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
    animatePrice('₹699', '₹1.40 per gram · Incl. taxes');
  } else {
    size1000.classList.add('sz-active');
    size500.classList.remove('sz-active');
    animatePrice('₹1,299', '₹1.29 per gram · Incl. taxes');
  }
}

function animatePrice(price, note) {
  productPrice.style.opacity = '0';
  productPrice.style.transform = 'translateY(6px)';

  setTimeout(() => {
    productPrice.textContent = price;
    gramPrice.textContent = note;
    productPrice.style.opacity = '1';
    productPrice.style.transform = 'translateY(0)';
  }, 180);
}

if (size500 && size1000) {
  size500.addEventListener('click', () => setSize('500'));
  size1000.addEventListener('click', () => setSize('1000'));
}

/* Set up transition on price element */
if (productPrice) {
  productPrice.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
}


/* ========================================
   ADD TO CART (Featured Product)
======================================== */

const addToCart = document.getElementById('addToCart');

if (addToCart) {
  addToCart.addEventListener('click', () => {
    addToCart.textContent = '✓ Added to Ritual';
    addToCart.style.background = '#16a34a';

    setTimeout(() => {
      addToCart.textContent = 'Add to Ritual →';
      addToCart.style.background = '';
    }, 1600);
  });
}


/* ========================================
   PRODUCT CARD ADD BUTTONS
======================================== */

document.querySelectorAll('.p-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent;
    const product  = btn.dataset.product || 'item';

    btn.textContent = '✓ Added';
    btn.style.background = 'var(--forest)';
    btn.style.color = 'white';
    btn.style.borderColor = 'var(--forest)';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 1400);
  });
});


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



