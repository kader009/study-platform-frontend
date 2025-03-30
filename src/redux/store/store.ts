import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../features/authentication/registerSlice';
import loginReducer from '../features/authentication/loginSlice';

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
