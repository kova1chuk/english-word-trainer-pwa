import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { clearToken } from "@/features/auth/store/slice";
import { routes } from "@/router/routes";
import { useAppDispatch, useAppSelector } from "@/shared/config/store/hooks";
import LanguageSelector from "@/shared/i18n/ui/LanguageSelector";
import ThemeToggle from "@/shared/theme/ui/ThemeToggle";
import Button from "@/shared/ui/Button";
import Typography from "@/shared/ui/Typography";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { t } = useTranslation();

  const handleSignOut = () => {
    dispatch(clearToken());
    navigate(routes.signin);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <Link to="/" className="flex items-center gap-2">
        <Typography
          size="lg"
          weight="bold"
          className="text-blue-600 dark:text-white"
        >
          {t("header.app_name")}
        </Typography>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSelector />
        {token ? (
          <Button color="ghost" size="sm" onClick={handleSignOut}>
            {t("header.sign_out")}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              color="ghost"
              size="sm"
              onClick={() => navigate(routes.signin)}
            >
              {t("header.sign_in")}
            </Button>
            <Button
              color="primary"
              size="sm"
              onClick={() => navigate(routes.signup)}
            >
              {t("header.sign_up")}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
