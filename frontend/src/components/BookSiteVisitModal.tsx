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
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-full flex items-end sm:items-center justify-center">
        <div
          className="
            relative bg-white
            rounded-t-2xl sm:rounded-2xl
            p-6 sm:p-8
            w-full max-w-md
            max-h-[90vh] overflow-y-auto
            mx-2 sm:mx-0
            shadow-2xl
            border border-[#ece6dd]
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#9c8a6a] hover:text-[#c4a47c] transition"
          >
            ✕
          </button>

          <h2 className="text-2xl font-serif text-[#1e1e1e] mb-6">
            Book Site Visit
          </h2>

          <div className="space-y-4">

            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-[#ece6dd] p-3.5 rounded-xl text-sm 
                        focus:outline-none focus:border-[#c4a47c] 
                        focus:ring-2 focus:ring-[#c4a47c]/20 transition"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-[#ece6dd] p-3.5 rounded-xl text-sm 
                        focus:outline-none focus:border-[#c4a47c] 
                        focus:ring-2 focus:ring-[#c4a47c]/20 transition"
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-[#ece6dd] p-3.5 rounded-xl text-sm 
                        focus:outline-none focus:border-[#c4a47c] 
                        focus:ring-2 focus:ring-[#c4a47c]/20 transition"
              required
            />

            <input
              name="visitDate"
              type="date"
              value={form.visitDate}
              onChange={handleChange}
              className="w-full border border-[#ece6dd] p-3.5 rounded-xl text-sm 
                        focus:outline-none focus:border-[#c4a47c] 
                        focus:ring-2 focus:ring-[#c4a47c]/20 transition"
              required
            />

            <select
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              className="w-full border border-[#ece6dd] p-3.5 rounded-xl text-sm 
                        focus:outline-none focus:border-[#c4a47c] 
                        focus:ring-2 focus:ring-[#c4a47c]/20 transition"
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
              className="w-full border border-[#ece6dd] p-3.5 rounded-xl text-sm 
                        focus:outline-none focus:border-[#c4a47c] 
                        focus:ring-2 focus:ring-[#c4a47c]/20 transition"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl 
                        border border-[#ece6dd] 
                        text-[#5f5f5f] hover:bg-[#f5f2ea] transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl 
                        bg-[#c4a47c] text-white 
                        hover:bg-[#b8935f] transition shadow-md"
            >
              {loading ? "Booking..." : "Confirm"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
