import { createSlice } from "@reduxjs/toolkit";

const initialNavigationState = {
  currentRoute: "/", // Tracks the current route
  redirect: null,    // Stores the path to redirect
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialNavigationState,
  reducers: {
    setRoute(state, action) {
      state.currentRoute = action.payload.route;
      state.redirect = null; // Clear any pending redirects
    },
    setRedirect(state, action) {
      state.redirect = action.payload.route; // Set a route to redirect
    },
    clearRedirect(state) {
      state.redirect = null; // Clear redirect
    },
  },
});

export const navigationActions = navigationSlice.actions;

export default navigationSlice;
