import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartPie,
  faEnvelope,
  faImage,
  faLayerGroup,
  faNewspaper,
  faShoppingCart,
  faTags,
  faTruck,
  faTruckFast,
  faUser,
  faUserPen,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { adminMenu } from "@/data/adminMenu";

const menuLinkClass =
  "flex gap-2 capitalize font-medium hover:text-orange-400 transition ease-in-out duration-500 text-[15px] items-center";

export default function Sidebar() {
  return (
    <div className="flex flex-col space-y-4 p-6 border-r min-h-screen overflow-y-auto sticky">
      <>
        {adminMenu.map((cate,index) => (
          <div key={index} className={menuLinkClass}>
            <a href={cate.href}><p>{cate.label}<span  className="font-[15px] text-[#131921] ml-0.5"></span></p></a>
          </div>
        ))}
      </>
    </div>
  );
}