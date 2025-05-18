// TODO: SignUpPage
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import { useSignUpMutation } from "../api/authApi";

import type { SignUpRequest } from "../types";

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [formData, setFormData] = useState<SignUpRequest>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signUp(formData).unwrap();
      navigate("/auth/signin");
    } catch (err) {
      setError(t("auth.signUp.error"));
      console.error("Failed to sign up:", err);
    }
  };

  const handleChange = (field: keyof SignUpRequest, value: string) => {
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
            {t("auth.signUp.title")}
          </Typography>
          <Typography
            variant="body1"
            className="text-center text-gray-600 dark:text-gray-300"
          >
            {t("auth.signUp.description")}
          </Typography>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Typography variant="subtitle2" className="mb-2">
                {t("auth.signUp.email")}
              </Typography>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={t("auth.signUp.emailPlaceholder")}
                required
              />
            </div>

            <div>
              <Typography variant="subtitle2" className="mb-2">
                {t("auth.signUp.password")}
              </Typography>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder={t("auth.signUp.passwordPlaceholder")}
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
            {t("auth.signUp.submit")}
          </Button>

          <div className="text-center">
            <Typography
              variant="body2"
              className="text-gray-600 dark:text-gray-300"
            >
              {t("auth.signUp.haveAccount")}{" "}
              <Link
                to="/auth/signin"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t("auth.signUp.signIn")}
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
