import { api } from "@/shared/config/store/api";

import { setToken } from "./slice";

import type { SignInFormData, SignUpFormData } from "../validation/auth.schema";

interface AuthResponse {
  id: string;
  email: string;
}

interface SignInResponse {
  access_token: string;
}

interface ErrorResponse {
  message: string;
  statusCode: number;
}

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignUpFormData>({
      query: ({ email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
      transformErrorResponse: (response): ErrorResponse =>
        response.data as ErrorResponse,
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation<
      SignInResponse,
      Omit<SignInFormData, "confirmPassword">
    >({
      query: ({ email, password }) => ({
        url: "/auth/signin",
        method: "POST",
        body: new URLSearchParams({ username: email, password }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
      transformErrorResponse: (response): ErrorResponse =>
        response.data as ErrorResponse,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.access_token));
        } catch (error) {
          console.error("Failed to sign in:", error);
        }
      },
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useSigninMutation } = authApi;
