import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
}) => {
  return (
    <label className="flex items-center cursor-pointer gap-2">
      {label && (
        <span className="text-sm select-none text-gray-900 dark:text-gray-100">
          {label}
        </span>
      )}
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-checked:bg-blue-500 rounded-full transition duration-300 peer-disabled:opacity-50"></div>
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-gray-200 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
      </div>
    </label>
  );
};

export default Switch;
