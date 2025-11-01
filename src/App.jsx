import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import LoginPage from "./pages/LoginPage";

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
      }, 3000);
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
    </Routes>
  );
}

export default App;
