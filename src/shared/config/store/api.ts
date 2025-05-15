import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from ".";

// Backend URL should match one of the allowed CORS origins
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

export interface ApiError {
  message: string;
  statusCode: number;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    credentials: "include", // This enables sending cookies in CORS requests
  }),
  tagTypes: ["Auth", "Words", "User"],
  endpoints: () => ({}),
});
