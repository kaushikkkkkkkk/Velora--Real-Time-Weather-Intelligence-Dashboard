import { configureStore } from "@reduxjs/toolkit";
import prefsReducer from "./prefsSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    prefs: prefsReducer,
    favorites: favoritesReducer,
  },
});
