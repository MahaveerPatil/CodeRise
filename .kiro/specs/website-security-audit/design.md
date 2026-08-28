# Design Document — Website Security Audit Fixes

## Overview

This document describes the technical approach for fixing 10 security vulnerabilities in the CodeRise website (React + Vite + TypeScript on Cloudflare Pages + Cloudflare Worker). The fixes span four layers: compiled frontend bundles, the Cloudflare Worker API, Cloudflare Pages HTTP headers, and static HTML/robots metadata. No new libraries are introduced. All fixes use existing infrastructure: Vite environment variables, Cloudflare Workers KV for rate limiting state, and native Cloudflare Pages `_headers` syntax.

## Glossary

- **Cloudflare Worker**: A serverless function running at the edge that handles API requests (contact form, admin proxy) before they reach Supabase.
- **Cloudflare Pages**: The static hosting platform serving the React/Vite build, configured via `public/_headers` and `public/_redirects`.
- **CSP**: Content-Security-Policy — an HTTP response header that restricts which resources a browser is allowed to load.
- **VITE_ env var**: A Vite environment variable prefixed with `VITE_` that is inlined into the compiled JS bundle and visible to anyone who downloads it.
- **KV namespace**: Cloudflare Workers KV, a key-value store used for persistent state across Worker invocations (used here for rate limiting).
- **Anon key**: The Supabase "anonymous" JWT token. It is designed to be public but still discloses the infrastructure provider and project reference.
- **Service key**: The Supabase service-role JWT token. It bypasses Row Level Security and must never leave the server side.
- **JSON-LD**: A structured data format embedded in `<script type="application/ld+json">` tags that Google parses for rich results and knowledge panels.
- **dns-prefetch**: An HTML hint (`<link rel="dns-prefetch">`) that tells the browser to resolve a hostname in advance, disclosing the infrastructure being used.
- **Basic-Auth**: HTTP 401 challenge/response authentication enforced at the Cloudflare Pages edge before serving any HTML.

---

## Bug Details

Ten security vulnerabilities exist across the CodeRise website codebase:

| # | Location | Vulnerability |
|---|---|---|
| 1 | `src/lib/supabase.ts` + AdminPage bundle | `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are inlined by Vite into the browser bundle, exposing the Supabase project reference |
| 2 | `src/components/forms/ContactForm.tsx` | When `VITE_CLOUDFLARE_WORKER_URL` is empty, the form falls back to instantiating a Supabase client directly in the browser |
| 3 | `src/components/ui/WhatsAppWidget.tsx` | A real phone number `'918310659343'` is hardcoded as a fallback literal in the compiled bundle |
| 4 | `public/_headers` | No `Content-Security-Policy` header is sent, allowing unrestricted script execution |
| 5 | `public/_headers` | The `/admin` route is served to any unauthenticated visitor; auth is only enforced client-side |
| 6 | `worker/src/index.ts` | `POST /inquiries` has no rate limiting, allowing unlimited spam submissions |
| 7 | `ContactForm.tsx` + `worker/src/index.ts` | No maximum-length validation on name, email, or description fields on either side |
| 8 | `public/robots.txt` | `Disallow: /admin` explicitly reveals the admin path to malicious crawlers |
| 9 | `index.html` | `<link rel="dns-prefetch" href="https://omksxlgibwqgirqcgkhh.supabase.co" />` discloses backend infrastructure |
| 10 | `index.html` | Personal phone number `+91-8310659343` appears in JSON-LD `contactPoint` and `LocalBusiness` schemas |

---

## Expected Behavior

After fixes:

1. The compiled frontend JS bundle contains no Supabase URL or anon key literals.
2. `ContactForm` fails with a user-visible error if `VITE_CLOUDFLARE_WORKER_URL` is not set; it never touches Supabase directly.
3. `WhatsAppWidget` renders `null` (hidden) when `VITE_WHATSAPP_NUMBER` is not set; no phone number fallback exists in the bundle.
4. Every page response includes a `Content-Security-Policy` header that restricts scripts to `'self'`, fonts to Google Fonts, and connections to the Worker URL only.
5. The `/admin` route returns an HTTP 401 challenge to unauthenticated browsers before any HTML is served.
6. `POST /inquiries` at the Worker level enforces a maximum of 5 requests per IP per hour, returning 429 on excess.
7. Both the client and the Worker reject fields that exceed defined maximum lengths (name: 100, email: 254, description: 2000 chars).
8. `robots.txt` does not name `/admin`; the admin page relies on `noindex` meta tags to prevent indexing.
9. `index.html` contains no dns-prefetch hint pointing to the Supabase subdomain.
10. No JSON-LD schema in `index.html` contains a personal phone number.

---

## Hypothesized Root Cause

**Issues 1–3 (credential/PII hardcoding):** Vite's `VITE_` prefix convention inlines any env var directly into the browser bundle at build time. The developer relied on `.env` being git-ignored but did not account for the fact that `VITE_SUPABASE_*` values end up verbatim in `dist/assets/*.js`. The WhatsApp fallback was added as a developer convenience that was never removed before production.

**Issue 4 (missing CSP):** The `public/_headers` file was populated with the most common security headers (HSTS, X-Frame-Options, etc.) but CSP was omitted — likely because CSP requires careful domain enumeration and is easy to get wrong.

**Issue 5 (no edge auth on /admin):** Admin authentication was implemented client-side in React state, which is correct for UX but provides no server-level protection. The developer did not add a corresponding edge guard.

**Issues 6–7 (missing rate limiting and validation):** The Worker was built as an MVP to route form submissions to Supabase. Abuse-prevention logic (rate limiting, length caps) was deferred and never added.

**Issues 8–10 (metadata disclosure):** The `robots.txt` convention of disallowing private routes, the dns-prefetch added for performance, and the JSON-LD phone number for local SEO are all common practices that inadvertently disclose operational details when the data is personal or security-relevant.

---

## Fix Implementation

### Architecture Overview

```
Browser
  │
  ├─ index.html          (static, served by Cloudflare Pages CDN)
  │    └─ JSON-LD schemas cleaned, dns-prefetch removed
  │
  ├─ React bundle (Vite)
  │    ├─ ContactForm.tsx  → POST https://worker-url/inquiries  (no Supabase fallback)
  │    ├─ AdminPage.tsx    → Worker /admin/* endpoints          (no Supabase SDK in bundle)
  │    └─ WhatsAppWidget.tsx → renders null if number not set
  │
  └─ /admin route
       └─ HTTP 401 Basic-Auth challenge at Cloudflare Pages edge

Cloudflare Worker  (coderise-api)
  ├─ POST /inquiries
  │    ├─ Rate limiter  (KV-based, 5 req / IP / hour)
  │    ├─ Field length validation
  │    └─ Supabase service key (server-side secret, never in browser)
  ├─ POST /admin/auth/login
  ├─ POST /admin/auth/logout
  ├─ GET  /admin/auth/session
  ├─ GET  /admin/inquiries
  ├─ PATCH /admin/inquiries/:id
  └─ GET /blog, GET /blog/:slug, GET /health

Cloudflare Pages CDN
  └─ _headers
       ├─ Content-Security-Policy  (/* block)
       ├─ X-Robots-Tag: noindex, nofollow  (/admin block)
       └─ Basic-Auth  (/admin block)
```

### Fix 1: Remove Supabase Credentials from Frontend Bundle

Move all Supabase operations from `AdminPage.tsx` through the Cloudflare Worker. The Worker already has `SUPABASE_SERVICE_KEY` and `SUPABASE_URL` as server-side secrets (set via `wrangler secret`).

New Worker endpoints required:
- `POST /admin/auth/login` — proxies Supabase `POST /auth/v1/token?grant_type=password`
- `POST /admin/auth/logout` — proxies Supabase `POST /auth/v1/logout`
- `GET /admin/auth/session` — validates bearer token via Supabase `/auth/v1/user`
- `GET /admin/inquiries` — returns all inquiries (requires `Authorization: Bearer <token>`)
- `PATCH /admin/inquiries/:id` — updates status/notes (requires auth)

`src/lib/supabase.ts` is stripped to type exports only; the `createClient` call and `VITE_SUPABASE_*` references are removed.

`AdminPage.tsx` stores the access token in `sessionStorage` (not `localStorage` — clears on tab close) and passes it as a Bearer header on every admin request.

### Fix 2: Remove ContactForm Supabase Fallback

The `if (!endpoint)` branch in `submitForm()` is deleted. A guard at the top throws immediately with a user-readable message if `VITE_CLOUDFLARE_WORKER_URL` is not set:

```ts
const workerUrl = import.meta.env.VITE_CLOUDFLARE_WORKER_URL as string;
if (!workerUrl) {
  throw new Error('Contact form is not configured. Please email us directly at hello@coderise.com.');
}
```

### Fix 3: Remove WhatsApp Phone Fallback

```ts
// Before
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '918310659343';

// After
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
// In component: if (!WHATSAPP_NUMBER) return null;
```

### Fix 4: Content-Security-Policy Header

Added to the `/*` block in `public/_headers`:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://coderise-api.pmahaveer832.workers.dev; img-src 'self' data: https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

`unsafe-inline` for styles is required because Tailwind JIT and Framer Motion emit inline style attributes. `unsafe-eval` is intentionally excluded.

### Fix 5: Edge Auth on /admin

Added to `public/_headers`:

```
/admin
  X-Robots-Tag: noindex, nofollow
  Basic-Auth: $ADMIN_BASIC_AUTH_USER:$ADMIN_BASIC_AUTH_HASH
```

`ADMIN_BASIC_AUTH_USER` and `ADMIN_BASIC_AUTH_HASH` are Cloudflare Pages environment variables (not `VITE_` vars — they are never inlined into the bundle). The hash is a bcrypt hash of the admin password, generated with `htpasswd -bnBC 10 "" yourpassword | tr -d ':\n'`.

### Fix 6: Rate Limiting at Worker Level

A `checkRateLimit` helper uses Cloudflare Workers KV:

```ts
interface RateLimitEntry { count: number; windowStart: number; }

async function checkRateLimit(kv: KVNamespace, ip: string, key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const kvKey = `rl:${key}:${ip}`;
  const entry = await kv.get(kvKey, 'json') as RateLimitEntry | null;
  const now = Date.now();
  if (!entry || now - entry.windowStart > windowSeconds * 1000) {
    await kv.put(kvKey, JSON.stringify({ count: 1, windowStart: now }), { expirationTtl: windowSeconds });
    return true;
  }
  if (entry.count >= limit) return false;
  await kv.put(kvKey, JSON.stringify({ count: entry.count + 1, windowStart: entry.windowStart }), { expirationTtl: windowSeconds });
  return true;
}
```

KV errors are caught and fail-open (allow the request) to avoid blocking legitimate users during transient KV outages.

### Fix 7: Field Length Validation

Defined limits: `name`: 100, `email`: 254, `description`: 2000, `company`: 200, `phone`: 20.

**Client:** `maxLength` HTML attributes + `validate()` function checks.  
**Worker:** Loop over field limits after required-field check; return `400` on violation.

### Fix 8: robots.txt

Remove `Disallow: /admin` and `Disallow: /admin/*`. The admin page's `SEOHead` already receives `noIndex={true}`, producing `<meta name="robots" content="noindex, nofollow">` — sufficient to prevent indexing.

### Fix 9: Remove dns-prefetch

Delete `<link rel="dns-prefetch" href="https://omksxlgibwqgirqcgkhh.supabase.co" />` from `index.html`.

### Fix 10: Remove Phone Number from JSON-LD

- `Organization` schema: remove `"telephone"` key from `contactPoint`
- `ProfessionalService/LocalBusiness` schema: remove top-level `"telephone"` key

---

## Data Models

### Rate Limit KV Entry

```ts
interface RateLimitEntry {
  count: number;       // requests in current window
  windowStart: number; // Unix timestamp ms when window opened
}
// KV key: `rl:POST_inquiries:{ip}`
// KV TTL: 3600 seconds
```

### Admin Session (sessionStorage)

```ts
interface AdminSession {
  accessToken: string; // Supabase JWT
  expiresAt: number;   // Unix timestamp ms
}
// sessionStorage key: 'coderise_admin_session'
```

### Extended Worker Env

```ts
interface Env {
  RESEND_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
  ADMIN_EMAIL: string;
  CORS_ORIGINS: string;
  RATE_LIMIT: KVNamespace; // NEW
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do.*

### Property 1: Worker rejects oversized fields

*For any* contact form submission where any text field exceeds its defined maximum length, the Worker SHALL return a 400 response and SHALL NOT write a record to the database.

**Validates: Requirements 2.7**

### Property 2: Rate limiter blocks excess requests

*For any* IP address that has submitted more than 5 requests to `POST /inquiries` within a 1-hour window, the (N+1)th request SHALL receive a 429 response.

**Validates: Requirements 2.6**

### Property 3: Rate limit window resets correctly

*For any* IP address whose rate limit window has expired (> 1 hour since `windowStart`), the next request SHALL be treated as the first request in a new window and SHALL succeed (assuming no other violation).

**Validates: Requirements 2.6**

### Property 4: Valid submissions succeed end-to-end

*For any* well-formed contact form payload (all required fields present, all lengths within limits, IP not rate-limited), the Worker SHALL return 201 and the record SHALL appear in the `inquiries` table.

**Validates: Requirements 3.1**

---

## Error Handling

| Scenario | Handling |
|---|---|
| `VITE_CLOUDFLARE_WORKER_URL` not set at build time | `ContactForm` throws a user-readable error; displayed in `errors.general` banner |
| `VITE_WHATSAPP_NUMBER` not set | Widget renders `null` (hidden) — no broken link shown |
| Worker KV unavailable (transient) | Rate limit check fails open (request allowed) with a `console.warn` |
| Worker field validation fails | `400 { error: 'Field "X" exceeds Y characters' }` |
| Rate limit exceeded | `429 { error: 'Too many requests...' }` with `Retry-After: 3600` |
| Admin Worker endpoint called without valid token | `401 { error: 'Unauthorized' }` |
| Supabase admin operation fails | `500 { error: 'Internal server error' }` — Supabase error details not forwarded |
| CSP violation | Browser blocks the resource; no server-side change needed |

---

## Testing Strategy

**Unit tests** (Vitest or Workers test harness):
- `validateFieldLengths()` with fields at, just below, and just above each limit
- `checkRateLimit()`: 5 allowed calls then blocked on 6th; window expiry resets counter
- `submitForm()` in `ContactForm` with missing `VITE_CLOUDFLARE_WORKER_URL` throws correctly
- `WhatsAppWidget` renders `null` when number is undefined; renders `<a>` when number is set

**Integration tests** (manual against `wrangler dev` / `vite preview`):
- Contact form end-to-end: valid data → 201 → record in DB → success screen
- Submit 6 times rapidly from same IP → 6th returns 429
- Admin login via Worker proxy → session stored → inquiry list rendered
- CSP header present in response headers on page load
- `robots.txt` has no `/admin` directive
- `index.html` contains no Supabase subdomain or personal phone number

**Build-time assertions** (can be run as a CI step):
- `grep -r "918310659343" dist/` → no matches
- `grep -r "supabase.co" dist/` → no matches
- `grep -r "VITE_SUPABASE" dist/` → no matches
