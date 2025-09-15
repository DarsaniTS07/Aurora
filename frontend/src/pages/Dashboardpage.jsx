import React from "react";
import Header from "../components/Dashboard/Header";
import SearchBar from "../components/Dashboard/SearchBar";
import HealthTips from "../components/Dashboard/HealthTips";
import { Box, Container } from "@mui/material";

const Dashboardpage = ({ isDark, toggleTheme }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: isDark ? "#0a1929" : "#f5f5f5",
        position: "relative",
      }}
    >
      {/* Dashboard Header (with tips bar) */}
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Content Container */}
      <Box
        maxWidth="xl"
        // sx={{
        //   pt: { xs: 2, sm: 3, md: 1 }, // Top padding after header
        //   pb: { xs: 2, sm: 3, md: 1 }, // Bottom padding
        //   px: { xs: 2, sm: 3, md: 1 }, // Horizontal padding
        // }}
      >
        {/* Search Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: { xs: 0.1, sm: 0.2, md: 0.5 },
            width: "100%",
          }}
        >
          <SearchBar isDark={isDark} toggleTheme={toggleTheme} />
        </Box>

        {/* Health Tips Section */}
        <Box
          sx={{
            mb: { xs: 3, sm: 4, md: 1 },
          }}
        >
          <HealthTips />
        </Box>

        {/* Additional Dashboard Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            gap: { xs: 2, sm: 3, md: 4 },
            mt: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Add your other dashboard components here */}
          {/* Example placeholders */}
          <Box
            sx={{
              height: 200,
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            Dashboard Widget 1
          </Box>
          <Box
            sx={{
              height: 200,
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            Dashboard Widget 2
          </Box>
          <Box
            sx={{
              height: 200,
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            Dashboard Widget 3
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboardpage;