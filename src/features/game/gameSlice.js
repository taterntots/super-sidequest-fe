import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ----------------------------------------------------------------------------------
// ----------------------------------- GAME SLICE -----------------------------------
// ----------------------------------------------------------------------------------

// Initial state
export const initialState = {
  games: [],
  game: {},
  challenges: [],
  popular_challenges: [],
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

// API call to grab a single game by ID
export const fetchGameById = createAsyncThunk('games/fetchGameById', async (gameId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `games/${gameId}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to grab all challenges associated with a game
export const fetchGameChallenges = createAsyncThunk('games/fetchGameChallenges', async (gameId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `games/${gameId}/challenges`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to grab all challenges sorted by popularity associated with a game
export const fetchGameChallengesByPopularity = createAsyncThunk('games/fetchGameChallengesByPopularity', async (gameId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `games/${gameId}/challenges/popular`,
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
    },
    [fetchGameById.pending]: (state, action) => {
      state.loading = true
    },
    [fetchGameById.fulfilled]: (state, { payload }) => {
      state.game = payload
      state.loading = false
      state.error = false
    },
    [fetchGameById.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchGameChallenges.pending]: (state, action) => {
      state.loading = true
    },
    [fetchGameChallenges.fulfilled]: (state, { payload }) => {
      state.challenges = payload
      state.loading = false
      state.error = false
    },
    [fetchGameChallenges.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchGameChallengesByPopularity.pending]: (state, action) => {
      state.loading = true
    },
    [fetchGameChallengesByPopularity.fulfilled]: (state, { payload }) => {
      state.popular_challenges = payload
      state.loading = false
      state.error = false
    },
    [fetchGameChallengesByPopularity.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const gameSelector = state => state.games

// The reducer
export default gameSlice.reducer;