import React, { useEffect, useState } from "react";
import {
  Shield,
  AlertTriangle,
  Cloud,
  Thermometer,
  Wind,
  Eye,
  Phone,
  Heart,
  Home,
  Zap,
  Waves,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { getWeatherAlerts, getCurrentWeather } from "../utils/weather";

export function SafetyPage() {
  const { state, dispatch } = useApp();
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if (state.userLocation) {
      // Fetch weather alerts
      getWeatherAlerts(state.userLocation.lat, state.userLocation.lng).then(
        (alerts) => {
          dispatch({ type: "SET_WEATHER_ALERTS", payload: alerts });
        }
      );

      // Fetch current weather
      getCurrentWeather(state.userLocation.lat, state.userLocation.lng).then(
        setWeather
      );
    }
  }, [state.userLocation, dispatch]);

  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "911",
      description: "Police, Fire, Medical",
    },
    {
      name: "Red Cross",
      number: "1-800-733-2767",
      description: "Disaster Relief",
    },
    {
      name: "FEMA",
      number: "1-800-621-3362",
      description: "Federal Emergency Management",
    },
    {
      name: "Poison Control",
      number: "1-800-222-1222",
      description: "24/7 Poison Help",
    },
  ];

  const disasterTypes = [
    {
      type: "flood",
      icon: Waves,
      title: "Flood Safety",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      tips: [
        "Never drive through flooded roads - Turn around, don't drown",
        "Stay away from downed power lines and electrical wires",
        "Listen to local emergency broadcasts for evacuation orders",
        "Move to higher ground immediately if flash flooding occurs",
        "Avoid walking in moving water - 6 inches can knock you down",
      ],
    },
    {
      type: "fire",
      icon: Zap,
      title: "Wildfire Safety",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      tips: [
        "Create defensible space around your home (30+ feet)",
        "Keep important documents in a fireproof safe",
        "Have multiple evacuation routes planned",
        "Clear gutters and roof of debris regularly",
        "Install smoke detectors and check batteries monthly",
      ],
    },
    {
      type: "earthquake",
      icon: Home,
      title: "Earthquake Safety",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      tips: [
        "Drop, Cover, and Hold On during shaking",
        "Stay away from glass, windows, and heavy objects",
        "If outdoors, move away from buildings and power lines",
        "Keep emergency supplies for 72 hours minimum",
        "Secure heavy furniture and appliances to walls",
      ],
    },
    {
      type: "general",
      icon: Shield,
      title: "General Preparedness",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      tips: [
        "Create a family emergency plan and practice it",
        "Build an emergency kit with supplies for 72 hours",
        "Stay informed through weather radios and alerts",
        "Know your evacuation routes and meeting points",
        "Keep important documents in waterproof containers",
      ],
    },
  ];

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "bg-red-500 text-white";
      case "moderate":
        return "bg-orange-500 text-white";
      case "minor":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Shield className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Safety Resources</h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              state.theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Stay informed and prepared with real-time alerts, weather updates,
            and safety tips
          </p>
        </div>

        {/* Weather Alerts */}
        {state.weatherAlerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-red-500" />
              Active Weather Alerts
            </h2>
            <div className="grid gap-4">
              {state.weatherAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === "severe"
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : alert.severity === "moderate"
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                      : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.type.toUpperCase()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {alert.title}
                      </h3>
                      <p
                        className={`${
                          state.theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-700"
                        }`}
                      >
                        {alert.description}
                      </p>
                    </div>
                    <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Weather */}
        {weather && (
          <div
            className={`mb-8 p-6 rounded-xl shadow-lg glow-blue ${
              state.theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Cloud className="h-6 w-6 mr-2 text-blue-500" />
              Current Weather
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div
                    className={`p-3 rounded-full ${
                      state.theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <Thermometer className="h-6 w-6 text-red-500" />
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {weather.temperature}°F
                </div>
                <div className="text-sm text-gray-500">Temperature</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div
                    className={`p-3 rounded-full ${
                      state.theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <Wind className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {weather.windSpeed} mph
                </div>
                <div className="text-sm text-gray-500">Wind Speed</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div
                    className={`p-3 rounded-full ${
                      state.theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <Eye className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {weather.visibility} mi
                </div>
                <div className="text-sm text-gray-500">Visibility</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div
                    className={`p-3 rounded-full ${
                      state.theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <Cloud className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{weather.humidity}%</div>
                <div className="text-sm text-gray-500">Humidity</div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Phone className="h-6 w-6 mr-2 text-red-500" />
            Emergency Contacts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-lg ${
                  state.theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                    <Phone className="h-4 w-4 text-red-500" />
                  </div>
                  <h3 className="font-semibold">{contact.name}</h3>
                </div>
                <div className="text-xl font-bold text-red-500 mb-1">
                  {contact.number}
                </div>
                <p
                  className={`text-sm ${
                    state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {contact.description}
                </p>
                <a
                  href={`tel:${contact.number}`}
                  className="mt-2 inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Call Now
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips by Disaster Type */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-green-500" />
            Safety Tips by Disaster Type
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {disasterTypes.map((disaster, index) => {
              const Icon = disaster.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-lg glow-red ${
                    state.theme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-full ${disaster.bgColor}`}>
                      <Icon className={`h-6 w-6 ${disaster.color}`} />
                    </div>
                    <h3 className="text-xl font-bold">{disaster.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {disaster.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span
                          className={`text-sm ${
                            state.theme === "dark"
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
