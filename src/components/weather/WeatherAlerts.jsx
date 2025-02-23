import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WeatherAlerts = ({ data }) => {
  const getAlertSeverity = (probability) => {
    if (probability > 70) return { level: 'High', color: 'text-red-500', bg: 'bg-red-100' };
    if (probability > 40) return { level: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-green-500', bg: 'bg-green-100' };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6" />
        Weather Alerts
      </h2>
      <div className="space-y-4">
        {data.hourly.precipitation_probability.slice(0, 24).map((probability, index) => {
          const { level, color, bg } = getAlertSeverity(probability);
          if (probability > 30) {
            return (
              <div key={index} className={`${bg} p-4 rounded-lg`}>
                <div className={`${color} font-semibold`}>
                  Precipitation Alert - {level} Risk
                </div>
                <div className="text-sm">
                  {new Date(data.hourly.time[index]).toLocaleTimeString()} - 
                  {probability}% chance of precipitation
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default WeatherAlerts;