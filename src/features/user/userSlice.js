import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

// TOAST
import cogoToast from 'cogo-toast';

// ----------------------------------------------------------------------------------
// --------------------------------- USER SLICE -------------------------------------
// ----------------------------------------------------------------------------------

// Initial state
export const initialState = {
  users: [],
  banned_users: [],
  users_with_game_experience: [],
  user_followings: [],
  user_followers: [],
  user_experience_points: 0,
  user_game_experience_points: 0,
  user: {},
  user_admin: false,
  user_is_banned: false,
  is_following_user: false,
  loading: false,
  error: false
};

// API call to grab all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to grab all banned users
export const fetchBannedUsers = createAsyncThunk('users/fetchBannedUsers', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/all/banned`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to grab all users with specific game experience points
export const fetchUsersWithGameExperience = createAsyncThunk('users/fetchUsersWithGameExperience', async (gameId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/games/${gameId}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to grab all of a user's followings (people the user follows)
export const fetchUserFollowings = createAsyncThunk('users/fetchUserFollowings', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/followings`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to grab all of a user's followers (people following the user)
export const fetchUserFollowers = createAsyncThunk('users/fetchUserFollowers', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/followers`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to check if a user is being followed by someone specific
export const fetchCheckIfFollowingUser = createAsyncThunk('users/fetchCheckIfFollowingUser', async (followerId) => {
  const userId = localStorage.getItem('id')

  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/followers/${followerId}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to grab a user by ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to grab a user by username
export const fetchUserByUsername = createAsyncThunk('users/fetchUserByUsername', async (username) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/username/${username}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to check if a user is an admin
export const fetchUserAdminStatus = createAsyncThunk('users/fetchUserAdminStatus', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/is-admin`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to calculate a user's experience points for all games
export const fetchUserEXPForAllGames = createAsyncThunk('users/fetchUserEXPForAllGames', async (userId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${userId}/exp`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to calculate a user's experience points for a specific game
export const fetchUserEXPForGameById = createAsyncThunk('users/fetchUserEXPForGameById', async (data) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/${data.user_id}/games/${data.game_id}/exp`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    },
  })
  return response.data
});

// API call to follower a user
export const followUser = createAsyncThunk('users/followUser', async (followerId) => {
  const userId = localStorage.getItem('id')

  const response = await axios({
    method: 'post',
    url: process.env.REACT_APP_API + `users/${userId}/followers/${followerId}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    }
  })
    .then(res => {
      if (res.data.errorMessage) {
        cogoToast.error(res.data.errorMessage, {
          hideAfter: 5,
        });
      } else if (res.data.success) {
        cogoToast.success(res.data.success, {
          hideAfter: 5,
        });
      }
      return res.data
    })
    .catch(err => {
      cogoToast.error(err.response.data.errorMessage, {
        hideAfter: 5,
      });
      return err.response.data.message
    })
  return response
});


// API call to unfollow a user
export const unfollowUser = createAsyncThunk('users/unfollowUser', async (followerId) => {
  const userId = localStorage.getItem('id')

  const response = await axios({
    method: 'delete',
    url: process.env.REACT_APP_API + `users/${userId}/followers/${followerId}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
    }
  })
    .then(res => {
      if (res.data.errorMessage) {
        cogoToast.error(res.data.errorMessage, {
          hideAfter: 5,
        });
      } else if (res.data.success) {
        cogoToast.success(res.data.success, {
          hideAfter: 5,
        });
      }
      return res.data
    })
    .catch(err => {
      cogoToast.error(err.response.data.errorMessage, {
        hideAfter: 5,
      });
      return err.response.data.message
    })
  return response
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
    .then(res => {
      localStorage.setItem('id', res.data.id);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      cogoToast.success('Successfully logged in', {
        hideAfter: 5,
      });
      return res.data
    })
    .catch(err => {
      cogoToast.error(err.response.data.message, {
        hideAfter: 5,
      });
      return err.response.data.message
    })
  return response
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
    .then(res => {
      cogoToast.success('Successfully created account', {
        hideAfter: 5,
      });
      return res.data
    })
    .catch(err => {
      cogoToast.error(err.response.data.errorMessage, {
        hideAfter: 5,
      });
      return err.response.data.errorMessage
    })
  return response
});

// API call to verify a user account
export const verifyUser = createAsyncThunk('users/verifyUser', async (data) => {
  const response = await axios({
    method: 'post',
    url: process.env.REACT_APP_API + `auth/verify/${data.email}/${data.verification_code}`,
    headers: {
      Accept: 'application/json'
    }
  })
    .then(res => {
      localStorage.setItem('id', res.data.id);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      cogoToast.success('Successfully verified account', {
        hideAfter: 5,
      });
      return res.data
    })
    .catch(err => {
      cogoToast.error(err.response.data.errorMessage, {
        hideAfter: 5,
      });
      return err.response.data.errorMessage
    })
  return response
});

// API call to resend a new verification code upon account creation
export const resendUserAccountVerificationCode = createAsyncThunk('users/resendUserAccountVerificationCode', async (email) => {
  const response = await axios({
    method: 'post',
    url: process.env.REACT_APP_API + `auth/${email}/resend-verification`,
    headers: {
      Accept: 'application/json'
    }
  })
    .then(res => {
      cogoToast.success(res.data.message, {
        hideAfter: 5,
      });
      return res.data
    })
    .catch(err => {
      cogoToast.error(err.response.data.errorMessage, {
        hideAfter: 5,
      });
      return err.response.data.errorMessage
    })
  return response
});

// API call to request password reset
export const forgotPassword = createAsyncThunk('users/forgotPassword', async (credentials) => {
  try {
    const response = await axios({
      method: 'patch',
      url: process.env.REACT_APP_API + `auth/forgot-password`,
      headers: {
        Accept: 'application/json'
      }, data: {
        email: credentials.email.toLowerCase().replace(/ /g, "")
      }
    })
    cogoToast.success(response.data.message, {
      hideAfter: 5,
    });
    return response.data
  } catch (err) {
    cogoToast.error(err.response.data.error, {
      hideAfter: 5,
    });
    return isRejectedWithValue(err.response.data.error)
  }
});

// API call to update password
export const resetPassword = createAsyncThunk('users/resetPassword', async (credentials) => {
  const newPasswordToken = new URLSearchParams(window.location.search).get('key')

  try {
    const response = await axios({
      method: 'patch',
      url: process.env.REACT_APP_API + `auth/reset-password/${newPasswordToken}`,
      headers: {
        Accept: 'application/json'
      }, data: {
        password: credentials.password.replace(/ /g, "")
      }
    })
    cogoToast.success(response.data.message, {
      hideAfter: 5,
    });
    return response.data
  } catch (err) {
    cogoToast.error(err.response.data.message, {
      hideAfter: 5,
    });
    return isRejectedWithValue(err.response.data.message)
  }
});

// API call to delete/remove a user
export const deleteUser = createAsyncThunk('gamess/deleteUser', async (userId) => {
  try {
    const response = await axios({
      method: 'delete',
      url: process.env.REACT_APP_API + `users/${userId}`,
      headers: {
        Accept: 'application/json',
        Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
      }
    })
    cogoToast.success('User successfully deleted!', {
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

// API call to ban a user from the site
export const banUser = createAsyncThunk('users/banUser', async (userId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'put',
      url: process.env.REACT_APP_API + `users/${userId}`,
      headers: {
        Accept: 'application/json',
        Authorization: token
      }, data: {
        is_banned: true
      }
    })
    cogoToast.success('User successfully banned!', {
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

// API call to unban a user from the site
export const unbanUser = createAsyncThunk('users/unbanUser', async (userId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios({
      method: 'put',
      url: process.env.REACT_APP_API + `users/${userId}`,
      headers: {
        Accept: 'application/json',
        Authorization: token
      }, data: {
        is_banned: false
      }
    })
    cogoToast.success('User successfully unbanned!', {
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

// API call to send a contact email
export const contactUsEmail = createAsyncThunk('users/contactUsEmail', async (data) => {
  try {
    const response = await axios({
      method: 'patch',
      url: process.env.REACT_APP_API + `auth/contact-email`,
      headers: {
        Accept: 'application/json'
      }, data: {
        email: data.email,
        subject: data.subject.label,
        message: data.message
      }
    })
    cogoToast.success(response.data.message, {
      hideAfter: 5,
    });
    return response.data
  } catch (err) {
    cogoToast.error(err.response.data.message, {
      hideAfter: 5,
    });
    return isRejectedWithValue(err.response.data.message)
  }
});

// API call to update a user's profile
export const updateUser = createAsyncThunk('users/updateUser', async (data) => {
  const token = localStorage.getItem('token');
  const userId = data.admin_override ? data.user_id : localStorage.getItem('id')

  try {
    const response = await axios({
      method: 'put',
      url: process.env.REACT_APP_API + `users/${userId}`,
      headers: {
        Accept: 'application/json',
        Authorization: token
      }, data: {
        profile_pic_URL: data.profile_pic_URL,
        banner_pic_URL: data.banner_pic_URL,
        twitter_URL: data.twitter_URL,
        twitch_URL: data.twitch_URL,
        discord_URL: data.discord_URL,
        youtube_URL: data.youtube_URL,
        profile_color_one: data.profile_color_one,
        profile_color_two: data.profile_color_two
      }
    })
    cogoToast.success('Profile updated!', {
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

// API call to find out if a signed in user is banned
export const fetchFindIfUserBannedByUsername = createAsyncThunk('users/fetchFindIfUserBannedByUsername', async (username) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `users/username/${username}/banned`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
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
    },
    [fetchBannedUsers.pending]: (state, action) => {
      state.loading = true
    },
    [fetchBannedUsers.fulfilled]: (state, { payload }) => {
      state.banned_users = payload
      state.loading = false
      state.error = false
    },
    [fetchBannedUsers.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUsersWithGameExperience.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUsersWithGameExperience.fulfilled]: (state, { payload }) => {
      state.users_with_game_experience = payload
      state.loading = false
      state.error = false
    },
    [fetchUsersWithGameExperience.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserFollowings.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserFollowings.fulfilled]: (state, { payload }) => {
      state.user_followings = payload
      state.loading = false
      state.error = false
    },
    [fetchUserFollowings.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserFollowers.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserFollowers.fulfilled]: (state, { payload }) => {
      state.user_followers = payload
      state.loading = false
      state.error = false
    },
    [fetchUserFollowers.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchCheckIfFollowingUser.pending]: (state, action) => {
      state.loading = true
    },
    [fetchCheckIfFollowingUser.fulfilled]: (state, { payload }) => {
      state.is_following_user = payload
      state.loading = false
      state.error = false
    },
    [fetchCheckIfFollowingUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserById.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserById.fulfilled]: (state, { payload }) => {
      state.user = payload
      state.loading = false
      state.error = false
    },
    [fetchUserById.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserByUsername.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserByUsername.fulfilled]: (state, { payload }) => {
      state.user = payload
      state.loading = false
      state.error = false
    },
    [fetchUserByUsername.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserAdminStatus.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserAdminStatus.fulfilled]: (state, { payload }) => {
      state.user_admin = payload
      state.loading = false
      state.error = false
    },
    [fetchUserAdminStatus.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserEXPForAllGames.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserEXPForAllGames.fulfilled]: (state, { payload }) => {
      state.user_experience_points = payload
      state.loading = false
      state.error = false
    },
    [fetchUserEXPForAllGames.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchUserEXPForGameById.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUserEXPForGameById.fulfilled]: (state, { payload }) => {
      state.user_game_experience_points = payload
      state.loading = false
      state.error = false
    },
    [fetchUserEXPForGameById.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [followUser.pending]: (state, action) => {
      state.loading = true
    },
    [followUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [followUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [unfollowUser.pending]: (state, action) => {
      state.loading = true
    },
    [unfollowUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [unfollowUser.rejected]: (state, action) => {
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
    },
    [verifyUser.pending]: (state, action) => {
      state.loading = true
    },
    [verifyUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [verifyUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [resendUserAccountVerificationCode.pending]: (state, action) => {
      state.loading = true
    },
    [resendUserAccountVerificationCode.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [resendUserAccountVerificationCode.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [forgotPassword.pending]: (state, action) => {
      state.loading = true
    },
    [forgotPassword.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [resetPassword.pending]: (state, action) => {
      state.loading = true
    },
    [resetPassword.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true
    },
    [deleteUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [banUser.pending]: (state, action) => {
      state.loading = true
    },
    [banUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [banUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [unbanUser.pending]: (state, action) => {
      state.loading = true
    },
    [unbanUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [unbanUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [contactUsEmail.pending]: (state, action) => {
      state.loading = true
    },
    [contactUsEmail.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [contactUsEmail.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true
    },
    [updateUser.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchFindIfUserBannedByUsername.pending]: (state, action) => {
      state.loading = true
    },
    [fetchFindIfUserBannedByUsername.fulfilled]: (state, { payload }) => {
      state.user_is_banned = payload
      state.loading = false
      state.error = false
    },
    [fetchFindIfUserBannedByUsername.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const userSelector = state => state.users

// The reducer
export default userSlice.reducer;