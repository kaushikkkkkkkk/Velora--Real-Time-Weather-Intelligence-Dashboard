import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import CityDetails from "./pages/CityDetails";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="city/:name" element={<CityDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
