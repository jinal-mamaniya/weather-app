# Weather App

This is a weather application built with React that provides current weather, hourly forecast, daily forecast, air quality, and historical weather data for a selected location.

## Features

- **Current Weather**: Displays the current temperature, weather conditions, humidity, and wind speed.
- **Hourly Forecast**: Provides a 24-hour weather forecast.
- **Daily Forecast**: Shows a 7-day weather forecast.
- **Air Quality**: Displays the current air quality index (AQI) and pollutant levels.
- **Historical Data**: Shows historical temperature data for the past week.
- **Favorite Locations**: Allows users to save and manage their favorite locations.
- **Location Search**: Enables users to search for locations by city name.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Query**: Data-fetching library for React.
- **Tailwind CSS**: Utility-first CSS framework.
- **Recharts**: Charting library for React.
- **Lucide React**: Icon library for React.
- **Open-Meteo API**: Weather data API.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/weather-app.git
   cd weather-app

   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the App

To start the development server, run:

```
npm start
```

### Project Structure

```
weather-app/
├── public/
│ ├── favicon.ico
│ ├── index.html
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ └── robots.txt
├── src/
│ ├── components/
│ │ ├── layouts/
│ │ │ └── MainLayout.jsx
│ │ ├── weather/
│ │ │ ├── AirQuality.jsx
│ │ │ ├── CurrentWeather.jsx
│ │ │ ├── DailyForecast.jsx
│ │ │ ├── FavoriteLocations.jsx
│ │ │ ├── HistoricalData.jsx
│ │ │ ├── HourlyForecast.jsx
│ │ │ ├── LocationSearch.jsx
│ │ │ └── WeatherIcon.jsx
│ ├── context/
│ │ └── WeatherContext.jsx
│ ├── hooks/
│ │ ├── useFavorites.js
│ │ └── useWeather.js
│ ├── services/
│ │ └── weatherApi.js
│ ├── utils/
│ │ ├── dateUtils.js
│ │ └── temperatureUtils.js
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── index.js
├── .gitignore
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```
