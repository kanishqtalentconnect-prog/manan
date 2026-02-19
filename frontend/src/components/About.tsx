import { 
  FiMapPin, 
  FiTrendingUp, 
  FiHeart, 
  FiShield, 
  FiHome, 
  FiUsers 
} from 'react-icons/fi';
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useMediaCarousel } from "../hooks/useMediaCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MediaItem = {
  url: string;
  type: "image" | "video";
};


const About = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    api.get("/content/about").then((res) => {
      setMedia(res.data?.media || []);
    });
  }, []);

  const features = [
    {
      icon: <FiMapPin />,
      title: "Pristine Location",
      desc: "Nestled in the pristine Kumaon Himalayas, Nata Dol offers breathtaking 360° panoramic views of snow-capped peaks and lush green valleys."
    },
    {
      icon: <FiTrendingUp />,
      title: "Rising Investment Hub",
      desc: "Property values have appreciated 15% annually as discerning investors discover this hidden gem."
    },
    {
      icon: <FiHeart />,
      title: "Wellness & Serenity",
      desc: "Escape urban chaos. Fresh mountain air, peaceful surroundings, and a slower pace of life await you."
    },
    {
      icon: <FiShield />,
      title: "Clear Legal Titles",
      desc: "All properties come with verified legal documentation, clear titles, and transparent pricing."
    },
    {
      icon: <FiHome />,
      title: "Premium Properties",
      desc: "Thoughtfully designed retreats that blend modern luxury with the natural mountain aesthetic."
    },
    {
      icon: <FiUsers />,
      title: "Thriving Community",
      desc: "Join a community of like-minded individuals seeking peace, well-being, and smart investments."
    }
  ];

  const { index, next, prev } = useMediaCarousel(media);
  const current = media[index];


  return (
    <section className="relative bg-[#f5f2ea] text-[#2a2a2a] py-28 px-6 overflow-hidden">

      {/* soft beige glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_65%)]" />

      <div className="relative max-w-6xl mx-auto">

        {/* MINI BADGE */}
        <div className="flex justify-center mb-14">
          <span className="text-[#6b6253] text-[11px] uppercase tracking-[0.45em] 
                          font-medium border border-[#d8d2c4] 
                          px-6 py-2 rounded-full bg-white/60 backdrop-blur-sm">
            Invest Nata Dol
          </span>
        </div>

        {/* HERO TEXT */}
        <div className="text-center mb-28">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-10 text-[#2a2a2a]">
            A Rising Investment{" "}
            <span className="italic text-[#8c7b63]">
              Destination
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-[#5c5c5c] leading-relaxed 
                        text-sm md:text-base font-normal tracking-wide">
            Nestled in the pristine hills of Nata Dol, Uttarakhand, this elevated 
            Himalayan haven offers unmatched tranquility and perspective. 
            A sanctuary designed for visionaries who value peace, clarity, 
            and meaningful investment growth.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {features.map((f, index) => (
            <div
              key={index}
              className="
                group rounded-3xl 
                bg-white
                border border-[#e5dfd2]
                p-10
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              {/* icon box */}
              <div className="mb-8 w-12 h-12 rounded-xl 
                              bg-[#f3efe6] 
                              border border-[#e0d8c9]
                              flex items-center justify-center 
                              text-[#8c7b63] text-lg">
                {f.icon}
              </div>

              {/* title */}
              <h3 className="text-lg font-serif mb-4 text-[#2a2a2a] tracking-wide">
                {f.title}
              </h3>

              {/* description */}
              <p className="text-[#666] text-sm leading-relaxed font-normal">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* MEDIA SECTION */}
        <div className="relative rounded-3xl overflow-hidden border border-[#e5dfd2] shadow-lg">

          {media.length > 0 && (
            <div className="relative">

              {current.type === "image" ? (
                <img
                  src={current.url}
                  className="w-full h-[420px] md:h-[520px] object-cover transition-transform duration-1000 hover:scale-105"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={current.url}
                  className="w-full h-[420px] md:h-[520px] object-cover"
                  autoPlay
                  muted
                  onEnded={next}
                />
              )}

              {/* ARROWS */}
              {media.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 
                              bg-white/80 hover:bg-white
                              border border-[#ddd]
                              w-12 h-12 rounded-full 
                              flex items-center justify-center
                              text-[#333] transition z-20 shadow"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={next}
                    className="absolute right-6 top-1/2 -translate-y-1/2 
                              bg-white/80 hover:bg-white
                              border border-[#ddd]
                              w-12 h-12 rounded-full 
                              flex items-center justify-center
                              text-[#333] transition z-20 shadow"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* DOTS */}
              {media.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {media.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index
                          ? "bg-[#8c7b63] w-8"
                          : "bg-white/60 w-2 border border-[#ccc]"
                      }`}
                    />
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default About;