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
  user: {},
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
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
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
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
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
    .then(res => {
      localStorage.setItem('id', res.data.id);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      cogoToast.success('Successfully logged in', {
        hideAfter: 3,
      });
      return res.data
    })
    .catch(err => {
      cogoToast.error(err.response.data.message, {
        hideAfter: 3,
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
      localStorage.setItem('id', res.data.id);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      cogoToast.success('Successfully created account', {
        hideAfter: 3,
      });
      return res.data
    })
    .catch(err => {
      cogoToast.error(err.response.data.errorMessage, {
        hideAfter: 3,
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
    }
  }
});

// A selector for grabbing state in components
export const userSelector = state => state.users

// The reducer
export default userSlice.reducer;