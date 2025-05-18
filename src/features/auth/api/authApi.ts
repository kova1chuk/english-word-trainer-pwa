import { api } from "@/shared/config/store/api";

import type { SignInRequest, SignUpRequest, Token, UserRead } from "../types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<UserRead, SignUpRequest>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    signIn: builder.mutation<Token, SignInRequest>({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: data.email,
          password: data.password,
          grant_type: "password",
        }),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation, useSignInMutation } = authApi;
