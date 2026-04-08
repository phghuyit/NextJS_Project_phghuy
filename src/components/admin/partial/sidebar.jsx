export default function Sidebar() {
  return (
    
    <div className="flex flex-col space-y-2 p-6 border-r min-h-screen overflow-y-auto sticky">
        <p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">homes</p>

            <a href="./index.html" className="mb-3 capitalize font-medium  hover:text-orange-400 transition ease-in-out duration-500 text-[15px]">
                <i className="fa-solid fa-chart-pie mr-2"></i>
                Analytics dashboard
            </a>

            <a href="./index-1.html" className="mb-3 capitalize font-medium  hover:text-orange-400 transition ease-in-out duration-500 text-[15px] mb-3">
                <i className="fa-solid fa-shopping-cart mr-2"></i>
                ecommerce dashboard
            </a>

        <p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">Products</p>

            <a href="#" className="mb-3 capitalize font-medium  hover:text-orange-400 transition ease-in-out duration-500 text-[15px]">
                <i className="fa-solid fa-book mr-2"></i>
                Toàn bộ sách
            </a>

            <a href="#" className="mb-3 capitalize font-medium  hover:text-orange-400 transition ease-in-out duration-500 text-[15px]">
                <i className="fa-solid fa-layer-group mr-2"></i>
                Thể loại
            </a>

            <a href=" #" className="mb-3 capitalize font-medium  hover:text-orange-400 transition ease-in-out duration-500 text-[15px]">
                <i className="fa-solid fa-user-pen mr-2"></i>
                Tác giả
            </a>

        <p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">Users</p>
            <a href="#" className="mb-3 capitalize font-medium  hover:text-orange-400 transition ease-in-out duration-500 text-[15px]">
                <i className="fa-solid fa-user mr-2"></i>
                Toàn bộ người dùng
            </a>

            <a href="./index-1.html" className="mb-3 capitalize font-medium  hover:text-orange-400 transition ease-in-out duration-500 text-[15px]">
                <i className="fa-solid fa-user-slash mr-2"></i>
                Black List
            </a>

        <p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">Orders</p>
            <a href="#" className="mb-3 capitalize font-medium  hover:text-orange-400 transition ease-in-out duration-500 text-[15px]">
                <i className="fa-solid fa-truck-fast mr-2"></i>
                Toàn bộ đơn hàng
            </a>
            <a href="./index-1.html" className="mb-3 capitalize font-medium  hover:text-teal-600 transition ease-in-out duration-500 text-[15px]">
                <i className="fa-regular fa-truck mr-2"></i>
                Đơn hàng hoàn thành
            </a>
        <a href="#"><p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">Banner</p></a>
        <a href="#"><p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">Contact</p></a>
        <a href="#"><p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">Menu</p></a>
        <a href="#"><p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">Order</p></a>
        <a href="#"><p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">post</p></a>
        <a href="#"><p className="uppercase text-lg text-gray-600 tracking-wider font-semibold">topic</p></a>

    </div>

  );
}