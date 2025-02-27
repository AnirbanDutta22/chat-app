// src/components/ChatListItem.tsx
import { Chat } from "../../types";
import { cn } from "../../lib/utils";

export const ChatListItem = ({
  chat,
  isSelected,
  onClick,
}: {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100",
      isSelected && "bg-blue-50"
    )}
  >
    <div className="relative">
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      {chat.isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
    <div className="ml-4 flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 truncate">{chat.name}</h3>
        <span className="text-xs text-gray-500">
          {new Date(chat.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 truncate">
          {chat.isTyping ? (
            <span className="text-blue-600">typing...</span>
          ) : (
            chat.lastMessage
          )}
        </p>
        {chat.unreadCount > 0 && (
          <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
            {chat.unreadCount}
          </span>
        )}
      </div>
    </div>
  </div>
);
