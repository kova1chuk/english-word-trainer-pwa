import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { AddWordForm } from "@/features/words/components";
import Button from "@/shared/ui/Button";
import Typography from "@/shared/ui/Typography";

import { useGetDictionaryEntryQuery } from "../api/dictionaryApi";

const DictionaryEntryPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [isAddingWord, setIsAddingWord] = useState(false);
  const {
    data: entry,
    isLoading,
    error,
  } = useGetDictionaryEntryQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography>{t("common.loading")}</Typography>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography className="text-red-500">{t("common.error")}</Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Typography variant="h2" className="mb-2">
                {entry.text}
              </Typography>
              {entry.pronunciation && (
                <Typography
                  variant="body1"
                  className="text-gray-500 dark:text-gray-400"
                >
                  {entry.pronunciation}
                </Typography>
              )}
            </div>
            {!isAddingWord ? (
              <Button onClick={() => setIsAddingWord(true)}>
                {t("dictionary.entry.addToMyWords")}
              </Button>
            ) : (
              <div className="w-full max-w-md">
                <AddWordForm
                  dictionaryId={entry.id}
                  onSuccess={() => setIsAddingWord(false)}
                  onCancel={() => setIsAddingWord(false)}
                />
              </div>
            )}
          </div>

          {/* Meaning */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <Typography variant="h3" className="mb-4">
                {t("dictionary.entry.meaning")}
              </Typography>
              <Typography variant="body1" className="mb-2">
                {entry.meaning}
              </Typography>
            </div>
          </div>

          {/* Example */}
          {entry.example && (
            <div className="mt-8">
              <Typography variant="h3" className="mb-4">
                {t("dictionary.entry.example")}
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-600 dark:text-gray-300"
              >
                {entry.example}
              </Typography>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div>
              <Typography
                variant="subtitle2"
                className="text-gray-500 dark:text-gray-400"
              >
                {t("dictionary.entry.difficulty")}
              </Typography>
              <Typography variant="body2">{entry.difficulty}</Typography>
            </div>
            <div>
              <Typography
                variant="subtitle2"
                className="text-gray-500 dark:text-gray-400"
              >
                {t("dictionary.entry.language")}
              </Typography>
              <Typography variant="body2">{entry.language}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DictionaryEntryPage;
