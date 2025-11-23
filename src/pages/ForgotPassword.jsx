import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");

  const navigate = useNavigate();

  // Simple toast tanpa library
  const toast = (message, type = "success") => {
    const div = document.createElement("div");
    div.innerText = message;
    div.className = `
      fixed top-5 right-5 px-4 py-2 rounded-md text-white shadow-lg z-50
      ${type === "error" ? "bg-red-500" : "bg-green-600"}
      animate-fade-in
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorEmail("Format email tidak valid");
      return;
    }

    setErrorEmail("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://manpro-473802.et.r.appspot.com/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast("Link reset password telah dikirim ke email Anda");
        setEmail("");
      } else {
        toast(data.message || "Email tidak ditemukan", "error");
      }
    } catch {
      toast("Gagal terhubung ke server", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
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
            alt="Logo Sakti"
            className="h-24 object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
          />

          <img
            src="/src/assets/logo-siladan.png"
            alt="Logo Siladan"
            className="h-40 object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
          />

          <img
            src="/src/assets/logo-simara.png"
            alt="Logo Simara"
            className="h-28 object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        <h1 className="text-3xl font-bold mt-8 text-white">
          PORTAL SSO PEMERINTAHAN
        </h1>

        <p className="text-sm mt-2 text-gray-200 opacity-90">
          Sistem Informasi Manajemen Aset, Permintaan Layanan dan Pengaduan Aset, serta Manajemen Perubahan di Organisasi Perangkat Daerah
        </p>
      </div>

      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div
          className={`p-8 rounded-2xl shadow-xl w-full max-w-md border ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
          }`}
        >
          {/* DARK MODE */}
          <div className="flex justify-end mb-3">
            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="hidden"
              />
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  darkMode ? "bg-blue-600" : "bg-gray-400"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full transform duration-300 ${
                    darkMode ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>

          <h2 className="text-2xl font-semibold text-center">
            Lupa Password
          </h2>
          <p className="text-sm text-center opacity-70 mb-6">
            Masukkan email Anda untuk reset password
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
              />
              {errorEmail && (
                <p className="text-red-400 text-sm mt-1">{errorEmail}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
            >
              {loading ? "Loading..." : "Kirim Link Reset"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Kembali ke Login
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-5 opacity-70">
            © 2025 Sistem Pemerintahan • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
