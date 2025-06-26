import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FixedLogo } from "./FixedLogo";
import { useApp } from "../contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export function Layout() {
  const { state } = useApp();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        state.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Fixed Logo */}
      <FixedLogo />

      {/* Offline indicator - positioned to avoid overlap with logo */}
      <AnimatePresence>
        {state.isOffline && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-24 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg"
            style={{ zIndex: 999998 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Offline Mode</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
