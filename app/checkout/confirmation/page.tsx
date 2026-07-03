import Link from "next/link";

export const dynamic = "force-dynamic";

function money(cents: number) {
  return "$" + (cents / 100).toFixed(2);
}

export default async function ConfirmationPage({ searchParams }: { searchParams: { booking?: string } }) {
  const bookingNumber = searchParams.booking;
  if (!bookingNumber) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md text-center bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-xl font-black text-blue-950 mb-2">No Booking Found</h1>
          <Link href="/availability" className="btn-primary inline-block mt-4">Check Availability</Link>
        </div>
      </div>
    );
  }

  const { getBookingByNumber } = await import("@/lib/bookings");
  const booking: any = await getBookingByNumber(bookingNumber);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md text-center bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-xl font-black text-blue-950 mb-2">Booking Not Found</h1>
          <p className="text-gray-600 mb-4">We couldn&apos;t find a booking with that number.</p>
          <Link href="/availability" className="btn-primary inline-block">Check Availability</Link>
        </div>
      </div>
    );
  }

  const isPaid = booking.payment_status === "paid";
  const isProcessing = booking.payment_status === "processing" || booking.payment_status === "unpaid";

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">{isPaid ? "🎉" : "📋"}</div>
        <h1 className="text-2xl font-black text-blue-950 mb-2">
          {isPaid ? "Booking Confirmed!" : "Booking Received!"}
        </h1>
        <p className="text-gray-600 mb-2">
          {isPaid
            ? "Thanks for booking with Prestige Rentals — we can't wait to make your event unforgettable."
            : isProcessing
            ? "We're finishing up your payment confirmation. Your dates are reserved — this page will update automatically once it's complete."
            : "Your booking is on file. If we still need to collect payment from you, our team will be in touch shortly."}
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Booking #: <span className="font-mono font-bold text-blue-950">{booking.booking_number}</span>
        </p>

        <div className="bg-gray-50 rounded-xl p-5 text-left space-y-2 text-sm mb-6">
          <div className="flex justify-between"><span className="text-gray-500">Inflatable</span><span className="font-semibold">{booking.product_name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Event Date</span><span className="font-semibold">
            {new Date(booking.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            {booking.end_date && new Date(booking.end_date).toDateString() !== new Date(booking.event_date).toDateString()
              ? " – " + new Date(booking.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : ""}
          </span></div>
          <div className="flex justify-between"><span className="text-gray-500">Delivery To</span><span className="font-semibold text-right max-w-[60%]">{booking.delivery_address}, {booking.city}, {booking.state} {booking.zip_code}</span></div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="font-bold">{money(booking.subtotal)}</span></div>
            <div className="flex justify-between text-yellow-700"><span>{isPaid ? "Paid" : "Due Now"}</span><span className="font-bold">{money(booking.amount_charged || booking.deposit_due)}</span></div>
            <div className="flex justify-between text-gray-500"><span>Balance Due at Event</span><span className="font-semibold">{money(booking.balance_due)}</span></div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          A confirmation has been noted on your account. Questions? Call us at{" "}
          <a href="tel:+18327161836" className="text-yellow-600 font-semibold">(832) 716-1836</a>.
        </p>
        <Link href="/" className="btn-secondary inline-block">Back to Home</Link>
      </div>
    </div>
  );
}
