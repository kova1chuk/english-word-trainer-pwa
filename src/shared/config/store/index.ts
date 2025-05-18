import { configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";

import authReducer from "@/features/auth/store/slice";
import themeReducer from "@/shared/theme/model/themeStore";

import { api } from "./api";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isAuthenticated"],
};

const themePersistConfig = {
  key: "theme",
  storage,
  whitelist: ["currentTheme"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    theme: persistedThemeReducer,
    [api.reducerPath]: api.reducer,
  },
  preloadedState: {
    theme: {
      currentTheme: localStorage.getItem("theme") || "light",
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
