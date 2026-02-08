import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

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
      <div className="relative z-20 max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[#c4a47c] 
                           bg-[#c4a47c]/10 border border-[#c4a47c]/30 px-5 py-2 rounded-full">
            Premium Real Estate
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
          Find Your Perfect
          <br />
          <span className="text-[#c4a47c] italic">Mountain Retreat</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-gray-400 font-light leading-relaxed">
          Discover exclusive properties in the Himalayas where luxury meets
          tranquility and long-term investment value.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#property"
            className="px-8 py-3.5 rounded-xl bg-[#c4a47c] text-black font-semibold
                       hover:bg-[#b08f63] transition-all shadow-lg"
          >
            Explore Properties
          </a>

          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold
                       hover:bg-white/10 transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* ================= ARROWS ================= */}
      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30
                       bg-black/100 hover:bg-black/60
                       text-white text-3xl
                       w-12 h-12 rounded-full
                       flex items-center justify-center
                       backdrop-blur transition"
            aria-label="Previous"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30
                       bg-black/40 hover:bg-black/60
                       text-white text-3xl
                       w-12 h-12 rounded-full
                       flex items-center justify-center
                       backdrop-blur transition"
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}

      {/* ================= DOTS ================= */}
      {media.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {media.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "bg-[#c4a47c] w-5"
                  : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
