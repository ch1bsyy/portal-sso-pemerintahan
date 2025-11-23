import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DUMMY_USERS } from "../data/users";

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // SIMPLE TOAST
  const toast = (message, type = "success") => {
    const div = document.createElement("div");
    div.innerText = message;
    div.className = `
      fixed top-5 right-5 px-4 py-2 rounded-md text-white shadow-lg
      ${type === "error" ? "bg-red-500" : "bg-green-600"}
      animate-fade-in
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ==== BACKEND LOGIN (punya kamu) ====
    try {
      const response = await fetch(
        "https://manpro-473802.et.r.appspot.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast("Login berhasil!", "success");

        if (data.token) localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user || data));

        navigate(`/dashboard/${data.user?.username || data.username}`);
        return;
          }
    } catch {
      toast("Gagal terhubung ke server", "error");
    }

    // ==== DUMMY LOGIN (punya temanmu) ====
    const dummyUser = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (dummyUser) {
      localStorage.setItem("sso_user", JSON.stringify(dummyUser));
      toast("Login berhasil (dummy)!", "success");
      navigate("/dashboard");
    } else {
      setError("Username atau password salah.");
      toast("Login gagal", "error");
    }

    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* LEFT SECTION */}
      <div
        className="hidden md:flex w-1/2 p-10 items-center justify-center"
        style={{ backgroundColor: "#4B6184" }}
      >
        <div className="text-center">
          <div className="flex justify-center items-center gap-10 mt-4">
            <img
              src="/src/assets/logo-sakti.png"
              className="h-24 drop-shadow-xl"
            />
            <img
              src="/src/assets/logo-siladan.png"
              className="h-40 drop-shadow-xl"
            />
            <img
              src="/src/assets/logo-simara.png"
              className="h-28 drop-shadow-xl"
            />
          </div>

          <h1 className="text-3xl font-bold mt-8 text-white">
            PORTAL SSO PEMERINTAHAN
          </h1>
          <p className="text-sm mt-2 text-gray-200 opacity-90">
            Sistem Informasi Manajemen Aset dan Pengaduan
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div
          className={`p-8 rounded-2xl shadow-xl w-full max-w-md border ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
          }`}
        >
          <div className="flex justify-end mb-3">
            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
              <input
                type="checkbox"
                className="hidden"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  darkMode ? "bg-blue-600" : "bg-gray-400"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                    darkMode ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-center">
            Login ke Akun Anda
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* USERNAME */}
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 cursor-pointer opacity-70 hover:opacity-100"
                >
                 {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.143.19-2.243.54-3.27m3.042-2.787a9.953 9.953 0 016.418-2.43c5.523 0 10 4.477 10 10a9.97 9.97 0 01-.84 4.095M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* LUPA PASSWORD */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>

            {/* ERROR */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-5 opacity-70">
            © 2025 Sistem Pemerintahan • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
