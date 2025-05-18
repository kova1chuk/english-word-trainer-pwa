import { api } from "@/shared/config/store/api";

import { setToken } from "./slice";

import type { ApiError, AuthResponse, SignInResponse } from "../types";
import type { SignInFormData, SignUpFormData } from "../validation/auth.schema";

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
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation<
      SignInResponse,
      Omit<SignInFormData, "confirmPassword">
    >({
      query: ({ email, password }) => {
        const formData = new FormData();
        formData.append("username", email); // FastAPI OAuth2 requirement
        formData.append("password", password);

        return {
          url: "/auth/signin",
          method: "POST",
          body: formData,
          // Don't set Content-Type, browser will set it with boundary for FormData
        };
      },
      transformErrorResponse: (response): ApiError => response.data as ApiError,
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
