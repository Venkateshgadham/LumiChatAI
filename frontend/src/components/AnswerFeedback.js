import { useState } from "react";

export default function AnswerFeedback() {
  const [vote, setVote] = useState(null);
  return (
    <div className="flex items-center gap-3">
      <button onClick={() => setVote("like")} className={`px-2 ${vote==="like"?"text-green-600":""}`}>👍</button>
      <button onClick={() => setVote("dislike")} className={`px-2 ${vote==="dislike"?"text-red-600":""}`}>👎</button>
    </div>
  );
}
