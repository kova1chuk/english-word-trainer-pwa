import React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@/shared/ui/Typography";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="text-center space-y-6">
        <Typography variant="h1" align="center">
          {t("home.title")}
        </Typography>
        <Typography variant="subtitle1" color="secondary" align="center">
          {t("home.description")}
        </Typography>
      </div>
    </div>
  );
};

export default HomePage;
