import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: localStorage.getItem("unit") || "C",
};

const prefsSlice = createSlice({
  name: "prefs",
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "C" ? "F" : "C";
      localStorage.setItem("unit", state.unit);
    },
  },
});

export const { toggleUnit } = prefsSlice.actions;
export default prefsSlice.reducer;
