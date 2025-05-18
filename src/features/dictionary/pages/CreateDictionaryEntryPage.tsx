import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Typography from "@/shared/ui/Typography";

import { useCreateDictionaryEntryMutation } from "../api/dictionaryApi";
import { DictionaryEntryForm } from "../components";

import type { DictionaryCreate } from "../types";

const CreateDictionaryEntryPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [createEntry, { isLoading }] = useCreateDictionaryEntryMutation();

  const handleSubmit = async (data: DictionaryCreate) => {
    const entry = await createEntry(data).unwrap();
    navigate(`/dictionary/${entry.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Typography variant="h1" className="mb-4">
            {t("dictionary.create.title")}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-300"
          >
            {t("dictionary.create.description")}
          </Typography>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <DictionaryEntryForm
            onSubmit={handleSubmit}
            onCancel={() => navigate(-1)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDictionaryEntryPage;
