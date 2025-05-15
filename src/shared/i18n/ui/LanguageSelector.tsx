import { useTranslation } from "react-i18next";

import Select from "@/shared/ui/Select";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      options={[
        { value: "en", label: "English" },
        { value: "uk", label: "Українська" },
      ]}
    />
  );
};

export default LanguageSelector;
