import { Lock, Mail, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-indigo-600 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">Email</label>
          <div className="flex items-center border rounded px-3 hover:border-blue-400 transition">
            <Mail size={18} className="text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full p-2 outline-none bg-transparent"
              placeholder="admin@email.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium mb-1 block">Password</label>
          <div className="flex items-center border rounded px-3 hover:border-blue-400 transition">
            <Lock size={18} className="text-slate-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full p-2 outline-none bg-transparent"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader size={18} className="animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}