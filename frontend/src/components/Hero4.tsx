export default function Hero4() {
  const testimonials = [
    {
      quote:
        "Manan LLP made our dream of owning a Himalayan retreat a reality. The entire process was transparent, professional, and hassle-free. The legal clarity and documentation were impeccable.",
      name: "Rajesh Sharma",
      role: "Tech Entrepreneur, Mumbai",
      property: "Himalayan Vista Villa",
      initials: "RS",
    },
    {
      quote:
        "As NRIs, we were initially hesitant about investing remotely. The team’s professionalism and the quality of digital communication gave us complete confidence. Worth every rupee!",
      name: "Priya & Amit Kapoor",
      role: "NRI Investors, Singapore",
      property: "Sunset Peak Residence",
      initials: "PK",
    },
    {
      quote:
        "I was looking for a peaceful sanctuary away from the city chaos. Nata Dol exceeded all expectations. The property appreciation has been an added bonus to the mental peace I found here.",
      name: "Dr. Meera Iyer",
      role: "Medical Professional, Bangalore",
      property: "Alpine Sanctuary",
      initials: "MI",
    },
  ];

  return (
    <section className="relative bg-[#0f0f0f] py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.08),transparent_65%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold 
                             text-[#c4a47c] bg-[#c4a47c]/10 
                             border border-[#c4a47c]/30 px-4 py-1.5 rounded-full">
              Client Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            What Our Clients{" "}
            <span className="text-[#c4a47c] italic">Say About Us</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-400 font-light leading-relaxed">
            Real experiences from real investors who found their perfect
            mountain sanctuary.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-[#161616] border border-white/10 
                         rounded-2xl p-8 shadow-xl hover:shadow-2xl 
                         transition-all duration-500"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-full bg-[#c4a47c]/15 
                              border border-[#c4a47c]/30 flex items-center 
                              justify-center text-[#c4a47c] mb-6">
                ❝
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-[#c4a47c] text-sm mb-4">
                ★★★★★
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                “{t.quote}”
              </p>

              {/* Property badge */}
              <span className="inline-block text-[10px] uppercase tracking-wider 
                               text-[#c4a47c] bg-[#c4a47c]/10 
                               border border-[#c4a47c]/30 
                               px-3 py-1 rounded-full mb-6">
                {t.property}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#c4a47c]/15 
                                border border-[#c4a47c]/30 
                                flex items-center justify-center 
                                text-[#c4a47c] font-semibold text-sm">
                  {t.initials}
                </div>

                <div>
                  <p className="text-white font-semibold text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: "100+", label: "Happy Investors" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "50+", label: "Properties Sold" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-serif text-[#c4a47c] mb-1">
                {s.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
