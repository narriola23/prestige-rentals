"use client";
import { useState } from "react";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please call us directly at (346) 244-3261.");
    } finally {
      setLoading(false);
    }
  };

  const ic = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition";
  const lc = "block text-sm font-semibold text-blue-950 mb-1";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Contact Us</h1>
        <p className="text-gray-300 text-lg">We&apos;d love to hear from you</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">📨</div>
                <h3 className="text-xl font-black text-blue-950 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thanks for reaching out! We&apos;ll get back to you within a few hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }} className="btn-primary mt-6">Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-blue-950 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div><label className={lc}>Your Name *</label><input type="text" required placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={ic} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lc}>Email *</label><input type="email" required placeholder="jane@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={ic} /></div>
                    <div><label className={lc}>Phone</label><input type="tel" placeholder="(346) 244-3261" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={ic} /></div>
                  </div>
                  <div><label className={lc}>Message *</label><textarea required placeholder="Tell us about your event..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className={ic} /></div>
                  <button type="submit" disabled={loading} className="btn-primary w-full text-lg disabled:opacity-50">{loading ? "Sending..." : "Send Message →"}</button>
                </form>
              </>
            )}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-black text-blue-950 mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4"><div className="text-2xl">📞</div><div><p className="font-semibold text-blue-950">Phone</p><a href="tel:+13462443261" className="text-yellow-600 font-medium">(346) 244-3261</a><p className="text-sm text-gray-500 mt-0.5">Mon–Sun, 7am–8pm</p></div></div>
                <div className="flex items-start gap-4"><div className="text-2xl">✉️</div><div><p className="font-semibold text-blue-950">Email</p><a href="mailto:info@prestigerentals.com" className="text-yellow-600 font-medium">info@prestigerentals.com</a></div></div>
                <div className="flex items-start gap-4"><div className="text-2xl">📍</div><div><p className="font-semibold text-blue-950">Service Area</p><p className="text-gray-600">Houston, TX &amp; Surrounding Areas</p><p className="text-sm text-gray-500">Free delivery within 20 miles</p></div></div>
                <div className="flex items-start gap-4"><div className="text-2xl">🕐</div><div><p className="font-semibold text-blue-950">Business Hours</p><p className="text-gray-600">Monday – Sunday: 7:00 AM – 8:00 PM</p></div></div>
              </div>
            </div>
            <div className="bg-yellow-500 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-black text-blue-950 mb-2">Ready to Book?</h3>
              <p className="text-blue-800 text-sm mb-4">Skip the form — book directly online and check availability instantly.</p>
              <AvailabilitySearchWidget variant="compact" className="inline-block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
