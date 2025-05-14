import type { ReactNode } from "react";

export type TypographyKind = {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "warning"
    | "success"
    | "error"
    | "highlight"
    | "default";
  size?: "sm" | "md" | "lg" | "xl";
  weight?: "normal" | "medium" | "bold";
  align?: "left" | "center" | "right";
};

interface TypographyProps extends TypographyKind {
  children: ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  color = "default",
  size = "md",
  weight = "normal",
  align = "left",
  children,
  className = "",
}) => {
  const colorClass = {
    default: "text-gray-900 dark:text-white",
    primary: "text-blue-600 dark:text-blue-400",
    secondary: "text-gray-600 dark:text-gray-300",
    accent: "text-purple-600 dark:text-purple-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    highlight: "text-blue-500 dark:text-blue-400",
  }[color];

  const sizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }[size];

  const weightClass = {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  }[weight];

  const alignClass = `text-${align}`;

  return (
    <p
      className={`${colorClass} ${sizeClass} ${weightClass} ${alignClass} transition-colors ${className}`.trim()}
    >
      {children}
    </p>
  );
};

export default Typography;
