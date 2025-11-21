/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SaktiLogo from "../assets/logo-sakti.png";
import SiladanLogo from "../assets/logo-siladan.png";
import SimaraLogo from "../assets/logo-simara.png";

function SplashScreen() {
  const logos = [
    { src: SaktiLogo, className: "w-36 h-36 md:w-45 md:h-45" },
    { src: SiladanLogo, className: "w-46 h-46 md:w-62 md:h-62" },
    { src: SimaraLogo, className: "w-44 h-44 md:w-54 md:h-54" },
  ];

  const [currentLogo, setCurrentLogo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen bg-linear-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
      <div className="flex flex-col items-center text-center z-10">
        {/* Logo */}
        <div className="flex items-center justify-center relative h-46 md:h-62 w-46 md:w-62">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentLogo}
              src={logos[currentLogo].src}
              alt={`Logo ${currentLogo + 1}`}
              className={`absolute inset-0 object-contain drop-shadow-2xl mx-auto ${logos[currentLogo].className}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          Portal SSO Pemerintahan
        </motion.h1>

        <motion.p
          className="px-6 mt-6 md:px-0 text-sm md:text-lg text-gray-200 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        >
          Sistem Informasi Manajemen Aset, Permintaan Layanan dan Pengaduan
          Aset, serta Manajemen Perubahan di Organisasi Perangkat Daerah
        </motion.p>
      </div>

      {/* Soft Glow */}
      <motion.div
        className="absolute w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default SplashScreen;
