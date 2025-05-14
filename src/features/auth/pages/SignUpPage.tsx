// TODO: SignUpPage
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

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 50;

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signup, { isLoading }] = useSignupMutation();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setError("");

    try {
      await signup({ email: data.email, password: data.password }).unwrap();
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

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-5">
            <FormField
              label={t("auth.signUp.emailLabel")}
              labelClassName="text-gray-700 dark:text-gray-300 font-medium"
              error={errors.email?.message}
            >
              <Input
                {...register("email", {
                  required: t("validation.required", { field: "Email" }),
                  pattern: {
                    value: EMAIL_REGEX,
                    message: t("validation.email"),
                  },
                  maxLength: {
                    value: 100,
                    message: t("validation.maxLength", { max: 100 }),
                  },
                  validate: {
                    notEmpty: (value) =>
                      value.trim().length > 0 || t("validation.notEmpty"),
                  },
                })}
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
              error={errors.password?.message}
            >
              <Input
                {...register("password", {
                  required: t("validation.required", { field: "Password" }),
                  minLength: {
                    value: PASSWORD_MIN_LENGTH,
                    message: t("validation.minLength", {
                      min: PASSWORD_MIN_LENGTH,
                    }),
                  },
                  maxLength: {
                    value: PASSWORD_MAX_LENGTH,
                    message: t("validation.maxLength", {
                      max: PASSWORD_MAX_LENGTH,
                    }),
                  },
                  validate: {
                    notEmpty: (value) =>
                      value.trim().length > 0 || t("validation.notEmpty"),
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) || t("validation.password.uppercase"),
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) || t("validation.password.lowercase"),
                    hasNumber: (value) =>
                      /\d/.test(value) || t("validation.password.number"),
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      t("validation.password.special"),
                  },
                })}
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
              error={errors.confirmPassword?.message}
            >
              <Input
                {...register("confirmPassword", {
                  required: t("validation.required", {
                    field: "Password confirmation",
                  }),
                  validate: (value) =>
                    value === password || t("validation.password.match"),
                })}
                id="confirmPassword"
                type="password"
                disabled={isLoading}
                placeholder={t("auth.signUp.confirmPasswordPlaceholder")}
                className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
            disabled={isLoading || !isValid || !isDirty}
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
