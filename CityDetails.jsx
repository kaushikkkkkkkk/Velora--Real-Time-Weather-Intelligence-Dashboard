import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getForecast } from "../lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { useSelector } from "react-redux";

function CityDetails() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [hourly, setHourly] = useState([]);
  const unit = useSelector((state) => state.prefs.unit);

  const convertTemp = (tempC) =>
    unit === "C" ? tempC : (tempC * 9) / 5 + 32;

  useEffect(() => {
    getForecast(name, 5).then((res) => {
      setData(res);
      const todayHours = res.forecast.forecastday[0].hour.map((h) => ({
        time: h.time.split(" ")[1],
        temp: convertTemp(h.temp_c),
        precip: h.precip_mm,
        wind: h.wind_kph,
      }));
      setHourly(todayHours);
    });
  }, [name, unit]);

  if (!data) return <p>Loading detailed forecast...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>
        {data.location.name} — 5-Day Forecast
      </h2>
      <p style={{ color: "#aaa", marginBottom: "20px" }}>
        Region: {data.location.region} | Country: {data.location.country}
      </p>

      {/* ========== Stats Section ========== */}
      <div style={{ marginBottom: "25px" }}>
        <p>🌞 UV Index: {data.forecast.forecastday[0].day.uv}</p>
        <p>💧 Avg Humidity: {data.forecast.forecastday[0].day.avghumidity}%</p>
        <p>🌬️ Avg Wind: {data.forecast.forecastday[0].day.maxwind_kph} km/h</p>
        <p>🧭 Pressure (sample hour): {data.forecast.forecastday[0].hour[12].pressure_mb} mb</p>
      </div>

      {/* ========== Hourly Temperature Chart ========== */}
      <h3>Hourly Temperature Trend (Today)</h3>
      <div style={{ height: "300px", backgroundColor: "#161b22", borderRadius: "10px", padding: "10px", marginBottom: "30px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{ value: `Temp (°${unit})`, angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#58a6ff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ========== Precipitation + Wind Chart ========== */}
      <h3>Precipitation & Wind Speed (Today)</h3>
      <div style={{ height: "300px", backgroundColor: "#161b22", borderRadius: "10px", padding: "10px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="precip" fill="#00bcd4" name="Precipitation (mm)" />
            <Bar dataKey="wind" fill="#ff9800" name="Wind (km/h)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ========== Daily Forecast ========== */}
      <h3 style={{ marginTop: "30px" }}>Next 5 Days</h3>
      {data.forecast.forecastday.map((day) => (
        <div key={day.date} style={{ marginBottom: "15px" }}>
          <strong>{day.date}</strong> — {convertTemp(day.day.avgtemp_c).toFixed(1)}°{unit}  
          <img src={day.day.condition.icon} alt="" />
          <span>{day.day.condition.text}</span>
        </div>
      ))}

      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          color: "#58a6ff",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default CityDetails;
