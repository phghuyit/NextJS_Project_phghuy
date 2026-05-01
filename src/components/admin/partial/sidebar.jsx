import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adminMenu } from "@/data/adminMenu";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64">
      <div className="overflow-y-auto py-4 px-3 bg-[#37475a] rounded min-h-screen border-r text-white h-full flex flex-col justify-around"> 
        <ul className="space-y-6">
          {adminMenu.map((item, index) => (
            <li key={index} className="group">
              <Link
                href={item.href}
                className="flex items-center p-2 text-base font-normal rounded-full  group-hover:bg-orange-400"
              >
                {item.icon && (
                  <FontAwesomeIcon icon={item.icon} className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                )}
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}