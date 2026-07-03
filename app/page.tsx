import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

const categories = [
  { icon: "🏰", name: "Bounce Houses", desc: "Classic bouncers for every age and theme", href: "/rentals" },
  { icon: "💧", name: "Water Slides", desc: "Beat the Houston heat all summer long", href: "/rentals" },
  { icon: "🎠", name: "Combo Units", desc: "Bounce, slide & climb — all in one", href: "/rentals" },
  { icon: "🏁", name: "Obstacle Courses", desc: "Action-packed fun for older kids & teens", href: "/rentals" },
  { icon: "🎉", name: "Party Rentals", desc: "Tents, games & extras for any event", href: "/rentals" },
  { icon: "🪑", name: "Tables & Chairs", desc: "Complete your setup with seating packages", href: "/rentals" },
  { icon: "🍿", name: "Concessions", desc: "Popcorn machines, snow cones & more", href: "/rentals" },
];

const featuredItems = [
  { name: "Classic Castle Bouncer", price: "$175", img: "https://picsum.photos/seed/bounce1/600/400", slug: "classic-castle-bouncer" },
  { name: "Tropical Splash Combo", price: "$275", img: "https://picsum.photos/seed/bounce2/600/400", slug: "tropical-splash-combo" },
  { name: "Princess Palace Jumper", price: "$199", img: "https://picsum.photos/seed/bounce3/600/400", slug: "princess-palace-jumper" },
];

const whyUs = [
  { icon: "✅", title: "Fully Insured", desc: "General liability coverage on every single rental. Proof of insurance available on request." },
  { icon: "⭐", title: "5-Star Rated", desc: "Hundreds of 5-star reviews from Houston families who've trusted us to show up and deliver." },
  { icon: "🚚", title: "Free Delivery & Setup", desc: "No hidden fees. We load, deliver, set up, and pick up — you focus on the party." },
  { icon: "🧼", title: "Spotlessly Clean", desc: "Every inflatable is sanitized top to bottom after every rental. Always." },
  { icon: "📅", title: "Easy Online Booking", desc: "Reserve in minutes. We confirm within 2 hours and walk you through every detail." },
  { icon: "🏠", title: "Local & Family-Owned", desc: "We're a Houston business. When you call, a real local person answers." },
];

const steps = [
  { icon: "📅", title: "Choose Your Date", desc: "Pick your event date and browse available inflatables." },
  { icon: "🏰", title: "Select an Inflatable", desc: "Choose from our premium selection of bounce houses and combos." },
  { icon: "✅", title: "Book & Confirm", desc: "Complete your booking online. We'll confirm all details within 2 hours." },
  { icon: "🚚", title: "We Deliver & Set Up", desc: "Our team delivers, sets up, and picks up — you enjoy the party!" },
];

const packages = [
  {
    icon: "🎂",
    name: "Backyard Birthday",
    desc: "The classic Houston birthday setup. A bounce house or combo unit delivered to your door, set up before guests arrive, and picked up when the party's over.",
    highlights: ["1 inflatable of your choice", "Free delivery & setup", "Up to 8 hours rental"],
    price: "From $175",
  },
  {
    icon: "💧",
    name: "Summer Water Party",
    desc: "Beat the Houston heat with a water slide or wet combo. Perfect for backyard summer birthdays and end-of-school parties.",
    highlights: ["Water slide or wet combo", "Free delivery & setup", "Great for ages 4–14"],
    price: "From $275",
  },
  {
    icon: "🏫",
    name: "School & Church Events",
    desc: "Multi-unit setups for larger events. We work with schools, churches, daycares, and HOAs throughout Greater Houston.",
    highlights: ["Multiple units available", "Custom event sizing", "We handle all logistics"],
    price: "Custom quote",
  },
];

const testimonials = [
  { name: "Maria G.", text: "Absolutely incredible service! The bounce house was immaculate and the team was on time.", location: "Sugar Land, TX" },
  { name: "James T.", text: "We've used Prestige Rentals 3 times now. Always professional, always perfect.", location: "Katy, TX" },
  { name: "Sofia R.", text: "The princess bouncer was gorgeous. My daughter was over the moon. Will book again!", location: "The Woodlands, TX" },
];

const serviceAreaCities = [
  { name: "Houston", slug: "houston" },
  { name: "Katy", slug: "katy" },
  { name: "Sugar Land", slug: "sugar-land" },
  { name: "Pearland", slug: "pearland" },
  { name: "Cypress", slug: "cypress" },
  { name: "Spring", slug: "spring" },
  { name: "The Woodlands", slug: "the-woodlands" },
  { name: "Humble", slug: "humble" },
  { name: "Conroe", slug: "conroe" },
  { name: "Tomball", slug: "tomball" },
  { name: "Jersey Village", slug: "jersey-village" },
  { name: "Klein", slug: "klein" },
];

const faqPreview = [
  {
    q: "How far in advance should I book?",
    a: "We recommend 2–4 weeks ahead for weekends, but last-minute availability is common. Check online or give us a call.",
  },
  {
    q: "What's included in the rental price?",
    a: "Every rental includes free delivery, professional setup, a safety inspection, and pickup. No hidden fees.",
  },
  {
    q: "What happens if it rains on my event day?",
    a: "Light rain usually doesn't cancel the rental. Severe weather gets a free reschedule — your deposit is always protected.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-blue-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://picsum.photos/seed/herobg/1600/900')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-block bg-yellow-500 text-blue-950 text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Houston&apos;s #1 Bounce House Rental
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            Premium Inflatables<br />
            <span className="text-yellow-400">Delivered to Your Door</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Safe, clean, and fully insured bounce houses for birthdays, school events, and corporate parties across Greater Houston.
          </p>
          <div className="max-w-2xl mx-auto text-left">
            <AvailabilitySearchWidget />
          </div>
          <div className="mt-6">
            <Link href="/rentals" className="text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-4">Browse All Inflatables</Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <span>✅ Free Delivery &amp; Setup</span>
            <span>✅ Fully Insured</span>
            <span>✅ Same-Day Availability</span>
            <span>✅ 5-Star Rated</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">What Can We Bring to Your Party?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">From classic bouncers to water slides and party extras — we&apos;ve got everything you need.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all group bg-gray-50 hover:bg-white"
              >
                <span className="text-4xl mb-2">{cat.icon}</span>
                <span className="font-bold text-blue-950 text-sm group-hover:text-yellow-600 transition-colors leading-snug">{cat.name}</span>
                <span className="text-gray-400 text-xs mt-1 hidden lg:block leading-tight">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Inflatables */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">Featured Inflatables</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Our most popular bounce houses — perfect for any Houston party.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.slug} className="card overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-yellow-500 text-blue-950 font-bold px-3 py-1 rounded-full text-sm">{item.price}/day</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-blue-950 text-lg mb-3">{item.name}</h3>
                  <Link href={"/rentals/" + item.slug} className="btn-secondary text-sm w-full text-center block">View Details →</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/rentals" className="btn-primary">Browse All Inflatables</Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">Why Houston Families Choose Us</h2>
            <p className="text-gray-600 max-w-xl mx-auto">We built this business on trust, cleanliness, and showing up when we say we will.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">How It Works</h2>
            <p className="text-gray-400">Booking is easy — just 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="text-yellow-400 font-black text-sm uppercase tracking-widest mb-1">Step {i + 1}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <AvailabilitySearchWidget variant="compact" className="text-lg px-10 py-4" />
          </div>
        </div>
      </section>

      {/* Party Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">Party Packages</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Not sure what to book? We&apos;ve put together simple packages for the most common Houston events.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="bg-blue-950 text-white p-6 text-center">
                  <div className="text-4xl mb-2">{pkg.icon}</div>
                  <h3 className="font-black text-xl">{pkg.name}</h3>
                  <div className="text-yellow-400 font-bold mt-1">{pkg.price}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{pkg.desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-yellow-500 font-bold mt-0.5">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  {pkg.price === "Custom quote" ? (
                    <Link href="/quote" className="btn-primary text-sm text-center block">Get a Quote</Link>
                  ) : (
                    <AvailabilitySearchWidget variant="compact" className="text-sm text-center block" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">What Our Customers Say</h2>
            <p className="text-gray-600">Trusted by hundreds of Houston families.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="text-yellow-400 text-xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-700 italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-blue-950">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">Service Area</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            We proudly serve Houston and all surrounding communities. Free delivery on every rental.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {serviceAreaCities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="bg-white text-blue-900 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium hover:border-yellow-400 hover:text-yellow-700 transition-colors"
              >
                📍 {city.name}
              </Link>
            ))}
          </div>
          <Link href="/service-areas" className="text-yellow-600 font-semibold text-sm hover:underline">
            View all service areas →
          </Link>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">Common Questions</h2>
            <p className="text-gray-600">Quick answers to the things people ask us most.</p>
          </div>
          <div className="space-y-3 mb-8">
            {faqPreview.map((item) => (
              <details
                key={item.q}
                className="group border border-gray-200 rounded-xl bg-gray-50 overflow-hidden"
              >
                <summary className="flex justify-between items-center px-5 py-4 cursor-pointer list-none font-semibold text-blue-950 hover:bg-gray-100 transition-colors">
                  <span>{item.q}</span>
                  <span className="ml-4 flex-shrink-0 text-yellow-500 text-2xl leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
          <div className="text-center">
            <Link href="/faq" className="btn-secondary inline-block">See All 15 FAQs →</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-4">Ready to Book Your Party?</h2>
          <p className="text-blue-800 mb-8 text-lg">Check availability and reserve your inflatable in minutes.</p>
          <div className="max-w-2xl mx-auto text-left">
            <AvailabilitySearchWidget />
          </div>
          <div className="mt-6">
            <a
              href="tel:+18327161836"
              className="text-blue-950 font-bold underline underline-offset-4"
            >
              Or call us: 📞 (832) 716-1836
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
