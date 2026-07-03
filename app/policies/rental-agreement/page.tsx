import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rental Agreement | Prestige Rentals Houston",
  description:
    "Prestige Rentals' rental agreement for bounce house and inflatable rentals in Houston, TX. Understand your responsibilities as a renter.",
};

export default function RentalAgreementPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Rental Agreement</h1>
        <p className="text-gray-300 text-lg">Last updated: July 2, 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-10 text-gray-600 leading-relaxed">

          <div>
            <p>
              This Rental Agreement ("Agreement") is entered into between <strong>Prestige Rentals</strong> ("Company") and the individual or entity completing a booking ("Customer"). By booking with Prestige Rentals, you agree to the following terms.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">1. Equipment & Delivery</h2>
            <p>
              Prestige Rentals will deliver, set up, and retrieve all rented equipment at the agreed-upon times. The Customer is responsible for ensuring that the setup area is accessible, flat, clear of debris, and meets the space requirements provided at booking. If our crew cannot safely access or set up in the designated area, the rental may be forfeited without refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">2. Power Requirements</h2>
            <p>
              All inflatables require a standard 110V/20-amp electrical outlet within 50 feet of the setup area. Extension cords must be heavy-duty (12-gauge minimum). Prestige Rentals may supply a blower extension cord upon request. The Customer is responsible for ensuring power is available and uninterrupted during the rental period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">3. Customer Responsibilities</h2>
            <p className="mb-3">The Customer agrees to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Supervise all participants at all times during inflatable use</li>
              <li>Enforce all safety rules provided at delivery (see our <Link href="/policies/safety" className="text-yellow-600 underline">Safety Rules</Link>)</li>
              <li>Ensure the inflatable is not used during unsafe weather conditions</li>
              <li>Prevent unauthorized use by non-guests</li>
              <li>Not move, disassemble, or alter the equipment in any way</li>
              <li>Keep the inflatable free of food, drinks, sharp objects, and pets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">4. Damage & Liability</h2>
            <p className="mb-3">
              The Customer is responsible for any damage to the equipment beyond normal wear and tear. Damage caused by negligence, prohibited use, or failure to follow safety guidelines will be billed to the Customer. Damage fees vary based on the extent of the damage:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Minor punctures or seam damage: $75–$200</li>
              <li>Blower motor damage: $150–$350</li>
              <li>Significant structural damage or loss: replacement cost of the unit</li>
            </ul>
            <p className="mt-3">
              Prestige Rentals carries general liability insurance covering our equipment and operations. The Customer's homeowner's or renter's insurance may provide additional coverage for events held at a private residence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">5. Payment & Deposits</h2>
            <p>
              A deposit is required to confirm all bookings. The remaining balance is due on the day of the event prior to setup. Accepted payment methods include credit/debit cards, cash, Venmo, and Zelle. Failure to tender payment at delivery may result in cancellation of the rental.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">6. Cancellations & Rescheduling</h2>
            <p>
              All cancellations and rescheduling requests are governed by our{" "}
              <Link href="/policies/cancellation" className="text-yellow-600 underline">
                Cancellation Policy
              </Link>
              . Weather-related cancellations are governed by our{" "}
              <Link href="/policies/rain" className="text-yellow-600 underline">
                Rain & Weather Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">7. Assumption of Risk</h2>
            <p>
              The Customer acknowledges that the use of inflatable equipment carries inherent risks, including the risk of physical injury. The Customer assumes full responsibility for the safety of all participants and agrees to hold Prestige Rentals harmless from claims arising from the Customer's failure to supervise participants or enforce safety rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">8. Limitation of Liability</h2>
            <p>
              Prestige Rentals' liability under this Agreement shall not exceed the total amount paid by the Customer for the rental. Prestige Rentals is not liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">9. Governing Law</h2>
            <p>
              This Agreement shall be governed by the laws of the State of Texas. Any disputes shall be resolved in Harris County, Texas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">10. Agreement to Terms</h2>
            <p>
              By completing a booking with Prestige Rentals — whether online, by phone, or by text — the Customer confirms they have read, understood, and agreed to this Rental Agreement in full.
            </p>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-blue-950 font-semibold mb-1">Questions about this agreement?</p>
            <p className="text-gray-600 text-sm mb-4">We're happy to walk you through anything before you book.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+18327161836" className="btn-primary inline-block">📞 (832) 716-1836</a>
              <Link href="/contact" className="btn-secondary inline-block">Send a Message</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
