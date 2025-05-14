import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import FormField from "@/shared/ui/FormField";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import { useSigninMutation } from "../store/authApi";

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signin] = useSigninMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signin({ username: email, password }).unwrap();
      navigate(routes.home);
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : t("auth.signIn.error");
      setError(errorMessage || t("auth.signIn.error"));
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="w-full max-w-[440px] space-y-8 p-10 bg-white dark:bg-background-darker rounded-2xl shadow-lg dark:shadow-2xl border border-border-light dark:border-border-dark">
        <div className="space-y-3">
          <Typography
            size="xl"
            weight="bold"
            align="center"
            className="text-text-primary-light dark:text-text-primary-dark text-[28px]"
          >
            {t("auth.signIn.title")}
          </Typography>
          <Typography
            align="center"
            className="text-text-secondary-light dark:text-text-secondary-dark"
          >
            {t("auth.signIn.subtitle")}
          </Typography>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormField
              label={t("auth.signIn.emailLabel")}
              labelClassName="text-text-secondary-light dark:text-text-secondary-dark font-medium"
            >
              <Input
                id="email"
                type="email"
                required
                placeholder={t("auth.signIn.emailPlaceholder")}
                value={email}
                className="bg-background-light dark:bg-background-darker border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </FormField>
            <FormField
              label={t("auth.signIn.passwordLabel")}
              labelClassName="text-text-secondary-light dark:text-text-secondary-dark font-medium"
            >
              <Input
                id="password"
                type="password"
                required
                placeholder={t("auth.signIn.passwordPlaceholder")}
                value={password}
                className="bg-background-light dark:bg-background-darker border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
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
              className="bg-error-light/10 dark:bg-error-dark/10 p-2 rounded-lg"
            >
              {error}
            </Typography>
          )}

          <Button
            color="primary"
            className="w-full py-3 text-lg rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            {t("auth.signIn.button")}
          </Button>
        </form>

        <div className="text-center">
          <Typography className="text-text-secondary-light dark:text-text-secondary-dark">
            {t("auth.signIn.noAccount")}{" "}
            <Link
              to={routes.signup}
              className="text-primary-light dark:text-primary-dark hover:opacity-80 transition-opacity font-medium"
            >
              {t("auth.signIn.signUpLink")}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
