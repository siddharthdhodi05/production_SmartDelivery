import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  token: null, // Store the JWT token
  isAuthenticated: false, // Whether the user is logged in
};

// Create a slice of state with reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log the user in and store the token
    login(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // Action to log the user out and clear the token
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export the actions
export const { login, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
