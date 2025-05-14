interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-lg 
    border border-border-light dark:border-border-dark
    bg-background-light dark:bg-background-darker 
    text-text-primary-light dark:text-text-primary-dark 
    placeholder-text-secondary-light dark:placeholder-text-secondary-dark
    focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-light
    transition-colors ${className}`.trim()}
  />
);

export default Input;
