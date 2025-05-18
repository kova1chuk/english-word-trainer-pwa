import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import Typography from "@/shared/ui/Typography";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useCreateProfileMutation,
} from "../api/profileApi";

import type { ProfileCreate, ProfileUpdate } from "../types";

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

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileCreate>({
    name: profile?.name ?? "",
    native_language: profile?.native_language ?? "",
    target_language: profile?.target_language ?? "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (profile) {
        await updateProfile(formData as ProfileUpdate).unwrap();
      } else {
        await createProfile(formData).unwrap();
      }
      setIsEditing(false);
    } catch (err) {
      setError(t("common.error"));
      console.error("Failed to save profile:", err);
    }
  };

  const handleChange = (field: keyof ProfileCreate, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography>{t("common.loading")}</Typography>
      </div>
    );
  }

  // Check if profile exists and has created_at field
  if (!profile || !profile.created_at) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Typography variant="h1" className="mb-4">
              {t("profile.notCreated.title")}
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-400"
            >
              {t("profile.notCreated.description")}
            </Typography>
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              color="primary"
              size="lg"
              className="w-full max-w-xs"
              onClick={() => navigate(routes.profileSetup)}
            >
              {t("profile.notCreated.setupButton")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Typography variant="h1" className="mb-4">
            {t("profile.title")}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-300"
          >
            {t("profile.description")}
          </Typography>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <Typography variant="subtitle2" className="text-gray-500 mb-1">
                  {t("profile.name")}
                </Typography>
                <Typography variant="body1">
                  {profile?.name || t("profile.notSet")}
                </Typography>
              </div>

              <div>
                <Typography variant="subtitle2" className="text-gray-500 mb-1">
                  {t("profile.nativeLanguage")}
                </Typography>
                <Typography variant="body1">
                  {LANGUAGE_OPTIONS.find(
                    (l) => l.value === profile?.native_language,
                  )?.label || t("profile.notSet")}
                </Typography>
              </div>

              <div>
                <Typography variant="subtitle2" className="text-gray-500 mb-1">
                  {t("profile.targetLanguage")}
                </Typography>
                <Typography variant="body1">
                  {LANGUAGE_OPTIONS.find(
                    (l) => l.value === profile?.target_language,
                  )?.label || t("profile.notSet")}
                </Typography>
              </div>

              <div className="pt-4">
                <Button onClick={() => setIsEditing(true)}>
                  {t("profile.edit")}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Typography variant="subtitle2" className="mb-2">
                  {t("profile.name")}
                </Typography>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder={t("profile.namePlaceholder")}
                />
              </div>

              <div>
                <Typography variant="subtitle2" className="mb-2">
                  {t("profile.nativeLanguage")}
                </Typography>
                <Select
                  value={formData.native_language || ""}
                  onChange={(e) =>
                    handleChange("native_language", e.target.value)
                  }
                  options={LANGUAGE_OPTIONS}
                  placeholder={t("profile.nativeLanguagePlaceholder")}
                />
              </div>

              <div>
                <Typography variant="subtitle2" className="mb-2">
                  {t("profile.targetLanguage")}
                </Typography>
                <Select
                  value={formData.target_language || ""}
                  onChange={(e) =>
                    handleChange("target_language", e.target.value)
                  }
                  options={LANGUAGE_OPTIONS}
                  placeholder={t("profile.targetLanguagePlaceholder")}
                />
              </div>

              {error && (
                <Typography className="text-red-500">{error}</Typography>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  color="ghost"
                  onClick={() => setIsEditing(false)}
                  disabled={isUpdating || isCreating}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  type="submit"
                  loading={isUpdating || isCreating}
                  disabled={isUpdating || isCreating}
                >
                  {t("common.save")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
