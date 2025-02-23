// src/components/weather/CurrentWeather.jsx
import React from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react';
import { useWeatherContext } from '../../context/WeatherContext';
import { celsiusToFahrenheit } from '../../utils/temperatureUtils';

const CurrentWeather = ({ data }) => {
  const { unit, toggleUnit } = useWeatherContext();

  const getWeatherIcon = (code) => {
    if (code <= 1) return <Sun className="w-16 h-16 text-yellow-500" />;
    if (code <= 3) return <Cloud className="w-16 h-16 text-gray-500" />;
    return <CloudRain className="w-16 h-16 text-blue-500" />;
  };

  const getTemperature = (celsius) => {
    const temp = unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius;
    return Math.round(temp);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {getWeatherIcon(data.current.weather_code)}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold">
                {getTemperature(data.current.temperature_2m)}°
                {unit === 'celsius' ? 'C' : 'F'}
              </span>
              <button
                onClick={toggleUnit}
                className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                Switch to {unit === 'celsius' ? '°F' : '°C'}
              </button>
            </div>
            <div className="text-gray-600">
              {data.current_weather_description}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Droplets className="w-6 h-6 mx-auto text-blue-500" />
            <span>{data.current.relative_humidity_2m}%</span>
          </div>
          <div className="text-center">
            <Wind className="w-6 h-6 mx-auto text-gray-500" />
            <span>{Math.round(data.current.wind_speed_10m)} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;