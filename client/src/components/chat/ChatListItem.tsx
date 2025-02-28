// src/components/ChatListItem.tsx
import { Chat, Group } from "../../types";
import { cn } from "../../lib/utils";
import nopic from "../../assets/nopic.jpg";

// Type guard to check if it's a Chat
const isChat = (chat: Chat | Group): chat is Chat => {
  return "isOnline" in chat;
};

export const ChatListItem = ({
  chat,
  isSelected,
  onClick,
}: {
  chat: Chat | Group;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "w-[95%] mx-auto mb-3 rounded-md flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer shadow shadow-gray-200 dark:shadow-gray-600",
      isSelected && "bg-gray-50 dark:bg-gray-950"
    )}
  >
    <div className="relative">
      <img
        src={chat.avatar || nopic}
        alt={chat.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      {isChat(chat) && chat.isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 dark:bg-yellow-500 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
    <div className="ml-4 flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold dark:text-white text-gray-800 truncate">
          {chat.name}
        </h3>
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
          <span className="bg-green-500 dark:text-black text-white rounded-full px-2 py-1 text-xs">
            {chat.unreadCount}
          </span>
        )}
      </div>
    </div>
  </div>
);
