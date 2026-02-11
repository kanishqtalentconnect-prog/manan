import { useState } from "react";
import api from "../api/axios";

type Props = {
  propertyId: string;
  onClose: () => void;
};

export default function BookSiteVisitModal({ propertyId, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    timeSlot: "",
    comingFrom: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.timeSlot || !form.comingFrom) {
      alert("Please select time slot and location");
      return;
    }

    try {
      setLoading(true);
      await api.post("/bookings", {
        propertyId,
        ...form,
      });

      alert("Site visit booked successfully!");
      onClose();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-full flex items-end sm:items-center justify-center">
        <div
          className="
            relative bg-white
            rounded-t-2xl sm:rounded-xl
            p-4 sm:p-6
            w-full max-w-md
            max-h-[90vh] overflow-y-auto
            mx-2 sm:mx-0
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Book Site Visit
          </h2>

          <div className="space-y-3">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3.5 rounded-lg text-base"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3.5 rounded-lg text-base"
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3.5 rounded-lg text-base"
              required
            />

            <input
              name="visitDate"
              type="date"
              value={form.visitDate}
              onChange={handleChange}
              className="w-full border p-3.5 rounded-lg text-base"
              required
            />

            <select
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              className="w-full border p-3.5 rounded-lg text-base"
              required
            >
              <option value="">Select Time Slot</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM – 11:00 AM</option>
              <option value="11:00 AM - 12:00 PM">11:00 AM – 12:00 PM</option>
              <option value="02:00 PM - 03:00 PM">02:00 PM – 03:00 PM</option>
              <option value="04:00 PM - 05:00 PM">04:00 PM – 05:00 PM</option>
            </select>

            <input
              name="comingFrom"
              placeholder="Coming From (City / Area)"
              value={form.comingFrom}
              onChange={handleChange}
              className="w-full border p-3.5 rounded-lg text-base"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2.5 bg-black text-white rounded-lg"
            >
              {loading ? "Booking..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
