"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCartShopping, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { shopMenu } from '@/data/menu';
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { useSelector } from "react-redux";

export default function Header() {
    const {user,logoutUser}=useAuth();
    const {totalQty} = useSelector((state)=>state.cart)
  return (
    <header className="text-white">
    <div className="bg-[#131921] mx-auto px-4 flex items-center gap-4 py-3">

        {/* <!-- Logo --> */}
        <div className="text-2xl font-bold tracking-wide">
            <Link href="/">
                amaz<span className="text-orange-400">in</span>
            </Link>
        </div>
        
        {/* <!-- Search --> */}
        <form action="" className="flex flex-1">
            <input 
                type="text" 
                placeholder="Search Kindle eBooks"
                className="w-full px-4 py-2 text-black rounded-l-md focus:outline-none bg-white"
            />
            <button className="bg-orange-400 hover:bg-orange-500 px-5 rounded-r-md text-black font-semibold">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4"/>
            </button>
        </form>
       

        {/* <!-- Menu Right --> */}
        <div className="hidden md:flex items-center gap-6 text-sm">

            <div className="cursor-pointer">
                {
                    user?(
                        <div className="flex">
                            <Link href="#" className="hover:text-orange-400 hover:border-orange-400 hover:bg-[#20293a]
                            transition-colors duration-250 cursor-pointer border-transparent py-2 pl-3 rounded-lg bg-transparent ">
                                <span className="text-sm font-medium mr-3 ">
                                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1"/>{user.name}
                                </span>
                            </Link>
                            <button onClick={logoutUser} className="
                            hover:text-red-400 hover:border-red-400 hover:bg-[#20293a]
                            transition-colors duration-250 cursor-pointer border-transparent py-2 px-3 rounded-lg bg-transparent">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-4 h-4 mr-1"/>Đăng Xuất
                            </button>
                        </div>
                    ):(
                        <Link href="/login" className="hover:underline">
                            <p className="text-xs">Hello, Sign in</p>
                            <p className="font-semibold">Account & Lists</p>
                        </Link>
                    )
                }
            </div>

            <div className="relative cursor-pointer">
                <Link href="/cart">
                    <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5"/>
                    <span className="absolute -top-2 -right-[2.5] bg-orange-500 text-xs px-1 rounded">
                        {totalQty}
                    </span>
                </Link>
            </div>

        </div>

    </div>
    <div className="bg-[#ffff] mx-auto px-4 flex items-center gap-4 py-3 text-[#414c59] font-semibold border-b border-[#d3d3d3] shadow ">
        <div className="border-r border-[#d3d3d3] px-6">
            <Link href="/"><img src="https://m.media-amazon.com/images/G/01/books-voyager/subnav/Subnav_BooksLogo.svg" alt="logo_ebook_amazon" /></Link>
        </div>
        <div className='flex flex-1 justify-center gap-10'>
            {shopMenu.map((cate,index) => (
                <div key={index}
                className=" hover:text-[#1880e8] mx-0.5">
                    <Link href={cate.href}>
                        <p>{cate.label}
                            <span className="font-[15px] text-[#131921] ml-0.5">{cate.icon}</span>
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    </div>
</header>

  );
}