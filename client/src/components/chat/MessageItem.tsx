import { Message } from "../../types";
import { cn } from "../../lib/utils";
import { MessageStatus } from "./MessageStatus";

export const MessageItem = ({
  message,
  showAvatar,
  showTimestamp,
}: {
  message: Message;
  showAvatar: boolean;
  showTimestamp: boolean;
}) => {
  const isSent = message.senderId === "currentUser";

  return (
    <div
      className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2 px-4`}
    >
      {!isSent && showAvatar && (
        <div className="self-end mr-2">
          <img
            src={message.senderAvatar}
            alt={message.senderName}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-lg p-3 text-sm break-words",
          isSent
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        )}
      >
        <p>{message.text}</p>

        {(showTimestamp || isSent) && (
          <div className="flex items-center justify-end mt-1 space-x-1">
            <span className="text-xs opacity-70">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {isSent && <MessageStatus status={message.status} />}
          </div>
        )}
      </div>
    </div>
  );
};
