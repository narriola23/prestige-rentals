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
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
