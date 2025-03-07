// src/components/UserInfoModal.tsx
import { UserCircleIcon, CogIcon, LogoutIcon } from "@heroicons/react/outline";
import XMarkIcon from "../icons/XMarkIcon";
import EnvelopeIcon from "../icons/EnvelopeIcon";
// import { User } from "../../types";
import nopic from "../../assets/nopic.jpg";

interface UserInfoModalProps {
  setIsOpen: (state: boolean) => void;
  onLogout?: () => void;
}

export const UserInfoModal = ({ setIsOpen, onLogout }: UserInfoModalProps) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 dark:bg-opacity-70 backdrop-blur-xs z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white">
            Account Info
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={nopic}
              alt="current-user"
              className="w-20 h-20 rounded-full border-4 border-blue-100 dark:border-blue-900"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
          </div>
          <h2 className="text-xl font-semibold dark:text-white">
            Anirban Dutta
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            @hello_anirban
          </p>
        </div>

        {/* User Info List */}
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
              <p className="dark:text-white">"Hey there! I'm using Aalap</p>
            </div>
          </div>

          <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <EnvelopeIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="dark:text-white">meanirbandutta22@gmail.com</p>
            </div>
          </div>

          {/* {user.phone && (
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <PhoneIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="dark:text-white">{user.phone}</p>
              </div>
            </div>
          )} */}

          {/* Settings Option */}
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <CogIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3" />
            <span className="dark:text-white">Settings</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogoutIcon className="h-6 w-6 mr-3" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
