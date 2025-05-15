import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useAddWordMutation } from "@/features/words/api/wordsApi";
import Button from "@/shared/ui/Button";
import Typography from "@/shared/ui/Typography";

import { useGetDictionaryEntryQuery } from "../api/dictionaryApi";

const DictionaryEntryPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: entry, isLoading, error } = useGetDictionaryEntryQuery(id!);
  const [addWord, { isLoading: isAdding }] = useAddWordMutation();

  const handleAddToMyWords = async () => {
    if (!entry) return;

    await addWord({
      original: entry.word,
      translation: "", // User will need to add translation
      pronunciation: entry.phonetic,
      examples: entry.examples,
      difficulty: "medium",
      tags: entry.meanings.map((m) => m.partOfSpeech),
    }).unwrap();
  };

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
                {entry.word}
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-500 dark:text-gray-400"
              >
                {entry.phonetic}
              </Typography>
            </div>
            <Button
              onClick={handleAddToMyWords}
              disabled={isAdding}
              loading={isAdding}
            >
              {t("dictionary.entry.addToMyWords")}
            </Button>
          </div>

          {/* Meanings */}
          <div className="space-y-6">
            {entry.meanings.map((meaning, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
              >
                <Typography variant="h3" className="mb-4">
                  {meaning.partOfSpeech}
                </Typography>

                <div className="space-y-4">
                  {meaning.definitions.map((def, defIndex) => (
                    <div key={defIndex}>
                      <Typography variant="body1" className="mb-2">
                        {def.definition}
                      </Typography>
                      {def.example && (
                        <Typography
                          variant="body2"
                          className="text-gray-600 dark:text-gray-300 ml-4"
                        >
                          "{def.example}"
                        </Typography>
                      )}
                      {(def.synonyms.length > 0 || def.antonyms.length > 0) && (
                        <div className="mt-2 ml-4">
                          {def.synonyms.length > 0 && (
                            <Typography
                              variant="body2"
                              className="text-gray-600 dark:text-gray-300"
                            >
                              {t("dictionary.entry.synonyms")}:{" "}
                              {def.synonyms.join(", ")}
                            </Typography>
                          )}
                          {def.antonyms.length > 0 && (
                            <Typography
                              variant="body2"
                              className="text-gray-600 dark:text-gray-300"
                            >
                              {t("dictionary.entry.antonyms")}:{" "}
                              {def.antonyms.join(", ")}
                            </Typography>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Examples */}
          {entry.examples.length > 0 && (
            <div className="mt-8">
              <Typography variant="h3" className="mb-4">
                {t("dictionary.entry.examples")}
              </Typography>
              <div className="space-y-2">
                {entry.examples.map((example, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    • {example}
                  </Typography>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryEntryPage;
