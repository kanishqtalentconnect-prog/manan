import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/",
      label: "Instagram",
    },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/",
      label: "YouTube",
    },
  ];
  return (
  <footer className="relative bg-[#f5f2ea] text-[#5c5c5c]">
    {/* subtle warm radial glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(196,164,124,0.08),transparent_70%)]" />

    <div className="relative max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#c4a47c]/20 border border-[#c4a47c]/40 flex items-center justify-center text-[#c4a47c] font-bold">
              M
            </div>
            <div>
              <p className="text-[#1a1a1a] font-semibold">Manan LLP</p>
              <p className="text-xs text-[#8a8a8a]">Nata Dol Retreats</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[#6a6a6a]">
            Creating premium mountain sanctuaries where luxury meets tranquility
            in the heart of the Himalayas.
          </p>

          <div className="flex gap-4 mt-6">
            {socialLinks.map(({ icon: Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white border border-[#e5e0d8]
                          flex items-center justify-center 
                          hover:border-[#c4a47c]/50 hover:text-[#c4a47c] 
                          transition cursor-pointer shadow-sm"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-[#1a1a1a] font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="/#about" className="hover:text-[#c4a47c] transition">About Nata Dol</a></li>
            <li><a href="/#property" className="hover:text-[#c4a47c] transition">Properties</a></li>
            <li><a href="/#hero2" className="hover:text-[#c4a47c] transition">Why Invest</a></li>
            <li><a href="/#hero4" className="hover:text-[#c4a47c] transition">Testimonials</a></li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h4 className="text-[#1a1a1a] font-semibold mb-4">Resources</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="/#hero3" className="hover:text-[#c4a47c] transition">Gallery</a></li>
            <li><Link to="/faq" className="hover:text-[#c4a47c] transition">Investment FAQ</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-[#1a1a1a] font-semibold mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li>📞 +91 7217816810</li>
            <li>✉️ info@mananllp.com</li>
            <li>
              <a
                href="https://maps.app.goo.gl/m89aP73oVSRyC6FE8"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c4a47c] transition"
              >
                📍 Nata Dol, Uttarakhand
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-16 pt-6 border-t border-[#e5e0d8] flex flex-col md:flex-row items-center justify-between text-xs text-[#8a8a8a] gap-4">
        <p>© {new Date().getFullYear()} Manan LLP. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
}
