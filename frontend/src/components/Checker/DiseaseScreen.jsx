import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, Loader2, X, Activity, TrendingUp } from "lucide-react";

const DiseaseScreen = ({ ph, tds, turbidity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fetchPrediction = async () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const mockResult = {
        predicted_risk: getRiskLevel(ph, tds, turbidity),
        advice: generateAdvice(ph, tds, turbidity),
        confidence_scores: {
          bacterial_contamination: Math.min(0.95, turbidity * 0.3 + (tds > 500 ? 0.4 : 0.1)),
          chemical_pollutants: Math.min(0.9, Math.abs(ph - 7) * 0.2 + tds / 1000),
          heavy_metals: Math.min(0.85, tds > 300 ? tds / 1000 : 0.1),
          parasites: Math.min(0.8, turbidity * 0.25),
          viral_contamination: Math.min(0.75, turbidity * 0.2 + (ph < 6.5 || ph > 8.5 ? 0.3 : 0.1))
        },
        input: { pH: ph, tds, turbidity },
        recommendations: generateRecommendations(ph, tds, turbidity)
      };
      setResult(mockResult);
      setLoading(false);
    }, 2500);
  };

  const getRiskLevel = (ph, tds, turbidity) => {
    let riskScore = 0;

    if (ph < 6.5 || ph > 8.5) riskScore += 2;
    if (tds > 500) riskScore += 3;
    else if (tds > 300) riskScore += 1;
    if (turbidity > 5) riskScore += 3;
    else if (turbidity > 1) riskScore += 1;

    if (riskScore >= 5) return "High Risk";
    if (riskScore >= 2) return "Moderate Risk";
    return "Low Risk";
  };

  const generateAdvice = (ph, tds, turbidity) => {
    const issues = [];
    if (ph < 6.5) issues.push("acidic pH levels");
    if (ph > 8.5) issues.push("alkaline pH levels");
    if (tds > 500) issues.push("high dissolved solids");
    if (turbidity > 5) issues.push("high turbidity");

    if (issues.length === 0) {
      return "Water quality parameters are within safe ranges. Continue regular monitoring and maintain proper storage practices.";
    }

    return `Water shows ${issues.join(", ")}. Recommend immediate filtration and treatment before consumption. Consider professional water testing for comprehensive analysis.`;
  };

  const generateRecommendations = (ph, tds, turbidity) => {
    const recommendations = [];
    if (ph < 6.5 || ph > 8.5) {
      recommendations.push({
        type: "pH Treatment",
        action: "Use pH adjustment filters or neutralizing agents",
        priority: "High"
      });
    }

    if (tds > 300) {
      recommendations.push({
        type: "TDS Reduction",
        action: "Install RO filtration system",
        priority: tds > 500 ? "Critical" : "Medium"
      });
    }

    if (turbidity > 1) {
      recommendations.push({
        type: "Turbidity Treatment",
        action: "Use sediment filtration and coagulation",
        priority: turbidity > 5 ? "Critical" : "Medium"
      });
    }

    recommendations.push({
      type: "Disinfection",
      action: "UV sterilization or boiling",
      priority: "Standard"
    });

    return recommendations;
  };

  const handleOpen = () => {
    setIsOpen(true);
    fetchPrediction();
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = ""; // Restore background scroll
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-300";
      case "High": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default: return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getRiskColor = (risk) => {
    if (risk === "High Risk") return "bg-red-100 text-red-800 border-red-400";
    if (risk === "Moderate Risk") return "bg-orange-100 text-orange-800 border-orange-400";
    return "bg-green-100 text-green-800 border-green-400";
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="group relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-teal-500/25"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <ShieldCheck className="w-5 h-5 group-hover:animate-pulse relative z-10" />
        <span className="relative z-10">Health Risk Analysis</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
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
          <div className="relative z-50 bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Gradient Header */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"></div>
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                    <ShieldCheck className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Water Health Analysis
                    </h2>
                    <p className="text-gray-600 text-sm">Advanced disease risk assessment</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Loading State */}
              {loading && (
                <div className="flex flex-col items-center py-16">
                  <div className="relative mb-6">
                    <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
                    <div className="absolute inset-0 w-12 h-12 border-4 border-emerald-200 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-600 mb-2">Analyzing Health Risks</h3>
                  <p className="text-gray-500 text-center mb-4">Processing water quality parameters...</p>
                  <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
                  </div>
                </div>
              )}

              {/* Results */}
              {!loading && result && (
                <div className="space-y-6">
                  {/* Risk Level Alert */}
                  <div className={`p-4 rounded-xl border-2 ${getRiskColor(result.predicted_risk)}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className="w-6 h-6" />
                      <h3 className="font-bold text-lg">Risk Assessment</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{result.predicted_risk}</span>
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Advisory */}
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-amber-800 mb-2">Health Advisory</h4>
                        <p className="text-amber-700 leading-relaxed">{result.advice}</p>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Scores */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded"></div>
                      Risk Confidence Analysis
                    </h3>
                    <div className="grid gap-3">
                      {Object.entries(result.confidence_scores).map(([key, value]) => (
                        <div key={key} className="p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-700 capitalize">
                              {key.replace(/_/g, " ")}
                            </span>
                            <span className="font-bold text-gray-900 text-lg">
                              {(value * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                value > 0.7 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                value > 0.4 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                'bg-gradient-to-r from-green-500 to-emerald-500'
                              }`}
                              style={{ width: `${value * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded"></div>
                      Treatment Recommendations
                    </h3>
                    <div className="grid gap-3">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{rec.type}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                              {rec.priority}
                            </span>
                          </div>
                          <p className="text-gray-600">{rec.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input Parameters */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
                    <h3 className="font-bold text-gray-800 mb-3">Analyzed Parameters</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "pH Level", value: result.input.pH, unit: "", optimal: "6.5-8.5" },
                        { label: "TDS", value: result.input.tds, unit: " ppm", optimal: "<500" },
                        { label: "Turbidity", value: result.input.turbidity, unit: " NTU", optimal: "<5" }
                      ].map((param) => (
                        <div key={param.label} className="bg-white p-3 rounded-xl text-center shadow-sm border border-blue-100">
                          <div className="font-semibold text-gray-700 text-sm mb-1">{param.label}</div>
                          <div className="text-xl font-bold text-blue-600 mb-1">
                            {param.value}{param.unit}
                          </div>
                          <div className="text-xs text-gray-500">
                            Optimal: {param.optimal}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiseaseScreen;