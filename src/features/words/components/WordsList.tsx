import { useOfflineData } from "@/shared/hooks/useOfflineData";

import { fetchWords, type Word } from "../wordsSlice";

import type { RootState } from "@/app/providers/store/StoreProvider";

export const WordsList = () => {
  const {
    data: words,
    isLoading,
    error,
    isOnline,
    refetch,
  } = useOfflineData<Word[]>({
    selector: (state: RootState) => state.words.items,
    action: (data) => fetchWords.fulfilled(data, ""),
    cacheKey: "words-list",
    fetchFn: async () => {
      const response = await fetch("/api/words");
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      return response.json();
    },
    expiryMinutes: 30, // Cache for 30 minutes
  });

  // Show offline indicator
  if (!isOnline) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg mb-4">
        You're offline. Some features may be limited.
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return <div>Loading words...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-lg">
        Error: {error.message}
        <button
          onClick={refetch}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Show words list
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Words</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {words.length === 0 ? (
        <p className="text-gray-500">No words added yet.</p>
      ) : (
        <ul className="space-y-4">
          {words.map((word) => (
            <li
              key={word.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{word.word}</h3>
                  <p className="text-gray-600">{word.translation}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Next review: {new Date(word.nextReview).toLocaleDateString()}
                </div>
              </div>
              {word.examples.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Examples:
                  </h4>
                  <ul className="mt-1 space-y-1">
                    {word.examples.map((example, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
