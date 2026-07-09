"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { calculateDeliveryFee } from "@/lib/delivery-fee";

interface CheckoutProduct {
  id: number;
  name: string;
  slug: string;
  base_price: number;
  deposit_amount: number;
}

interface CheckoutFormProps {
  product: CheckoutProduct;
  startDate: string;
  endDate: string;
}

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

function numDays(start: string, end: string) {
  const a = new Date(start + "T00:00:00").getTime();
  const b = new Date(end + "T00:00:00").getTime();
  return Math.floor((b - a) / 86400000) + 1;
}

function money(cents: number) {
  return "$" + (cents / 100).toFixed(2);
}

function PaymentStep({ clientSecret, bookingNumber, onFallback }: { clientSecret: string; bookingNumber: string; onFallback: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError("");
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/checkout/confirmation?booking=" + bookingNumber,
      },
    });
    if (confirmError) {
      setError(confirmError.message || "Payment failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-black text-blue-950 mb-4">Payment</h2>
      <PaymentElement />
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
      <button onClick={handlePay} disabled={submitting || !stripe} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
        {submitting ? "Processing..." : "✅ Pay Now"}
      </button>
    </div>
  );
}

export default function CheckoutForm({ product, startDate, endDate }: CheckoutFormProps) {
  const router = useRouter();
  const days = numDays(startDate, endDate);
  const subtotal = product.base_price * days;
  const deposit = product.deposit_amount;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fallbackMessage, setFallbackMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [bookingNumber, setBookingNumber] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    deliveryAddress: "",
    city: "",
    zipCode: "",
    notes: "",
    paymentType: "deposit" as "deposit" | "full",
  });

  const handleStep1Next = () => {
    if (!form.fullName || !form.phone || !form.email || !form.deliveryAddress || !form.city || !form.zipCode) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleStep2Next = async () => {
    setSubmitting(true);
    setError("");
    try {
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate, endDate, productId: product.id,
          fullName: form.fullName, phone: form.phone, email: form.email,
          deliveryAddress: form.deliveryAddress, city: form.city, zipCode: form.zipCode,
          notes: form.notes, paymentType: form.paymentType,
        }),
      });
      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) throw new Error(bookingData.error || "Could not create your booking. Please try again.");
      setBookingNumber(bookingData.bookingNumber);

      const piRes = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: bookingData.bookingId, paymentType: form.paymentType }),
      });
      const piData = await piRes.json();

      if (!piRes.ok) {
        setFallbackMessage(piData.error || "We'll call you to collect payment — your dates are already reserved.");
        setStep(3);
        setSubmitting(false);
        return;
      }

      setClientSecret(piData.clientSecret);
      setStep(3);
      setSubmitting(false);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const ic = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition";
  const lc = "block text-sm font-semibold text-blue-950 mb-1";
  const deliveryFeeResult = calculateDeliveryFee(form.zipCode);
  const deliveryFee = deliveryFeeResult?.feeCents ?? 0;
  const total = subtotal + deliveryFee;
  const amountDue = form.paymentType === "full" ? total : deposit;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-blue-950">Checkout</h1>
          <p className="text-gray-500 mt-2">
            {product.name} · {new Date(startDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            {endDate !== startDate ? " – " + new Date(endDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          {[{ n: 1, label: "Your Info" }, { n: 2, label: "Payment Option" }, { n: 3, label: "Pay & Confirm" }].map(({ n, label }, i, arr) => (
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
                  <input type="text" value={form.zipCode}
                    onChange={(e) => setForm({ ...form, zipCode: e.target.value.replace(/\D/g, "").slice(0, 5) })} className={ic} />
                </div>
              </div>
              <div>
                <label className={lc}>Special Notes</label>
                <textarea placeholder="Any special requests, gate codes, access instructions..." value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3} className={ic} />
              </div>
              <button onClick={handleStep1Next} className="btn-primary w-full text-lg">Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-black text-blue-950 mb-4">Choose Your Payment Option</h2>
              <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-sm mb-2">
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Rental Total ({days} day{days > 1 ? "s" : ""})</span><span className="font-bold">{money(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Delivery Fee</span><span className="font-bold">{deliveryFeeResult ? (deliveryFee > 0 ? money(deliveryFee) : "Free") : "Confirmed after booking"}</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-gray-500 font-medium">Total</span><span className="font-bold">{money(total)}</span></div>
              </div>
              <div className="space-y-3">
                <label className={"flex items-start gap-3 border-2 rounded-xl p-4 cursor-pointer transition " + (form.paymentType === "deposit" ? "border-yellow-500 bg-yellow-50" : "border-gray-200")}>
                  <input type="radio" name="paymentType" checked={form.paymentType === "deposit"} onChange={() => setForm({ ...form, paymentType: "deposit" })} className="mt-1" />
                  <div>
                    <div className="font-bold text-blue-950">Pay 50% Deposit Now</div>
                    <div className="text-sm text-gray-500">{money(deposit)} due now, {money(total - deposit)} due before/at delivery</div>
                  </div>
                </label>
                <label className={"flex items-start gap-3 border-2 rounded-xl p-4 cursor-pointer transition " + (form.paymentType === "full" ? "border-yellow-500 bg-yellow-50" : "border-gray-200")}>
                  <input type="radio" name="paymentType" checked={form.paymentType === "full"} onChange={() => setForm({ ...form, paymentType: "full" })} className="mt-1" />
                  <div>
                    <div className="font-bold text-blue-950">Pay in Full Now</div>
                    <div className="text-sm text-gray-500">{money(total)} due now, nothing due at delivery</div>
                  </div>
                </label>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition">← Back</button>
                <button onClick={handleStep2Next} disabled={submitting} className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Reserving..." : "Continue to Payment →"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && fallbackMessage && (
            <div className="space-y-5 text-center">
              <div className="text-5xl mb-2">📞</div>
              <h2 className="text-xl font-black text-blue-950">Almost Done!</h2>
              <p className="text-gray-600">{fallbackMessage}</p>
              <p className="text-sm text-gray-400">Your booking number is <span className="font-mono font-bold text-blue-950">{bookingNumber}</span></p>
              <button onClick={() => router.push("/checkout/confirmation?booking=" + bookingNumber)} className="btn-primary w-full">
                View Booking Details
              </button>
            </div>
          )}

          {step === 3 && !fallbackMessage && clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentStep clientSecret={clientSecret} bookingNumber={bookingNumber} onFallback={() => {}} />
              <p className="text-center text-sm text-gray-400 mt-4">
                Due now: <span className="font-bold text-blue-950">{money(amountDue)}</span>
              </p>
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
