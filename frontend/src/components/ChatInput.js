import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded dark:bg-gray-700"
      />
      <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
    </div>
  );
}
