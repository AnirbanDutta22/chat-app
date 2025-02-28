import { useLocation } from "react-router-dom";

// src/components/common/AuthLayout.tsx
export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Aalap
              <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                Fun & Secure
              </span>
            </h1>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              {location.pathname === "/login"
                ? "Welcome Back!"
                : "Create your community"}
            </h2>
          </div>

          {children}
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 items-center justify-center p-12">
        <div className="max-w-lg text-white text-center">
          <div className="text-6xl font-bold mb-6">Aalap</div>
          <p className="text-xl mb-8">Where conversations come alive</p>
          <div className="space-y-6 text-left">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-10 rounded-full">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Real-time Chat</h3>
                <p className="opacity-90">Instant messaging with friends</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-10 rounded-full">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Secure</h3>
                <p className="opacity-90">End-to-end encryption</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-10 rounded-full">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Customizable</h3>
                <p className="opacity-90">Personalize your experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
