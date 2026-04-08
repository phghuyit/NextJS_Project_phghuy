export default function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`rounded-[5px] bg-[#131921] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-orange-500 hover:text-[#131921] focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
