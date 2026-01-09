import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const MobileNavBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { 
      label: "Dashboard", 
      icon: <HomeIcon />, 
      value: 0,
      path: "/dashboard"
    },
    { 
      label: "Blog", 
      icon: <ArticleIcon />, 
      value: 1,
      path: "/blog"
    },
    { 
      label: "Complaints", 
      icon: <ReportProblemIcon />, 
      value: 2,
      path: "/complaints"
    },
    { 
      label: "Awareness", 
      icon: <LightbulbIcon />, 
      value: 3,
      path: "/awareness"
    },
  ];

  // Update active tab based on current location
  useEffect(() => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.value);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    const selectedItem = navigationItems.find(item => item.value === newValue);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  if (!isMobile) {
    // Desktop sidebar version
    return (
      <Box
        sx={{
          width: 240,
          flexShrink: 0,
          position: 'fixed',
          left: 0,
          top: 64, // Account for dashboard header height
          height: 'calc(100vh - 64px)',
          backgroundColor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          zIndex: 1200,
          overflowY: 'auto',
        }}
      >
        <Box sx={{ pt: 2 }}>
          {navigationItems.map((item, index) => (
            <Box
              key={index}
              onClick={() => handleChange(null, index)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                cursor: 'pointer',
                backgroundColor: activeTab === index ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                borderRadius: 1,
                margin: 1,
                transition: 'all 0.2s ease',
              }}
            >
              <Box sx={{ 
                mr: 2, 
                color: activeTab === index ? 'primary.main' : 'text.secondary',
                transition: 'color 0.2s ease'
              }}>
                {item.icon}
              </Box>
              <Box
                sx={{
                  color: activeTab === index ? 'primary.main' : 'text.primary',
                  fontWeight: activeTab === index ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                {item.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  // Mobile bottom navigation
  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 1300,
        borderTop: 1,
        borderColor: 'divider',
      }} 
      elevation={8}
    >
      <BottomNavigation
        value={activeTab}
        onChange={handleChange}
        showLabels
        sx={{
          height: 70,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 12px 8px',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem',
            marginTop: '4px',
            '&.Mui-selected': {
              fontSize: '0.75rem',
            },
          },
        }}
      >
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNavBar;