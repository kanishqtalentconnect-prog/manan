export default function Hero2() {
  const stats = [
    {
      title: "Strong Appreciation",
      desc: "25% annual growth in property values as Mukteshwar gains recognition.",
      highlight: "25% YoY Growth",
      icon: "📈",
    },
    {
      title: "Legal Transparency",
      desc: "Clear titles, verified documentation, and transparent pricing with no hidden surprises.",
      highlight: "100% Legal Clarity",
      icon: "🛡️",
    },
    {
      title: "Faster Sales Cycles",
      desc: "Reduced buyer friction and streamlined processes mean 40% faster closures.",
      highlight: "40% Faster Closing",
      icon: "⚡",
    },
    {
      title: "Premium Clientele",
      desc: "Join a community of HNIs, NRIs, and discerning investors.",
      highlight: "100+ Happy Investors",
      icon: "👥",
    },
  ];

  return (
    <section className="relative bg-[#0f0f0f] py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
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
            A rising destination that offers the perfect blend of lifestyle,
            serenity, and strong returns.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#14110f] border border-[#2a241f] rounded-2xl p-6
                         hover:border-[#c4a47c]/40 hover:shadow-2xl
                         transition-all duration-500"
            >
              <div className="w-10 h-10 mb-4 rounded-full 
                              bg-[#c4a47c]/15 border border-[#c4a47c]/30
                              flex items-center justify-center text-[#c4a47c]">
                {item.icon}
              </div>

              <h3 className="text-white font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {item.desc}
              </p>

              <p className="text-[#c4a47c] text-sm font-semibold">
                {item.highlight}
              </p>
            </div>
          ))}
        </div>

        {/* Image + content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-[#c4a47c]/20 blur-xl opacity-30" />
            <img
              src="images/hero2.jpg"
              alt="Mukteshwar Landscape"
              loading="eager"
              className="relative rounded-3xl shadow-2xl object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-6">
              Understanding the{" "}
              <span className="text-[#c4a47c] italic">
                Modern Property Buyer
              </span>
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Today’s discerning buyers are sophisticated, research-driven,
              and value transparency. Here’s what they prioritize:
            </p>

            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex gap-3">
                <span className="text-[#c4a47c]">•</span>
                Research-first mindset: extensive comparison before decisions
              </li>
              <li className="flex gap-3">
                <span className="text-[#c4a47c]">•</span>
                Legal trust & clarity: documentation and transparency matter
              </li>
              <li className="flex gap-3">
                <span className="text-[#c4a47c]">•</span>
                Digital validation: quality online presence builds confidence
              </li>
              <li className="flex gap-3">
                <span className="text-[#c4a47c]">•</span>
                Emotional + financial value: lifestyle and ROI together
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
