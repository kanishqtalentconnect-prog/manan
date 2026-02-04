import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function ContactSection() {
  const openWhatsApp = () => {
    const phoneNumber = "911234567890"; // country code + number
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
      "Property Enquiry – Mukteshwar Retreats"
    );

    const body = encodeURIComponent(
      "Hello,\n\nI would like more details about your properties in Mukteshwar.\n\nThank you."
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };


  return (
    <section className="relative bg-[#0f0f0f] py-24">
      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.06),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
          Prefer to Reach Out{" "}
          <span className="text-[#c4a47c] italic">Directly?</span>
        </h2>
        <p className="text-gray-400 text-sm mb-14">
          Choose your preferred method of communication
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CALL */}
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-8 hover:border-[#c4a47c]/40 transition">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#c4a47c]/15 border border-[#c4a47c]/30 flex items-center justify-center text-[#c4a47c] text-xl">
              <FaPhoneAlt />
            </div>
            <h4 className="text-white font-semibold mb-2">Call Us</h4>
            <p className="text-xs text-gray-400 mb-2">
              Mon–Sat, 9 AM – 7 PM
            </p>
            <p className="text-[#c4a47c] font-medium">
              +91 12345 67890
            </p>
          </div>

          {/* WHATSAPP */}
          <div onClick={openWhatsApp}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openWhatsApp()}
            className="bg-[#161616] border border-white/10 rounded-2xl p-8 hover:border-[#c4a47c]/40 transition">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#c4a47c]/15 border border-[#c4a47c]/30 flex items-center justify-center text-[#c4a47c] text-xl">
              <FaWhatsapp />
            </div>
            <h4 className="text-white font-semibold mb-2">WhatsApp</h4>
            <p className="text-xs text-gray-400 mb-2">
              Quick response guaranteed
            </p>
            <p className="text-[#c4a47c] font-medium">
              Chat with Us
            </p>
          </div>

          {/* EMAIL */}
          <div onClick={openEmail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openEmail()}
            className="bg-[#161616] border border-white/10 rounded-2xl p-8 hover:border-[#c4a47c]/40 transition">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#c4a47c]/15 border border-[#c4a47c]/30 flex items-center justify-center text-[#c4a47c] text-xl">
              <FaEnvelope />
            </div>
            <h4 className="text-white font-semibold mb-2">Email</h4>
            <p className="text-xs text-gray-400 mb-2">
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
