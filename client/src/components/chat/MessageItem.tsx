// src/components/chat/MessageItem.tsx
import { Message } from "../../types";
import { cn } from "../../lib/utils";
import { MessageStatus } from "./MessageStatus";

export const MessageItem = ({ message }: { message: Message }) => {
  const isSent = message.isSent;

  return (
    <div
      className={cn(
        "flex px-4",
        isSent ? "justify-end" : "justify-start",
        "mb-2 last:mb-4"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] lg:max-w-[75%] rounded-xl p-3 text-sm break-words",
          "transition-colors duration-200",
          isSent
            ? "bg-blue-600 text-white rounded-br-none dark:bg-blue-700"
            : "bg-gray-100 text-gray-900 rounded-bl-none dark:bg-gray-800 dark:text-gray-100"
        )}
      >
        <p className="leading-relaxed">{message.text}</p>
        <div className="flex items-center justify-end mt-2 space-x-1.5">
          <time className="text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
          {isSent && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );
};
