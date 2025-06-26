export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface HelpRequest {
  id: string;
  type: 'medical' | 'food' | 'shelter' | 'evacuation' | 'supplies' | 'other';
  urgency: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location: Location;
  requesterName: string;
  requesterContact: string;
  status: 'open' | 'accepted' | 'en-route' | 'resolved' | 'cancelled';
  volunteerId?: string;
  volunteerName?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedTime?: number;
}

export interface Volunteer {
  id: string;
  name: string;
  contact: string;
  location: Location;
  skills: string[];
  availability: boolean;
  rating: number;
  completedRequests: number;
}

export interface SafetyTip {
  id: string;
  category: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  severity: 'severe' | 'moderate' | 'minor';
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

export interface ReliefCenter {
  id: string;
  name: string;
  type: 'hospital' | 'shelter' | 'supply_center' | 'evacuation_center';
  location: Location;
  capacity: number;
  currentOccupancy: number;
  contact: string;
  services: string[];
  isActive: boolean;
}