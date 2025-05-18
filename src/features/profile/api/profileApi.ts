import { api } from "@/shared/config/store/api";

import type { ProfileCreate, ProfileRead, ProfileUpdate } from "../types";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileRead, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    createProfile: builder.mutation<ProfileRead, ProfileCreate>({
      query: (data) => ({
        url: "/profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ProfileRead, ProfileUpdate>({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} = profileApi;
