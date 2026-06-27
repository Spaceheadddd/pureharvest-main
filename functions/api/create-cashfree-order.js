/* ============================================================
   functions/api/create-cashfree-order.js — Cloudflare Pages Function

   Server-side order creation for Cashfree — required because Cashfree
   (unlike Razorpay's old client-only flow) needs the secret key to mint
   a payment_session_id before the client SDK can open checkout. The
   secret must never reach the browser, which is exactly why this exists.

   Deployed automatically with the site at: /api/create-cashfree-order

   Usage (matches the fetch call in checkout.js's PAY BUTTON handler):
     POST /api/create-cashfree-order
     body: { amount: number, customer: { name, phone, email } }
     returns: { payment_session_id } on success, { error } on failure

   SETUP — before this does anything live:
     1. In the Cloudflare Pages project settings, add environment
        variables: CASHFREE_APP_ID, CASHFREE_SECRET_KEY, CASHFREE_MODE
        ('sandbox' or 'production'). Never hardcode the secret key here.
     2. Set window.CASHFREE_APP_ID (public, safe client-side) and
        window.CASHFREE_MODE on the pages that load checkout.js, and add
        <script src="https://sdk.cashfree.com/js/v3/cashfree.js"> there.
     Until CASHFREE_APP_ID/CASHFREE_SECRET_KEY are set, every call here
     fails with a clear "not configured" error — checkout.js already
     catches that and falls back to dev mode, so nothing breaks either way.
   ============================================================ */

var ALLOWED_ORIGIN = '*'; /* tighten to 'https://pureharvest.in' (or final domain) once live */

export async function onRequest({ request, env }) {

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: buildCorsHeaders() });
  }

  if (request.method !== 'POST') {
    return jsonError('Method not allowed', 405);
  }

  /* ── Credentials must come from Cloudflare env vars, never hardcoded ── */
  var appId     = env.CASHFREE_APP_ID;
  var secretKey = env.CASHFREE_SECRET_KEY;
  var mode      = env.CASHFREE_MODE === 'production' ? 'production' : 'sandbox';

  if (!appId || !secretKey) {
    return jsonError('Cashfree is not configured yet — set CASHFREE_APP_ID and CASHFREE_SECRET_KEY in Cloudflare Pages env vars.', 503);
  }

  /* ── Parse + validate the order request ── */
  var payload;
  try {
    payload = await request.json();
  } catch (e) {
    return jsonError('Invalid JSON body', 400);
  }

  var amount   = Number(payload.amount);
  var customer = payload.customer || {};

  if (!amount || amount <= 0) {
    return jsonError('A valid order amount is required', 400);
  }
  if (!customer.phone) {
    return jsonError('Customer phone is required (Cashfree needs it for customer_id)', 400);
  }

  /* ── Build the Cashfree order ── */
  var orderId    = 'order_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  var customerId = 'cust_' + customer.phone.replace(/\D/g, '').slice(-10); /* stable id per phone number */

  var cashfreeBase = mode === 'production'
    ? 'https://api.cashfree.com/pg/orders'
    : 'https://sandbox.cashfree.com/pg/orders';

  try {
    var cfResponse = await fetch(cashfreeBase, {
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'x-api-version':  '2023-08-01',
        'x-client-id':     appId,
        'x-client-secret': secretKey
      },
      body: JSON.stringify({
        order_id:       orderId,
        order_amount:   amount,
        order_currency: 'INR',
        customer_details: {
          customer_id:    customerId,
          customer_name:  customer.name  || '',
          customer_phone: customer.phone,
          customer_email: customer.email || ''
        }
      })
    });

    var data = await cfResponse.json();

    if (!cfResponse.ok || !data.payment_session_id) {
      /* Surface Cashfree's own error message when available, for easier debugging */
      return jsonError(data.message || 'Cashfree order creation failed', cfResponse.status || 502);
    }

    return new Response(JSON.stringify({ payment_session_id: data.payment_session_id, order_id: orderId }), {
      status: 200,
      headers: Object.assign({ 'Content-Type': 'application/json' }, buildCorsHeaders())
    });

  } catch (err) {
    return jsonError('Could not reach Cashfree — please try again.', 500);
  }
}

/* ── helpers ──────────────────────────────────────────────── */

function buildCorsHeaders() {
  return {
    'Access-Control-Allow-Origin':  ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
