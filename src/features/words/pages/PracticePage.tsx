import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import {
  useGetUserWordsQuery,
  useSubmitPracticeSessionMutation,
  useGetWordStatsQuery,
} from "../api/wordsApi";

import type { WordRead } from "../types";

const PracticePage = () => {
  const { t } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [practiceWords, setPracticeWords] = useState<WordRead[]>([]);

  // Fetch words for practice
  const { data: words = [], isLoading: isLoadingWords } = useGetUserWordsQuery({
    skip: 0,
    limit: 10,
    difficulty: undefined,
    search: undefined,
  });

  // Get stats for current word
  const currentWord = practiceWords[currentWordIndex];
  const { data: stats } = useGetWordStatsQuery(currentWord?.id ?? 0, {
    skip: !currentWord,
  });

  const [submitPractice] = useSubmitPracticeSessionMutation();

  useEffect(() => {
    if (words.length > 0) {
      // Shuffle words for practice
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setPracticeWords(shuffled);
    }
  }, [words]);

  const handleCheck = async () => {
    if (!currentWord) return;

    const isAnswerCorrect =
      answer.toLowerCase().trim() ===
      currentWord.dictionary_entry.text.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    try {
      await submitPractice({
        id: currentWord.id,
        correct: isAnswerCorrect,
      }).unwrap();
    } catch (err) {
      console.error("Failed to submit practice result:", err);
    }
  };

  const handleNext = () => {
    setAnswer("");
    setShowResult(false);
    if (currentWordIndex < practiceWords.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      // All words practiced
      setCurrentWordIndex(0);
      const shuffled = [...practiceWords].sort(() => Math.random() - 0.5);
      setPracticeWords(shuffled);
    }
  };

  if (isLoadingWords) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography>{t("common.loading")}</Typography>
      </div>
    );
  }

  if (!practiceWords.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography>{t("practice.noWords")}</Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <Typography variant="h1" className="mb-4">
            {t("practice.title")}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-300"
          >
            {t("practice.description")}
          </Typography>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          {/* Word Stats */}
          {stats && (
            <div className="mb-6 flex justify-center gap-8">
              <div className="text-center">
                <Typography variant="subtitle2" className="text-gray-500">
                  {t("practice.totalAttempts")}
                </Typography>
                <Typography variant="h4">{stats.total_practices}</Typography>
              </div>
              <div className="text-center">
                <Typography variant="subtitle2" className="text-gray-500">
                  {t("practice.successRate")}
                </Typography>
                <Typography variant="h4">
                  {Math.round(stats.success_rate * 100)}%
                </Typography>
              </div>
            </div>
          )}

          {/* Word to Practice */}
          <div className="text-center mb-8">
            <Typography variant="h2" className="mb-4">
              {currentWord.dictionary_entry.meaning}
            </Typography>
            {currentWord.dictionary_entry.example && (
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400 mb-4"
              >
                {currentWord.dictionary_entry.example}
              </Typography>
            )}
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-300"
            >
              {t("practice.translatePrompt")}
            </Typography>
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !showResult && handleCheck()
              }
              placeholder={t("practice.answerPlaceholder")}
              disabled={showResult}
              className="w-full"
            />

            {showResult && (
              <div
                className={`text-center ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                <Typography variant="h3">
                  {isCorrect ? t("practice.correct") : t("practice.incorrect")}
                </Typography>
                {!isCorrect && (
                  <Typography className="mt-2">
                    {t("practice.correctAnswer")}:{" "}
                    {currentWord.dictionary_entry.text}
                  </Typography>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {!showResult ? (
            <Button
              color="primary"
              size="lg"
              onClick={handleCheck}
              disabled={!answer.trim()}
            >
              {t("practice.check")}
            </Button>
          ) : (
            <Button color="primary" size="lg" onClick={handleNext}>
              {t("practice.next")}
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{
                width: `${((currentWordIndex + 1) / practiceWords.length) * 100}%`,
              }}
            />
          </div>
          <Typography variant="body2" className="text-center mt-2">
            {currentWordIndex + 1} / {practiceWords.length}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
