import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Large Event Packages | Prestige Rentals Houston",
  description:
    "Multiple inflatables plus add-ons like tables, chairs, generators, and an attendant — for block parties, corporate events, and festivals across Greater Houston.",
};

async function getAddOns() {
  try {
    const { getActiveAddOns } = await import("@/lib/products");
    return await getActiveAddOns();
  } catch {
    return [];
  }
}

const included = [
  { icon: "🏰", title: "Multiple Units", desc: "Mix bounce houses, water slides, and tables & chairs for larger crowds." },
  { icon: "🔌", title: "Add-Ons Available", desc: "Generators, extra hours, an attendant, and more — see below." },
  { icon: "🚚", title: "Coordinated Logistics", desc: "One team handles delivery, setup, and pickup across all your units." },
  { icon: "✅", title: "Fully Insured", desc: "General liability coverage on every rental." },
];

const useCases = [
  "Neighborhood block parties", "Corporate family days", "Festivals & fairs",
  "Fundraisers", "Community days", "Multi-day events",
];

export default async function LargeEventPackagePage() {
  const addOns = await getAddOns();

  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Party Package
        </div>
        <h1 className="text-4xl font-black mb-3">Large Events</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Block parties, corporate events, and festivals — multiple units plus the add-ons that make a bigger event run smoothly.
        </p>
        <p className="text-yellow-400 font-bold mt-3">Custom quote · Free delivery within 20 miles</p>
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

        {addOns.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">Popular Add-Ons for Big Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {addOns.map((a: any) => (
                <div key={a.id} className="flex justify-between items-center bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                  <div>
                    <div className="font-bold text-blue-950">{a.name}</div>
                    {a.description && <div className="text-gray-500 text-sm">{a.description}</div>}
                  </div>
                  <span className="font-bold text-blue-700 whitespace-nowrap ml-4">{"+$" + (a.price / 100).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-yellow-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-blue-950 mb-2">Planning a Large Event?</h2>
          <p className="text-blue-800 mb-6">Tell us your headcount, date, and what add-ons you need — we'll put together a custom quote.</p>
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
              { name: "School & Church", href: "/packages/school-church", icon: "🏫" },
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
