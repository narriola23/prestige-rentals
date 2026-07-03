import Link from "next/link";

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "(713) 555-0100";
  return (
    <footer className="bg-blue-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-yellow-400 text-xl font-black">⭐ Prestige Rentals</span>
            <p className="mt-3 text-sm leading-relaxed">Houston's premier bounce house and inflatable rental company. Making your events unforgettable.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/rentals" className="hover:text-yellow-400 transition-colors">View Inflatables</Link></li>
              <li><Link href="/book" className="hover:text-yellow-400 transition-colors">Book Online</Link></li>
              <li><Link href="/faq" className="hover:text-yellow-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/policies/cancellation" className="hover:text-yellow-400 transition-colors">Cancellation Policy</Link></li>
              <li><Link href="/policies/rain" className="hover:text-yellow-400 transition-colors">Rain & Weather Policy</Link></li>
              <li><Link href="/policies/safety" className="hover:text-yellow-400 transition-colors">Safety Rules</Link></li>
              <li><Link href="/policies/rental-agreement" className="hover:text-yellow-400 transition-colors">Rental Agreement</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              {["Houston","Katy","Sugar Land","Pearland","Cypress","Spring","The Woodlands","Humble","Conroe","Tomball","Jersey Village","Klein"].map((city) => (
                <li key={city}>
                  <Link href={`/service-areas/${city.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-yellow-400 transition-colors">{city}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 <a href={"tel:" + phone.replace(/[^0-9+]/g, "")} className="hover:text-yellow-400 transition-colors">{phone}</a></li>
              <li>✉️ <a href="mailto:info@prestigerentals.com" className="hover:text-yellow-400 transition-colors">info@prestigerentals.com</a></li>
              <li>📍 Houston, TX &amp; Surrounding Areas</li>
              <li className="pt-1">🕐 Mon–Sun: 7am – 8pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900 mt-10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Prestige Rentals. All rights reserved. | Houston, TX
        </div>
      </div>
    </footer>
  );
}
