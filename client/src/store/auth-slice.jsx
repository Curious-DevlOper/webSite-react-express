// import { createSlice } from "@reduxjs/toolkit";

// const initialAuthState = {
//   isAuthenticated: false,
//   user: {
//     role: '', // Possible values: 'user', 'admin', 'artist'
//   },
// };

// const authSlice = createSlice({
//   name: "authentication",
//   initialState: initialAuthState,
//   reducers: {
//     login(state, action) {
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//     register(state, action) {
//       state.isAuthenticated = true; // Automatically log in after registration
//       state.user = action.payload.user;
//     },
//   },
// });

// export const authActions = authSlice.actions;

// export default authSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  user: null, // User details including email and role
  error: null, // To track errors during login/register/logout
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null; // Clear previous errors on success
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null; // Clear any existing errors
    },
    register(state, action) {
      state.isAuthenticated = true; // Automatically log in after successful registration
      state.user = action.payload.user;
      state.error = null; // Clear previous errors on success
    },
    setError(state, action) {
      state.error = action.payload.error; // Set an error message
    },
    clearError(state) {
      state.error = null; // Clear error messages
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
