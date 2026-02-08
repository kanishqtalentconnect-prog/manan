import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useMediaCarousel } from "../hooks/useMediaCarousel";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

export default function Hero3() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* ================= FETCH CONTENT ================= */
  useEffect(() => {
    api.get("/content/hero3").then((res) => {
      setMedia(res.data?.media || []);
    });
  }, []);

  /* ================= CAROUSEL ================= */
  const { index, next, prev } = useMediaCarousel(media);
  const current = media[index];

  return (
    <section className="relative bg-[#0f0f0f] py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.1),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold 
                             text-[#c4a47c] bg-[#c4a47c]/10 
                             border border-[#c4a47c]/30 px-4 py-1.5 rounded-full">
              Visual Journey
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Experience the{" "}
            <span className="text-[#c4a47c] italic">Beauty</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-400 font-light leading-relaxed">
            Explore stunning properties and breathtaking landscapes that define Mukteshwar.
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {!current ? (
            /* Fallback */
            <img
              src="/images/hero3_1.jpg"
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          ) : current.type === "image" ? (
            <img
              src={current.url}
              className="w-full h-[420px] md:h-[520px] object-cover transition-opacity duration-700"
            />
          ) : (
            <video
              ref={videoRef}
              src={current.url}
              autoPlay
              muted
              className="w-full h-[420px] md:h-[520px] object-cover"
              onEnded={next}
            />
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* CONTROLS */}
          {media.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 
                           bg-black/60 text-white w-11 h-11 rounded-full 
                           flex items-center justify-center hover:bg-black transition"
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 
                           bg-black/60 text-white w-11 h-11 rounded-full 
                           flex items-center justify-center hover:bg-black transition"
              >
                ›
              </button>
            </>
          )}

          {/* DOTS */}
          {media.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {media.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === index ? "bg-[#c4a47c] w-4" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
