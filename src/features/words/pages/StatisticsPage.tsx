import { useTranslation } from "react-i18next";

import Typography from "@/shared/ui/Typography";

import { useGetStatisticsQuery } from "../api/wordsApi";

const StatisticsPage = () => {
  const { t } = useTranslation();
  const { data: stats, isLoading, error } = useGetStatisticsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography>{t("common.loading")}</Typography>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography className="text-red-500">{t("common.error")}</Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Typography variant="h1" className="mb-4">
          {t("statistics.title")}
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-600 dark:text-gray-300"
        >
          {t("statistics.description")}
        </Typography>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Overall stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <Typography variant="h3" className="mb-4">
            {t("statistics.overall.title")}
          </Typography>
          <div className="space-y-4">
            <div>
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400"
              >
                {t("statistics.overall.totalWords")}
              </Typography>
              <Typography variant="h4">{stats.totalWords}</Typography>
            </div>
            <div>
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400"
              >
                {t("statistics.overall.learnedWords")}
              </Typography>
              <Typography variant="h4">{stats.learnedWords}</Typography>
            </div>
            <div>
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400"
              >
                {t("statistics.overall.accuracy")}
              </Typography>
              <Typography variant="h4">
                {Math.round(stats.accuracy * 100)}%
              </Typography>
            </div>
            <div>
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400"
              >
                {t("statistics.overall.averageTime")}
              </Typography>
              <Typography variant="h4">
                {Math.round(stats.averageTimePerWord / 1000)}s
              </Typography>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <Typography variant="h3" className="mb-4">
            {t("statistics.recent.title")}
          </Typography>
          {stats.recentSessions.length === 0 ? (
            <Typography className="text-gray-500 dark:text-gray-400">
              {t("statistics.recent.noActivity")}
            </Typography>
          ) : (
            <div className="space-y-4">
              {stats.recentSessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-3 rounded ${
                    session.correct
                      ? "bg-green-100 dark:bg-green-900/20"
                      : "bg-red-100 dark:bg-red-900/20"
                  }`}
                >
                  <Typography variant="body2" className="font-medium">
                    {session.answer}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {new Date(session.created_at).toLocaleDateString()}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <Typography variant="h3" className="mb-4">
            {t("statistics.progress.title")}
          </Typography>
          <div className="space-y-4">
            {stats.progressByDay.map((day) => (
              <div key={day.date} className="space-y-2">
                <Typography
                  variant="body2"
                  className="text-gray-500 dark:text-gray-400"
                >
                  {new Date(day.date).toLocaleDateString()}
                </Typography>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Typography variant="body2" className="text-green-500">
                      {t("statistics.progress.learned")}: {day.learned}
                    </Typography>
                  </div>
                  <div className="flex-1">
                    <Typography variant="body2" className="text-blue-500">
                      {t("statistics.progress.practiced")}: {day.practiced}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed statistics table */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <Typography variant="h3" className="mb-4">
            {t("statistics.details.title")}
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4">
                    {t("statistics.details.date")}
                  </th>
                  <th className="text-left py-3 px-4">
                    {t("statistics.details.word")}
                  </th>
                  <th className="text-left py-3 px-4">
                    {t("statistics.details.result")}
                  </th>
                  <th className="text-left py-3 px-4">
                    {t("statistics.details.timeSpent")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSessions.map((session) => (
                  <tr
                    key={session.id}
                    className="border-b dark:border-gray-700"
                  >
                    <td className="py-3 px-4">
                      {new Date(session.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{session.answer}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          session.correct
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                        }`}
                      >
                        {session.correct
                          ? t("practice.correct")
                          : t("practice.incorrect")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {Math.round(session.timeSpent / 1000)}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
