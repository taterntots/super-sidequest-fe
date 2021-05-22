import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ----------------------------------------------------------------------------------
// ----------------------------------- GAME SLICE -----------------------------------
// ----------------------------------------------------------------------------------

// Initial state
export const initialState = {
  games: [],
  loading: false,
  error: false,
};

// API call to grab all games
export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `games`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// Game slice for state change
export const gameSlice = createSlice({
  name: 'games',
  initialState: initialState,
  extraReducers: {
    [fetchGames.pending]: (state, action) => {
      state.loading = true
    },
    [fetchGames.fulfilled]: (state, { payload }) => {
      state.games = payload
      state.loading = false
      state.error = false
    },
    [fetchGames.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const gameSelector = state => state.games

// The reducer
export default gameSlice.reducer;