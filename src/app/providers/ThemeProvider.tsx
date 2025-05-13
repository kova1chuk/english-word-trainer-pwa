import { useEffect } from "react";

import { useAppSelector } from "@/shared/config/store/hooks";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
