import { useState, useRef, useEffect } from "react";

export default function AddManagerModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    client: "",
    location: "",
    workers: "",
    machine: "",
    date: "",
  });

  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("default", { month: "short" });
    const year = String(d.getFullYear()).slice(2);
    return `${day} ${month}'${year}`;
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

    const formattedDate = formatDate(form.date);
    const newManager = {
      ...form,
      report: "Pending",
      date: formattedDate,
    };

    onAdd(newManager);

    setForm({
      name: "",
      contact: "",
      client: "",
      location: "",
      workers: "",
      machine: "",
      date: "",
    });

    showToast("Manager added successfully!");
  };

  return (
    <>
      {/* Top-Center Toast */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999]">
          <div className="bg-green-500 w-70 sm:w-80 text-sm text-center text-white px-6 py-3 rounded-lg shadow-lg lg:text-base font-medium transition-opacity duration-300">
            {toast.message}
          </div>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Manager</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded placeholder-gray-500"
                placeholder="Name"
                required
              />
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full border p-2 rounded placeholder-gray-500"
                placeholder="Contact No."
                required
              />
              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                className="w-full border p-2 rounded placeholder-gray-500"
                placeholder="Assigned Clients"
                required
              />
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border p-2 rounded placeholder-gray-500"
                placeholder="Company Location"
                required
              />
              <input
                name="workers"
                value={form.workers}
                onChange={handleChange}
                className="w-full border p-2 rounded placeholder-gray-500"
                placeholder="No. Of Workers"
                type="number"
                required
              />
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

              <div className="relative">
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  onFocus={(e) => {
                    if (e.target.showPicker) e.target.showPicker();
                  }}
                  className="w-full border p-2 rounded text-gray-700 placeholder-gray-500"
                  type="date"
                  required
                />
                {!form.date && (
                  <span className="absolute left-3 top-2.5 text-gray-500 pointer-events-none text-lg md:hidden">
                    Date
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
