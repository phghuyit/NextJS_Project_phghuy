export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[5px] border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
