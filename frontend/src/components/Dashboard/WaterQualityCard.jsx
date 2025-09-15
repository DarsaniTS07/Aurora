import React from "react";
import { Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import { Opacity, Thermostat, Waves, Science } from "@mui/icons-material";

const WaterQualityCard = ({ isDark, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:900px)");
  const isDarkMode = theme.palette.mode === 'dark' || isDark;

  const values = {
    ph: 7.2,
    temperature: 25,
    tds: 450,
    turbidity: 8,
  };

  const cardData = [
    {
      label: "pH Level",
      value: `${values.ph}`,
      status: values.ph >= 6.5 && values.ph <= 8.5 ? "success" : "error",
      icon: <Science fontSize="large" color="primary" />,
      comment:
        values.ph >= 6.5 && values.ph <= 8.5
          ? "Ideal pH"
          : values.ph < 6.5
          ? "Acidic"
          : "Alkaline",
    },
    {
      label: "Temperature",
      value: `${values.temperature} °C`,
      status:
        values.temperature >= 10 && values.temperature <= 35
          ? "success"
          : "warning",
      icon: <Thermostat fontSize="large" color="error" />,
      comment:
        values.temperature >= 10 && values.temperature <= 35
          ? "Optimal Temp"
          : "Out of Range",
    },
    {
      label: "TDS (ppm)",
      value: `${values.tds}`,
      status:
        values.tds <= 500 ? "success" : values.tds <= 1000 ? "warning" : "error",
      icon: <Opacity fontSize="large" color="info" />,
      comment:
        values.tds <= 500
          ? "Safe"
          : values.tds <= 1000
          ? "Moderate"
          : "High TDS",
    },
    {
      label: "Turbidity (NTU)",
      value: `${values.turbidity}`,
      status:
        values.turbidity <= 5
          ? "success"
          : values.turbidity <= 10
          ? "warning"
          : "error",
      icon: <Waves fontSize="large" color="primary" />,
      comment:
        values.turbidity <= 5
          ? "Clear"
          : values.turbidity <= 10
          ? "Slightly Cloudy"
          : "Very Cloudy / Contaminated",
    },
  ];

  let overallStatus = "GOOD";
  let overallExplanation = "✅ This water is safe to use for drinking and daily needs.";

  const getStatusColor = (status) => {
    if (status === 'error') {
      return isDarkMode ? theme.palette.error.light : theme.palette.error.main;
    }
    if (status === 'warning') {
      return isDarkMode ? theme.palette.warning.light : theme.palette.warning.main;
    }
    // success
    return isDarkMode ? theme.palette.success.light : theme.palette.success.main;
  };

  if (cardData.some((item) => item.status === "error")) {
    overallStatus = "BAD";
    overallExplanation =
      "❌ Water is contaminated and unsafe for direct consumption. Needs purification.";
  } else if (cardData.some((item) => item.status === "warning")) {
    overallStatus = "MODERATE";
    overallExplanation =
      "⚠ Water is usable but has some issues. Consider treatment before consumption.";
  } else if (cardData.some((item) => item.status === "warning")) {
    // handled above
  }

  const worstStatus = cardData.some((i) => i.status === 'error')
    ? 'error'
    : cardData.some((i) => i.status === 'warning')
    ? 'warning'
    : 'success';
  const statusColor = getStatusColor(worstStatus);

  const OverallComment = () => (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        textAlign: "center",
        bgcolor: isDarkMode ? 'background.paper' : '#f0f4ff',
        border: '1px solid',
        borderColor: isDarkMode ? 'primary.dark' : 'primary.light',
        mt: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", color: 'primary.main', mb: 1 }}
      >
        Water Quality
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: statusColor }}>
        {overallStatus}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: statusColor, display: "block", mt: 0.5, lineHeight: 1.3 }}
      >
        {overallExplanation}
      </Typography>
    </Paper>
  );

  const ParameterCard = ({ item }) => (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        textAlign: "center",
        bgcolor: isDarkMode ? 'background.paper' : '#fff',
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {item.icon}
      <Typography variant="body1" sx={{ mt: 1, fontWeight: 600 }}>
        {item.label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: getStatusColor(item.status),
          fontWeight: "bold",
          mt: 1,
        }}
      >
        {item.value}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: getStatusColor(item.status), mt: 0.5 }}
      >
        {item.comment}
      </Typography>
    </Paper>
  );

  // Mobile: Single card with 2x2 grid of parameters
  const MobileParameterCard = () => (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        textAlign: "center",
        bgcolor: isDarkMode ? 'background.paper' : '#fff',
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        }}
      >
        {cardData.map((item, idx) => (
          <Box key={idx} sx={{ textAlign: "center" }}>
            {item.icon}
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 600 }}>
              {item.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  item.status === "success"
                    ? "green"
                    : item.status === "warning"
                    ? "orange"
                    : "red",
                fontWeight: "bold",
                mt: 1,
              }}
            >
              {item.value}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color:
                  item.status === "success"
                    ? "green"
                    : item.status === "warning"
                    ? "orange"
                    : "red",
                mt: 0.5,
              }}
            >
              {item.comment}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
        maxWidth: { xs: '100%', md: 1200 },
        bgcolor: isDarkMode ? 'background.default' : '#fafaff',
        border: '1px solid',
        borderColor: isDarkMode ? 'primary.dark' : 'primary.light',
        mx: 'auto',
        px: { xs: 1, sm: 2 },
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: "bold", color: 'primary.main' }}
      >
        Water Quality Overview
      </Typography>

      {!isMobile ? (
        <Box sx={{ display: "flex", gap: 2 }}>
          {cardData.map((item, idx) => (
            <Box key={idx} sx={{ flex: 1 }}>
              <ParameterCard item={item} />
            </Box>
          ))}
          <Box sx={{ flex: 1 }}>
            <OverallComment />
          </Box>
        </Box>
      ) : (
        <>
          <MobileParameterCard />
          <OverallComment />
        </>
      )}
    </Paper>
  );
};

export default WaterQualityCard;