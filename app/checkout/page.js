"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalAmount = useCartStore((s) => s.totalAmount());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState({ customerName: "", phone: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess(true);
      clearCart();
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-gray-900">অর্ডার সফল হয়েছে! 🎉</h1>
        <p className="mt-3 text-gray-600">আপনার অর্ডারটি আমরা পেয়েছি। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।</p>
        <button onClick={() => router.push("/")} className="mt-6 rounded-full bg-harvest-gold px-6 py-3 font-semibold text-forest-950">
          হোমপেজে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 md:px-8">
      <h1 className="mb-6 font-display text-2xl font-bold text-gray-900">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.{" "}
          <button onClick={() => router.push("/")} className="text-harvest-gold underline">Continue shopping</button>
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900">Order Summary</h2>
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm text-gray-700">
                <span>{item.name} × {item.quantity}</span>
                <span>৳{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span className="text-harvest-gold">৳{totalAmount}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-700">নাম</label>
              <input name="customerName" required value={form.customerName} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-harvest-gold" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-700">ফোন নম্বর</label>
              <input name="phone" required value={form.phone} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-harvest-gold" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-700">ঠিকানা</label>
              <textarea name="address" required rows={3} value={form.address} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-harvest-gold" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-700">নোট (ঐচ্ছিক)</label>
              <textarea name="notes" rows={2} value={form.notes} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-harvest-gold" />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button type="submit" disabled={submitting} className="w-full rounded-full bg-harvest-gold px-4 py-3 font-semibold text-forest-950 hover:brightness-110 disabled:opacity-50">
              {submitting ? "Placing order..." : "Place Order"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}