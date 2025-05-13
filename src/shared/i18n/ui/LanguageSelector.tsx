import { useTranslation } from "react-i18next";

import Select from "@/shared/ui/Select";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onChange={(lang) => i18n.changeLanguage(lang)}
      options={[
        { value: "en", label: "English" },
        { value: "uk", label: "Українська" },
      ]}
    />
  );
};

export default LanguageSelector;
