import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  users: [],
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    getUsers: state => {
      state.loading = true
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload
      state.loading = false
      state.error = false
    },
    getUsersFailure: state => {
      state.loading = false
      state.error = true
    },
  },
  // reducers: {
  //   getUser: (state, action) => {
  //     // state.users = action.payload;
  //     state.loading = true;
  //     state.error = false;
  //   },
  //   createUser: (state, action) => {
  //     state.users.unshift(action.payload);
  //     state.loading = false;
  //   },
  //   deleteUser: (state, action) => {
  //     state.users.filter((user) => user.id !== action.payload.id);
  //     state.loading = false;
  //   },
  // },
  // extraReducers: {
  //   [GetUsers.fulfilled]: (state, action) => {
  //     state.users = action.payload.data;
  //   }
  // }
});

// Three actions generated from the slice
export const { getUsers, getUsersSuccess, getUsersFailure } = userSlice.actions;

// A selector
export const userSelector = state => state.users

// Asynchronous thunk action
export function fetchUsers() {
  return async dispatch => {
    dispatch(getUsers())

    await axios({
      method: 'get',
      url: `https://music-chunks-test-server.herokuapp.com/api/users`,
      headers: {
        Accept: 'application/json',
        Authorization: `fnAD22PlewACAJNhiqikiSxV60EEH3A3N7xdBAi1`,
      },
    })
      .then(res => {
        dispatch(getUsersSuccess(res.data))
      })
      .catch(err => {
        dispatch(getUsersFailure())
      })
  }
}
// export const fetchUsers = createAsyncThunk(
//   'user/getUsers',
//   async () => await axios.get(`https://music-chunks-test-server.herokuapp.com/api/users`)
// );

// thunk
// const fetchUsers = () => async dispatch => {
//   dispatch(getUser())
//   const response = await usersAPI.fetchAll()
//   dispatch(fetchItemsSuccess(response.data))
// }

// The reducer
export default userSlice.reducer;