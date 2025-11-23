import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const showSplash = location.pathname === "/";

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setIsInitializing(false);
        navigate("/login", { replace: true });
      }, 6300);

      return () => clearTimeout(timer);
    } else {
      setIsInitializing(false);
    }
  }, [showSplash, navigate]);

  if (isInitializing && showSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      {/* SPLASH */}
      <Route path="/" element={<SplashScreen />} />

      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* FORGOT PASSWORD */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* RESET PASSWORD */}
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
