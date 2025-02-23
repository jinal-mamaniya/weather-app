import React from 'react';
import { useWeatherContext } from '../../context/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { celsiusToFahrenheit } from '../../utils/temperatureUtils';
import { formatDate } from '../../utils/dateUtils';

const DailyForecast = ({ data }) => {
  const { unit } = useWeatherContext();

  const getTemperature = (celsius) => {
    if (unit === 'fahrenheit') {
      return `${Math.round(celsiusToFahrenheit(celsius))}°F`;
    }
    return `${Math.round(celsius)}°C`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
      <div className="space-y-3">
        {data.daily.time.map((day, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="w-24">
              {index === 0 ? 'Today' : formatDate(day)}
            </div>
            <div className="flex items-center gap-3">
              <WeatherIcon 
                code={data.daily.weather_code[index]} 
                size="w-8 h-8" 
              />
              <div className="space-x-2">
                <span className="font-medium">
                  {getTemperature(data.daily.temperature_2m_max[index])}
                </span>
                <span className="text-gray-500">
                  {getTemperature(data.daily.temperature_2m_min[index])}
                </span>
              </div>
            </div>
            <div className="w-16 text-right text-blue-500">
              {data.daily.precipitation_probability_max[index]}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;