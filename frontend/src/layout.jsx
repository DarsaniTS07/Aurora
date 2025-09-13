import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import UserLogin from './components/Login/UserLogin';
import Header from './components/Header/Header';
import UserRegister from './components/Register/UserRegister';

const headerHeight = 64; // Adjust this value to match your Header's height

const Layout = ({ isDark, toggleTheme }) => {
  const location = useLocation();
  const showHeader = location.pathname !== "/userlogin" && location.pathname !== "/userRegister";

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
      <div style={{ paddingTop: showHeader ? headerHeight : 0 }}>
        <Routes>
          <Route
            path="/"
            element={<LandingPage isDark={isDark} toggleTheme={toggleTheme} />}
          />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userRegister" element={<UserRegister />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default Layout;