import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sessionprops {
  sessionTitle: string;
  tutorName: string;
  tutorEmail: string;
  sessionDescription: string;
  registrationStartDate: string;
  registrationEndDate: string;
  classStartDate: string;
  classEndDate: string;
  sessionDuration: string;
  registrationFee: string;
  status: string;
}

const initialState: Sessionprops = {
  sessionTitle: '',
  tutorName: '',
  tutorEmail: '',
  sessionDescription: '',
  registrationStartDate: '',
  registrationEndDate: '',
  classStartDate: '',
  classEndDate: '',
  sessionDuration: '',
  registrationFee: '0',
  status: 'pending',
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

    SettutorEmail: (state, action: PayloadAction<string>) => {
      state.tutorEmail = action.payload;
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

    SetclassStartDate: (state, action: PayloadAction<string>) => {
      state.classStartDate = action.payload;
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

    SetStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },

    // Reset all fields to initial state
    resetSessionForm: (state) => {
      state.sessionTitle = '';
      state.sessionDescription = '';
      state.registrationStartDate = '';
      state.registrationEndDate = '';
      state.classStartDate = '';
      state.classEndDate = '';
      state.sessionDuration = '';
      state.registrationFee = '0';
      state.status = 'pending';
    },
  },
});

export const {
  SetSessionTitle,
  SetclassEndDate,
  SetclassStartDate,
  SetregistrationEndDate,
  SetregistrationFee,
  SetregistrationStartDate,
  SetsessionDescription,
  SetsessionDuration,
  SettutorName,
  SetStatus,
  SettutorEmail,
  resetSessionForm,
} = createSessionSlice.actions;

export default createSessionSlice.reducer;
