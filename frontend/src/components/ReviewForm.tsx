import { useState } from "react";
import api from "../api/axios";

interface Props {
  onSuccess?: () => void;
  isAdmin?: boolean;
}

interface ReviewFormState {
  name: string;
  email: string;
  description: string;
  propertyBought?: string;
  rating: number;
  address?: string;
  image?: File | null;
}

export default function ReviewForm({
  onSuccess,
  isAdmin = false,
}: Props) {
  const [form, setForm] = useState<ReviewFormState>({
    name: "",
    email: "",
    description: "",
    propertyBought: "",
    rating: 5,
    address: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim().toLowerCase());
      formData.append("description", form.description.trim());
      formData.append("rating", String(form.rating));

      if (form.propertyBought)
        formData.append("propertyBought", form.propertyBought.trim());

      if (form.address)
        formData.append("address", form.address.trim());

      if (form.image)
        formData.append("image", form.image);

      const endpoint = isAdmin
        ? "/reviews/admin"
        : "/reviews/public";

      await api.post(endpoint, formData);

      alert(
        isAdmin
          ? "Review added successfully"
          : "Review submitted for verification"
      );

      // Reset form
      setForm({
        name: "",
        email: "",
        description: "",
        propertyBought: "",
        rating: 5,
        address: "",
        image: null,
      });

      onSuccess?.();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
  <form
  onSubmit={handleSubmit}
  className="space-y-6 bg-white p-10 rounded-2xl 
             border border-[#e9e5dd] 
             shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
>
  <h2 className="text-2xl font-serif text-[#0f3b2e]">
    {isAdmin ? "Add Verified Review" : "Write a Review"}
  </h2>

  {/* Name */}
  <input
    className="w-full border border-[#e9e5dd] p-3.5 rounded-xl text-sm
              focus:outline-none focus:border-[#0f3b2e]
              focus:ring-2 focus:ring-[#0f3b2e]/10 transition"
    placeholder="Full Name"
    value={form.name}
    onChange={(e) =>
      setForm({ ...form, name: e.target.value })
    }
    required
  />

  {/* Email */}
  <input
    type="email"
    className="w-full border border-[#e9e5dd] p-3.5 rounded-xl text-sm
              focus:outline-none focus:border-[#0f3b2e]
              focus:ring-2 focus:ring-[#0f3b2e]/10 transition"
    placeholder="Email Address"
    value={form.email}
    onChange={(e) =>
      setForm({ ...form, email: e.target.value })
    }
    required
  />

  {/* Property Bought */}
  <input
    className="w-full border border-[#e9e5dd] p-3.5 rounded-xl text-sm
              focus:outline-none focus:border-[#0f3b2e]
              focus:ring-2 focus:ring-[#0f3b2e]/10 transition"
    placeholder="Property Bought (Optional)"
    value={form.propertyBought}
    onChange={(e) =>
      setForm({ ...form, propertyBought: e.target.value })
    }
  />

  {/* Address */}
  <input
    className="w-full border border-[#e9e5dd] p-3.5 rounded-xl text-sm
              focus:outline-none focus:border-[#0f3b2e]
              focus:ring-2 focus:ring-[#0f3b2e]/10 transition"
    placeholder="City / Location (Optional)"
    value={form.address}
    onChange={(e) =>
      setForm({ ...form, address: e.target.value })
    }
  />

  {/* Review */}
  <textarea
    maxLength={1000}
    className="w-full border border-[#e9e5dd] p-3.5 rounded-xl text-sm
              focus:outline-none focus:border-[#0f3b2e]
              focus:ring-2 focus:ring-[#0f3b2e]/10 transition resize-none"
    placeholder="Write your experience..."
    value={form.description}
    onChange={(e) =>
      setForm({ ...form, description: e.target.value })
    }
    required
  />

  {/* Rating */}
  <div>
    <p className="text-sm font-semibold text-[#0f3b2e] mb-3 uppercase tracking-wider">
      Rating
    </p>

    <div className="flex gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => setForm({ ...form, rating: star })}
          className="text-2xl transition-all duration-200 hover:scale-110"
        >
          <span
            className={
              star <= form.rating
                ? "text-[#8c7b63]"
                : "text-[#d6d6d6]"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  </div>

  {/* Image Upload */}
  <div>
    <p className="text-sm font-semibold text-[#0f3b2e] mb-2 uppercase tracking-wider">
      Profile Photo (Optional)
    </p>

    <input
      type="file"
      accept="image/*"
      className="w-full text-sm text-[#666]
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:bg-[#f5f2ea] file:text-[#555]
                hover:file:bg-[#ece6dd] transition"
      onChange={(e) =>
        setForm({
          ...form,
          image: e.target.files?.[0] || null,
        })
      }
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full py-3.5 rounded-xl
              bg-[#0f3b2e] text-white font-medium tracking-wide
              hover:opacity-90 transition shadow-md"
  >
    {loading ? "Submitting..." : "Submit Review"}
  </button>
</form>
  );
}
