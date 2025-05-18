import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import Typography from "@/shared/ui/Typography";

import { useGetDictionaryEntriesQuery } from "../api/dictionaryApi";

import type { DifficultyLevel } from "../types";

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
];

const DictionaryBrowserPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel | "">("");
  const [language, setLanguage] = useState("");
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const {
    data: entries = [],
    isLoading,
    error,
  } = useGetDictionaryEntriesQuery({
    search,
    difficulty: difficulty || undefined,
    language: language || undefined,
    skip,
    limit,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Typography variant="h1" className="mb-4">
          {t("dictionary.browser.title")}
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-600 dark:text-gray-300"
        >
          {t("dictionary.browser.description")}
        </Typography>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("dictionary.browser.searchPlaceholder")}
            className="flex-1"
          />
          <Select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value as DifficultyLevel | "")
            }
            options={DIFFICULTY_OPTIONS}
            placeholder={t("dictionary.browser.filterByDifficulty")}
            className="w-48"
          />
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={LANGUAGE_OPTIONS}
            placeholder={t("dictionary.browser.filterByLanguage")}
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

      {entries.length === 0 && (
        <div className="text-center py-8">
          <Typography>{t("dictionary.browser.noResults")}</Typography>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.id}
            to={`/dictionary/${entry.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <Typography variant="h3" className="mb-2">
              {entry.text}
            </Typography>
            {entry.pronunciation && (
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400 mb-2"
              >
                {entry.pronunciation}
              </Typography>
            )}
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-300"
            >
              {entry.meaning}
            </Typography>
            {entry.example && (
              <Typography
                variant="body2"
                className="mt-2 text-gray-500 dark:text-gray-400"
              >
                {entry.example}
              </Typography>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  {
                    easy: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
                    medium:
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
                    hard: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                  }[entry.difficulty]
                }`}
              >
                {t(`dictionary.difficulty.${entry.difficulty}`)}
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                {LANGUAGE_OPTIONS.find((l) => l.value === entry.language)
                  ?.label || entry.language}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <Button
          onClick={() => setSkip((s) => Math.max(0, s - limit))}
          disabled={skip === 0}
        >
          {t("common.previous")}
        </Button>
        <Button
          onClick={() => setSkip((s) => s + limit)}
          disabled={entries.length < limit}
        >
          {t("common.next")}
        </Button>
      </div>
    </div>
  );
};

export default DictionaryBrowserPage;
