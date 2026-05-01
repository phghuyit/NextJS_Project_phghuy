"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCaretDown, faCaretLeft, faCartShopping, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getMenuByPosition } from "@/services/menuServices";
import standardized from "@/utils/standardized";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getImageSrc from "@/utils/getImageSrc";

export default function Header() {
    const {user,logoutUser}=useAuth();
    const {totalQty} = useSelector((state)=>state.cart)
    const [menu, setMenu] = useState([]);
    const router=useRouter();
    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await getMenuByPosition();
                setMenu(res?.data || res || []);
                console.log(res);
            } catch (error) {
                console.error("Failed to fetch menu:", error);
            }
        }
        fetchMenu();
    }, []);

    function handleSubmit(e){
        e.preventDefault();
        let keyword=standardized(String(e.target.keyword.value));
        router.push(`/products/search/${keyword}`);
    }
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
        <form onSubmit={handleSubmit} className="flex flex-1">
            <input 
                name="keyword"
                type="text" 
                placeholder="Search Kindle eBooks"
                className="w-full px-4 py-2 text-black rounded-l-md focus:outline-none bg-white"
            />
            <button type="submit" className="bg-orange-400 hover:bg-orange-500 px-5 rounded-r-md text-black font-semibold">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4"/>
            </button>
        </form>
       

        {/* <!-- Menu Right --> */}
        <div className="hidden md:flex items-center gap-6 text-sm">

            <div className="cursor-pointer">
                {
                    user?(
                        <div className="flex">
                            <Link href="/account" className="hover:text-orange-400 hover:border-orange-400 hover:bg-[#20293a]
                            transition-colors duration-250 cursor-pointer border-transparent py-2 pl-3 rounded-lg bg-transparent ">
                                {
                                    user.image?(
                                    <span className="inline-flex items-center text-sm font-medium mr-3 ">
                                        <Image
                                            unoptimized
                                            src={getImageSrc(user.image)}
                                            className="mr-1  object-cover rounded-full "
                                            width={20}
                                            height={20}
                                            alt="Avatar.jpg"
                                        />
                                        {user.name}
                                    </span>
                                ):(
                                    <span className="text-sm font-medium mr-3 ">
                                        <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1"/>{user.name}
                                    </span>
                                )
                                }
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
            {menu.map((item,index) => {
                // console.log(item);
                return (
                    <div key={item.id || index}
                    className="group hover:text-[#1880e8] mx-0.5 relative py-2">
                        <Link href={item.link || "#"}>
                            <p>{item.name}</p>
                        </Link>
                        {item.children && item.children.length > 0 && (
                            <ul className="absolute top-full left-0 hidden group-hover:block bg-white text-[#414c59] shadow-md border border-gray-100 rounded mt-1 min-w-50 z-50 after:content-[''] after:absolute after:h-2 after:w-full after:-top-2 after:left-0">
                                {item.children.map((child, cIndex) => (
                                    <li key={child.id || cIndex} className="relative group/sub">
                                        <Link href={child.link || "#"} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 hover:text-orange-500">
                                            {child.name}
                                            {child.children && child.children.length > 0 && (
                                                <span className="text-xs ml-2 opacity-70 group-hover/sub:-rotate-90 transition-transform duration-500"><FontAwesomeIcon icon={faCaretDown} /></span>
                                            )}
                                        </Link>
                                        {child.children && child.children.length > 0 && (
                                            <ul className="absolute top-0 left-full hidden group-hover/sub:block bg-white text-[#414c59] shadow-md border border-gray-100 rounded min-w-50 z-50 after:content-[''] after:absolute after:w-2 after:h-full after:-left-2 after:top-0">
                                                {child.children.map((subChild, sIndex) => (
                                                    <li key={subChild.id || sIndex}>
                                                        <Link href={subChild.link || "#"} className="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500">
                                                            {subChild.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
</header>

  );
}
