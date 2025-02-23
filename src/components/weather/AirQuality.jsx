// src/components/weather/AirQuality.jsx
import React from 'react';
import { Wind } from 'lucide-react';

const AirQuality = ({ data }) => {
  // If data is missing or has error, show placeholder
  if (!data || !data.current) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Air Quality</h2>
        <p className="text-gray-500">Air quality data not available</p>
      </div>
    );
  }

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-500', bg: 'bg-green-100' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-500', bg: 'bg-orange-100' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-500', bg: 'bg-red-100' };
    return { level: 'Very Unhealthy', color: 'text-purple-500', bg: 'bg-purple-100' };
  };

  const { level, color, bg } = getAQIStatus(data.current.us_aqi);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Air Quality</h2>
      <div className={`${bg} rounded-lg p-4 mb-4`}>
        <div className={`${color} text-2xl font-bold`}>{level}</div>
        <div className="text-lg">AQI: {data.current.us_aqi}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">PM2.5</div>
          <div className="text-lg font-bold">{data.current.pm2_5} µg/m³</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">PM10</div>
          <div className="text-lg font-bold">{data.current.pm10} µg/m³</div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;