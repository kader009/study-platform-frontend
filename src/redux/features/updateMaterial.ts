import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MaterialProps {
  MaterialTitle: string;
  UploadImages: string;
  GoogledriveLink: string;
}

const initialState: MaterialProps = {
  MaterialTitle: '',
  UploadImages: '',
  GoogledriveLink: '',
};

const updateMaterial = createSlice({
  name: 'update material',
  initialState,
  reducers: {
    SetMaterialtitle: (state, action: PayloadAction<string>) => {
      state.MaterialTitle = action.payload;
    },

    SetUploadImages: (state, action: PayloadAction<string>) => {
      state.UploadImages = action.payload;
    },

    SetGoogledriveLink: (state, action: PayloadAction<string>) => {
      state.GoogledriveLink = action.payload;
    },
  },
});

export const { SetGoogledriveLink, SetMaterialtitle, SetUploadImages } =
  updateMaterial.actions;

export default updateMaterial.reducer;
