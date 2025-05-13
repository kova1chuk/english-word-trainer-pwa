import React from "react";

import { useAppDispatch, useAppSelector } from "@/shared/config/store/hooks";
import { setTheme } from "@/shared/theme/model/themeStore";
import Switch from "@/shared/ui/Switch";

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);

  const handleToggle = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  return (
    <Switch
      checked={currentTheme === "dark"}
      onChange={handleToggle}
      label={currentTheme === "dark" ? "Dark mode" : "Light mode"}
    />
  );
};

export default ThemeToggle;
