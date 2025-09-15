// HealthTips.jsx
import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import healthTips from "../../data/healthTips";

const HealthTips = ({ isDark }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mb: 3,
          fontWeight: 600,
          color: isDark ? "#fff" : "#1976d2"
        }}
      >
        Health & Safety Tips
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 3 },
          overflowX: "auto",
          pb: 2,
          "&::-webkit-scrollbar": { 
            height: 8,
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
            borderRadius: 4,
            "&:hover": {
              bgcolor: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            },
          },
        }}
      >
        {healthTips.map((tip) => (
          <Card
            key={tip.id}
            sx={{
              minWidth: { xs: 100, sm: 320, md: 350 },
              maxWidth: 300,
              borderRadius: 3,
              boxShadow: isDark ? 4 : 2,
              flex: "0 0 auto",
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: isDark ? 6 : 4,
              },
            }}
          >
            <CardMedia
              component="img"
              height="100"
              image={tip.image}
              alt={tip.title}
               sx={{
                objectFit: "cover",
                width: "100%",
                minHeight: 100,
                maxHeight: 100,
              }}          />
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                fontWeight="bold"
                sx={{ 
                  mb: 1,
                  color: isDark ? "#fff" : "#1976d2"
                }}
              >
                {tip.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{
                  color: isDark ? "rgba(255,255,255,0.7)" : "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                {tip.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HealthTips;
