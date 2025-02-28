// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/common/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/chat" element={<AppLayout />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
