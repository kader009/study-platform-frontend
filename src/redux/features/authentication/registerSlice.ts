import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Register {
  name: string;
  email: string;
  photoUrl: string;
  password: string;
  role: string;
}

const initialState: Register = {
  name: '',
  email: '',
  photoUrl: '',
  password: '',
  role: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    SetName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    SetEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    SetPhotoUrl: (state, action: PayloadAction<string>) => {
      state.photoUrl = action.payload;
    },

    SetPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    SetRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

export const { SetName, SetEmail, SetPhotoUrl, SetPassword, SetRole } =
  registerSlice.actions;

export default registerSlice.reducer;
