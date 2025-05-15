// TODO: SignUpPage
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

import { useSignupMutation } from "../store/authApi";
import { signUpSchema } from "../validation/auth.schema";

import type { SignUpFormData } from "../validation/auth.schema";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signup, { isLoading }] = useSignupMutation();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormData) => {
    setError("");

    try {
      await signup({
        email: data.email,
        password: data.password,
        confirmPassword: "",
      }).unwrap();
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
          <Typography variant="h2" align="center">
            {t("auth.signUp.title")}
          </Typography>
          <Typography variant="body1" color="secondary" align="center">
            {t("auth.signUp.subtitle")}
          </Typography>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-5">
            <FormField
              label={t("auth.signUp.emailLabel")}
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
                placeholder={t("auth.signUp.emailPlaceholder")}
                className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </FormField>
            <FormField
              label={t("auth.signUp.passwordLabel")}
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
                placeholder={t("auth.signUp.passwordPlaceholder")}
                className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </FormField>
            <FormField
              label={t("auth.signUp.confirmPasswordLabel")}
              labelClassName="text-gray-700 dark:text-gray-300 font-medium"
              error={
                errors.confirmPassword?.message
                  ? t(errors.confirmPassword.message)
                  : undefined
              }
              required
            >
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                disabled={isLoading}
                placeholder={t("auth.signUp.confirmPasswordPlaceholder")}
                className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
            {t("auth.signUp.submit")}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Typography variant="body2" color="secondary">
            {t("auth.signUp.haveAccount")}{" "}
            <Link
              to={routes.signin}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t("auth.signUp.signIn")}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
