import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
export const initialState = {
  users: [],
  loading: false,
  error: false,
};

// API call to grab all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios({
    method: 'get',
    url: `https://music-chunks-test-server.herokuapp.com/api/users`,
    headers: {
      Accept: 'application/json',
      Authorization: `fnAD22PlewACAJNhiqikiSxV60EEH3A3N7xdBAi1`,
    },
  })
  return response.data
});

// User slice for state change
export const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.users = payload
      state.loading = false
      state.error = false
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const userSelector = state => state.users

// The reducer
export default userSlice.reducer;