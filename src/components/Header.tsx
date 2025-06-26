import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Heart,
  Moon,
  Sun,
  Shield,
  MapPin,
  Users,
  AlertTriangle,
  GraduationCap,
  BarChart3,
  Info,
  Mail,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { motion } from "framer-motion";

export function Header() {
  const { state, dispatch } = useApp();
  const location = useLocation();

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "light" ? "dark" : "light",
    });
  };

  const navItems = [
    { path: "/", label: "Home", icon: Heart },
    { path: "/map", label: "Map", icon: MapPin },
    { path: "/volunteer", label: "Volunteer", icon: Users },
    { path: "/training", label: "Training", icon: GraduationCap },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/safety", label: "Safety", icon: Shield },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        state.theme === "dark"
          ? "bg-gray-800/95 border-gray-700"
          : "bg-white/95 border-gray-200"
      } backdrop-blur-sm border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <Heart className="h-8 w-8 text-red-500 transition-transform" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              ></motion.div>
            </motion.div>
            <div className="font-bold text-xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              HelpHub
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-red-500 text-white shadow-lg"
                        : state.theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Weather alert indicator */}
            {state.weatherAlerts.length > 0 && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="relative"
              >
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {state.weatherAlerts.length}
                </div>
              </motion.div>
            )}

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                state.theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ rotate: state.theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {state.theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.div>
            </motion.button>

            {/* Emergency button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/emergency"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Emergency</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around py-2 overflow-x-auto">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div key={item.path} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 min-w-0 ${
                    isActive
                      ? "text-red-500"
                      : state.theme === "dark"
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-xs font-medium truncate">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}
