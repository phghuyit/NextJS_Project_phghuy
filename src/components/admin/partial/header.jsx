"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAdminAuth } from "@/context/AdminContext";
import Link from "next/link";

export default function Header() {
    const {admin,logoutAdmin}=useAdminAuth();
  return (
    <header className="text-white">
        <div className="bg-[#131921] flex items-center justify-between p-4 gap-4">
            <div className="text-3xl font-bold tracking-wide">
                <a href="#">amaz<span className="text-orange-400">in</span></a>
            </div>
            <div className="hidden md:flex items-center gap-6">
                    <div className="hover:underline cursor-pointer">
                        <a href="#">
                            <FontAwesomeIcon icon={faBell} className="text-orange-500 w-5 h-5"/>
                        </a>
                    </div>
                
                    {
                        admin?(
                            <div className="flex">
                                <Link href="#" className="hover:text-orange-400 hover:border-orange-400 hover:bg-[#20293a]
                                transition-colors duration-250 cursor-pointer border-transparent py-2 pl-3 rounded-lg bg-transparent">
                                    <span className="text-sm font-medium mr-3">
                                        <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1"/>{admin.name}
                                    </span>
                                </Link>
                                <button onClick={logoutAdmin} className="
                                hover:text-red-400 hover:border-red-400 hover:bg-[#20293a]
                                transition-colors duration-250 cursor-pointer border-transparent py-2 px-3 rounded-lg bg-transparent">
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-4 h-4 mr-1"/>Đăng Xuất
                                </button>
                            </div>
                        ):(
                            <Link href="/admin/login">
                                <FontAwesomeIcon icon={faUser} className="text-orange-500 w-5 h-5"/>
                            </Link>
                        )
                    }
                </div>
        </div>
    </header>

  );
}
