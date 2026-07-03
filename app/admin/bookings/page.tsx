export const dynamic = "force-dynamic";
import Link from "next/link";
import { UpdateBookingStatus, MarkPaymentPaid } from "./actions";

async function getBookings() {
  try {
    const { getAllBookingsWithDetails } = await import('@/lib/bookings');
    return await getAllBookingsWithDetails();
  } catch { return []; }
}

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = { pending_payment: "bg-orange-100 text-orange-800", pending: "bg-yellow-100 text-yellow-800", confirmed: "bg-green-100 text-green-800", cancelled: "bg-red-100 text-red-800", completed: "bg-blue-100 text-blue-800" };
  return <span className={"px-2 py-1 rounded-full text-xs font-semibold capitalize " + (cls[status] || "bg-gray-100 text-gray-800")}>{status.replace("_", " ")}</span>;
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-950 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-white transition">← Dashboard</Link>
          <div><h1 className="text-2xl font-black">All Bookings</h1><p className="text-gray-400 text-sm">{bookings.length} total</p></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center"><div className="text-5xl mb-4">📭</div><p className="text-gray-500 text-lg">No bookings yet.</p></div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>{["Booking #","Customer","Product","Event Date","Address","Total","Payment","Status","Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b: any) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-blue-700 whitespace-nowrap">{b.booking_number}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><div className="font-medium text-blue-950">{b.customer_name}</div><div className="text-gray-400 text-xs">{b.customer_email}</div><div className="text-gray-400 text-xs">{b.customer_phone}</div></td>
                      <td className="px-4 py-3 font-medium whitespace-nowrap">{b.product_name}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><div>{new Date(b.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div><div className="text-gray-400 text-xs">{b.start_time} – {b.end_time}</div></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{b.delivery_address}<br />{b.city}, {b.state} {b.zip_code}</td>
                      <td className="px-4 py-3 font-bold whitespace-nowrap">{"$" + (b.subtotal / 100).toFixed(2)}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-xs text-gray-400 capitalize mb-1">{b.payment_type || "—"}{b.payment_status && b.payment_status !== "paid" ? " · " + b.payment_status : ""}</div>
                        <MarkPaymentPaid bookingId={b.id} currentPaymentStatus={b.payment_status || "unpaid"} />
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                      <td className="px-4 py-3 whitespace-nowrap"><UpdateBookingStatus bookingId={b.id} currentStatus={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
