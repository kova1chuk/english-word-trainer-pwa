import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ErrorResponse } from "./types";

const API_URL = "https://d1tezlh4qfat0a.cloudfront.net";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile", "Words", "Dictionary", "Practice", "Statistics"],
  endpoints: () => ({}),
});

export const handleError = (error: unknown): ErrorResponse => {
  if (error && typeof error === "object" && "data" in error) {
    return error.data as ErrorResponse;
  }
  return { message: "An unexpected error occurred" };
};
