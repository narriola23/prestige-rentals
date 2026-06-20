"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { router.push("/admin"); router.refresh(); }
    else { setError("Incorrect password. Please try again."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-2xl font-black text-blue-950">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">Prestige Rentals Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-semibold text-blue-950 mb-1">Admin Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter admin password" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full text-lg disabled:opacity-50">
            {loading ? "Logging in..." : "Log In →"}
          </button>
        </form>
      </div>
    </div>
  );
}
