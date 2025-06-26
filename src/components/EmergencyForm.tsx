import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  MapPin,
  Phone,
  User,
  FileText,
  Clock,
  Navigation,
  Send,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { getCurrentLocation, reverseGeocode } from "../utils/geolocation";
import { HelpRequest } from "../types";

export function EmergencyForm() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "medical" as HelpRequest["type"],
    urgency: "high" as HelpRequest["urgency"],
    title: "",
    description: "",
    requesterName: "",
    requesterContact: "",
    location: state.userLocation || null,
    useCurrentLocation: true,
    manualAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (state.userLocation) {
      setFormData((prev) => ({ ...prev, location: state.userLocation }));
    }
  }, [state.userLocation]);

  const handleGetLocation = async () => {
    setLocationLoading(true);
    try {
      const location = await getCurrentLocation();
      const address = await reverseGeocode(location);
      const locationWithAddress = { ...location, address };

      dispatch({ type: "SET_USER_LOCATION", payload: locationWithAddress });
      setFormData((prev) => ({ ...prev, location: locationWithAddress }));
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.location) {
      alert("Please provide your location");
      return;
    }

    setIsSubmitting(true);

    const newRequest: HelpRequest = {
      id: Date.now().toString(),
      type: formData.type,
      urgency: formData.urgency,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      requesterName: formData.requesterName,
      requesterContact: formData.requesterContact,
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: "ADD_HELP_REQUEST", payload: newRequest });

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/map", { state: { newRequestId: newRequest.id } });
    }, 1000);
  };

  const requestTypes = [
    {
      value: "medical",
      label: "Medical Emergency",
      icon: "🏥",
      color: "text-red-600",
    },
    {
      value: "food",
      label: "Food & Water",
      icon: "🍽️",
      color: "text-orange-600",
    },
    { value: "shelter", label: "Shelter", icon: "🏠", color: "text-blue-600" },
    {
      value: "evacuation",
      label: "Evacuation",
      icon: "🚨",
      color: "text-purple-600",
    },
    {
      value: "supplies",
      label: "Supplies",
      icon: "📦",
      color: "text-green-600",
    },
    { value: "other", label: "Other", icon: "❓", color: "text-gray-600" },
  ];

  const urgencyLevels = [
    {
      value: "critical",
      label: "Critical",
      color: "bg-red-500 text-white",
      description: "Life-threatening emergency",
    },
    {
      value: "high",
      label: "High",
      color: "bg-orange-500 text-white",
      description: "Urgent assistance needed",
    },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-500 text-white",
      description: "Important but not urgent",
    },
    {
      value: "low",
      label: "Low",
      color: "bg-green-500 text-white",
      description: "Non-urgent assistance",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div
          className={`rounded-xl shadow-xl p-8 glow-red ${
            state.theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">
              Emergency Request
            </h1>
            <p
              className={`text-lg ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Fill out this form to request immediate assistance
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Request Type */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Type of Emergency
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {requestTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        type: type.value as HelpRequest["type"],
                      }))
                    }
                    className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                      formData.type === type.value
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : state.theme === "dark"
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className={`text-sm font-medium ${type.color}`}>
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Urgency Level
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {urgencyLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        urgency: level.value as HelpRequest["urgency"],
                      }))
                    }
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      formData.urgency === level.value
                        ? level.color
                        : state.theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <div className="font-medium">{level.label}</div>
                    <div className="text-xs mt-1 opacity-80">
                      {level.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Brief Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Medical assistance needed"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  state.theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Detailed Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Please provide as much detail as possible about your situation..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  state.theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    value={formData.requesterName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        requesterName: e.target.value,
                      }))
                    }
                    placeholder="Full name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      state.theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium mb-2"
                >
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="contact"
                    value={formData.requesterContact}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        requesterContact: e.target.value,
                      }))
                    }
                    placeholder="Phone number"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      state.theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-3">Location</label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                  className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-red-500 transition-colors"
                >
                  <Navigation
                    className={`h-5 w-5 ${
                      locationLoading ? "animate-spin" : ""
                    }`}
                  />
                  <span>
                    {locationLoading
                      ? "Getting location..."
                      : "Use Current Location"}
                  </span>
                </button>

                {formData.location && (
                  <div
                    className={`p-3 rounded-lg ${
                      state.theme === "dark" ? "bg-gray-700" : "bg-green-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Location confirmed
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {formData.location.address ||
                        `${formData.location.lat.toFixed(
                          4
                        )}, ${formData.location.lng.toFixed(4)}`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.location}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending Request...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Emergency Request</span>
                </>
              )}
            </button>
          </form>

          {/* Emergency Contacts */}
          <div
            className={`mt-8 p-4 rounded-lg ${
              state.theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <h3 className="font-semibold mb-2">Emergency Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div>
                Police: <strong>911</strong>
              </div>
              <div>
                Fire: <strong>911</strong>
              </div>
              <div>
                Medical: <strong>911</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
