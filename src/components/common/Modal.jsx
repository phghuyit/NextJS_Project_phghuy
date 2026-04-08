export default function Modal({ title, children, className = "" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`w-full max-w-lg rounded-[5px] bg-white shadow-lg ${className}`}>
        <header className="border-b border-gray-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-[#131921]">{title}</h3>
        </header>

        <div className="px-5 py-4 text-sm text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
