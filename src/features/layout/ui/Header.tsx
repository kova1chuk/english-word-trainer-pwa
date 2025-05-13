import React from "react";
import { Link } from "react-router-dom";

import LanguageSelector from "@/shared/i18n/ui/LanguageSelector";
import ThemeToggle from "@/shared/theme/ui/ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md px-4 py-3 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold text-blue-600 dark:text-blue-400"
      >
        Word Trainer
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
