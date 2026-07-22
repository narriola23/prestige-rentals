"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AvailabilitySearchWidgetProps {
  presetProductSlug?: string;
  presetStart?: string;
  presetEnd?: string;
  presetZip?: string;
  variant?: "full" | "compact";
  className?: string;
  onClick?: () => void;
}

export default function AvailabilitySearchWidget({
  presetProductSlug,
  presetStart,
  presetEnd,
  presetZip,
  variant = "full",
  className = "",
  onClick,
}: AvailabilitySearchWidgetProps) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [start, setStart] = useState(presetStart || "");
  const [end, setEnd] = useState(presetEnd || "");
  const [zip, setZip] = useState(presetZip || "");
  const [error, setError] = useState("");

  if (variant === "compact") {
    return (
      <Link href="/availability" onClick={onClick} className={"btn-primary text-sm " + className}>
        📅 Check Availability
      </Link>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!start) {
      setError("Please enter your event date.");
      return;
    }
    if (zip.length !== 5) {
      setError("Please enter your 5-digit delivery ZIP code.");
      return;
    }
    setError("");
    const params = new URLSearchParams({
      start,
      end: end || start,
      zip,
    });
    if (presetProductSlug) params.set("product", presetProductSlug);
    router.push("/availability?" + params.toString());
  };

  const ic = "w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-gray-900";
  const lc = "block text-sm font-semibold mb-1";

  return (
    <form onSubmit={handleSubmit} className={"bg-white rounded-2xl shadow-lg p-5 sm:p-6 " + className}>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="min-w-0">
          <label className={lc + " text-blue-950"}>Start Date</label>
          <input
            type="date"
            min={today}
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
              if (end && end < e.target.value) setEnd(e.target.value);
            }}
            className={ic}
            required
          />
        </div>
        <div className="min-w-0">
          <label className={lc + " text-blue-950"}>End Date</label>
          <input
            type="date"
            min={start || today}
            value={end}
            placeholder="Same day"
            onChange={(e) => setEnd(e.target.value)}
            className={ic}
          />
        </div>
      </div>
      <div className="mt-3 min-w-0">
        <label className={lc + " text-blue-950"}>Delivery ZIP Code</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          placeholder="e.g. 77069"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
          className={ic}
          required
        />
      </div>
      {error && <p className="text-red-600 text-sm font-medium mt-3">{error}</p>}
      <button type="submit" className="btn-primary w-full text-lg mt-4">
        🔍 Check Availability
      </button>
    </form>
  );
}
