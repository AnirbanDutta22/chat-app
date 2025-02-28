import { Chat, Group } from "../../types";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import nopic from "../../assets/nopic.jpg";

// Type guard to check if it's a Chat
const isChat = (chat: Chat | Group): chat is Chat => {
  return "isOnline" in chat;
};

export const ChatHeader = ({ chat }: { chat: Chat | Group | null }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {chat ? (
        <>
          <img
            src={chat.avatar || nopic}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white">
              {chat.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isChat(chat) ? (
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      chat.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {chat.isOnline ? "Online" : "Offline"}
                </span>
              ) : (
                `${chat.members} members`
              )}
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
          </div>
        </div>
      )}
    </div>
    <ThemeSwitcher />
  </div>
);
