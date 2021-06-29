import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

// TOAST
import cogoToast from 'cogo-toast';

// ----------------------------------------------------------------------------------
// ----------------------------------- GAME SLICE -----------------------------------
// ----------------------------------------------------------------------------------

// Initial state
export const initialState = {
  public_games: [],
  private_games: [],
  game: {},
  challenges: [],
  popular_challenges: [],
  loading: false,
  error: false,
};

// API call to grab all public games
export const fetchPublicGames = createAsyncThunk('games/fetchPublicGames', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `games/public`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to grab all private games
export const fetchPrivateGames = createAsyncThunk('games/fetchPrivateGames', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `games/private`,
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
export const fetchGameChallenges = createAsyncThunk('games/fetchGameChallenges', async (data) => {
  const response = await axios({
    method: 'get',
    url: data.userId ? process.env.REACT_APP_API + `games/${data.gameId}/users/${data.userId}/challenges` :
      process.env.REACT_APP_API + `games/${data.gameId}/challenges`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    }
  })
  return response.data
});

// API call to grab all challenges sorted by popularity associated with a game
export const fetchGameChallengesByPopularity = createAsyncThunk('games/fetchGameChallengesByPopularity', async (data) => {
  const response = await axios({
    method: 'get',
    url: data.userId ? process.env.REACT_APP_API + `games/${data.gameId}/users/${data.userId}/challenges/popular` :
      process.env.REACT_APP_API + `games/${data.gameId}/challenges/popular`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    }
  })
  return response.data
});

// API call to request/add a game (requires token from valid user being signed in)
export const requestGame = createAsyncThunk('challenges/requestGame', async (formData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'post',
      url: process.env.REACT_APP_API + `games`,
      headers: {
        Accept: 'application/json',
        Authorization: token,
      }, data: {
        name: formData.name,
        public: false
      }
    })
    cogoToast.success(`Successfully requested ${formData.name}`, {
      hideAfter: 3,
    });
    return response.data
  } catch (err) {
    cogoToast.error(err.response.data.errorMessage, {
      hideAfter: 5,
    });
    if (err.response.data.errorMessage.includes('expired')) {
      localStorage.clear()
    }
    return isRejectedWithValue(err.response.data.errorMessage)
  }
});


// Game slice for state change
export const gameSlice = createSlice({
  name: 'games',
  initialState: initialState,
  extraReducers: {
    [fetchPublicGames.pending]: (state, action) => {
      state.loading = true
    },
    [fetchPublicGames.fulfilled]: (state, { payload }) => {
      state.public_games = payload
      state.loading = false
      state.error = false
    },
    [fetchPublicGames.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchPrivateGames.pending]: (state, action) => {
      state.loading = true
    },
    [fetchPrivateGames.fulfilled]: (state, { payload }) => {
      state.private_games = payload
      state.loading = false
      state.error = false
    },
    [fetchPrivateGames.rejected]: (state, action) => {
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
    },
    [requestGame.pending]: (state, action) => {
      state.loading = true
    },
    [requestGame.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [requestGame.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
  }
});

// A selector for grabbing state in components
export const gameSelector = state => state.games

// The reducer
export default gameSlice.reducer;