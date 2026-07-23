# Prestige Rentals — Claude Code Context File

Premium bounce house rental website for Houston, TX. Built to convert visitors into confirmed bookings.

---

## Stack
- Next.js 14 (App Router)
- TypeScript (96% of codebase)
- Tailwind CSS (all styling — no custom CSS files)
- PostgreSQL (Render managed DB)
- Deployed on Render via `render.yaml`
- GitHub repo: narriola23/prestige-rentals, branch `main`

## Folder Structure
- `/app` — Next.js pages and routes
- `/components` — reusable UI components
- `/db` — database migration and seed files (`migrate.js`)
- `/lib` — shared utilities (`db.ts`, `bookings.ts`, `products.ts`, `availability.ts`, `stripe.ts`)

## Conventions
- TypeScript throughout
- Tailwind for all styling
- Always create a feature branch before starting any task — never work directly on `main`
- Branch naming: `feature/description` or `fix/description`

---

## Business Goal
Build a website that takes a customer from "I need a bounce house" to "I reserved it" with as little friction as possible.

**Primary CTA:** Check Availability
**Secondary CTAs:** Book Now, View Rentals, Get a Quote, Call Now, Text Us

## Target Customers
Parents, families, schools, churches, daycares, HOAs, small businesses — mostly browsing on mobile comparing multiple rental companies.

## Design Principles
- Mobile-first, clean, trustworthy, family-friendly
- No messy carnival-style design — bright but clean
- Every page must answer: What can I rent? Do you serve my area? Is it available? How much? Can I trust you? How do I book?

---

## Required Pages
- Homepage (hero, categories, featured rentals, why us, how it works, packages, reviews, service areas, FAQ preview, final CTA)
- Category pages: bounce houses, water slides, combo units, obstacle courses, party rentals, tables & chairs, concessions
- Individual product pages (gallery, price, specs, availability CTA, add-ons, related rentals, FAQs)
- Party package pages (backyard birthday, summer water slide, school/church, toddler, large event)
- Service area pages: Houston, Cypress, Spring, Tomball, Katy, The Woodlands, Humble, Conroe, Sugar Land, Pearland, Jersey Village, Klein
- FAQ page (15 required questions — see agent instructions for full list)
- Policy pages: Rental Agreement, Safety Rules, Rain Policy, Cancellation Policy, Privacy Policy, Terms
- Contact page, Quote request page, Thank-you pages for tracking

## SEO Requirements
- Unique title tag and meta description per page
- One H1, proper H2/H3 structure
- Local service area wording throughout
- LocalBusiness schema, FAQ schema, Product schema
- Sitemap, robots.txt, optimized image alt text

---

## Render Deployment
- Web service: `prestige-rentals` (srv-d8rm1iugvqtc73f7p92g)
- Database: `prestige-rentals-db` (PostgreSQL) ✅ running — **upgraded to Basic 256MB**
- Blueprint ID: exs-d8rlsa67r5hc73egnb30
- Live URL: https://prestige-rentals.onrender.com
- Environment variables set on Render:
  - `NEXT_PUBLIC_BUSINESS_PHONE` = 8327161836 (site-wide; contact page uses (346) 244-3261 hardcoded for now)
  - `ADMIN_PASSWORD` = ✅ Set (see Render dashboard — do not commit value here)
  - `DATABASE_URL` = ✅ Set (Internal Database URL from prestige-rentals-db)
  - `RESEND_API_KEY` = ✅ Set (Resend account: narriola23@gmail.com, key name: prestige-rentals-contact)
  - `CONTACT_EMAIL` = ✅ Set to `bounceprestigerentals@gmail.com` as of 7/22/2026 (the code default, `narriola23@gmail.com`, now only applies if the var is ever removed)
  - `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` = ✅ Set (test mode). Stripe account: narriola23@gmail.com, sandbox "New business sandbox" (acct_1Tp99RCCSyBsaqPj). Webhook destination "energetic-glow" (we_1Tp9sdCCSyBsaqPjmM0DfTMG) → `https://prestige-rentals.onrender.com/api/webhooks/stripe`, events `payment_intent.succeeded` + `payment_intent.payment_failed`. Verified end-to-end on the live site with a test card (4242 4242 4242 4242) on 7/3/2026. **Still test mode — not live/real payments yet.**

## Local Development
- No `.env` file is gitignored by name (only `.env.local` and friends are, per `.gitignore`) — **always use `.env.local` for local secrets, never `.env`**, to avoid accidentally committing the DB connection string.
- Render's managed Postgres requires SSL even for local/external connections — `lib/db.ts` enables SSL for any non-localhost `DATABASE_URL` host (not tied to `NODE_ENV`, since `next dev` always forces `NODE_ENV=development`).
- To run against the real Render DB locally: grab the **External Database URL** from the Render dashboard (prestige-rentals-db → Connect → External) and put it in `.env.local` as `DATABASE_URL=...`. There is no staging database — this is the production DB, so be careful with test bookings (clean up test rows manually afterward).

## Email Setup
- Contact form at `/contact` POSTs to `/app/api/contact/route.ts`; quote form at `/quote` → `/app/api/quote/route.ts`. Both use Resend (resend.com) via native fetch — no npm package.
- **Custom domain `prestigerentalshouston.com` is verified in Resend (7/21/2026)** — DKIM + SPF (MX/TXT on `send.`) + DMARC records live at Porkbun. `from:` in both routes is `Prestige Rentals <notifications@prestigerentalshouston.com>`. (No inbound/receiving configured in Resend — send-only.)
- **Inbound `info@prestigerentalshouston.com` → forwards to `bounceprestigerentals@gmail.com`** via Porkbun free Email Forwarding (a business Gmail the client set up). This is the customer-facing display address shown site-wide. **Form submissions also go to `bounceprestigerentals@gmail.com` as of 7/22/2026** — the `CONTACT_EMAIL` env var on Render was pointed at the business Gmail, so both inbound `info@` mail and contact/quote submissions now land in the same client-owned inbox.
- ⚠️ Both API routes do `to: [toEmail]` from a single string (`app/api/contact/route.ts:16`, `app/api/quote/route.ts:16`), so `CONTACT_EMAIL` holds **exactly one address** — a comma-separated list will not work without a code change to split it.
- ⚠️ A Porkbun Email **Hosting** free trial (10GB, expires 2026-08-06) got auto-provisioned and sits "pending setup" — harmless, auto-removes if not set up; not used (we use forwarding, not hosting).

---

## Current State (as of 7/6/2026)

### What's done
- Repo created with full Next.js 14 + Tailwind + Postgres scaffold
- Render Blueprint deployed — web service and DB both running successfully
- Database upgraded to Basic 256MB (no expiry)
- Database migrated and seeded with the **real 9-inflatable inventory** + tables/chairs + 5 add-ons, and an expanded `service_zip_codes` list (~99 ZIPs across the 12 service-area cities, up from the original 51-ZIP starter)
- Availability-first booking flow built and tested end-to-end against the live DB (search → results → checkout → booking creation → admin), minus the live Stripe charge itself (no keys yet)
- A real distance-based delivery fee (free ≤20mi from the business address, $2/mile beyond) is live, replacing the old flat ZIP-whitelist/no-fee model
- Site is live at https://prestige-rentals.onrender.com

### Pages built ✅
- **Homepage** (`app/page.tsx`) — full rewrite with all 10 sections: hero, categories, featured inflatables, why us, how it works, party packages, testimonials, service areas (linked chips), FAQ preview, final CTA
- **FAQ** (`app/faq/page.tsx`) — 15 questions, 5 groups, FAQPage JSON-LD schema, `<details>/<summary>` accordion (no JS)
- **Policy pages** (all 6):
  - `app/policies/cancellation/page.tsx`
  - `app/policies/rain/page.tsx`
  - `app/policies/safety/page.tsx`
  - `app/policies/rental-agreement/page.tsx`
  - `app/policies/privacy/page.tsx`
  - `app/policies/terms/page.tsx`
- **Service areas** — index at `app/service-areas/page.tsx` + dynamic `app/service-areas/[city]/page.tsx` for all 12 cities (houston, katy, sugar-land, pearland, cypress, spring, the-woodlands, humble, conroe, tomball, jersey-village, klein). Each has unique metadata + LocalBusiness JSON-LD with areaServed.
- **Category pages** (all 7):
  - `app/rentals/bounce-houses/page.tsx` — fetches DB products (category: 'Bounce House') — 6 real products live
  - `app/rentals/water-slides/page.tsx` — fetches 'Water Slide' + 'Water Combo' — 3 real products live
  - `app/rentals/tables-chairs/page.tsx` — fetches 'Tables & Chairs' — Tables + Chairs live, falls back to call-to-inquire if the query returns nothing
  - `app/rentals/combo-units/page.tsx` — fetches 'Combo' + 'Water Combo' — **no real SKUs in this category**, shows the "inventory loading soon" fallback; tagline says "Call for current availability" instead of a price floor
  - `app/rentals/obstacle-courses/page.tsx` — fetches 'Obstacle Course' — **no real SKUs**, same fallback treatment as combo-units
  - `app/rentals/party-rentals/page.tsx` — call-to-inquire (no DB products)
  - `app/rentals/concessions/page.tsx` — call-to-inquire (concessions live only as an add-on, not a product)
- **Contact page** (`app/contact/page.tsx`) — phone (346) 244-3261, form wired to real API
- **Contact API** (`app/api/contact/route.ts`) — Resend integration, graceful fallback if no API key
- **Quote page** (`app/quote/page.tsx`) — standalone quote request form (name, email, phone, event date, event type, guest count, location, message), posts to `app/api/quote/route.ts` (same Resend pattern as contact, graceful fallback). Linked from Footer Quick Links, the homepage's custom-quote package CTA, and both `/availability` empty states (ZIP not serviceable / nothing available).

- **Availability-first booking flow** (replaces the old `/book` product-first wizard, which is deleted — `/book` and `/book/success` now 301-redirect to `/availability` and `/` respectively via `next.config.js`):
  - `components/AvailabilitySearchWidget.tsx` — the 2-field (start date, end date) search widget, `full` (inline form) and `compact` (link-only) variants. (The Delivery ZIP field was removed 7/9/2026 — ZIP/delivery-fee is now handled at checkout only, per client request.) Wired into every CTA site-wide: Header (desktop + mobile), Footer, homepage hero + final CTA + how-it-works + package cards, service-area index + city pages, FAQ, contact page, safety policy page, product detail page, and all 7 category pages' bottom CTA.
  - `app/availability/page.tsx` — combined search/results page (`?start=&end=&product=`). One empty state (nothing available for the date range, with ±1/±2 day quick-links). No ZIP/delivery-fee anywhere on this page.
  - `lib/availability.ts` — `isZipServiceable()`, `checkDateRangeAvailability()`, `getAvailableProducts()` (dates only — no ZIP gate). ZIP coverage is one business-wide whitelist (`service_zip_codes` table), enforced only at booking time by `app/api/bookings/route.ts` as a backstop.
  - `app/checkout/page.tsx` + `CheckoutForm.tsx` + `app/checkout/confirmation/page.tsx` — 3-step checkout (customer info → deposit/full choice → Stripe Payment Element). Multi-day pricing = `base_price × nights`; deposit stays the flat `deposit_amount` regardless of trip length.
  - Booking lifecycle: row created as `status='pending_payment'` right after the payment-option step (reserves the slot immediately); `getAvailableProducts` ignores `pending_payment` rows older than 30 minutes so abandoned checkouts don't permanently lock a slot. The Stripe webhook (not the client redirect) is the source of truth for `confirmed`/`paid`.
  - `db/schema.sql` additions: `bookings.end_date` (date-range support), `service_zip_codes` table, and payment columns on `bookings` (`payment_type`, `payment_status`, `stripe_payment_intent_id`, `amount_charged`, `paid_at`) — no separate `payments` table, kept flat to match the existing schema convention.

### Stripe (live in test mode as of 7/3/2026)
- `lib/stripe.ts`, `app/api/checkout/create-payment-intent/route.ts`, `app/api/webhooks/stripe/route.ts` are wired into checkout and keys are set on Render (see "Render Deployment" above for account/webhook details).
- Verified end-to-end on the live production site with a Stripe test card: checkout → payment succeeded → webhook delivered (200 OK) → booking flipped to `confirmed`/`paid` in the DB → confirmation page rendered correctly.
- `getStripe()` still returns `null` gracefully if keys are ever missing/removed → checkout falls back to "payments aren't set up online yet, call us — your dates are reserved" → booking is still created and visible/manageable in `/admin/bookings` (`Mark Paid` action covers this manual-payment path).
- **Still test mode, not live/real payments.** To accept real charges: switch the Stripe account out of the sandbox, generate live-mode keys, create a separate live-mode webhook endpoint for the same URL/events, swap the 3 Render env vars.
- **Payment methods: card only (client decision, 7/23/2026).** `create-payment-intent/route.ts` pins `payment_method_types: ['card']` (PR #29) — this drops Link and the BNPL/alt methods (Klarna, Cash App Pay, Amazon Pay, Affirm) that `automatic_payment_methods` was surfacing, and keeps them from reappearing on a future Stripe default change. **Apple Pay + Google Pay still work** — they're wallet presentations of a card, not separate method types.
- **Apple/Google Pay wallets:** enabled by registering the payment-method domain in the Stripe Dashboard (no repo change — Stripe auto-hosts the Apple domain-association file). Done in the **test sandbox** 7/23/2026 (`prestigerentalshouston.com` → `pmd_1TwCdZCCSyBsaqPj4BLc5WNL`, status Enabled). ⚠️ **Per-mode — must be re-registered in live mode at go-live** (see Next Steps #4). Wallets only render on supported devices/browsers (Apple Pay: Safari/iOS/macOS with a Wallet card; Google Pay: Chrome with a saved card) — desktop Chrome on Windows showing neither is normal, not a bug.

### Real inventory + distance-based delivery fee (live as of 7/6/2026)
- `db/seed.sql` deactivates the 5 original placeholder products (`is_active = false`, not deleted — keeps booking history/FKs intact) and upserts the real 9 inflatables (Marvel Adventures, The Astronaut, Single/Double Princess Waterslide, The Sun, The Sunny Slide, The Tropical, The Castle, The White Castle) + Tables + Chairs + 5 add-ons. Category is assigned by actual wet/dry type, not product name — e.g. "The Tropical" and "The Castle" are Dry → Bounce House.
- `products` gained `wet_dry` and `special_requirements` columns; new `product_images` table (real photo galleries — 8 of 9 inflatables have real photos, in `public/images/products/<slug>/<n>.jpg`, committed to git after being resized via `scripts/process-product-images.js` using `sharp`); new `add_ons` table, shown informationally on product pages (not yet selectable at checkout).
- The White Castle has no real photos yet — `app/rentals/[slug]/page.tsx` falls back to a placeholder image for it. (The Sun and The Sunny Slide got real photos on 7/9/2026.)
- `lib/zip-coordinates.ts` (static ZIP→lat/lng centroid table, geocoded once via the free `api.zippopotam.us` API, no key/account needed) + `lib/delivery-fee.ts` (`calculateDeliveryFee(zip)`, haversine straight-line distance from origin ZIP 77069 — free ≤20mi, $2/mile for the full distance beyond, matching the client's stated policy). This is a deliberate straight-line approximation, not driving distance, to avoid needing a paid Google Maps API/account.
- Wired into `lib/bookings.ts` (`createBooking` stores `bookings.delivery_fee`), `app/api/checkout/create-payment-intent/route.ts` (charges `subtotal + delivery_fee` for full payment), `CheckoutForm.tsx` (fee computed live from the ZIP the customer types in the checkout address form), `/checkout/confirmation`, and `/admin/bookings`. **As of 7/9/2026 the fee is intentionally NOT shown anywhere before checkout** (no availability-page fee chip, no "free delivery within 20 miles" marketing copy anywhere) — client wants delivery priced only from the full address at checkout/quote time.
- `service_zip_codes` expanded from the original 51-ZIP starter to ~99 ZIPs (additive — old list untouched) from the client's intake spreadsheet.

### Party packages + SEO pass (live as of 7/6/2026)
- `/packages` index + 5 package pages (`backyard-birthday`, `summer-water-slide`, `school-church`, `toddler`, `large-event`) — the first three pull real products from the DB (bounce houses, wet-capable units, and the 3 smallest-footprint units respectively); the last two are quote-driven with no single product mapping, and `large-event` also surfaces the `add_ons` table. Homepage's 3 featured package cards link to their pages; footer has a `/packages` Quick Link.
- `app/sitemap.ts` — covers all static routes, all 12 service-area pages, all 5 package pages, and every active product (queried live from the DB).
- `app/robots.ts` — disallows `/admin`, `/checkout`, `/api`; points at the sitemap.
- Site-wide `LocalBusiness` JSON-LD in `app/layout.tsx` (no street address published, matching the existing city-page schema convention).
- `app/rentals/[slug]/page.tsx` now has `generateMetadata` (previously had **no** per-product title/description — every product page silently inherited the generic site-wide title) plus `Product` JSON-LD with absolute image URLs and an `Offer`.
- New `lib/site.ts` holds the site's base URL (`https://prestige-rentals.onrender.com`) as a single constant — update this when the custom domain lands. Note: `app/service-areas/[city]/page.tsx` still has its own separately-hardcoded copy of this URL in its own schema block, predates `lib/site.ts`, not yet refactored to use it.

### Components updated
- `components/Header.tsx` — added FAQ link; "Book Now" replaced with the availability widget (`compact` variant)
- `components/Footer.tsx` — 4-column layout (Quick Links, Policies, Service Areas, Contact); "Book Online" now points to `/availability`
- `lib/products.ts` — added `getProductsByCategories(categories: string[])` function
- `lib/bookings.ts` — `createBooking()` now takes a date range + `paymentType`, returns `{bookingId, bookingNumber}`; added `getBookingByNumber()`. Old single-date `checkAvailability()` left in place as unused legacy code.
- `lib/db.ts` — SSL now determined by DB host (not `NODE_ENV`), so local dev against the real Render DB works (see "Local Development" above)
- `app/admin/bookings/page.tsx` + `actions.tsx` — payment column now shows `payment_status`/`payment_type` badge instead of the old `deposit_paid` ✅/⏳; new `MarkPaymentPaid` action

### Admin access & auth (hardened 7/22/2026)
- **URL:** `/admin` → redirects to `/admin/login`. One shared password, the `ADMIN_PASSWORD` env var on Render. No per-user accounts.
- **Session:** `app/api/admin/auth/route.ts` sets an `admin_auth` cookie (httpOnly, secure in prod, sameSite lax, 7-day expiry). `middleware.ts` validates it on every admin request.
- **The cookie stores a SHA-256 hash of the password, not the password itself** (`lib/admin-auth.ts`). It was previously the raw password, so anyone who obtained the cookie also obtained the password. **Changing this invalidated all existing sessions — everyone had to log in once after the 7/22 deploy.** Keep `middleware.ts` and the auth route in sync; they must hash identically or nobody can log in.
- **`middleware.ts`'s matcher covers `/admin/:path*` AND `/api/admin/:path*`.** ⚠️ Do not narrow it. Before 7/22 it matched only `/admin/*`, which left every admin API route open to the internet — `PATCH /api/admin/bookings/{id}/mark-paid` needed no body and no auth, so any booking could be marked paid and confirmed by anyone who guessed a (sequential, enumerable) booking id. **Any new admin API route is protected automatically by living under `/api/admin/` — put it there.**
- `PUBLIC_ADMIN_ROUTES` in `middleware.ts` is the deliberate allowlist: `/admin/login`, `/api/admin/auth`, `/api/admin/logout`. Nothing else belongs in it.
- Unauthenticated admin API calls get `401 {"error":"Unauthorized"}`; unauthenticated page loads get a 307 to the login form.
- Login is rate limited to 10 attempts per IP per 15 min (in-memory, in the auth route). This relies on the service running a **single instance** — if `numInstances` is ever raised, move this to the DB or a shared store or it silently weakens.
- **Known remaining limits (accepted, not bugs):** one shared password means no audit trail of which stakeholder did what, and no way to revoke one person without rotating for everyone. Posting a malformed JSON body to the auth route returns 500 rather than 400 (pre-existing, cosmetic). Real per-user accounts are the fix if admin access ever goes beyond a few trusted people.

### ⚠️ Known issues / watch items
- Combo-units and obstacle-courses category pages have zero real SKUs backing them — they show a graceful fallback, and as of 7/10 they (plus Party Rentals and Concessions) are **hidden from the homepage category grid** until inventory exists (see homepage note below)
- The White Castle has no real photos yet (placeholder fallback)
- Add-ons are seeded and displayed on product pages, but aren't yet selectable/priced into the checkout flow itself — informational only for now
- Delivery fee uses straight-line (haversine) ZIP-centroid distance, not real driving distance — a deliberate simplification, revisit if it proves inaccurate in practice
- `service_zip_codes` now has ~99 ZIPs from the client's intake list — still not necessarily exhaustive of the real delivery radius
- ~~Resend sends from `onboarding@resend.dev` until custom domain verified~~ — resolved 7/21/2026, now sends from `notifications@prestigerentalshouston.com`
- **Phone number is now (346) 244-3261 everywhere in code** (old 832-716-1836 fully removed; Footer hardcodes the new number rather than reading the env var). ⚠️ The `NEXT_PUBLIC_BUSINESS_PHONE` Render env var still holds the old `8327161836` — it's only consumed server-side now (the payment-intent SMS-notification fallback), but **update it to (346) 244-3261 on Render** to fully retire the old number.
- Static route pages use `export const dynamic = "force-dynamic"` for DB fetches
- Stripe is live in test mode, not real/live payments yet (see "Stripe" above)

---

## Next Steps (priority order)

### 1. ✅ DONE (7/21/2026) — Custom domain `prestigerentalshouston.com` is live
Bought at Porkbun. Pointed at Render (apex `A → 216.24.57.1` + `www` CNAME → onrender, www redirects to apex), SSL issued. `SITE_URL` updated (feeds sitemap/robots/schema), and a Host-based 308 permanent redirect sends all `prestige-rentals.onrender.com` traffic to the custom domain. Email domain verified in Resend + `info@` forwarding set up (see Email Setup).
- **Porkbun DNS gotchas (for next time):** the DNS editor is write-only (never lists existing records) and stages edits behind a "Submit Records" button; "Do not delete existing records" must stay CHECKED to merge (unchecking = replace-all). Apex must be an **A record to `216.24.57.1`, NOT an ALIAS** — the ALIAS flattens to Cloudflare IPs with an AAAA that Render's apex verification rejects.

### 2. ✅ DONE (7/22/2026) — Google Search Console is set up and verified
Domain property `prestigerentalshouston.com` created under **`bounceprestigerentals@gmail.com`** (the client's business Gmail), verified via DNS TXT at Porkbun (`google-site-verification=lasbXpQnIRSPN5UHy2zYPY9W3xUmYJpkQGBouNh2rH0`, host blank/root, TTL 600 — **do not remove this record or verification is lost**). `https://prestigerentalshouston.com/sitemap.xml` submitted; status **Success, 49 pages discovered**. A formal "Change of Address" from the onrender.com URL isn't possible (can't domain-verify an onrender subdomain) — the 308 redirect above is the substitute.
- **Notes for next time:** Porkbun's per-record "Add Record" form still stages behind **Submit Records** with "Do not delete existing records" CHECKED (it was, and the A record + SPF/DKIM survived — verified via `nslookup`). Search Console showed **"Couldn't fetch"** immediately after submitting the sitemap; that was premature — it flipped to **Success** on the next page load. Don't chase it.
- Nothing to watch here for a few days; indexing data (Performance/Pages) will start populating on its own.

### 3. ✅ DONE (7/22/2026) — form submissions point at the business Gmail
`CONTACT_EMAIL` on Render set to `bounceprestigerentals@gmail.com`. No code change; the env var update triggered a redeploy. Contact and quote submissions now land in the same client-owned inbox as forwarded `info@` mail.

### 4. Switch Stripe to live mode — THE LAST BIG ITEM (waiting on the client's go-ahead)
- See "Stripe" section above for exact steps. Client has not green-lit real payments yet; do not switch without an explicit go-ahead.
- ✅ The admin API auth fix that was blocking this is **deployed and verified in production** (7/22/2026, PR #27 — see "Admin access & auth"). While `/api/admin/bookings/{id}/mark-paid` was unauthenticated, anyone could mark their own booking paid — harmless in test mode, but a way to take real inventory for free once live payments are on. That risk is closed; nothing else gates going live.
- **Suggested pre-flight when the go-ahead comes, in this order:**
  1. Rotate `ADMIN_PASSWORD` on Render — it's about to guard real money rather than test-mode bookings. Set it in the Render UI directly so the value never lands in a transcript; everyone re-logs-in afterward.
  2. Swap the 3 Stripe env vars to live keys + create the live-mode webhook endpoint (same URL and events as the test one).
  3. **Register the payment-method domain in LIVE mode** (Stripe Dashboard → Settings → Payments → Payment method domains → Add `prestigerentalshouston.com`). This enables Apple Pay / Google Pay wallets in the live PaymentElement — Stripe auto-hosts the Apple domain-association file, no repo change. **Already done in the test sandbox (7/23/2026, `pmd_1TwCdZCCSyBsaqPj4BLc5WNL`, Enabled), but domain registration is per-mode — the sandbox one does NOT carry to live.** Registering in live also cascades back down to sandboxes automatically.
  4. Confirm the account's active payment methods are card-only (Klarna / Cash App Pay / Amazon Pay / Affirm / Link toggled off) — those settings are also per-mode, so re-check them in live even though PR #29 pins `payment_method_types: ['card']` in code (the code pin is the real guarantee; the Dashboard toggles are belt-and-suspenders).
  5. Re-run the unauthenticated admin probes against production after the redeploy (`PATCH /api/admin/bookings/999999/status` etc. should be `401`) — cheap, and confirms nothing regressed on the way to live.
  6. Do one small real-card transaction end-to-end, then refund it, before telling the client they're open for business.

### Later / not yet scheduled
- **Per-user admin accounts** if admin access grows beyond a few trusted people — one shared password means no audit trail of who changed what, and no way to revoke one person without rotating for everyone. Not urgent at the current headcount; see "Admin access & auth".
- Wire add-ons into the checkout flow itself (currently informational-only on product pages)
- Consider a real driving-distance API (e.g. Google Distance Matrix) if the haversine delivery-fee approximation proves inaccurate
- Source real photos for The White Castle
- Decide whether combo-units/obstacle-courses categories get real SKUs or should be removed from site navigation

---

## Update This Section After Every Session
**Last updated:** 7/23/2026
**Last thing completed:** **Payment-method cleanup + wallet setup, ahead of Stripe go-live.** Per a client note (screenshot showed Klarna / Cash App / Amazon Pay / Link at checkout):
- **Card only, pinned in code** (PR #29): `create-payment-intent/route.ts` now uses `payment_method_types: ['card']` instead of `automatic_payment_methods`, dropping Link + all BNPL/alt methods and preventing Stripe from re-adding them on a future default change. Apple/Google Pay survive (they're card wallets). Build passes.
- **Apple/Google Pay enabled** by registering the payment-method domain `prestigerentalshouston.com` in the Stripe **test sandbox** (`pmd_1TwCdZCCSyBsaqPj4BLc5WNL`, Enabled). No repo change — Stripe auto-hosts the Apple domain-association file. ⚠️ Per-mode: must be re-registered in live at go-live (now step 3 of the Next Steps #4 pre-flight).
- Answered client questions in-chat: the "stripe Developers" panel at checkout is a **test-mode-only** Stripe.js injection that vanishes with live keys (not a bug, not a security hole); **1099-K threshold for TY2026 is $20,000 AND 200+ transactions** (the "$600" rule was repealed by the OBBBA, July 2025 — verified, not from memory); Stripe live needs a **bank account** (routing/acct for payouts) and **SSN** (sole-proprietor, no LLC/EIN required though EIN avoids sharing SSN); card income is already taxable, the 1099-K only changes *reporting* — flagged TX sales-tax-on-rentals as a CPA question.

**Open items handed to the client:** photos for **White Castle, Tables, Chairs** (confirmed the only 3 active products with 0 images — send them and they get processed/seeded); **bank + identity info** for live-mode activation (entered directly in Stripe by the client, not something Claude touches).

Earlier this session (7/22): **Admin API auth hole closed** (PR #27, deployed + verified in prod — `middleware.ts` only matched `/admin/*` not `/api/admin/*`, leaving all admin API routes callable unauthenticated; `mark-paid` was the worst. Narri confirmed admin login still works after the cookie-format change). **Search Console** verified + sitemap submitted (49 pages). **`CONTACT_EMAIL`** pointed at the business Gmail, confirmed end-to-end.

**Next session should start at:** #4, Stripe live mode — the last item, **gated on the client's explicit go-ahead** (Narri said they'll give the word; do NOT switch on your own initiative). When the word comes, follow the 6-step pre-flight in Next Steps #4 (rotate `ADMIN_PASSWORD` → live keys + webhook → **re-register wallet domain in live** → re-confirm card-only toggles in live → re-run admin probes → one real-card transaction + refund). Before or independent of that: process the 3 product photos when the client sends them.
**Open PRs to merge:** none — #29 and #30 merged at end of this session; #26–#28 already merged.

---

### Prior session (7/22/2026, second) — admin auth + Search Console + CONTACT_EMAIL
Full detail folded into the 7/23 entry above and the "Admin access & auth" section. Key facts: PR #27 closed the unauthenticated admin-API write hole (verified in prod, `401` on all three routes, allowlist intact, public site unaffected); Search Console property under `bounceprestigerentals@gmail.com` verified via Porkbun DNS TXT with the sitemap reading Success/49 pages; `CONTACT_EMAIL` on Render → business Gmail. PRs #26, #27, #28 merged.

### Prior session (7/22/2026, first) — custom domain cutover
**Completed:** **Custom domain cutover — `prestigerentalshouston.com` is live** (PR #24, merged). Bought at Porkbun; added to Render as apex (primary) + www (redirects to apex); apex `A → 216.24.57.1` (NOT ALIAS — see Next Steps gotcha), www CNAME → onrender; SSL issued for both. Code: `SITE_URL` → custom domain (feeds sitemap/robots/schema), city-page URL refactored to import `SITE_URL`, display email `info@prestigerentals.com` → `info@prestigerentalshouston.com` everywhere (old was a domain we don't own), Resend `from:` → `notifications@prestigerentalshouston.com`, and a Host-based 308 redirect from the onrender.com host → custom domain. Resend email domain verified (DKIM/SPF/DMARC at Porkbun). Porkbun email forwarding `info@prestigerentalshouston.com` → `bounceprestigerentals@gmail.com`. Verified live in prod: HTTPS+valid SSL on the custom domain, onrender→custom 308 redirect, sitemap emits custom-domain URLs. Earlier this session: PR #23 (7/10 task list) merged + `NEXT_PUBLIC_BUSINESS_PHONE` Render env var updated to (346) 244-3261.
PRs #23, #24 and #25 all merged.

---

### Prior session (7/10/2026) — client task list (`prestige-updates-2026-07-10.md`), PR #23:
1. **Phone number swap** — replaced 832-716-1836 with (346) 244-3261 / `tel:+13462443261` site-wide (~27 files); Footer now hardcodes it instead of reading `NEXT_PUBLIC_BUSINESS_PHONE`. ⚠️ Still need to update that Render env var (see Known Issues).
2. **Empty catalog sections hidden** — homepage category grid is now DB-driven (`getActiveCategories()` in `lib/products.ts`, homepage is now `force-dynamic`); a card only shows if one of its backing `cats` has active inventory. Currently shows Bounce Houses / Water Slides / Tables & Chairs; hides Combo Units, Obstacle Courses, Party Rentals, Concessions. They reappear automatically when matching products are seeded. (Concessions elotero cart is on hold per Leslie & Eri.)
3. **Availability ZIP gate re-added** ⚠️ **This reverses PR #22 (7/9), which removed ZIP from availability.** The search widget has a required Delivery ZIP field again; the availability page checks `isZipServiceable(zip)` and shows a "call / request a custom quote" prompt for out-of-area ZIPs (no fee shown — delivery is still priced only at checkout from the full address). Confirm the client really wants this back given it was just removed.
4. **Availability results ordering** — inflatables first (price high→low), Tables & Chairs last.
5. **Response-time copy** — "within 2 hours / a few hours" → "1–2 business days" (homepage, FAQ, contact + quote success messages, city pages).

Verified locally against the live DB (read-only): homepage shows only the 3 stocked categories; in-area ZIP orders $255→$100 then Tables/Chairs; out-of-area ZIP shows the quote prompt with no fee; `next build` passes.
**Next session should start at:** Merge/verify the above PR, then update the `NEXT_PUBLIC_BUSINESS_PHONE` Render env var. Then: buying a custom domain (Next Steps #1) — the last big pre-launch item — followed by Stripe live mode when the client is ready for real payments. Task 6 (custom-domain SSL/trust check) and Task 7 (payments-without-an-LLC: sole-proprietor Stripe uses an SSN, no LLC required — confirm with the processor) are both waiting on the domain purchase / a business decision, not code.
