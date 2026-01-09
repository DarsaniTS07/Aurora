import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import LandingPage from './pages/LandingPage';
import UserLogin from './components/Login/UserLogin';
import Header from './components/Header/Header'; // Landing page header
import DashboardHeader from './components/Dashboard/Header'
import UserRegister from './components/Register/UserRegister';
import Dashboardpage from './pages/Dashboardpage';
import WaterAdvisor from './pages/Checker';
import MobileNavBar from './components/sidebar';
import ComplaintsPage from './pages/ComplaintsPage';
import AwarenessPage from './pages/AwarenessPage';

const Layout = ({ isDark, toggleTheme }) => {
  const location = useLocation();
  
  // Define which pages should show the sidebar and dashboard header
  const sidebarPages = ["/dashboard", "/checker", "/blog", "/complaints", "/awareness"];
  const shouldShowSidebar = sidebarPages.some(page => location.pathname.startsWith(page));
  
  // Show landing page header only on landing page
  const shouldShowLandingHeader = location.pathname === "/";
  
  
  // Show dashboard header on all sidebar pages
  const shouldShowDashboardHeader = shouldShowSidebar;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Landing Page Header - Fixed at top, only on landing page */}
      {shouldShowLandingHeader && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1300,
          }}
        >
          <Header isDark={isDark} toggleTheme={toggleTheme} />
        </Box>
      )}

      {/* Dashboard Header - Fixed at top, only on sidebar pages */}
      {shouldShowDashboardHeader && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1300,
          }}
        >
          <DashboardHeader isDark={isDark} toggleTheme={toggleTheme} />
        </Box>
      )}

      {/* Sidebar - Only on dashboard-related pages */} 
      {shouldShowSidebar && (
        <MobileNavBar />
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          boxSizing: 'border-box',
          // Adjust padding based on what's showing
          paddingTop: shouldShowLandingHeader ? '120px' : shouldShowDashboardHeader ? '64px' : 0,
          marginLeft: shouldShowSidebar ? { xs: 0, md: '240px' } : 0,
          paddingBottom: shouldShowSidebar ? { xs: '70px', md: 0 } : 0,
          minHeight: '100vh',
          backgroundColor: isDark ? 'grey.900' : 'grey.50',
          overflowX: 'hidden',
        }}
      >
        <Routes>
          {/* Landing page - shows landing header only */}
          <Route
            path="/"
            element={<LandingPage isDark={isDark} toggleTheme={toggleTheme} />}
          />
          
          {/* Auth pages - no headers, no sidebar */}
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userRegister" element={<UserRegister />} />
          
          {/* Dashboard pages - show dashboard header and sidebar */}

          <Route
            path="/dashboard"
            element={
              <Box sx={{ p: 0 }}>
                <Dashboardpage isDark={isDark} toggleTheme={toggleTheme}/>
              </Box>
            }
          />
         
          <Route
            path="/checker"
            element={<WaterAdvisor isDark={isDark} toggleTheme={toggleTheme} />}
          />
          
          {/* Add more sidebar pages here as needed */}
          <Route
            path="/blog"
            element={
              <Box sx={{ p: 0 }}>
                <h1>Blog Page</h1>
                <p>This page shows the sidebar and dashboard header</p>
              </Box>
            }
          />
          <Route
            path="/complaints"
            element={
              <Box sx={{ p: 0 }}>
                <ComplaintsPage />
              </Box>
            }
          />
          <Route
            path="/awareness"
            element={
              <Box sx={{ p: 0 }}>
                <AwarenessPage/>
              </Box>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;