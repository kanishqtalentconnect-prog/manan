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
        text-[16px] md:text-[15px]
        font-light tracking-wide
        text-[#2b2b2b] hover:text-black
        py-3 md:py-0
        transition-all duration-300"
    >
      {label}

      {!disableUnderline && (
        <span
          className={`
            absolute left-0 -bottom-2 h-[1px] hidden md:block w-full
            bg-black
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
    <nav className="sticky top-0 z-50 bg-[#e9e6dd] border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div>
            <p className="text-xl font-light tracking-wide text-[#2b2b2b]">
              Manan LLP
            </p>
            <p className="text-[12px] text-black/60 tracking-wide">
              Nata Dol Retreats
            </p>
          </div>
        </Link>

        {/* CENTER NAV (UNCHANGED ITEMS) */}
        {!user && (
          <div className="hidden md:flex items-center gap-10 text-[15px] font-light text-[#2b2b2b] tracking-wide">
            <NavItem href="/#about" label="About Nata Dol" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("about")} />
            <NavItem href="/#property" label="Properties" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("property")} />
            <NavItem href="/#hero2" label="Why Invest" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero2")} />
            <NavItem href="/#hero3" label="Gallery" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero3")} />
            <NavItem href="/#hero4" label="Testimonials" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero4")} />
          </div>
        )}

        {/* RIGHT ACTIONS (SAME BUTTONS, NEW STYLE) */}
        <div className="flex items-center gap-6">

          {!user && (
            <>
              {/* Login Button (same route, same label) */}
              <Link
                to="/login"
                className="hidden md:inline-flex 
                  border border-black/30 
                  px-6 py-2.5 
                  text-[14px] font-medium tracking-wide 
                  text-[#2b2b2b] 
                  hover:bg-black hover:text-white 
                  transition-all duration-300"
              >
                Login
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-[#2b2b2b] p-2"
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

              {/* Contact Us (same label, same link) */}
              <a
                href="/#contact"
                className="hidden sm:inline-flex 
                  border border-black/30 
                  px-6 py-2.5 
                  text-[14px] font-medium tracking-wide 
                  text-[#2b2b2b] 
                  hover:bg-black hover:text-white 
                  transition-all duration-300"
              >
                Contact Us
              </a>
            </>
          )}

          {/* AUTH AREA (NO LOGIC CHANGE, LIGHT STYLE) */}
          {user && (
            <div className="flex items-center gap-4 pl-4 border-l border-black/20">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border border-black/30 flex items-center justify-center text-sm font-medium text-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-black">
                  {user.name}
                </span>
              </div>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm px-4 py-2 border border-black/30 hover:bg-black hover:text-white transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-sm text-black/70 hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU (NO FUNCTION CHANGE) */}
      {!user && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 pt-4 space-y-4 bg-[#e9e6dd] border-t border-black/10 text-[#2b2b2b]">

            <NavItem href="/#about" label="About Nata Dol" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("about")} />
            <NavItem href="/#property" label="Properties" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("property")} />
            <NavItem href="/#hero2" label="Why Invest" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero2")} />
            <NavItem href="/#hero3" label="Gallery" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero3")} />
            <NavItem href="/#hero4" label="Testimonials" activeSection={activeSection} disableUnderline={isStaticPage} onClick={() => scrollTo("hero4")} />

            <Link
              to="/login"
              className="block w-full text-center border border-black/30 py-2.5 font-medium hover:bg-black hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <a
              href="/#contact"
              className="block w-full text-center border border-black/30 py-2.5 font-medium hover:bg-black hover:text-white transition"
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
