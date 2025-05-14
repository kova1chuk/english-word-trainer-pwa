// TODO: SignUpPage
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import FormField from "@/shared/ui/FormField";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import { useSignupMutation } from "../store/authApi";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signup, { isLoading }] = useSignupMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signup({ email, password }).unwrap();
      navigate(routes.signin);
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : t("auth.signUp.error");
      setError(errorMessage || t("auth.signUp.error"));
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="w-full max-w-[440px] space-y-8 p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <Typography
            size="xl"
            weight="bold"
            align="center"
            className="text-gray-900 dark:text-white text-[28px]"
          >
            {t("auth.signUp.title")}
          </Typography>
          <Typography
            align="center"
            className="text-gray-600 dark:text-gray-300"
          >
            {t("auth.signUp.subtitle")}
          </Typography>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormField
              label={t("auth.signUp.emailLabel")}
              labelClassName="text-gray-700 dark:text-gray-300 font-medium"
            >
              <Input
                id="email"
                type="email"
                required
                disabled={isLoading}
                placeholder={t("auth.signUp.emailPlaceholder")}
                value={email}
                className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </FormField>
            <FormField
              label={t("auth.signUp.passwordLabel")}
              labelClassName="text-gray-700 dark:text-gray-300 font-medium"
            >
              <Input
                id="password"
                type="password"
                required
                disabled={isLoading}
                placeholder={t("auth.signUp.passwordPlaceholder")}
                value={password}
                className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </FormField>
          </div>

          {error && (
            <Typography
              color="error"
              size="sm"
              align="center"
              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded-lg"
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            color="primary"
            disabled={isLoading}
            loading={isLoading}
            className="w-full py-3 text-lg rounded-xl font-medium"
          >
            {t("auth.signUp.button")}
          </Button>
        </form>

        <div className="text-center">
          <Typography className="text-gray-600 dark:text-gray-300">
            {t("auth.signUp.haveAccount")}{" "}
            <Link
              to={routes.signin}
              className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity font-medium"
            >
              {t("auth.signUp.signInLink")}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
