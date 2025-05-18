import { api } from "@/shared/config/store/api";

import type {
  DictionaryCreate,
  DictionaryRead,
  DictionaryQueryParams,
} from "../types";

export const dictionaryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDictionaryEntries: builder.query<
      DictionaryRead[],
      DictionaryQueryParams
    >({
      query: (params) => ({
        url: "/dictionary",
        method: "GET",
        params,
      }),
      providesTags: ["Dictionary"],
    }),

    getDictionaryEntry: builder.query<DictionaryRead, number>({
      query: (id) => ({
        url: `/dictionary/${id}`,
        method: "GET",
      }),
      providesTags: ["Dictionary"],
    }),

    createDictionaryEntry: builder.mutation<DictionaryRead, DictionaryCreate>({
      query: (data) => ({
        url: "/dictionary",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dictionary"],
    }),

    updateDictionaryEntry: builder.mutation<
      DictionaryRead,
      { id: number; data: DictionaryCreate }
    >({
      query: ({ id, data }) => ({
        url: `/dictionary/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Dictionary"],
    }),

    deleteDictionaryEntry: builder.mutation<void, number>({
      query: (id) => ({
        url: `/dictionary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dictionary"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDictionaryEntriesQuery,
  useGetDictionaryEntryQuery,
  useCreateDictionaryEntryMutation,
  useUpdateDictionaryEntryMutation,
  useDeleteDictionaryEntryMutation,
} = dictionaryApi;
