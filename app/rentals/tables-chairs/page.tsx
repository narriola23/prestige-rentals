import type { Metadata } from "next";
import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Table & Chair Rentals Houston | Prestige Rentals",
  description:
    "Table and chair rentals in Houston, TX. Folding tables, chairs, and seating packages delivered to your event alongside your inflatable rental.",
};

async function getProducts() {
  try {
    const { getProductsByCategories } = await import("@/lib/products");
    return await getProductsByCategories(["Tables & Chairs"]);
  } catch {
    return [];
  }
}

const items = [
  { icon: "🪑", name: "Folding Chairs", desc: "Standard white and black folding chairs available by the unit or in bulk packages." },
  { icon: "🍽️", name: "Folding Tables", desc: "6-foot and 8-foot rectangular tables — great for food, gifts, and activities." },
  { icon: "☂️", name: "Umbrella Tables", desc: "Outdoor round tables with shade umbrellas. Perfect for backyard setups." },
  { icon: "📦", name: "Seating Packages", desc: "Bundled table + chair packages to seat any size crowd at a flat rate." },
];

const relatedCategories = [
  { name: "Bounce Houses", href: "/rentals/bounce-houses", icon: "🏰" },
  { name: "Party Rentals", href: "/rentals/party-rentals", icon: "🎉" },
  { name: "Concessions", href: "/rentals/concessions", icon: "🍿" },
  { name: "Water Slides", href: "/rentals/water-slides", icon: "💧" },
];

export default async function TablesChairsPage() {
  const products = await getProducts();

  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Houston Table & Chair Rentals
        </div>
        <h1 className="text-4xl font-black mb-3">Tables &amp; Chairs</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Complete your event setup with table and chair rentals delivered alongside your inflatable. Seating for any size gathering.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        <section>
          {products.length > 0 ? (
            <>
              <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">Available Tables &amp; Chairs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {products.map((p: any) => (
                  <div key={p.id} className="card overflow-hidden p-6">
                    <h3 className="font-bold text-blue-950 text-lg mb-1">{p.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{p.description}</p>
                    <div className="bg-yellow-500 inline-block text-blue-950 font-bold px-3 py-1.5 rounded-full text-sm shadow">
                      {"$" + (p.base_price / 100).toFixed(2) + "/day per item"}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm text-center mt-6">Bundle with any inflatable rental, or call for a standalone order.</p>
            </>
          ) : (
            <div className="text-center py-12 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="text-5xl mb-4">🪑</div>
              <h2 className="text-xl font-black text-blue-950 mb-2">Tables &amp; Chairs — Available by Request</h2>
              <p className="text-gray-600 mb-2 max-w-xl mx-auto">
                We deliver tables and chairs to Houston-area events, either bundled with an inflatable rental or as a standalone order. Call us for availability and pricing.
              </p>
              <p className="text-gray-500 text-sm mb-6">Chairs from $2/each · Tables from $8/each · Packages available</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+18327161836" className="btn-primary inline-block">📞 Call (832) 716-1836</a>
                <Link href="/contact" className="btn-secondary inline-block">Send a Message</Link>
              </div>
            </div>
          )}
          <div className="max-w-xl mx-auto mt-8"><AvailabilitySearchWidget /></div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.name} className="flex gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-black text-blue-950 mb-3">Bundle &amp; Save</h2>
          <p className="text-gray-600 leading-relaxed">
            Add tables and chairs to any inflatable rental and save on delivery. When you book a bounce house, water slide, or combo unit with us, adding seating to the same delivery is the most cost-effective way to complete your setup. Ask about bundles when you book.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-blue-950 mb-5">Also Browse</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedCategories.map((c) => (
              <Link key={c.name} href={c.href} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 transition-colors group">
                <span className="text-2xl">{c.icon}</span>
                <span className="font-semibold text-blue-950 text-sm group-hover:text-yellow-600 transition-colors">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-yellow-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-blue-950 mb-2">Need Seating for Your Event?</h2>
          <p className="text-blue-800 mb-6">Call us to check availability and put together a full event package.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+18327161836" className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg inline-block">📞 Call (832) 716-1836</a>
            <Link href="/contact" className="bg-white hover:bg-gray-50 text-blue-950 font-bold px-8 py-4 rounded-lg border border-blue-200 transition-all inline-block">Send a Message</Link>
          </div>
        </section>

      </div>
    </>
  );
}
