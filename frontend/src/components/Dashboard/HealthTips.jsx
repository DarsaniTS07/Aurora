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
          ml:3,
          fontWeight: 600,
          color: isDark ? "#theme.primary" : "theme.primary"
        }}
      >
        Health & Safety Tips
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 3 },
          mx: 2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": { 
            // height: 8,
            display:'none'
          },
        }}
      >
        {healthTips.map((tip) => (
          <Card
            key={tip.id}
            sx={{
              minWidth: { xs: 100, sm: 320, md: 350 },
              maxWidth: 280,
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
            <CardContent sx={{ p: 1 }}>
              <Typography 
                variant="h6" 
                fontWeight="bold"
                sx={{ 
                  mb: 1,
                  color: isDark ? "#fff" : "theme.primary"
                }}
              >
                {tip.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{
                  color: isDark ? "rgba(255,255,255,0.7)" : "text.secondary",
                  lineHeight: 1.2,
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
