import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useMediaCarousel } from "../hooks/useMediaCarousel";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

export default function Hero2() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* ================= FETCH CONTENT ================= */
  useEffect(() => {
    api.get("/content/hero2").then((res) => {
      setMedia(res.data?.media || []);
    });
  }, []);

  /* ================= CAROUSEL ================= */
  const { index, next, prev } = useMediaCarousel(media);
  const current = media[index];

  return (
    <section className="relative bg-[#0f0f0f] py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER (unchanged) */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold 
                             text-[#c4a47c] bg-[#c4a47c]/10 
                             border border-[#c4a47c]/30 px-4 py-1.5 rounded-full">
              Investment Opportunity
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Why Invest in{" "}
            <span className="text-[#c4a47c] italic">Mukteshwar?</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-400 font-light leading-relaxed">
            A rising destination that offers lifestyle, serenity, and strong returns.
          </p>
        </div>

        {/* IMAGE / VIDEO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* MEDIA */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-[#c4a47c]/20 blur-xl opacity-30" />

            {!current ? (
              <img
                src="/images/hero2.jpg"
                className="relative rounded-3xl shadow-2xl object-cover"
              />
            ) : current.type === "image" ? (
              <img
                src={current.url}
                className="relative rounded-3xl shadow-2xl object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={current.url}
                autoPlay
                muted
                className="relative rounded-3xl shadow-2xl object-cover"
                onEnded={next}
              />
            )}

            {/* CONTROLS (only if multiple) */}
            {media.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                             bg-black/60 text-white w-10 h-10 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                             bg-black/60 text-white w-10 h-10 rounded-full"
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

          {/* TEXT (unchanged) */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-6">
              Understanding the{" "}
              <span className="text-[#c4a47c] italic">Modern Property Buyer</span>
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Today’s buyers are research-driven and value transparency.
            </p>

            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex gap-3"><span className="text-[#c4a47c]">•</span>Research-first mindset</li>
              <li className="flex gap-3"><span className="text-[#c4a47c]">•</span>Legal trust & clarity</li>
              <li className="flex gap-3"><span className="text-[#c4a47c]">•</span>Digital validation</li>
              <li className="flex gap-3"><span className="text-[#c4a47c]">•</span>Lifestyle + ROI</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
