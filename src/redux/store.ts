import { configureStore } from "@reduxjs/toolkit";
import musicAlbumReducer from "./features/albumSlices";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
const {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} = require ('redux-persist');

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  musicAlbum: musicAlbumReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

