import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import {
  useGetUserWordsQuery,
  useSubmitPracticeSessionMutation,
} from "../api/wordsApi";

const PracticePage = () => {
  const { t } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [startTime, setStartTime] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { data: wordsData } = useGetUserWordsQuery({
    page: 1,
    limit: 10,
  });

  const [submitPractice] = useSubmitPracticeSessionMutation();

  const currentWord = wordsData?.items[currentWordIndex];

  useEffect(() => {
    if (currentWord) {
      setStartTime(Date.now());
    }
  }, [currentWord]);

  const handleCheck = async () => {
    if (!currentWord) return;

    const isAnswerCorrect =
      answer.toLowerCase().trim() ===
      currentWord.translation.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    await submitPractice({
      wordId: currentWord.id,
      answer,
      timeSpent: Date.now() - startTime,
    }).unwrap();
  };

  const handleNext = () => {
    setAnswer("");
    setShowResult(false);
    if (wordsData?.items && currentWordIndex < wordsData.items.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setAnswer("");
    setShowResult(false);
    if (wordsData?.items && currentWordIndex < wordsData.items.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    }
  };

  if (!wordsData?.items.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography>{t("words.list.noWords")}</Typography>
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
          <div className="text-center mb-8">
            <Typography variant="h2" className="mb-4">
              {currentWord?.original}
            </Typography>
            {currentWord?.pronunciation && (
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400 mb-4"
              >
                {currentWord.pronunciation}
              </Typography>
            )}
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-300"
            >
              {t("practice.translate_prompt")}
            </Typography>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !showResult && handleCheck()
              }
              placeholder={t("practice.translate_prompt")}
              disabled={showResult}
              className="w-full"
            />

            {showResult && (
              <div
                className={`text-center ${isCorrect ? "text-green-500" : "text-red-500"}`}
              >
                <Typography>
                  {isCorrect ? t("practice.correct") : t("practice.incorrect")}
                </Typography>
                {!isCorrect && (
                  <Typography className="mt-2">
                    {t("practice.correctAnswer")}: {currentWord?.translation}
                  </Typography>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {!showResult ? (
            <>
              <Button color="ghost" size="lg" onClick={handleSkip}>
                {t("practice.skip")}
              </Button>
              <Button color="primary" size="lg" onClick={handleCheck}>
                {t("practice.check")}
              </Button>
            </>
          ) : (
            <Button color="primary" size="lg" onClick={handleNext}>
              {t("practice.next")}
            </Button>
          )}
        </div>

        <div className="mt-8">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{
                width: `${((currentWordIndex + 1) / wordsData.items.length) * 100}%`,
              }}
            />
          </div>
          <Typography variant="body2" className="text-center mt-2">
            {currentWordIndex + 1} / {wordsData.items.length}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
