import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Party Rentals Houston | Games, Extras & Event Supplies | Prestige Rentals",
  description:
    "Party rental extras in Houston — games, activities, and accessories to complete your event. Delivered and set up alongside your inflatable rental.",
};

const items = [
  { icon: "🎯", name: "Carnival Games", desc: "Ring toss, duck pond, bean bag toss, and more classic carnival favorites." },
  { icon: "🧸", name: "Toddler Play Sets", desc: "Soft-play structures and activity sets sized perfectly for children ages 1–5." },
  { icon: "🎪", name: "Event Tents", desc: "Pop-up shade tents to keep guests comfortable at outdoor events." },
  { icon: "🎉", name: "Party Extras", desc: "Balloon arches, banners, and other décor items to complete the look." },
];

const relatedCategories = [
  { name: "Bounce Houses", href: "/rentals/bounce-houses", icon: "🏰" },
  { name: "Water Slides", href: "/rentals/water-slides", icon: "💧" },
  { name: "Tables & Chairs", href: "/rentals/tables-chairs", icon: "🪑" },
  { name: "Concessions", href: "/rentals/concessions", icon: "🍿" },
];

export default function PartyRentalsPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Houston Party Rentals
        </div>
        <h1 className="text-4xl font-black mb-3">Party Rentals & Extras</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Everything beyond the bounce house — games, activities, and event extras to make your party complete.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        <section className="text-center py-12 bg-yellow-50 rounded-2xl border border-yellow-200">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-black text-blue-950 mb-2">Party Extras — Available Soon Online</h2>
          <p className="text-gray-600 mb-2 max-w-xl mx-auto">
            We carry carnival games, toddler play sets, event tents, and party accessories. Call us to add these to your existing inflatable rental or to book a party extras package on its own.
          </p>
          <p className="text-gray-500 text-sm mb-6">Pricing varies by item — we&apos;ll put together a custom quote based on your event.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+18327161836" className="btn-primary inline-block">📞 Call (832) 716-1836</a>
            <Link href="/contact" className="btn-secondary inline-block">Send a Message</Link>
          </div>
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
          <h2 className="text-2xl font-black text-blue-950 mb-2">Planning a Party in Houston?</h2>
          <p className="text-blue-800 mb-6">Call us and we&apos;ll help you put together the perfect setup for your event and budget.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg inline-block">📅 Book Online</Link>
            <a href="tel:+18327161836" className="bg-white hover:bg-gray-50 text-blue-950 font-bold px-8 py-4 rounded-lg border border-blue-200 transition-all inline-block">📞 (832) 716-1836</a>
          </div>
        </section>

      </div>
    </>
  );
}
