import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.list.includes(action.payload)) {
        state.list.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.list));
      }
    },
    removeFavorite: (state, action) => {
      state.list = state.list.filter((c) => c !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.list));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
