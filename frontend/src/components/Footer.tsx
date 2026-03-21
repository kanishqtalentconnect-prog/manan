import { FaFacebookF, FaInstagram } from "react-icons/fa";
// import { FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/share/1CbdxzRGJE/",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/nirvaya_devbhoomi?igsh=d2xhM3Rqanh1NWk4",
      label: "Instagram",
    },
    // {
    //   icon: FaLinkedinIn,
    //   href: "https://www.linkedin.com/",
    //   label: "LinkedIn",
    // },
    // {
    //   icon: FaYoutube,
    //   href: "https://www.youtube.com/",
    //   label: "YouTube",
    // },
  ];
  return (
  <footer className="relative bg-[#0f3b2e] text-white">
  {/* subtle green radial glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(184,149,91,0.12),transparent_70%)]" />

  <div className="relative max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

      {/* BRAND */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/navbar-logo.png"
            alt="Manan LLP Logo"
            className="w-15 h-10 object-contain"
          />

          <div>
            <p className="text-white font-semibold">Nirvaya Devbhoomi</p>
            <p className="text-sm text-white/70 tracking-wide text-right italic"> by Manan LLP</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-white/70">
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
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20
                        flex items-center justify-center 
                        hover:border-[#b8955b]/60 hover:text-[#b8955b] 
                        transition cursor-pointer"
            >
              <Icon className="text-sm" />
            </a>
          ))}
        </div>
      </div>

      {/* COMPANY */}
      <div>
        <h4 className="text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-3 text-sm text-white/70">
          <li><a href="/#about" className="hover:text-[#b8955b] transition">About Nata Dol</a></li>
          <li><a href="/#property" className="hover:text-[#b8955b] transition">Properties</a></li>
          <li><a href="/#hero2" className="hover:text-[#b8955b] transition">Why Invest</a></li>
          <li><a href="/#hero4" className="hover:text-[#b8955b] transition">Testimonials</a></li>
        </ul>
      </div>

      {/* RESOURCES */}
      <div>
        <h4 className="text-white font-semibold mb-4">Resources</h4>
        <ul className="space-y-3 text-sm text-white/70">
          <li><a href="/#hero3" className="hover:text-[#b8955b] transition">Gallery</a></li>
          <li><Link to="/faq" className="hover:text-[#b8955b] transition">Investment FAQ</Link></li>
        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
        <ul className="space-y-3 text-sm text-white/70">
          <li>📞 +91 7217816810</li>
          <li>✉️ info@nirvayadevbhoomi.in</li>
          <li>
            <a
              href="https://maps.app.goo.gl/m89aP73oVSRyC6FE8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#b8955b] transition"
            >
              📍 Nata Dol, Uttarakhand
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* BOTTOM */}
    <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4">
      <p>© {new Date().getFullYear()} Manan LLP. All rights reserved.</p>
    </div>
  </div>
</footer>
);
}
