import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "./store/prefsSlice";

function App() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.prefs.unit);

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span role="img" aria-label="weather" style={{ fontSize: "30px" }}>
            🌦️
          </span>
          <h1 style={{ fontSize: "26px", fontWeight: "600", margin: 0 }}>
            Weather Analytics
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Dashboard
          </Link>

          {/* Temperature Unit Toggle */}
          <button
            onClick={() => dispatch(toggleUnit())}
            style={{
              background: "#21262d",
              border: "1px solid #30363d",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            °{unit}
          </button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <Outlet />
    </div>
  );
}

export default App;
