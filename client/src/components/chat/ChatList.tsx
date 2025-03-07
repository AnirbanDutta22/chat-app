// src/components/ChatList.tsx
import { useContext, useState } from "react";
import { Chat, Group } from "../../types";
import { ChatListItem } from "./ChatListItem";
import { ThemeContext } from "../../contexts/ThemeContext";
import nopic from "../../assets/nopic.jpg";
import InviteAddModal from "../modals/InviteAddModal";
import DownIcon from "../icons/DownIcon";
import InvitationList from "./InvitationList";

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
  const [activeNavTab, setActiveNavTab] = useState<"all" | "chats" | "groups">(
    "all"
  );
  const [isPendingListOpen, setPendingListOpen] = useState(false);
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
      <div className="h-auto overflow-y-auto">
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

      {/* Pending Invitation list */}
      <div
        className="mt-4 px-4 flex justify-between items-center"
        onClick={() => setPendingListOpen((prev) => !prev)}
      >
        <p className="text-gray-400">Pending invitations</p>
        <DownIcon className="cursor-pointer" />
      </div>

      {/* Add button */}
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

      {/* Invite-Add Modal Overlay */}
      {isOpen && <InviteAddModal setIsOpen={setIsOpen} />}

      {/* Pending List */}
      {isPendingListOpen && <InvitationList />}
    </div>
  );
};
