import React from "react";
import SearchBar from "../components/Dashboard/SearchBar";
import HealthTips from "../components/Dashboard/HealthTips";
import { Box, Container } from "@mui/material";
import PreventionMeasures from "../components/Dashboard/PreventionMeasures";
import WaterQualityCard from "../components/Dashboard/WaterQualityCard";

const Dashboardpage = ({ isDark, toggleTheme }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: isDark ? "#0a1929" : "#f5f5f5",
        position: "relative",
      }}
    >

      {/* Main Content Container */}
      <Box
        maxWidth="xl"
        sx={{
          pt: { xs: 0.3, sm: 0.5, md: 1 }, // Top padding after header
          pb: { xs: 0.3, sm: 0.5, md: 1 }, // Bottom padding
          px: { xs: 0.3, sm: 0.5, md: 1 }, // Horizontal padding
        }}
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

        <WaterQualityCard isDark={isDark} />
        {/* Health Tips Section */}
        <Box
          sx={{
            mt:2,
            mb: { xs: 1, sm: 2, md: 1 },
          }}
        >
          <HealthTips />
        </Box>

        {/* Prevention Measures */}
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
          <Box
            sx={{
              mb: { xs: 3, sm: 4, md: 1 },
            }}
          >
            <PreventionMeasures />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboardpage;
