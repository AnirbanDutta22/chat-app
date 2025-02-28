// src/components/chat/InputArea.tsx
import { useState } from "react";
import { InputAreaProps } from "../../types";
import { cn } from "../../lib/utils";
import FileIcon from "../icons/FileIcon";

export const InputArea = ({ onSend, isSending }: InputAreaProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-900"
    >
      <div className="flex items-center space-x-4">
        <FileIcon />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={cn(
            "flex-1 rounded-full px-6 py-3 border",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            "dark:border-gray-600 dark:bg-gray-800 dark:text-white",
            "transition-all duration-200"
          )}
          disabled={isSending}
        />
        <button
          type="submit"
          className={cn(
            "p-3 rounded-full bg-blue-600 text-white",
            "hover:bg-blue-700 disabled:opacity-50",
            "dark:bg-blue-700 dark:hover:bg-blue-800",
            "transition-colors duration-200"
          )}
          disabled={isSending || !message.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
