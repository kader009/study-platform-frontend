import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Materials {
  MaterialTitle: string;
  SessionId: string;
  TutorEmail: string;
  UploadImages: string;
  GoogledriveLink: string;
}

const initialState: Materials = {
  MaterialTitle: '',
  SessionId: '',
  TutorEmail: '',
  UploadImages: '',
  GoogledriveLink: '',
};

const uploadMaterial = createSlice({
  name: 'upload material',
  initialState,
  reducers: {
    SetMaterialTitle: (state, action: PayloadAction<string>) => {
      state.MaterialTitle = action.payload;
    },

    SetSessionId: (state, action: PayloadAction<string>) => {
      state.SessionId = action.payload;
    },

    SetTutorEmail: (state, action: PayloadAction<string>) => {
      state.TutorEmail = action.payload;
    },

    SetUploadImages: (state, action: PayloadAction<string>) => {
      state.UploadImages = action.payload;
    },

    SetGoogledriveLink: (state, action: PayloadAction<string>) => {
      state.GoogledriveLink = action.payload;
    },
  },
});

export const {
  SetGoogledriveLink,
  SetMaterialTitle,
  SetSessionId,
  SetTutorEmail,
  SetUploadImages,
} = uploadMaterial.actions;

export default uploadMaterial.reducer;
