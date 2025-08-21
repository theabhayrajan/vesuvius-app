"use client";

import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Define schema with Zod
const managerSchema = z.object({
 name: z
  .string()
  .min(1, "Name is required")
  .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

contact: z
  .string()
  .min(1, "Contact is required")
  .refine((val) => /^[0-9]+$/.test(val), {
    message: "Contact can only contain numeric digits",
  })
  .refine((val) => val.length === 10, {
    message: "Contact must be exactly 10 digits",
  }),


  client: z
  .string()
  .min(1, "Client is required")
  .regex(/^[A-Za-z\s]+$/, "Client can only contain letters and spaces"),
  location: z
  .string()
  .min(1, "Location is required")
  .regex(/^[A-Za-z][A-Za-z0-9\s]*$/, "Location must start with a letter"),

  workers: z
    .string()
    .refine((val) => parseInt(val) > 0, {
      message: "Workers must be greater than 0",
    }),
  machine: z.enum(["Assign", "Not Assign"], {
    errorMap: () => ({ message: "Machine status is required" }),
  }),
  date: z.string().min(1, "Date is required"),
});

export default function AddManagerModal({ isOpen, onClose, onAdd }) {
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(managerSchema),
  });

  // 🔹 Cleanup toast timer
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const formatDate = (isoDate) => {
  if (!isoDate) return "";

  // Split YYYY-MM-DD into parts
  const [year, month, day] = isoDate.split("-").map(Number);

  // Create a local date (no timezone shift)
  const d = new Date(year, month - 1, day);

  const formattedDay = String(d.getDate()).padStart(2, "0");
  const monthName = d.toLocaleString("default", { month: "short" });
  const yearShort = String(d.getFullYear()) ;

  return `${formattedDay} ${monthName} ${yearShort}`;
};


  const showToast = (message, ms = 3000) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, message });
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, ms);
  };

  const onSubmit = (data) => {
    const formattedDate = formatDate(data.date);
    const newManager = {
      ...data,
      report: "Pending",
      date: formattedDate,
    };

    onAdd(newManager);
    reset();
    showToast("Manager added successfully!");
  };

  return (
    <>
      {/* ✅ Top-Center Toast */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999]">
          <div className="bg-green-500 w-70 sm:w-80 text-sm text-center text-white px-6 py-3 rounded-lg shadow-lg lg:text-base font-medium transition-opacity duration-300">
            {toast.message}
          </div>
        </div>
      )}

      {/* ✅ Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Manager</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  {...register("name")}
                  className={`w-full border p-2 rounded placeholder-gray-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Contact */}
              <div>
                <input
                  {...register("contact")}
                  className={`w-full border p-2 rounded placeholder-gray-500 ${
                    errors.contact ? "border-red-500" : ""
                  }`}
                  placeholder="Contact No."
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Client */}
              <div>
                <input
                  {...register("client")}
                  className={`w-full border p-2 rounded placeholder-gray-500 ${
                    errors.client ? "border-red-500" : ""
                  }`}
                  placeholder="Assigned Clients"
                />
                {errors.client && (
                  <p className="text-red-500 text-sm">{errors.client.message}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <input
                  {...register("location")}
                  className={`w-full border p-2 rounded placeholder-gray-500 ${
                    errors.location ? "border-red-500" : ""
                  }`}
                  placeholder="Company Location"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Workers */}
              <div>
                <input
                  type="number"
                  {...register("workers")}
                  className={`w-full border p-2 rounded placeholder-gray-500 ${
                    errors.workers ? "border-red-500" : ""
                  }`}
                  placeholder="No. Of Workers"
                />
                {errors.workers && (
                  <p className="text-red-500 text-sm">
                    {errors.workers.message}
                  </p>
                )}
              </div>

              {/* Machine */}
              <div>
                <select
                  {...register("machine")}
                  className={`w-full border p-2 rounded text-gray-700 ${
                    errors.machine ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Machine Status</option>
                  <option value="Assign">Assign</option>
                  <option value="Not Assign">Not Assign</option>
                </select>
                {errors.machine && (
                  <p className="text-red-500 text-sm">
                    {errors.machine.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <input
                  type="date"
                   onFocus={(e) => {
                    if (e.target.showPicker) e.target.showPicker();
                  }}

                  {...register("date")}
                  className={`w-full border p-2 rounded text-gray-700 placeholder-gray-500 ${
                    errors.date ? "border-red-500" : ""
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              {/* Buttons */}
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
