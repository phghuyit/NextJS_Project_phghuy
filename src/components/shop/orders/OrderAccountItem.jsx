import formatPrice from "@/utils/formatPrice";
import Link from "next/link";

export default function OrderAccountItem({ order }) {
    
    return(
        <div>
            <Link href={`order/${order.id}`}>
                <div className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div className="mb-2 sm:mb-0">
                        <p className="font-semibold text-gray-800 text-lg">Đơn hàng #{order.id}</p>
                        <p className="text-sm text-gray-500 mt-1">Ngày đặt: {new Date(order.created_at).toLocaleDateString("vi-VN")}</p>
                    </div>
                    <div className="text-left sm:text-right">
                        <p className="font-bold text-orange-600 text-lg">{formatPrice(order.total_amount || order.total || 0)}</p>
                    </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}