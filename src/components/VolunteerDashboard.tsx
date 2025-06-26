import React, { useState, useEffect } from "react";
import {
  Users,
  MapPin,
  Clock,
  Filter,
  Star,
  CheckCircle,
  AlertTriangle,
  Phone,
  Navigation,
  Heart,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { getCurrentLocation, calculateDistance } from "../utils/geolocation";
import { HelpRequest } from "../types";
import { formatDistance } from "date-fns";

export function VolunteerDashboard() {
  const { state, dispatch } = useApp();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "open" | "accepted" | "nearby"
  >("all");
  const [sortBy, setSortBy] = useState<"urgency" | "distance" | "time">(
    "urgency"
  );
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(
    null
  );

  useEffect(() => {
    if (!state.userLocation) {
      getCurrentLocation()
        .then((location) => {
          dispatch({ type: "SET_USER_LOCATION", payload: location });
        })
        .catch((error) => {
          console.log("Location access denied");
        });
    }
  }, [state.userLocation, dispatch]);

  const filteredRequests = state.helpRequests.filter((request) => {
    switch (activeFilter) {
      case "open":
        return request.status === "open";
      case "accepted":
        return request.status === "accepted" || request.status === "en-route";
      case "nearby":
        if (!state.userLocation) return false;
        const distance = calculateDistance(
          state.userLocation,
          request.location
        );
        return distance <= 10; // Within 10km
      default:
        return true;
    }
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case "urgency":
        const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      case "distance":
        if (!state.userLocation) return 0;
        const distanceA = calculateDistance(state.userLocation, a.location);
        const distanceB = calculateDistance(state.userLocation, b.location);
        return distanceA - distanceB;
      case "time":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  const handleAcceptRequest = (request: HelpRequest) => {
    const updatedRequest = {
      ...request,
      status: "accepted" as const,
      volunteerId: "volunteer-123", // In real app, this would be current user's ID
      volunteerName: "John Volunteer",
      updatedAt: new Date(),
    };
    dispatch({ type: "UPDATE_HELP_REQUEST", payload: updatedRequest });
    setSelectedRequest(null);
  };

  const handleUpdateStatus = (
    request: HelpRequest,
    newStatus: HelpRequest["status"]
  ) => {
    const updatedRequest = {
      ...request,
      status: newStatus,
      updatedAt: new Date(),
    };
    dispatch({ type: "UPDATE_HELP_REQUEST", payload: updatedRequest });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-red-600";
      case "accepted":
        return "text-blue-600";
      case "en-route":
        return "text-orange-600";
      case "resolved":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medical":
        return "🏥";
      case "food":
        return "🍽️";
      case "shelter":
        return "🏠";
      case "evacuation":
        return "🚨";
      case "supplies":
        return "📦";
      default:
        return "❓";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Volunteer Dashboard</h1>
              <p
                className={`text-lg ${
                  state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Help those in need in your community
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div
              className={`p-4 rounded-lg ${
                state.theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Requests</p>
                  <p className="text-2xl font-bold text-red-500">
                    {
                      state.helpRequests.filter((r) => r.status === "open")
                        .length
                    }
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                state.theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {
                      state.helpRequests.filter(
                        (r) =>
                          r.status === "accepted" || r.status === "en-route"
                      ).length
                    }
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                state.theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Resolved</p>
                  <p className="text-2xl font-bold text-green-500">
                    {
                      state.helpRequests.filter((r) => r.status === "resolved")
                        .length
                    }
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                state.theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Your Impact</p>
                  <p className="text-2xl font-bold text-purple-500">47</p>
                </div>
                <Heart className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All Requests" },
              { key: "open", label: "Open" },
              { key: "accepted", label: "Accepted" },
              { key: "nearby", label: "Nearby" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() =>
                  setActiveFilter(filter.key as typeof activeFilter)
                }
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === filter.key
                    ? "bg-green-500 text-white"
                    : state.theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className={`px-3 py-2 rounded-lg border ${
                state.theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="urgency">Sort by Urgency</option>
              <option value="distance">Sort by Distance</option>
              <option value="time">Sort by Time</option>
            </select>
          </div>
        </div>

        {/* Requests List */}
        <div className="grid gap-4">
          {sortedRequests.map((request) => (
            <div
              key={request.id}
              className={`p-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl glow-orange ${
                state.theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-3xl">{getTypeIcon(request.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">
                          {request.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(
                            request.urgency
                          )}`}
                        >
                          {request.urgency}
                        </span>
                      </div>
                      <p
                        className={`mb-3 ${
                          state.theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        {request.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{request.requesterName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{request.requesterContact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>
                            {state.userLocation
                              ? `${calculateDistance(
                                  state.userLocation,
                                  request.location
                                ).toFixed(1)} km away`
                              : "Location unknown"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className={getStatusColor(request.status)}>
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 lg:ml-6">
                  {request.status === "open" && (
                    <button
                      onClick={() => handleAcceptRequest(request)}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Accept</span>
                    </button>
                  )}

                  {request.status === "accepted" && (
                    <button
                      onClick={() => handleUpdateStatus(request, "en-route")}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>En Route</span>
                    </button>
                  )}

                  {request.status === "en-route" && (
                    <button
                      onClick={() => handleUpdateStatus(request, "resolved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Star className="h-4 w-4" />
                      <span>Complete</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedRequest(request)}
                    className={`border-2 border-gray-300 hover:border-green-500 px-6 py-2 rounded-lg font-medium transition-colors ${
                      state.theme === "dark"
                        ? "text-gray-300 hover:text-green-500"
                        : "text-gray-700 hover:text-green-500"
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedRequests.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No requests found</h3>
            <p
              className={`${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {activeFilter === "all"
                ? "No help requests at the moment. Check back later!"
                : `No ${activeFilter} requests found. Try changing your filter.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
