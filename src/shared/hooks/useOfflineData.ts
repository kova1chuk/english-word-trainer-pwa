import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cacheService } from "../services/cache.service";

import type {
  RootState,
  AppDispatch,
} from "@/app/providers/store/StoreProvider";
import type { Action } from "@reduxjs/toolkit";

interface UseOfflineDataOptions<T> {
  selector: (state: RootState) => T;
  action: (data: T) => Action;
  cacheKey: string;
  fetchFn: () => Promise<T>;
  expiryMinutes?: number;
}

export function useOfflineData<T>({
  selector,
  action,
  cacheKey,
  fetchFn,
  expiryMinutes = 60,
}: UseOfflineDataOptions<T>) {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selector);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch data with offline support
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await cacheService.staleWhileRevalidate(
        cacheKey,
        async () => {
          const freshData = await fetchFn();
          dispatch(action(freshData));
          return freshData;
        },
        expiryMinutes,
      );

      dispatch(action(result));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
    } finally {
      setIsLoading(false);
    }
  }, [cacheKey, dispatch, action, fetchFn, expiryMinutes]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sync data when coming back online
  useEffect(() => {
    if (isOnline) {
      fetchData();
    }
  }, [isOnline, fetchData]);

  return {
    data,
    isLoading,
    error,
    isOnline,
    refetch: fetchData,
  };
}
