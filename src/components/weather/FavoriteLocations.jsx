import React from 'react';
import { Star, MapPin, Trash2 } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { useWeatherContext } from '../../context/WeatherContext';

const FavoriteLocations = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { setSelectedLocation } = useWeatherContext();

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Favorite Locations</h2>
        <p className="text-gray-500">No favorite locations added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Favorite Locations</h2>
      <div className="space-y-3">
        {favorites.map((location) => (
          <div
            key={location.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 cursor-pointer"
            onClick={() => handleLocationSelect(location)}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">{location.name}</div>
                <div className="text-sm text-gray-600">
                  {location.country}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(location.id);
                }}
                className="p-1 hover:bg-red-100 rounded-full"
                title="Remove from favorites"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteLocations;