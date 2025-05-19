import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { addPendingChange } from "@/shared/lib/utils/pendingChanges";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface Word {
  id: string;
  word: string;
  translation: string;
  examples: string[];
  lastReviewed: Date;
  nextReview: Date;
}

export interface WordsState {
  items: Word[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WordsState = {
  items: [],
  status: "idle",
  error: null,
};

// Async thunks
export const fetchWords = createAsyncThunk("words/fetchWords", async () => {
  // Replace with your actual API call
  const response = await fetch("/api/words");
  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }
  return response.json();
});

export const addWord = createAsyncThunk(
  "words/addWord",
  async (word: Omit<Word, "id" | "lastReviewed" | "nextReview">) => {
    // Replace with your actual API call
    const response = await fetch("/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(word),
    });
    if (!response.ok) {
      throw new Error("Failed to add word");
    }
    return response.json();
  },
);

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    updateWord: (state, action: PayloadAction<Word>) => {
      const index = state.items.findIndex(
        (word) => word.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        // Add to pending changes if offline
        if (!navigator.onLine) {
          addPendingChange({ type: "update", data: action.payload });
        }
      }
    },
    deleteWord: (state, action: PayloadAction<string>) => {
      const wordToDelete = state.items.find(
        (word) => word.id === action.payload,
      );
      state.items = state.items.filter((word) => word.id !== action.payload);
      // Add to pending changes if offline
      if (!navigator.onLine && wordToDelete) {
        addPendingChange({ type: "delete", data: action.payload });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchWords
      .addCase(fetchWords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch words";
      })
      // Handle addWord
      .addCase(addWord.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { updateWord, deleteWord } = wordsSlice.actions;
export default wordsSlice.reducer;
