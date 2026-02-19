import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

export default function Hero() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* ================= FETCH HERO CONTENT ================= */
  useEffect(() => {
    api.get("/content/hero")
      .then((res) => setMedia(res.data?.media || []))
      .catch(() => setMedia([]));
  }, []);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (media.length <= 1) return;

    const current = media[index];
    let timer: number | undefined;

    if (current.type === "image") {
      timer = window.setTimeout(() => {
        next();
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [index, media]);

  const next = () => {
    setIndex((i) => (i + 1) % media.length);
  };

  const prev = () => {
    setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  };

  const current = media[index];

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-[#0f0f0f]"
    >
      {/* ================= BACKGROUND MEDIA ================= */}
      {current && (
        <div className="absolute inset-0 z-0">
          {current.type === "image" ? (
            <img
              src={current.url}
              className="w-full h-full object-cover transition-opacity duration-700"
            />
          ) : (
            <video
              ref={videoRef}
              src={current.url}
              autoPlay
              muted
              className="w-full h-full object-cover"
              onEnded={next}
            />
          )}
        </div>
      )}

      {/* gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.15),transparent_60%)] z-10" />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black z-10" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-left">

        <h1 className="text-[38px] sm:text-[48px] md:text-[64px] lg:text-[72px]
                      font-light tracking-tight
                      text-gray-50 leading-[1.1]">
          Your Mountain Sanctuary Awaits
        </h1>

        <p className="mt-6 max-w-2xl
                      text-[16px] md:text-[18px]
                      font-light leading-relaxed
                      text-white">
          Premium plots and villas in Mukteshwar. We handle everything
          from acquisition to business setup.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
          <a
            href="#property"
            className="inline-flex items-center justify-center
                      px-10 py-4
                      border border-white/70
                      text-white
                      font-medium tracking-wide
                      transition-all duration-300
                      hover:bg-white hover:text-black"
          >
            Explore Properties
          </a>
          <a
            href="#contact"
            className="inline-flex items-center
                      h-[56px]               /* match button height */
                      text-white
                      font-medium tracking-wide
                      gap-2
                      transition-all duration-300
                      hover:gap-3"
          >
            Get in Touch
            <span className="text-xl">›</span>
          </a>
        </div>
      </div>

      {/* ================= ARROWS ================= */}
      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute 
              top-[65%] md:top-1/2 
              -translate-y-1/2 
              left-4 md:left-6
              z-30
              bg-white hover:bg-[#f0ebe3]
              text-[#2a2a2a] text-2xl md:text-3xl
              w-10 h-10 md:w-12 md:h-12
              rounded-full
              flex items-center justify-center
              transition"
            aria-label="Previous"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <button
            onClick={next}
            className="absolute 
              top-[65%] md:top-1/2 
              -translate-y-1/2 
              right-4 md:right-6
              z-30
              bg-white hover:bg-[#f0ebe3]
              text-[#2a2a2a] text-2xl md:text-3xl
              w-10 h-10 md:w-12 md:h-12
              rounded-full
              flex items-center justify-center
              transition"
            aria-label="Next"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* ================= DOTS ================= */}
      {media.length > 1 && (
        <div className="absolute 
           bottom-2 sm:bottom-6 md:bottom-8
           left-1/2 -translate-x-1/2 
           z-30 flex gap-2">
          {media.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "bg-[#8c7b63] w-8"
                  : "bg-white/60 w-2 border border-[#ccc]"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
