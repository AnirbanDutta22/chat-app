// src/components/ChatList.tsx
import { useContext, useState } from "react";
import { Chat, Group } from "../../types";
import { ChatListItem } from "./ChatListItem";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserGroupIcon } from "@heroicons/react/outline";
import nopic from "../../assets/nopic.jpg";

const EnvelopeIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`size-6 ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const XMarkIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`size-6 ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export const ChatList = ({
  chats,
  groups,
  selectedChatId,
  onSelectChat,
}: {
  chats: Chat[];
  groups: Group[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}) => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"invite" | "group">("invite");
  const [activeNavTab, setActiveNavTab] = useState<"all" | "chats" | "groups">(
    "all"
  );
  return (
    <div className="relative w-full sm:w-1/3 border-r border-gray-200 flex flex-col dark:bg-gray-900 overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl text-left font-bold text-blue-600 dark:text-blue-400">
          Aalap{" "}
          <span className="block text-[10px] font-semibold">Fun & Secure</span>
        </h1>
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-[60%] sm:w-[80%] px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-3xl bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <img
          src={nopic}
          alt="current-user"
          className="block sm:hidden w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Tab Navigation */}
        <div className="flex border-b dark:border-gray-700 mb-3">
          <button
            onClick={() => setActiveNavTab("all")}
            className={`flex-1 p-4 text-sm font-medium cursor-pointer ${
              activeNavTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveNavTab("chats")}
            className={`flex-1 p-4 text-sm font-medium cursor-pointer ${
              activeNavTab === "chats"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Chats
          </button>
          <button
            onClick={() => setActiveNavTab("groups")}
            className={`flex-1 p-4 text-sm font-medium cursor-pointer ${
              activeNavTab === "groups"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Groups
          </button>
        </div>

        {/* Chat List Content */}
        <div className="flex-1 overflow-y-auto">
          {(activeNavTab === "all" || activeNavTab === "chats") && (
            <div>
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <ChatListItem
                    key={chat.id}
                    chat={chat}
                    isSelected={chat.id === selectedChatId}
                    onClick={() => onSelectChat(chat.id)}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No chats found
                </div>
              )}
            </div>
          )}

          {(activeNavTab === "all" || activeNavTab === "groups") && (
            <div>
              {groups.length > 0 ? (
                groups.map((group) => (
                  <ChatListItem
                    key={group.id}
                    chat={group}
                    isSelected={group.id === selectedChatId}
                    onClick={() => onSelectChat(group.id)}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No groups found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute bottom-10 right-10 cursor-pointer rounded-full size-10 bg-blue-600 hover:bg-blue-700 dark:bg-amber-300 dark:hover:bg-amber-400 transition-all ease-in-out justify-center items-center flex shadow-2xl hover:rotate-90"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={theme === "dark" ? "currentColor" : "#fff"}
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-30 dark:bg-opacity-50 backdrop-blur-xs">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-96 p-6 space-y-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold dark:text-white">
                {activeTab === "invite" ? "Invite People" : "Create Group"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b dark:border-gray-700 pb-2">
              <button
                onClick={() => setActiveTab("invite")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === "invite"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <EnvelopeIcon className="h-4 w-4" />
                <span>Invite</span>
              </button>
              <button
                onClick={() => setActiveTab("group")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === "group"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <UserGroupIcon className="h-4 w-4" />
                <span>Group</span>
              </button>
            </div>

            {/* Content */}
            {activeTab === "invite" ? (
              <InviteForm onClose={() => setIsOpen(false)} />
            ) : (
              <GroupCreationForm onClose={() => setIsOpen(false)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const InviteForm = ({ onClose }: { onClose: () => void }) => (
  <form className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-medium dark:text-gray-300">
        Email or Username
      </label>
      <div className="relative">
        <EnvelopeIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Enter email or username"
          className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Send Invite
    </button>
  </form>
);

const GroupCreationForm = ({ onClose }: { onClose: () => void }) => (
  <form className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-medium dark:text-gray-300">
        Group Name
      </label>
      <div className="relative">
        <UserGroupIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Enter group name"
          className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium dark:text-gray-300">
        Add Members
      </label>
      <div className="relative">
        <EnvelopeIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Create Group
    </button>
  </form>
);
