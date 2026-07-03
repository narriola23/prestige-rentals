"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdateBookingStatus({ bookingId, currentStatus }: { bookingId: number; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleChange = async (newStatus: string) => {
    setSaving(true);
    setStatus(newStatus);
    await fetch("/api/admin/bookings/" + bookingId + "/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setSaving(false);
    router.refresh();
  };

  return (
    <select value={status} onChange={(e) => handleChange(e.target.value)} disabled={saving}
      className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 disabled:opacity-50">
      <option value="pending_payment">Pending Payment</option>
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}

export function MarkPaymentPaid({ bookingId, currentPaymentStatus }: { bookingId: number; currentPaymentStatus: string }) {
  const [paymentStatus, setPaymentStatus] = useState(currentPaymentStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  if (paymentStatus === "paid") {
    return <span className="text-green-600 font-semibold text-xs">✅ Paid</span>;
  }

  const handleMarkPaid = async () => {
    setSaving(true);
    await fetch("/api/admin/bookings/" + bookingId + "/mark-paid", { method: "PATCH" });
    setSaving(false);
    setPaymentStatus("paid");
    router.refresh();
  };

  return (
    <button onClick={handleMarkPaid} disabled={saving}
      className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline disabled:opacity-50 whitespace-nowrap">
      {saving ? "Saving..." : "Mark Paid"}
    </button>
  );
}
