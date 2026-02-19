import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function ContactSection() {
  const openWhatsApp = () => {
    const phoneNumber = "917217816810"; // country code + number
    const message = encodeURIComponent(
      "Hi, I’m interested in your properties. Please share more details."
    );

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
  };
  const openEmail = () => {
    const email = "info@mananllp.com";

    const subject = encodeURIComponent(
      "Property Enquiry – Nata Dol Retreats"
    );

    const body = encodeURIComponent(
      "Hello,\n\nI would like more details about your properties in Nata Dol.\n\nThank you."
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };


  return (
  <section className="relative bg-[#ffffff] py-20">
    {/* subtle warm glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.08),transparent_70%)]" />

    <div className="relative max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-3">
        Prefer to Reach Out{" "}
        <span className="text-[#c4a47c] italic">Directly?</span>
      </h2>

      <p className="text-[#6a6a6a] text-base mb-14">
        Choose your preferred method of communication
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* CALL */}
        <div className="bg-[#f9f7f2] border border-[#e5e0d8] rounded-2xl p-8 
                        hover:border-[#c4a47c]/50 hover:shadow-md transition-all duration-300">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full 
                          bg-[#c4a47c]/15 border border-[#c4a47c]/30 
                          flex items-center justify-center 
                          text-[#c4a47c] text-xl">
            <FaPhoneAlt />
          </div>

          <h4 className="text-[#1a1a1a] font-semibold mb-2">Call Us</h4>

          <p className="text-sm text-[#7a7a7a] mb-1">
            Mon–Sat, 9 AM – 7 PM
          </p>

          <p className="text-[#c4a47c] font-medium">
            +91 7217816810
          </p>
        </div>

        {/* WHATSAPP */}
        <div
          onClick={openWhatsApp}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openWhatsApp()}
          className="bg-[#f9f7f2] border border-[#e5e0d8] rounded-2xl p-8 
                     hover:border-[#c4a47c]/50 hover:shadow-md 
                     transition-all duration-300 cursor-pointer"
        >
          <div className="w-14 h-14 mx-auto mb-5 rounded-full 
                          bg-[#c4a47c]/15 border border-[#c4a47c]/30 
                          flex items-center justify-center 
                          text-[#c4a47c] text-xl">
            <FaWhatsapp />
          </div>

          <h4 className="text-[#1a1a1a] font-semibold mb-2">WhatsApp</h4>

          <p className="text-sm text-[#7a7a7a] mb-2">
            Quick response guaranteed
          </p>

          <p className="text-[#c4a47c] font-medium">
            Chat with Us
          </p>
        </div>

        {/* EMAIL */}
        <div
          onClick={openEmail}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openEmail()}
          className="bg-[#f9f7f2] border border-[#e5e0d8] rounded-2xl p-8 
                     hover:border-[#c4a47c]/50 hover:shadow-md 
                     transition-all duration-300 cursor-pointer"
        >
          <div className="w-14 h-14 mx-auto mb-5 rounded-full 
                          bg-[#c4a47c]/15 border border-[#c4a47c]/30 
                          flex items-center justify-center 
                          text-[#c4a47c] text-xl">
            <FaEnvelope />
          </div>

          <h4 className="text-[#1a1a1a] font-semibold mb-2">Email</h4>

          <p className="text-sm text-[#7a7a7a] mb-2">
            Detailed inquiries welcome
          </p>

          <p className="text-[#c4a47c] font-medium">
            info@mananllp.com
          </p>
        </div>

      </div>
    </div>
  </section>
);
}
