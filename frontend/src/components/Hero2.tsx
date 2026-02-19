import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useMediaCarousel } from "../hooks/useMediaCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";


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

  const hasMedia = media && media.length > 0;
  const current = hasMedia ? media[index] : null;


  return (
    <section className="relative bg-[#f5f2ea] py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold 
                            text-[#8c7b63] bg-white 
                            border border-[#e2dbcf] px-4 py-1.5 rounded-full">
              Investment Opportunity
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-[#2a2a2a] mb-4">
            Why Invest in{" "}
            <span className="text-[#8c7b63] italic">Nata Dol?</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm md:text-base text-[#6b6b6b] font-normal leading-relaxed">
            A rising destination that offers lifestyle, serenity, and strong returns.
          </p>
        </div>

        {/* IMAGE / VIDEO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* MEDIA */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-[#8c7b63]/20 blur-xl opacity-20" />

            {hasMedia && current ? (
              current.type === "image" ? (
                <img
                  src={current.url}
                  className="relative rounded-3xl shadow-xl object-cover w-full"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={current.url}
                  autoPlay
                  muted
                  className="relative rounded-3xl shadow-xl object-cover w-full"
                  onEnded={next}
                />
              )
            ) : (
              <div className="relative rounded-3xl shadow-xl 
                              bg-white border border-[#e2dbcf]
                              h-80 flex items-center justify-center text-center p-8">
                <div>
                  <p className="text-[#8c7b63] text-lg font-serif mb-2">
                    Coming Soon
                  </p>
                  <p className="text-[#777] text-sm">
                    Visual content for this section will be available shortly.
                  </p>
                </div>
              </div>
            )}

            {/* CONTROLS */}
            {hasMedia && media.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute top-1/2 -translate-y-1/2 left-6
                    z-30 bg-white shadow-md
                    text-[#2a2a2a]
                    w-10 h-10 rounded-full
                    flex items-center justify-center
                    hover:bg-[#f0ebe3] transition"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>

                <button
                  onClick={next}
                  className="absolute top-1/2 -translate-y-1/2 right-6
                    z-30 bg-white shadow-md
                    text-[#2a2a2a]
                    w-10 h-10 rounded-full
                    flex items-center justify-center
                    hover:bg-[#f0ebe3] transition"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              </>
            )}

            {/* DOTS */}
            {hasMedia && media.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {media.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === index
                        ? "bg-[#8c7b63] w-4"
                        : "bg-[#cfc7bb]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-[#2a2a2a] mb-6">
              Why Invest in{" "}
              <span className="text-[#8c7b63] italic">
                Nata Dol, Uttarakhand
              </span>
            </h3>

            <p className="text-[#434343] text-base font-normal leading-relaxed mb-6">
              Nata Dol is emerging as a high-potential Himalayan destination,
              offering serene mountain living combined with strong long-term appreciation
              and limited premium inventory.
            </p>

            <ul className="space-y-4 text-[#434343] text-base">
              {[
                "Unmatched 360° Himalayan views & pristine surroundings",
                "Limited land availability ensuring future value growth",
                "Rapidly growing demand for premium second homes",
                "High rental potential driven by tourism & remote work culture",
                "Peaceful, low-density environment with luxury lifestyle appeal",
                "Strategic location within the Kumaon Himalayas"
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#8c7b63]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
