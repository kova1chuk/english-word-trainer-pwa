import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@/shared/ui/Button";
import Typography from "@/shared/ui/Typography";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-6">
        <Typography
          size="xl"
          weight="bold"
          className="text-6xl text-gray-900 dark:text-white"
        >
          404
        </Typography>
        <Typography size="lg" className="text-gray-600 dark:text-gray-300">
          {t("not_found.message")}
        </Typography>
        <Button color="primary" onClick={() => navigate("/")}>
          {t("not_found.go_home")}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
