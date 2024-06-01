import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data; // Throw the error response data to be caught by rejected case
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: localStorage.getItem('email') || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: localStorage.getItem('token')?.length>0 ? true : false,
    loading: false,
    error: null, // Add error field to store error messages
  },
  reducers: {
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors when login process starts
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { email, token } = action.payload;
        state.email = email;
        state.token = token;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export const selectEmail = (state) => state.auth.email;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
