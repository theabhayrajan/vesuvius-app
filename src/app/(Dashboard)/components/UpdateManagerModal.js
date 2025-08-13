import { useState, useEffect } from "react";

export default function UpdateManagerModal({ isOpen, onClose, onUpdate, manager }) {
  const [form, setForm] = useState(manager || {});

  useEffect(() => {
    setForm(manager || {});
  }, [manager]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
  };

  if (!isOpen || !manager) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Update Manager</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name || ""} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="contact" value={form.contact || ""} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="client" value={form.client || ""} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="location" value={form.location || ""} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="workers" value={form.workers || ""} onChange={handleChange} className="w-full border p-2 rounded" type="number" required />
          <input name="date" value={form.date || ""} onChange={handleChange} className="w-full border p-2 rounded" type="text" required />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
