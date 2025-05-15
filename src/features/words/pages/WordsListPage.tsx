import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import Typography from "@/shared/ui/Typography";

import { useGetUserWordsQuery, useDeleteWordMutation } from "../api/wordsApi";

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const WordsListPage = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useGetUserWordsQuery({
    query,
    difficulty: difficulty as "easy" | "medium" | "hard" | undefined,
    page,
    limit,
  });

  const [deleteWord, { isLoading: isDeleting }] = useDeleteWordMutation();

  const handleDelete = async (id: string) => {
    await deleteWord(id).unwrap();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Typography variant="h1" className="mb-4">
          {t("words.list.title")}
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-600 dark:text-gray-300"
        >
          {t("words.list.description")}
        </Typography>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("words.list.searchPlaceholder")}
            className="flex-1"
          />
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={DIFFICULTY_OPTIONS}
            placeholder={t("words.list.filterByDifficulty")}
            className="w-48"
          />
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <Typography>{t("common.loading")}</Typography>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-500">
          <Typography>{t("common.error")}</Typography>
        </div>
      )}

      {data?.items.length === 0 && (
        <div className="text-center py-8">
          <Typography>{t("words.list.noWords")}</Typography>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.items.map((word) => (
          <div
            key={word.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <Typography variant="h3" className="mb-2">
                  {word.original}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-600 dark:text-gray-300"
                >
                  {word.translation}
                </Typography>
              </div>
              <Button
                color="warning"
                onClick={() => handleDelete(word.id)}
                disabled={isDeleting}
              >
                {t("common.delete")}
              </Button>
            </div>

            {word.pronunciation && (
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400 mb-2"
              >
                {word.pronunciation}
              </Typography>
            )}

            <div className="space-y-2">
              {word.examples.map((example, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  className="text-gray-600 dark:text-gray-300"
                >
                  • {example}
                </Typography>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {word.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default WordsListPage;
