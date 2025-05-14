import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-lg 
    border border-gray-300 dark:border-gray-600
    bg-gray-50 dark:bg-gray-900 
    text-gray-900 dark:text-white 
    placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    transition-colors ${className}`.trim()}
  />
);

export default Input;
