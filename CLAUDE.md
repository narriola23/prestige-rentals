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
- `/lib` — shared utilities (`db.ts`, `bookings.ts`, `products.ts`)

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

## Email Setup
- Contact form at `/contact` POSTs to `/app/api/contact/route.ts`
- Uses Resend (resend.com) via native fetch — no npm package needed
- From address is `onboarding@resend.dev` until a custom domain is verified on Resend
- To enable a custom from address (e.g. hello@prestigerentals.com): verify domain in Resend dashboard → Domains, then update `from:` in `app/api/contact/route.ts`

---

## Current State (as of 7/2/2026)

### What's done
- Repo created with full Next.js 14 + Tailwind + Postgres scaffold
- Render Blueprint deployed — web service and DB both running successfully
- Database upgraded to Basic 256MB (no expiry)
- Database migrated and seeded with 5 products
- Booking flow verified end-to-end
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
  - `app/rentals/bounce-houses/page.tsx` — fetches DB products (category: 'Bounce House')
  - `app/rentals/water-slides/page.tsx` — fetches 'Water Slide' + 'Water Combo'
  - `app/rentals/combo-units/page.tsx` — fetches 'Combo' + 'Water Combo'
  - `app/rentals/obstacle-courses/page.tsx` — fetches 'Obstacle Course'
  - `app/rentals/party-rentals/page.tsx` — call-to-inquire (no DB products yet)
  - `app/rentals/tables-chairs/page.tsx` — call-to-inquire (no DB products yet)
  - `app/rentals/concessions/page.tsx` — call-to-inquire (no DB products yet)
- **Contact page** (`app/contact/page.tsx`) — phone (346) 244-3261, form wired to real API
- **Contact API** (`app/api/contact/route.ts`) — Resend integration, graceful fallback if no API key

### Components updated
- `components/Header.tsx` — added FAQ link
- `components/Footer.tsx` — 4-column layout (Quick Links, Policies, Service Areas, Contact)
- `lib/products.ts` — added `getProductsByCategories(categories: string[])` function

### ⚠️ Known issues / watch items
- Only 5 seed products in DB — real inventory not yet added
- Resend sends from `onboarding@resend.dev` until custom domain verified
- `NEXT_PUBLIC_BUSINESS_PHONE` env var (8327161836) is not yet used by all pages — contact page hardcodes (346) 244-3261 separately
- Static route pages use `export const dynamic = "force-dynamic"` for DB fetches

---

## Next Steps (priority order)

### 1. Quote request page (`/quote`)
- Standalone form for customers who want a quote before booking
- Fields: name, email, phone, event date, event type, estimated guest count, location, message
- Posts to `/api/quote` (same Resend setup as contact)

### 2. Party package pages (5 pages)
- `/packages/backyard-birthday`
- `/packages/summer-water-slide`
- `/packages/school-church`
- `/packages/toddler`
- `/packages/large-event`
- Each: hero, what's included list, pricing, CTA to book/call

### 3. SEO pass
- `app/sitemap.ts` — auto-generated sitemap including all service area + category pages
- `app/robots.ts` — robots.txt
- LocalBusiness JSON-LD in `app/layout.tsx`
- Product schema on individual product pages

### 4. Real product inventory
- Replace 5 seed products with real photos, descriptions, and prices
- Add missing categories: Toddler, Party Rentals, Tables & Chairs, Concessions

### 5. Resend custom domain (when domain is purchased)
- Verify domain in Resend → update `from:` in `app/api/contact/route.ts`

---

## Update This Section After Every Session
**Last updated:** 7/2/2026
**Last thing completed:** Contact page fixed (phone + real email via Resend), RESEND_API_KEY added to Render, all category pages + service area pages + policy pages + FAQ built
**Next session should start at:** Quote request page (`/quote`)
