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
  <section className="relative bg-white py-20">
  {/* subtle green glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,59,46,0.06),transparent_70%)]" />

  <div className="relative max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-5xl font-serif text-[#0f3b2e] mb-3">
      Prefer to Reach Out{" "}
      <span className="text-[#b8955b] italic">Directly?</span>
    </h2>

    <p className="text-[#5c5c5c] text-base mb-14">
      Choose your preferred method of communication
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* CALL */}
      <div className="bg-[#f7f9f8] border border-[#e4ece9] rounded-2xl p-8 
                      hover:border-[#0f3b2e]/30 hover:shadow-lg 
                      transition-all duration-300">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full 
                        bg-[#0f3b2e]/10 border border-[#0f3b2e]/20 
                        flex items-center justify-center 
                        text-[#0f3b2e] text-xl">
          <FaPhoneAlt />
        </div>

        <h4 className="text-[#0f3b2e] font-semibold mb-2">Call Us</h4>

        <p className="text-sm text-[#6f6f6f] mb-1">
          Mon–Sat, 9 AM – 7 PM
        </p>

        <p className="text-[#b8955b] font-medium">
          +91 7217816810
        </p>
      </div>

      {/* WHATSAPP */}
      <div
        onClick={openWhatsApp}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openWhatsApp()}
        className="bg-[#f7f9f8] border border-[#e4ece9] rounded-2xl p-8 
                   hover:border-[#0f3b2e]/30 hover:shadow-lg 
                   transition-all duration-300 cursor-pointer"
      >
        <div className="w-14 h-14 mx-auto mb-5 rounded-full 
                        bg-[#0f3b2e]/10 border border-[#0f3b2e]/20 
                        flex items-center justify-center 
                        text-[#0f3b2e] text-xl">
          <FaWhatsapp />
        </div>

        <h4 className="text-[#0f3b2e] font-semibold mb-2">WhatsApp</h4>

        <p className="text-sm text-[#6f6f6f] mb-2">
          Quick response guaranteed
        </p>

        <p className="text-[#b8955b] font-medium">
          Chat with Us
        </p>
      </div>

      {/* EMAIL */}
      <div
        onClick={openEmail}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openEmail()}
        className="bg-[#f7f9f8] border border-[#e4ece9] rounded-2xl p-8 
                   hover:border-[#0f3b2e]/30 hover:shadow-lg 
                   transition-all duration-300 cursor-pointer"
      >
        <div className="w-14 h-14 mx-auto mb-5 rounded-full 
                        bg-[#0f3b2e]/10 border border-[#0f3b2e]/20 
                        flex items-center justify-center 
                        text-[#0f3b2e] text-xl">
          <FaEnvelope />
        </div>

        <h4 className="text-[#0f3b2e] font-semibold mb-2">Email</h4>

        <p className="text-sm text-[#6f6f6f] mb-2">
          Detailed inquiries welcome
        </p>

        <p className="text-[#b8955b] font-medium">
          info@nirvayadevbhoomi.in
        </p>
      </div>

    </div>
  </div>
</section>

);
}
