/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FiLogOut, FiGrid, FiArrowRight, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import SaktiLogo from "../assets/logo-sakti.png";
import SiladanLogo from "../assets/logo-siladan.png";
import SimaraLogo from "../assets/logo-simara.png";

import { motion } from "motion/react";

const LandingPageSSO = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check Login Session
    const savedUser = localStorage.getItem("sso_user");
    if (!savedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sso_user");
    navigate("/login");
  };

  const apps = [
    {
      id: "simara",
      name: "SIMARA",
      desc: "Manajemen inventarisasi aset, penilaian risiko, dan perencanaan pemeliharaan berkala.",
      logo: SimaraLogo,
      color: "from-indigo-500 to-purple-400",
      imgClass: "h-26 md:h-28 w-auto",
    },
    {
      id: "siladan",
      name: "SILADAN",
      desc: "Portal layanan pengaduan aset daerah dan monitoring tindak lanjut perbaikan secara real-time.",
      logo: SiladanLogo,
      color: "from-emerald-500 to-teal-400",
      imgClass: `h-38 md:h-40 w-auto scale-125 origin-center mt-2 filter drop-shadow-2xl brightness-80 ${
        darkMode ? "filter-none" : ""
      }`,
    },
    {
      id: "sakti",
      name: "SAKTI",
      desc: "Perubahan, pelaksanaan, hingga pelaporan dalam satu sistem terintegrasi.",
      logo: SaktiLogo,
      color: "from-blue-500 to-cyan-400",
      imgClass: "h-23 md:h-25 w-auto",
    },
  ];

  if (!user) return null;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"
      } font-sans`}
    >
      {/* NAVBAR */}
      <nav
        className={`sticky top-0 z-50 px-6 py-4 backdrop-blur-md border-b ${
          darkMode
            ? "bg-slate-900/80 border-slate-700"
            : "bg-white/80 border-slate-100 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-linear-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <FiGrid size={20} />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-none tracking-tight">
                Portal SSO
              </h1>
              <p className="text-xs opacity-70 uppercase tracking-widest mt-1">
                Pemerintahan Daerah
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition cursor-pointer min-h-11 min-w-11 flex items-center justify-center ${
                darkMode
                  ? "hover:bg-slate-800 text-yellow-400"
                  : "hover:bg-gray-200 text-blue-600"
              }`}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <div className="h-8 w-px bg-slate-600 mx-2 hidden md:block"></div>

            <button
              onClick={handleLogout}
              className="flex items-center min-h-11 min-w-11 gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-medium text-sm border border-red-500/20"
            >
              <FiLogOut size={18} />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="grow px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* APP GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`relative group rounded-2xl overflow-hidden border shadow-xl flex flex-col transition-all duration-300
                    ${
                      darkMode
                        ? "bg-slate-800 border-slate-700 hover:border-slate-600 shadow-slate-900/50"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-slate-200/50"
                    }`}
              >
                {/* Top Indicator Bar */}
                <div className={`h-2 w-full bg-linear-to-r ${app.color}`}></div>

                <div className="p-8 flex flex-col h-full items-center text-center relative z-10">
                  <div
                    className={`h-32 w-full flex items-center justify-center mb-6 rounded-lg ${
                      darkMode ? "bg-slate-900/50" : "bg-slate-50"
                    }`}
                  >
                    <img
                      src={app.logo}
                      alt={`${app.name} Logo`}
                      className={`object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 ${app.imgClass}`}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1 group-hover:text-blue-500 transition-colors">
                    {app.name}
                  </h3>
                  <p
                    className={`text-xs md:text-sm font-semibold uppercase tracking-widest mb-4 ${
                      darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {app.id.toUpperCase()} System
                  </p>

                  <p
                    className={`text-sm md:text-base leading-relaxed mb-8 grow ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {app.desc}
                  </p>

                  <button
                    className={`w-full min-h-11 min-w-11 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer
                        ${
                          darkMode
                            ? "bg-cyan-900 hover:bg-cyan-700 text-white"
                            : " bg-cyan-700 hover:bg-cyan-900 text-white"
                        }`}
                  >
                    Buka Aplikasi <FiArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPageSSO;
