import type {
  PaginatedResponse,
  PaginationParams,
} from "@/features/words/types";

export interface DictionaryEntry {
  id: string;
  word: string;
  phonetic: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
  examples: string[];
}

export type { PaginatedResponse, PaginationParams };
