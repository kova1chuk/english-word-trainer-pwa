import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { clearToken } from "@/features/auth/store/slice";
import { routes } from "@/router/routes";
import { useAppDispatch, useAppSelector } from "@/shared/config/store/hooks";
import LanguageSelector from "@/shared/i18n/ui/LanguageSelector";
import ThemeToggle from "@/shared/theme/ui/ThemeToggle";
import Button from "@/shared/ui/Button";
import Typography from "@/shared/ui/Typography";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { t } = useTranslation();

  const handleSignOut = () => {
    dispatch(clearToken());
    navigate(routes.signin);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-3 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Typography variant="subtitle1" color="primary">
              {t("header.app_name")}
            </Typography>
          </Link>
          {token && (
            <nav className="flex items-center gap-4">
              <Button
                color={isActive(routes.dictionary) ? "primary" : "ghost"}
                size="sm"
                onClick={() => navigate(routes.dictionary)}
              >
                {t("header.dictionary")}
              </Button>
              <Button
                color={isActive(routes.words) ? "primary" : "ghost"}
                size="sm"
                onClick={() => navigate(routes.words)}
              >
                {t("header.my_words")}
              </Button>
              <Button
                color={isActive(routes.practice) ? "primary" : "ghost"}
                size="sm"
                onClick={() => navigate(routes.practice)}
              >
                {t("header.practice")}
              </Button>
              <Button
                color={isActive(routes.statistics) ? "primary" : "ghost"}
                size="sm"
                onClick={() => navigate(routes.statistics)}
              >
                {t("header.stats")}
              </Button>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSelector />
          {token ? (
            <Button color="ghost" size="sm" onClick={handleSignOut}>
              {t("header.sign_out")}
            </Button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
