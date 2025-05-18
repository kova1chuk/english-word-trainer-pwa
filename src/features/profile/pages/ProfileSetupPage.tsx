import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import FormField from "@/shared/ui/FormField";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import Typography from "@/shared/ui/Typography";

import { useCreateProfileMutation } from "../store/profileApi";
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

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [createProfile, { isLoading }] = useCreateProfileMutation();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      native_language: "",
      target_language: "",
    },
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormData) => {
    setError("");
    console.log("Submitting profile data:", data);

    try {
      const result = await createProfile(data).unwrap();
      console.log("Profile created successfully:", result);
      navigate(routes.dictionary);
    } catch (error: unknown) {
      console.error("Profile creation error:", error);
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : t("profile.setup.error");
      setError(errorMessage || t("profile.setup.error"));

      // Log detailed error information
      if (error && typeof error === "object") {
        if ("status" in error) {
          console.error("Error status:", (error as { status: number }).status);
        }
        if ("data" in error) {
          console.error("Error data:", error.data);
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Typography variant="h1" className="mb-4">
            {t("profile.setup.title")}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-400"
          >
            {t("profile.setup.subtitle")}
          </Typography>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full"
              disabled={!isValid || !isDirty || isLoading}
              loading={isLoading}
            >
              {t("profile.setup.submit")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
