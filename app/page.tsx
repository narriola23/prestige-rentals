import Link from "next/link";

const featuredItems = [
  { name: "Classic Castle Bouncer", price: "$175", img: "https://picsum.photos/seed/bounce1/600/400", slug: "classic-castle-bouncer" },
  { name: "Tropical Splash Combo", price: "$275", img: "https://picsum.photos/seed/bounce2/600/400", slug: "tropical-splash-combo" },
  { name: "Princess Palace Jumper", price: "$199", img: "https://picsum.photos/seed/bounce3/600/400", slug: "princess-palace-jumper" },
];

const steps = [
  { icon: "📅", title: "Choose Your Date", desc: "Pick your event date and browse available inflatables." },
  { icon: "🏰", title: "Select an Inflatable", desc: "Choose from our premium selection of bounce houses and combos." },
  { icon: "✅", title: "Book & Confirm", desc: "Complete your booking online. We'll confirm all details." },
  { icon: "🚚", title: "We Deliver & Set Up", desc: "Our team delivers, sets up, and picks up — you enjoy the party!" },
];

const testimonials = [
  { name: "Maria G.", text: "Absolutely incredible service! The bounce house was immaculate and the team was on time.", location: "Sugar Land, TX" },
  { name: "James T.", text: "We've used Prestige Rentals 3 times now. Always professional, always perfect.", location: "Katy, TX" },
  { name: "Sofia R.", text: "The princess bouncer was gorgeous. My daughter was over the moon. Will book again!", location: "The Woodlands, TX" },
];

const cities = ["Houston","Sugar Land","Katy","The Woodlands","Pearland","Friendswood","League City","Missouri City","Spring","Cypress","Humble","Baytown"];

export default function HomePage() {
  return (
    <>
      <section className="relative bg-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://picsum.photos/seed/herobg/1600/900')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-block bg-yellow-500 text-blue-950 text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">Houston's #1 Bounce House Rental</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">Premium Inflatables<br /><span className="text-yellow-400">Delivered to Your Door</span></h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Safe, clean, and fully insured bounce houses for birthdays, school events, and corporate parties across Greater Houston.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary text-lg px-8 py-4">📅 Book Now — It's Easy!</Link>
            <Link href="/rentals" className="btn-secondary text-lg px-8 py-4 border border-blue-800">Browse All Inflatables</Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <span>✅ Free Delivery &amp; Setup</span><span>✅ Fully Insured</span><span>✅ Same-Day Availability</span><span>✅ 5-Star Rated</span>
          </div>
        </div>
      </section>

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
          <div className="text-center mt-10"><Link href="/rentals" className="btn-primary">Browse All Inflatables</Link></div>
        </div>
      </section>

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
          <div className="text-center mt-12"><Link href="/book" className="btn-primary text-lg px-10 py-4">Get Started Today</Link></div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">Service Area</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">We proudly serve Houston and all surrounding communities.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (<span key={city} className="bg-blue-50 text-blue-900 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium">📍 {city}</span>))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-3">What Our Customers Say</h2>
            <p className="text-gray-600">Trusted by hundreds of Houston families.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="text-yellow-400 text-xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-700 italic mb-4">"{t.text}"</p>
                <div><div className="font-bold text-blue-950">{t.name}</div><div className="text-sm text-gray-500">{t.location}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mb-4">Ready to Book Your Party?</h2>
          <p className="text-blue-800 mb-8 text-lg">Check availability and reserve your inflatable in minutes.</p>
          <Link href="/book" className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-10 py-4 rounded-lg text-lg transition-all shadow-lg inline-block">Book Now — It's Easy!</Link>
        </div>
      </section>
    </>
  );
}
