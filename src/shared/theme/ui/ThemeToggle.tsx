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

  const isDark = currentTheme === "dark";
  const label = isDark ? t("common.theme.dark") : t("common.theme.light");

  return (
    <div className="flex items-center gap-2">
      <Switch checked={isDark} onChange={handleToggle} label={label} />
    </div>
  );
};

export default ThemeToggle;
