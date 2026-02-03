import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, []);
  

  const handleLogin = async () => {
    const res = await api.post("/auth/login", {
      email: "admin@example.com",
      password: "123456",
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    login(res.data.user, res.data.token);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Login as Admin
      </button>
    </div>
  );
}
