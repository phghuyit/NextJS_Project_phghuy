export default function Header() {
  return (
    <header className="text-white">
        <div className="bg-[#131921] flex items-center justify-between p-4 gap-4">
            <div className="text-3xl font-bold tracking-wide">
                <a href="#">amaz<span class="text-orange-400">in</span></a>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
                    <div className="hover:underline cursor-pointer">
                        <a href="#">
                            <i className="fa-solid fa-bell text-orange-500 text-xl"></i>
                        </a>
                    </div>

                    <div className="hover:underline cursor-pointer">
                        <i className="fa-solid fa-user text-orange-500 text-xl"></i>
                    </div>
                </div>
        </div>
    </header>

  );
}