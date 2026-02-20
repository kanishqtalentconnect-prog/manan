import { useEffect, useState } from "react";
import api from "../api/axios";
import ReviewForm from "./ReviewForm";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  _id: string;
  name: string;
  description: string;
  rating: number;
  propertyBought?: string;
  image?: string;
  address?: string;
}

export default function Hero4() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(3);

  useEffect(() => {
    api.get("/reviews")
      .then((res) => setReviews(res.data))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    setPage(0);
  }, [reviewsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setReviewsPerPage(1); // mobile
      } else {
        setReviewsPerPage(3); // tablet & desktop
      }
    };

    handleResize(); // run once on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const currentReviews = reviews.slice(
    page * reviewsPerPage,
    page * reviewsPerPage + reviewsPerPage
  );

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <section className="relative bg-[#f5f2ea] py-20 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,59,46,0.04),transparent_65%)]" />

    <div className="relative max-w-7xl mx-auto px-6">

      {/* Header */}
      <div className="text-center mb-20">
        <div className="flex justify-center mb-4">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold 
            text-[#0f3b2e] bg-white
            border border-[#0f3b2e]/20 px-4 py-1.5 rounded-full">
            Client Stories
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-serif text-[#0f3b2e] mb-4">
          What Our Clients{" "}
          <span className="text-[#b8955b] italic">Say About Us</span>
        </h2>

        <p className="max-w-xl mx-auto text-sm md:text-base text-[#5c5c5c] leading-relaxed">
          Real experiences from verified investors who found their perfect
          mountain sanctuary.
        </p>
      </div>

      {/* Reviews Section */}
      {loading ? (
        <p className="text-center text-[#777]">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-[#777]">
          No verified reviews yet.
        </p>
      ) : (
        <>
          <div className="relative mb-16">

            {/* Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevPage}
                  disabled={page === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2
                    bg-white border border-[#e8e8e8]
                    text-[#0f3b2e] w-12 h-12 rounded-full
                    flex items-center justify-center
                    shadow-md transition
                    disabled:opacity-30 z-30"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={nextPage}
                  disabled={page === totalPages - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2
                    bg-white border border-[#e8e8e8]
                    text-[#0f3b2e] w-12 h-12 rounded-full
                    flex items-center justify-center
                    shadow-md transition
                    disabled:opacity-30 z-30"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
              {currentReviews.map((r) => (
                <div
                  key={r._id}
                  className="flex flex-col bg-white border border-[#e8e8e8]
                    rounded-2xl p-8 shadow-sm
                    transition-all duration-500
                    hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex-1">

                    <div className="w-10 h-10 rounded-full bg-[#eef3f1]
                      border border-[#d9e3df]
                      flex items-center justify-center 
                      text-[#b8955b] mb-6">
                      ❝
                    </div>

                    <div className="flex gap-1 text-[#b8955b] text-sm mb-4">
                      {"★".repeat(r.rating)}
                    </div>

                    <p className="text-sm text-[#555] leading-relaxed mb-6 break-words">
                      “{r.description}”
                    </p>

                    {r.propertyBought && (
                      <span className="inline-block text-[10px] uppercase tracking-wider 
                        text-[#0f3b2e] bg-[#f0f5f3]
                        border border-[#d9e3df]
                        px-3 py-1 rounded-full mb-6">
                        {r.propertyBought}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-6 border-t border-[#eee] mt-6">
                    <div className="w-10 h-10 rounded-full overflow-hidden 
                      bg-[#eef3f1] border border-[#d9e3df]
                      flex items-center justify-center">
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[#0f3b2e] font-semibold text-sm">
                          {getInitials(r.name)}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="text-[#0f3b2e] font-semibold text-sm">
                        {r.name}
                      </p>

                      {r.address && (
                        <p className="text-xs text-[#777]">
                          {r.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mb-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === page
                      ? "w-8 h-2 bg-[#0f3b2e]"
                      : "w-2 h-2 bg-[#d8d8d8]"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Write Review Button */}
      <div className="flex justify-center mt-4 mb-16">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 rounded-xl 
            bg-[#0f3b2e] text-white font-semibold
            hover:bg-[#0c2f25] transition-all shadow-md"
        >
          Write a Review
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-10 text-center">
        <div>
          <p className="text-3xl font-serif text-[#0f3b2e] mb-1">
            {averageRating}/5
          </p>
          <p className="text-sm uppercase tracking-widest text-[#777]">
            Average Rating
          </p>
        </div>

        <div>
          <p className="text-3xl font-serif text-[#0f3b2e] mb-1">
            {reviews.length}+
          </p>
          <p className="text-sm uppercase tracking-widest text-[#777]">
            Verified Reviews
          </p>
        </div>

        <div>
          <p className="text-3xl font-serif text-[#0f3b2e] mb-1">
            100%
          </p>
          <p className="text-sm uppercase tracking-widest text-[#777]">
            Transparency
          </p>
        </div>
      </div>

    </div>

    {/* REVIEW MODAL */}
    {showForm && (
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm 
          flex items-center justify-center p-4"
        onClick={() => setShowForm(false)}
      >
        <div
          className="relative w-full max-w-xl
            bg-white border border-[#e8e8e8]
            rounded-2xl shadow-2xl
            p-6 md:p-8
            max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 
              text-[#777] hover:text-[#0f3b2e] 
              text-xl transition"
          >
            ✕
          </button>

          <ReviewForm
            onSuccess={() => {
              setShowForm(false);
              api.get("/reviews").then((res) => setReviews(res.data));
            }}
          />
        </div>
      </div>
    )}
  </section>

);

}
