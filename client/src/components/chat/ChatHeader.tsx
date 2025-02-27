// src/components/ChatHeader.tsx
import { Chat } from "../../types";

export const ChatHeader = ({ chat }: { chat: Chat | null }) => (
  <div className="border-b border-gray-200 p-4 flex items-center">
    {chat ? (
      <>
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="font-semibold text-gray-800">{chat.name}</h2>
          <p className="text-sm text-gray-600">
            {chat.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </>
    ) : (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
    )}
  </div>
);
