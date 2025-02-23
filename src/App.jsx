// src/App.jsx
import React, { useState } from 'react';
import { WeatherProvider } from './context/WeatherContext';
import CurrentWeather from './components/weather/CurrentWeather';
import AirQuality from './components/weather/AirQuality';
import LocationSearch from './components/weather/LocationSearch';
import DailyForecast from './components/weather/DailyForecast';
import HourlyForecast from './components/weather/HourlyForecast';
import { useWeather } from './hooks/useWeather';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { weather, airQuality, isLoading, error } = useWeather(
    selectedLocation?.latitude,
    selectedLocation?.longitude
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg shadow-gray-200/60 backdrop-blur-sm">
                <LocationSearch onLocationSelect={handleLocationSelect} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="bg-white rounded-xl shadow-lg shadow-gray-200/60 p-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">Loading weather data...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-50 rounded-xl shadow-lg p-8 text-center">
                  <div className="text-red-500 font-medium">{error}</div>
                </div>
              ) : weather ? (
                <div className="space-y-8">
                  {/* Current Weather Card */}
                  <div className="bg-white rounded-xl shadow-lg shadow-gray-200/60 p-6 backdrop-blur-sm">
                    <CurrentWeather data={weather} />
                  </div>

                  {/* Forecast Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg shadow-gray-200/60 p-6 backdrop-blur-sm">
                      <HourlyForecast data={weather} />
                    </div>
                    <div className="bg-white rounded-xl shadow-lg shadow-gray-200/60 p-6 backdrop-blur-sm">
                      <DailyForecast data={weather} />
                    </div>
                  </div>

                  {/* Air Quality Card */}
                  {airQuality && (
                    <div className="bg-white rounded-xl shadow-lg shadow-gray-200/60 p-6 backdrop-blur-sm">
                      <AirQuality data={airQuality} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg shadow-gray-200/60 p-8 text-center backdrop-blur-sm">
                  <div className="text-gray-500">
                    Please select a location to view weather information
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
};

export default App;