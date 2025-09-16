import React from "react";
import {
  Shield,
  Droplets,
  Wallet,
  Loader2,
  Zap,
  Brain,
  TrendingUp,
} from "lucide-react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material";

const AiButtons = ({ handleAiRequest, isLoading, activeAiButton }) => {
  const buttons = [
    {
      type: "prevention",
      label: "AI Prevention",
      icon: <Shield size={20} />,
      description: "Smart prevention strategies",
      secondaryIcon: <Zap size={16} />,
      gradient: "linear-gradient(to right, #22c55e, #059669)",
    },
    {
      type: "filtration",
      label: "AI Filtration",
      icon: <Droplets size={20} />,
      description: "Optimal filtration solutions",
      secondaryIcon: <Brain size={16} />,
      gradient: "linear-gradient(to right, #3b82f6, #06b6d4)",
    },
    {
      type: "cost",
      label: "AI Cost Analysis",
      icon: <Wallet size={20} />,
      description: "Smart budget planning",
      secondaryIcon: <TrendingUp size={16} />,
      gradient: "linear-gradient(to right, #f59e0b, #ea580c)",
    },
  ];

  return (
    <Box mt={6}>
      {/* Section Header */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(to right, #9333ea, #ec4899, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI-Powered Analysis
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Get intelligent insights for your water quality needs
        </Typography>
        <Box
          mx="auto"
          mt={2}
          width={96}
          height={4}
          borderRadius={2}
          sx={{
            background: "linear-gradient(to right, #a855f7, #ec4899)",
          }}
        />
      </Box>

      {/* AI Buttons Grid */}
      <Grid container spacing={4}>
        {buttons.map((btn, index) => {
          const isActive = isLoading && activeAiButton === btn.type;

          return (
            <Grid item xs={12} md={4} key={btn.type}>
              <Button
                fullWidth
                onClick={() => handleAiRequest(btn.type)}
                disabled={isLoading}
                sx={{
                  position: "relative",
                  padding: 4,
                  borderRadius: 4,
                  color: "#fff",
                  fontWeight: 600,
                  background: btn.gradient,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: `0 0 20px ${btn.gradient.split(",")[1]}`,
                  },
                  "&:disabled": {
                    opacity: 0.6,
                    cursor: "not-allowed",
                    transform: "none",
                  },
                }}
              >
                {/* Overlay for loading */}
                {isActive && (
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgcolor="rgba(0,0,0,0.2)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={4}
                    zIndex={2}
                  >
                    <Box textAlign="center">
                      <CircularProgress color="inherit" size={32} />
                      <Typography variant="body2" mt={1}>
                        Processing...
                      </Typography>
                    </Box>
                  </Box>
                )}

                {/* Button Content */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                  zIndex={1}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    mb={2}
                  >
                    <Box
                      p={1.5}
                      bgcolor="rgba(255,255,255,0.2)"
                      borderRadius={2}
                    >
                      {isActive ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        btn.icon
                      )}
                    </Box>
                    <Box opacity={0.6}>{btn.secondaryIcon}</Box>
                  </Box>

                  <Typography variant="h6" mb={1}>
                    {isActive ? "Analyzing..." : btn.label}
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    {btn.description}
                  </Typography>

                  {isActive && (
                    <Box
                      mt={2}
                      width="100%"
                      height={6}
                      bgcolor="rgba(255,255,255,0.2)"
                      borderRadius={2}
                      overflow="hidden"
                    >
                      <Box
                        width="100%"
                        height="100%"
                        bgcolor="rgba(255,255,255,0.4)"
                        className="animate-pulse"
                      />
                    </Box>
                  )}
                </Box>
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {/* AI Status Indicator */}
      <Box
        mt={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1.5}
      >
        <Box
          width={12}
          height={12}
          borderRadius="50%"
          bgcolor={isLoading ? "orange" : "green"}
          className={isLoading ? "animate-pulse" : ""}
        />
        <Typography variant="body2" color="text.secondary">
          {isLoading ? "AI Analysis in Progress..." : "AI Ready for Analysis"}
        </Typography>
      </Box>
    </Box>
  );
};

export default AiButtons;
