import React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@/shared/ui/Typography";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-6">
        <Typography
          size="xl"
          weight="bold"
          className="text-4xl text-gray-900 dark:text-white"
        >
          {t("home.title")}
        </Typography>
        <Typography size="lg" className="text-gray-600 dark:text-gray-300">
          {t("home.description")}
        </Typography>
      </div>
    </div>
  );
};

export default HomePage;
