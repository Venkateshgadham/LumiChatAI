import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <aside className="w-72 md:w-64 border-r border-gray-200 dark:border-gray-700">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>

          <Routes>
            <Route path="/" element={<div className="p-6">Start a new chat</div>} />
            <Route path="/chat/:sessionId" element={<ChatWindow />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
