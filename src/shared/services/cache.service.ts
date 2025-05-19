import { openDB } from "idb";

import type { DBSchema, IDBPDatabase } from "idb";

interface WordTrainerDB extends DBSchema {
  words: {
    key: string;
    value: {
      id: string;
      word: string;
      translation: string;
      examples: string[];
      lastReviewed: Date;
      nextReview: Date;
    };
    indexes: { "by-next-review": Date };
  };
  cache: {
    key: string;
    value: {
      data: unknown;
      timestamp: number;
      expiry: number;
    };
  };
}

class CacheService {
  private db: IDBPDatabase<WordTrainerDB> | null = null;
  private readonly CACHE_NAME = "word-trainer-cache-v1";
  private readonly DB_NAME = "word-trainer-db";
  private readonly DB_VERSION = 1;

  async init() {
    this.db = await openDB<WordTrainerDB>(this.DB_NAME, this.DB_VERSION, {
      upgrade(db) {
        // Create words store
        const wordStore = db.createObjectStore("words", { keyPath: "id" });
        wordStore.createIndex("by-next-review", "nextReview");

        // Create cache store
        db.createObjectStore("cache");
      },
    });
  }

  // Cache API methods
  async cacheResponse(request: Request, response: Response) {
    const cache = await caches.open(this.CACHE_NAME);
    await cache.put(request, response.clone());
  }

  async getCachedResponse(request: Request): Promise<Response | undefined> {
    const cache = await caches.open(this.CACHE_NAME);
    return cache.match(request);
  }

  // IndexedDB methods for words
  async saveWord(word: WordTrainerDB["words"]["value"]) {
    if (!this.db) await this.init();
    await this.db!.put("words", word);
  }

  async getWord(id: string) {
    if (!this.db) await this.init();
    return this.db!.get("words", id);
  }

  async getWordsForReview() {
    if (!this.db) await this.init();
    const now = new Date();
    return this.db!.getAllFromIndex(
      "words",
      "by-next-review",
      IDBKeyRange.upperBound(now),
    );
  }

  // Generic cache methods
  async setCache<T>(key: string, data: T, expiryMinutes = 60) {
    if (!this.db) await this.init();
    const item = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + expiryMinutes * 60 * 1000,
    };
    await this.db!.put("cache", item, key);
  }

  async getCache<T>(key: string): Promise<T | null> {
    if (!this.db) await this.init();
    const item = await this.db!.get("cache", key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      await this.db!.delete("cache", key);
      return null;
    }
    return item.data as T;
  }

  // Stale-while-revalidate pattern
  async staleWhileRevalidate<T>(
    key: string,
    fetchFn: () => Promise<T>,
    expiryMinutes = 60,
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.getCache<T>(key);
    if (cached) {
      // Trigger revalidation in the background
      fetchFn().then(async (fresh) => {
        await this.setCache(key, fresh, expiryMinutes);
      });
      return cached;
    }

    // If not in cache, fetch fresh data
    const fresh = await fetchFn();
    await this.setCache(key, fresh, expiryMinutes);
    return fresh;
  }
}

export const cacheService = new CacheService();
