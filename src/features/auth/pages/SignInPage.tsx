import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { routes } from "@/router/routes";
import Button from "@/shared/ui/Button";
import FormField from "@/shared/ui/FormField";
import Input from "@/shared/ui/Input";
import Typography from "@/shared/ui/Typography";

import { useSigninMutation } from "../store/authApi";

const SignInPage = () => {
  const navigate = useNavigate();
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
          : "Failed to sign in";
      setError(errorMessage || "Failed to sign in");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="space-y-2">
          <Typography size="xl" weight="bold" align="center">
            Welcome Back
          </Typography>
          <Typography color="secondary" size="sm" align="center">
            Sign in to continue learning
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
            Sign In
          </Button>
        </form>

        <div className="text-center">
          <Typography color="secondary" size="sm">
            Don't have an account?{" "}
            <Link
              to={routes.signup}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign Up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
