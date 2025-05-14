import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "warning" | "success" | "ghost";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = "md",
  color = "primary",
  className = "",
}) => {
  const sizeClass = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[size];

  const colorClass = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors",
    accent:
      "bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors",
    warning:
      "bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors",
  }[color];

  return (
    <button
      onClick={onClick}
      className={`${sizeClass} ${colorClass} rounded-md font-medium shadow-sm hover:shadow active:scale-[0.98] transition-all ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
