'use client'
import { useState } from "react";
import { ThemeProvider, Box } from "@mui/material";
import WeatherContaminationButton from "../components/Checker/WeatherContaminationButton";
import { lightTheme, darkTheme } from "../themeContext";
import WaterCharts from "../components/Checker/WaterCharts";
import AiButtons from "../components/Checker/AiButton";
import WaterQualityChart from "../components/Checker/WaterQualityChart";
import DiseaseScreen from "../components/Checker/DiseaseScreen";
import { CheckCircle, Droplet } from "lucide-react";

const COLORS = ['#0088FE', '#e1128fff', '#FFBB28', '#FF8042'];

export default function WaterAdvisorApp({ isDark, toggleTheme }) {
  const [ph, setPh] = useState(7);
  const [tds, setTds] = useState(100);
  const [turbidity, setTurbidity] = useState(1);
  const [temperature, setTemperature] = useState(25);
  const [advice, setAdvice] = useState([]);
  const [waterQuality, setWaterQuality] = useState("Good");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeAiButton, setActiveAiButton] = useState("");

  function getPurificationAdvice(ph, tds, turbidity, temperature) {
    let tips = [];
    let qualityScore = 0;
    
    if (ph < 6.5) {
      tips.push("⚠️ pH is too low (acidic). Add alkaline substances or use a neutralizer.");
      qualityScore += 2;
    } else if (ph > 8.5) {
      tips.push("⚠️ pH is too high (alkaline). Add acidic substances or use a neutralizer.");
      qualityScore += 2;
    } else {
      tips.push("✅ pH level is optimal.");
    }

    if (tds < 50) {
      tips.push("💧 TDS is very low. Water may lack beneficial minerals.");
      qualityScore += 1;
    } else if (tds > 500) {
      tips.push("💧 TDS is too high. Use RO filter to reduce dissolved salts.");
      qualityScore += 3;
    } else if (tds > 300) {
      tips.push("💧 TDS is moderately high. Consider using a water filter.");
      qualityScore += 2;
    } else {
      tips.push("✅ TDS level is optimal.");
    }

    if (turbidity > 5) {
      tips.push("🔍 High turbidity detected. Filter with ceramic/cloth filter before boiling.");
      qualityScore += 3;
    } else if (turbidity > 1) {
      tips.push("🔍 Moderate turbidity. Let water settle before filtration.");
      qualityScore += 1;
    } else {
      tips.push("✅ Turbidity level is optimal.");
    }

    if (temperature > 30) {
      tips.push("🌡️ Water temperature is high. This may promote bacterial growth.");
      qualityScore += 1;
    } else if (temperature < 10) {
      tips.push("🌡️ Water temperature is very cold. This may affect taste.");
    } else {
      tips.push("✅ Temperature is within acceptable range.");
    }

    let qualityStatus;
    if (qualityScore >= 6) {
      qualityStatus = "Poor";
    } else if (qualityScore >= 3) {
      qualityStatus = "Fair";
    } else {
      qualityStatus = "Good";
    }

    setWaterQuality(qualityStatus);
    return tips;
  }

  const handleCheck = () => {
    const result = getPurificationAdvice(ph, tds, turbidity, temperature);
    setAdvice(result);
    setAiResponse("");
  };

  const handleAiRequest = async (type) => {
    setIsLoading(true);
    setActiveAiButton(type);
    setAiResponse("");

    try {
      const response = await getAiResponse({
        type,
        ph: ph,
        tds: tds,
        turbidity: turbidity,
        temperature: temperature
      });
      setAiResponse(response);
    } catch (err) {
      setAiResponse("Sorry, we couldn't generate AI advice at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = [
    { name: "pH", value: ph, min: 6.5, max: 8.5 },
    { name: "TDS", value: tds, max: 500 },
    { name: "Turbidity", value: turbidity, max: 5 },
    { name: "Temperature", value: temperature, min: 10, max: 30 }
  ];

  const qualityData = advice.length > 0 ? [
    { name: 'Optimal', value: 4 - advice.filter(a => a.includes("⚠️") || a.includes("🔍") || a.includes("💧") || a.includes("🌡️")).length },
    { name: 'Needs Attention', value: advice.filter(a => a.includes("⚠️") || a.includes("🔍") || a.includes("💧") || a.includes("🌡️")).length }
  ] : [];

  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <Box sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Box sx={{ width: "100%", maxWidth: 900, mx: "auto" }}>
          {/* Header */}
          <Box sx={{ 
            textAlign: "center", 
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}>
            <Droplet style={{ 
              color: currentTheme.palette.primary.main, 
              fontSize: 32 
            }} />
            <Box component="span" sx={{ 
              fontWeight: 700, 
              fontSize: "2rem", 
              color: "text.primary" 
            }}>
              Smart Water Quality Advisor
            </Box>
          </Box>

          <Box sx={{
            bgcolor: "background.paper",
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            boxShadow: 3,
            width: "100%"
          }}>
            
            {/* Input Sliders */}
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: 2, 
              mb: 3 
            }}>
              {/* pH */}
              <Box>
                <Box component="label" sx={{ 
                  fontWeight: 600, 
                  color: "primary.main",
                  display: "block",
                  mb: 1
                }}>
                  pH Value (6.5-8.5)
                </Box>
                <input 
                  type="range" 
                  min="0" 
                  max="14" 
                  step="0.1" 
                  value={ph} 
                  onChange={(e) => setPh(Number(e.target.value))} 
                  style={{ width: "100%" }} 
                />
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  color: "text.primary",
                  mt: 0.5
                }}>
                  <span>0</span>
                  <Box component="span" sx={{ fontWeight: "bold" }}>{ph}</Box>
                  <span>14</span>
                </Box>
              </Box>

              {/* TDS */}
              <Box>
                <Box component="label" sx={{ 
                  fontWeight: 600, 
                  color: "primary.main",
                  display: "block",
                  mb: 1
                }}>
                  TDS (ppm) &lt;500
                </Box>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={tds} 
                  onChange={(e) => setTds(Number(e.target.value))} 
                  style={{ width: "100%" }} 
                />
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  color: "text.primary",
                  mt: 0.5
                }}>
                  <span>0</span>
                  <Box component="span" sx={{ fontWeight: "bold" }}>{tds} ppm</Box>
                  <span>1000</span>
                </Box>
              </Box>

              {/* Turbidity */}
              <Box>
                <Box component="label" sx={{ 
                  fontWeight: 600, 
                  color: "primary.main",
                  display: "block",
                  mb: 1
                }}>
                  Turbidity (NTU) &lt;5
                </Box>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  step="0.1" 
                  value={turbidity} 
                  onChange={(e) => setTurbidity(Number(e.target.value))} 
                  style={{ width: "100%" }} 
                />
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  color: "text.primary",
                  mt: 0.5
                }}>
                  <span>0</span>
                  <Box component="span" sx={{ fontWeight: "bold" }}>{turbidity} NTU</Box>
                  <span>10</span>
                </Box>
              </Box>

              {/* Temperature */}
              <Box>
                <Box component="label" sx={{ 
                  fontWeight: 600, 
                  color: "primary.main",
                  display: "block",
                  mb: 1
                }}>
                  Temperature (°C) 10-30
                </Box>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={temperature} 
                  onChange={(e) => setTemperature(Number(e.target.value))} 
                  style={{ width: "100%" }} 
                />
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  color: "text.primary",
                  mt: 0.5
                }}>
                  <span>0</span>
                  <Box component="span" sx={{ fontWeight: "bold" }}>{temperature}°C</Box>
                  <span>50</span>
                </Box>
              </Box>
            </Box>

            {/* Analyze Button */}
            <button
              onClick={handleCheck}
              className="w-full mt-2 flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
              style={{
                backgroundColor: currentTheme.palette.primary.main,
                color: currentTheme.palette.primary.contrastText
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDark ? '#2191d9' : '#0f2bb5';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = currentTheme.palette.primary.main;
              }}
            >
              <CheckCircle size={18} />
              Analyze Water Quality
            </button>

            {advice.length > 0 && (
              <>
                {/* Quality Status */}
                <WaterQualityChart waterQuality={waterQuality} advice={advice} />

                {/* Charts */}
                <WaterCharts chartData={chartData} qualityData={qualityData} COLORS={COLORS} />

                {/* AI Section */}
                <AiButtons
                  handleAiRequest={handleAiRequest}
                  isLoading={isLoading}
                  activeAiButton={activeAiButton}
                />

                {/* Disease Analysis */}
                <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <DiseaseScreen ph={ph} tds={tds} turbidity={turbidity} />
                  <WeatherContaminationButton turbidity={turbidity} />
                </Box>
              </>
            )}

            {aiResponse && (
              <Box sx={{
                mt: 4,
                p: 3,
                bgcolor: isDark ? "rgba(55, 182, 246, 0.1)" : "rgba(21, 58, 234, 0.05)",
                borderRadius: 2,
                border: `2px solid ${currentTheme.palette.primary.main}`,
                borderColor: "primary.main"
              }}>
                <Box sx={{ 
                  fontSize: "1.5rem", 
                  fontWeight: "bold", 
                  mb: 2, 
                  color: "primary.main",
                  display: "flex", 
                  alignItems: "center",
                  gap: 1
                }}>
                  {activeAiButton === "prevention" ? "🛡️ AI Prevention Advice" : 
                   activeAiButton === "filtration" ? "💧 AI Filtration Solutions" : 
                   "💰 AI Cost Analysis"}
                </Box>
                <Box sx={{
                  p: 3,
                  bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "#f9fafb",
                  borderRadius: 2,
                  border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "#e5e7eb"}`,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.8,
                  color: "text.primary",
                  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
                  fontSize: "15px",
                  boxShadow: 1
                }}>
                  {aiResponse}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}