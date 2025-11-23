import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import LoginPage from "./pages/LoginPage";
import LandingPageSSO from "./pages/LandingPageSSO";
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

        // Login Dummy Check
        const user = localStorage.getItem("sso_user");
        if (!user) {
          navigate("/login", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
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
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<LandingPageSSO />} />

      {/* Tambahan route dari versi kamu */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
