"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  slug: string;
  base_price: number;
  deposit_amount: number;
}

function BookingFormInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedSlug = searchParams.get("product") || "";

  const [step, setStep] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [availabilityMsg, setAvailabilityMsg] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const [form, setForm] = useState({
    eventDate: "",
    productId: "",
    startTime: "10:00",
    endTime: "16:00",
    fullName: "",
    phone: "",
    email: "",
    deliveryAddress: "",
    city: "",
    state: "TX",
    zipCode: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const prods = data.products || [];
        setProducts(prods);
        if (preselectedSlug) {
          const found = prods.find((p: any) => p.slug === preselectedSlug);
          if (found) setForm((f) => ({ ...f, productId: String(found.id) }));
        }
      })
      .catch(() => setError("Could not load products. Please try again."));
  }, [preselectedSlug]);

  const selectedProduct = products.find((p) => String(p.id) === form.productId);

  const checkAvailability = async () => {
    if (!form.productId || !form.eventDate) {
      setAvailabilityMsg("Please select an inflatable and a date first.");
      return;
    }
    setLoading(true);
    setAvailabilityMsg("");
    try {
      const res = await fetch("/api/availability?productId=" + form.productId + "&date=" + form.eventDate);
      const data = await res.json();
      setIsAvailable(data.available);
      setAvailabilityMsg(data.available
        ? "Great news! This date is available."
        : "This date is already booked. Please choose another date.");
    } catch {
      setAvailabilityMsg("Could not check availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStep1Next = () => {
    if (!form.eventDate || !form.productId) { setError("Please select a date and an inflatable."); return; }
    if (isAvailable === false) { setError("Please choose an available date before continuing."); return; }
    setError(""); setStep(2);
  };

  const handleStep2Next = () => {
    if (!form.fullName || !form.phone || !form.email) { setError("Please fill in all required contact fields."); return; }
    if (!form.deliveryAddress || !form.city || !form.zipCode) { setError("Please fill in your delivery address."); return; }
    setError(""); setStep(3);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed. Please try again.");
      router.push("/book/success?booking=" + data.bookingNumber);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const subtotal = selectedProduct?.base_price || 0;
  const deposit = selectedProduct?.deposit_amount || 0;
  const balance = subtotal - deposit;

  const ic = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition";
  const lc = "block text-sm font-semibold text-blue-950 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-blue-950">Book Your Inflatable</h1>
          <p className="text-gray-500 mt-2">Complete your reservation in just a few steps</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[{ n: 1, label: "Date & Unit" }, { n: 2, label: "Your Info" }, { n: 3, label: "Confirm" }].map(({ n, label }, i, arr) => (
            <div key={n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={"w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all " +
                  (step > n ? "bg-green-500 text-white" : step === n ? "bg-yellow-500 text-blue-950" : "bg-gray-300 text-gray-500")}>
                  {step > n ? "✓" : n}
                </div>
                <span className={"text-xs mt-1 font-medium " + (step >= n ? "text-blue-950" : "text-gray-400")}>{label}</span>
              </div>
              {i < arr.length - 1 && <div className={"h-1 w-16 mx-2 rounded mb-4 " + (step > n ? "bg-green-500" : "bg-gray-300")} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-black text-blue-950 mb-4">Select Date &amp; Inflatable</h2>
              <div>
                <label className={lc}>Event Date *</label>
                <input type="date" min={new Date().toISOString().split("T")[0]} value={form.eventDate}
                  onChange={(e) => { setForm({ ...form, eventDate: e.target.value }); setIsAvailable(null); setAvailabilityMsg(""); }}
                  className={ic} />
              </div>
              <div>
                <label className={lc}>Select Inflatable *</label>
                <select value={form.productId}
                  onChange={(e) => { setForm({ ...form, productId: e.target.value }); setIsAvailable(null); setAvailabilityMsg(""); }}
                  className={ic}>
                  <option value="">— Choose an inflatable —</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — {"$" + (p.base_price / 100).toFixed(0) + "/day"}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lc}>Start Time</label>
                  <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} className={ic} />
                </div>
                <div>
                  <label className={lc}>End Time</label>
                  <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} className={ic} />
                </div>
              </div>
              <button onClick={checkAvailability} disabled={loading || !form.productId || !form.eventDate}
                className="w-full border-2 border-yellow-500 text-yellow-700 font-semibold py-3 rounded-xl hover:bg-yellow-50 transition disabled:opacity-40 disabled:cursor-not-allowed">
                {loading ? "Checking..." : "Check Availability"}
              </button>
              {availabilityMsg && (
                <div className={"text-sm font-medium py-3 px-4 rounded-lg " +
                  (isAvailable ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200")}>
                  {isAvailable ? "✅ " : "❌ "}{availabilityMsg}
                </div>
              )}
              <button onClick={handleStep1Next} className="btn-primary w-full text-lg">Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-black text-blue-950 mb-4">Your Information</h2>
              <div>
                <label className={lc}>Full Name *</label>
                <input type="text" placeholder="Jane Smith" value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={ic} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lc}>Phone *</label>
                  <input type="tel" placeholder="(713) 555-0000" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} className={ic} />
                </div>
                <div>
                  <label className={lc}>Email *</label>
                  <input type="email" placeholder="jane@example.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} className={ic} />
                </div>
              </div>
              <div>
                <label className={lc}>Delivery Address *</label>
                <input type="text" placeholder="123 Main Street" value={form.deliveryAddress}
                  onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })} className={ic} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className={lc}>City *</label>
                  <input type="text" placeholder="Houston" value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })} className={ic} />
                </div>
                <div>
                  <label className={lc}>ZIP *</label>
                  <input type="text" placeholder="77001" value={form.zipCode}
                    onChange={(e) => setForm({ ...form, zipCode: e.target.value })} className={ic} />
                </div>
              </div>
              <div>
                <label className={lc}>Special Notes</label>
                <textarea placeholder="Any special requests, gate codes, access instructions..." value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3} className={ic} />
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setStep(1); setError(""); }}
                  className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition">← Back</button>
                <button onClick={handleStep2Next} className="flex-1 btn-primary">Review Order →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-black text-blue-950 mb-4">Order Summary</h2>
              <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Inflatable</span><span className="font-bold text-blue-950">{selectedProduct?.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Event Date</span><span className="font-semibold">{form.eventDate ? new Date(form.eventDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : ""}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Time</span><span className="font-semibold">{form.startTime} – {form.endTime}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Delivery To</span><span className="font-semibold text-right max-w-[60%]">{form.deliveryAddress}, {form.city}, TX {form.zipCode}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Customer</span><span className="font-semibold">{form.fullName}</span></div>
                <div className="flex justify-between text-xs text-gray-400"><span>Contact</span><span>{form.email} · {form.phone}</span></div>
                <div className="border-t pt-3 mt-1 space-y-2">
                  <div className="flex justify-between"><span className="text-gray-500">Rental Total</span><span className="font-bold">{"$" + (subtotal / 100).toFixed(2)}</span></div>
                  <div className="flex justify-between text-yellow-700"><span>Deposit Due at Booking</span><span className="font-bold">{"$" + (deposit / 100).toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Balance Due at Event</span><span className="font-semibold">{"$" + (balance / 100).toFixed(2)}</span></div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <strong>📋 What happens next:</strong> After submitting, our team will call you within 2 hours to confirm and collect your deposit payment over the phone.
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setStep(2); setError(""); }}
                  className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition">← Back</button>
                <button onClick={handleSubmit} disabled={submitting}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Submitting..." : "✅ Confirm Booking"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center"><div className="text-5xl mb-4 animate-bounce">🏰</div><p className="text-gray-500">Loading booking form...</p></div>
      </div>
    }>
      <BookingFormInner />
    </Suspense>
  );
}
