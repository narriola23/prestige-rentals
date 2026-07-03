import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safety Rules | Prestige Rentals Houston",
  description:
    "Safety rules for bounce house and inflatable rentals from Prestige Rentals in Houston. Required reading for all customers before your event.",
};

export default function SafetyRulesPage() {
  return (
    <>
      <section className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Safety Rules</h1>
        <p className="text-gray-300 text-lg">Required reading for all renters</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-10">

          <div className="bg-red-50 border border-red-300 rounded-xl p-5">
            <p className="text-red-800 font-semibold text-sm">
              ⚠️ By renting from Prestige Rentals, you agree to enforce these safety rules for all participants. Failure to follow these rules may result in injury and termination of your rental without refund.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Adult Supervision</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>A responsible adult must supervise the inflatable at all times while it is in use.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Supervisors must remain attentive — no phones or distractions while children are inside.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>The renter is responsible for enforcing all safety rules with all guests.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Capacity & Age Groups</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Do not exceed the maximum capacity listed for your inflatable. Capacity is shown on the product page and on the unit itself.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Separate younger children (under 5) from older children. Mixing large and small children increases the risk of injury.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Adults should not use inflatables designed for children — weight limits apply.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Before Entering the Inflatable</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span><strong>Remove shoes.</strong> No footwear of any kind inside the bounce area.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Remove glasses, jewelry, and any sharp objects before entering.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Empty all pockets — keys, pens, and similar items can puncture the inflatable.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>No face paint, glitter, or silly string near or inside the inflatable.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Prohibited Activities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "No flips, somersaults, or wrestling",
                "No rough play or pushing",
                "No food, drinks, or gum inside",
                "No silly string or confetti",
                "No water inside dry inflatables",
                "No pets inside any inflatable",
                "No climbing on the outside walls",
                "No sharp objects of any kind",
              ].map((rule) => (
                <div key={rule} className="flex gap-2 items-start text-sm text-gray-600 bg-red-50 rounded-lg px-4 py-3">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Entry & Exit</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Enter and exit only through the designated opening — never climb over the walls.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Do not allow children to hang on or jump near the entrance/exit.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Have children exit one at a time to prevent crowding at the opening.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Water Slide Safety (if applicable)</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Only one child may slide at a time — no racing down the slide.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Slide feet-first only. No headfirst sliding.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Do not climb up the slide — use the designated climbing area only.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Ensure the splash pool area is clear before the next rider descends.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">Weather</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Deflate and evacuate the inflatable immediately if lightning is visible or thunder is heard.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Do not resume use until 30 minutes after the last lightning strike.</span></li>
              <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">→</span><span>Deflate the unit in winds exceeding 25 mph. See our <Link href="/policies/rain" className="text-yellow-600 underline">Rain & Weather Policy</Link>.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-950 mb-4">If Something Goes Wrong</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              If the inflatable begins to deflate unexpectedly, evacuate all children immediately and stay clear of the unit. Check that the blower is plugged in and the power source is active. Call us right away:
            </p>
            <p className="font-semibold text-blue-950">
              📞 <a href="tel:+18327161836" className="text-yellow-600">(832) 716-1836</a> — available 7am–8pm daily
            </p>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-blue-950 font-semibold mb-1">Have a safe and amazing party!</p>
            <p className="text-gray-600 text-sm mb-4">These rules exist because we care about your guests. Thank you for taking them seriously.</p>
            <Link href="/book" className="btn-primary inline-block">📅 Book Your Inflatable</Link>
          </div>
        </div>
      </div>
    </>
  );
}
