"use client";
import ImageUploadInput from "@/components/ImageUploadInput";
import { useEffect, useState } from "react";

const emptyForm = { title: "", image: "", link: "", order: "" };

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const loadBanners = async () => {
    setLoading(true);
    const res = await fetch("/api/banners");
    const data = await res.json();
    setBanners(data.banners || []);
    setLoading(false);
  };

  useEffect(() => { loadBanners(); }, []);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setShowForm(false); setError(""); };

  const handleEdit = (banner) => {
    setForm({ title: banner.title || "", image: banner.image, link: banner.link || "", order: banner.order });
    setEditingId(banner.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this banner?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    loadBanners();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = editingId ? `/api/banners/${editingId}` : "/api/banners";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Something went wrong"); return; }

    resetForm();
    loadBanners();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-harvest-cream">Ad Banners</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-full bg-harvest-gold px-4 py-2 text-sm font-semibold text-forest-950">
          + Add Banner
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-3 rounded-2xl border border-forest-700/40 p-4 md:grid-cols-2">
          <input placeholder="Title (optional)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />
          <ImageUploadInput value={form.image} onChange={(path) => setForm({ ...form, image: path })} folder="banners" />
          <input placeholder="Link URL (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />
          <input type="number" placeholder="Order (0, 1, 2...)" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />

          {error && <p className="md:col-span-2 text-sm text-red-400">{error}</p>}

          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="rounded-full bg-harvest-gold px-4 py-2 font-semibold text-forest-950">{editingId ? "Update" : "Create"}</button>
            <button type="button" onClick={resetForm} className="rounded-full border border-forest-700/60 px-4 py-2 text-harvest-cream">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-harvest-cream/60">Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {banners.map((banner) => (
            <div key={banner.id} className="rounded-2xl border border-forest-700/40 p-4">
              <p className="font-semibold text-harvest-cream">{banner.title || "(No title)"}</p>
              <p className="text-xs text-harvest-cream/50 break-all">{banner.image}</p>
              <p className="text-xs text-harvest-cream/50">Order: {banner.order}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => handleEdit(banner)} className="rounded-full border border-forest-700/60 px-3 py-1 text-sm text-harvest-cream">Edit</button>
                <button onClick={() => handleDelete(banner.id)} className="rounded-full border border-red-400/60 px-3 py-1 text-sm text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}