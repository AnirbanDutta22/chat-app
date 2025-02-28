import { useContext } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { ThemeContext } from "../../contexts/ThemeContext";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-600" />
      )}
    </button>
  );
}

export default ThemeSwitcher;
