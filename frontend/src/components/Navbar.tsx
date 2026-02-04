import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const triggerLine = window.innerHeight / 2;

      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= triggerLine) {
          current = id;
        }
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeId;
}



function NavItem({

  href,
  label,
  activeSection,
}: {
  href: string;
  label: string;
  activeSection: string;
}) {
  const sectionId = href.replace("/#", "");
  const isActive = activeSection === sectionId;

  return (
    <a
      href={href}
      className="relative group text-sm text-gray-300 hover:text-white transition"
    >
      {label}

      <span
        className={`
          absolute left-0 -bottom-2 h-[2px] w-full bg-[#c4a47c]
          transform origin-left transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </a>
  );
}


export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const activeSection = useScrollSpy([
    "about",
    "property",
    "hero2",
    "hero3",
    "hero4",
  ]);
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

        {!user && (
        <div className="hidden md:flex items-center gap-8">
          <NavItem href="/#about" label="About Mukteshwar" activeSection={activeSection} />
          <NavItem href="/#property" label="Properties" activeSection={activeSection} />
          <NavItem href="/#hero2" label="Why Invest" activeSection={activeSection} />
          <NavItem href="/#hero3" label="Gallery" activeSection={activeSection} />
          <NavItem href="/#hero4" label="Testimonials" activeSection={activeSection} />
        </div>
        )}

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {!user && ( <Link to="/login" className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-black hover:shadow-lg hover:shadow-gray-200 transition-all active:scale-95" > Login </Link> )}
          {/* CONTACT CTA */}
          {!user && (
          <a
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-[#c4a47c] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d6b88c] transition"
          >
            Contact Us
          </a>
          )}

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
