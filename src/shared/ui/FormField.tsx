import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => (
  <div className="mb-4">
    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
      {label}
    </label>
    {children}
    {error && (
      <p className="mt-1 text-sm text-warning dark:text-warning-light">
        {error}
      </p>
    )}
  </div>
);

export default FormField;
