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
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { BarChart3, PieChart as PieChartIcon, Activity, TrendingUp } from "lucide-react";

const WaterCharts = ({ chartData, qualityData, COLORS }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border-2 border-blue-200">
          <p className="font-semibold text-gray-800 mb-2">{`Parameter: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
              {entry.dataKey === 'value' && label === 'TDS' && ' ppm'}
              {entry.dataKey === 'value' && label === 'Turbidity' && ' NTU'}
              {entry.dataKey === 'value' && label === 'Temperature' && '°C'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm font-medium text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Enhanced chart data with additional metrics
  const enhancedChartData = chartData.map(item => ({
    ...item,
    safetyScore: item.max ? ((item.max - Math.abs(item.value - (item.min || 0))) / item.max * 100) : 100
  }));

  return (
    <div className="space-y-8 mt-8">
      {/* Charts Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Water Quality Analytics
        </h2>
        <p className="text-gray-600">Comprehensive analysis of your water parameters</p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full mx-auto"></div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Enhanced Bar Chart */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Parameter Analysis
              </h3>
              <p className="text-gray-600 text-sm">Current values vs safe limits</p>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enhancedChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="currentValueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <linearGradient id="maxLimitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  <linearGradient id="minLimitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  stroke="#0369a1" 
                  fontWeight="600" 
                  fontSize={12}
                  tick={{ fill: '#0369a1' }}
                />
                <YAxis 
                  stroke="#0369a1" 
                  fontWeight="600" 
                  fontSize={12}
                  tick={{ fill: '#0369a1' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Bar 
                  dataKey="value" 
                  fill="url(#currentValueGradient)" 
                  name="Current Value" 
                  radius={[4, 4, 0, 0]}
                  stroke="#0284c7"
                  strokeWidth={1}
                />
                <Bar 
                  dataKey="max" 
                  fill="url(#maxLimitGradient)" 
                  name="Max Safe Limit" 
                  radius={[4, 4, 0, 0]}
                  stroke="#dc2626"
                  strokeWidth={1}
                />
                <Bar 
                  dataKey="min" 
                  fill="url(#minLimitGradient)" 
                  name="Min Safe Limit" 
                  radius={[4, 4, 0, 0]}
                  stroke="#16a34a"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced Pie Chart */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <PieChartIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quality Overview
              </h3>
              <p className="text-gray-600 text-sm">Overall water quality distribution</p>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {COLORS.map((color, index) => (
                    <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.8} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={3}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {qualityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#pieGradient${index % COLORS.length})`}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-xl shadow-xl border-2 border-purple-200">
                          <p className="font-semibold text-purple-800">
                            {payload[0].name}: {payload[0].value} parameters
                          </p>
                          <p className="text-sm text-gray-600">
                            {((payload[0].value / qualityData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Analytics Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Safety Score Chart */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Safety Scores
              </h3>
              <p className="text-gray-600 text-sm">Parameter safety assessment</p>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enhancedChartData}>
                <defs>
                  <linearGradient id="safetyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#059669" fontSize={12} />
                <YAxis stroke="#059669" fontSize={12} />
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-xl shadow-xl border-2 border-emerald-200">
                          <p className="font-semibold text-emerald-800">{label} Safety Score</p>
                          <p className="text-emerald-600">{payload[0].value.toFixed(1)}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="safetyScore"
                  stroke="#059669"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#safetyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quality Metrics Summary */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Quality Metrics
              </h3>
              <p className="text-gray-600 text-sm">Key performance indicators</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {enhancedChartData.map((item, index) => (
              <div key={item.name} className="bg-white p-4 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">{item.name}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    item.safetyScore > 80 ? 'bg-green-500' :
                    item.safetyScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {item.safetyScore.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">Safety Score</div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      item.safetyScore > 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      item.safetyScore > 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${item.safetyScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterCharts;