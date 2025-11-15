import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [sessions, setSessions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/sessions")
      .then(res => res.json())
      .then(setSessions)
      .catch(err => console.error("Failed to load sessions", err));
  }, []);

  const newChat = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/new-chat");
      const data = await res.json();
      navigate(`/chat/${data.sessionId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <button onClick={newChat} className="px-3 py-2 bg-blue-600 text-white rounded">+ New Chat</button>
        <button onClick={() => setCollapsed(!collapsed)} className="px-2 py-1 border rounded ml-2">
          {collapsed ? "▸" : "◂"}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="text-sm mb-3">User: <strong>Guest</strong></div>
          <h4 className="text-xs uppercase text-gray-500 mb-2">Sessions</h4>

          <nav className="flex-1 overflow-auto space-y-2">
            {sessions.map(s => (
              <div
                key={s.id}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => navigate(`/chat/${s.id}`)}
              >
                {s.title || s.id}
              </div>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}
