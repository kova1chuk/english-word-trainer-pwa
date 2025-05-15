import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/Button";
import FormField from "@/shared/ui/FormField";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import Typography from "@/shared/ui/Typography";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../store/profileApi";
import { profileSchema } from "../validation/profile.schema";

import type { ProfileFormData } from "../validation/profile.schema";

const LANGUAGES = [
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

const ProfileSettingsPage = () => {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (profile?.native_language?.code && profile?.target_language?.code) {
      reset({
        name: profile.name,
        native_language: profile.native_language.code,
        target_language: profile.target_language.code,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setError("");
    try {
      await updateProfile(data).unwrap();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : t("profile.settings.error");
      setError(errorMessage || t("profile.settings.error"));
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography>{t("common.loading")}</Typography>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Typography className="text-red-500">{t("common.error")}</Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Typography variant="h1" className="mb-4">
            {t("profile.settings.title")}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-300"
          >
            {t("profile.settings.description")}
          </Typography>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Typography variant="body2" className="text-center text-red-500">
                {error}
              </Typography>
            )}

            <FormField
              label={t("profile.name")}
              error={errors.name?.message}
              required
            >
              <Input
                id="name"
                type="text"
                {...register("name")}
                autoComplete="name"
              />
            </FormField>

            <FormField
              label={t("profile.nativeLanguage")}
              error={errors.native_language?.message}
              required
            >
              <Select
                id="native_language"
                {...register("native_language")}
                options={LANGUAGES}
              />
            </FormField>

            <FormField
              label={t("profile.targetLanguage")}
              error={errors.target_language?.message}
              required
            >
              <Select
                id="target_language"
                {...register("target_language")}
                options={LANGUAGES}
              />
            </FormField>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!isDirty || isUpdating}
                loading={isUpdating}
              >
                {t("profile.settings.save")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
