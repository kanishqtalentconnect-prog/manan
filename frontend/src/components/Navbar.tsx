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
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-xl font-bold">
        PropertyBuilder
      </Link>

      {/* ACTIONS */}
      <div className="flex items-center gap-4">
        {/* NOT LOGGED IN */}
        {!user && (
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        )}

        {/* LOGGED IN */}
        {user && (
          <>
            {/* ADMIN DASHBOARD BUTTON */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Dashboard
              </Link>
            )}

            <span className="text-gray-700">
              Welcome, <strong>{user.name}</strong>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
