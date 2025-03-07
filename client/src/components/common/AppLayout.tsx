/* eslint-disable react-refresh/only-export-components */
// src/components/AppLayout.tsx
import { useState } from "react";
import { ChatList } from "../chat/ChatList";
import { Chat, Group } from "../../types";
import { Outlet } from "react-router-dom";

export const mockChats: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: Date.now() - 3600000,
    unreadCount: 2,
    isOnline: false,
    avatar: "",
    isTyping: false,
  },
  {
    id: "2",
    name: "Raja Paul",
    lastMessage: "Koi bal",
    timestamp: Date.now() - 3600000,
    unreadCount: 1,
    isOnline: true,
    avatar: "",
    isTyping: true,
  },
  // Add more mock chats...
];

export const mockGroups: Group[] = [
  {
    id: "4",
    name: "Adda group",
    lastMessage: "Hey, how are you?",
    timestamp: Date.now() - 3600000,
    unreadCount: 2,
    avatar: "",
    isTyping: false,
    members: 3,
  },
];

export const AppLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1");

  return (
    <div className="flex h-screen bg-white">
      <ChatList
        chats={mockChats}
        groups={mockGroups}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />
      <Outlet />
    </div>
  );
};
