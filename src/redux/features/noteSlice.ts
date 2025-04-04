import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Noteprops {
  email: string;
  title: string;
  description: string;
}

const initialState: Noteprops = {
  email: '',
  title: '',
  description: '',
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const { setEmail, setTitle, setDescription } = noteSlice.actions;

export default noteSlice.reducer;
