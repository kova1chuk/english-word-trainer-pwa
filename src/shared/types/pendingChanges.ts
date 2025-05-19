import type { Word } from "@/features/words/wordsSlice";

export interface PendingChange {
  type: "add" | "update" | "delete";
  data: Word | string;
}
