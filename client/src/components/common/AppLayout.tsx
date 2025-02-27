// src/components/AppLayout.tsx
import { useState } from "react";
import { ChatList } from "../chat/ChatList";
import { ChatWindow } from "../chat/ChatWindow";
import { Chat } from "../../types";

const mockChats: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: Date.now() - 3600000,
    unreadCount: 2,
    isOnline: false,
    avatar: "https://example.com/avatar1.jpg",
    isTyping: false,
  },
  {
    id: "2",
    name: "Raja Paul",
    lastMessage: "Koi bal",
    timestamp: Date.now() - 3600000,
    unreadCount: 1,
    isOnline: true,
    avatar: "https://example.com/avatar1.jpg",
    isTyping: true,
  },
  // Add more mock chats...
];

export const AppLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1");

  return (
    <div className="flex h-screen bg-white">
      <ChatList
        chats={mockChats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />
      <ChatWindow
        chat={mockChats.find((c) => c.id === selectedChatId) || null}
      />
    </div>
  );
};
