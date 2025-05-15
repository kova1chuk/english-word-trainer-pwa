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

    try {
      await createProfile(data).unwrap();
      navigate(routes.dictionary);
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : t("profile.setup.error");
      setError(errorMessage || t("profile.setup.error"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Typography variant="h1" className="text-center">
            {t("profile.setup.title")}
          </Typography>
          <Typography variant="body1" className="mt-2 text-center">
            {t("profile.setup.subtitle")}
          </Typography>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Typography variant="body2" className="text-center text-red-500">
              {error}
            </Typography>
          )}

          <div className="space-y-4 rounded-md">
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
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || !isDirty || isLoading}
            loading={isLoading}
          >
            {t("profile.setup.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
