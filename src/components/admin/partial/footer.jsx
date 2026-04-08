export default function Footer() {
  return (
    <footer className="border-t bg-[#131921] text-white">
      <div className="flex flex-col gap-4 px-6 py-5 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#" className="text-2xl font-bold tracking-wide">
            amaz<span className="text-orange-400">in</span>
          </a>
          <p className="mt-1 text-gray-300">
            Admin ebook store dashboard
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-300">
          <a href="#" className="hover:text-orange-400 transition ease-in-out duration-500">
            Manage ebooks
          </a>
          <a href="#" className="hover:text-orange-400 transition ease-in-out duration-500">
            Orders
          </a>
          <a href="#" className="hover:text-orange-400 transition ease-in-out duration-500">
            Customers
          </a>
          <a href="#" className="hover:text-orange-400 transition ease-in-out duration-500">
            Reports
          </a>
        </div>

        <p className="text-gray-400">
          Copyright 2026 amazin. Amazon-style ebook admin.
        </p>
      </div>
    </footer>
  );
}
