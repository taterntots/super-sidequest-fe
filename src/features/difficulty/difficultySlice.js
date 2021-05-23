import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ----------------------------------------------------------------------------------
// --------------------------------- DIFFICULTY SLICE -------------------------------
// ----------------------------------------------------------------------------------

// Initial state
export const initialState = {
  difficulties: [],
  loading: false,
  error: false,
};

// API call to grab all games
export const fetchDifficulties = createAsyncThunk('difficulties/fetchDifficulties', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `difficulty`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// Game slice for state change
export const difficultySlice = createSlice({
  name: 'difficulties',
  initialState: initialState,
  extraReducers: {
    [fetchDifficulties.pending]: (state, action) => {
      state.loading = true
    },
    [fetchDifficulties.fulfilled]: (state, { payload }) => {
      state.difficulties = payload
      state.loading = false
      state.error = false
    },
    [fetchDifficulties.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const difficultySelector = state => state.difficulties

// The reducer
export default difficultySlice.reducer;