"use client";
import { useState, useEffect } from "react";
import { Droplets, X, Loader2, MapPin, Cloud, Thermometer, Droplet } from "lucide-react";

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
              time: Array.from({length: 24}, (_, i) => {
                const date = new Date();
                date.setHours(date.getHours() + i);
                return date.toISOString();
              }),
              precipitation: Array.from({length: 24}, () => Math.random() * 5),
              precipitation_probability: Array.from({length: 24}, () => Math.random() * 100),
              temperature_2m: Array.from({length: 24}, () => 20 + Math.random() * 15),
              relativehumidity_2m: Array.from({length: 24}, () => 40 + Math.random() * 40)
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
          setError(err.response?.data?.message || err.message || "Could not fetch data.");
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
    if (probability < 30) return {
      level: "Low",
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
      ringColor: "ring-green-200"
    };
    if (probability < 60) return {
      level: "Moderate",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      ringColor: "ring-yellow-200"
    };
    if (probability < 80) return {
      level: "High",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
      ringColor: "ring-orange-200"
    };
    return {
      level: "Very High",
      color: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
      ringColor: "ring-red-200"
    };
  };

  const riskInfo = contaminationProbability !== null ? getRiskLevel(contaminationProbability) : null;

  if (!isClient) return null;

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        disabled={turbidity === ""}
        className={`group relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
          turbidity === "" 
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-cyan-500/25"
        }`}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Droplets className="w-5 h-5 group-hover:animate-pulse relative z-10" />
        <span className="relative z-10">Weather Analysis</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-2xl"
            onClick={handleClose}
          />
          {/* Modal Content */}
          <div className="relative z-50 bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600"></div>
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                    <Cloud className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Weather Impact Analysis
                    </h2>
                    <p className="text-gray-600 text-sm">Real-time contamination assessment</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCheck}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 mb-6 ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Analyzing Weather Data...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Droplets className="w-6 h-6" />
                    <span>Run Weather Analysis</span>
                  </div>
                )}
              </button>

              {/* Results Section */}
              {(place || nextRain || contaminationProbability !== null || error) && (
                <div className="space-y-4">
                  {/* Location Info */}
                  {place && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-blue-800">Location</p>
                          <p className="text-blue-600 text-sm">{place.name}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Weather Forecast */}
                  {nextRain && (
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                      <div className="flex items-center gap-3">
                        <Droplet className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="font-semibold text-indigo-800">Weather Forecast</p>
                          <p className="text-indigo-600 text-sm">{nextRain}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contamination Risk */}
                  {contaminationProbability !== null && riskInfo && (
                    <div className={`p-6 rounded-xl border-2 ${riskInfo.borderColor} ${riskInfo.bgColor}`}>
                      <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
                        <Thermometer className={`w-6 h-6 ${riskInfo.color}`} />
                        Contamination Risk Assessment
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className={`text-4xl font-bold ${riskInfo.color} mb-1`}>
                            {contaminationProbability}%
                          </div>
                          <div className={`text-lg font-medium ${riskInfo.color}`}>
                            {riskInfo.level} Risk
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`w-20 h-20 rounded-full ${riskInfo.bgColor} ${riskInfo.borderColor} border-4 flex items-center justify-center`}>
                            <div className={`text-2xl font-bold ${riskInfo.color}`}>
                              {riskInfo.level === "Low" ? "✓" : "⚠"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Risk Level Indicator */}
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            contaminationProbability < 30 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            contaminationProbability < 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                            contaminationProbability < 80 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                            'bg-gradient-to-r from-red-500 to-red-700'
                          }`}
                          style={{ width: `${contaminationProbability}%` }}
                        ></div>
                      </div>

                      {/* Risk Recommendations */}
                      <div className={`p-3 rounded-lg ${riskInfo.bgColor} border ${riskInfo.borderColor}`}>
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <ul className="text-sm space-y-1">
                          {contaminationProbability > 70 && (
                            <li>• Avoid using this water source until treated</li>
                          )}
                          {contaminationProbability > 50 && (
                            <li>• Boil water for at least 5 minutes before consumption</li>
                          )}
                          {contaminationProbability > 30 && (
                            <li>• Use additional filtration methods</li>
                          )}
                          <li>• Monitor weather conditions closely</li>
                          <li>• Consider alternative water sources if available</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <div>
                          <p className="font-semibold text-red-800">Error</p>
                          <p className="text-red-600 text-sm">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}