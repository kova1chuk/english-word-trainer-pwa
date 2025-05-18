import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { env } from "../env";

import type { RootState } from ".";

export interface ApiError {
  message: string;
  statusCode: number;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.api.url,
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
