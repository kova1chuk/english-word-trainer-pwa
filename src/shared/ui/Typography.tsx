import type { ReactNode } from "react";

export type TypographyKind = {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "warning"
    | "success"
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
    default: "text-gray-900 dark:text-gray-100",
    primary: "text-primary dark:text-primary-light",
    secondary: "text-gray-600 dark:text-gray-400",
    accent: "text-accent dark:text-accent-light",
    warning: "text-warning dark:text-warning-light",
    success: "text-success dark:text-success-light",
    highlight: "text-highlight dark:text-highlight-light",
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
