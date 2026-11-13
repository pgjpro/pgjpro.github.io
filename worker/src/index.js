// 마케터 P 하트(공감) 카운터
// GET  /likes?slug=글주소  → { count }
// POST /likes?slug=글주소  → { count, added }  (같은 사람은 글마다 1번만 셈)
// 방문자 IP는 저장하지 않고, 글 주소와 섞은 해시값만 저장합니다.

const ALLOWED = ['https://marketerpark.co.kr', 'http://localhost:4321'];
const SLUG = /^[a-z0-9-]{1,100}$/;

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED.includes(origin) ? origin : ALLOWED[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors(origin) },
  });
}

async function hash(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function count(db, slug) {
  const row = await db.prepare('SELECT count FROM likes WHERE slug = ?').bind(slug).first();
  return row ? row.count : 0;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get('Origin') || '';
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    if (url.pathname !== '/likes') return json({ error: 'not found' }, 404, origin);

    const slug = url.searchParams.get('slug') || '';
    if (!SLUG.test(slug)) return json({ error: 'bad slug' }, 400, origin);

    if (req.method === 'GET') return json({ count: await count(env.DB, slug) }, 200, origin);

    if (req.method === 'POST') {
      if (!ALLOWED.includes(origin)) return json({ error: 'forbidden' }, 403, origin);
      const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
      const who = await hash(`${env.SALT}:${slug}:${ip}`);
      const seen = await env.DB.prepare('INSERT OR IGNORE INTO seen (slug, who) VALUES (?, ?)').bind(slug, who).run();
      const added = seen.meta.changes > 0;
      if (added) {
        await env.DB.prepare(
          'INSERT INTO likes (slug, count) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET count = count + 1'
        ).bind(slug).run();
      }
      return json({ count: await count(env.DB, slug), added }, 200, origin);
    }

    return json({ error: 'method not allowed' }, 405, origin);
  },
};
