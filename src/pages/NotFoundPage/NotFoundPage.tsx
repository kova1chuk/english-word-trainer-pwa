import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">{t("not_found.message")}</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg"
      >
        {t("not_found.go_home")}
      </button>
    </div>
  );
};

export default NotFoundPage;
