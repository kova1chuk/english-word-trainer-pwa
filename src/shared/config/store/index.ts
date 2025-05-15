import { configureStore, type Store } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer, { type AuthState } from "@/features/auth/store/slice";
import themeReducer, { type ThemeState } from "@/shared/theme/model/themeStore";

import { api } from "./api";
import { persistConfig } from "./persistConfig";

interface StoreState {
  theme: ThemeState;
  auth: AuthState;
  [api.reducerPath]: ReturnType<typeof api.reducer>;
}

// Create persisted auth reducer
const persistedAuthReducer = persistReducer<AuthState>(
  persistConfig,
  authReducer,
);

// Create root reducer
const rootReducer = {
  theme: themeReducer,
  auth: persistedAuthReducer,
  [api.reducerPath]: api.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = StoreState;
export type AppDispatch = Store<RootState>["dispatch"];

export default store;
