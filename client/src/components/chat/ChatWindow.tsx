// src/components/ChatWindow.tsx (updated)
import { useState } from "react";
import { Chat, Group, Message } from "../../types";
import { MessageList } from "./MessageList";
import { InputArea } from "./InputArea";
import { ChatHeader } from "./ChatHeader";

export const ChatWindow = ({ chat }: { chat: Chat | Group }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: "currentUser",
      timestamp: Date.now(),
      status: "sent",
      isSent: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 2000);
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col overflow-hidden">
      <ChatHeader chat={chat} />
      <MessageList messages={messages} />
      {chat && <InputArea onSend={handleSend} />}
    </div>
  );
};
