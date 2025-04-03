import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async (obj) => {
  const request = await axios.post(`http://localhost:5000/api/v1/login`, obj);
  const response = await request.data.data;
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
  error: null;
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
