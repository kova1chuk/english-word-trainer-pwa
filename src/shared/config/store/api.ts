import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from ".";

const API_URL = "https://d1tezlh4qfat0a.cloudfront.net";

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
  tagTypes: ["Auth", "Profile", "Dictionary", "Words"],
  endpoints: () => ({}),
});
