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
  recent_challenges: [],
  created_challenges: [],
  accepted_challenges: [],
  completed_challenges: [],
  challenges_high_scores: [],
  challenges_speedruns: [],
  challenges_for_glorys: [],
  challenge_game_stats: [],
  challenge: {},
  featured_challenge: {},
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

// API call to grab all recent challenges (limited for homepage)
export const fetchRecentChallenges = createAsyncThunk('challenges/fetchRecentChallenges', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `challenges/recent`,
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

// API call to grab all of a user's completed challenges
export const fetchUserCompletedChallenges = createAsyncThunk('challenges/fetchUserCompletedChallenges', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/completed-challenges`,
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

// API call to grab a challenge's For Glory leaderboard
export const fetchAllChallengeForGlorys = createAsyncThunk('challenges/fetchAllChallengeForGlorys', async (challengeId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `challenges/${challengeId}/glory`,
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

// API call to grab a user's total challenge completion stats for all games
export const fetchUserFeaturedChallenge = createAsyncThunk('challenges/fetchUserFeaturedChallenge', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/challenges/featured`,
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
    if (err.response.data.errorMessage.includes('expired')) {
      localStorage.clear()
    }
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
    if (err.response.data.errorMessage.includes('expired')) {
      localStorage.clear()
    }
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
    if (err.response.data.errorMessage.includes('expired')) {
      localStorage.clear()
    }
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
        video_URL: data.video_URL ? data.video_URL : null
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
    if (err.response.data.errorMessage.includes('expired')) {
      localStorage.clear()
    }
    return isRejectedWithValue(err.response.data.errorMessage)
  }
});

// API call to update a user challenge being completed
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
        completed: data.completed,
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
    if (err.response.data.errorMessage.includes('expired')) {
      localStorage.clear()
    }
    return isRejectedWithValue(err.response.data.errorMessage)
  }
});

// API call to update a user challenge being featured
export const updateUserChallengeFeatured = createAsyncThunk('challenges/updateUserChallengeFeatured', async (data) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'put',
      url: process.env.REACT_APP_API + `challenges/${data.challenge_id}/featured`,
      headers: {
        Accept: 'application/json',
        Authorization: token,
      }, data: {
        featured: data.featured
      }
    })
    cogoToast.success('Challenge featured status updated!', {
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
    [fetchRecentChallenges.pending]: (state, action) => {
      state.loading = true
    },
    [fetchRecentChallenges.fulfilled]: (state, { payload }) => {
      state.recent_challenges = payload
      state.loading = false
      state.error = false
    },
    [fetchRecentChallenges.rejected]: (state, action) => {
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
    [fetchUserCompletedChallenges.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserCompletedChallenges.fulfilled]: (state, { payload }) => {
      state.completed_challenges = payload
      state.loading = false
      state.error = false
    },
    [fetchUserCompletedChallenges.rejected]: (state, action) => {
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
    [fetchAllChallengeForGlorys.pending]: (state, action) => {
      state.loading = true
    },
    [fetchAllChallengeForGlorys.fulfilled]: (state, { payload }) => {
      state.challenges_for_glorys = payload
      state.loading = false
      state.error = false
    },
    [fetchAllChallengeForGlorys.rejected]: (state, action) => {
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
    [fetchUserFeaturedChallenge.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserFeaturedChallenge.fulfilled]: (state, { payload }) => {
      state.featured_challenge = payload
      state.loading = false
      state.error = false
    },
    [fetchUserFeaturedChallenge.rejected]: (state, action) => {
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
    },
    [updateUserChallengeFeatured.pending]: (state, action) => {
      state.loading = true
    },
    [updateUserChallengeFeatured.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.error = false
    },
    [updateUserChallengeFeatured.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const challengeSelector = state => state.challenges

// The reducer
export default challengeSlice.reducer;