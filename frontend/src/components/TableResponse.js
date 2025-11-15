export default function TableResponse({ tableData }) {
  if (!tableData || tableData.length === 0) return null;

  const keys = Object.keys(tableData[0] || {});
  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {keys.map(k => (
              <th key={k} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border">{k.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => (
            <tr key={i} className="odd:bg-gray-50 dark:odd:bg-gray-800">
              {keys.map((k) => <td key={k} className="px-3 py-2 border">{row[k]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
