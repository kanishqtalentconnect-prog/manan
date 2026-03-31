import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useMediaCarousel } from "../hooks/useMediaCarousel";
import { ChevronLeft, ChevronRight, Mountain, Home, TreePine, FileBadge, FileText } from "lucide-react";


type MediaItem = {
  url: string;
  type: "image" | "video";
};

export default function Hero2() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [openPdf, setOpenPdf] = useState(false);
  /* ================= FETCH CONTENT ================= */
  useEffect(() => {
    api.get("/content/hero2").then((res) => {
      setMedia(res.data?.media || []);
    });
  }, []);

  useEffect(() => {
    if (openPdf) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openPdf]);

  /* ================= CAROUSEL ================= */
  const { index, next, prev } = useMediaCarousel(media);

  const hasMedia = media && media.length > 0;
  const current = hasMedia ? media[index] : null;


  return (
    <section className="relative bg-[#f5f2ea] py-24 overflow-hidden">

    {/* Single subtle glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_65%)]" />

    <div className="relative max-w-7xl mx-auto px-6">

      {/* ================= ABOUT ================= */}
      <div className="flex justify-center mb-14">
        <span className="text-[#6b6253] text-[11px] uppercase tracking-[0.45em] 
                        font-medium border border-[#d8d2c4] 
                        px-6 py-2 rounded-full bg-white/60 backdrop-blur-sm">
          MANAN LLP
        </span>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] text-[#2a2a2a]">
          About Manan{" "}
          <span className="italic text-[#8c7b63]">
            International
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-28">

        {/* LEFT TEXT */}
        <div>
          <p className="text-[#434343] text-lg leading-relaxed mb-6">
            Manan International specializes in premium land and second-home 
            opportunities in the pristine mountain region of Nata Dol, Uttarakhand.
          </p>

          <p className="text-[#434343] text-lg leading-relaxed mb-6">
            We focus on helping serious buyers and investors acquire verified, 
            high-quality mountain properties with complete clarity and professional guidance.
          </p>

          <p className="text-[#434343] text-lg leading-relaxed mb-6">
            Our approach prioritizes transparency, legal security, and personalized 
            advisory to ensure every client makes a confident and secure investment.
          </p>

          <p className="text-[#434343] text-lg leading-relaxed">
            Whether you seek a private mountain retreat or a long-term appreciating asset, 
            we provide the expertise and support required throughout your ownership journey.
          </p>

          <div className="mt-8">
            <button
              onClick={() => setOpenPdf(true)}
              className="inline-flex items-center gap-2 px-6 py-3 
                rounded-full border border-[#c5a46d]
                text-[#0f3b2e] font-medium text-sm tracking-wide
                hover:bg-[#0f3b2e] hover:text-white hover:border-[#0f3b2e]
                transition-all duration-300 shadow-sm"
            >
              <FileText size={18} />
              View Registration Certificate
            </button>
          </div>
        </div>

        {/* RIGHT MEDIA (Carousel preserved) */}
        <div className="relative">

          {hasMedia && current ? (
            current.type === "image" ? (
              <img
                src={current.url}
                className="rounded-3xl shadow-xl object-cover w-full h-[400px] md:h-[400px] lg:h-[400px]"
              />
            ) : (
              <video
                ref={videoRef}
                src={current.url}
                autoPlay
                muted
                className="rounded-3xl shadow-xl object-cover w-full h-[420px] md:h-[500px] lg:h-[560px]"
                onEnded={next}
              />
            )
          ) : (
            <div className="rounded-3xl shadow-xl 
                            bg-white border border-[#e2dbcf]
                            h-80 flex items-center justify-center text-center p-8">
              <div>
                <p className="text-[#8c7b63] text-lg font-serif mb-2">
                  Coming Soon
                </p>
                <p className="text-[#777] text-sm">
                  Visual content will be available shortly.
                </p>
              </div>
            </div>
          )}
          

          {/* ARROWS */}
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

      </div>
    </div>
    {/* ================= WE DEAL IN ================= */}
    <div className="text-center mb-28">

      <h2 className="text-4xl md:text-5xl font-serif text-[#0f3b2e] mb-4">
        We Deal In
      </h2>

      <p className="text-[#6b6b6b] max-w-xl mx-auto mb-14">
        Curated real estate offerings designed for discerning investors and lifestyle buyers.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-4 gap-10">

        {[
          {
            title: "Premium Land Parcels",
            desc: "Legally verified mountain plots with breathtaking views and long-term appreciation potential.",
            icon: <Mountain className="text-[#0f3b2e]"/>
          },
          {
            title: "Luxury Properties",
            desc: "Architect-designed private retreats blending modern comfort with Himalayan serenity.",
            icon: <Home className="text-[#0f3b2e]"/>
          },
          {
            title: "Second Home Estates",
            desc: "Exclusive gated estates ideal for weekend homes and generational assets.",
            icon: <TreePine className="text-[#0f3b2e]"/>
          },
          {
            title: "Property Advisory",
            desc: "End-to-end assistance including documentation, legal clarity, and ownership guidance.",
            icon: <FileBadge className="text-[#0f3b2e]"/>
          }
        ].map((item, i) => (
          <div
            key={i}
            className="group bg-white border border-[#e5dfd2]
                      rounded-3xl p-10 text-center
                      transition-all duration-500 ease-out
                      will-change-transform
                      hover:-translate-y-2
                      hover:scale-[1.03]
                      hover:shadow-xl"
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-full 
                            bg-[#f3efe6]
                            border border-[#e0d8c9]
                            flex items-center justify-center 
                            text-2xl">
              {item.icon}
            </div>

            <h3 className="text-lg font-serif text-[#2a2a2a] mb-4">
              {item.title}
            </h3>

            <p className="text-sm text-[#666] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>


    {/* ================= WHO CAN CHOOSE US ================= */}
    <div className="text-center">

      <h2 className="text-4xl md:text-5xl font-serif text-[#0f3b2e] mb-4">
        Who Can Choose Us
      </h2>

      <p className="text-[#6b6b6b] max-w-xl mx-auto mb-14">
        Tailored solutions for investors, lifestyle buyers, and future-focused families.
      </p>

      <div className="flex flex-wrap justify-center gap-6">

        {[
          "NRI Buyers",
          "First-time Home Buyers",
          "Commercial Property Investors",
          "Tenants",
          "Real Estate Investors",
          "High-end Property Seekers",
          "Second Home Seekers",
          "HNI Investors"
        ].map((item, i) => (
          <div
            key={i}
            className="px-8 py-4 bg-white
              border border-[#e5dfd2]
              rounded-full
              text-[#2a2a2a]
              font-medium
              shadow-sm
              transition-all duration-300 ease-out
              will-change-transform
              hover:shadow-lg
              hover:-translate-y-1
              hover:scale-[1.03]
              hover:border-[#8c7b63]/40"
          >
            {item}
          </div>
        ))}

      </div>
    </div>
    {/* ================= PDF Modal ================= */}
    {openPdf && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">

        {/* BACKDROP */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpenPdf(false)}
        />

        {/* MODAL CONTAINER */}
        <div className="relative w-[92%] md:w-[85%] h-[90%] 
          bg-[#fdfcf9] rounded-3xl overflow-hidden shadow-2xl
          border border-[#e8e1d4]">

          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-6 py-4 
            border-b border-[#e8e1d4] bg-white/70 backdrop-blur">

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f3efe6] flex items-center justify-center">
                <FileText size={16} className="text-[#0f3b2e]" />
              </div>

              <p className="text-sm font-medium text-[#2a2a2a]">
                Registration Certificate
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpenPdf(false)}
              className="w-9 h-9 rounded-full bg-black/70 text-white 
              flex items-center justify-center hover:scale-105 transition"
            >
              ✕
            </button>
          </div>

          {/* PDF VIEW AREA */}
          <div className="relative w-auto h-[calc(100%-64px)] bg-white">

            <iframe
              src="/FiLLiP.pdf#toolbar=0&navpanes=0&scrollbar=0"
              className="w-full h-full"
            />

            {/* WATERMARK OVERLAY */}
            <div className="pointer-events-none absolute bottom-4 right-6 text-xs text-black tracking-wide">
              Manan International • Confidential
            </div>

          </div>
        </div>
      </div>
    )}
  </section>
  
);

}
