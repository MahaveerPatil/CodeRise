interface Env {
  RESEND_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
  ADMIN_EMAIL: string;
  CORS_ORIGINS: string;
  RATE_LIMIT: KVNamespace;
}

function corsHeaders(origin: string, allowedOrigins: string): Record<string, string> {
  const origins = allowedOrigins.split(',').map(o => o.trim());
  const allowed = origins.includes(origin) || origins.includes('*') ? origin : origins[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

async function sendEmail(env: Env, to: string, subject: string, html: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CodeRise <hello@coderise.com>',
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
    }
    return res.ok;
  } catch (e) {
    console.error('Email failed:', e);
    return false;
  }
}

async function db(env: Env, path: string, method = 'GET', body?: unknown) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1${path}`, {
    method,
    headers: {
      apikey: env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      ...(method === 'POST' ? { Prefer: 'return=representation' } : {}),
      ...(method === 'PATCH' ? { Prefer: 'return=representation' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (method === 'DELETE') return null;
  const text = await res.text();
  if (!res.ok) throw new Error(text);
  return text ? JSON.parse(text) : null;
}

async function checkRateLimit(
  kv: KVNamespace, ip: string, key: string, limit: number, windowSeconds: number
): Promise<boolean> {
  const kvKey = `rl:${key}:${ip}`;
  const entry = await kv.get(kvKey, 'json') as { count: number; windowStart: number } | null;
  const now = Date.now();
  if (!entry || now - entry.windowStart > windowSeconds * 1000) {
    await kv.put(kvKey, JSON.stringify({ count: 1, windowStart: now }), { expirationTtl: windowSeconds });
    return true;
  }
  if (entry.count >= limit) return false;
  await kv.put(kvKey, JSON.stringify({ count: entry.count + 1, windowStart: entry.windowStart }), { expirationTtl: windowSeconds });
  return true;
}

async function requireAuth(request: Request, env: Env): Promise<Record<string, unknown> | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  try {
    const res = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    return await res.json() as Record<string, unknown>;
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';
    const cors = corsHeaders(origin, env.CORS_ORIGINS || '*');

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      // ── POST /inquiries ─────────────────────────────────────────
      if (url.pathname === '/inquiries' && request.method === 'POST') {
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        const allowed = await checkRateLimit(env.RATE_LIMIT, ip, 'POST_inquiries', 5, 3600).catch(() => true);
        if (!allowed) {
          return json({ error: 'Too many requests. Please try again later.' }, 429, { ...cors, 'Retry-After': '3600' });
        }

        const body = await request.json() as Record<string, string>;
        const { name, company, email, phone, service, budget, timeline, description } = body;

        if (!name?.trim() || !email?.trim() || !service?.trim() || !description?.trim()) {
          return json({ error: 'Missing required fields' }, 400, cors);
        }

        const FIELD_MAX: Record<string, number> = { name: 100, email: 254, description: 2000, company: 200, phone: 20 };
        for (const [field, max] of Object.entries(FIELD_MAX)) {
          const val = body[field];
          if (val && val.length > max) {
            return json({ error: `Field "${field}" exceeds ${max} characters` }, 400, cors);
          }
        }

        // Store in Supabase
        const rows = await db(env, '/inquiries', 'POST', {
          name, company, email, phone, service, budget, timeline, description,
        }) as Record<string, unknown>[];

        const inquiryId = rows?.[0]?.id;

        // Notify admin
        await sendEmail(
          env,
          env.ADMIN_EMAIL,
          `🔔 New Inquiry from ${name} — ${service}`,
          `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0d14;color:#f5f0ff;border-radius:12px;border:1px solid rgba(255,107,107,0.2)">
            <h2 style="color:#FF6B6B;margin-top:0">New Project Inquiry</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#a899c0;font-size:13px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#a899c0;font-size:13px">Company</td><td style="padding:8px 0">${company || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#a899c0;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#FF6B6B">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#a899c0;font-size:13px">Phone</td><td style="padding:8px 0">${phone || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#a899c0;font-size:13px">Service</td><td style="padding:8px 0"><strong>${service}</strong></td></tr>
              <tr><td style="padding:8px 0;color:#a899c0;font-size:13px">Budget</td><td style="padding:8px 0">${budget || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#a899c0;font-size:13px">Timeline</td><td style="padding:8px 0">${timeline || '—'}</td></tr>
            </table>
            <hr style="border-color:rgba(255,107,107,0.15);margin:16px 0"/>
            <p style="color:#a899c0;font-size:13px;margin-bottom:4px">Description</p>
            <p style="line-height:1.6">${description}</p>
          </div>
          `
        );

        // Auto-reply to client
        await sendEmail(
          env,
          email,
          `We received your inquiry — CodeRise`,
          `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#0f0d14;color:#f5f0ff;border-radius:12px;border:1px solid rgba(255,107,107,0.2)">
            <h2 style="color:#FF6B6B;margin-top:0">Hi ${name},</h2>
            <p style="line-height:1.7;color:#a899c0">
              Thank you for reaching out to <strong style="color:#f5f0ff">CodeRise</strong>!
              We've received your inquiry about <strong style="color:#FF6B6B">${service}</strong>.
            </p>
            <p style="line-height:1.7;color:#a899c0">
              Our team will review your project details and get back to you within <strong style="color:#f5f0ff">24 hours</strong>.
            </p>
            <div style="margin:24px 0;padding:16px;background:rgba(255,107,107,0.05);border-radius:8px;border-left:3px solid #FF6B6B">
              <p style="margin:0;font-size:13px;color:#a899c0">In the meantime, you can reach us at</p>
              <p style="margin:4px 0 0;font-weight:600"><a href="mailto:hello@coderise.com" style="color:#FF6B6B">hello@coderise.com</a></p>
            </div>
            <p style="margin-top:24px;color:#a899c0">Best regards,<br/><strong style="color:#f5f0ff">CodeRise Team</strong></p>
          </div>
          `
        );

        return json({ success: true, id: inquiryId }, 201, cors);
      }

      // ── GET /blog ────────────────────────────────────────────────
      if (url.pathname === '/blog' && request.method === 'GET') {
        const posts = await db(env, '/blog_posts?published=eq.true&select=id,title,slug,excerpt,cover_image,tags,created_at&order=created_at.desc');
        return json(posts, 200, cors);
      }

      // ── GET /blog/:slug ──────────────────────────────────────────
      const blogMatch = url.pathname.match(/^\/blog\/([^/]+)$/);
      if (blogMatch && request.method === 'GET') {
        const rows = await db(env, `/blog_posts?slug=eq.${encodeURIComponent(blogMatch[1])}&published=eq.true`) as unknown[];
        if (!rows?.length) return json({ error: 'Not found' }, 404, cors);
        return json(rows[0], 200, cors);
      }

      // ── Health check ─────────────────────────────────────────────
      if (url.pathname === '/health') {
        return json({ status: 'ok', service: 'coderise-api' }, 200, cors);
      }

      // ── POST /admin/auth/login ───────────────────────────────────
      if (url.pathname === '/admin/auth/login' && request.method === 'POST') {
        const { email, password } = await request.json() as { email?: string; password?: string };
        if (!email || !password) return json({ error: 'Missing credentials' }, 400, cors);
        const res = await fetch(`${env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: { apikey: env.SUPABASE_SERVICE_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) return json({ error: 'Invalid credentials' }, 401, cors);
        const data = await res.json() as { access_token: string; expires_at: number };
        return json({ accessToken: data.access_token, expiresAt: data.expires_at }, 200, cors);
      }

      // ── POST /admin/auth/logout ──────────────────────────────────
      if (url.pathname === '/admin/auth/logout' && request.method === 'POST') {
        const authHeader = request.headers.get('Authorization');
        if (authHeader?.startsWith('Bearer ')) {
          const token = authHeader.slice(7);
          await fetch(`${env.SUPABASE_URL}/auth/v1/logout`, {
            method: 'POST',
            headers: { apikey: env.SUPABASE_SERVICE_KEY, Authorization: `Bearer ${token}` },
          }).catch(() => {});
        }
        return json({ success: true }, 200, cors);
      }

      // ── GET /admin/auth/session ──────────────────────────────────
      if (url.pathname === '/admin/auth/session' && request.method === 'GET') {
        const user = await requireAuth(request, env);
        if (!user) return json({ error: 'Unauthorized' }, 401, cors);
        return json({ valid: true }, 200, cors);
      }

      // ── GET /admin/inquiries ─────────────────────────────────────
      if (url.pathname === '/admin/inquiries' && request.method === 'GET') {
        const user = await requireAuth(request, env);
        if (!user) return json({ error: 'Unauthorized' }, 401, cors);
        const rows = await db(env, '/inquiries?order=created_at.desc');
        return json(rows, 200, cors);
      }

      // ── PATCH /admin/inquiries/:id ───────────────────────────────
      const adminInquiryMatch = url.pathname.match(/^\/admin\/inquiries\/([^/]+)$/);
      if (adminInquiryMatch && request.method === 'PATCH') {
        const user = await requireAuth(request, env);
        if (!user) return json({ error: 'Unauthorized' }, 401, cors);
        const body = await request.json() as { status?: string; notes?: string };
        const rows = await db(env, `/inquiries?id=eq.${encodeURIComponent(adminInquiryMatch[1])}`, 'PATCH', body);
        return json(rows, 200, cors);
      }

      return json({ error: 'Not found' }, 404, cors);
    } catch (err) {
      console.error('Worker error:', err);
      return json({ error: 'Internal server error' }, 500, cors);
    }
  },
};
