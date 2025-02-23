// src/components/weather/LocationSearch.jsx
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { weatherApi } from '../../services/weatherApi';

const LocationSearch = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const results = await weatherApi.searchLocation(searchQuery);
      console.log("Search results:", results); // Debug log
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search locations');
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleLocationClick = (location) => {
    console.log("Location clicked:", location); // Debug log
    onLocationSelect(location);
    setSearchResults([]); // Clear results after selection
    setSearchQuery(''); // Clear search input
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>

      {isLoading ? (
        <div className="text-center py-4">Searching...</div>
      ) : (
        <div className="space-y-2">
          {searchResults.map((result) => (
            <div
              key={`${result.latitude}-${result.longitude}`}
              onClick={() => handleLocationClick(result)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">{result.name}</div>
                <div className="text-sm text-gray-600">
                  {result.country}
                  {result.admin1 && `, ${result.admin1}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;