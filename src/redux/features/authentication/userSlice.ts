import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async (obj) => {
  const request = await axios.post(`http://localhost:5000/api/v1/login`, obj);
  const response = request.data.data;
  localStorage.setItem('user', JSON.stringify(response));
  return response;
});

interface User {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem('user');
        if (action.error?.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid username or password';
        } else {
          state.error = action.error?.message ?? null;
        }
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
