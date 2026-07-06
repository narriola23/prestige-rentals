import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Party Packages | Prestige Rentals Houston",
  description:
    "Simple bounce house and inflatable party packages for Houston birthdays, summer water parties, school & church events, toddler parties, and large events.",
};

const packages = [
  {
    slug: "backyard-birthday",
    icon: "🎂",
    name: "Backyard Birthday",
    desc: "The classic Houston birthday setup — one inflatable delivered, set up, and picked up.",
  },
  {
    slug: "summer-water-slide",
    icon: "💧",
    name: "Summer Water Party",
    desc: "Beat the Houston heat with a water slide or wet-capable unit.",
  },
  {
    slug: "school-church",
    icon: "🏫",
    name: "School & Church Events",
    desc: "Multi-unit setups for larger institutional events across Greater Houston.",
  },
  {
    slug: "toddler",
    icon: "🍼",
    name: "Toddler Parties",
    desc: "Compact, gentle inflatables sized right for your littlest guests.",
  },
  {
    slug: "large-event",
    icon: "🎪",
    name: "Large Events",
    desc: "Block parties, corporate events, and festivals — multiple units plus add-ons.",
  },
];

export default function PackagesIndexPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-3">Party Packages</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Not sure what to book? These are the setups Houston families and organizations ask for most.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-yellow-400 transition-colors group"
            >
              <div className="text-4xl mb-3">{pkg.icon}</div>
              <h2 className="font-black text-blue-950 text-lg mb-2 group-hover:text-yellow-600 transition-colors">{pkg.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{pkg.desc}</p>
              <span className="inline-block mt-4 text-sm font-semibold text-yellow-600">Learn More →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
