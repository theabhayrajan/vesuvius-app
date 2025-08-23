"use client";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation Schema
const clientSchema = z.object({
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


  company: z
    .string()
    .min(1, "Company Name is required")
    .regex(/^[A-Za-z\s]+$/, "Company Name can only contain letters and spaces"),
  location: z
    .string()
    .min(1, "Location is required")
    .regex(/^[A-Za-z][A-Za-z0-9\s]*$/, "Location must start with a letter"),
  managers: z
    .string()
    .min(1, "Managers Name is required")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
  workers: z.coerce.number()
    .min(1, { message: "Workers must be greater than 0" }),

  machine: z.enum(["Assign", "Not Assign"], {
    errorMap: () => ({ message: "Machine status is required" }),
  }),
  date: z.string().min(1, "Date is required"),
});

export default function UpdateClientModal({ isOpen, onClose, onUpdate, client }) {
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: client || {},
  });

  // Reset form with selected manager data
  useEffect(() => {
    reset(client || {});
  }, [client, reset]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = (message, ms = 3000) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, message });
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, ms);
  };

  const onSubmit = (data) => {
    onUpdate(data);
    showToast("Record Updated successfully!");
    setTimeout(() => {
      onClose();
    }, 600); // small delay so user sees toast before modal closes
  };

  return (
    <>
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999]">
          <div className="bg-green-500 w-70 sm:w-80 text-sm text-center text-white px-6 py-3 rounded-lg shadow-lg lg:text-base font-medium transition-opacity duration-300">
            {toast.message}
          </div>
        </div>
      )}

      {/* Modal */}
      {isOpen && client && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Client</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <input {...register("name")} placeholder="Client's Name" className="w-full border p-2 rounded" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              {/* Contact */}
              <input {...register("contact")} placeholder="Contact" className="w-full border p-2 rounded" />
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}

              {/* Client */}
              <input {...register("company")} placeholder="Company Name" className="w-full border p-2 rounded" />
              {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}

              {/* Location */}
              <input {...register("location")} placeholder="Company Location" className="w-full border p-2 rounded" />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

              {/* Managers */}
              <input {...register("managers")} placeholder="Manager's Name" className="w-full border p-2 rounded" />
              {errors.managers && <p className="text-red-500 text-sm">{errors.managers.message}</p>}

              {/* Workers */}
              <input {...register("workers")} placeholder="No. Of Workers" className="w-full border p-2 rounded" />
              {errors.workers && <p className="text-red-500 text-sm">{errors.workers.message}</p>}

              {/* Machine */}
              <select {...register("machine")} className="w-full border p-2 rounded text-gray-700">
                <option value="">Select Machine Status</option>
                <option value="Assign">Assign</option>
                <option value="Not Assign">Not Assign</option>
              </select>
              {errors.machine && <p className="text-red-500 text-sm">{errors.machine.message}</p>}

              {/* Date */}
              <input {...register("date")} placeholder="Date" className="w-full border p-2 rounded" />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

              {/* Actions */}
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
