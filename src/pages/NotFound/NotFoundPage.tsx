import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import Typography from "@/shared/ui/Typography";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <Typography variant="h1" className="text-blue-600">
          404
        </Typography>
        <Typography variant="h2" className="mt-2">
          {t("notFound.title")}
        </Typography>
        <Typography variant="body1" className="mt-4">
          {t("notFound.description")}
        </Typography>
        <div className="mt-6">
          <Link to={routes.home}>
            <Button>{t("notFound.backHome")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
