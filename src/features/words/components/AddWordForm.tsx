import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/Button";
import TextArea from "@/shared/ui/TextArea";
import Typography from "@/shared/ui/Typography";

import { useCreateWordMutation } from "../api/wordsApi";

interface AddWordFormProps {
  dictionaryId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddWordForm = ({
  dictionaryId,
  onSuccess,
  onCancel,
}: AddWordFormProps) => {
  const { t } = useTranslation();
  const [personalNote, setPersonalNote] = useState("");
  const [createWord, { isLoading, error }] = useCreateWordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createWord({
        dictionary_id: dictionaryId,
        personal_note: personalNote.trim() || undefined,
      }).unwrap();

      onSuccess?.();
    } catch (err) {
      console.error("Failed to add word:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Typography variant="subtitle2" className="mb-2">
          {t("words.add.personalNote")}
        </Typography>
        <TextArea
          value={personalNote}
          onChange={(e) => setPersonalNote(e.target.value)}
          placeholder={t("words.add.personalNotePlaceholder")}
          rows={3}
        />
      </div>

      {error && (
        <Typography className="text-red-500">{t("common.error")}</Typography>
      )}

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
          {t("words.add.submit")}
        </Button>
      </div>
    </form>
  );
};

export default AddWordForm;
