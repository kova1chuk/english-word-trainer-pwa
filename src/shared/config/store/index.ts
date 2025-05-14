import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/store/slice";
import themeReducer from "@/shared/theme/model/themeStore";

import { api } from "./api";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
