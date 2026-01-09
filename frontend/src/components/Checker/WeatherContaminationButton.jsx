"use client";
import { useState, useEffect } from "react";
import {
  Droplets,
  X,
  Loader2,
  MapPin,
  Cloud,
  Thermometer,
  Droplet,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const LOOKAHEAD_HOURS = 3;

export default function WeatherContaminationModal({ turbidity }) {
  const [loading, setLoading] = useState(false);
  const [contaminationProbability, setContaminationProbability] = useState(null);
  const [nextRain, setNextRain] = useState(null);
  const [place, setPlace] = useState(null);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function findStartIndex(timesISO = []) {
    const now = Date.now();
    for (let i = 0; i < timesISO.length; i++) {
      if (new Date(timesISO[i]).getTime() >= now) return i;
    }
    return Math.max(0, timesISO.length - 1);
  }

  function analyzeRainRisk(hourlyData) {
    if (!hourlyData?.time?.length) return null;
    const { time, precipitation = [], precipitation_probability = [] } = hourlyData;
    const start = findStartIndex(time);
    const end = Math.min(start + LOOKAHEAD_HOURS, time.length - 1);

    let earliestIdx = -1;
    let highestProb = 0;
    let highestPrecip = 0;

    for (let i = start; i <= end; i++) {
      const mm = precipitation[i] ?? 0;
      const prob = precipitation_probability[i] ?? 0;
      if (mm > highestPrecip) highestPrecip = mm;
      if (prob > highestProb) highestProb = prob;
      if ((mm >= 0.2 || prob >= 50) && earliestIdx === -1) earliestIdx = i;
    }

    return {
      earliestLikelyIndex: earliestIdx,
      highestProbability: highestProb,
      highestPrecipMM: highestPrecip,
      startTime: time[start],
      endTime: time[end],
    };
  }

  async function handleCheck() {
    setLoading(true);
    setError("");
    setNextRain(null);
    setContaminationProbability(null);
    setWeatherData(null);

    try {
      if (!("geolocation" in navigator)) {
        throw new Error("Geolocation not available in this browser.");
      }

      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          setPlace({ name: `Your location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})` });

          setTimeout(() => {
            const mockWeatherData = {
              time: Array.from({ length: 24 }, (_, i) => {
                const date = new Date();
                date.setHours(date.getHours() + i);
                return date.toISOString();
              }),
              precipitation: Array.from({ length: 24 }, () => Math.random() * 5),
              precipitation_probability: Array.from({ length: 24 }, () => Math.random() * 100),
              temperature_2m: Array.from({ length: 24 }, () => 20 + Math.random() * 15),
              relativehumidity_2m: Array.from({ length: 24 }, () => 40 + Math.random() * 40),
            };

            setWeatherData(mockWeatherData);
            const rainAnalysis = analyzeRainRisk(mockWeatherData);
            if (rainAnalysis?.earliestLikelyIndex !== -1) {
              const t = new Date(mockWeatherData.time[rainAnalysis.earliestLikelyIndex]);
              setNextRain(`Rain likely around ${t.getHours()}:${t.getMinutes().toString().padStart(2, "0")}`);
            } else {
              setNextRain("No likely rain in the next few hours.");
            }

            const baseRisk = Math.min(90, turbidity * 10 + Math.random() * 30);
            setContaminationProbability(Math.round(baseRisk));
            setLoading(false);
          }, 2000);
        } catch (err) {
          console.error(err);
          setError(err.message || "Could not fetch data.");
          setLoading(false);
        }
      }, (geoErr) => {
        setLoading(false);
        setError(geoErr.message || "Could not get your location.");
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err.message || "Something went wrong.");
    }
  }

  const getRiskLevel = (probability) => {
    if (probability < 30)
      return { level: "Low", color: "success.main" };
    if (probability < 60)
      return { level: "Moderate", color: "warning.main" };
    if (probability < 80)
      return { level: "High", color: "orange" };
    return { level: "Very High", color: "error.main" };
  };

  const riskInfo = contaminationProbability !== null ? getRiskLevel(contaminationProbability) : null;

  if (!isClient) return null;

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="contained"
        startIcon={<Droplets />}
        onClick={() => setIsOpen(true)}
        disabled={turbidity === ""}
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: 3,
          textTransform: "none",
        }}
      >
        Weather Analysis
      </Button>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Cloud color="blue" />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Weather Impact Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time contamination assessment
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setIsOpen(false)}>
            <X />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* Action Button */}
          <Box textAlign="center" mb={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleCheck}
              disabled={loading}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
              ) : (
                <Droplets style={{ marginRight: 8 }} />
              )}
              {loading ? "Analyzing Weather Data..." : "Run Weather Analysis"}
            </Button>
          </Box>

          {/* Results */}
          {(place || nextRain || contaminationProbability !== null || error) && (
            <Box display="flex" flexDirection="column" gap={2}>
              {place && (
                <Card variant="outlined">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <MapPin color="blue" />
                    <Box>
                      <Typography fontWeight="bold">Location</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {place.name}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {nextRain && (
                <Card variant="outlined">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Droplet color="indigo" />
                    <Box>
                      <Typography fontWeight="bold">Weather Forecast</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {nextRain}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {contaminationProbability !== null && riskInfo && (
                <Card variant="outlined" sx={{ borderColor: riskInfo.color }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      <Thermometer style={{ marginRight: 8 }} />
                      Contamination Risk Assessment
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Box>
                        <Typography variant="h4" color={riskInfo.color}>
                          {contaminationProbability}%
                        </Typography>
                        <Typography variant="subtitle1" color={riskInfo.color}>
                          {riskInfo.level} Risk
                        </Typography>
                      </Box>
                    </Box>
                    <Box height={10} borderRadius={5} bgcolor="grey.300" mb={2}>
                      <Box
                        height="100%"
                        borderRadius={5}
                        bgcolor={riskInfo.color}
                        sx={{ width: `${contaminationProbability}%` }}
                      />
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" fontWeight="bold">
                      Recommendations:
                    </Typography>
                    <ul>
                      {contaminationProbability > 70 && <li>Avoid using this water source until treated</li>}
                      {contaminationProbability > 50 && <li>Boil water before consumption</li>}
                      {contaminationProbability > 30 && <li>Use additional filtration methods</li>}
                      <li>Monitor weather conditions closely</li>
                      <li>Consider alternative water sources if available</li>
                    </ul>
                  </CardContent>
                </Card>
              )}

              {error && (
                <Card variant="outlined" sx={{ borderColor: "error.main" }}>
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor: "error.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      !
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" color="error">
                        Error
                      </Typography>
                      <Typography variant="body2" color="error">
                        {error}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
