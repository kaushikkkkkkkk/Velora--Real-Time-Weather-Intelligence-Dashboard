# Weather Analytics Dashboard

A real-time, data-driven Weather Analytics Dashboard built using React, Redux Toolkit, and WeatherAPI.  
It visualizes weather conditions, temperature trends, and forecasts across multiple cities, designed for both accuracy and performance.

---

## Features

- Multi-City Dashboard: Displays live weather data for Hyderabad, Mumbai, Delhi, and any searched city.
- Interactive Charts:
  - Hourly Temperature Trend (Line Chart)
  - Precipitation and Wind Speed (Bar Chart)
- City Search and Autocomplete: Search and instantly add new cities using the WeatherAPI search endpoint.
- Temperature Toggle: Switch between °C and °F globally using Redux state management.
- Favorites System: Mark cities as favorites, stored persistently using localStorage.
- Auto-Refresh and Caching: Updates data every 60 seconds while reducing API load through intelligent caching.
- Last Updated Timestamp: Displays the latest data refresh time for each city.
- Additional Metrics: Humidity, Wind Speed, UV Index, and Atmospheric Pressure displayed in real-time.
- Responsive Design: Clean and adaptable interface for desktop and mobile screens.

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) |
| State Management | Redux Toolkit |
| Charts | Recharts |
| API | WeatherAPI.com |
| Storage | LocalStorage (for caching and favorites) |
| Styling | Inline CSS with Flex Layout |

---

## Installation and Setup

1. Clone the repository:
   
   git clone https://github.com/yourusername/weather-analytics.git
   cd weather-analytics

2. Install dependencies:
   npm install

3. Add your WeatherAPI key:

   Create a .env file in the project root:
   VITE_WEATHER_API_KEY=your_api_key_here

4. Start the development server:
    npm run dev

5. Open the application in your browser:
    http://localhost:5173
    
    
## Developer

Developed by: Vishnupriya Murki
Dedicated to building data-driven, interactive, and modern web applications using React and JavaScript frameworks.