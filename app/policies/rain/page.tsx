import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rain Policy | Prestige Rentals Houston",
  description:
    "Prestige Rentals' weather and rain policy for bounce house rentals in Houston. Learn what happens when it rains on your event day.",
};

export default function RainPolicyPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Rain & Weather Policy</h1>
        <p className="text-gray-300 text-lg">Last updated: July 2, 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-10">

          <div>
            <p className="text-gray-600 leading-relaxed">
              Houston weather can be unpredictable. Our weather policy is built around one priority: <strong>the safety of your guests</strong>. Here's exactly what to expect if the forecast isn't looking great on your event day.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Light Rain — Rental Proceeds</h2>
            <div className="flex gap-4 p-5 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-2xl">🌦️</span>
              <p className="text-blue-800 leading-relaxed text-sm">
                Light or passing showers typically do not affect bounce house operation. If rain is light and there is no lightning, your rental will proceed as scheduled. Dry-slide inflatables should be toweled down periodically in wet conditions. Wet/water slides are unaffected by rain.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Severe Weather — Free Reschedule</h2>
            <div className="flex gap-4 p-5 bg-red-50 border border-red-200 rounded-xl">
              <span className="text-2xl">⛈️</span>
              <p className="text-red-800 leading-relaxed text-sm">
                If heavy rain, lightning, or winds above 25 mph are forecast or occur, we will contact you to reschedule at <strong>no charge</strong>. Safety is non-negotiable — inflatables must be deflated during any active storm or lightning event.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">Wind Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              Inflatables must be deflated and secured when wind speeds reach or exceed <strong>25 mph</strong>. This is an industry safety standard. If sustained winds are forecast above this threshold on your event day, we will reach out to discuss options. Wind speed checks are based on National Weather Service data for your delivery area.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">Lightning Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              There is <strong>zero tolerance</strong> for lightning during inflatable operation. If lightning is detected within 10 miles of your event location, the inflatable must be deflated immediately and all guests must move indoors. Do not allow anyone to use the inflatable until the storm has fully passed and 30 minutes have elapsed since the last lightning strike.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">During Your Rental — If Weather Changes</h2>
            <p className="text-gray-600 leading-relaxed">
              If weather conditions become unsafe <em>after</em> setup and during your event, you or our team may call us to arrange early pickup. We reserve the right to dispatch a crew to deflate the unit if conditions become dangerous. In these situations, no additional charges will apply and rescheduling will be offered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">Refund & Reschedule Terms for Weather</h2>
            <p className="text-gray-600 leading-relaxed">
              Weather-related cancellations initiated by Prestige Rentals result in a <strong>full deposit credit</strong> toward a future booking, valid for 12 months. We do not offer cash refunds for weather events that occur after our crew has delivered and set up the equipment, but we will make every effort to accommodate a reschedule.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              If you choose to cancel due to weather concerns and we have not initiated a cancellation, standard{" "}
              <Link href="/policies/cancellation" className="text-yellow-600 underline hover:text-yellow-700">
                Cancellation Policy
              </Link>{" "}
              terms apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">Day-of Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We monitor the weather forecast closely for all upcoming events. If conditions look concerning, we'll reach out the evening before or the morning of your event. You're also welcome to contact us any time:
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>📞 Call or text: <a href="tel:+18327161836" className="text-yellow-600 font-medium">(832) 716-1836</a></li>
              <li>🕐 Available Mon–Sun, 7am–8pm</li>
            </ul>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-blue-950 font-semibold mb-1">Concerned about the forecast?</p>
            <p className="text-gray-600 text-sm mb-4">Give us a call — we'll check the weather together and make a plan.</p>
            <a href="tel:+18327161836" className="btn-primary inline-block">📞 (832) 716-1836</a>
          </div>
        </div>
      </div>
    </>
  );
}
