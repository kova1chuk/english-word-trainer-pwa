import type {
  PaginatedResponse,
  PaginationParams,
} from "@/features/words/types";
import type { ApiError } from "@/shared/config/store/api";

export type DifficultyLevel = "easy" | "medium" | "hard";

export interface DictionaryEntry {
  id: number;
  text: string;
  meaning: string;
  example?: string | null;
  pronunciation?: string | null;
  difficulty: DifficultyLevel;
  language: string;
}

export interface DictionaryCreate {
  text: string;
  meaning: string;
  example?: string | null;
  pronunciation?: string | null;
  difficulty: DifficultyLevel;
  language: string;
}

export interface DictionaryRead extends DictionaryCreate {
  id: number;
}

export interface DictionaryQueryParams {
  skip?: number;
  limit?: number;
  language?: string | null;
  search?: string | null;
  difficulty?: string | null;
}

export type { PaginatedResponse, PaginationParams };
export type { ApiError };
