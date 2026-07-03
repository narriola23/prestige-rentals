import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation Policy | Prestige Rentals Houston",
  description:
    "Learn about Prestige Rentals' cancellation and rescheduling policy for bounce house rentals in Houston. We make it easy to adjust your booking.",
};

export default function CancellationPolicyPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Cancellation Policy</h1>
        <p className="text-gray-300 text-lg">Last updated: July 2, 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-10">

          <div>
            <p className="text-gray-600 leading-relaxed">
              We understand that plans change. Our cancellation policy is designed to be fair to both parties while allowing us to manage our rental schedule. Please read the details below before booking.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Cancellation Timeframes</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-bold text-green-800">48+ Hours Before Your Event</p>
                  <p className="text-green-700 text-sm mt-1">Full refund of your deposit. No questions asked. Call or text us to cancel.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-bold text-yellow-800">24–48 Hours Before Your Event</p>
                  <p className="text-yellow-700 text-sm mt-1">Your deposit will be held as a credit toward a future booking. Reschedules at no charge — credit is valid for 12 months.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-bold text-red-800">Less Than 24 Hours Before Your Event</p>
                  <p className="text-red-700 text-sm mt-1">The deposit is non-refundable. We're often unable to fill the slot on short notice. We will still work with you to reschedule when possible.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">Weather Cancellations</h2>
            <p className="text-gray-600 leading-relaxed">
              If we determine that weather conditions are unsafe for operation (heavy rain, lightning, or high winds exceeding 25 mph), we will contact you to reschedule at <strong>no charge</strong>, regardless of when the cancellation occurs. See our <Link href="/policies/rain" className="text-yellow-600 underline hover:text-yellow-700">Rain Policy</Link> for full details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">Rescheduling</h2>
            <p className="text-gray-600 leading-relaxed">
              You may reschedule your booking at any time subject to availability. We ask for at least 48 hours' notice when rescheduling so we can adjust our delivery schedule. Rescheduling more than once may require a new deposit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">How to Cancel or Reschedule</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              To cancel or reschedule, please contact us as soon as possible:
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>📞 Call or text: <a href="tel:+18327161836" className="text-yellow-600 font-medium">(832) 716-1836</a></li>
              <li>✉️ Email: <a href="mailto:info@prestigerentals.com" className="text-yellow-600 font-medium">info@prestigerentals.com</a></li>
              <li>🕐 Available Mon–Sun, 7am–8pm</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">Same-Day Cancellations by Prestige Rentals</h2>
            <p className="text-gray-600 leading-relaxed">
              In the rare event that we must cancel due to equipment issues or unforeseen circumstances on our end, you will receive a <strong>full refund of your deposit</strong> and priority rescheduling at no additional charge.
            </p>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-blue-950 font-semibold mb-3">Questions about your booking?</p>
            <Link href="/contact" className="btn-primary inline-block">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
