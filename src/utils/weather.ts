import { WeatherAlert } from '../types';

const WEATHER_API_KEY = 'demo_key'; // In production, use environment variable

export const getWeatherAlerts = async (lat: number, lng: number): Promise<WeatherAlert[]> => {
  try {
    // Mock weather alerts for demo (in production, use OpenWeatherMap API)
    const mockAlerts: WeatherAlert[] = [
      {
        id: '1',
        type: 'warning',
        severity: 'severe',
        title: 'Flash Flood Warning',
        description: 'Flash flooding is occurring or expected to begin shortly. Move to higher ground immediately.',
        startTime: new Date(),
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      },
      {
        id: '2',
        type: 'watch',
        severity: 'moderate',
        title: 'High Wind Advisory',
        description: 'Sustained winds of 25-35 mph with gusts up to 50 mph expected.',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      },
    ];

    return mockAlerts;
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    return [];
  }
};

export const getCurrentWeather = async (lat: number, lng: number) => {
  try {
    // Mock weather data for demo
    return {
      temperature: 72,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 15,
      visibility: 10,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};