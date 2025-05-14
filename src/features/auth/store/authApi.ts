import { api } from "@/shared/config/store/api";

import { setToken } from "./slice";

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
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
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
