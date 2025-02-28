// src/pages/HomePage.tsx
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { ThemeContext } from "../contexts/ThemeContext";

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const features = [
    {
      title: "Real-time Chat",
      description: "Instant messaging with friends and colleagues",
      icon: "💬",
    },
    {
      title: "Secure",
      description: "End-to-end encryption for private conversations",
      icon: "🔒",
    },
    {
      title: "Multi-Device",
      description: "Access your chats from any device",
      icon: "📱",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50">
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left section */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl text-center font-bold text-blue-600 dark:text-blue-400"
              >
                Aalap{" "}
                <span className="block text-sm font-semibold">
                  Fun & Secure
                </span>
              </Link>
              <div className="hidden md:flex items-center ml-10 space-x-8">
                <Link
                  to="/chat"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Chat
                </Link>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-6 w-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>

              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isMenuOpen ? (
                  <XIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/chat"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Chat
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Connect with Everyone
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Secure and fast messaging platform that brings your conversations to
            life
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              to="/signup"
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:mt-24">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xl">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
