import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { updateWord, deleteWord } from "@/features/words/wordsSlice";
import {
  getPendingChanges,
  clearPendingChanges,
} from "@/shared/lib/utils/pendingChanges";

import type { Word } from "@/features/words/wordsSlice";

export const useOfflineSync = () => {
  const dispatch = useDispatch();
  const isOnline = navigator.onLine;

  const syncPendingChanges = useCallback(async () => {
    if (!isOnline) return;

    try {
      const pendingChanges = getPendingChanges();
      if (!pendingChanges.length) return;

      // Process pending changes in order
      for (const change of pendingChanges) {
        switch (change.type) {
          case "add":
            // Call your API to add the word
            // await api.addWord(change.data as Word);
            break;
          case "update":
            dispatch(updateWord(change.data as Word));
            break;
          case "delete":
            dispatch(deleteWord(change.data as string));
            break;
        }
      }

      // Clear pending changes after successful sync
      clearPendingChanges();
    } catch (error) {
      console.error("Failed to sync pending changes:", error);
    }
  }, [dispatch, isOnline]);

  useEffect(() => {
    const handleOnline = () => {
      syncPendingChanges();
    };

    window.addEventListener("online", handleOnline);

    // Initial sync if online
    if (isOnline) {
      syncPendingChanges();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [syncPendingChanges, isOnline]);

  return {
    isOnline,
    syncPendingChanges,
  };
};
