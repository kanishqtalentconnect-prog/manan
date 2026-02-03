export default function Hero3() {
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
            Explore our curated gallery showcasing stunning properties and
            breathtaking landscapes that make Mukteshwar truly exceptional.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left tall image */}
          <div className="md:row-span-2 overflow-hidden rounded-3xl group">
            <img
              src="images/hero3_1.jpg"
              alt="Luxury Interior"
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Top middle */}
          <div className="overflow-hidden rounded-3xl group">
            <img
              src="images/hero2.jpg"
              alt="Himalayan Peaks"
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Top right */}
          <div className="overflow-hidden rounded-3xl group">
            <img
              src="images/hero3_3.jpg"
              alt="Modern Villa"
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom middle */}
          <div className="overflow-hidden rounded-3xl group">
            <img
              src="images/hero3_4.jpg"
              alt="Luxury Living Room"
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom right */}
          <div className="overflow-hidden rounded-3xl group">
            <img
              src="images/hero3_5.jpg"
              alt="Mountain View"
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
