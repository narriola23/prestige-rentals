import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concession Machine Rentals Houston | Popcorn, Snow Cones & More | Prestige Rentals",
  description:
    "Concession machine rentals in Houston — popcorn makers, snow cone machines, cotton candy, and more. Delivered with your inflatable rental or as a standalone add-on.",
};

const machines = [
  { icon: "🍿", name: "Popcorn Machine", desc: "Classic popcorn machine with supplies included. Serves 50–100 guests per batch." },
  { icon: "🧊", name: "Snow Cone Machine", desc: "Shaved ice machine with flavored syrup. A Houston summer party essential." },
  { icon: "🍭", name: "Cotton Candy Machine", desc: "Spun cotton candy in classic pink and blue. Kids absolutely love it." },
  { icon: "🌭", name: "Hot Dog Roller", desc: "Stainless steel hot dog warmer — great for larger events and school carnivals." },
];

const relatedCategories = [
  { name: "Bounce Houses", href: "/rentals/bounce-houses", icon: "🏰" },
  { name: "Party Rentals", href: "/rentals/party-rentals", icon: "🎉" },
  { name: "Tables & Chairs", href: "/rentals/tables-chairs", icon: "🪑" },
  { name: "Obstacle Courses", href: "/rentals/obstacle-courses", icon: "🏁" },
];

export default function ConcessionsPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Houston Concession Rentals
        </div>
        <h1 className="text-4xl font-black mb-3">Concessions</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Popcorn machines, snow cone makers, cotton candy, and more — the finishing touches that turn a good party into a great one.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        <section className="text-center py-12 bg-yellow-50 rounded-2xl border border-yellow-200">
          <div className="text-5xl mb-4">🍿</div>
          <h2 className="text-xl font-black text-blue-950 mb-2">Concession Rentals — Available by Request</h2>
          <p className="text-gray-600 mb-2 max-w-xl mx-auto">
            Add a concession machine to your order when you call to confirm your inflatable rental. Supplies (popcorn bags, syrup, cups) included with every machine rental.
          </p>
          <p className="text-gray-500 text-sm mb-6">Machines from $75/day · Supplies included · Delivery with your inflatable order</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+18327161836" className="btn-primary inline-block">📞 Call (832) 716-1836</a>
            <Link href="/contact" className="btn-secondary inline-block">Send a Message</Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">Available Concession Machines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {machines.map((m) => (
              <div key={m.name} className="flex gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <span className="text-4xl flex-shrink-0">{m.icon}</span>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1">{m.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-black text-blue-950 mb-3">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
            <div><strong className="text-blue-950 block mb-1">1. Add to your order</strong>When you call to confirm your inflatable rental, just mention you want to add a concession machine.</div>
            <div><strong className="text-blue-950 block mb-1">2. We deliver everything</strong>The machine arrives with your inflatable — one trip, one setup crew, everything at once.</div>
            <div><strong className="text-blue-950 block mb-1">3. Supplies included</strong>Popcorn bags, snow cone cups, syrup, and cotton candy mix are all included. No extra trip to the store.</div>
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
          <h2 className="text-2xl font-black text-blue-950 mb-2">Add Concessions to Your Party</h2>
          <p className="text-blue-800 mb-6">Call us when you book your inflatable and we&apos;ll add a concession machine to your order.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg inline-block">📅 Book Online</Link>
            <a href="tel:+18327161836" className="bg-white hover:bg-gray-50 text-blue-950 font-bold px-8 py-4 rounded-lg border border-blue-200 transition-all inline-block">📞 (832) 716-1836</a>
          </div>
        </section>

      </div>
    </>
  );
}
