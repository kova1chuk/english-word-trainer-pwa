import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import FormField from "@/shared/ui/FormField";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import { useSigninMutation } from "../store/authApi";
import { signInSchema } from "../validation/auth.schema";

import type { SignInFormData } from "../validation/auth.schema";

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signin, { isLoading }] = useSigninMutation();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormData) => {
    setError("");

    try {
      await signin({ email: data.email, password: data.password }).unwrap();
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
    <div className="flex min-h-screen flex-1 items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-[440px] space-y-8 rounded-2xl border border-gray-200 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:shadow-2xl">
        <div className="space-y-3">
          <Typography variant="h2" align="center">
            {t("auth.signIn.title")}
          </Typography>
          <Typography variant="body1" color="secondary" align="center">
            {t("auth.signIn.subtitle")}
          </Typography>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-5">
            <FormField
              label={t("auth.signIn.emailLabel")}
              labelClassName="text-gray-700 dark:text-gray-300 font-medium"
              error={
                errors.email?.message ? t(errors.email.message) : undefined
              }
              required
            >
              <Input
                {...register("email")}
                id="email"
                type="email"
                disabled={isLoading}
                placeholder={t("auth.signIn.emailPlaceholder")}
                className="border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-400"
              />
            </FormField>
            <FormField
              label={t("auth.signIn.passwordLabel")}
              labelClassName="text-gray-700 dark:text-gray-300 font-medium"
              error={
                errors.password?.message
                  ? t(errors.password.message)
                  : undefined
              }
              required
            >
              <Input
                {...register("password")}
                id="password"
                type="password"
                disabled={isLoading}
                placeholder={t("auth.signIn.passwordPlaceholder")}
                className="border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-400"
              />
            </FormField>
          </div>

          {error && (
            <div className="px-4">
              <Typography
                variant="body2"
                color="error"
                align="center"
                className="rounded-lg bg-red-50 p-2 shadow-lg dark:bg-red-900/20"
              >
                {error}
              </Typography>
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            className="w-full"
            loading={isLoading}
            disabled={isLoading || !isValid || !isDirty}
          >
            {t("auth.signIn.submit")}
          </Button>
        </form>

        <div className="text-center">
          <Typography variant="body2" color="secondary">
            {t("auth.signIn.noAccount")}{" "}
            <Link
              to={routes.signup}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t("auth.signIn.createAccount")}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
