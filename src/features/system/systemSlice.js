import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ----------------------------------------------------------------------------------
// --------------------------------- SYSTEM SLICE -----------------------------------
// ----------------------------------------------------------------------------------

// Initial state
export const initialState = {
  systems: [],
  system: {},
  challenges: [],
  loading: false,
  error: false,
};

// API call to grab all systems
export const fetchSystems = createAsyncThunk('systems/fetchSystems', async () => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `systems`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// API call to grab a single system by ID
export const fetchSystemById = createAsyncThunk('systems/fetchSystemById', async (systemId) => {
  const response = await axios({
    method: 'get',
    url: process.env.REACT_APP_API + `systems/${systemId}`,
    headers: {
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
    },
  })
  return response.data
});

// System slice for state change
export const systemSlice = createSlice({
  name: 'systems',
  initialState: initialState,
  extraReducers: {
    [fetchSystems.pending]: (state, action) => {
      state.loading = true
    },
    [fetchSystems.fulfilled]: (state, { payload }) => {
      state.systems = payload
      state.loading = false
      state.error = false
    },
    [fetchSystems.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    },
    [fetchSystemById.pending]: (state, action) => {
      state.loading = true
    },
    [fetchSystemById.fulfilled]: (state, { payload }) => {
      state.system = payload
      state.loading = false
      state.error = false
    },
    [fetchSystemById.rejected]: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
});

// A selector for grabbing state in components
export const systemSelector = state => state.systems

// The reducer
export default systemSlice.reducer;