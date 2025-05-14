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
    default: "text-text-primary-light dark:text-text-primary-dark",
    primary: "text-primary-DEFAULT dark:text-primary-light",
    secondary: "text-text-secondary-light dark:text-text-secondary-dark",
    accent: "text-text-accent-light dark:text-text-accent-dark",
    warning: "text-warning-DEFAULT dark:text-warning-light",
    success: "text-success-DEFAULT dark:text-success-light",
    error: "text-error-DEFAULT dark:text-error-light",
    highlight: "text-primary-light dark:text-primary-DEFAULT",
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
