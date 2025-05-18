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
