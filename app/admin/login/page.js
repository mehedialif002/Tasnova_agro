"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-950 px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-2xl border border-forest-700/60 p-6">
        <h1 className="text-center font-display text-xl font-bold text-harvest-cream">Admin Login</h1>

        <div>
          <label className="mb-1 block text-sm text-harvest-cream/80">Email</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream outline-none focus:border-harvest-gold" />
        </div>

        <div>
          <label className="mb-1 block text-sm text-harvest-cream/80">Password</label>
          <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream outline-none focus:border-harvest-gold" />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button type="submit" disabled={loading} className="w-full rounded-full bg-harvest-gold px-4 py-3 font-semibold text-forest-950 hover:brightness-110 disabled:opacity-50">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}