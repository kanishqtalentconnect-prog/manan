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
      className="space-y-4 bg-white p-6 rounded-xl border"
    >
      <h2 className="text-lg font-semibold">
        {isAdmin ? "Add Verified Review" : "Write a Review"}
      </h2>

      {/* Name */}
      <input
        className="w-full border p-2 rounded"
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
        className="w-full border p-2 rounded"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      {/* Property Bought (Optional) */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Property Bought (Optional)"
        value={form.propertyBought}
        onChange={(e) =>
          setForm({ ...form, propertyBought: e.target.value })
        }
      />

      {/* Address (Optional) */}
      <input
        className="w-full border p-2 rounded"
        placeholder="City / Location (Optional)"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      {/* Review */}
      <textarea
        maxLength={1000}
        className="w-full border p-2 rounded"
        placeholder="Write your experience..."
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        required
      />

      {/* Rating */}
      <div>
        <p className="text-sm font-medium mb-2">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setForm({ ...form, rating: star })}
              className="text-2xl transition-transform hover:scale-110"
            >
              <span
                className={
                  star <= form.rating
                    ? "text-[#c4a47c]"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Image Upload (Optional) */}
      <p className="text-sm font-medium mb-2">Profile Photo (Optional)</p>
      <input
        type="file"
        accept="image/*"
        className="w-full"
        onChange={(e) =>
          setForm({
            ...form,
            image: e.target.files?.[0] || null,
          })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded hover:opacity-90"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
