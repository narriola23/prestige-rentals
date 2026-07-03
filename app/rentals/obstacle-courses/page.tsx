import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obstacle Course Rentals Houston | Prestige Rentals",
  description:
    "Inflatable obstacle course rentals in Houston, TX. Perfect for school field days, church events, and older kids. Delivered and set up from $349/day.",
};

async function getProducts() {
  try {
    const { getProductsByCategories } = await import("@/lib/products");
    return await getProductsByCategories(["Obstacle Course"]);
  } catch {
    return [];
  }
}

const features = [
  { icon: "🏁", title: "Great for Older Kids", desc: "Obstacle courses are ideal for ages 6 and up — finally, something that challenges the bigger kids." },
  { icon: "⏱️", title: "Race & Compete", desc: "Kids race head-to-head through tunnels, climbing walls, and slides. Non-stop excitement." },
  { icon: "🏫", title: "Big Event Ready", desc: "Large footprint and high capacity make obstacle courses perfect for school field days and community events." },
  { icon: "🚚", title: "Full-Service Delivery", desc: "Our crew delivers, sets up (about 60 min), and handles everything. You run the event." },
];

const useCases = [
  "School field days", "Church outdoor events", "Teen birthday parties",
  "HOA community days", "Corporate team events", "Sports team parties",
  "Scout troop events", "End-of-year school parties",
];

const relatedCategories = [
  { name: "Bounce Houses", href: "/rentals/bounce-houses", icon: "🏰" },
  { name: "Combo Units", href: "/rentals/combo-units", icon: "🎠" },
  { name: "Water Slides", href: "/rentals/water-slides", icon: "💧" },
  { name: "Party Rentals", href: "/rentals/party-rentals", icon: "🎉" },
];

export default async function ObstacleCoursesPage() {
  const products = await getProducts();

  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Houston Obstacle Course Rentals
        </div>
        <h1 className="text-4xl font-black mb-3">Obstacle Courses</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Tunnels, climbing walls, pop-up obstacles, and a giant finish slide. The ultimate challenge for kids who need more than just a bounce house.
        </p>
        <p className="text-yellow-400 font-bold mt-3">Starting at $349/day · Free delivery &amp; setup</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        <section>
          {products.length > 0 ? (
            <>
              <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">Available Obstacle Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((p: any) => (
                  <div key={p.id} className="card overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      <img src={p.image_url || "https://picsum.photos/seed/" + p.slug + "/600/400"} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-yellow-500 text-blue-950 font-bold px-3 py-1.5 rounded-full text-sm shadow">{"$" + (p.base_price / 100).toFixed(0) + "/day"}</div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-blue-950 text-lg mb-1">{p.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.description}</p>
                      <div className="flex gap-3 text-xs text-gray-400 mb-4">
                        {p.capacity && <span>👥 Up to {p.capacity} kids</span>}
                        {p.length_ft && <span>📐 {p.length_ft}&apos; × {p.width_ft}&apos;</span>}
                      </div>
                      <Link href={"/rentals/" + p.slug} className="btn-secondary text-sm w-full text-center block">View Details →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="text-5xl mb-4">🏁</div>
              <h2 className="text-xl font-black text-blue-950 mb-2">Obstacle Course Inventory Loading Soon</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Call us to check current obstacle course availability for your event.</p>
              <a href="tel:+18327161836" className="btn-primary inline-block">📞 Call (832) 716-1836</a>
            </div>
          )}
          <div className="text-center mt-8"><Link href="/rentals" className="btn-secondary inline-block">View All Inflatables →</Link></div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">Why Book an Obstacle Course?</h2>
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

        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
          <h2 className="text-xl font-black text-blue-950 mb-3">Space Requirements for Obstacle Courses</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Obstacle courses are longer than standard bounce houses — typically 35–50 feet long and 10–12 feet wide. A standard backyard can work, but we recommend confirming your space when booking. We can also set up in parks and parking lots with permission.
          </p>
          <p className="text-gray-600 text-sm">Questions about your space? <a href="tel:+18327161836" className="text-yellow-600 font-medium">(832) 716-1836</a></p>
        </section>

        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-blue-950 mb-4">Perfect For</h2>
          <div className="flex flex-wrap gap-3">
            {useCases.map((u) => (
              <span key={u} className="bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full">🏁 {u}</span>
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
          <h2 className="text-2xl font-black text-blue-950 mb-2">Book an Obstacle Course</h2>
          <p className="text-blue-800 mb-6">Perfect for larger groups — check your date and book online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg inline-block">📅 Book Online Now</Link>
            <a href="tel:+18327161836" className="bg-white hover:bg-gray-50 text-blue-950 font-bold px-8 py-4 rounded-lg border border-blue-200 transition-all inline-block">📞 (832) 716-1836</a>
          </div>
        </section>

      </div>
    </>
  );
}
