import { api } from "@/shared/config/store/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<
      { id: string; email: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation<
      { access_token: string },
      { username: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body: new URLSearchParams(body),
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useSigninMutation } = authApi;
