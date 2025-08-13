import { useState } from "react";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputDate = form.date;
    const [year, month, day] = inputDate.split("-");
    const formattedDate = `${day} ${new Date(inputDate).toLocaleString("default", {
      month: "short",
    })}'${year.slice(2)}`;

    const newManager = {
      ...form,
      report: "Pending",
      date: formattedDate,
    };

    onAdd(newManager);
    setForm({ name: "", contact: "", client: "", location: "", workers: "", machine: "", date: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
            <option value="" disabled className="text-gray-500">Select Machine Status</option>
            <option
              value="Assign"
              className="hover:bg-green-500 hover:text-white"
            >
              Assign
            </option>
            <option
              value="Not Assign"
              className="hover:bg-red-500 hover:text-white"
            >
              Not Assign
            </option>
          </select>

          <div className="relative">
            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              onFocus={(e) => {
                if (e.target.showPicker) e.target.showPicker(); // opens calendar on focus
              }}
              className="w-full border p-2 rounded text-gray-700 placeholder-gray-500"
              type="date"
              required
            />

            {/* Custom placeholder only visible on mobile */}
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
