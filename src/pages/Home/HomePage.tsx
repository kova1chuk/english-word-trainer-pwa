import React from "react";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
      <p className="text-xl text-gray-600 mb-8">{t("home.description")}</p>
    </div>
  );
};

export default HomePage;
