import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const {user, logout} = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center transition-all">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
          <span className="text-white font-black text-xl">P</span>
        </div>
        <span className="text-xl font-extrabold tracking-tight text-gray-900">
          Property<span className="text-blue-600">Builder</span>
        </span>
      </Link>

      {/* ACTIONS */}
      <div className="flex items-center gap-6">
        {/* NOT LOGGED IN */}
        {!user && (
          <Link
            to="/login"
            className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-black hover:shadow-lg hover:shadow-gray-200 transition-all active:scale-95"
          >
            Login
          </Link>
        )}

        {/* LOGGED IN */}
        {user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-r border-gray-100 pr-6">
              <div className="w-10 h-10 bg-linear-to-tr from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-300">
                <span className="text-sm font-bold text-gray-700">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden md:block text-sm text-gray-500 font-medium">
                Welcome, <span className="text-gray-900 font-bold">{user.name}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* ADMIN DASHBOARD BUTTON */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
