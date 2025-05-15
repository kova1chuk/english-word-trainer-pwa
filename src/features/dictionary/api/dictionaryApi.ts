import { baseApi } from "@/shared/api/baseApi";

import type {
  DictionaryEntry,
  PaginatedResponse,
  PaginationParams,
} from "@/shared/api/types";

interface DictionarySearchParams extends PaginationParams {
  query?: string;
  partOfSpeech?: string;
}

export const dictionaryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchDictionary: build.query<
      PaginatedResponse<DictionaryEntry>,
      DictionarySearchParams
    >({
      query: (params) => ({
        url: "/dictionary/search",
        method: "GET",
        params,
      }),
      providesTags: ["Dictionary"],
    }),
    getDictionaryEntry: build.query<DictionaryEntry, string>({
      query: (id) => `/dictionary/entries/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Dictionary", id }],
    }),
  }),
});

export const { useSearchDictionaryQuery, useGetDictionaryEntryQuery } =
  dictionaryApi;
