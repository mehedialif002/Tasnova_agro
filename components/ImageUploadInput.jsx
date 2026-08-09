"use client";

import { useState } from "react";

export default function ImageUploadInput({ value, onChange, folder }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.path);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full rounded-lg border border-forest-700/60 bg-forest-900/40 px-3 py-2 text-sm text-harvest-cream file:mr-3 file:rounded-full file:border-0 file:bg-harvest-gold file:px-3 file:py-1 file:text-xs file:font-semibold file:text-forest-950"
      />
      {uploading && <p className="text-xs text-harvest-cream/60">Uploading...</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
      {value && (
        <div className="flex items-center gap-2">
          <img src={value} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />
          <span className="text-xs text-harvest-cream/60 break-all">{value}</span>
        </div>
      )}
    </div>
  );
}