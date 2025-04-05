import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sessionprops {
  sessionTitle: string;
  tutorName: string;
  sessionDescription: string;
  registrationStartDate: string;
  registrationEndDate: string;
  classStartTime: string;
  classEndDate: string;
  sessionDuration: string;
  registrationFee: string;
  status: string;
}

const initialState: Sessionprops = {
  sessionTitle: '',
  tutorName: '',
  sessionDescription: '',
  registrationStartDate: '',
  registrationEndDate: '',
  classStartTime: '',
  classEndDate: '',
  sessionDuration: '',
  registrationFee: '',
  status: '',
};

const createSessionSlice = createSlice({
  name: 'session-create',
  initialState,
  reducers: {
    SetSessionTitle: (state, action: PayloadAction<string>) => {
      state.sessionTitle = action.payload;
    },

    SettutorName: (state, action: PayloadAction<string>) => {
      state.tutorName = action.payload;
    },

    SetsessionDescription: (state, action: PayloadAction<string>) => {
      state.sessionDescription = action.payload;
    },

    SetregistrationStartDate: (state, action: PayloadAction<string>) => {
      state.registrationStartDate = action.payload;
    },

    SetregistrationEndDate: (state, action: PayloadAction<string>) => {
      state.registrationEndDate = action.payload;
    },

    SetclassStartTime: (state, action: PayloadAction<string>) => {
      state.classStartTime = action.payload;
    },

    SetclassEndDate: (state, action: PayloadAction<string>) => {
      state.classEndDate = action.payload;
    },

    SetsessionDuration: (state, action: PayloadAction<string>) => {
      state.sessionDuration = action.payload;
    },

    SetregistrationFee: (state, action: PayloadAction<string>) => {
      state.registrationFee = action.payload;
    },
  },
});

export const {
  SetSessionTitle,
  SetclassEndDate,
  SetclassStartTime,
  SetregistrationEndDate,
  SetregistrationFee,
  SetregistrationStartDate,
  SetsessionDescription,
  SetsessionDuration,
  SettutorName,
} = createSessionSlice.actions;

export default createSessionSlice.reducer;
