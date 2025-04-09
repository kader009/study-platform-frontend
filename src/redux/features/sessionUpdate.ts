import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionUpdate {
  registrationFee: string;
}

const initialState: SessionUpdate = {
  registrationFee: '',
};

const sessionUpdate = createSlice({
  name: 'update session',
  initialState,
  reducers: {
    SetRegistrationFee: (state, action: PayloadAction<string>) => {
      state.registrationFee = action.payload;
    },
  },
});

export const { SetRegistrationFee } = sessionUpdate.actions;

export default sessionUpdate.reducer;
