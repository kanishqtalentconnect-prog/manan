// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useEffect } from "react";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   useEffect(() => {
//       window.scrollTo({ top: 0, behavior: "instant" });
//     }, []);
  

//   const handleLogin = async () => {
//     const res = await api.post("/auth/login", {
//       email: "admin@example.com",
//       password: "123456",
//     });

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     login(res.data.user, res.data.token);
//     navigate("/admin");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <button
//         onClick={handleLogin}
//         className="bg-black text-white px-6 py-3 rounded-xl"
//       >
//         Login as Admin
//       </button>
//     </div>
//   );
// }
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, type FormEvent } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      login(res.data.user, res.data.token);

      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#0f3b2e]">
          Admin Login
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c7a463]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c7a463]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c7a463] text-[#0f3b2e] py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}