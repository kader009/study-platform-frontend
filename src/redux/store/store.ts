import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import registerReducer from '../features/authentication/registerSlice';
import loginReducer from '../features/authentication/loginSlice';
import userReducer from '../features/authentication/userSlice';
import noteReducer from '../features/noteSlice';
import materialReducer from '../features/uploadMaterial';
import updatematerialReducer from '../features/updateMaterial';
import createSessionReducer from '../features/createSessionSlice';
import { baseApi } from '../baseApi';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  note: noteReducer,
  createSession: createSessionReducer,
  uploadMaterial: materialReducer,
  updateMaterial: updatematerialReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
