import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [unit, setUnit] = useState(() => 
    localStorage.getItem('temperatureUnit') || 'celsius'
  );
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteLocations');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    localStorage.setItem('temperatureUnit', unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
  }, [favorites]);

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const addFavorite = (location) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === location.id)) return prev;
      return [...prev, location];
    });
  };

  const removeFavorite = (locationId) => {
    setFavorites(prev => prev.filter(loc => loc.id !== locationId));
  };

  return (
    <WeatherContext.Provider value={{
      unit,
      toggleUnit,
      favorites,
      addFavorite,
      removeFavorite,
      selectedLocation,
      setSelectedLocation
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);