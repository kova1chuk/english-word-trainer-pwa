import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@/shared/ui/Button";
import Typography from "@/shared/ui/Typography";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background-light dark:bg-background-dark">
      <div className="text-center space-y-6">
        <Typography size="xl" weight="bold" className="text-6xl">
          404
        </Typography>
        <Typography size="lg" color="secondary">
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
