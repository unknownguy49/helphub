import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { 
  Heart, 
  MapPin, 
  Users, 
  Building2, 
  AlertTriangle,
  Clock,
  Phone
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getCurrentLocation } from '../utils/geolocation';
import { HelpRequest, ReliefCenter } from '../types';
import { motion } from 'framer-motion';

// Custom icons for different marker types
const createCustomIcon = (color: string, symbol: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <circle cx="12" cy="12" r="10" fill="${color}" stroke="#fff" stroke-width="2"/>
        <text x="12" y="16" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">${symbol}</text>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const icons = {
  help: createCustomIcon('#dc2626', '!'),
  volunteer: createCustomIcon('#10b981', 'V'),
  hospital: createCustomIcon('#3b82f6', 'H'),
  shelter: createCustomIcon('#8b5cf6', 'S'),
  supply: createCustomIcon('#f59e0b', 'C'),
  user: createCustomIcon('#6b7280', 'U'),
};

function MapController() {
  const { state, dispatch } = useApp();
  const map = useMap();

  useEffect(() => {
    if (state.userLocation) {
      map.setView([state.userLocation.lat, state.userLocation.lng], 13);
    }
  }, [state.userLocation, map]);

  return null;
}

export function MapView() {
  const { state, dispatch } = useApp();
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!state.userLocation) {
      getCurrentLocation()
        .then((location) => {
          dispatch({ type: 'SET_USER_LOCATION', payload: location });
        })
        .catch((error) => {
          console.log('Could not get location:', error);
          // Default to NYC coordinates
          dispatch({ 
            type: 'SET_USER_LOCATION', 
            payload: { lat: 40.7128, lng: -74.0060 } 
          });
        });
    }
  }, [state.userLocation, dispatch]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600';
      case 'accepted': return 'text-blue-600';
      case 'en-route': return 'text-orange-600';
      case 'resolved': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const defaultCenter: [number, number] = state.userLocation 
    ? [state.userLocation.lat, state.userLocation.lng]
    : [40.7128, -74.0060]; // NYC default

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Map Legend */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className={`absolute top-4 left-4 z-[1000] p-4 rounded-xl shadow-xl backdrop-blur-sm max-w-xs ${
          state.theme === 'dark' ? 'bg-gray-800/90 text-white border border-gray-700' : 'bg-white/90 text-gray-900 border border-gray-200'
        }`}
      >
        <h3 className="font-semibold mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
          Map Legend
        </h3>
        <div className="space-y-2 text-sm">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
            <span>Help Requests</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
            <span>Volunteers</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
            <span>Hospitals</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm"></div>
            <span>Shelters</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-4 h-4 bg-amber-500 rounded-full shadow-sm"></div>
            <span>Supply Centers</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Active Requests Counter */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`absolute top-4 right-4 z-[1000] p-4 rounded-xl shadow-xl backdrop-blur-sm ${
          state.theme === 'dark' ? 'bg-gray-800/90 text-white border border-gray-700' : 'bg-white/90 text-gray-900 border border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </motion.div>
          <div>
            <div className="font-semibold text-sm">Active Requests</div>
            <motion.div 
              className="text-2xl font-bold text-red-500"
              key={state.helpRequests.filter(req => req.status === 'open').length}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {state.helpRequests.filter(req => req.status === 'open').length}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Real-time Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`absolute bottom-4 left-4 z-[1000] p-3 rounded-lg shadow-lg backdrop-blur-sm ${
          state.theme === 'dark' ? 'bg-gray-800/90 text-white border border-gray-700' : 'bg-white/90 text-gray-900 border border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-2 text-sm">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          ></motion.div>
          <span className="font-medium">Live Updates</span>
        </div>
      </motion.div>

      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapController />

        {/* User location marker */}
        {state.userLocation && (
          <Marker
            position={[state.userLocation.lat, state.userLocation.lng]}
            icon={icons.user}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  Your Location
                </h3>
                <p className="text-sm text-gray-600">
                  {state.userLocation.address || 'Current location'}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Help request markers */}
        {state.helpRequests.map((request) => (
          <Marker
            key={request.id}
            position={[request.location.lat, request.location.lng]}
            icon={icons.help}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{request.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{request.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{request.requesterName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className={getStatusColor(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{request.requesterContact}</span>
                  </div>
                </div>

                {request.status === 'open' && (
                  <button className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Accept Request
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Volunteer markers */}
        {state.volunteers.filter(v => v.availability).map((volunteer) => (
          <Marker
            key={volunteer.id}
            position={[volunteer.location.lat, volunteer.location.lng]}
            icon={icons.volunteer}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-500" />
                  {volunteer.name}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Skills:</strong> {volunteer.skills.join(', ')}</p>
                  <p><strong>Rating:</strong> ⭐ {volunteer.rating}/5</p>
                  <p><strong>Completed:</strong> {volunteer.completedRequests} requests</p>
                  <p><strong>Contact:</strong> {volunteer.contact}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Relief center markers */}
        {state.reliefCenters.filter(center => center.isActive).map((center) => {
          const icon = center.type === 'hospital' ? icons.hospital : 
                      center.type === 'shelter' ? icons.shelter : icons.supply;
          
          return (
            <Marker
              key={center.id}
              position={[center.location.lat, center.location.lng]}
              icon={icon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                    {center.name}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Type:</strong> {center.type.replace('_', ' ').toUpperCase()}</p>
                    <p><strong>Capacity:</strong> {center.currentOccupancy}/{center.capacity}</p>
                    <p><strong>Services:</strong> {center.services.join(', ')}</p>
                    <p><strong>Contact:</strong> {center.contact}</p>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(center.currentOccupancy / center.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((center.currentOccupancy / center.capacity) * 100)}% occupied
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}