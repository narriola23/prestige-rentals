import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "School & Church Event Packages | Prestige Rentals Houston",
  description:
    "Multi-unit inflatable setups for schools, churches, daycares, and HOAs across Greater Houston. Custom sizing and event-day logistics handled for you.",
};

const included = [
  { icon: "🏰", title: "Multiple Units Available", desc: "Mix bounce houses, water slides, and tables & chairs to fit your headcount." },
  { icon: "📏", title: "Custom Event Sizing", desc: "Tell us your expected attendance and we'll recommend the right lineup." },
  { icon: "🚚", title: "We Handle Logistics", desc: "Coordinated delivery, setup, and pickup for multi-unit events — one point of contact." },
  { icon: "✅", title: "Fully Insured", desc: "General liability coverage on every rental. Proof of insurance available on request for facility requirements." },
];

const useCases = [
  "School carnivals & field days", "Church festivals", "Daycare events",
  "HOA community days", "Vacation Bible School", "Fall festivals",
];

export default function SchoolChurchPackagePage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Party Package
        </div>
        <h1 className="text-4xl font-black mb-3">School &amp; Church Events</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Multi-unit setups for larger events. We work with schools, churches, daycares, and HOAs throughout Greater Houston.
        </p>
        <p className="text-yellow-400 font-bold mt-3">Custom quote · Setup &amp; pickup included</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-blue-950 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-blue-950 mb-4">Perfect For</h2>
          <div className="flex flex-wrap gap-3">
            {useCases.map((u) => (
              <span key={u} className="bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full">
                🎉 {u}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-4 text-center">Browse Available Units</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-center mb-8">
            Pick and choose from our bounce houses, water slides, and tables &amp; chairs — we'll help you build the right lineup for your headcount and budget.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { name: "Bounce Houses", href: "/rentals/bounce-houses", icon: "🏰" },
              { name: "Water Slides", href: "/rentals/water-slides", icon: "💧" },
              { name: "Tables & Chairs", href: "/rentals/tables-chairs", icon: "🪑" },
              { name: "All Inflatables", href: "/rentals", icon: "🎉" },
            ].map((c) => (
              <Link key={c.name} href={c.href} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 transition-colors group">
                <span className="text-2xl">{c.icon}</span>
                <span className="font-semibold text-blue-950 text-sm group-hover:text-yellow-600 transition-colors">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-yellow-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-blue-950 mb-2">Planning a School or Church Event?</h2>
          <p className="text-blue-800 mb-6">Tell us your headcount and date, and we'll put together a custom quote for your event.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg inline-block">Get a Custom Quote</Link>
            <a href="tel:+18327161836" className="bg-white hover:bg-gray-50 text-blue-950 font-bold px-8 py-4 rounded-lg border border-blue-200 transition-all inline-block">📞 Call (832) 716-1836</a>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black text-blue-950 mb-5">Other Packages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Backyard Birthday", href: "/packages/backyard-birthday", icon: "🎂" },
              { name: "Summer Water Party", href: "/packages/summer-water-slide", icon: "💧" },
              { name: "Toddler Parties", href: "/packages/toddler", icon: "🍼" },
              { name: "Large Events", href: "/packages/large-event", icon: "🎪" },
            ].map((c) => (
              <Link key={c.name} href={c.href} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 transition-colors group">
                <span className="text-2xl">{c.icon}</span>
                <span className="font-semibold text-blue-950 text-sm group-hover:text-yellow-600 transition-colors">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
