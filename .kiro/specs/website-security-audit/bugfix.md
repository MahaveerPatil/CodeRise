# Bugfix Requirements Document

## Introduction

The CodeRise website (React + Vite + TypeScript, deployed to Cloudflare Pages) has several security vulnerabilities that expose credentials, leak implementation details, and create attack surfaces. The most critical issue is that the Supabase project URL and anon key are hardcoded as string literals directly in the compiled `AdminPage` JS bundle — meaning any visitor who opens DevTools or downloads the JS file can extract them. Additionally, the contact form falls back to constructing a Supabase client directly in the browser using these same credentials, bypassing the intended Cloudflare Worker proxy entirely. Missing security headers (notably Content-Security-Policy), an exposed admin route with no rate limiting, and a phone number hardcoded as a fallback in a widget round out the set of issues.

These vulnerabilities collectively risk unauthorized database reads and writes against the `inquiries` table, potential credential rotation costs, spam/abuse of the contact form, and general information disclosure.

---

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user visits the deployed site and downloads `AdminPage-*.js` from the browser network tab THEN the system exposes the Supabase project URL (`https://omksxlgibwqgirqcgkhh.supabase.co`) and the full JWT anon key as plaintext string literals in the JavaScript bundle

1.2 WHEN `VITE_CLOUDFLARE_WORKER_URL` is empty or not set THEN the system falls back to instantiating a Supabase client directly in the browser using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, sending database credentials to every user's browser

1.3 WHEN `VITE_WHATSAPP_NUMBER` is not set in the environment THEN the system uses the hardcoded fallback `'918310659343'` compiled into `WhatsAppWidget.tsx`, permanently embedding a real phone number in the bundle

1.4 WHEN any page on the site is loaded THEN the system does not send a `Content-Security-Policy` header, allowing unrestricted script execution and cross-origin resource loading

1.5 WHEN the `/admin` route is served THEN the system serves the Admin dashboard page to any unauthenticated visitor's browser (authentication is only enforced client-side in React state, not at the server/edge level)

1.6 WHEN a user submits the contact form repeatedly THEN the system does not enforce any rate limiting on the `/inquiries` endpoint or form submission, allowing unlimited spam submissions

1.7 WHEN the contact form's `description` or `name` fields receive arbitrary-length input THEN the system does not enforce a maximum length constraint on the client side before submission

1.8 WHEN `robots.txt` is crawled THEN the system reveals that an `/admin` path exists via the `Disallow: /admin` directive, confirming the admin panel's location to malicious crawlers

1.9 WHEN the `index.html` file is served THEN the system includes a `dns-prefetch` hint pointing directly to the Supabase subdomain `omksxlgibwqgirqcgkhh.supabase.co`, disclosing the backend infrastructure provider and project reference

1.10 WHEN the phone number `+91-8310659343` is included in the JSON-LD `contactPoint` schema in `index.html` THEN the system publishes the personal phone number in a machine-readable format that is trivially scraped by bots

---

### Expected Behavior (Correct)

2.1 WHEN the `AdminPage` bundle is compiled THEN the system SHALL NOT contain any hardcoded string literals for the Supabase URL or anon key; all credential access SHALL go through environment variables resolved at build time or a server-side proxy

2.2 WHEN `VITE_CLOUDFLARE_WORKER_URL` is empty or not set THEN the system SHALL fail gracefully with a clear error message and SHALL NOT fall back to direct browser-side Supabase client instantiation; all database writes SHALL be routed exclusively through the Cloudflare Worker

2.3 WHEN `VITE_WHATSAPP_NUMBER` is not set THEN the system SHALL render the WhatsApp widget without a functional URL (or hide it) rather than falling back to a hardcoded phone number literal in the bundle

2.4 WHEN any page on the site is loaded THEN the system SHALL send a `Content-Security-Policy` header restricting `script-src` to self and known trusted origins (Google Fonts, Supabase domain via worker only), `object-src 'none'`, and `base-uri 'self'`

2.5 WHEN the `/admin` route is requested THEN the system SHALL enforce authentication at the edge (Cloudflare Pages `_headers` or a Cloudflare Access policy) so the dashboard HTML is never served to unauthenticated clients

2.6 WHEN a user submits the contact form THEN the system SHALL enforce rate limiting (e.g. 5 submissions per IP per hour) at the Cloudflare Worker level before any data is written to the database

2.7 WHEN the contact form is submitted THEN the system SHALL validate that `name`, `email`, and `description` fields do not exceed defined maximum lengths (e.g. 100, 254, and 2000 characters respectively) both client-side and at the Worker API layer

2.8 WHEN `robots.txt` is written THEN the system SHALL NOT include a `Disallow` directive that explicitly names the `/admin` path; instead it SHALL use a generic disallow or rely on `noindex` meta tags on the admin page itself

2.9 WHEN `index.html` is built THEN the system SHALL NOT include a `dns-prefetch` hint pointing to the raw Supabase subdomain; any prefetch hints SHALL point only to the Cloudflare Worker domain

2.10 WHEN the JSON-LD schema is generated THEN the system SHALL replace the personal phone number in the `contactPoint` with a general business contact or omit the telephone field if no dedicated business line is available

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a visitor submits a valid contact form inquiry THEN the system SHALL CONTINUE TO successfully deliver the inquiry to the database via the Cloudflare Worker and display the success confirmation screen

3.2 WHEN a logged-in admin visits `/admin` and authenticates via Supabase Auth THEN the system SHALL CONTINUE TO display the Admin Dashboard with the full list of inquiries, status management, and notes functionality

3.3 WHEN the WhatsApp widget button is clicked THEN the system SHALL CONTINUE TO open `wa.me` with the correct business number and pre-filled greeting message

3.4 WHEN search engine crawlers visit the site THEN the system SHALL CONTINUE TO index all public-facing content (home, services, projects, contact sections) as permitted by `robots.txt`

3.5 WHEN the site loads THEN the system SHALL CONTINUE TO load Google Fonts (Inter, Syne, JetBrains Mono) without errors, meaning any new CSP policy SHALL explicitly allow `fonts.googleapis.com` and `fonts.gstatic.com`

3.6 WHEN the contact form is submitted with invalid data THEN the system SHALL CONTINUE TO display inline validation errors for missing required fields and invalid email format without submitting to the backend

3.7 WHEN the site is served over HTTPS THEN the system SHALL CONTINUE TO send `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy` headers as currently configured in `public/_headers`

3.8 WHEN `SEOHead` injects structured data schemas THEN the system SHALL CONTINUE TO render valid JSON-LD for the Organization, WebSite, and LocalBusiness schemas on all pages

---

## Bug Condition Derivation

**Bug Condition Function — Credential Exposure (Issues 1.1 and 1.2):**

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type BuildArtifactOrFormSubmission
  OUTPUT: boolean

  RETURN (X is a compiled JS bundle AND X contains Supabase URL or anon key as string literal)
      OR (X is a form submission AND VITE_CLOUDFLARE_WORKER_URL is empty AND X triggers direct Supabase client creation in browser)
END FUNCTION
```

**Property: Fix Checking — Credential Exposure**

```pascal
FOR ALL X WHERE isBugCondition(X) DO
  result ← buildOrSubmit'(X)
  ASSERT no_credential_literal_in_bundle(result)
       AND no_direct_supabase_client_in_browser(result)
END FOR
```

**Preservation Goal:**

```pascal
// Property: Preservation Checking
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT formSubmission(X) = formSubmission'(X)     // valid submissions still succeed
       AND adminDashboard(X) = adminDashboard'(X)   // admin UX unchanged
       AND whatsappWidget(X) = whatsappWidget'(X)   // widget still opens correct chat
END FOR
```
