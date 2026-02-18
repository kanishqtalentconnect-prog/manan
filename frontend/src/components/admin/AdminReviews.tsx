// pages/AdminReviews.tsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import ReviewForm from "../ReviewForm";

interface Review {
  _id: string;
  name: string;
  email: string;
  description: string;
  rating: number;
  image?: string;
  propertyBought ?: string;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reviews/admin");
      setReviews(res.data);
    } catch {
      alert("Error fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const verifyReview = async (id: string) => {
    await api.patch(`/reviews/${id}/verify`);
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await api.delete(`/reviews/${id}`);
    fetchReviews();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Admin Reviews</h1>

      {/* ADD NEW REVIEW */}
      <ReviewForm isAdmin onSuccess={fetchReviews} />

      {/* EXISTING REVIEWS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Reviews</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-xl p-5 bg-white shadow-sm"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {/* Profile Image / Initial */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-gray-600">
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {review.email}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      review.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {review.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>

                {/* Property Bought Badge */}
                {review.propertyBought && (
                  <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {review.propertyBought}
                  </span>
                )}

                {/* Description */}
                <p className="mt-3 text-gray-700 break-words">
                  {review.description}
                </p>

                {/* Rating */}
                <p className="mt-2 text-yellow-500">
                  {"★".repeat(review.rating)}
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  {!review.isVerified && (
                    <button
                      onClick={() => verifyReview(review._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Verify
                    </button>
                  )}

                  <button
                    onClick={() => deleteReview(review._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
