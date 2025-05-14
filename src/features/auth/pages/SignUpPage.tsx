// TODO: SignUpPage
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import FormField from "@/shared/ui/FormField";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import { useSignupMutation } from "../store/authApi";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
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
          : "Failed to create account";
      setError(errorMessage || "Failed to create account");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="space-y-2">
          <Typography size="xl" weight="bold" align="center">
            Create Account
          </Typography>
          <Typography color="secondary" size="sm" align="center">
            Start your language learning journey
          </Typography>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormField label="Email">
            <Input
              id="email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </FormField>
          <FormField label="Password">
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </FormField>

          {error && (
            <Typography color="warning" size="sm" align="center">
              {error}
            </Typography>
          )}

          <Button color="accent" className="w-full">
            Create Account
          </Button>
        </form>

        <div className="text-center">
          <Typography color="secondary" size="sm">
            Already have an account?{" "}
            <Link
              to={routes.signin}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign In
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
