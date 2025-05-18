import { api } from "@/shared/config/store/api";

import type {
  ApiError,
  Statistics,
  WordCreate,
  WordRead,
  WordUpdate,
  WordStats,
  WordQueryParams,
} from "../types";

export const wordsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserWords: builder.query<WordRead[], WordQueryParams>({
      query: (params) => ({
        url: "/words",
        method: "GET",
        params,
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      providesTags: ["Words"],
    }),

    getWord: builder.query<WordRead, number>({
      query: (id) => ({
        url: `/words/${id}`,
        method: "GET",
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      providesTags: ["Words"],
    }),

    createWord: builder.mutation<WordRead, WordCreate>({
      query: (data) => ({
        url: "/words",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      invalidatesTags: ["Words"],
    }),

    updateWord: builder.mutation<WordRead, { id: number; data: WordUpdate }>({
      query: ({ id, data }) => ({
        url: `/words/${id}`,
        method: "PUT",
        body: data,
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      invalidatesTags: ["Words"],
    }),

    deleteWord: builder.mutation<void, number>({
      query: (id) => ({
        url: `/words/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      invalidatesTags: ["Words"],
    }),

    getWordStats: builder.query<WordStats, number>({
      query: (id) => ({
        url: `/words/${id}/stats`,
        method: "GET",
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      providesTags: ["Words"],
    }),

    getStatistics: builder.query<Statistics, void>({
      query: () => ({
        url: "/words/statistics",
        method: "GET",
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      providesTags: ["Words"],
    }),

    submitPracticeSession: builder.mutation<
      void,
      { id: number; correct: boolean }
    >({
      query: ({ id, correct }) => ({
        url: `/words/${id}/practice`,
        method: "POST",
        params: { correct },
      }),
      transformErrorResponse: (response): ApiError => response.data as ApiError,
      invalidatesTags: ["Words"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserWordsQuery,
  useGetWordQuery,
  useCreateWordMutation,
  useUpdateWordMutation,
  useDeleteWordMutation,
  useGetWordStatsQuery,
  useGetStatisticsQuery,
  useSubmitPracticeSessionMutation,
} = wordsApi;
