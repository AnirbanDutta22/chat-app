// src/components/MessageStatus.tsx
import { cn } from "../../lib/utils";
import { Message } from "../../types";

export const MessageStatus = ({ status }: { status: Message["status"] }) => {
  const getIcon = () => {
    switch (status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "read":
        return "✓✓";
      default:
        return "◷";
    }
  };

  return (
    <span
      className={cn(
        "ml-2 text-xs",
        status === "read" ? "text-blue-500" : "text-gray-400"
      )}
    >
      {getIcon()}
    </span>
  );
};
