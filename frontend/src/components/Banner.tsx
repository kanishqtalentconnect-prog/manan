

export default function Banner() {
  return (
    <section className="bg-[#f5f2ea] py-20">
        <div className="max-w-7xl mx-auto px-6">

            <div className="bg-white rounded-3xl p-10 md:p-14 
            flex flex-col lg:flex-row items-center justify-between gap-10
            border border-[#e7e2d8] shadow-sm">

            {/* LEFT IMAGE */}
            <div className="relative w-full lg:w-1/3 flex justify-center">

                <img
                src="/banner-image.webp"
                className="w-[220px] rotate-[-6deg] shadow-lg"
                />

                {/* FLOATING TAG */}
                <div className="absolute -top-4 -left-4 bg-[#0f3b2e] text-white 
                px-3 py-2 rounded-full text-xs shadow-md">
                Free Consultation
                </div>
            </div>

            {/* TEXT */}
            <div className="w-full lg:w-1/3 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-serif text-[#0f3b2e] mb-4">
                Ready to Invest in{" "}
                <span className="italic text-[#c5a46d]">
                    Devbhoomi?
                </span>
                </h2>

                <p className="text-[#5a5a5a] leading-relaxed">
                Get a free guide on legal checks, pricing trends, and everything you 
                need before buying land in Nata Dol.
                </p>
            </div>

            {/* CTA BUTTONS */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <a
                    href="/#contact"
                    className="inline-flex items-center justify-center 
                        px-8 py-4 rounded-xl 
                        bg-[#0f3b2e] text-white 
                        font-medium tracking-wide
                        shadow-md
                        hover:bg-[#0c2f25] hover:shadow-lg
                        transition-all duration-300"
                    >
                    Contact Directly
                    </a>
            </div>
            </div>

        </div>
    </section>
  )
}
