import { 
  FiMapPin, 
  FiTrendingUp, 
  FiHeart, 
  FiShield, 
  FiHome, 
  FiUsers 
} from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiMapPin />,
      title: "Pristine Location",
      desc: "Nestled in the Kumaon Himalayas, Mukteshwar offers 360° panoramic views of snow-capped peaks and lush valleys."
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

  return (
    <div className="bg-[#0f0f0f] text-[#d1d1d1] py-24 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP MINI BADGE */}
        <div className="flex justify-center mb-10">
          <span className="text-[#c4a47c] text-[10px] uppercase tracking-[0.5em] font-bold border border-[#c4a47c]/20 px-4 py-1 rounded-full">
            Invest Mukteshwar
          </span>
        </div>

        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-8">
            A Rising Investment <br />
            <span className="text-[#c4a47c]">Destination</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 leading-relaxed text-sm md:text-base font-light opacity-80">
            At 2,286 meters elevation, Mukteshwar is where the Himalayas meet opportunity. 
            A sanctuary for high achievers seeking mental clarity, peace, and genuine investment potential.
          </p>
        </div>

        {/* GRID CARDS - Replicating the tiled look from image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {features.map((f, index) => (
                <div
                key={index}
                className="
                    relative group rounded-2xl 
                    bg-[#141414]/90 
                    border border-white/10
                    p-8
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:shadow-[0_0_40px_rgba(196,164,124,0.08)]
                "
                >
                {/* subtle inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#c4a47c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* icon box */}
                <div className="relative z-10 mb-6 w-10 h-10 rounded-lg 
                    bg-[#1c1c1c] border border-[#c4a47c]/30 
                    flex items-center justify-center text-[#c4a47c] text-lg">
                    {f.icon}
                </div>

                {/* title */}
                <h3 className="relative z-10 text-white font-semibold mb-3 tracking-wide text-sm">
                    {f.title}
                </h3>

                {/* description */}
                <p className="relative z-10 text-gray-400 text-xs leading-relaxed font-light">
                    {f.desc}
                </p>
                </div>
            ))}
            </div>


        {/* BOTTOM IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img 
            src="/about.jpg" 
            alt="Mountains" 
            className="w-full h-87.5 md:h-112.5 object-cover grayscale-20 hover:grayscale-0 transition-all duration-1000"
          />
        </div>

      </div>
    </div>
  );
};

export default About;