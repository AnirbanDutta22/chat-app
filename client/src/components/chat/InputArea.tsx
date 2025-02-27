import { useState } from "react";
import { InputAreaProps } from "../../types";

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
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:border-blue-500"
          disabled={isSending}
        />
        <button
          type="submit"
          className="rounded-full bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 disabled:opacity-50"
          disabled={isSending || !message.trim()}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
};
