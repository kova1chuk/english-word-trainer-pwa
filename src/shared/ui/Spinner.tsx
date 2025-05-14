import type { FC } from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = "md", className = "" }) => {
  const sizeClass = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];

  return (
    <div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClass} ${className}`.trim()}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
