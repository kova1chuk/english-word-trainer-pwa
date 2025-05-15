import { baseApi } from "@/shared/api/baseApi";

import type {
  PaginatedResponse,
  PaginationParams,
  PracticeSession,
  Statistics,
  Word,
} from "@/shared/api/types";

interface WordsSearchParams extends PaginationParams {
  query?: string;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
}

interface AddWordData {
  original: string;
  translation: string;
  pronunciation?: string;
  examples: string[];
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

interface PracticeSessionData {
  wordId: string;
  answer: string;
  timeSpent: number;
}

export const wordsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserWords: build.query<PaginatedResponse<Word>, WordsSearchParams>({
      query: (params) => ({
        url: "/words",
        method: "GET",
        params,
      }),
      providesTags: ["Words"],
    }),
    addWord: build.mutation<Word, AddWordData>({
      query: (data) => ({
        url: "/words",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Words"],
    }),
    updateWord: build.mutation<
      Word,
      { id: string; data: Partial<AddWordData> }
    >({
      query: ({ id, data }) => ({
        url: `/words/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Words",
        { type: "Words", id },
      ],
    }),
    deleteWord: build.mutation<void, string>({
      query: (id) => ({
        url: `/words/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Words"],
    }),
    submitPracticeSession: build.mutation<PracticeSession, PracticeSessionData>(
      {
        query: (data) => ({
          url: "/practice/sessions",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Practice", "Statistics"],
      },
    ),
    getStatistics: build.query<Statistics, void>({
      query: () => "/statistics",
      providesTags: ["Statistics"],
    }),
  }),
});

export const {
  useGetUserWordsQuery,
  useAddWordMutation,
  useUpdateWordMutation,
  useDeleteWordMutation,
  useSubmitPracticeSessionMutation,
  useGetStatisticsQuery,
} = wordsApi;
