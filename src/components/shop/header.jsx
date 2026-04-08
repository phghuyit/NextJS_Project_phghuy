export default function Header() {
  return (
    <header className="text-white">
    <div className="bg-[#131921] mx-auto px-4 flex items-center gap-4 py-3">

        {/* <!-- Logo --> */}
        <div className="text-2xl font-bold tracking-wide">
            <a href="#">amaz<span className="text-orange-400">in</span></a>
        </div>
        
        {/* <!-- Search --> */}
        <div className="flex flex-1">
            <input 
                type="text" 
                placeholder="Search Kindle eBooks"
                className="w-full px-4 py-2 text-black rounded-l-md focus:outline-none bg-white"
            />
            <button className="bg-orange-400 hover:bg-orange-500 px-5 rounded-r-md text-black font-semibold">
                 <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>

        {/* <!-- Menu Right --> */}
        <div className="hidden md:flex items-center gap-6 text-sm">

            <div className="hover:underline cursor-pointer">
                <a href="#">
                    <p className="text-xs">Hello, Sign in</p>
                    <p className="font-semibold">Account & Lists</p>
                </a>
            </div>

            <div className="hover:underline cursor-pointer">
                <p className="text-xs">Returns</p>
                <p className="font-semibold">& Orders</p>
            </div>

            <div className="relative cursor-pointer">
                <a href="#">
                    <span className="text-xl">🛒</span>
                    <span className="absolute -top-2 -right-3 bg-orange-500 text-xs px-1 rounded">
                        2
                    </span>
                </a>
            </div>

        </div>

    </div>
    <div className="bg-[#ffff] mx-auto px-4 flex justify-center items-center gap-4 py-3 text-[#414c59] font-semibold border-b border-[#d3d3d3] shadow ">
        <div className="border-r border-[#d3d3d3] px-6">
            <a href="#"><img src="https://m.media-amazon.com/images/G/01/books-voyager/subnav/Subnav_BooksLogo.svg" alt="logo_ebook_amazon" /></a>
        </div>
        <div className="hover:text-[#1880e8]">
            <a href="#"><p>Thể Loại<i className="fa-solid fa-caret-down font-[15px] text-[#131921] pl-0.5"></i></p></a>
        </div>

        <div className="hidden hover:text-[#1880e8] 
                    md:block">
            <a href="#"><p>Best Seller<i className="fa-solid fa-circle-check font-[8px] text-orange-400 pl-0.5"></i></p></a>
        </div>

        <div className="hidden hover:text-[#1880e8]
                    lg:block">
            <a href="#"><p>Hot Trend<span  className="font-[15px] text-[#131921] pl-0.5">&#11206;</span></p></a>
        </div>
        <div className="hidden hover:text-[#1880e8]
                    md:block">
            <a href="#"><p>Flash Sale<i className="fa-solid fa-bolt font-[15px] text-orange-400 pl-0.5"></i></p></a>
        </div>
        <div className="hover:text-[#1880e8] border-r border-[#d3d3d3] pr-6
                    lg:border-0 ">
            <a href="#"><p>Liên Hệ</p></a>
        </div>
        <div className="hover:text-[#1880e8] pr-6
                    lg:border-r lg:border-[#d3d3d3]">
            <a href="#"><p>Tất Cả Sản Phẩm</p></a>
        </div>
        <div className="hidden hover:text-[#1880e8]
                    lg:block">
            <a href="#"><p>Sách Của Bạn<span  className="font-[15px] text-[#131921] pl-0.5">&#11206;</span></p></a>
        </div>
    </div>
</header>

  );
}