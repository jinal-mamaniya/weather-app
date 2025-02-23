import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Cloudy } from 'lucide-react';

const WeatherIcon = ({ code, size = "w-6 h-6" }) => {
  const getIcon = () => {
    switch (true) {
      case code <= 1:
        return <Sun className={`${size} text-yellow-500`} />;
      case code <= 3:
        return <Cloud className={`${size} text-gray-500`} />;
      case code <= 48:
        return <Cloudy className={`${size} text-gray-600`} />;
      case code <= 67:
        return <CloudRain className={`${size} text-blue-500`} />;
      case code <= 77:
        return <CloudSnow className={`${size} text-blue-300`} />;
      case code <= 99:
        return <CloudLightning className={`${size} text-yellow-600`} />;
      default:
        return <Cloud className={`${size} text-gray-500`} />;
    }
  };

  return getIcon();
};

export default WeatherIcon;