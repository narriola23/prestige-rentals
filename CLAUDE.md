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
  - `CONTACT_EMAIL` = not set (defaults to narriola23@gmail.com in the API route)
  - `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` = ✅ Set (test mode). Stripe account: narriola23@gmail.com, sandbox "New business sandbox" (acct_1Tp99RCCSyBsaqPj). Webhook destination "energetic-glow" (we_1Tp9sdCCSyBsaqPjmM0DfTMG) → `https://prestige-rentals.onrender.com/api/webhooks/stripe`, events `payment_intent.succeeded` + `payment_intent.payment_failed`. Verified end-to-end on the live site with a test card (4242 4242 4242 4242) on 7/3/2026. **Still test mode — not live/real payments yet.**

## Local Development
- No `.env` file is gitignored by name (only `.env.local` and friends are, per `.gitignore`) — **always use `.env.local` for local secrets, never `.env`**, to avoid accidentally committing the DB connection string.
- Render's managed Postgres requires SSL even for local/external connections — `lib/db.ts` enables SSL for any non-localhost `DATABASE_URL` host (not tied to `NODE_ENV`, since `next dev` always forces `NODE_ENV=development`).
- To run against the real Render DB locally: grab the **External Database URL** from the Render dashboard (prestige-rentals-db → Connect → External) and put it in `.env.local` as `DATABASE_URL=...`. There is no staging database — this is the production DB, so be careful with test bookings (clean up test rows manually afterward).

## Email Setup
- Contact form at `/contact` POSTs to `/app/api/contact/route.ts`
- Uses Resend (resend.com) via native fetch — no npm package needed
- From address is `onboarding@resend.dev` until a custom domain is verified on Resend
- To enable a custom from address (e.g. hello@prestigerentals.com): verify domain in Resend dashboard → Domains, then update `from:` in `app/api/contact/route.ts`

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
  - `components/AvailabilitySearchWidget.tsx` — the 3-field (start date, end date, ZIP) search widget, `full` (inline form) and `compact` (link-only) variants. Wired into every CTA site-wide: Header (desktop + mobile), Footer, homepage hero + final CTA + how-it-works + package cards, service-area index + city pages, FAQ, contact page, safety policy page, product detail page, and all 7 category pages' bottom CTA.
  - `app/availability/page.tsx` — combined search/results page (`?start=&end=&zip=&product=`). Two distinct empty states (ZIP not serviceable vs. nothing available for the date range, the latter with ±1/±2 day quick-links). Falls back to `/contact` + `tel:`/`sms:` links since `/quote` still doesn't exist.
  - `lib/availability.ts` — `isZipServiceable()`, `checkDateRangeAvailability()`, `getAvailableProducts()`. ZIP coverage is one business-wide whitelist (`service_zip_codes` table), not per-product.
  - `app/checkout/page.tsx` + `CheckoutForm.tsx` + `app/checkout/confirmation/page.tsx` — 3-step checkout (customer info → deposit/full choice → Stripe Payment Element). Multi-day pricing = `base_price × nights`; deposit stays the flat `deposit_amount` regardless of trip length.
  - Booking lifecycle: row created as `status='pending_payment'` right after the payment-option step (reserves the slot immediately); `getAvailableProducts` ignores `pending_payment` rows older than 30 minutes so abandoned checkouts don't permanently lock a slot. The Stripe webhook (not the client redirect) is the source of truth for `confirmed`/`paid`.
  - `db/schema.sql` additions: `bookings.end_date` (date-range support), `service_zip_codes` table, and payment columns on `bookings` (`payment_type`, `payment_status`, `stripe_payment_intent_id`, `amount_charged`, `paid_at`) — no separate `payments` table, kept flat to match the existing schema convention.

### Stripe (live in test mode as of 7/3/2026)
- `lib/stripe.ts`, `app/api/checkout/create-payment-intent/route.ts`, `app/api/webhooks/stripe/route.ts` are wired into checkout and keys are set on Render (see "Render Deployment" above for account/webhook details).
- Verified end-to-end on the live production site with a Stripe test card: checkout → payment succeeded → webhook delivered (200 OK) → booking flipped to `confirmed`/`paid` in the DB → confirmation page rendered correctly.
- `getStripe()` still returns `null` gracefully if keys are ever missing/removed → checkout falls back to "payments aren't set up online yet, call us — your dates are reserved" → booking is still created and visible/manageable in `/admin/bookings` (`Mark Paid` action covers this manual-payment path).
- **Still test mode, not live/real payments.** To accept real charges: switch the Stripe account out of the sandbox, generate live-mode keys, create a separate live-mode webhook endpoint for the same URL/events, swap the 3 Render env vars.

### Real inventory + distance-based delivery fee (live as of 7/6/2026)
- `db/seed.sql` deactivates the 5 original placeholder products (`is_active = false`, not deleted — keeps booking history/FKs intact) and upserts the real 9 inflatables (Marvel Adventures, The Astronaut, Single/Double Princess Waterslide, The Sun, The Sunny Slide, The Tropical, The Castle, The White Castle) + Tables + Chairs + 5 add-ons. Category is assigned by actual wet/dry type, not product name — e.g. "The Tropical" and "The Castle" are Dry → Bounce House.
- `products` gained `wet_dry` and `special_requirements` columns; new `product_images` table (real photo galleries — 6 of 9 inflatables have real photos, in `public/images/products/<slug>/<n>.jpg`, committed to git after being resized via `scripts/process-product-images.js` using `sharp`); new `add_ons` table, shown informationally on product pages (not yet selectable at checkout).
- The Sun, The Sunny Slide, and The White Castle have no real photos yet — `app/rentals/[slug]/page.tsx` falls back to a placeholder image for them.
- `lib/zip-coordinates.ts` (static ZIP→lat/lng centroid table, geocoded once via the free `api.zippopotam.us` API, no key/account needed) + `lib/delivery-fee.ts` (`calculateDeliveryFee(zip)`, haversine straight-line distance from origin ZIP 77069 — free ≤20mi, $2/mile for the full distance beyond, matching the client's stated policy). This is a deliberate straight-line approximation, not driving distance, to avoid needing a paid Google Maps API/account.
- Wired into `lib/bookings.ts` (`createBooking` stores `bookings.delivery_fee`), `app/api/checkout/create-payment-intent/route.ts` (charges `subtotal + delivery_fee` for full payment), `CheckoutForm.tsx`, `/checkout/confirmation`, `/admin/bookings`, and `/availability` (shows the fee for the searched ZIP before booking).
- `service_zip_codes` expanded from the original 51-ZIP starter to ~99 ZIPs (additive — old list untouched) from the client's intake spreadsheet.

### Components updated
- `components/Header.tsx` — added FAQ link; "Book Now" replaced with the availability widget (`compact` variant)
- `components/Footer.tsx` — 4-column layout (Quick Links, Policies, Service Areas, Contact); "Book Online" now points to `/availability`
- `lib/products.ts` — added `getProductsByCategories(categories: string[])` function
- `lib/bookings.ts` — `createBooking()` now takes a date range + `paymentType`, returns `{bookingId, bookingNumber}`; added `getBookingByNumber()`. Old single-date `checkAvailability()` left in place as unused legacy code.
- `lib/db.ts` — SSL now determined by DB host (not `NODE_ENV`), so local dev against the real Render DB works (see "Local Development" above)
- `app/admin/bookings/page.tsx` + `actions.tsx` — payment column now shows `payment_status`/`payment_type` badge instead of the old `deposit_paid` ✅/⏳; new `MarkPaymentPaid` action

### ⚠️ Known issues / watch items
- Combo-units and obstacle-courses category pages have zero real SKUs backing them now that the placeholders are deactivated — they show a graceful fallback, but there's no real inventory in those categories at all
- The Sun, The Sunny Slide, and The White Castle have no real photos yet (placeholder fallback)
- Add-ons are seeded and displayed on product pages, but aren't yet selectable/priced into the checkout flow itself — informational only for now
- Delivery fee uses straight-line (haversine) ZIP-centroid distance, not real driving distance — a deliberate simplification, revisit if it proves inaccurate in practice
- `service_zip_codes` now has ~99 ZIPs from the client's intake list — still not necessarily exhaustive of the real delivery radius
- Resend sends from `onboarding@resend.dev` until custom domain verified
- `NEXT_PUBLIC_BUSINESS_PHONE` env var (8327161836) is not yet used by all pages — contact page hardcodes (346) 244-3261 separately
- Static route pages use `export const dynamic = "force-dynamic"` for DB fetches
- Stripe is live in test mode, not real/live payments yet (see "Stripe" above)

---

## Next Steps (priority order)

### 1. Party package pages (5 pages)
- `/packages/backyard-birthday`
- `/packages/summer-water-slide`
- `/packages/school-church`
- `/packages/toddler`
- `/packages/large-event`
- Each: hero, what's included list, pricing, CTA to book/call

### 2. SEO pass
- `app/sitemap.ts` — auto-generated sitemap including all service area + category pages (add `/availability`, `/quote`; `/checkout` should stay unindexed)
- `app/robots.ts` — robots.txt
- LocalBusiness JSON-LD in `app/layout.tsx`
- Product schema on individual product pages

### 3. Resend custom domain (when domain is purchased)
- Verify domain in Resend → update `from:` in `app/api/contact/route.ts`

### 4. Switch Stripe to live mode (when ready to accept real payments)
- See "Stripe" section above for exact steps

### Later / not yet scheduled
- Wire add-ons into the checkout flow itself (currently informational-only on product pages)
- Consider a real driving-distance API (e.g. Google Distance Matrix) if the haversine delivery-fee approximation proves inaccurate
- Source real photos for The Sun, The Sunny Slide, and The White Castle
- Decide whether combo-units/obstacle-courses categories get real SKUs or should be removed from site navigation

---

## Update This Section After Every Session
**Last updated:** 7/6/2026
**Last thing completed:** Real inventory import (9 real inflatables + tables/chairs + 5 add-ons, real photo galleries, expanded ZIP list) and a real distance-based delivery fee (free ≤20mi, $2/mile beyond, haversine ZIP-centroid distance) — PR #16, merged and migrated live against production, verified end-to-end on the live site.
**Next session should start at:** Party package pages (5 pages)
