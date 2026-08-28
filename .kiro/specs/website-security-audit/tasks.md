# Implementation Plan: Website Security Fixes

## Overview

Ten security issues are fixed across four layers: the React frontend bundle, the Cloudflare Worker API, Cloudflare Pages HTTP headers, and static HTML/robots metadata. Tasks are ordered so lower-risk, self-contained changes come first and the most invasive change (AdminPage → Worker proxy) comes last after everything else is validated.

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": ["1", "2", "3", "4", "5"], "description": "Independent fixes: static disclosures, CSP, widget, form fallback, client validation" },
    { "wave": 2, "tasks": ["6"], "description": "Worker hardening: field validation, rate limiting, admin endpoints — depends on wave 1 field limits" },
    { "wave": 3, "tasks": ["7"], "description": "Worker checkpoint — depends on wave 2" },
    { "wave": 4, "tasks": ["8", "9"], "description": "Edge admin auth and AdminPage refactor — 9 depends on 6.4 Worker admin endpoints" },
    { "wave": 5, "tasks": ["10"], "description": "Final regression checkpoint — depends on all previous tasks" }
  ]
}
```

## Tasks

- [x] 1. Fix static asset disclosures (index.html, robots.txt)
  - [x] 1.1 Remove personal phone number from JSON-LD schemas in `index.html`
    - In the `Organization` schema's `contactPoint` object, delete the `"telephone": "+91-8310659343"` key-value pair; keep `"email"` and all other fields.
    - In the `ProfessionalService/LocalBusiness` schema, delete the top-level `"telephone": "+91-8310659343"` key-value pair; keep `"email"`.
    - Verify the remaining JSON-LD is syntactically valid (check with a JSON linter).
    - _Requirements: 2.10_

  - [x] 1.2 Remove Supabase dns-prefetch hint from `index.html`
    - Delete the line `<link rel="dns-prefetch" href="https://omksxlgibwqgirqcgkhh.supabase.co" />` from `<head>`.
    - Optionally replace with `<link rel="dns-prefetch" href="https://coderise-api.pmahaveer832.workers.dev" />` to hint the Worker domain instead.
    - _Requirements: 2.9_

  - [x] 1.3 Fix `public/robots.txt` to not disclose /admin
    - Remove the lines `Disallow: /admin` and `Disallow: /admin/*`.
    - The admin route is already protected by `noIndex={true}` in `SEOHead` — that provides the `noindex` meta tag. No `robots.txt` directive is needed.
    - Verify the `Allow: /` directive and the `Sitemap:` line remain intact.
    - _Requirements: 2.8_

- [x] 2. Add Content-Security-Policy header
  - [x] 2.1 Add CSP to the `/*` block in `public/_headers`
    - Append the following header to the existing `/*` block (after `Strict-Transport-Security`):
      ```
      Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://coderise-api.pmahaveer832.workers.dev; img-src 'self' data: https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
      ```
    - Do NOT add `unsafe-eval`; Vite production builds do not require it.
    - `unsafe-inline` for `style-src` is required for Tailwind JIT inline styles and Framer Motion.
    - _Requirements: 2.4, 3.5, 3.7_

  - [ ]* 2.2 Smoke-test CSP with `vite preview`
    - Run `npm run build && npm run preview`, open DevTools Console, and confirm no CSP violation errors appear on page load or when submitting the contact form.
    - _Requirements: 3.5_

- [x] 3. Fix WhatsAppWidget hardcoded phone fallback
  - [x] 3.1 Remove hardcoded fallback from `src/components/ui/WhatsAppWidget.tsx`
    - Change line 4 from:
      ```ts
      const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '918310659343';
      ```
      to:
      ```ts
      const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
      ```
    - Inside `WhatsAppWidget()`, add before the `url` declaration:
      ```ts
      if (!WHATSAPP_NUMBER) return null;
      ```
    - The `url` construction and JSX can remain unchanged.
    - _Requirements: 2.3, 3.3_

  - [ ]* 3.2 Write unit tests for WhatsAppWidget env var behaviour
    - When `VITE_WHATSAPP_NUMBER` is `undefined`, the component renders `null` (no DOM output).
    - When it is set to a valid number string (e.g. `'918310659343'`), the component renders an `<a>` tag whose `href` starts with `https://wa.me/918310659343`.
    - _Requirements: 2.3, 3.3_

- [x] 4. Remove ContactForm direct Supabase fallback
  - [x] 4.1 Remove the Supabase fallback branch from `submitForm` in `src/components/forms/ContactForm.tsx`
    - Delete the entire `if (!endpoint)` block (lines that do `await import('@supabase/supabase-js')` and `supabase.from('inquiries').insert(...)`).
    - Replace the `submitForm` function opening with:
      ```ts
      async function submitForm(data: FormData): Promise<void> {
        const workerUrl = import.meta.env.VITE_CLOUDFLARE_WORKER_URL as string;
        if (!workerUrl) {
          throw new Error('Contact form is not configured. Please email us directly at hello@coderise.com.');
        }
        const res = await fetch(`${workerUrl}/inquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Submission failed' })) as { error?: string };
          throw new Error(err.error || 'Submission failed');
        }
      }
      ```
    - The `catch` block in `handleSubmit` will surface the thrown message in the `errors.general` banner.
    - _Requirements: 2.2, 3.1_

  - [ ]* 4.2 Write unit test for submitForm with missing worker URL
    - Mock `import.meta.env.VITE_CLOUDFLARE_WORKER_URL` as `''`.
    - Calling `submitForm({...})` should throw an error whose message includes `'hello@coderise.com'`.
    - _Requirements: 2.2_

- [x] 5. Add max-length validation to ContactForm (client-side)
  - [x] 5.1 Add `FIELD_MAX` constants and `maxLength` attributes to `ContactForm.tsx`
    - Add near the top of the file (after imports):
      ```ts
      const FIELD_MAX = { name: 100, email: 254, description: 2000, company: 200, phone: 20 } as const;
      ```
    - Add `maxLength={FIELD_MAX.name}` to the name `<input>`.
    - Add `maxLength={FIELD_MAX.email}` to the email `<input>`.
    - Add `maxLength={FIELD_MAX.company}` to the company `<input>`.
    - Add `maxLength={FIELD_MAX.phone}` to the phone `<input>`.
    - Add `maxLength={FIELD_MAX.description}` to the description `<textarea>`.
    - Extend the `validate()` function:
      ```ts
      if ('name' in fields && fields.name && fields.name.length > FIELD_MAX.name)
        e.name = `Name must be ${FIELD_MAX.name} characters or fewer.`;
      if ('email' in fields && fields.email && fields.email.length > FIELD_MAX.email)
        e.email = `Email must be ${FIELD_MAX.email} characters or fewer.`;
      if ('description' in fields && fields.description && fields.description.length > FIELD_MAX.description)
        e.description = `Description must be ${FIELD_MAX.description} characters or fewer.`;
      ```
    - _Requirements: 2.7, 3.6_

  - [ ]* 5.2 Write unit tests for ContactForm length validation
    - A string exactly at the limit passes validation (no error returned).
    - A string one character over the limit fails with the correct error message for that field.
    - _Requirements: 2.7_

- [x] 6. Add field-length validation and rate limiting to Cloudflare Worker
  - [x] 6.1 Add field-length validation to `worker/src/index.ts`
    - After the existing required-fields check in `POST /inquiries`, add:
      ```ts
      const FIELD_MAX: Record<string, number> = { name: 100, email: 254, description: 2000, company: 200, phone: 20 };
      for (const [field, max] of Object.entries(FIELD_MAX)) {
        const val = body[field];
        if (val && val.length > max) {
          return json({ error: `Field "${field}" exceeds ${max} characters` }, 400, cors);
        }
      }
      ```
    - _Requirements: 2.7_

  - [x] 6.2 Create Cloudflare Workers KV namespace for rate limiting
    - In the `worker/` directory, run: `wrangler kv namespace create RATE_LIMIT`
    - Also create a preview namespace: `wrangler kv namespace create RATE_LIMIT --preview`
    - Add the returned IDs to `worker/wrangler.toml`:
      ```toml
      [[kv_namespaces]]
      binding = "RATE_LIMIT"
      id = "<production_namespace_id>"
      preview_id = "<preview_namespace_id>"
      ```
    - _Requirements: 2.6_

  - [x] 6.3 Implement KV-based rate limiter in `worker/src/index.ts`
    - Extend the `Env` interface to add `RATE_LIMIT: KVNamespace;`
    - Add the `checkRateLimit` helper function before the `export default` block:
      ```ts
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
      ```
    - In the `POST /inquiries` handler, before field validation, add:
      ```ts
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const allowed = await checkRateLimit(env.RATE_LIMIT, ip, 'POST_inquiries', 5, 3600).catch(() => true);
      if (!allowed) {
        return json({ error: 'Too many requests. Please try again later.' }, 429, { ...cors, 'Retry-After': '3600' });
      }
      ```
    - _Requirements: 2.6_

  - [x] 6.4 Add admin API endpoints to `worker/src/index.ts`
    - Add a `requireAuth` helper that validates a `Authorization: Bearer <token>` header by calling `GET ${env.SUPABASE_URL}/auth/v1/user` with the token. Returns the user object or `null`.
    - Add `POST /admin/auth/login` — forwards `{ email, password }` to `POST ${env.SUPABASE_URL}/auth/v1/token?grant_type=password`; returns `{ accessToken, expiresAt }` or 401.
    - Add `POST /admin/auth/logout` — calls `POST ${env.SUPABASE_URL}/auth/v1/logout` with the bearer token; returns `{ success: true }`.
    - Add `GET /admin/auth/session` — calls `requireAuth`; returns `{ valid: true }` or 401.
    - Add `GET /admin/inquiries` — requires auth; returns `await db(env, '/inquiries?order=created_at.desc')`.
    - Add `PATCH /admin/inquiries/:id` — requires auth; accepts `{ status?, notes? }`; calls `await db(env, '/inquiries?id=eq.<id>', 'PATCH', body)`.
    - All admin endpoints return 401 if `requireAuth` returns `null`.
    - _Requirements: 2.1, 3.2_

  - [ ]* 6.5 Write unit tests for Worker rate limiter and validation
    - **Property 2: Rate limiter blocks excess requests** — simulate 5 `checkRateLimit` calls returning `true`, then verify the 6th returns `false`. Use an in-memory mock KV.
    - **Property 3: Rate limit window resets** — mock KV entry with `windowStart` older than 3600 s; verify `checkRateLimit` returns `true` and resets the counter to 1.
    - **Property 1: Worker rejects oversized fields** — submit a payload where `name.length === 101`; verify the handler returns a `Response` with status 400 and the correct error message.
    - _Requirements: 2.6, 2.7_

- [x] 7. Checkpoint — verify Worker changes locally
  - Run `wrangler dev` in `worker/` and manually test:
    - `POST /inquiries` with a valid payload → 201
    - `POST /inquiries` with `name` of 101 characters → 400
    - 6 rapid `POST /inquiries` calls from the same IP → 6th returns 429
    - `POST /admin/auth/login` with valid admin credentials → 200 with token
    - `GET /admin/inquiries` with that token → inquiry list
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Add edge-level auth protection for /admin route
  - [x] 8.1 Add Basic-Auth block to `public/_headers`
    - Add a new route block after the existing `/robots.txt` block:
      ```
      /admin
        X-Robots-Tag: noindex, nofollow
        Basic-Auth: $ADMIN_BASIC_AUTH_USER:$ADMIN_BASIC_AUTH_HASH
      ```
    - The `$ADMIN_BASIC_AUTH_USER` and `$ADMIN_BASIC_AUTH_HASH` values must be configured as Cloudflare Pages environment variables (Settings → Environment Variables in the Cloudflare dashboard) — they are NOT `VITE_` vars and must NOT be added to `.env`.
    - To generate the bcrypt hash: `htpasswd -bnBC 10 "" <yourpassword> | tr -d ':\n'` (requires `apache2-utils` on Linux or equivalent). Use this output as `ADMIN_BASIC_AUTH_HASH`.
    - _Requirements: 2.5_

  - [x] 8.2 Document the Cloudflare Pages env var setup
    - Add the following comment block to `.env.example`:
      ```
      # === Cloudflare Pages environment variables (NOT local .env vars) ===
      # Set these in: Cloudflare Dashboard → Pages → your project → Settings → Environment Variables
      # ADMIN_BASIC_AUTH_USER=adminuser
      # ADMIN_BASIC_AUTH_HASH=<bcrypt_hash_of_password>  (generated with htpasswd -bnBC 10 "" password | tr -d ':\n')
      ```
    - _Requirements: 2.5_

- [ ] 9. Refactor AdminPage to use Worker proxy (removes frontend Supabase bundle)
  - [x] 9.1 Strip `src/lib/supabase.ts` to type exports only
    - Remove the `createClient` import and call.
    - Remove the `supabase` singleton export.
    - Keep the `Inquiry` and `BlogPost` TypeScript type exports.
    - Add `export const WORKER_URL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL as string;`
    - Add a dev-time warning: `if (!WORKER_URL) console.warn('VITE_CLOUDFLARE_WORKER_URL is not set');`
    - _Requirements: 2.1_

  - [x] 9.2 Refactor `src/pages/AdminPage.tsx` to call Worker API
    - Replace the `import { supabase }` import with `import { WORKER_URL, type Inquiry } from '../lib/supabase';`
    - Add a session helper at the top of the file:
      ```ts
      const SESSION_KEY = 'coderise_admin_session';
      function getToken(): string | null {
        try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')?.accessToken ?? null; }
        catch { return null; }
      }
      function setToken(accessToken: string, expiresAt: number) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ accessToken, expiresAt }));
      }
      function clearToken() { sessionStorage.removeItem(SESSION_KEY); }
      ```
    - Refactor `LoginForm.handleSubmit` to call `POST ${WORKER_URL}/admin/auth/login` instead of `supabase.auth.signInWithPassword`. On success, call `setToken(accessToken, expiresAt)`.
    - Refactor `handleLogout` to call `POST ${WORKER_URL}/admin/auth/logout` with the bearer token, then call `clearToken()`.
    - Refactor the `useEffect` session check to call `GET ${WORKER_URL}/admin/auth/session` with the stored token. On 401, call `clearToken()`.
    - Refactor `loadInquiries` to call `GET ${WORKER_URL}/admin/inquiries` with the bearer token; on 401, set `authed = false`.
    - Refactor `updateStatus` and `saveNotes` to call `PATCH ${WORKER_URL}/admin/inquiries/${id}` with the bearer token and `{ status }` or `{ notes }` body.
    - _Requirements: 2.1, 3.2_

  - [ ]* 9.3 Write unit tests for AdminPage Worker integration
    - Mock `fetch` to return `200` with a fixture array of `Inquiry` objects for `GET /admin/inquiries`.
    - Verify the component renders the correct number of inquiry rows.
    - Mock `fetch` to return `401` for `GET /admin/auth/session`.
    - Verify the component renders the `LoginForm` and `sessionStorage` is cleared.
    - _Requirements: 3.2_

  - [ ] 9.4 Remove `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from `.env.example`
    - Delete or comment out the two lines in `.env.example` for Supabase VITE env vars.
    - Add a comment explaining these are no longer needed for the frontend:
      ```
      # VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are no longer used by the frontend.
      # All Supabase access goes through the Cloudflare Worker.
      # Set SUPABASE_URL and SUPABASE_SERVICE_KEY as worker secrets: wrangler secret put SUPABASE_SERVICE_KEY
      ```
    - _Requirements: 2.1_

- [x] 10. Final checkpoint — full regression verification
  - Run `npm run build` and verify the TypeScript compilation and Vite build complete without errors.
  - Run the following assertions; each must return no matches:
    - `grep -r "918310659343" dist/`
    - `grep -r "supabase.co" dist/`
    - `grep -r "VITE_SUPABASE" dist/`
    - `grep -r "918310659343" src/`
  - Verify `dist/_headers` contains a `Content-Security-Policy` directive.
  - Verify `dist/robots.txt` does not contain `/admin`.
  - Verify `dist/index.html` does not contain `omksxlgibwqgirqcgkhh`.
  - Verify `dist/index.html` does not contain `8310659343`.
  - Ensure all automated tests pass; ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test tasks; they can be skipped for a faster MVP but are recommended before production deployment.
- Task 9 (AdminPage refactor) is the most invasive change — complete and verify tasks 1–8 first.
- The `ADMIN_BASIC_AUTH_HASH` in task 8 is set as a Cloudflare Pages environment variable in the dashboard, not in `.env`. It will never be inlined into the JS bundle.
- The KV namespace in task 6.2 requires a Cloudflare account with Workers KV enabled. The `wrangler kv namespace create` command handles provisioning.
- After task 9, `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` can be removed from the local `.env` file entirely. The Worker accesses Supabase using `SUPABASE_URL` (in `wrangler.toml` `[vars]`) and `SUPABASE_SERVICE_KEY` (set via `wrangler secret put`).
