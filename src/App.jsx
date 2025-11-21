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

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const showSplash = location.pathname === "/";

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setIsInitializing(false);

        // check Login Dummy
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
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
