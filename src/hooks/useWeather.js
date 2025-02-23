// src/hooks/useWeather.js
import { useQuery } from "@tanstack/react-query";
import { weatherApi } from "../services/weatherApi";

export const useWeather = (latitude, longitude) => {
  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => weatherApi.getWeather(latitude, longitude),
    enabled: Boolean(latitude && longitude),
  });

  const { data: airQuality, isLoading: aqiLoading } = useQuery({
    queryKey: ["airQuality", latitude, longitude],
    queryFn: () => weatherApi.getAirQuality(latitude, longitude),
    enabled: Boolean(latitude && longitude),
  });

  const { data: historical, isLoading: historicalLoading } = useQuery({
    queryKey: ["historical", latitude, longitude],
    queryFn: () => weatherApi.getHistorical(latitude, longitude),
    enabled: Boolean(latitude && longitude),
  });

  return {
    weather,
    airQuality,
    historical,
    isLoading: weatherLoading || aqiLoading || historicalLoading,
  };
};
