import React from 'react';
import { useWeatherContext } from '../../context/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { celsiusToFahrenheit } from '../../utils/temperatureUtils';

const HourlyForecast = ({ data }) => {
  const { unit } = useWeatherContext();

  const getTemperature = (celsius) => {
    if (unit === 'fahrenheit') {
      return `${Math.round(celsiusToFahrenheit(celsius))}°F`;
    }
    return `${Math.round(celsius)}°C`;
  };

  const next24Hours = data.hourly.time
    .slice(0, 24)
    .map((time, index) => ({
      time: new Date(time).getHours(),
      temperature: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weather_code[index],
      precipitation: data.hourly.precipitation_probability[index]
    }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">24-Hour Forecast</h2>
      <div className="flex overflow-x-auto pb-4 gap-4">
        {next24Hours.map((hour, index) => (
          <div 
            key={index}
            className="flex flex-col items-center min-w-[80px] p-2 rounded-lg hover:bg-gray-50"
          >
            <div className="text-sm text-gray-600">
              {hour.time}:00
            </div>
            <WeatherIcon code={hour.weatherCode} size="w-8 h-8" />
            <div className="font-medium">
              {getTemperature(hour.temperature)}
            </div>
            <div className="text-sm text-blue-500">
              {hour.precipitation}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;