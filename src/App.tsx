import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { Layout } from "./components/Layout";
import { LandingPage } from "./components/LandingPage";
import { MapView } from "./components/MapView";
import { EmergencyForm } from "./components/EmergencyForm";
import { VolunteerDashboard } from "./components/VolunteerDashboard";
import { SafetyPage } from "./components/SafetyPage";
import { TrainingPage } from "./components/TrainingPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="map" element={<MapView />} />
            <Route path="emergency" element={<EmergencyForm />} />
            <Route path="volunteer" element={<VolunteerDashboard />} />
            <Route path="safety" element={<SafetyPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
