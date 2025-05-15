import { api } from "@/shared/config/store/api";

import type {
  ApiError,
  CreateProfileRequest,
  Profile,
  UpdateProfileRequest,
} from "../types";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation<Profile, CreateProfileRequest>({
      query: (data) => ({
        url: "/profile",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      invalidatesTags: ["Profile"],
    }),

    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<Profile, UpdateProfileRequest>({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
