"use client";

import { useEffect, useState } from "react";

const STATUS_OPTIONS = ["pending", "confirmed", "delivered", "cancelled"];
const STATUS_COLORS = { pending: "text-yellow-400", confirmed: "text-blue-400", delivered: "text-green-400", cancelled: "text-red-400" };

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    const url = filter ? `/api/orders?status=${filter}` : "/api/orders";
    const res = await fetch(url);
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  useEffect(() => { loadOrders(); }, [filter]);

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-harvest-cream">Orders</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-1.5 text-sm text-harvest-cream">
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-harvest-cream/60">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-harvest-cream/60">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-forest-700/40 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-harvest-cream">{order.customerName}</p>
                  <p className="text-sm text-harvest-cream/60">{order.phone}</p>
                  <p className="text-sm text-harvest-cream/60">{order.address}</p>
                  {order.notes && <p className="text-sm text-harvest-cream/50 italic">Note: {order.notes}</p>}
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold text-harvest-gold">৳{order.totalAmount}</p>
                  <p className="text-xs text-harvest-cream/50">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-3 border-t border-forest-700/30 pt-3 space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-harvest-cream/80">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className={`text-sm font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-2 py-1 text-sm text-harvest-cream">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}