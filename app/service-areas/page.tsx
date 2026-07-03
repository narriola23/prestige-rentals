import type { Metadata } from "next";
import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

export const metadata: Metadata = {
  title: "Service Areas | Bounce House Rentals Across Greater Houston",
  description:
    "Prestige Rentals delivers bounce houses and inflatables across Greater Houston including Katy, Sugar Land, The Woodlands, Pearland, Cypress, Spring, and more. Free delivery and setup.",
};

const cities = [
  { slug: "houston", name: "Houston", desc: "All Houston neighborhoods — Heights, Memorial, Midtown, Clear Lake & more." },
  { slug: "katy", name: "Katy", desc: "Cinco Ranch, Grand Lakes, Cross Creek Ranch & surrounding communities." },
  { slug: "sugar-land", name: "Sugar Land", desc: "First Colony, Riverstone, New Territory & Fort Bend communities." },
  { slug: "pearland", name: "Pearland", desc: "Silverlake, Shadow Creek Ranch & south Houston suburbs." },
  { slug: "cypress", name: "Cypress", desc: "Bridgeland, Copperfield, Fairfield, Towne Lake & northwest Houston." },
  { slug: "spring", name: "Spring", desc: "Spring proper, Louetta, Champions & FM 2920 corridor." },
  { slug: "the-woodlands", name: "The Woodlands", desc: "All Woodlands villages from Grogan's Mill to Creekside Park." },
  { slug: "humble", name: "Humble", desc: "Humble, Atascocita & Lake Houston communities." },
  { slug: "conroe", name: "Conroe", desc: "Conroe, Grand Central Park, Woodforest & Lake Conroe area." },
  { slug: "tomball", name: "Tomball", desc: "Tomball, Rosehill & northwest Harris County communities." },
  { slug: "jersey-village", name: "Jersey Village", desc: "Jersey Village & surrounding northwest Houston areas." },
  { slug: "klein", name: "Klein", desc: "Klein ISD area, FM 2920 corridor & Spring-Klein communities." },
];

export default function ServiceAreasPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-3">Service Areas</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Prestige Rentals delivers premium bounce houses and inflatables across Greater Houston. Free delivery and professional setup included with every rental.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-yellow-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">📍</span>
                <div>
                  <h2 className="font-black text-blue-950 text-lg group-hover:text-yellow-600 transition-colors">
                    {city.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 leading-snug">{city.desc}</p>
                </div>
              </div>
              <div className="mt-4 text-yellow-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
                See details →
              </div>
            </Link>
          ))}
        </div>

        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-black text-blue-950 mb-3">Don&apos;t See Your City?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may still be able to serve you. Our delivery range covers a large portion of Greater Houston. If your city isn&apos;t listed, give us a call or send a message — we&apos;ll let you know if we can make it work, and what if any delivery fee applies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+18327161836" className="btn-primary inline-block text-center">
              📞 Call (832) 716-1836
            </a>
            <Link href="/contact" className="btn-secondary inline-block text-center">
              Send a Message
            </Link>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-black text-blue-950 mb-3">Ready to Book?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Browse our inflatables, check availability for your date, and reserve online in minutes.
          </p>
          <div className="max-w-2xl mx-auto text-left mb-4">
            <AvailabilitySearchWidget />
          </div>
          <Link href="/rentals" className="text-blue-950 font-semibold underline underline-offset-4">
            Browse Inflatables
          </Link>
        </section>

      </div>
    </>
  );
}
