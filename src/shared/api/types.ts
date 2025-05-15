export interface Language {
  code: string;
  name: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErrorResponse {
  message: string;
  code?: string;
}

export interface Profile {
  id: string;
  name: string;
  native_language: Language;
  target_language: Language;
  created_at: string;
  updated_at: string;
}

export interface Word {
  id: string;
  original: string;
  translation: string;
  pronunciation?: string;
  examples: string[];
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  created_at: string;
  updated_at: string;
}

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

export interface PracticeSession {
  id: string;
  userId: string;
  wordId: string;
  correct: boolean;
  answer: string;
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
