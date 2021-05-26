import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

// TOAST
import cogoToast from 'cogo-toast';

// ----------------------------------------------------------------------------------
// -------------------------------- CHALLENGE SLICE ---------------------------------
// ----------------------------------------------------------------------------------

// Initial state
export const initialState = {
  challenges: [],
  challenge: {},
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

// API call to grab a single challenge by ID
export const fetchChallengeById = createAsyncThunk('challenges/fetchChallengeById', async (challengeId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `challenges/${challengeId}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to grab all of a user's created challenges
export const fetchUserCreatedChallenges = createAsyncThunk('challenges/fetchUserCreatedChallenges', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/created-challenges`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to add a challenge (requires token from valid user being signed in)
export const addChallenge = createAsyncThunk('challenges/addChallenge', async (formData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'post',
      url: process.env.REACT_APP_API + `challenges`,
      headers: {
        Accept: 'application/json',
        Authorization: token,
      }, data: {
        user_id: localStorage.getItem('id'),
        name: formData.name,
        game_id: formData.game.value,
        description: formData.description,
        system_id: formData.system.value,
        difficulty_id: formData.difficulty.value,
        rules: formData.rules,
        is_speedrun: formData.is_speedrun,
        is_high_score: formData.is_high_score,
        prize: formData.prize ? formData.prize : null,
        start_date: formData.start_date ? formData.start_date : null,
        end_date: formData.end_date ? formData.end_date : null
      }
    })
    cogoToast.success('Successfully added challenge', {
      hideAfter: 3,
    });
    return response.data
  } catch (err) {
    cogoToast.error(err.response.data.errorMessage, {
      hideAfter: 5,
    });
    return isRejectedWithValue(err.response.data.errorMessage)
  }
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
    },
    [fetchChallengeById.pending]: (state, action) => {
      state.loading = true
    },
    [fetchChallengeById.fulfilled]: (state, { payload }) => {
      state.challenge = payload
      state.loading = false
      state.error = false
    },
    [fetchChallengeById.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserCreatedChallenges.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserCreatedChallenges.fulfilled]: (state, { payload }) => {
      state.challenges = payload
      state.loading = false
      state.error = false
    },
    [fetchUserCreatedChallenges.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [addChallenge.pending]: (state, action) => {
      state.loading = true
    },
    [addChallenge.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [addChallenge.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const challengeSelector = state => state.challenges

// The reducer
export default challengeSlice.reducer;