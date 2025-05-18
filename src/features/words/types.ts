import type { DictionaryRead } from "../dictionary/types";
import type {
  DictionaryEntry,
  DifficultyLevel,
} from "@/features/dictionary/types";
import type { ApiError } from "@/shared/config/store/api";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Word {
  id: number;
  dictionary_id: number;
  personal_note?: string;
  created_at: string;
  updated_at: string;
  profile_id: string;
  dictionary_entry: DictionaryEntry;
}

export interface PracticeSession {
  id: string;
  wordId: string;
  answer: string;
  isCorrect: boolean;
  timeSpent: number;
  created_at: string;
}

export interface Statistics {
  totalWords: number;
  learnedWords: number;
  accuracy: number;
  averageTimePerWord: number;
  practiceSessionsCount: number;
  recentSessions: PracticeSession[];
  progressByDay: {
    date: string;
    learned: number;
    practiced: number;
  }[];
}

export interface WordCreate {
  dictionary_id: number;
  personal_note?: string | null;
}

export interface WordUpdate {
  personal_note?: string | null;
}

export interface WordRead {
  id: number;
  dictionary_id: number;
  personal_note?: string | null;
  created_at: string;
  updated_at: string;
  profile_id: string;
  dictionary_entry: DictionaryRead;
}

export interface WordStats {
  total_practices: number;
  correct_answers: number;
  success_rate: number;
  last_practiced: string | null;
}

export interface WordQueryParams {
  skip?: number;
  limit?: number;
  difficulty?: DifficultyLevel | null;
  search?: string | null;
}

export interface WordStatistics {
  total_practices: number;
  correct_answers: number;
  success_rate: number;
  last_practiced: string;
}

export interface PracticeResponse {
  status: "success";
}

export type { ApiError };
