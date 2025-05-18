import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import Typography from "@/shared/ui/Typography";

import { useGetProfileQuery } from "../store/profileApi";

const LANGUAGES = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
} as const;

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useGetProfileQuery();

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
        <div className="mb-8 flex justify-between items-center">
          <div>
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
          <Button
            color="primary"
            onClick={() => navigate(routes.profileSettings)}
          >
            {t("profile.edit")}
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <Typography
                variant="subtitle2"
                className="text-gray-500 dark:text-gray-400 mb-1"
              >
                {t("profile.name")}
              </Typography>
              <Typography variant="body1">{profile.name}</Typography>
            </div>

            {/* Native Language */}
            <div>
              <Typography
                variant="subtitle2"
                className="text-gray-500 dark:text-gray-400 mb-1"
              >
                {t("profile.nativeLanguage")}
              </Typography>
              <Typography variant="body1">
                {LANGUAGES[profile.native_language as keyof typeof LANGUAGES] ||
                  profile.native_language}
              </Typography>
            </div>

            {/* Target Language */}
            <div>
              <Typography
                variant="subtitle2"
                className="text-gray-500 dark:text-gray-400 mb-1"
              >
                {t("profile.targetLanguage")}
              </Typography>
              <Typography variant="body1">
                {LANGUAGES[profile.target_language as keyof typeof LANGUAGES] ||
                  profile.target_language}
              </Typography>
            </div>

            {/* Created At */}
            <div>
              <Typography
                variant="subtitle2"
                className="text-gray-500 dark:text-gray-400 mb-1"
              >
                {t("profile.createdAt")}
              </Typography>
              <Typography variant="body1">
                {new Date(profile.created_at).toLocaleDateString()}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
