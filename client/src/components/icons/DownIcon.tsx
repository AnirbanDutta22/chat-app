import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function DownIcon({ className }: { className?: string }) {
  const { theme } = useContext(ThemeContext);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={theme === "dark" ? "#99a1af" : "currentColor"}
      className={`size-5 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default DownIcon;
