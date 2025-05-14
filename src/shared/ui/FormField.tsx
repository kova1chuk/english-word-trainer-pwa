import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  labelClassName?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  labelClassName = "text-gray-700 dark:text-gray-300",
  required = false,
}) => (
  <div className="mb-4">
    <label className={`block mb-1 font-medium ${labelClassName}`}>
      {label}
      {required && (
        <span
          className="ml-1 text-red-500 dark:text-red-400"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
    {children}
    <div className="min-h-[20px]">
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  </div>
);

export default FormField;
