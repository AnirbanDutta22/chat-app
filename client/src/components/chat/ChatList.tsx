// src/components/ChatList.tsx
import { Chat } from "../../types";
import { ChatListItem } from "./ChatListItem";

export const ChatList = ({
  chats,
  selectedChatId,
  onSelectChat,
}: {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}) => (
  <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
    <div className="p-4 border-b border-gray-200">
      <input
        type="text"
        placeholder="Search or start new chat"
        className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isSelected={chat.id === selectedChatId}
          onClick={() => onSelectChat(chat.id)}
        />
      ))}
    </div>
  </div>
);
