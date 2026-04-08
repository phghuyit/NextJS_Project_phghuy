export default function Input({ value, onChange, className = "", ...rest }) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`w-full rounded-[5px] border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${className}`}
      {...rest}
    />
  );
}
