import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import UserLogin from './components/Login/UserLogin';
import Header from './components/Header/Header';
import UserRegister from './components/Register/UserRegister';
import Dashboardpage from './pages/Dashboardpage';
import WaterAdvisor from './pages/Checker';

const Layout = ({ isDark, toggleTheme }) => {
  const location = useLocation();
  const showHeader = location.pathname !== "/userlogin" 
    && location.pathname !== "/userRegister" && location.pathname !== "/dashboard" && location.pathname !== "/checker";

  // Different header heights based on page
  const getHeaderHeight = () => {
    if (location.pathname === "/dashboard") {
      return 61; // Tips bar (36px) + Header (72px)
    }
    return showHeader ? 64 : 0;
  };

  return (
    <>
      {showHeader && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Header isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      )}
      <div style={{ paddingTop: getHeaderHeight() }}>
        <Routes>
          <Route
            path="/"
            element={<LandingPage isDark={isDark} toggleTheme={toggleTheme} />}
          />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userRegister" element={<UserRegister />} />
          <Route 
            path="/dashboard" 
            element={<Dashboardpage isDark={isDark} toggleTheme={toggleTheme} />} 
          />
           <Route 
            path='/checker' 
            element={<WaterAdvisor isDark={isDark} toggleTheme={toggleTheme} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default Layout;