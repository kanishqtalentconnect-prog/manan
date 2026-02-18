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
    <section className="relative bg-[#0f0f0f] py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.08),transparent_65%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold 
              text-[#c4a47c] bg-[#c4a47c]/10 
              border border-[#c4a47c]/30 px-4 py-1.5 rounded-full">
              Client Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            What Our Clients{" "}
            <span className="text-[#c4a47c] italic">Say About Us</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-300 font-light leading-relaxed">
            Real experiences from verified investors who found their perfect
            mountain sanctuary.
          </p>
        </div>

        {/* Reviews */}
        {loading ? (
          <p className="text-center text-gray-400">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-400">
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
                    className="flex md:flex absolute left-0 top-1/2 -translate-y-1/2 
                      bg-black/70 hover:bg-black
                      text-white w-12 h-12 rounded-full 
                      items-center justify-center transition 
                      disabled:opacity-30 z-30 shadow-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={nextPage}
                    disabled={page === totalPages - 1}
                    className="flex md:flex absolute right-0 top-1/2 -translate-y-1/2 
                      bg-black/70 hover:bg-black
                      text-white w-12 h-12 rounded-full 
                      items-center justify-center transition 
                      disabled:opacity-30 z-30 shadow-lg"
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
                    className="
                      flex flex-col
                      bg-[#161616] border border-white/10
                      rounded-2xl p-8 shadow-xl
                      transition-all duration-500
                      hover:-translate-y-1 hover:shadow-2xl
                    "
                  >
                    <div className="flex-1">

                      <div className="w-10 h-10 rounded-full bg-[#c4a47c]/15 
                                      border border-[#c4a47c]/30 flex items-center 
                                      justify-center text-[#c4a47c] mb-6">
                        ❝
                      </div>

                      <div className="flex gap-1 text-[#c4a47c] text-sm mb-4">
                        {"★".repeat(r.rating)}
                      </div>

                      <p className="text-sm text-gray-300 leading-relaxed mb-6 break-words">
                        “{r.description}”
                      </p>

                      {r.propertyBought && (
                        <span
                          className="inline-block text-[10px] uppercase tracking-wider 
                                    text-[#c4a47c] bg-[#c4a47c]/10 
                                    border border-[#c4a47c]/30 
                                    px-3 py-1 rounded-full mb-6"
                        >
                          {r.propertyBought}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
                      <div
                        className="w-10 h-10 rounded-full overflow-hidden 
                                  bg-[#c4a47c]/15 border border-[#c4a47c]/30 
                                  flex items-center justify-center"
                      >
                        {r.image ? (
                          <img
                            src={r.image}
                            alt={r.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[#c4a47c] font-semibold text-sm">
                            {getInitials(r.name)}
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="text-white font-semibold text-sm">
                          {r.name}
                        </p>

                        {r.address && (
                          <p className="text-xs text-gray-400">
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
                        ? "w-8 h-2 bg-[#c4a47c]"
                        : "w-2 h-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Write Review */}
        <div className="flex justify-center mt-4 mb-16">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-xl bg-[#c4a47c] text-black font-semibold
              hover:bg-[#b08f63] transition-all shadow-lg"
          >
            Write a Review
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-10 text-center">
          <div>
            <p className="text-3xl font-serif text-[#c4a47c] mb-1">
              {averageRating}/5
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-300">
              Average Rating
            </p>
          </div>

          <div>
            <p className="text-3xl font-serif text-[#c4a47c] mb-1">
              {reviews.length}+
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-300">
              Verified Reviews
            </p>
          </div>

          <div>
            <p className="text-3xl font-serif text-[#c4a47c] mb-1">
              100%
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-300">
              Transparency
            </p>
          </div>
        </div>
      </div>

      {/* REVIEW MODAL */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm 
                    flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="relative w-full max-w-xl
                      bg-[#161616] border border-white/10
                      rounded-2xl shadow-2xl
                      p-6 md:p-8
                      max-h-[90vh] overflow-y-auto
                      animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 
                        text-gray-400 hover:text-white 
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
