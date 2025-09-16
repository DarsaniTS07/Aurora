import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  TrendingUp,
} from "lucide-react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const WaterCharts = ({ chartData, qualityData, COLORS }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: "white",
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            border: "2px solid",
            borderColor: "primary.light",
          }}
        >
          <Typography fontWeight="bold">{`Parameter: ${label}`}</Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {`${entry.dataKey}: ${entry.value}`}
              {entry.dataKey === "value" && label === "TDS" && " ppm"}
              {entry.dataKey === "value" && label === "Turbidity" && " NTU"}
              {entry.dataKey === "value" && label === "Temperature" && "°C"}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = ({ payload }) => (
    <Box display="flex" justifyContent="center" gap={3} mt={2}>
      {payload.map((entry, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: entry.color,
            }}
          />
          <Typography variant="body2">{entry.value}</Typography>
        </Box>
      ))}
    </Box>
  );

  // Enhanced chart data with safetyScore
  const enhancedChartData = chartData.map((item) => ({
    ...item,
    safetyScore: item.max
      ? ((item.max - Math.abs(item.value - (item.min || 0))) / item.max) * 100
      : 100,
  }));

  return (
    <Box mt={6}>
      {/* Charts Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #2563eb, #9333ea, #4f46e5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Water Quality Analytics
        </Typography>
        <Typography color="text.secondary">
          Comprehensive analysis of your water parameters
        </Typography>
        <Divider
          sx={{
            width: 120,
            mx: "auto",
            mt: 1,
            borderColor: "primary.main",
            borderWidth: 2,
          }}
        />
      </Box>

      {/* Main Charts Grid */}
      <Grid container spacing={4}>
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box p={1.5} bgcolor="primary.main" borderRadius={2}>
                <BarChart3 size={24} color="white" />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Parameter Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current values vs safe limits
                </Typography>
              </Box>
            </Box>
            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={enhancedChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} />
                  <Bar dataKey="value" fill="#0284c7" name="Current Value" />
                  <Bar dataKey="max" fill="#ef4444" name="Max Safe Limit" />
                  <Bar dataKey="min" fill="#22c55e" name="Min Safe Limit" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box p={1.5} bgcolor="secondary.main" borderRadius={2}>
                <PieChartIcon size={24} color="white" />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="secondary.dark"
                >
                  Quality Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overall water quality distribution
                </Typography>
              </Box>
            </Box>
            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="#fff"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {qualityData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Analytics */}
      <Grid container spacing={4} mt={1}>
        {/* Safety Scores */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box p={1.5} bgcolor="success.main" borderRadius={2}>
                <Activity size={24} color="white" />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" color="success.dark">
                  Safety Scores
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Parameter safety assessment
                </Typography>
              </Box>
            </Box>
            <Box height={260}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enhancedChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="safetyScore"
                    stroke="#059669"
                    fill="#10b981"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Quality Metrics Summary */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box p={1.5} bgcolor="warning.main" borderRadius={2}>
                <TrendingUp size={24} color="white" />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" color="warning.dark">
                  Quality Metrics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Key performance indicators
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2}>
              {enhancedChartData.map((item) => (
                <Grid item xs={12} sm={6} key={item.name}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor:
                            item.safetyScore > 80
                              ? "green"
                              : item.safetyScore > 60
                              ? "orange"
                              : "red",
                        }}
                      />
                    </Box>
                    <Typography variant="h5" color="warning.main">
                      {item.safetyScore.toFixed(0)}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Safety Score
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        width: "100%",
                        height: 8,
                        bgcolor: "grey.300",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${item.safetyScore}%`,
                          height: "100%",
                          bgcolor:
                            item.safetyScore > 80
                              ? "green"
                              : item.safetyScore > 60
                              ? "orange"
                              : "red",
                          transition: "width 1s ease",
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WaterCharts;
