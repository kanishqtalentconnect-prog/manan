import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useScrollSpy(
  sectionIds: string[],
  enabled: boolean
) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!enabled) {
      setActiveId("");
      return;
    }

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
  }, [sectionIds, enabled]);

  return activeId;
}



function NavItem({

  href,
  label,
  activeSection,
  disableUnderline,
  onClick,
}: {
  href: string;
  label: string;
  activeSection: string;
  disableUnderline?: boolean;
  onClick?: () => void;
}) {
  const sectionId = href.replace("/#", "");
  const isActive = !disableUnderline && activeSection === sectionId;
  

  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="relative group
        block md:inline-block
        text-base md:text-sm
        text-gray-300 hover:text-white
        py-2 md:py-0
        transition"
    >
      {label}

      {!disableUnderline && (
        <span
          className={`
            absolute left-0 -bottom-2 h-[2px] hidden md:block w-full bg-[#c4a47c]
            transform origin-left transition-transform duration-300
            ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
          `}
        />
      )}
    </a>
  );
}


export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomePage = location.pathname === "/";
  const isStaticPage =
    location.pathname === "/faq" ||
    location.pathname === "/documentation";
  const activeSection = useScrollSpy(
    ["about", "property", "hero2", "hero3", "hero4"],
    isHomePage
  );
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);
  const scrollTo = (id: string) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;

    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  }, [location]);

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
            <p className="text-[11px] text-gray-400">Nata Dol Retreats</p>
          </div>
        </Link>

        {!user && (
        <div className="hidden md:flex items-center gap-8">
          <NavItem href="/#about" label="About Nata Dol" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("about")}/>
          <NavItem href="/#property" label="Properties" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("property")} />
          <NavItem href="/#hero2" label="Why Invest" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero2")} />
          <NavItem href="/#hero3" label="Gallery" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero3")} />
          <NavItem href="/#hero4" label="Testimonials" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero4")} />
        </div>
        )}

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {!user && (
           <Link to="/login" className="hidden md:inline-flex bg-gray-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-black transition">
             Login
           </Link>
          )}
          {!user && (<button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          )}

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
      {!user && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 pt-4 space-y-4 bg-[#0f0f0f]/95 border-t border-white/10">
            <NavItem href="/#about" label="About Nata Dol" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("about")}/>
            <NavItem href="/#property" label="Properties" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("property")} />
            <NavItem href="/#hero2" label="Why Invest" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero2")} />
            <NavItem href="/#hero3" label="Gallery" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero3")} />
            <NavItem href="/#hero4" label="Testimonials" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero4")} />

            <Link
              to="/login"
              className="block w-full text-center bg-gray-900 text-white py-2.5 rounded-xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <a
              href="/#contact"
              className="block w-full text-center bg-[#c4a47c] text-black py-2.5 rounded-xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
