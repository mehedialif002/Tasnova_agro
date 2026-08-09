"use client";

import { useEffect, useState } from "react";

const emptyForm = { title: "", content: "", order: "" };

export default function AdminTextSectionsPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const loadSections = async () => {
    setLoading(true);
    const res = await fetch("/api/text-sections");
    const data = await res.json();
    setSections(data.sections || []);
    setLoading(false);
  };

  useEffect(() => { loadSections(); }, []);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setShowForm(false); setError(""); };

  const handleEdit = (section) => {
    setForm({ title: section.title, content: section.content, order: section.order });
    setEditingId(section.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this text section?")) return;
    await fetch(`/api/text-sections/${id}`, { method: "DELETE" });
    loadSections();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = editingId ? `/api/text-sections/${editingId}` : "/api/text-sections";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Something went wrong"); return; }

    resetForm();
    loadSections();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-harvest-cream">Text Sections</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-full bg-harvest-gold px-4 py-2 text-sm font-semibold text-forest-950">
          + Add Text Section
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-3 rounded-2xl border border-forest-700/40 p-4">
          <input placeholder="Title (e.g. বিশুদ্ধ খাবারের গুরুত্ব)" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />

          <div>
            <textarea placeholder="Content" required rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />
            <p className="mt-1 text-xs text-harvest-cream/50">
              Bold korte likhun: **text** &nbsp;|&nbsp; লাল করতে লিখুন: ==text==
            </p>
          </div>

          <input type="number" placeholder="Order (0, 1, 2...)" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-harvest-cream" />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-harvest-gold px-4 py-2 font-semibold text-forest-950">{editingId ? "Update" : "Create"}</button>
            <button type="button" onClick={resetForm} className="rounded-full border border-forest-700/60 px-4 py-2 text-harvest-cream">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-harvest-cream/60">Loading...</p>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="rounded-2xl border border-forest-700/40 p-4">
              <p className="font-semibold text-harvest-cream">{section.title}</p>
              <p className="mt-1 text-sm text-harvest-cream/60 line-clamp-2">{section.content}</p>
              <p className="text-xs text-harvest-cream/50">Order: {section.order}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => handleEdit(section)} className="rounded-full border border-forest-700/60 px-3 py-1 text-sm text-harvest-cream">Edit</button>
                <button onClick={() => handleDelete(section.id)} className="rounded-full border border-red-400/60 px-3 py-1 text-sm text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}