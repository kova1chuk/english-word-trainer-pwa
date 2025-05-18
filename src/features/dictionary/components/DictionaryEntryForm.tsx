import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import TextArea from "@/shared/ui/TextArea";
import Typography from "@/shared/ui/Typography";

import type {
  DictionaryCreate,
  DictionaryRead,
  DifficultyLevel,
} from "../types";

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
];

interface DictionaryEntryFormProps {
  initialData?: DictionaryRead;
  onSubmit: (data: DictionaryCreate) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const DictionaryEntryForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: DictionaryEntryFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<DictionaryCreate>({
    text: initialData?.text ?? "",
    meaning: initialData?.meaning ?? "",
    example: initialData?.example ?? "",
    pronunciation: initialData?.pronunciation ?? "",
    difficulty: initialData?.difficulty ?? "medium",
    language: initialData?.language ?? "en",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(t("common.error"));
      console.error("Failed to submit dictionary entry:", err);
    }
  };

  const handleChange = (
    field: keyof DictionaryCreate,
    value: string | DifficultyLevel,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Typography variant="subtitle2" className="mb-2">
          {t("dictionary.form.text")}
        </Typography>
        <Input
          value={formData.text}
          onChange={(e) => handleChange("text", e.target.value)}
          placeholder={t("dictionary.form.textPlaceholder")}
          required
        />
      </div>

      <div>
        <Typography variant="subtitle2" className="mb-2">
          {t("dictionary.form.meaning")}
        </Typography>
        <TextArea
          value={formData.meaning}
          onChange={(e) => handleChange("meaning", e.target.value)}
          placeholder={t("dictionary.form.meaningPlaceholder")}
          rows={3}
          required
        />
      </div>

      <div>
        <Typography variant="subtitle2" className="mb-2">
          {t("dictionary.form.example")}
        </Typography>
        <TextArea
          value={formData.example || ""}
          onChange={(e) => handleChange("example", e.target.value)}
          placeholder={t("dictionary.form.examplePlaceholder")}
          rows={2}
        />
      </div>

      <div>
        <Typography variant="subtitle2" className="mb-2">
          {t("dictionary.form.pronunciation")}
        </Typography>
        <Input
          value={formData.pronunciation || ""}
          onChange={(e) => handleChange("pronunciation", e.target.value)}
          placeholder={t("dictionary.form.pronunciationPlaceholder")}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Typography variant="subtitle2" className="mb-2">
            {t("dictionary.form.difficulty")}
          </Typography>
          <Select
            value={formData.difficulty}
            onChange={(e) =>
              handleChange("difficulty", e.target.value as DifficultyLevel)
            }
            options={DIFFICULTY_OPTIONS}
            required
          />
        </div>

        <div className="flex-1">
          <Typography variant="subtitle2" className="mb-2">
            {t("dictionary.form.language")}
          </Typography>
          <Select
            value={formData.language}
            onChange={(e) => handleChange("language", e.target.value)}
            options={LANGUAGE_OPTIONS}
            required
          />
        </div>
      </div>

      {error && <Typography className="text-red-500">{error}</Typography>}

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            color="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            {t("common.cancel")}
          </Button>
        )}
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          {initialData ? t("common.save") : t("common.create")}
        </Button>
      </div>
    </form>
  );
};

export default DictionaryEntryForm;
