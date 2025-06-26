import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Heart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { motion } from "framer-motion";

export function AnalyticsPage() {
  const { state } = useApp();
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("requests");

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRequests: 1247,
      activeVolunteers: 342,
      responseTime: 8.5,
      resolutionRate: 94.2,
      requestsChange: 12.5,
      volunteersChange: 8.3,
      responseTimeChange: -15.2,
      resolutionRateChange: 2.1,
    },
    requestsByType: [
      { type: "Medical", count: 456, percentage: 36.6, color: "bg-red-500" },
      {
        type: "Food & Water",
        count: 312,
        percentage: 25.0,
        color: "bg-orange-500",
      },
      { type: "Shelter", count: 234, percentage: 18.8, color: "bg-blue-500" },
      {
        type: "Evacuation",
        count: 156,
        percentage: 12.5,
        color: "bg-purple-500",
      },
      { type: "Supplies", count: 89, percentage: 7.1, color: "bg-green-500" },
    ],
    requestsByUrgency: [
      { urgency: "Critical", count: 89, percentage: 7.1, color: "bg-red-600" },
      { urgency: "High", count: 234, percentage: 18.8, color: "bg-orange-500" },
      {
        urgency: "Medium",
        count: 567,
        percentage: 45.5,
        color: "bg-yellow-500",
      },
      { urgency: "Low", count: 357, percentage: 28.6, color: "bg-green-500" },
    ],
    responseTimesByHour: [
      { hour: "00:00", time: 12.3 },
      { hour: "04:00", time: 15.7 },
      { hour: "08:00", time: 6.2 },
      { hour: "12:00", time: 4.8 },
      { hour: "16:00", time: 5.9 },
      { hour: "20:00", time: 8.1 },
    ],
    topVolunteers: [
      { name: "Sarah Johnson", requests: 47, rating: 4.9, hours: 156 },
      { name: "Mike Chen", requests: 42, rating: 4.8, hours: 142 },
      { name: "Lisa Rodriguez", requests: 38, rating: 4.9, hours: 134 },
      { name: "David Kim", requests: 35, rating: 4.7, hours: 128 },
      { name: "Emma Wilson", requests: 33, rating: 4.8, hours: 121 },
    ],
    geographicData: [
      { area: "Downtown", requests: 234, volunteers: 67 },
      { area: "North District", requests: 189, volunteers: 52 },
      { area: "East Side", requests: 156, volunteers: 43 },
      { area: "West End", requests: 134, volunteers: 38 },
      { area: "South Bay", requests: 98, volunteers: 29 },
    ],
  };

  const timeRanges = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
  ];

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return "↗";
    if (change < 0) return "↘";
    return "→";
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full"
              >
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
            </div>
            <p
              className={`text-lg ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Monitor platform performance and volunteer impact
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                state.theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Download className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              label: "Total Requests",
              value: analyticsData.overview.totalRequests.toLocaleString(),
              change: analyticsData.overview.requestsChange,
              icon: AlertTriangle,
              color: "text-red-500",
              bgColor: "bg-red-100 dark:bg-red-900/20",
            },
            {
              label: "Active Volunteers",
              value: analyticsData.overview.activeVolunteers.toLocaleString(),
              change: analyticsData.overview.volunteersChange,
              icon: Users,
              color: "text-green-500",
              bgColor: "bg-green-100 dark:bg-green-900/20",
            },
            {
              label: "Avg Response Time",
              value: `${analyticsData.overview.responseTime} min`,
              change: analyticsData.overview.responseTimeChange,
              icon: Clock,
              color: "text-blue-500",
              bgColor: "bg-blue-100 dark:bg-blue-900/20",
            },
            {
              label: "Resolution Rate",
              value: `${analyticsData.overview.resolutionRate}%`,
              change: analyticsData.overview.resolutionRateChange,
              icon: CheckCircle,
              color: "text-purple-500",
              bgColor: "bg-purple-100 dark:bg-purple-900/20",
            },
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-xl shadow-lg glow-purple ${
                  state.theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div
                    className={`text-sm font-medium ${getChangeColor(
                      metric.change
                    )}`}
                  >
                    {getChangeIcon(metric.change)} {Math.abs(metric.change)}%
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Requests by Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`p-6 rounded-xl shadow-lg glow-blue ${
              state.theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Requests by Type
            </h3>
            <div className="space-y-3">
              {analyticsData.requestsByType.map((item, index) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {item.percentage}%
                    </span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Requests by Urgency */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`p-6 rounded-xl shadow-lg glow-red ${
              state.theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              Requests by Urgency
            </h3>
            <div className="space-y-3">
              {analyticsData.requestsByUrgency.map((item, index) => (
                <motion.div
                  key={item.urgency}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="font-medium">{item.urgency}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {item.percentage}%
                    </span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`p-6 rounded-xl shadow-lg mb-8 glow-green ${
            state.theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-green-500" />
            Geographic Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {analyticsData.geographicData.map((area, index) => (
              <motion.div
                key={area.area}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg border ${
                  state.theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h4 className="font-semibold mb-2">{area.area}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Requests:</span>
                    <span className="font-medium">{area.requests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Volunteers:</span>
                    <span className="font-medium">{area.volunteers}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Volunteers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`p-6 rounded-xl shadow-lg glow-orange ${
            state.theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            Top Volunteers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${
                    state.theme === "dark"
                      ? "border-gray-700"
                      : "border-gray-200"
                  }`}
                >
                  <th className="text-left py-2">Volunteer</th>
                  <th className="text-left py-2">Requests</th>
                  <th className="text-left py-2">Rating</th>
                  <th className="text-left py-2">Hours</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topVolunteers.map((volunteer, index) => (
                  <motion.tr
                    key={volunteer.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`border-b ${
                      state.theme === "dark"
                        ? "border-gray-700"
                        : "border-gray-200"
                    }`}
                  >
                    <td className="py-3 font-medium">{volunteer.name}</td>
                    <td className="py-3">{volunteer.requests}</td>
                    <td className="py-3">
                      <div className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{volunteer.rating}</span>
                      </div>
                    </td>
                    <td className="py-3">{volunteer.hours}h</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
