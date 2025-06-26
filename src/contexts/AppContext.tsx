import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { HelpRequest, Volunteer, Location, WeatherAlert, SafetyTip, ReliefCenter } from '../types';

interface AppState {
  theme: 'light' | 'dark';
  userLocation: Location | null;
  userType: 'requester' | 'volunteer' | null;
  helpRequests: HelpRequest[];
  volunteers: Volunteer[];
  weatherAlerts: WeatherAlert[];
  safetyTips: SafetyTip[];
  reliefCenters: ReliefCenter[];
  isOffline: boolean;
}

type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_USER_LOCATION'; payload: Location }
  | { type: 'SET_USER_TYPE'; payload: 'requester' | 'volunteer' | null }
  | { type: 'ADD_HELP_REQUEST'; payload: HelpRequest }
  | { type: 'UPDATE_HELP_REQUEST'; payload: HelpRequest }
  | { type: 'SET_HELP_REQUESTS'; payload: HelpRequest[] }
  | { type: 'SET_VOLUNTEERS'; payload: Volunteer[] }
  | { type: 'SET_WEATHER_ALERTS'; payload: WeatherAlert[] }
  | { type: 'SET_SAFETY_TIPS'; payload: SafetyTip[] }
  | { type: 'SET_RELIEF_CENTERS'; payload: ReliefCenter[] }
  | { type: 'SET_OFFLINE_STATUS'; payload: boolean };

const initialState: AppState = {
  theme: 'light',
  userLocation: null,
  userType: null,
  helpRequests: [],
  volunteers: [],
  weatherAlerts: [],
  safetyTips: [],
  reliefCenters: [],
  isOffline: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_USER_LOCATION':
      return { ...state, userLocation: action.payload };
    case 'SET_USER_TYPE':
      return { ...state, userType: action.payload };
    case 'ADD_HELP_REQUEST':
      return { ...state, helpRequests: [...state.helpRequests, action.payload] };
    case 'UPDATE_HELP_REQUEST':
      return {
        ...state,
        helpRequests: state.helpRequests.map(req =>
          req.id === action.payload.id ? action.payload : req
        ),
      };
    case 'SET_HELP_REQUESTS':
      return { ...state, helpRequests: action.payload };
    case 'SET_VOLUNTEERS':
      return { ...state, volunteers: action.payload };
    case 'SET_WEATHER_ALERTS':
      return { ...state, weatherAlerts: action.payload };
    case 'SET_SAFETY_TIPS':
      return { ...state, safetyTips: action.payload };
    case 'SET_RELIEF_CENTERS':
      return { ...state, reliefCenters: action.payload };
    case 'SET_OFFLINE_STATUS':
      return { ...state, isOffline: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('helphub-theme') as 'light' | 'dark';
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }

    const savedRequests = localStorage.getItem('helphub-requests');
    if (savedRequests) {
      const requests = JSON.parse(savedRequests).map((req: any) => ({
        ...req,
        createdAt: new Date(req.createdAt),
        updatedAt: new Date(req.updatedAt),
      }));
      dispatch({ type: 'SET_HELP_REQUESTS', payload: requests });
    }

    const savedVolunteers = localStorage.getItem('helphub-volunteers');
    if (savedVolunteers) {
      dispatch({ type: 'SET_VOLUNTEERS', payload: JSON.parse(savedVolunteers) });
    }

    // Initialize with mock data
    initializeMockData();
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('helphub-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('helphub-requests', JSON.stringify(state.helpRequests));
  }, [state.helpRequests]);

  useEffect(() => {
    localStorage.setItem('helphub-volunteers', JSON.stringify(state.volunteers));
  }, [state.volunteers]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_OFFLINE_STATUS', payload: false });
    const handleOffline = () => dispatch({ type: 'SET_OFFLINE_STATUS', payload: true });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const initializeMockData = () => {
    // Mock safety tips
    const mockSafetyTips: SafetyTip[] = [
      {
        id: '1',
        category: 'General',
        title: 'Stay Informed',
        content: 'Keep a battery-powered radio and stay tuned to local emergency broadcasts.',
        priority: 'high',
      },
      {
        id: '2',
        category: 'Flood',
        title: 'Never Drive Through Flooded Roads',
        content: 'Turn around, don\'t drown. Just 6 inches of moving water can knock you down.',
        priority: 'high',
      },
      {
        id: '3',
        category: 'Fire',
        title: 'Create Defensible Space',
        content: 'Clear vegetation and combustible materials within 30 feet of your home.',
        priority: 'medium',
      },
    ];

    // Mock relief centers
    const mockReliefCenters: ReliefCenter[] = [
      {
        id: '1',
        name: 'City General Hospital',
        type: 'hospital',
        location: { lat: 40.7128, lng: -74.0060, address: '123 Main St' },
        capacity: 500,
        currentOccupancy: 320,
        contact: '+1-555-0123',
        services: ['Emergency Care', 'Surgery', 'Blood Bank'],
        isActive: true,
      },
      {
        id: '2',
        name: 'Community Shelter',
        type: 'shelter',
        location: { lat: 40.7589, lng: -73.9851, address: '456 Oak Ave' },
        capacity: 200,
        currentOccupancy: 150,
        contact: '+1-555-0124',
        services: ['Temporary Housing', 'Meals', 'Medical Aid'],
        isActive: true,
      },
    ];

    dispatch({ type: 'SET_SAFETY_TIPS', payload: mockSafetyTips });
    dispatch({ type: 'SET_RELIEF_CENTERS', payload: mockReliefCenters });
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}