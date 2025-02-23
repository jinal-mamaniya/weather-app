// src/services/weatherApi.js
const BASE_URL = "https://api.open-meteo.com/v1";
const GEO_URL = "https://geocoding-api.open-meteo.com/v1";

export const weatherApi = {
  async searchLocation(query) {
    try {
      const response = await fetch(
        `${GEO_URL}/search?name=${encodeURIComponent(
          query
        )}&count=5&language=en&format=json`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error searching location:", error);
      return [];
    }
  },

  async getWeather(latitude, longitude) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}` +
          "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
          "&hourly=temperature_2m,weather_code,precipitation_probability" +
          "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
          "&timezone=auto"
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.reason || "Failed to fetch weather data");
      }
      return data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      return {
        current: {
          temperature_2m: 0,
          relative_humidity_2m: 0,
          wind_speed_10m: 0,
          weather_code: 0,
        },
        hourly: {
          time: [],
          temperature_2m: [],
          weather_code: [],
          precipitation_probability: [],
        },
        daily: {
          time: [],
          weather_code: [],
          temperature_2m_max: [],
          temperature_2m_min: [],
          precipitation_probability_max: [],
        },
      };
    }
  },

  async getAirQuality(latitude, longitude) {
    try {
      // Updated to use the correct air quality endpoint
      const response = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?` +
          `latitude=${latitude}&longitude=${longitude}` +
          "&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone" +
          "&timezone=auto"
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(data.reason || "Failed to fetch air quality data");
      }
      return data;
    } catch (error) {
      console.error("Error fetching air quality:", error);
      return {
        current: {
          us_aqi: 0,
          pm10: 0,
          pm2_5: 0,
          carbon_monoxide: 0,
          nitrogen_dioxide: 0,
          ozone: 0,
        },
      };
    }
  },

  async getHistorical(latitude, longitude, days = 7) {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const response = await fetch(
        `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&start_date=${startDate.toISOString().split("T")[0]}` +
          `&end_date=${endDate.toISOString().split("T")[0]}` +
          "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum" +
          "&timezone=auto"
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(data.reason || "Failed to fetch historical data");
      }
      return data;
    } catch (error) {
      console.error("Error fetching historical data:", error);
      return {
        daily: {
          time: [],
          temperature_2m_max: [],
          temperature_2m_min: [],
          precipitation_sum: [],
        },
      };
    }
  },
};
