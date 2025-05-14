import React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@/shared/ui/Typography";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-background-light dark:bg-background-dark">
      <div className="text-center space-y-6">
        <Typography size="xl" weight="bold" className="text-4xl">
          {t("home.title")}
        </Typography>
        <Typography size="lg" color="secondary">
          {t("home.description")}
        </Typography>
      </div>
    </div>
  );
};

export default HomePage;
