import type { Metadata } from "next";
import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Toddler Party Package | Prestige Rentals Houston",
  description:
    "Compact, gentle bounce houses sized right for toddlers and first birthdays. Starting at $100/day, free delivery within 20 miles.",
};

async function getToddlerFriendlyUnits() {
  try {
    const { getAllProducts } = await import("@/lib/products");
    const products = await getAllProducts();
    // Smallest-footprint active bounce houses — a reasonable proxy for "toddler friendly"
    // until the client designates a dedicated toddler-only unit.
    return products
      .filter((p: any) => p.is_active && p.category === "Bounce House")
      .sort((a: any, b: any) => a.base_price - b.base_price)
      .slice(0, 3);
  } catch {
    return [];
  }
}

const included = [
  { icon: "🍼", title: "Compact & Gentle", desc: "Smaller footprint units sized for toddlers, ages 1–5." },
  { icon: "🚚", title: "Delivery & Setup", desc: "Free within 20 miles of our Houston base; a small per-mile fee applies beyond that." },
  { icon: "✅", title: "Safety Inspection", desc: "Every unit is inspected on-site before we leave your property." },
  { icon: "📦", title: "Pickup Included", desc: "We return at the end of your rental window and break everything down." },
];

export default async function ToddlerPackagePage() {
  const products = await getToddlerFriendlyUnits();

  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Party Package
        </div>
        <h1 className="text-4xl font-black mb-3">Toddler Parties</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          First birthdays and toddler playdates need something sized right for little ones. Our smallest, gentlest units are the perfect fit.
        </p>
        <p className="text-yellow-400 font-bold mt-3">Starting at $100/day · Free delivery within 20 miles</p>
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

        <section>
          {products.length > 0 && (
            <>
              <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">Our Smallest Units</h2>
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
                      {p.length_ft && (
                        <p className="text-xs text-gray-400 mb-4">📐 {p.length_ft}&apos; × {p.width_ft}&apos; × {p.height_ft}&apos;H</p>
                      )}
                      <Link href={"/rentals/" + p.slug} className="btn-secondary text-sm w-full text-center block">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="bg-yellow-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-blue-950 mb-2">Ready to Book Your Toddler Party?</h2>
          <p className="text-blue-800 mb-6">Check availability for your date and reserve online in minutes.</p>
          <div className="max-w-xl mx-auto text-left mb-4"><AvailabilitySearchWidget /></div>
          <a href="tel:+18327161836" className="text-blue-950 font-bold underline underline-offset-4">Or call: 📞 (832) 716-1836</a>
        </section>

        <section>
          <h2 className="text-xl font-black text-blue-950 mb-5">Other Packages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Backyard Birthday", href: "/packages/backyard-birthday", icon: "🎂" },
              { name: "Summer Water Party", href: "/packages/summer-water-slide", icon: "💧" },
              { name: "School & Church", href: "/packages/school-church", icon: "🏫" },
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
