"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import { clearCart } from "@/lib/features/cart/cartSlice";
import { storeOrder } from "@/services/orderServices";
import getImageSrc from "@/utils/getImageSrc";

export default function Page() {
  const { items, totalQty, totalAmount } = useSelector((state) => state.cart);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("review");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/cart");
    }
  }, [router]);

  const handleConfirmOrder = async () => {
    if (!user?.id) {
      alert("Không tìm thấy user id. Vui lòng đăng nhập lại trước khi đặt hàng.");
      return;
    }

    setStatus("submitting");
    const order = {
      user_id: user.id,
      items: items.map((item) => ({
        product_id: item.id,
        qty: item.qty,
        price: item.is_on_sale == 1 ? item.sale_price : item.price,
      })),
    };

    try {
      await storeOrder(order);
      dispatch(clearCart());
      setStatus("success");
    } catch (error) {
      console.error("Lỗi đặt hàng:", error?.response?.data || error);
      alert(
        error?.response?.data?.message ||
          "Không thể đặt hàng. Vui lòng kiểm tra lại kết nối hoặc thông tin đơn hàng."
      );
      setStatus("review");
    }
  };

  if (!user) return null;

  if (status === "submitting") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold text-gray-700">Hệ thống đang xử lý đơn hàng...</h2>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Đặt hàng thành công!</h1>
        <p className="text-gray-600 max-w-md leading-relaxed">
          Cảm ơn <span className="font-bold">{user.name}</span> đã mua sắm. Đơn hàng của bạn sẽ sớm được giao đến địa chỉ:
          <br />
          <span className="font-semibold text-gray-800 block mt-2">{user.address}</span>
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-[5px] bg-orange-400 px-8 py-3 font-semibold text-[#131921] transition duration-300 hover:bg-orange-500 shadow-sm"
        >
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <main className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#0f1111]">
      <h1 className="text-3xl font-bold mb-8 text-center">Xác nhận đơn hàng</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4 border-b border-[#d3d3d3] pb-2">
          <h2 className="text-xl font-bold">Thông tin giao hàng</h2>
          <Link href="/cart" className="text-orange-500 hover:text-orange-600 hover:-translate-y-0.5 ml-1 text-sm font-medium transition-all duration-100 ">
            Thay đổi
          </Link>
        </div>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold w-28 inline-block">Họ và tên:</span> {user.name}</p>
          <p><span className="font-semibold w-28 inline-block">Số điện thoại:</span> {user.phone}</p>
          <p><span className="font-semibold w-28 inline-block">Địa chỉ:</span> {user.address}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-bold mb-4 border-b border-[#d3d3d3] pb-2">Sản phẩm trong đơn ({totalQty})</h2>
        <div className="space-y-4">
          {items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 bg-gray-50 border border-gray-100 rounded flex items-center justify-center overflow-hidden">
                  <Image unoptimized fill src={getImageSrc(item.image)} alt={item.product_name} className="object-contain" />
                </div>
                <div>
                  <p className="font-medium line-clamp-1">{item.product_name}</p>
                  <p className="text-sm text-gray-500 mt-1">Số lượng: {item.qty}</p>
                </div>
              </div>
              <div className="font-semibold text-gray-800 whitespace-nowrap ml-4">
                {formatPrice((item.is_on_sale == 1 ? item.sale_price : item.price) * item.qty)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Tổng thanh toán:</span>
          <span className="text-orange-700 text-2xl">{formatPrice(totalAmount)}</span>
        </div>
        <button onClick={handleConfirmOrder} className="w-full mt-6 bg-orange-400 hover:bg-orange-500 hover:-translate-y-0.5 text-[#131921] font-bold text-lg py-4 rounded-lg transition duration-300 shadow-sm">
          Xác nhận đặt hàng
        </button>
      </div>
    </main>
  );
}
