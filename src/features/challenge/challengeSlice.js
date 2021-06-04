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
  created_challenges: [],
  accepted_challenges: [],
  challenges_high_scores: [],
  challenges_speedruns: [],
  challenge_game_stats: [],
  challenge: {},
  acceptedChallenge: {},
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

// API call to grab all of a user's accepted challenges
export const fetchUserAcceptedChallenges = createAsyncThunk('challenges/fetchUserAcceptedChallenges', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/accepted-challenges`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to check if a user has accepted a challenge already
export const fetchIfChallengeAlreadyAccepted = createAsyncThunk('challenges/fetchIfChallengeAlreadyAccepted', async (data) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `challenges/${data.challenge_id}/user/${data.user_id}/accepted`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to grab a challenge's High Score leaderboard
export const fetchAllChallengeHighScores = createAsyncThunk('challenges/fetchAllChallengeHighScores', async (challengeId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `challenges/${challengeId}/highscores`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to grab a challenge's Speedrun leaderboard
export const fetchAllChallengeSpeedruns = createAsyncThunk('challenges/fetchAllChallengeSpeedruns', async (challengeId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `challenges/${challengeId}/speedruns`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to grab a user's total challenge completion stats for all games
export const fetchUserCompletedChallengeTotal = createAsyncThunk('challenges/fetchUserCompletedChallengeTotal', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/games/stats`,
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
    cogoToast.success('Successfully created the challenge', {
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

// API call to accept a challenge (requires token from valid user being signed in)
export const acceptChallenge = createAsyncThunk('challenges/acceptChallenge', async (challengeId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'post',
      url: process.env.REACT_APP_API + `challenges/${challengeId}/accept`,
      headers: {
        Accept: 'application/json',
        Authorization: token,
      }, data: {
        user_id: localStorage.getItem('id')
      }
    })
    cogoToast.success('Challenge accepted!', {
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

// API call to abandon a challenge (requires token from valid user being signed in)
export const abandonChallenge = createAsyncThunk('challenges/abandonChallenge', async (challengeId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'delete',
      url: process.env.REACT_APP_API + `challenges/${challengeId}/abandon`,
      headers: {
        Accept: 'application/json',
        Authorization: token,
      }, data: {
        user_id: localStorage.getItem('id')
      }
    })
    cogoToast.success('Challenge abandoned!', {
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

// API call to update a user challenge progress
export const updateUserChallengeProgress = createAsyncThunk('challenges/updateUserChallengeProgress', async (data) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'put',
      url: process.env.REACT_APP_API + `challenges/${data.challenge_id}/users/${localStorage.getItem('id')}/update`,
      headers: {
        Accept: 'application/json',
        Authorization: token,
      }, data: {
        high_score: data.high_score ? data.high_score : null,
        speedrun_hours: data.speedrun_hours ? data.speedrun_hours : null,
        speedrun_minutes: data.speedrun_minutes ? data.speedrun_minutes : null,
        speedrun_seconds: data.speedrun_seconds ? data.speedrun_seconds : null,
        speedrun_milliseconds: data.speedrun_milliseconds ? data.speedrun_milliseconds : null,
        total_milliseconds: data.total_milliseconds ? data.total_milliseconds : null,
        image_URL: data.image_URL ? data.image_URL : null,
        video_URL: data.video_URL ? data.video_URL : null,
        completed: data.completed ? data.completed : false,
      }
    })
    cogoToast.success('Challenge updated!', {
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

// API call to update a user challenge completion
export const updateUserChallengeCompletion = createAsyncThunk('challenges/updateUserChallengeCompletion', async (data) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'put',
      url: process.env.REACT_APP_API + `challenges/${data.challenge_id}/users/${localStorage.getItem('id')}/update`,
      headers: {
        Accept: 'application/json',
        Authorization: token,
      }, data: {
        completed: data.completed ? data.completed : false,
        is_active: data.completed ? false : true
      }
    })
    cogoToast.success('Challenge updated!', {
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
      state.created_challenges = payload
      state.loading = false
      state.error = false
    },
    [fetchUserCreatedChallenges.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserAcceptedChallenges.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserAcceptedChallenges.fulfilled]: (state, { payload }) => {
      state.accepted_challenges = payload
      state.loading = false
      state.error = false
    },
    [fetchUserAcceptedChallenges.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchIfChallengeAlreadyAccepted.pending]: (state, action) => {
      state.loading = true
    },
    [fetchIfChallengeAlreadyAccepted.fulfilled]: (state, { payload }) => {
      state.acceptedChallenge = payload
      state.loading = false
      state.error = false
    },
    [fetchIfChallengeAlreadyAccepted.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchAllChallengeHighScores.pending]: (state, action) => {
      state.loading = true
    },
    [fetchAllChallengeHighScores.fulfilled]: (state, { payload }) => {
      state.challenges_high_scores = payload
      state.loading = false
      state.error = false
    },
    [fetchAllChallengeHighScores.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchAllChallengeSpeedruns.pending]: (state, action) => {
      state.loading = true
    },
    [fetchAllChallengeSpeedruns.fulfilled]: (state, { payload }) => {
      state.challenges_speedruns = payload
      state.loading = false
      state.error = false
    },
    [fetchAllChallengeSpeedruns.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserCompletedChallengeTotal.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserCompletedChallengeTotal.fulfilled]: (state, { payload }) => {
      state.challenge_game_stats = payload
      state.loading = false
      state.error = false
    },
    [fetchUserCompletedChallengeTotal.rejected]: (state, action) => {
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
    },
    [acceptChallenge.pending]: (state, action) => {
      state.loading = true
    },
    [acceptChallenge.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [acceptChallenge.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [abandonChallenge.pending]: (state, action) => {
      state.loading = true
    },
    [abandonChallenge.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [abandonChallenge.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [updateUserChallengeProgress.pending]: (state, action) => {
      state.loading = true
    },
    [updateUserChallengeProgress.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.error = false
    },
    [updateUserChallengeProgress.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [updateUserChallengeCompletion.pending]: (state, action) => {
      state.loading = true
    },
    [updateUserChallengeCompletion.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.error = false
    },
    [updateUserChallengeCompletion.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const challengeSelector = state => state.challenges

// The reducer
export default challengeSlice.reducer;