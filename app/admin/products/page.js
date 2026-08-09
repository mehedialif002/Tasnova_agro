"use client";
import ImageUploadInput from "@/components/ImageUploadInput";
import { useEffect, useState } from "react";

const emptyForm = { name: "", slug: "", description: "", price: "", unit: "", image: "", stock: "" };

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setShowForm(false); setError(""); };

  const handleEdit = (product) => {
    setForm({ name: product.name, slug: product.slug, description: product.description || "", price: product.price, unit: product.unit, image: product.image || "", stock: product.stock });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Something went wrong"); return; }

    resetForm();
    loadProducts();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-harvest-cream">Products</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-full bg-harvest-gold px-4 py-2 text-sm font-semibold text-forest-950">+ Add Product</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-3 rounded-2xl border border-forest-700/40 p-4 md:grid-cols-2">
          <input placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />
          <input placeholder="Slug (unique, e.g. cow-milk)" required disabled={!!editingId} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream disabled:opacity-50" />
          <input type="number" placeholder="Price (BDT)" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />
          <input placeholder="Unit (e.g. প্রতি লিটার)" required value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />
          <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />
          <ImageUploadInput value={form.image} onChange={(path) => setForm({ ...form, image: path })} folder="products" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="md:col-span-2 rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />

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
          {products.map((product) => (
            <div key={product.id} className="rounded-2xl border border-forest-700/40 p-4">
              <h3 className="font-semibold text-harvest-cream">{product.name}</h3>
              <p className="text-sm text-harvest-cream/60">{product.description}</p>
              <p className="mt-2 font-bold text-harvest-gold">৳{product.price} <span className="text-xs text-harvest-cream/60">{product.unit}</span></p>
              <p className="text-xs text-harvest-cream/50">Stock: {product.stock}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => handleEdit(product)} className="rounded-full border border-forest-700/60 px-3 py-1 text-sm text-harvest-cream">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="rounded-full border border-red-400/60 px-3 py-1 text-sm text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}