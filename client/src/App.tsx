// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/common/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { ChatWindow } from "./components/chat/ChatWindow";
import { mockChats, mockGroups } from "./components/common/AppLayout";
import { store } from "./store/index";
import { Provider } from "react-redux";

export default function App() {
  return (
    <div className="h-screen w-full">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/chat" element={<AppLayout />}>
              <Route
                index
                element={
                  <ChatWindow
                    chat={
                      mockChats.find((c) => c.id === "1") ||
                      mockGroups.find((c) => c.id === "4")
                    }
                  />
                }
              />
            </Route>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
