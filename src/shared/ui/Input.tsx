interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100 
    placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent
    transition-colors ${className}`.trim()}
  />
);

export default Input;
