import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import Typography from "@/shared/ui/Typography";

import { useSearchDictionaryQuery } from "../api/dictionaryApi";

const PARTS_OF_SPEECH = [
  { value: "noun", label: "Noun" },
  { value: "verb", label: "Verb" },
  { value: "adjective", label: "Adjective" },
  { value: "adverb", label: "Adverb" },
  { value: "pronoun", label: "Pronoun" },
  { value: "preposition", label: "Preposition" },
  { value: "conjunction", label: "Conjunction" },
  { value: "interjection", label: "Interjection" },
];

const DictionaryBrowserPage = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useSearchDictionaryQuery({
    query,
    partOfSpeech,
    page,
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
        <div className="flex gap-4">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("dictionary.browser.searchPlaceholder")}
            className="flex-1"
          />
          <Select
            value={partOfSpeech}
            onChange={(e) => setPartOfSpeech(e.target.value)}
            options={PARTS_OF_SPEECH}
            placeholder={t("dictionary.browser.filterByPartOfSpeech")}
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
          <Typography>{t("dictionary.browser.noResults")}</Typography>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.items.map((entry) => (
          <Link
            key={entry.id}
            to={`/dictionary/${entry.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <Typography variant="h3" className="mb-2">
              {entry.word}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-500 dark:text-gray-400 mb-2"
            >
              {entry.phonetic}
            </Typography>
            {entry.meanings[0] && (
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                {entry.meanings[0].partOfSpeech}:{" "}
                {entry.meanings[0].definitions[0].definition}
              </Typography>
            )}
          </Link>
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

export default DictionaryBrowserPage;
