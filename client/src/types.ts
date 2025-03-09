export interface MessageItemProps extends Message {
  isConsecutive: boolean;
}

export interface InputAreaProps {
  onSend: (message: string) => void;
  isSending?: boolean;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: number;
  status: "sent" | "delivered" | "read";
  isSent: boolean;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
  isOnline: boolean;
  avatar: string;
  isTyping: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  status: string;
}

export interface Group {
  id: string;
  name: string;
  members: number;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
  avatar: string;
  isTyping: boolean;
}

export type SignupType = {
  email: string;
  name: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};
