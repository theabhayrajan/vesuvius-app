import { useState, useRef, useEffect } from "react";

export default function UpdateManagerModal({ isOpen, onClose, onUpdate, manager }) {
  const [form, setForm] = useState(manager || {});
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setForm(manager || {});
  }, [manager]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (message, ms = 3000) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, message });
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, ms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    showToast("Record Updated successfully!");

    // Close modal after a short delay so the toast still shows
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <>
      {/* Toast - OUTSIDE modal condition */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999]">
          <div className="bg-green-500 w-70 sm:w-80 text-sm text-center text-white px-6 py-3 rounded-lg shadow-lg lg:text-base font-medium transition-opacity duration-300">
            {toast.message}
          </div>
        </div>
      )}

      {/* Modal */}
      {isOpen && manager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Manager</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" value={form.name || ""} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input name="contact" value={form.contact || ""} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input name="client" value={form.client || ""} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input name="location" value={form.location || ""} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input name="workers" value={form.workers || ""} onChange={handleChange} className="w-full border p-2 rounded" type="number" required />
              <select
                name="machine"
                value={form.machine}
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-700"
                required
              >
                <option value="" disabled>
                  Select Machine Status
                </option>
                <option value="Assign">Assign</option>
                <option value="Not Assign">Not Assign</option>
              </select>
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
      )}
    </>
  );
}
