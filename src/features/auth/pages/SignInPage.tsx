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
      await signin({ username: data.email, password: data.password }).unwrap();
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
    <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="w-full max-w-[440px] space-y-8 p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <Typography
            size="xl"
            weight="bold"
            align="center"
            className="text-gray-900 dark:text-white text-[28px]"
          >
            {t("auth.signIn.title")}
          </Typography>
          <Typography
            align="center"
            className="text-gray-600 dark:text-gray-300"
          >
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
                className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
                className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </FormField>
          </div>

          {error && (
            <div className="px-4">
              <Typography
                color="error"
                size="sm"
                align="center"
                className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded-lg shadow-lg"
              >
                {error}
              </Typography>
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            disabled={isLoading || !isValid || !isDirty}
            loading={isLoading}
            className="w-full py-3 text-lg rounded-xl font-medium"
          >
            {t("auth.signIn.button")}
          </Button>
        </form>

        <div className="text-center">
          <Typography className="text-gray-600 dark:text-gray-300">
            {t("auth.signIn.noAccount")}{" "}
            <Link
              to={routes.signup}
              className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity font-medium"
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
