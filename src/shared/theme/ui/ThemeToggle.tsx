import React from "react";

import { useAppDispatch, useAppSelector } from "@/shared/config/store/hooks";
import { toggleTheme } from "@/shared/theme/model/themeStore";

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="text-xl px-2 hover:opacity-80"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? "🌙" : "🌞"}
    </button>
  );
};

export default ThemeToggle;
