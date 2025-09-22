import {
  combineReducers,
  configureStore as configureStoreRTK,
} from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { baseApi } from "./slices/baseApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Persistor,
} from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { recruitmentApi } from "./slices/recruitmentAction";

const createNoopStorage = () => {
  return {
    // eslint-disable-next-line no-unused-vars -- API compliance requires parameter name
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    // eslint-disable-next-line no-unused-vars -- API compliance requires parameter name
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    // eslint-disable-next-line no-unused-vars -- API compliance requires parameter name
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [recruitmentApi.reducerPath]: recruitmentApi.reducer,
  })
);

// Configure Redux store
const store = configureStoreRTK({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, recruitmentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppPersistor = Persistor;

// Create persistor
export const persistor = persistStore(store);

export default store;
