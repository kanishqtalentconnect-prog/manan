import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useMediaCarousel } from "../hooks/useMediaCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const hasMedia = media && media.length > 0;
  const current = hasMedia ? media[index] : null;


  return (
    <section className="relative bg-white py-20 overflow-hidden">
  {/* Subtle green glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,59,46,0.05),transparent_60%)]" />

  <div className="relative max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="text-center mb-20">
      <div className="flex justify-center mb-4">
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold 
                        text-[#0f3b2e] bg-[#f0f5f3] 
                        border border-[#d9e3df] px-4 py-1.5 rounded-full">
          Visual Journey
        </span>
      </div>

      <h2 className="text-4xl md:text-6xl font-serif text-[#0f3b2e] mb-4">
        Experience the{" "}
        <span className="text-[#b8955b] italic">Beauty</span>
      </h2>

      <p className="max-w-xl mx-auto text-sm md:text-base text-[#5c5c5c] leading-relaxed">
        Explore stunning properties and breathtaking landscapes that define Nata Dol.
      </p>
    </div>

    {/* CAROUSEL */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#e8e8e8]">
      {hasMedia && current ? (
        current.type === "image" ? (
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
        )
      ) : (
        /* FALLBACK */
        <div className="w-full h-[420px] md:h-[520px] 
                        bg-[#f7f9f8] border border-[#e4ece9]
                        flex items-center justify-center text-center p-8">
          <div>
            <p className="text-[#0f3b2e] text-xl font-serif mb-2">
              Visual Experience Coming Soon
            </p>
            <p className="text-[#777] text-sm">
              Gallery visuals for this section will be updated shortly.
            </p>
          </div>
        </div>
      )}

      {/* Soft green overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f3b2e]/10 via-transparent to-transparent" />

      {/* CONTROLS */}
      {hasMedia && media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 left-6
              z-30 bg-white shadow-md
              text-[#0f3b2e]
              w-10 h-10 md:w-12 md:h-12
              rounded-full
              flex items-center justify-center
              hover:bg-[#f0f5f3] transition"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 right-6
              z-30 bg-white shadow-md
              text-[#0f3b2e]
              w-10 h-10 md:w-12 md:h-12
              rounded-full
              flex items-center justify-center
              hover:bg-[#f0f5f3] transition"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* DOTS */}
      {hasMedia && media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {media.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "bg-[#0f3b2e] w-6"
                  : "bg-[#d8d8d8] w-2"
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
