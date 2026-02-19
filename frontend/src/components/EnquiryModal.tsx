import { useState } from "react";
import api from "../api/axios";

type Props = {
  propertyId: string;
  onClose: () => void;
};

export default function EnquiryModal({ propertyId, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bestTimeToReach: "",
    question: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/enquiries", {
        propertyId, // ✅ IMPORTANT
        ...form,
      });

      alert("Enquiry submitted successfully!");
      onClose();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="
          relative bg-white rounded-t-2xl sm:rounded-2xl
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

        <h2 className="text-2xl font-serif text-[#1e1e1e] mb-1">
          Send an Enquiry
        </h2>
        <p className="text-sm text-[#7a7a7a] mb-6">
          We’ll get back to you shortly.
        </p>

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
            name="bestTimeToReach"
            placeholder="Best Time to Reach (e.g. Evening)"
            value={form.bestTimeToReach}
            onChange={handleChange}
            className="w-full border border-[#ece6dd] p-3.5 rounded-xl text-sm
                      focus:outline-none focus:border-[#c4a47c]
                      focus:ring-2 focus:ring-[#c4a47c]/20 transition"
          />

          <textarea
            name="question"
            placeholder="Your Question"
            rows={4}
            value={form.question}
            onChange={handleChange}
            className="w-full border border-[#ece6dd] p-3.5 rounded-xl text-sm
                      focus:outline-none focus:border-[#c4a47c]
                      focus:ring-2 focus:ring-[#c4a47c]/20 transition resize-none"
            required
          />

        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl
                      border border-[#ece6dd]
                      text-[#5f5f5f]
                      hover:bg-[#f5f2ea] transition"
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
            {loading ? "Sending..." : "Submit"}
          </button>

        </div>
      </div>
    </div>
  );
}
