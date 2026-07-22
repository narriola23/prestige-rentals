import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Prestige Rentals Houston",
  description:
    "Terms of service for Prestige Rentals bounce house and inflatable rentals in Houston, TX.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Terms of Service</h1>
        <p className="text-gray-300 text-lg">Last updated: July 2, 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-10 text-gray-600 leading-relaxed">

          <div>
            <p>
              These Terms of Service ("Terms") govern your use of the Prestige Rentals website and the rental services we provide. By accessing our website or placing a booking, you agree to be bound by these Terms. Please read them carefully.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">1. Use of Our Website</h2>
            <p>
              You may use our website for lawful purposes only. You agree not to use our site to transmit harmful, misleading, or unlawful content, or to attempt to gain unauthorized access to our systems. We reserve the right to terminate access for any user who violates these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">2. Booking & Reservations</h2>
            <p>
              Submitting a booking request does not guarantee availability. A booking is confirmed only after Prestige Rentals contacts you to verify the date and collect a deposit. We reserve the right to decline any booking at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">3. Pricing & Payment</h2>
            <p>
              All prices listed on our website are in U.S. dollars. Prices are subject to change without notice. The price quoted at the time of booking confirmation is the price you will pay. A deposit is required to secure your reservation; the remaining balance is due at the time of delivery. Accepted payment methods include credit/debit cards, cash, Venmo, and Zelle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">4. Cancellations & Refunds</h2>
            <p>
              Cancellations and refunds are handled according to our{" "}
              <Link href="/policies/cancellation" className="text-yellow-600 underline">
                Cancellation Policy
              </Link>
              . By booking with us, you agree to those terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">5. Equipment Use & Safety</h2>
            <p>
              All equipment must be used in accordance with our{" "}
              <Link href="/policies/safety" className="text-yellow-600 underline">
                Safety Rules
              </Link>{" "}
              and{" "}
              <Link href="/policies/rental-agreement" className="text-yellow-600 underline">
                Rental Agreement
              </Link>
              . The Customer is responsible for supervising all participants and ensuring proper use of rented equipment. Prestige Rentals is not liable for injuries resulting from failure to follow safety guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">6. Damage to Equipment</h2>
            <p>
              The Customer is financially responsible for any damage to rented equipment caused by misuse, negligence, or failure to follow our guidelines. Damage assessments will be provided after equipment inspection upon pickup.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">7. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and images — is the property of Prestige Rentals and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">8. Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided "as is" without warranties of any kind, express or implied. We do not guarantee that the website will be error-free, uninterrupted, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Prestige Rentals shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our total liability shall not exceed the amount paid by you for your most recent rental.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">10. Privacy</h2>
            <p>
              Your use of our website and services is also governed by our{" "}
              <Link href="/policies/privacy" className="text-yellow-600 underline">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in Harris County, Texas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">12. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of our website or services after any changes constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">13. Contact</h2>
            <p className="mb-3">For questions about these Terms, contact us:</p>
            <ul className="space-y-2">
              <li>📞 <a href="tel:+13462443261" className="text-yellow-600 font-medium">(346) 244-3261</a></li>
              <li>✉️ <a href="mailto:info@prestigerentalshouston.com" className="text-yellow-600 font-medium">info@prestigerentalshouston.com</a></li>
              <li>📍 Houston, TX</li>
            </ul>
          </section>

        </div>
      </div>
    </>
  );
}
