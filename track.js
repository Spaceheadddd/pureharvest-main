/* ============================================================
   track.js — PureHarvest order tracking page

   Flow:
   1. On load: check URL for ?cn= param → auto-trigger lookup
   2. Manual input: validate format → call API → render result
   3. All tracking data comes from /api/track (Cloudflare Pages
      Function that proxies India Post's internal tracking API)

   India Post consignment number format (registered articles):
   2 letters + 9 digits + IN = 13 chars total (e.g. RL123456789IN)
   ============================================================ */


/* ── CONFIG ──────────────────────────────────────────────────
   /api/track is our Cloudflare Pages Function (same domain,
   no CORS issues). It proxies India Post's tracking endpoint.
──────────────────────────────────────────────────────────── */
var TRACK_API = '/api/track';


/* ── STATUS CLASSIFIER ───────────────────────────────────────
   Maps India Post's raw status strings to display states.
   "Delivered" → green   "In Transit" / en-route → amber
   Everything else (Booked, Dispatched) → neutral
──────────────────────────────────────────────────────────── */
function trkClassifyStatus(raw) {
  if (!raw) return { label: 'Status Unknown', cls: 'trk-status--neutral' };
  var s = raw.toUpperCase();

  if (s.indexOf('DELIVER') !== -1) {
    return { label: 'Delivered', cls: 'trk-status--delivered' };
  }
  if (
    s.indexOf('TRANSIT') !== -1 ||
    s.indexOf('IN BAG')  !== -1 ||
    s.indexOf('DISPATCH') !== -1 && s.indexOf('BOOK') === -1
  ) {
    return { label: 'In Transit', cls: 'trk-status--transit' };
  }
  if (s.indexOf('BOOK') !== -1 || s.indexOf('ACCEPT') !== -1) {
    return { label: 'Booked', cls: 'trk-status--booked' };
  }
  if (s.indexOf('OUT FOR') !== -1) {
    return { label: 'Out for Delivery', cls: 'trk-status--transit' };
  }
  return { label: raw, cls: 'trk-status--neutral' };
}


/* ── DATE FORMATTER ──────────────────────────────────────────
   India Post returns dates as DD-MM-YYYY or DD/MM/YYYY.
   Converts to human-readable: "14 June 2026"
──────────────────────────────────────────────────────────── */
function trkFormatDate(raw) {
  if (!raw) return '';
  /* Normalise separator */
  var parts = raw.replace(/\//g, '-').split('-');
  if (parts.length !== 3) return raw;
  var day   = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1; /* JS months are 0-indexed */
  var year  = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return raw;
  return new Date(year, month, day).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}


/* ── PARSE INDIA POST RESPONSE ───────────────────────────────
   India Post returns:
   { ShipmentData: [{ Shipment: { ArticleNumber, CurrentStatus,
     SenderName, ReceiverName, ScanDetails: [...] } }] }

   ScanDetails items: { ScanDate, ScanTime, Scan, ScanLocation }

   Returns null if the structure is unexpected or article
   was not found (India Post returns empty ShipmentData).
──────────────────────────────────────────────────────────── */
function trkParseResponse(raw) {
  /* Guard: unexpected shape */
  if (!raw || !raw.ShipmentData || !raw.ShipmentData.length) return null;

  var entry = raw.ShipmentData[0];
  if (!entry || !entry.Shipment) return null;

  var s = entry.Shipment;

  /* Parse scan events — most recent first */
  var events = [];
  var scans = s.ScanDetails || s.Events || [];
  for (var i = 0; i < scans.length; i++) {
    var sc = scans[i];
    events.push({
      date:        trkFormatDate(sc.ScanDate || sc.EventDate || ''),
      time:        sc.ScanTime  || sc.EventTime || '',
      description: sc.Scan      || sc.EventDescription || sc.Description || '',
      location:    sc.ScanLocation || sc.EventLocation || '',
    });
  }
  /* India Post returns oldest first — reverse for timeline (newest at top) */
  events.reverse();

  return {
    articleNumber:   s.ArticleNumber   || '',
    currentStatus:   s.CurrentStatus   || (events.length ? events[0].description : ''),
    senderName:      s.SenderName      || '',
    receiverName:    s.ReceiverName    || '',
    bookingDate:     trkFormatDate(s.PickUpDate    || s.BookingDate || ''),
    deliveryDate:    trkFormatDate(s.DeliveryDate  || ''),
    expectedDelivery: trkFormatDate(s.ExpectedDelivery || ''),
    events:          events,
  };
}


/* ── RENDER RESULT ───────────────────────────────────────────
   Builds the tracking result HTML and injects it into
   #trkResult. Uses the array-of-strings pattern for
   easy line-by-line editing.
──────────────────────────────────────────────────────────── */
function trkRenderResult(data, cn) {
  var status = trkClassifyStatus(data.currentStatus);

  /* Build timeline rows */
  var timelineRows = '';
  if (data.events.length === 0) {
    timelineRows = '<p class="trk-no-events">No scan events recorded yet. Check back shortly after dispatch.</p>';
  } else {
    for (var i = 0; i < data.events.length; i++) {
      var ev  = data.events[i];
      var isCurrent = (i === 0); /* First item is the most recent */
      timelineRows += [
        '<div class="trk-event' + (isCurrent ? ' trk-event--current' : '') + '">',
        '  <div class="trk-event-dot"></div>',
        '  <div class="trk-event-body">',
        '    <p class="trk-event-desc">' + (ev.description || '—') + '</p>',
        '    <p class="trk-event-meta">',
        '      ' + (ev.location ? '<span class="trk-event-loc">' + ev.location + '</span>' : ''),
        '      ' + (ev.date     ? '<span class="trk-event-date">' + ev.date + (ev.time ? ' · ' + ev.time.substring(0,5) : '') + '</span>' : ''),
        '    </p>',
        '  </div>',
        '</div>',
      ].join('\n');
    }
  }

  /* Meta row — only show fields India Post actually returned */
  var metaRows = '';
  if (data.bookingDate)      metaRows += '<div class="trk-meta-row"><span>Booked</span><span>' + data.bookingDate + '</span></div>';
  if (data.expectedDelivery) metaRows += '<div class="trk-meta-row"><span>Expected delivery</span><span>' + data.expectedDelivery + '</span></div>';
  if (data.deliveryDate)     metaRows += '<div class="trk-meta-row"><span>Delivered on</span><span>' + data.deliveryDate + '</span></div>';
  if (data.senderName)       metaRows += '<div class="trk-meta-row"><span>Sender</span><span>' + data.senderName + '</span></div>';
  if (data.receiverName)     metaRows += '<div class="trk-meta-row"><span>Recipient</span><span>' + data.receiverName + '</span></div>';

  var html = [

    /* Status banner */
    '<div class="trk-result-head">',
    '  <div class="trk-cn-row">',
    '    <span class="trk-cn-label">Consignment No.</span>',
    '    <span class="trk-cn-val">' + cn.toUpperCase() + '</span>',
    '  </div>',
    '  <div class="trk-status ' + status.cls + '">',
    '    <span class="trk-status-dot"></span>',
    '    <span class="trk-status-label">' + status.label + '</span>',
    '  </div>',
    '</div>',

    /* Meta info (booking date, sender, etc.) */
    metaRows ? '<div class="trk-meta">' + metaRows + '</div>' : '',

    /* Scan timeline */
    '<div class="trk-timeline">',
    '  <p class="trk-timeline-label">Tracking Timeline</p>',
    '  <div class="trk-events">',
    timelineRows,
    '  </div>',
    '</div>',

    /* Track another button */
    '<button class="trk-another-btn" id="trkAnotherBtn">Track another shipment</button>',

  ].join('\n');

  var resultEl = document.getElementById('trkResult');
  resultEl.innerHTML    = html;
  resultEl.style.display = 'block';

  /* "Track another" resets the page to the search card */
  document.getElementById('trkAnotherBtn').addEventListener('click', trkReset);
}


/* ── RENDER ERROR ─────────────────────────────────────────── */
function trkRenderError(msg) {
  var resultEl = document.getElementById('trkResult');
  resultEl.innerHTML = [
    '<div class="trk-error">',
    '  <span class="trk-error-icon">📭</span>',
    '  <p class="trk-error-title">Couldn\'t fetch tracking</p>',
    '  <p class="trk-error-msg">' + msg + '</p>',
    '  <button class="trk-another-btn" id="trkAnotherBtn">Try again</button>',
    '</div>',
  ].join('\n');
  resultEl.style.display = 'block';

  document.getElementById('trkAnotherBtn').addEventListener('click', trkReset);
}


/* ── RESET TO SEARCH STATE ───────────────────────────────── */
function trkReset() {
  document.getElementById('trkResult').style.display  = 'none';
  document.getElementById('trkResult').innerHTML      = '';
  document.getElementById('trkLoading').style.display = 'none';
  document.getElementById('trkSearchCard').style.display = 'block';
  document.getElementById('trkInput').value           = '';
  document.getElementById('trkInputHint').textContent  = '';
  /* Clear cn from URL without page reload */
  history.replaceState(null, '', window.location.pathname);
}


/* ── DEMO ANIMATION ──────────────────────────────────────────
   Renders the full result first (all events), then hides them
   and reveals each one from oldest → newest with a 1.1s delay,
   updating the status badge at each step so you can watch the
   full delivery arc play out visually.
   Only triggered by DEMO_CN — real lookups use trkRenderResult.
──────────────────────────────────────────────────────────── */
function trkRunDemo(data, cn) {
  /* Render everything normally first — populates the DOM */
  trkRenderResult(data, cn);

  /* Grab event elements — DOM order is newest (index 0) → oldest (last) */
  var eventEls = Array.prototype.slice.call(document.querySelectorAll('.trk-event'));
  var total    = eventEls.length;
  var statusEl    = document.querySelector('.trk-status');
  var statusLabel = document.querySelector('.trk-status-label');

  /* Status label + badge class for each step, oldest → newest */
  var statusSteps = [
    { label: 'Booked',            cls: 'trk-status--booked'    },
    { label: 'Booked',            cls: 'trk-status--booked'    },
    { label: 'In Transit',        cls: 'trk-status--transit'   },
    { label: 'In Transit',        cls: 'trk-status--transit'   },
    { label: 'Out for Delivery',  cls: 'trk-status--transit'   },
    { label: 'Delivered',         cls: 'trk-status--delivered' },
  ];

  /* Hide all events and reset badge to initial Booked state */
  for (var i = 0; i < total; i++) {
    eventEls[i].style.opacity    = '0';
    eventEls[i].style.transform  = 'translateY(12px)';
    eventEls[i].style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    eventEls[i].classList.remove('trk-event--current');
  }
  if (statusEl && statusLabel) {
    statusEl.className      = 'trk-status trk-status--booked';
    statusLabel.textContent = 'Booked';
  }

  /* Reveal events one by one: oldest (bottom of list) first */
  for (var step = 0; step < total; step++) {
    (function (s) {
      setTimeout(function () {
        /* eventEls[0] = newest, eventEls[total-1] = oldest */
        var domIdx = total - 1 - s;

        /* Reveal and highlight this event */
        eventEls[domIdx].style.opacity   = '1';
        eventEls[domIdx].style.transform = 'translateY(0)';
        eventEls[domIdx].classList.add('trk-event--current');

        /* Remove highlight from the previous step */
        if (domIdx + 1 < total) {
          eventEls[domIdx + 1].classList.remove('trk-event--current');
        }

        /* Update status badge */
        if (statusEl && statusLabel && statusSteps[s]) {
          statusEl.className      = 'trk-status ' + statusSteps[s].cls;
          statusLabel.textContent = statusSteps[s].label;
        }
      }, s * 3100); /* 3.1 s between each step */
    })(step);
  }
}


/* ── DEMO MODE ───────────────────────────────────────────────
   When cn = PHDEMO1234IN (14 chars, special) the page skips
   the real API and returns mock India Post data so you can
   preview the full tracking UI without a live shipment.
   URL: /track.html?cn=PHDEMO1234IN
──────────────────────────────────────────────────────────── */
var DEMO_CN = 'PHDEMO1234IN';

var DEMO_RESPONSE = {
  ShipmentData: [{
    Shipment: {
      ArticleNumber:  'PHDEMO1234IN',
      CurrentStatus:  'Item Delivered',
      PickUpDate:     '13-06-2026',
      DeliveryDate:   '16-06-2026',
      SenderName:     'PUREHARVEST ORGANICS',
      ReceiverName:   'JAYESH SUDHAKAR',
      ScanDetails: [
        { ScanDate: '13-06-2026', ScanTime: '09:14:00', Scan: 'Item Booked',                     ScanLocation: 'ARAKU POST OFFICE'          },
        { ScanDate: '13-06-2026', ScanTime: '18:52:00', Scan: 'Item Bagged for Dispatch',         ScanLocation: 'ARAKU SORTING OFFICE'       },
        { ScanDate: '14-06-2026', ScanTime: '05:38:00', Scan: 'Item in Transit',                  ScanLocation: 'VISAKHAPATNAM HUB'          },
        { ScanDate: '14-06-2026', ScanTime: '20:11:00', Scan: 'Item Arrived at Destination Office', ScanLocation: 'HYDERABAD GPO'            },
        { ScanDate: '16-06-2026', ScanTime: '07:55:00', Scan: 'Out for Delivery',                 ScanLocation: 'BANJARA HILLS POST OFFICE'  },
        { ScanDate: '16-06-2026', ScanTime: '13:42:00', Scan: 'Item Delivered',                   ScanLocation: 'BANJARA HILLS POST OFFICE'  },
      ]
    }
  }],
  CallAck: { Total: 1, Success: 1, Error: 0 }
};


/* ── MAIN LOOKUP ─────────────────────────────────────────── */
function trkLookup(cn) {
  cn = cn.trim().toUpperCase();

  /* Demo mode — bypass API and format check, run animated journey */
  if (cn === DEMO_CN) {
    document.getElementById('trkSearchCard').style.display = 'none';
    document.getElementById('trkLoading').style.display    = 'block';
    history.replaceState(null, '', '?cn=' + cn);
    setTimeout(function () {
      document.getElementById('trkLoading').style.display = 'none';
      trkRunDemo(trkParseResponse(DEMO_RESPONSE), cn);
    }, 700);
    return;
  }

  /* Validate format before hitting the API */
  if (!/^[A-Z]{2}\d{9}IN$/.test(cn)) {
    document.getElementById('trkInputHint').textContent =
      'Please enter a valid 13-character consignment number (e.g. RL123456789IN).';
    return;
  }

  /* Hide search card, show spinner */
  document.getElementById('trkSearchCard').style.display = 'none';
  document.getElementById('trkLoading').style.display    = 'block';
  document.getElementById('trkResult').style.display     = 'none';

  /* Update URL so the user can share/bookmark this tracking link */
  history.replaceState(null, '', '?cn=' + cn);

  /* Call our Cloudflare Pages Function proxy */
  fetch(TRACK_API + '?cn=' + cn)
    .then(function (res) { return res.json(); })
    .then(function (raw) {
      document.getElementById('trkLoading').style.display = 'none';

      /* Proxy returned an error message */
      if (raw.error) {
        trkRenderError(raw.error);
        return;
      }

      /* Parse the India Post response structure */
      var data = trkParseResponse(raw);

      if (!data) {
        /* India Post returned nothing — article not found or not yet booked */
        trkRenderError(
          'No tracking information found for <strong>' + cn + '</strong>. ' +
          'This can happen if the article was booked recently (allow 2–4 hours) ' +
          'or the consignment number is incorrect.'
        );
        return;
      }

      trkRenderResult(data, cn);
    })
    .catch(function () {
      document.getElementById('trkLoading').style.display = 'none';
      trkRenderError('Network error — please check your connection and try again.');
    });
}


/* ── INIT ────────────────────────────────────────────────────
   On page load: if URL has ?cn= auto-trigger lookup.
   Otherwise wire up the input form.
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  /* Auto-lookup from URL param (e.g. from dispatch notification link) */
  var urlParams = new URLSearchParams(window.location.search);
  var cnParam   = (urlParams.get('cn') || '').trim().toUpperCase();
  if (cnParam) {
    document.getElementById('trkInput').value = cnParam;
    trkLookup(cnParam);
    return;
  }

  /* Manual input: Track button */
  document.getElementById('trkBtn').addEventListener('click', function () {
    trkLookup(document.getElementById('trkInput').value);
  });

  /* Manual input: Enter key */
  document.getElementById('trkInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') trkLookup(this.value);
  });

  /* Auto-uppercase as user types */
  document.getElementById('trkInput').addEventListener('input', function () {
    var pos = this.selectionStart;
    this.value = this.value.toUpperCase();
    this.setSelectionRange(pos, pos);
    /* Clear hint on edit */
    document.getElementById('trkInputHint').textContent = '';
  });
});
