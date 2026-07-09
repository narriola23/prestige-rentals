import type { Metadata } from "next";
import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

export const metadata: Metadata = {
  title: "FAQ – Bounce House Rental Questions | Prestige Rentals Houston",
  description:
    "Find answers to common questions about renting bounce houses in Houston — pricing, delivery, safety, weather policies, cancellations, and more. Prestige Rentals serves Greater Houston.",
};

const faqs = [
  {
    category: "Booking & Reservations",
    items: [
      {
        q: "How do I book a bounce house rental?",
        a: "Booking is simple. Browse our inflatables, pick the one you want, and complete the online booking form. Our team will call you within 2 hours to confirm your date and collect the deposit. You can also call or text us directly at (832) 716-1836 any day 7am–8pm.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking 2–4 weeks ahead, especially for weekends and holidays. Summer months (May–August) fill up fast. That said, we often have last-minute openings — check availability online or give us a call.",
      },
      {
        q: "Can I book a bounce house for the same day?",
        a: "Same-day rentals are available based on inventory and our delivery schedule. Call or text us as early in the morning as possible and we'll do our best to make it work.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    items: [
      {
        q: "How much does it cost to rent a bounce house in Houston?",
        a: "Our bounce houses range from $100–$255/day, and our water slides range from $180–$195/day. Every rental includes setup and pickup. Delivery is quoted at checkout based on your delivery address. View full pricing on the Inflatables page.",
      },
      {
        q: "Is a deposit required to hold my date?",
        a: "Yes. A deposit is required to secure your reservation. The deposit amount varies by unit and is collected over the phone after we confirm your booking. The remaining balance is due on the day of your event.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards, cash, Venmo, and Zelle. Full payment details are provided during your booking confirmation call.",
      },
    ],
  },
  {
    category: "Delivery & Setup",
    items: [
      {
        q: "Do you deliver and set up the inflatable?",
        a: "Yes — delivery, professional setup, and pickup are all included with every rental. Our crew arrives 1–2 hours before your event start time to get everything ready. At the end of your rental window, we return to break it all down. You don't lift a finger.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve Houston and the surrounding communities including Katy, Sugar Land, The Woodlands, Cypress, Spring, Humble, Tomball, Pearland, Conroe, Jersey Village, Klein, and more. Delivery is quoted at checkout based on your delivery address, before you pay. Not sure if we cover your address? Call us — we're happy to check.",
      },
      {
        q: "What do I need to prepare before delivery?",
        a: "Please make sure the setup area is clear of debris, rocks, sticks, and pet waste. Most inflatables need a flat surface (grass or concrete) with open clearance on all sides. We'll confirm the exact space requirements when you book so there are no surprises on event day.",
      },
    ],
  },
  {
    category: "Safety & Equipment",
    items: [
      {
        q: "Are your inflatables insured and safety-inspected?",
        a: "Yes. All Prestige Rentals inflatables are fully insured and regularly inspected for safety. We carry general liability insurance and all equipment meets or exceeds industry safety standards. We're happy to provide proof of insurance upon request for venues or HOAs that require it.",
      },
      {
        q: "How many children can use the bounce house at once?",
        a: "Each inflatable has a recommended capacity listed on its product page — typically 6–10 children depending on the unit size. Exceeding the capacity limit is a safety risk and is not permitted.",
      },
      {
        q: "Do adults need to supervise children on the bounce house?",
        a: "Yes — a responsible adult must supervise children at all times while the inflatable is in use. We provide a safety rules sheet at delivery. Key rules include: no flips or rough play, no shoes inside, no food or drinks in the bounce area, and keeping different age groups separate.",
      },
    ],
  },
  {
    category: "Weather & Cancellations",
    items: [
      {
        q: "What happens if it rains on my event day?",
        a: "Light or passing rain typically does not cancel a rental — bounce houses can still operate safely in mild conditions. If heavy rain, lightning, or severe weather is forecasted, we'll contact you to discuss options and reschedule at no charge. Safety is always our first priority.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellations made 48 hours or more before your event receive a full refund of the deposit. Cancellations within 48 hours may be subject to a cancellation fee. We are always willing to work with you on rescheduling — life happens and we understand.",
      },
      {
        q: "Do you operate during high winds or storms?",
        a: "No. Inflatables must be deflated and secured when winds exceed 25 mph or any storm or lightning is present. If dangerous conditions develop after setup, we reserve the right to deflate the unit for safety. In these situations, we will always offer a full reschedule at no additional charge.",
      },
    ],
  },
];

const allFaqs = faqs.flatMap((g) => g.items);

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto">
          Everything you need to know before you book — answered right here.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {faqs.map((group) => (
          <section key={group.category}>
            <h2 className="text-xl font-black text-blue-950 mb-5 pb-2 border-b border-gray-200">
              {group.category}
            </h2>
            <div className="space-y-3">
              {group.items.map((item) => (
                <details
                  key={item.q}
                  className="group border border-gray-200 rounded-xl bg-white overflow-hidden"
                >
                  <summary className="flex justify-between items-center px-5 py-4 cursor-pointer list-none font-semibold text-blue-950 hover:bg-gray-50 transition-colors">
                    <span>{item.q}</span>
                    <span className="ml-4 flex-shrink-0 text-yellow-500 text-2xl leading-none group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="bg-yellow-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-blue-950 mb-2">
            Still have a question?
          </h2>
          <p className="text-blue-800 mb-6">
            Our team is available 7 days a week, 7am–8pm. We're happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18327161836"
              className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-lg transition-all shadow inline-block"
            >
              📞 Call (832) 716-1836
            </a>
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-50 text-blue-950 font-bold px-8 py-3 rounded-lg border border-blue-200 transition-all inline-block"
            >
              Send a Message
            </Link>
          </div>
        </section>

        <div className="text-center pt-4">
          <p className="text-gray-500 mb-4 text-sm">Ready to reserve your inflatable?</p>
          <AvailabilitySearchWidget variant="compact" className="text-lg px-10 py-4" />
        </div>
      </div>
    </>
  );
}
