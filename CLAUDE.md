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
- Database: `prestige-rentals-db` (PostgreSQL) ✅ running
- Blueprint ID: exs-d8rlsa67r5hc73egnb30
- Live URL: https://prestige-rentals.onrender.com
- Environment variables set on Render:
  - `NEXT_PUBLIC_BUSINESS_PHONE` = 8327161836
  - `ADMIN_PASSWORD` = PR3st1ge#Rentals2026!
  - `DATABASE_URL` = ✅ Set (Internal Database URL from prestige-rentals-db)

---

## Current State (as of 6/28/2026)

### What's done
- Repo created with full Next.js 14 + Tailwind + Postgres scaffold
- Render Blueprint deployed — web service and DB both running successfully
- `next.config.js` includes explicit webpack alias fix for `@/` path resolution
- Node version pinned to 20.x in `package.json`
- `render.yaml` present in repo
- `package-lock.json` committed — deterministic installs (402 packages)
- All build-time dependencies moved to `dependencies` (typescript, @types/*, eslint, tailwindcss, postcss, autoprefixer) — Render skips devDependencies in production
- DATABASE_URL added to Render environment variables
- Database migrated (`schema.sql`) and seeded (`seed.sql`) with 5 products
- **Booking flow verified end-to-end** — customer can browse, select, book, and see confirmation page
- Site is live at https://prestige-rentals.onrender.com

### ⚠️ Known issues / watch items
- Free Render DB (`prestige-rentals-db`) **expires July 20, 2026** — upgrade to paid instance or data will be deleted
- Render shell access requires paid plan (Starter+) — run migrations locally using external DB URL if needed
- Only 5 seed products in DB — real inventory not yet added

---

## Next Steps

### Immediate
- **Upgrade Render DB before July 20, 2026** to avoid data loss

### Next session — Page audit
- Review what pages currently exist in `/app` vs the full Required Pages list above
- Identify gaps and prioritize build order
- Start building missing pages (category pages, service area pages, FAQ, policies, contact)

### After page build-out
- Add real product inventory (photos, prices, descriptions)
- SEO pass: schema markup (LocalBusiness, Product, FAQ), sitemap, robots.txt, meta tags per page

---

## Update This Section After Every Session
**Last updated:** 6/28/2026
**Last thing completed:** Site live, DB migrated and seeded, booking flow verified end-to-end
**Next session should start at:** Page audit — compare existing `/app` routes to Required Pages list
