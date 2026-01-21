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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}   
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >

      
        <h2 className="text-xl font-semibold mb-1">Send an Enquiry</h2>
        <p className="text-sm text-gray-500 mb-4">
          We’ll get back to you shortly.
        </p>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="bestTimeToReach"
            placeholder="Best Time to Reach (e.g. Evening)"
            value={form.bestTimeToReach}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="question"
            placeholder="Your Question"
            rows={4}
            value={form.question}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg resize-none"
            required
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      
      </div>
    </div>
  );
}
