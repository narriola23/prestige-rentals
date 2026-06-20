import Link from "next/link";

export default function SuccessPage({ searchParams }: { searchParams: { booking?: string } }) {
  const bookingNumber = searchParams.booking || "";
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="max-w-lg w-full mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Booking Submitted!</div>
          <h1 className="text-3xl font-black text-blue-950 mb-3">You're Almost Set!</h1>
          <p className="text-gray-600 mb-6">Your booking request has been received. Our team will call you within 2 hours to confirm and collect the deposit.</p>
          {bookingNumber && (
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">
              <p className="text-sm text-yellow-700 font-medium mb-1">Your Booking Reference</p>
              <p className="text-2xl font-black text-blue-950">{bookingNumber}</p>
              <p className="text-xs text-gray-500 mt-1">Save this number for your records</p>
            </div>
          )}
          <div className="text-left bg-gray-50 rounded-xl p-5 mb-6 space-y-3 text-sm">
            <h3 className="font-bold text-blue-950">What to Expect:</h3>
            <div className="flex items-start gap-3"><span className="text-green-500 font-bold">1.</span><p className="text-gray-600">Our team will call within 2 hours to confirm your date.</p></div>
            <div className="flex items-start gap-3"><span className="text-green-500 font-bold">2.</span><p className="text-gray-600">We'll collect your deposit over the phone to lock in your booking.</p></div>
            <div className="flex items-start gap-3"><span className="text-green-500 font-bold">3.</span><p className="text-gray-600">On your event day, we deliver and set up 1–2 hours before start time.</p></div>
            <div className="flex items-start gap-3"><span className="text-green-500 font-bold">4.</span><p className="text-gray-600">Enjoy the party! We'll pick everything up when you're done.</p></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1 btn-secondary text-center">← Back to Home</Link>
            <Link href="/rentals" className="flex-1 btn-primary text-center">Browse More</Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">Questions? Call <a href="tel:+17135550100" className="text-yellow-600 font-medium">(713) 555-0100</a></p>
        </div>
      </div>
    </div>
  );
}
