"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ToggleProductActive({ productId, isActive }: { productId: number; isActive: boolean }) {
  const [active, setActive] = useState(isActive);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    setSaving(true);
    setActive(!active);
    await fetch("/api/admin/products/" + productId + "/toggle", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !active }),
    });
    setSaving(false);
    router.refresh();
  };

  return (
    <button onClick={toggle} disabled={saving}
      className={"flex-1 text-sm font-semibold py-2 rounded-lg transition disabled:opacity-50 " +
        (active ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100" : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100")}>
      {saving ? "..." : active ? "Deactivate" : "Activate"}
    </button>
  );
}
