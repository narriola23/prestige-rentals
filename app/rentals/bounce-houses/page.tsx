import type { Metadata } from "next";
import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bounce House Rentals Houston | Prestige Rentals",
  description:
    "Premium bounce house rentals in Houston, TX. Classic castles, princess bouncers, themed inflatables — delivered, set up, and picked up. Book online from $175/day.",
};

async function getProducts() {
  try {
    const { getProductsByCategories } = await import("@/lib/products");
    return await getProductsByCategories(["Bounce House"]);
  } catch {
    return [];
  }
}

const features = [
  { icon: "👶", title: "All Ages Welcome", desc: "Perfect for kids ages 2–12. We have themed units for every birthday party imaginable." },
  { icon: "🏰", title: "Themed Designs", desc: "Princess castles, superhero strongholds, tropical hideouts — something for every party theme." },
  { icon: "🔒", title: "Safety First", desc: "Netted walls, padded floors, and safety steps on every unit. Fully insured on every rental." },
  { icon: "🚚", title: "Delivered & Set Up", desc: "We deliver, stake, inflate, and inspect — takes about 30 minutes. You do nothing." },
];

const useCases = [
  "Backyard birthday parties", "Princess & tea party themes", "Superhero parties",
  "School field days", "Church events", "HOA community days",
  "Toddler playdates", "Graduation parties",
];

const relatedCategories = [
  { name: "Water Slides", href: "/rentals/water-slides", icon: "💧" },
  { name: "Combo Units", href: "/rentals/combo-units", icon: "🎠" },
  { name: "Obstacle Courses", href: "/rentals/obstacle-courses", icon: "🏁" },
  { name: "Party Rentals", href: "/rentals/party-rentals", icon: "🎉" },
];

export default async function BounceHousesPage() {
  const products = await getProducts();

  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Houston Bounce House Rentals
        </div>
        <h1 className="text-4xl font-black mb-3">Bounce Houses</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Classic bouncers, princess palaces, and themed castles — clean, safe, and delivered to your door across Greater Houston.
        </p>
        <p className="text-yellow-400 font-bold mt-3">Starting at $175/day · Free delivery &amp; setup</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Products */}
        <section>
          {products.length > 0 ? (
            <>
              <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">Available Bounce Houses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((p: any) => (
                  <div key={p.id} className="card overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={p.image_url || "https://picsum.photos/seed/" + p.slug + "/600/400"}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-500 text-blue-950 font-bold px-3 py-1.5 rounded-full text-sm shadow">
                        {"$" + (p.base_price / 100).toFixed(0) + "/day"}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-blue-950 text-lg mb-1">{p.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.description}</p>
                      <div className="flex gap-3 text-xs text-gray-400 mb-4">
                        {p.capacity && <span>👥 Up to {p.capacity} kids</span>}
                        {p.length_ft && <span>📐 {p.length_ft}&apos; × {p.width_ft}&apos;</span>}
                      </div>
                      <Link href={"/rentals/" + p.slug} className="btn-secondary text-sm w-full text-center block">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="text-5xl mb-4">🏰</div>
              <h2 className="text-xl font-black text-blue-950 mb-2">Bounce House Inventory Loading Soon</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We&apos;re adding our full bounce house lineup to the site. In the meantime, call us and we&apos;ll tell you exactly what&apos;s available for your date.
              </p>
              <a href="tel:+18327161836" className="btn-primary inline-block">📞 Call (832) 716-1836</a>
            </div>
          )}
          <div className="text-center mt-8">
            <Link href="/rentals" className="btn-secondary inline-block">View All Inflatables →</Link>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">Why Book a Bounce House with Prestige Rentals?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-blue-950 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
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

        {/* Related Categories */}
        <section>
          <h2 className="text-xl font-black text-blue-950 mb-5">Also Browse</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedCategories.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 transition-colors group"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="font-semibold text-blue-950 text-sm group-hover:text-yellow-600 transition-colors">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-yellow-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-blue-950 mb-2">Ready to Book a Bounce House?</h2>
          <p className="text-blue-800 mb-6">Check availability for your date and reserve online in minutes.</p>
          <div className="max-w-xl mx-auto text-left mb-4"><AvailabilitySearchWidget /></div><a href="tel:+18327161836" className="text-blue-950 font-bold underline underline-offset-4">Or call: 📞 (832) 716-1836</a>
        </section>

      </div>
    </>
  );
}
