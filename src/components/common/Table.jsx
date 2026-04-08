export default function Table({ columns, data, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-[5px] border border-gray-200 bg-white shadow-sm ${className}`}>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border-b border-gray-200 px-4 py-3 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {data.map((row) => (
            <tr key={row.id} className="transition duration-200 hover:bg-orange-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
