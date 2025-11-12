import { useState, useEffect } from "react";
import { getCurrentWeather } from "../lib/api";
import { getCachedData, setCachedData } from "../lib/cache";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

function Dashboard() {
  const [cities, setCities] = useState(["Hyderabad", "Mumbai", "Delhi"]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const unit = useSelector((state) => state.prefs.unit);
  const favorites = useSelector((state) => state.favorites.list);
  const dispatch = useDispatch();

  const convertTemp = (tempC) =>
    unit === "C" ? tempC : (tempC * 9) / 5 + 32;

  // Fetch and cache weather
  const fetchWeather = async () => {
    setLoading(true);
    const results = await Promise.all(
      cities.map(async (city) => {
        const cached = getCachedData(city);
        if (cached) return cached;

        const fresh = await getCurrentWeather(city);
        if (fresh) {
          setCachedData(city, fresh);
          return { data: fresh, timestamp: Date.now() };
        }
        return null;
      })
    );
    setWeatherData(results.filter(Boolean));
    setLoading(false);
  };

  // Initial + auto-refresh
  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000);
    return () => clearInterval(interval);
  }, [cities]);

  // Search city from WeatherAPI
  const handleSearch = async (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);

    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${query}`
    );
    const results = await res.json();
    setSearchResults(results || []);
  };

  // Add selected city to dashboard
  const addCity = (cityName) => {
    if (!cities.includes(cityName)) {
      setCities([...cities, cityName]);
      setSearchResults([]);
      setSearchQuery("");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#aaa",
          fontSize: "20px",
        }}
      >
        ⏳ Fetching latest weather data...
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a city..."
          style={{
            padding: "10px",
            width: "260px",
            borderRadius: "6px",
            border: "1px solid #30363d",
            background: "#0d1117",
            color: "white",
          }}
        />
        {searchResults.length > 0 && (
          <div
            style={{
              position: "absolute",
              background: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "6px",
              marginTop: "5px",
              width: "260px",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            {searchResults.map((city) => (
              <div
                key={city.id}
                onClick={() => addCity(city.name)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #30363d",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#21262d")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {city.name}, {city.country}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* City Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {weatherData.map(
          (w) =>
            w && (
              <div
                key={w.data.location.name}
                style={{
                  backgroundColor: "#161b22",
                  borderRadius: "10px",
                  padding: "15px",
                  width: "220px",
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                <h3 style={{ marginBottom: "5px" }}>
                  {w.data.location.name}
                </h3>

                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {convertTemp(w.data.current.temp_c).toFixed(1)}°{unit}
                </p>

                <img
                  src={w.data.current.condition.icon}
                  alt={w.data.current.condition.text}
                  style={{ width: "64px", height: "64px" }}
                />
                <p style={{ color: "#aaa", marginBottom: "10px" }}>
                  {w.data.current.condition.text}
                </p>

                <p style={{ fontSize: "12px", color: "#777" }}>
                  Updated {new Date(w.timestamp).toLocaleTimeString()}
                </p>

                <Link
                  to={`/city/${w.data.location.name}`}
                  style={{
                    color: "#58a6ff",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  View Details
                </Link>

                <button
                  onClick={() =>
                    favorites.includes(w.data.location.name)
                      ? dispatch(removeFavorite(w.data.location.name))
                      : dispatch(addFavorite(w.data.location.name))
                  }
                  style={{
                    background: "#21262d",
                    border: "none",
                    color: favorites.includes(w.data.location.name)
                      ? "#ff6363"
                      : "#58a6ff",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "8px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {favorites.includes(w.data.location.name)
                    ? "★ Favorited"
                    : "☆ Add Favorite"}
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Dashboard;
