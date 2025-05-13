// src/shared/ui/ThemeToggle.tsx
import React from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/shared/config/store/hooks";
import { setTheme } from "@/shared/theme/model/themeStore";
import Switch from "@/shared/ui/Switch";

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const { t } = useTranslation();

  const handleToggle = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  return (
    <Switch
      checked={currentTheme === "dark"}
      onChange={handleToggle}
      label={currentTheme === "dark" ? t("toggle_theme") : t("toggle_theme")}
    />
  );
};

export default ThemeToggle;
