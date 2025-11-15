import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button onClick={() => setDark(d => !d)} className="px-3 py-1 border rounded">
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
