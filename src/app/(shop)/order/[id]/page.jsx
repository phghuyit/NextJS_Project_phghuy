"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBriefOrder, getByOrderId } from "@/services/orderServices";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import categoryServices from "@/services/categoryService";
import getImageSrc from "@/utils/getImageSrc";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [orderSummary, setOrderSummary] = useState(null);
  const [orderStatus, setOrderStatus] = useState();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchOrderDetail();
    }
  }, [id]);
  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const res = await getByOrderId(id);
      const {status} = (await getBriefOrder(id)).data;
      setOrderStatus(status);
      const orderItems = res.data || res || [];
      if (orderItems.length > 0) {
        const calculatedTotal = orderItems.reduce((sum, item) => sum + (Number(item.total) || Number(item.qty) * Number(item.price)), 0);

        setOrderSummary({
          id: id,
          created_at: orderItems[0].created_at,
          total_amount: calculatedTotal,
        });

        setItems(orderItems);
      } else {
        setError("Không tìm thấy chi tiết cho đơn hàng này.");
      }
    } catch (err) {
      console.error("Failed to fetch order detail:", err);
      setError("Không thể tải chi tiết đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 max-w-4xl mx-auto px-4 animate-pulse">
        <div className="h-8 bg-gray-200 w-1/3 mb-6 rounded"></div>
        <div className="h-32 bg-gray-100 rounded-lg mb-6"></div>
        <div className="h-64 bg-gray-100 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 max-w-4xl mx-auto px-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => router.back()} className="text-blue-500 hover:underline">Quay lại danh sách</button>
      </div>
    );
  }

  if (!orderSummary) return null;
  const renderStatus = (s) => {
    s=String(s).trim().toLowerCase()
    if (s === "pending") return <span className="text-yellow-500 font-bold">Chờ xử lý</span>;
    if (s === "processing") return <span className="text-yellow-500 font-bold">Đang xử lý</span>;
    if (s === "success") return <span className="text-green-500 font-bold">Thành công</span>;
    if (s === "cancelled") return <span className="text-red-500 font-bold">Đã hủy</span>;
    return <span className="text-gray-600 font-bold">{s||'Chờ xử lý'}</span>;
  };

  return (
    <main className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-[#0f1111]">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <Link href="/account" className="hover:text-orange-500 transition-colors">Tài khoản</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Chi tiết đơn hàng #{orderSummary.id}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Chi tiết đơn hàng #{orderSummary.id}</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold mb-4 border-b border-[#d3d3d3] pb-2">Thông tin đơn hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold inline-block w-40">Ngày đặt:</span> {new Date(orderSummary.created_at).toLocaleDateString("vi-VN")}</p>
          <p><span className="font-semibold inline-block w-40">Trạng thái đơn hàng:</span> {renderStatus(orderStatus)}</p>
          <p><span className="font-semibold inline-block w-40">Tổng tiền:</span> <span className="text-orange-600 font-bold text-lg">{formatPrice(orderSummary.total_amount)}</span></p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4 border-b border-[#d3d3d3] pb-2">Sản phẩm đã mua ({items.length})</h2>
        <div className="space-y-6 mt-4">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.id || index} className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-gray-50 border border-gray-100 rounded flex items-center justify-center overflow-hidden shrink-0">
                    {item.product?.image ? (
                      <Image 
                        unoptimized 
                        fill 
                        src={getImageSrc(item.product.image)} 
                        alt={item.product.product_name || "Product"} 
                        className="object-contain p-1" 
                      />
                    ) : (
                      <div className="text-xs text-gray-400">No Image</div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-800 line-clamp-2">
                      {item.product ? item.product.product_name : `Sản phẩm #${item.product_id}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Số lượng: {item.qty} x {formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="font-bold text-gray-800 text-lg mt-3 sm:mt-0 whitespace-nowrap sm:ml-4 text-right">
                  {formatPrice(item.price * item.qty)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Không tìm thấy chi tiết sản phẩm.</p>
          )}
        </div>
      </div>
    </main>
  );
}
