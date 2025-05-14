import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from ".";

const API_URL =
  "http://word-trainer-alb-200052989.eu-central-1.elb.amazonaws.com";

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

      headers.set("Content-Type", "application/json");
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    fetchFn: async (input, init) => {
      const config = init || {};

      config.referrerPolicy = "strict-origin-when-cross-origin";

      return fetch(input, config);
    },
  }),
  tagTypes: ["Auth", "Words", "User"],
  endpoints: () => ({}),
});
