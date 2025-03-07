import { UserGroupIcon } from "@heroicons/react/outline";
import { useState } from "react";
import XMarkIcon from "../icons/XMarkIcon";
import EnvelopeIcon from "../icons/EnvelopeIcon";

function InviteAddModal({
  setIsOpen,
}: {
  setIsOpen: (state: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<"invite" | "group">("invite");
  return (
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
  );
}

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

export default InviteAddModal;
