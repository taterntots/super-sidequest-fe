import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ----------------------------------------------------------------------------------
// -------------------------------- CHALLENGE SLICE ---------------------------------
// ----------------------------------------------------------------------------------

// Initial state
export const initialState = {
  challenges: [],
  loading: false,
  error: false,
};

// API call to grab all challenges
export const fetchChallenges = createAsyncThunk('challenges/fetchChallenges', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `challenges`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// Challenge slice for state change
export const challengeSlice = createSlice({
  name: 'challenges',
  initialState: initialState,
  extraReducers: {
    [fetchChallenges.pending]: (state, action) => {
      state.loading = true
    },
    [fetchChallenges.fulfilled]: (state, { payload }) => {
      state.challenges = payload
      state.loading = false
      state.error = false
    },
    [fetchChallenges.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const challengeSelector = state => state.challenges

// The reducer
export default challengeSlice.reducer;