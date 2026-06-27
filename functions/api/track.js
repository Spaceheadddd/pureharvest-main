/* ============================================================
   functions/api/track.js — Cloudflare Pages Function

   Acts as a CORS proxy for India Post's internal tracking API.
   Deployed automatically with the site at: /api/track

   Usage:  GET /api/track?cn=RL123456789IN
   Returns: raw JSON from India Post, with CORS headers added.

   If India Post's endpoint URL changes, update INDIA_POST_API
   below — everything else stays the same.
   To find the live endpoint: open indiapost.gov.in/VAS/Pages/
   trackconsignment.aspx → DevTools → Network → track any
   article → copy the POST request URL and body format.
   ============================================================ */

/* India Post internal tracking endpoint (reverse-engineered from their tracking page) */
var INDIA_POST_API = 'https://www.indiapost.gov.in/VAS/api/Consignment/GetConsignmentDetails';

/* Restrict CORS to your own domain in production.
   Change to 'https://pureharvest.in' once the site is live on the custom domain. */
var ALLOWED_ORIGIN = '*';

export async function onRequest({ request }) {

  /* ── CORS preflight ─────────────────────────────────────── */
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: buildCorsHeaders()
    });
  }

  /* ── Only accept GET ─────────────────────────────────────── */
  if (request.method !== 'GET') {
    return jsonError('Method not allowed', 405);
  }

  /* ── Read and validate consignment number ────────────────── */
  var url = new URL(request.url);
  var cn  = (url.searchParams.get('cn') || '').trim().toUpperCase();

  /* Standard registered articles: 2 letters + 9 digits + IN (13 chars total) */
  if (!cn || !/^[A-Z]{2}\d{9}IN$/.test(cn)) {
    return jsonError('Invalid consignment number. Format: RL123456789IN', 400);
  }

  /* ── Call India Post tracking API ────────────────────────── */
  try {
    var ipResponse = await fetch(INDIA_POST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer':      'https://www.indiapost.gov.in/VAS/Pages/trackconsignment.aspx',
        'Accept':       'application/json, text/plain, */*',
        'User-Agent':   'Mozilla/5.0 (compatible; PureHarvest-Track/1.0)',
        'Origin':       'https://www.indiapost.gov.in',
      },
      body: JSON.stringify({ ConsignmentNumber: cn })
    });

    /* If India Post's server is down or returns an error code */
    if (!ipResponse.ok) {
      return jsonError('India Post tracking service is currently unavailable. Try again shortly.', 502);
    }

    var data = await ipResponse.json();

    /* Return with CORS headers + 5-minute cache (tracking updates aren't real-time) */
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: Object.assign({
        'Content-Type':  'application/json',
        'Cache-Control': 'public, max-age=300',
      }, buildCorsHeaders())
    });

  } catch (err) {
    /* Network failure reaching India Post */
    return jsonError('Could not reach India Post servers. Please try again.', 500);
  }
}

/* ── helpers ──────────────────────────────────────────────── */

function buildCorsHeaders() {
  return {
    'Access-Control-Allow-Origin':  ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary':                         'Origin',
  };
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status: status,
    headers: Object.assign({ 'Content-Type': 'application/json' }, buildCorsHeaders())
  });
}
