import { useWeatherContext } from "../context/WeatherContext";

export const useFavorites = () => {
  const { favorites, addFavorite, removeFavorite } = useWeatherContext();

  const isFavorite = (locationId) => {
    return favorites.some((fav) => fav.id === locationId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
