// ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the context type
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {}, // No-op function as a placeholder
};

// Create the context with an initial undefined value
export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  // Apply the theme class on mount and whenever the theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
