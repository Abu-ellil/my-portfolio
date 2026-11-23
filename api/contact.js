/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Relays portfolio contact-form submissions to the owner's Telegram chat.
 * Secrets (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) live in Vercel environment
 * variables — never in this repo or the client bundle.
 *
 * The primary site is hosted on GitHub Pages (abuellil.is-a.dev) while this
 * function runs on the Vercel mirror, so browsers POST cross-origin and we
 * must answer the CORS preflight.
 */

const MAX = { name: 120, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE = { windowMs: 10 * 60 * 1000, max: 5 };

// Best-effort per-warm-instance rate limit (resets between cold starts).
const hits = new Map();

// User input must be escaped before it goes into an HTML parse_mode message,
// or a visitor typing "<b>" (or worse) breaks the send / injects markup.
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'server_not_configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'invalid_body' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  if (recent.length >= RATE.max) {
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }
  recent.push(now);
  hits.set(ip, recent);

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  // Honeypot: humans never see or fill this hidden field. Reply 200 so bots
  // think they succeeded and move on without spamming Telegram.
  if (String(body.website || '').length > 0) {
    return res.status(200).json({ ok: true });
  }

  if (!name || name.length > MAX.name) {
    return res.status(400).json({ ok: false, error: 'invalid_name' });
  }
  if (!EMAIL_RE.test(email) || email.length > MAX.email) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }
  if (!message || message.length > MAX.message) {
    return res.status(400).json({ ok: false, error: 'invalid_message' });
  }

  const text = [
    '🔔 <b>رسالة جديدة من البورتفوليو</b>',
    '',
    `👤 <b>الاسم:</b> ${esc(name)}`,
    `📧 <b>الإيميل:</b> ${esc(email)}`,
    '',
    '💬 <b>الرسالة:</b>',
    esc(message),
    '',
    '— 🌐 abuellil.is-a.dev',
  ].join('\n');

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  const tgData = await tgRes.json().catch(() => ({}));

  if (!tgRes.ok || tgData.ok !== true) {
    console.error(
      'telegram_send_failed',
      tgRes.status,
      JSON.stringify(tgData).slice(0, 300)
    );
    return res.status(502).json({ ok: false, error: 'telegram_send_failed' });
  }

  return res.status(200).json({
    ok: true,
    message_id: tgData.result && tgData.result.message_id,
  });
};
