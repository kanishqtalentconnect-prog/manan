export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-[#0f0f0f]"
    >
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.15),transparent_60%)]" />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black" />

      {/* content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* pill */}
        <div className="flex justify-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[#c4a47c] 
                           bg-[#c4a47c]/10 border border-[#c4a47c]/30 px-5 py-2 rounded-full">
            Premium Real Estate
          </span>
        </div>

        {/* heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
          Find Your Perfect
          <br />
          <span className="text-[#c4a47c] italic">Mountain Retreat</span>
        </h1>

        {/* subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-gray-400 font-light leading-relaxed">
          Discover exclusive properties in the Himalayas where luxury meets
          tranquility and long-term investment value.
        </p>

        {/* actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#property"
            className="px-8 py-3.5 rounded-xl bg-[#c:\Users\dhang\Downloads\logo.svg] text-black font-semibold
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
    </section>
  );
}
