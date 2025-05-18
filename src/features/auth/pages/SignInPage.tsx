import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import { useSignInMutation } from "../api/authApi";
import { useAppDispatch } from "../store/hooks";
import { setToken } from "../store/slice";

import type { SignInRequest } from "../types";

const SignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const [formData, setFormData] = useState<SignInRequest>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await signIn(formData).unwrap();
      dispatch(setToken(response));
      navigate("/");
    } catch (err) {
      setError(t("auth.signIn.error"));
      console.error("Failed to sign in:", err);
    }
  };

  const handleChange = (field: keyof SignInRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Typography variant="h1" className="text-center mb-4">
            {t("auth.signIn.title")}
          </Typography>
          <Typography
            variant="body1"
            className="text-center text-gray-600 dark:text-gray-300"
          >
            {t("auth.signIn.description")}
          </Typography>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Typography variant="subtitle2" className="mb-2">
                {t("auth.signIn.email")}
              </Typography>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={t("auth.signIn.emailPlaceholder")}
                required
              />
            </div>

            <div>
              <Typography variant="subtitle2" className="mb-2">
                {t("auth.signIn.password")}
              </Typography>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder={t("auth.signIn.passwordPlaceholder")}
                required
              />
            </div>
          </div>

          {error && (
            <Typography className="text-red-500 text-center">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            color="primary"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {t("auth.signIn.submit")}
          </Button>

          <div className="text-center">
            <Typography
              variant="body2"
              className="text-gray-600 dark:text-gray-300"
            >
              {t("auth.signIn.noAccount")}{" "}
              <Link
                to="/auth/signup"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t("auth.signIn.signUp")}
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
