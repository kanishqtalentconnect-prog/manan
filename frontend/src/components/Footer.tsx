import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

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
    <footer className="relative bg-[#0f0f0f] text-gray-400">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(196,164,124,0.05),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#c4a47c]/20 border border-[#c4a47c]/40 flex items-center justify-center text-[#c4a47c] font-bold">
                M
              </div>
              <div>
                <p className="text-white font-semibold">Manan LLP</p>
                <p className="text-xs text-gray-400">Mukteshwar Retreats</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
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
                  className="w-9 h-9 rounded-full bg-[#161616] border border-white/10 
                            flex items-center justify-center 
                            hover:border-[#c4a47c]/40 hover:text-[#c4a47c] 
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
            <ul className="space-y-3 text-sm">
              <li><a href="/#about" className="hover:text-white">About Us</a></li>
              <li><a href="/#property" className="hover:text-white">Properties</a></li>
              <li><a href="/#hero2" className="hover:text-white">Why Invest</a></li>
              <li><a href="/#hero4" className="hover:text-white">Testimonials</a></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/#hero3" className="hover:text-white">Gallery</a></li>
              <li><a href="/faq" className="hover:text-white">Investment FAQ</a></li>
              <li><a href="/documentation" className="hover:text-white">Legal Documentation</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li>📞 +91 12345 67890</li>
              <li>✉️ info@mananllp.com</li>
              <li>📍 Mukteshwar, Uttarakhand</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Manan LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
