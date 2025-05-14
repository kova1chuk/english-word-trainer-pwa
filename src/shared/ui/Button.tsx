import Spinner from "./Spinner";

import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "warning" | "success" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = "md",
  color = "primary",
  className = "",
  type = "button",
  disabled = false,
  loading = false,
}) => {
  const sizeClass = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[size];

  const spinnerSize = {
    sm: "sm",
    md: "md",
    lg: "lg",
  }[size] as "sm" | "md" | "lg";

  const colorClass = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800",
    accent:
      "bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700 disabled:bg-purple-300 dark:disabled:bg-purple-800",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700 disabled:bg-yellow-300 dark:disabled:bg-yellow-800",
    success:
      "bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600 disabled:bg-green-300 dark:disabled:bg-green-800",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 disabled:bg-transparent dark:disabled:bg-transparent disabled:text-gray-400 dark:disabled:text-gray-600",
  }[color];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${sizeClass} ${colorClass} rounded-md font-medium shadow-sm hover:shadow transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`.trim()}
    >
      {loading && <Spinner size={spinnerSize} />}
      {children}
    </button>
  );
};

export default Button;
