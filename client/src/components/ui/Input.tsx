// src/components/ui/Input.tsx
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    label: string;
  }
>(({ className, error, label, ...props }, ref) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        ref={ref}
        className={cn(
          "mt-1 px-4 py-2 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm",
          error && "border-red-500 focus:ring-red-200",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";
