import type { Metadata } from "next";
import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";
import { notFound } from "next/navigation";

const cityData: Record<string, {
  name: string;
  county: string;
  tagline: string;
  intro: string;
  detail: string;
  neighborhoods: string[];
  eventTypes: string[];
  driveTime: string;
}> = {
  houston: {
    name: "Houston",
    county: "Harris County",
    tagline: "Houston's Hometown Bounce House Rental Company",
    intro:
      "Prestige Rentals is based right here in Houston, TX — so when you book with us, you're supporting a local business that knows Houston neighborhoods, Houston summers, and exactly what Houston families expect.",
    detail:
      "We deliver to every corner of Houston, from the Heights and Montrose to Memorial, Midtown, the Galleria corridor, Clear Lake, and beyond. Whether you're planning a backyard birthday in Garden Oaks or a school carnival in Meyerland, our team delivers on time and sets up fast. Houston is our home — we treat your event like it's our own.",
    neighborhoods: [
      "The Heights", "Montrose", "Memorial", "Midtown", "Galleria",
      "Garden Oaks", "Meyerland", "Clear Lake", "Bellaire", "West University",
      "Kingwood", "Atascocita", "Westchase", "Energy Corridor",
    ],
    eventTypes: ["Backyard birthday parties", "School carnivals", "Church events", "HOA community days", "Corporate picnics"],
    driveTime: "Local — right in our home delivery area",
  },
  katy: {
    name: "Katy",
    county: "Harris, Fort Bend & Waller Counties",
    tagline: "Bounce House Rentals in Katy, TX",
    intro:
      "Katy is one of the fastest-growing family communities in Greater Houston — and one of our most popular delivery areas. From Cinco Ranch to LaCenterra, we bring premium inflatables right to your backyard.",
    detail:
      "Katy families love big backyard parties, and we love serving them. We deliver to subdivisions throughout Katy including Cinco Ranch, Grand Lakes, Seven Meadows, Cross Creek Ranch, and Firethorne. Setup takes about 30 minutes and we handle everything — you just focus on the party.",
    neighborhoods: [
      "Cinco Ranch", "Grand Lakes", "Seven Meadows", "Cross Creek Ranch",
      "Firethorne", "Cane Island", "Morton Ranch", "Pine Mill Ranch",
    ],
    eventTypes: ["Backyard birthday parties", "Neighborhood block parties", "School events", "HOA gatherings", "Summer splash parties"],
    driveTime: "Approx. 30–40 min from central Houston",
  },
  "sugar-land": {
    name: "Sugar Land",
    county: "Fort Bend County",
    tagline: "Bounce House Rentals in Sugar Land, TX",
    intro:
      "Sugar Land is one of Greater Houston's most family-friendly communities, and Prestige Rentals is proud to be a trusted bounce house rental partner for Sugar Land events of all sizes.",
    detail:
      "From First Colony to New Territory and Riverstone, we deliver to every corner of Sugar Land. Our inflatables are a hit at Sugar Land birthday parties, school fundraisers, and neighborhood association events. We arrive early, set up quickly, and leave your yard exactly as we found it.",
    neighborhoods: [
      "First Colony", "New Territory", "Riverstone", "Telfair",
      "Greatwood", "Eldridge / West Oaks", "Sugar Creek",
    ],
    eventTypes: ["Birthday parties", "HOA events", "School carnivals", "Church gatherings", "Corporate family days"],
    driveTime: "Approx. 30 min southwest of Houston",
  },
  pearland: {
    name: "Pearland",
    county: "Brazoria & Harris Counties",
    tagline: "Bounce House Rentals in Pearland, TX",
    intro:
      "Pearland is one of the fastest-growing suburbs south of Houston, and we're here for every birthday, block party, and backyard bash. Prestige Rentals delivers bounce houses throughout Pearland with free setup and pickup.",
    detail:
      "Whether you're in Silverlake, Shadow Creek Ranch, or Pearland Town Center area, we've got you covered. Pearland summers call for water slides and combo units — our most popular rentals in the area. Book early for summer weekends, as Pearland dates fill up fast.",
    neighborhoods: [
      "Silverlake", "Shadow Creek Ranch", "Southdown", "Clear Creek",
      "Brookside Village", "Friendswood (border areas)",
    ],
    eventTypes: ["Summer water slide parties", "Backyard birthdays", "School events", "Church picnics", "Neighborhood cookouts"],
    driveTime: "Approx. 25 min south of Houston",
  },
  cypress: {
    name: "Cypress",
    county: "Harris County",
    tagline: "Bounce House Rentals in Cypress, TX",
    intro:
      "Cypress is a booming northwest Houston community with big backyards and families who know how to throw a party. Prestige Rentals delivers premium bounce houses and water slides throughout Cypress with professional setup and pickup.",
    detail:
      "We serve all of Cypress including Bridgeland, Copperfield, Fairfield, Towne Lake, and Stone Gate. Cypress families consistently book our combo units and water slides for summer parties — and our classic castle bouncers are always a hit for younger kids. Same-day delivery may be available, so don't hesitate to call even last-minute.",
    neighborhoods: [
      "Bridgeland", "Copperfield", "Fairfield", "Towne Lake",
      "Stone Gate", "Cypress Creek Lakes", "Longwood",
    ],
    eventTypes: ["Backyard birthday parties", "HOA events", "School carnivals", "Summer splash parties", "Neighborhood block parties"],
    driveTime: "Approx. 30–35 min northwest of Houston",
  },
  spring: {
    name: "Spring",
    county: "Harris County",
    tagline: "Bounce House Rentals in Spring, TX",
    intro:
      "Spring, TX sits just north of Houston and is home to thousands of families who know how to celebrate. Prestige Rentals delivers and sets up bounce houses throughout Spring for birthdays, school events, and community gatherings.",
    detail:
      "From Spring proper to Louetta and FM 2920 corridor communities, we know the area well. Spring birthday parties are our specialty — we've set up at parks, churches, and backyards all over Spring and always leave customers happy. Our team is prompt, professional, and leaves no mess behind.",
    neighborhoods: [
      "Old Town Spring", "Spring Shadows", "Louetta", "Bammel",
      "Champions", "Willowbrook (border)", "FM 2920 corridor",
    ],
    eventTypes: ["Birthday parties", "Church events", "School fundraisers", "HOA community days", "Family reunions"],
    driveTime: "Approx. 25–30 min north of Houston",
  },
  tomball: {
    name: "Tomball",
    county: "Harris County",
    tagline: "Bounce House Rentals in Tomball, TX",
    intro:
      "Tomball has a small-town feel with big-party energy. Prestige Rentals delivers bounce houses to Tomball and surrounding communities, giving local families an easy, affordable way to elevate any event.",
    detail:
      "We serve Tomball residents in Willowbrook, Rosehill, and the surrounding areas. Tomball's spacious yards make it perfect for our larger combo units and obstacle courses. We handle delivery, setup, and pickup so you can spend your day enjoying the event — not working it.",
    neighborhoods: [
      "Tomball proper", "Rosehill", "Willow Creek Farms",
      "Northwest Houston (border)", "SH 249 corridor",
    ],
    eventTypes: ["Birthday parties", "Family reunions", "Church picnics", "School events", "Neighborhood cookouts"],
    driveTime: "Approx. 35–40 min northwest of Houston",
  },
  "the-woodlands": {
    name: "The Woodlands",
    county: "Montgomery County",
    tagline: "Bounce House Rentals in The Woodlands, TX",
    intro:
      "The Woodlands is one of Greater Houston's premier master-planned communities — and the families here expect premium service. Prestige Rentals delivers clean, safe, high-quality inflatables to The Woodlands for events of all sizes.",
    detail:
      "We deliver to all of The Woodlands' villages — from Grogan's Mill and Panther Creek to Sterling Ridge and Creekside Park. The Woodlands HOAs and country clubs frequently book our units for community events. Our inflatables are immaculate, our team is professional, and our service lives up to Woodlands standards.",
    neighborhoods: [
      "Grogan's Mill", "Panther Creek", "Cochran's Crossing",
      "Indian Springs", "Sterling Ridge", "College Park", "Creekside Park",
    ],
    eventTypes: ["HOA community events", "School carnivals", "Birthday parties", "Corporate family days", "Country club events"],
    driveTime: "Approx. 35–45 min north of Houston",
  },
  humble: {
    name: "Humble",
    county: "Harris County",
    tagline: "Bounce House Rentals in Humble, TX",
    intro:
      "Humble, TX is a tight-knit northeast Houston community with families who love to celebrate together. Prestige Rentals delivers bounce houses and inflatables to Humble for birthdays, church events, and community gatherings.",
    detail:
      "We serve Humble proper as well as Atascocita and the areas surrounding Lake Houston. Whether your party is in a backyard, a park, or a church parking lot, we bring everything needed and handle all the setup. Our water slides are especially popular in Humble during hot Texas summers.",
    neighborhoods: [
      "Humble proper", "Atascocita", "Lake Houston area",
      "Kingwood (border)", "Generation Park (border)",
    ],
    eventTypes: ["Birthday parties", "Church picnics", "School events", "Community cookouts", "Summer water parties"],
    driveTime: "Approx. 20–25 min northeast of Houston",
  },
  conroe: {
    name: "Conroe",
    county: "Montgomery County",
    tagline: "Bounce House Rentals in Conroe, TX",
    intro:
      "Conroe is a fast-growing community north of The Woodlands with a strong family culture. Prestige Rentals proudly serves Conroe families with premium bounce house and inflatable rentals delivered right to your door.",
    detail:
      "From downtown Conroe to the Lake Conroe area and new developments like Grand Central Park, we cover the area. Conroe events tend to be big — we're ready for school carnivals with multiple units or a classic backyard birthday with one perfect bounce house. Call us and we'll put together the right setup for your event.",
    neighborhoods: [
      "Downtown Conroe", "Grand Central Park", "Lake Conroe area",
      "Woodforest", "April Sound", "Bentwater",
    ],
    eventTypes: ["Birthday parties", "School carnivals", "HOA events", "Lake-area parties", "Church gatherings"],
    driveTime: "Approx. 45–50 min north of Houston",
  },
  "jersey-village": {
    name: "Jersey Village",
    county: "Harris County",
    tagline: "Bounce House Rentals in Jersey Village, TX",
    intro:
      "Jersey Village is a small city fully surrounded by Houston with a strong sense of community. Prestige Rentals serves Jersey Village residents with fast, local bounce house delivery and professional setup.",
    detail:
      "Being located within Harris County, Jersey Village events get some of our quickest delivery times. We've served birthday parties, neighborhood events, and school functions throughout Jersey Village. Our local team knows the area and arrives on time, every time.",
    neighborhoods: [
      "Jersey Village proper", "surrounding NW Houston areas",
    ],
    eventTypes: ["Birthday parties", "Neighborhood block parties", "School events", "Community gatherings"],
    driveTime: "Approx. 20–25 min northwest of Houston",
  },
  klein: {
    name: "Klein",
    county: "Harris County",
    tagline: "Bounce House Rentals in Klein, TX",
    intro:
      "Klein is a beloved unincorporated community north of Houston known for its great schools, family neighborhoods, and a community that loves to celebrate. Prestige Rentals delivers bounce houses to Klein for all types of events.",
    detail:
      "Serving the Klein ISD area including communities along FM 2920 and Spring-Cypress Road, we know Klein well. Klein birthday parties are a staple for us — the backyards are big and the families are enthusiastic. We also serve Klein-area churches, schools, and neighborhood associations throughout the year.",
    neighborhoods: [
      "Klein proper", "Spring-Klein area", "FM 2920 corridor",
      "Gleannloch Farms", "Vintage Park (border)",
    ],
    eventTypes: ["Birthday parties", "School carnivals", "Church events", "HOA gatherings", "End-of-year parties"],
    driveTime: "Approx. 30 min north of Houston",
  },
};

export function generateStaticParams() {
  return Object.keys(cityData).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const city = cityData[params.city];
  if (!city) return {};
  return {
    title: `Bounce House Rentals in ${city.name}, TX | Prestige Rentals`,
    description: `Prestige Rentals delivers premium bounce houses and inflatables to ${city.name}, TX. Setup and pickup included. Book online or call (346) 244-3261.`,
  };
}

const allCities = Object.entries(cityData).map(([slug, d]) => ({
  slug,
  name: d.name,
}));

export default function ServiceAreaPage({
  params,
}: {
  params: { city: string };
}) {
  const city = cityData[params.city];
  if (!city) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Prestige Rentals",
    description: `Bounce house and inflatable rentals serving ${city.name}, TX and Greater Houston.`,
    telephone: "+13462443261",
    email: "info@prestigerentals.com",
    url: "https://prestige-rentals.onrender.com",
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: "Texas",
      },
    },
    openingHours: "Mo-Su 07:00-20:00",
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Serving {city.county}
        </div>
        <h1 className="text-4xl font-black mb-3">{city.tagline}</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">{city.intro}</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-black text-blue-950 mb-4">
              We Deliver to {city.name}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{city.detail}</p>
            <p className="text-sm text-gray-500">
              🚗 <span className="font-medium">{city.driveTime}</span>
            </p>
            <div className="mt-6">
              <AvailabilitySearchWidget />
              <a href="tel:+13462443261" className="block text-center mt-3 text-blue-950 font-semibold underline underline-offset-4">
                Or call us: 📞 (346) 244-3261
              </a>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 space-y-4">
            <h3 className="font-black text-blue-950 text-lg">
              Areas We Serve in {city.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {city.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="bg-white border border-blue-200 text-blue-900 text-sm px-3 py-1.5 rounded-full"
                >
                  📍 {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-6 text-center">
            What&apos;s Included With Every {city.name} Rental
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🚚", title: "Delivery to Your Door", desc: `We deliver to ${city.name} — delivery is quoted at checkout based on your address.` },
              { icon: "🔧", title: "Professional Setup", desc: "Our crew handles all setup and staking — takes about 30 minutes." },
              { icon: "✅", title: "Safety Inspection", desc: "Every unit is inspected on-site before we leave your property." },
              { icon: "📦", title: "Free Pickup", desc: "We return at the end of your rental window and break everything down." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-blue-950 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-4">
            Popular Events in {city.name}
          </h2>
          <div className="flex flex-wrap gap-3">
            {city.eventTypes.map((e) => (
              <span
                key={e}
                className="bg-yellow-50 border border-yellow-200 text-yellow-900 font-medium text-sm px-4 py-2 rounded-full"
              >
                🎉 {e}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">
            No matter what you&apos;re celebrating, Prestige Rentals has the
            right inflatable for your {city.name} event. Browse our full
            selection and check availability online.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-blue-950 mb-6 text-center">
            Browse Our Inflatables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { name: "Bounce Houses", desc: "Classic and themed bounce houses starting at $175/day.", href: "/rentals", icon: "🏰" },
              { name: "Water Slides", desc: "Beat the Houston heat with a premium water slide rental.", href: "/rentals", icon: "💧" },
              { name: "Combo Units", desc: "Bounce, slide, and climb — all in one unit.", href: "/rentals", icon: "🎠" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:border-yellow-400 hover:shadow-md transition-all group"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-blue-950 mb-2 group-hover:text-yellow-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/rentals" className="btn-secondary inline-block">
              View All Inflatables →
            </Link>
          </div>
        </section>

        <section className="bg-yellow-500 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-black text-blue-950 mb-3">
            Ready to Book in {city.name}?
          </h2>
          <p className="text-blue-800 mb-6 max-w-xl mx-auto">
            Check availability and reserve your inflatable online in minutes. Our
            team will confirm within 1–2 business days.
          </p>
          <div className="max-w-2xl mx-auto text-left mb-4">
            <AvailabilitySearchWidget />
          </div>
          <a
            href="tel:+13462443261"
            className="text-blue-950 font-bold underline underline-offset-4"
          >
            Or call: 📞 (346) 244-3261
          </a>
        </section>

        <section>
          <h2 className="text-xl font-black text-blue-950 mb-4 text-center">
            Other Areas We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {allCities
              .filter((c) => c.slug !== params.city)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/service-areas/${c.slug}`}
                  className="bg-white border border-gray-200 text-blue-900 text-sm px-4 py-2 rounded-full hover:border-yellow-400 hover:text-yellow-700 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </section>

      </div>
    </>
  );
}
