// src/components/common/AuthLayout.tsx
export const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">ChatApp</h1>
        <p className="text-gray-600 mt-2">Connect with your community</p>
      </div>
      {children}
    </div>
  </div>
);
