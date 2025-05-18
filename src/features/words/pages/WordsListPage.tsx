import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import Typography from "@/shared/ui/Typography";

import { useGetUserWordsQuery, useDeleteWordMutation } from "../api/wordsApi";

import type { DifficultyLevel } from "@/features/dictionary/types";

const DIFFICULTY_OPTIONS = [
  { value: "", label: "All" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const WordsListPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel | "">("");
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const {
    data: words,
    isLoading,
    error,
  } = useGetUserWordsQuery({
    search: search || undefined,
    difficulty: difficulty || undefined,
    skip,
    limit,
  });

  const [deleteWord, { isLoading: isDeleting }] = useDeleteWordMutation();

  const handleDelete = async (id: number) => {
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("words.list.searchPlaceholder")}
            className="flex-1"
          />
          <Select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value as DifficultyLevel | "")
            }
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

      {words?.length === 0 && (
        <div className="text-center py-8">
          <Typography>{t("words.list.noWords")}</Typography>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {words?.map((word) => (
          <div
            key={word.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <Typography variant="h3" className="mb-2">
                  {word.dictionary_entry.text}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-600 dark:text-gray-300"
                >
                  {word.dictionary_entry.meaning}
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

            {word.dictionary_entry.pronunciation && (
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400 mb-2"
              >
                {word.dictionary_entry.pronunciation}
              </Typography>
            )}

            {word.dictionary_entry.example && (
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                • {word.dictionary_entry.example}
              </Typography>
            )}

            {word.personal_note && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <Typography
                  variant="subtitle2"
                  className="text-gray-500 dark:text-gray-400 mb-1"
                >
                  {t("words.list.personalNote")}
                </Typography>
                <Typography variant="body2">{word.personal_note}</Typography>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                {word.dictionary_entry.difficulty}
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                {word.dictionary_entry.language}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <Button
          onClick={() => setSkip((s) => Math.max(0, s - limit))}
          disabled={skip === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setSkip((s) => s + limit)}
          disabled={!words || words.length < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default WordsListPage;
