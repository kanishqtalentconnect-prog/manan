import { Mountain, Building2, Palmtree } from "lucide-react";

export default function Offerings() {
  return (
    <section
      id="properties"
      className="bg-[#f5f2ea] pb-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1f1f1f]">
            Our Offerings
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-[#e7e2d8] p-10 hover:shadow-lg transition duration-300">
            <div className="mb-6">
              <Mountain
                size={40}
                strokeWidth={1.5}
                className="text-[#b8955b]"
              />
            </div>

            <h3 className="text-2xl font-serif text-[#1f1f1f] mb-4">
              Premium Land Parcels
            </h3>

            <p className="text-[#5a5a5a] leading-relaxed mb-6">
              Carefully selected mountain land with verified titles, ideal for
              building your private retreat or securing a long-term appreciating asset.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-[#e7e2d8] p-10 hover:shadow-lg transition duration-300">
            <div className="mb-6">
              <Building2
                size={40}
                strokeWidth={1.5}
                className="text-[#b8955b]"
              />
            </div>

            <h3 className="text-2xl font-serif text-[#1f1f1f] mb-4">
              Luxury Properties
            </h3>

            <p className="text-[#5a5a5a] leading-relaxed mb-6">
              Ready and custom properties designed for comfort, privacy, and
              breathtaking natural surroundings.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-[#e7e2d8] p-10 hover:shadow-lg transition duration-300">
            <div className="mb-6">
              <Palmtree
                size={40}
                strokeWidth={1.5}
                className="text-[#b8955b]"
              />
            </div>

            <h3 className="text-2xl font-serif text-[#1f1f1f] mb-4">
              Second Home Estates
            </h3>

            <p className="text-[#5a5a5a] leading-relaxed mb-6">
              Own a serene mountain property designed for family retreats,
              lifestyle enhancement, and generational legacy.
            </p>

            {/*<a
              href="#contact"
              className="text-[#b8955b] font-medium hover:underline"
            >
              Request Portfolio →
            </a>*/}
          </div>

        </div>
      </div>
    </section>
  );
}
