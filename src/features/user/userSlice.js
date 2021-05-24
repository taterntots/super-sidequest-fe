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
    url: process.env.REACT_APP_API + `users`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to sign in user
export const signInUser = createAsyncThunk('users/signInUser', async (credentials) => {
  const response = await axios({
    method: 'post',
    url: process.env.REACT_APP_API + `auth/login`,
    headers: {
      Accept: 'application/json'
    }, data: {
      email: credentials.email.toLowerCase().replace(/ /g, ""),
      password: credentials.password
    }
  })
  return response.data
});

// API call to sign up user
export const signUpUser = createAsyncThunk('users/signUpUser', async (credentials) => {
  const response = await axios({
    method: 'post',
    url: process.env.REACT_APP_API + `auth/signup`,
    headers: {
      Accept: 'application/json'
    }, data: {
      email: credentials.email.toLowerCase().replace(/ /g, ""),
      password: credentials.password,
      username: credentials.username.replace(/ /g, "")
    }
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
    },
    [signInUser.pending]: (state, action) => {
      state.loading = true
    },
    [signInUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [signInUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [signUpUser.pending]: (state, action) => {
      state.loading = true
    },
    [signUpUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const userSelector = state => state.users

// The reducer
export default userSlice.reducer;