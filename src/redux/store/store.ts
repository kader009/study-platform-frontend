import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../features/authentication/registerSlice';
import loginReducer from '../features/authentication/loginSlice';
import { baseApi } from '../baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    register: registerReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
