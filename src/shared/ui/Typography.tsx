import React, { type ReactNode } from "react";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

type Color =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning";
type Align = "left" | "center" | "right" | "justify";

export interface TypographyProps {
  children: ReactNode;
  variant?: Variant;
  color?: Color;
  align?: Align;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-bold tracking-tight",
  h3: "text-2xl font-bold tracking-tight",
  h4: "text-xl font-bold tracking-tight",
  h5: "text-lg font-bold tracking-tight",
  h6: "text-base font-bold tracking-tight",
  subtitle1: "text-lg font-medium",
  subtitle2: "text-base font-medium",
  body1: "text-base",
  body2: "text-sm",
  caption: "text-xs",
  overline: "text-xs uppercase tracking-wider font-medium",
};

const colorStyles: Record<Color, string> = {
  default: "text-gray-900 dark:text-white",
  primary: "text-blue-600 dark:text-blue-400",
  secondary: "text-gray-600 dark:text-gray-300",
  error: "text-red-600 dark:text-red-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
};

const alignStyles: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body1",
  color = "default",
  align = "left",
  className = "",
}) => {
  const variantStyle = variantStyles[variant];
  const colorStyle = colorStyles[color];
  const alignStyle = alignStyles[align];
  const combinedClassName =
    `${variantStyle} ${colorStyle} ${alignStyle} ${className}`.trim();

  switch (variant) {
    case "h1":
      return <h1 className={combinedClassName}>{children}</h1>;
    case "h2":
      return <h2 className={combinedClassName}>{children}</h2>;
    case "h3":
      return <h3 className={combinedClassName}>{children}</h3>;
    case "h4":
      return <h4 className={combinedClassName}>{children}</h4>;
    case "h5":
      return <h5 className={combinedClassName}>{children}</h5>;
    case "h6":
      return <h6 className={combinedClassName}>{children}</h6>;
    case "subtitle1":
    case "subtitle2":
    case "body1":
    case "body2":
      return <p className={combinedClassName}>{children}</p>;
    case "caption":
    case "overline":
      return <span className={combinedClassName}>{children}</span>;
    default:
      return <p className={combinedClassName}>{children}</p>;
  }
};

export default Typography;
