// src/components/chat/MessageList.tsx
import { Message } from "../../types";
import { MessageItem } from "./MessageItem";

export const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-600">
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1];
        const nextMessage = messages[index + 1];

        const isConsecutivePrevious =
          prevMessage?.senderId === message.senderId &&
          message.timestamp - prevMessage.timestamp < 60000; // 1 minute

        const isConsecutiveNext =
          nextMessage?.senderId === message.senderId &&
          nextMessage.timestamp - message.timestamp < 60000;

        return (
          <MessageItem
            key={message.id}
            message={message}
            showAvatar={!isConsecutivePrevious}
            showTimestamp={!isConsecutiveNext}
          />
        );
      })}
    </div>
  );
};
