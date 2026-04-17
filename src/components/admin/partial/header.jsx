"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell,faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AdminContext";
import Link from "next/link";

export default function Header() {
    const {admin,logoutAdmin}=useAuth();
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
                                <Link href="#">
                                    <span className="text-sm font-medium">
                                        {admin.name}
                                    </span>
                                </Link>
                                <button onClick={logoutAdmin}>Đăng Xuất</button>
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
