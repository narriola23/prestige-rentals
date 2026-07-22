import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Prestige Rentals Houston",
  description:
    "Prestige Rentals' privacy policy. Learn how we collect, use, and protect your personal information when you book with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="text-gray-300 text-lg">Last updated: July 2, 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-10 text-gray-600 leading-relaxed">

          <div>
            <p>
              Prestige Rentals ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains what personal information we collect, how we use it, and your rights regarding that information. By using our website or booking with us, you agree to the practices described here.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect information you provide directly to us, including:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Contact information:</strong> name, email address, phone number</li>
              <li><strong>Booking details:</strong> event date, delivery address, city, ZIP code, rental notes</li>
              <li><strong>Payment information:</strong> collected verbally or via secure third-party processors — we do not store card numbers on our servers</li>
            </ul>
            <p className="mt-3">
              We may also automatically collect certain technical data when you visit our website, such as your IP address, browser type, pages viewed, and referring URL. This data is used in aggregate for analytics and does not identify you personally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Process and confirm your rental booking</li>
              <li>Contact you regarding your reservation, delivery, and payment</li>
              <li>Send booking reminders and follow-up communications</li>
              <li>Respond to your inquiries and customer service requests</li>
              <li>Improve our website and services</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> use your information to send unsolicited marketing emails without your consent, and we do <strong>not</strong> sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">3. How We Share Your Information</h2>
            <p>
              We do not sell, rent, or share your personal information with third parties for their marketing purposes. We may share your information with service providers who assist us in operating our website and running our business (e.g., payment processors, delivery coordination tools) under strict confidentiality agreements. We may also disclose information if required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">4. Data Retention</h2>
            <p>
              We retain your booking information for as long as necessary to fulfill the purposes described in this policy and to comply with legal obligations. Booking records are typically retained for a minimum of 2 years. You may request deletion of your personal data at any time (see Section 6).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">5. Cookies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to improve your browsing experience. Cookies are small text files stored on your device. You can control cookie preferences through your browser settings. Disabling cookies may affect certain website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">6. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Request a copy of the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of future communications from us</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:info@prestigerentalshouston.com" className="text-yellow-600 underline">
                info@prestigerentalshouston.com
              </a>{" "}
              or call{" "}
              <a href="tel:+13462443261" className="text-yellow-600">
                (346) 244-3261
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">7. Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of internet transmission or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">8. Children's Privacy</h2>
            <p>
              Our website is intended for adults booking services for children's events. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our website or services after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-3">10. Contact Us</h2>
            <p className="mb-3">For questions or concerns about this Privacy Policy, contact us:</p>
            <ul className="space-y-2">
              <li>📞 <a href="tel:+13462443261" className="text-yellow-600 font-medium">(346) 244-3261</a></li>
              <li>✉️ <a href="mailto:info@prestigerentalshouston.com" className="text-yellow-600 font-medium">info@prestigerentalshouston.com</a></li>
              <li>📍 Houston, TX</li>
            </ul>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center text-sm text-blue-800">
            We take your privacy seriously. We will never sell your information. Period.
          </div>
        </div>
      </div>
    </>
  );
}
