import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign,faClipboard,faCubes,faUsers } from "@fortawesome/free-solid-svg-icons";
const cardClass = "cursor-pointer rounded-2xl bg-white border border-gray-200 p-5 text-[#131921] transition duration-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-500"
export default function AdminPage() {
  return (
    <div id="page-dashboard" className="page active">
        <h2 className="text-base font-semibold text-gray-700 mb-5 uppercase m-6">Tổng quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 m-6">
        
          <div className={cardClass}>
            <div className="flex items-start justify-between mb-4">
             <FontAwesomeIcon icon={faDollarSign} className="w-6 h-6"/>
              <span className="badge-green">+12%</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Doanh thu</p>
            <p className="text-2xl font-bold text-gray-900">120.000.000₫</p>
          </div>
        
          <div className={cardClass}>
            <div className="flex items-start justify-between mb-4">
              <FontAwesomeIcon icon={faClipboard} className="w-6 h-6"/>
              <span className="badge-green">+5%</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Đơn hàng</p>
            <p className="text-2xl font-bold text-gray-900">340</p>
          </div>
       
          <div className={cardClass}>
            <div className="flex items-start justify-between mb-4">
              <FontAwesomeIcon icon={faCubes} className="w-6 h-6"/>
              <span className="badge-green">+2</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Sản phẩm</p>
            <p className="text-2xl font-bold text-gray-900">86</p>
          </div>
      
          <div className={cardClass}>
            <div className="flex items-start justify-between mb-4">
              <FontAwesomeIcon icon={faUsers} className="w-6 h-6"/>
              <span className="badge-green">+8%</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Khách hàng</p>
            <p className="text-2xl font-bold text-gray-900">1.240</p>
          </div>
        </div>

       
      </div>

  );
}
