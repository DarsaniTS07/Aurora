import React from "react";
import { Shield, Droplets, Wallet, Loader2, Zap, Brain, TrendingUp } from "lucide-react";

const AiButtons = ({ handleAiRequest, isLoading, activeAiButton }) => {
  const buttons = [
    { 
      type: "prevention", 
      color: "from-green-500 to-emerald-600", 
      label: "AI Prevention", 
      icon: <Shield size={20} />,
      hoverColor: "hover:shadow-green-500/25",
      description: "Smart prevention strategies",
      secondaryIcon: <Zap size={16} />
    },
    { 
      type: "filtration", 
      color: "from-blue-500 to-cyan-600", 
      label: "AI Filtration", 
      icon: <Droplets size={20} />,
      hoverColor: "hover:shadow-blue-500/25",
      description: "Optimal filtration solutions",
      secondaryIcon: <Brain size={16} />
    },
    { 
      type: "cost", 
      color: "from-amber-500 to-orange-600", 
      label: "AI Cost Analysis", 
      icon: <Wallet size={20} />,
      hoverColor: "hover:shadow-amber-500/25",
      description: "Smart budget planning",
      secondaryIcon: <TrendingUp size={16} />
    },
  ];

  return (
    <div className="mt-8 space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
          AI-Powered Analysis
        </h3>
        <p className="text-gray-600 text-lg">Get intelligent insights for your water quality needs</p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
      </div>

      {/* AI Buttons Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {buttons.map((btn, index) => (
          <button
            key={btn.type}
            onClick={() => handleAiRequest(btn.type)}
            disabled={isLoading}
            className={`group relative overflow-hidden bg-gradient-to-br ${btn.color} text-white p-6 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 ${btn.hoverColor} hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            
            {/* Content */}
            <div className="relative z-10 space-y-4">
              {/* Icon Section */}
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                  {isLoading && activeAiButton === btn.type ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <div className="group-hover:animate-pulse">
                      {btn.icon}
                    </div>
                  )}
                </div>
                <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {btn.secondaryIcon}
                </div>
              </div>

              {/* Text Section */}
              <div className="text-left space-y-2">
                <h4 className="text-lg font-bold group-hover:text-white/90 transition-colors duration-300">
                  {isLoading && activeAiButton === btn.type ? "Analyzing..." : btn.label}
                </h4>
                <p className="text-white/80 text-sm group-hover:text-white/70 transition-colors duration-300">
                  {btn.description}
                </p>
              </div>

              {/* Progress Indicator */}
              {isLoading && activeAiButton === btn.type && (
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-white/40 animate-pulse"></div>
                </div>
              )}

              {/* Hover State Indicator */}
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>

            {/* Loading State Overlay */}
            {isLoading && activeAiButton === btn.type && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                  <div className="text-sm font-medium opacity-90">Processing...</div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* AI Status Indicator */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          isLoading ? 'bg-orange-500 animate-pulse' : 'bg-green-500'
        }`}></div>
        <span>
          {isLoading ? 'AI Analysis in Progress...' : 'AI Ready for Analysis'}
        </span>
      </div>
    </div>
  );
};

export default AiButtons;