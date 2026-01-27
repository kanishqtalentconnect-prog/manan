import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-[#c4a47c]/20 border border-[#c4a47c]/40 flex items-center justify-center text-[#c4a47c] font-bold">
            M
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">Manan LLP</p>
            <p className="text-[11px] text-gray-400">Mukteshwar Retreats</p>
          </div>
        </Link>

        {/* CENTER NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#property" className="hover:text-white transition">
            Properties
          </a>
          <a href="#about" className="hover:text-white transition">
            About Mukteshwar
          </a>
          <a href="#hero2" className="hover:text-white transition">
            Why Invest
          </a>
          <a href="#hero3" className="hover:text-white transition">
            Gallery
          </a>
          <a href="#hero4" className="hover:text-white transition">
            Testimonials
          </a>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {/* CONTACT CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-[#c4a47c] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d6b88c] transition"
          >
            Contact Us
          </a>

          {/* AUTH AREA */}
          {user && (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#c4a47c]/20 border border-[#c4a47c]/40 flex items-center justify-center text-[#c4a47c] text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-gray-400">
                  {user.name}
                </span>
              </div>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-xs px-3 py-1.5 rounded-md bg-white/10 text-white hover:bg-white/20 transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-red-400 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
