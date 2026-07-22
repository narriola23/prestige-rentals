"use client";
import { useState } from "react";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

const eventTypes = [
  "Backyard Birthday",
  "Summer Water Party",
  "School / Church Event",
  "Toddler Party",
  "Large Event / Corporate",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  eventType: "",
  guestCount: "",
  location: "",
  message: "",
};

export default function QuotePage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us directly at (346) 244-3261.");
    } finally {
      setLoading(false);
    }
  };

  const ic = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition";
  const lc = "block text-sm font-semibold text-blue-950 mb-1";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Get a Quote</h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto px-4">
          Not ready to book yet? Tell us about your event and we&apos;ll put together a custom quote — no commitment required.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-black text-blue-950 mb-2">Quote Request Sent!</h3>
                <p className="text-gray-600">Thanks! We&apos;ll follow up with a custom quote within 1–2 business days.</p>
                <button onClick={() => { setSubmitted(false); setForm(initialForm); }} className="btn-primary mt-6">Request Another Quote</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-blue-950 mb-6">Tell Us About Your Event</h2>
                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className={lc}>Your Name *</label>
                    <input type="text" required placeholder="Jane Smith" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} className={ic} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={lc}>Email *</label>
                      <input type="email" required placeholder="jane@example.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} className={ic} />
                    </div>
                    <div>
                      <label className={lc}>Phone *</label>
                      <input type="tel" required placeholder="(346) 244-3261" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} className={ic} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <label className={lc}>Event Date</label>
                      <input type="date" min={new Date().toISOString().split("T")[0]} value={form.eventDate}
                        onChange={(e) => setForm({ ...form, eventDate: e.target.value })} className={ic} />
                    </div>
                    <div className="min-w-0">
                      <label className={lc}>Event Type</label>
                      <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className={ic + " min-h-[3.25rem] bg-white"}>
                        <option value="">— Select —</option>
                        {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={lc}>Estimated Guest Count</label>
                      <input type="number" min={1} placeholder="20" value={form.guestCount}
                        onChange={(e) => setForm({ ...form, guestCount: e.target.value })} className={ic} />
                    </div>
                    <div>
                      <label className={lc}>Location / ZIP</label>
                      <input type="text" placeholder="Houston, 77001" value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })} className={ic} />
                    </div>
                  </div>
                  <div>
                    <label className={lc}>Tell Us More</label>
                    <textarea placeholder="What are you looking for? Any specific inflatables, add-ons, or budget in mind?" value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={ic} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full text-lg disabled:opacity-50">
                    {loading ? "Sending..." : "Request My Quote →"}
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-black text-blue-950 mb-6">Or Reach Us Directly</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4"><div className="text-2xl">📞</div><div><p className="font-semibold text-blue-950">Phone</p><a href="tel:+13462443261" className="text-yellow-600 font-medium">(346) 244-3261</a><p className="text-sm text-gray-500 mt-0.5">Mon–Sun, 7am–8pm</p></div></div>
                <div className="flex items-start gap-4"><div className="text-2xl">✉️</div><div><p className="font-semibold text-blue-950">Email</p><a href="mailto:info@prestigerentalshouston.com" className="text-yellow-600 font-medium">info@prestigerentalshouston.com</a></div></div>
                <div className="flex items-start gap-4"><div className="text-2xl">📍</div><div><p className="font-semibold text-blue-950">Service Area</p><p className="text-gray-600">Houston, TX &amp; Surrounding Areas</p><p className="text-sm text-gray-500">Delivery straight to your door</p></div></div>
              </div>
            </div>
            <div className="bg-yellow-500 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-black text-blue-950 mb-2">Already Know What You Want?</h3>
              <p className="text-blue-800 text-sm mb-4">Skip the quote — check availability and book directly online.</p>
              <AvailabilitySearchWidget variant="compact" className="inline-block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
