// src/components/ui/Button.tsx
import { cn } from "../../lib/utils";

export const Button = ({
  className,
  isLoading,
  loadingText,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
}) => (
  <button
    className={cn(
      "w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )}
    disabled={isLoading || props.disabled}
    {...props}
  >
    {isLoading ? loadingText : props.children}
  </button>
);
