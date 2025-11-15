export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="bg-red-100 text-red-800 p-2 rounded mb-2 border border-red-200">
      {message}
    </div>
  );
}
