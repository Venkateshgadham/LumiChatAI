import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import TableResponse from "./TableResponse";
import AnswerFeedback from "./AnswerFeedback";
import ErrorMessage from "./ErrorMessage";

export default function ChatWindow() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const listRef = useRef();

  // Fetch session history
  useEffect(() => {
    if (!sessionId) return;

    setError("");

    fetch(`http://localhost:5000/api/session/${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch session");
        return res.json();
      })
      .then((data) => setMessages(data.history || []))
      .catch((err) => setError(err.message));
  }, [sessionId]);


  // Auto-scroll to bottom
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);


  // Send message
  const sendMessage = async (text) => {
    if (!sessionId) {
      setError("Invalid session.");
      return;
    }

    setError("");

    try {
      const res = await fetch(`http://localhost:5000/api/chat/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) {
        const errRes = await res.json();
        throw new Error(errRes.error || "Server error");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "user", message: text },
        { role: "bot", message: data.reply, table: data.table }
      ]);

    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="flex flex-col h-[80vh]">

      <ErrorMessage message={error} />

      {/* Chat list */}
      <div
        ref={listRef}
        className="flex-1 overflow-auto space-y-4 p-2 bg-gray-50 dark:bg-gray-900 rounded"
      >
        {messages.length === 0 && (
          <div className="text-gray-500 text-center mt-10">
            No messages yet. Ask something!
          </div>
        )}

        {messages.map((m, index) => (
          <div
            key={index}
            className={`
              p-4 rounded shadow-md 
              ${m.role === "bot" 
                ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-l-4 border-gray-500"
              }
            `}
          >
            <p className="text-xs opacity-60 mb-1">{m.role.toUpperCase()}</p>

            <p className="mb-2 leading-relaxed">{m.message}</p>

            {m.table && <TableResponse tableData={m.table} />}

            <div className="mt-3">
              <AnswerFeedback />
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4">
        <ChatInput onSend={sendMessage} />
      </div>
      
    </div>
  );
}
