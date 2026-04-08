export default function Empty({ message = "No data available", className = "" }) {
  return (
    <div className={`rounded-[5px] border border-dashed border-gray-300 bg-white p-8 text-center ${className}`}>
      <p className="text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
}
