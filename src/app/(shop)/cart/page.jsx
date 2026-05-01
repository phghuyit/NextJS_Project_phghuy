"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/lib/features/cart/cartSlice";
import CartItem from "@/components/shop/cart/CartItem";
import formatPrice from "@/utils/formatPrice";

export default function Page() {
  const dispatch = useDispatch();
  const { items, totalQty, totalAmount } = useSelector((state) => state.cart);
  const data = useSelector((state) => state.cart);
  // console.log(items);
  console.log(totalAmount);
  const [user, setUser] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setUser(JSON.parse(user));
      } catch (error) {
        console.error("Failed to parse user info", error);
      }
    }
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); 
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      dispatch(removeFromCart(id));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
      dispatch(clearCart());
    }
  };

  if (!items || items.length===0) {
    return (
      <main className="py-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Giỏ hàng của bạn đang trống
          </h1>
          <p className="mt-2 text-gray-600">
            Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm nhé!
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-[5px] bg-orange-400 px-6 py-3 font-semibold text-[#131921] transition duration-300 hover:bg-orange-500"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8 max-w-7xl px-4 sm:px-6 lg:px-8 text-[#0f1111]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-2 w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-4 flex justify-between items-end border-b border-[#d3d3d3] pb-2">
            <h1 className="capitalize font-bold text-3xl">Giỏ hàng</h1>
            <div className="flex items-center gap-4">
              <button onClick={handleClearCart} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer">
                Xóa tất cả
              </button>
              <span className="text-gray-500 text-sm hidden sm:block">Giá</span>
            </div>
          </div>

          <div className="my-6 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 w-full sticky top-24 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 border-b border-[#d3d3d3] pb-2">
              Thông tin giao hàng
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input type="text" name="name" value={user.name} onChange={handleUserChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Nhập họ tên..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input type="text" name="phone" value={user.phone} onChange={handleUserChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Nhập số điện thoại..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
                <textarea name="address" value={user.address} onChange={handleUserChange} rows="2" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Nhập địa chỉ giao hàng..."></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 border-b border-[#d3d3d3] pb-2">
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-3 mb-6 text-base">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính ({totalQty} sản phẩm):</span>
                <span className="font-medium">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giảm giá:</span>
                <span className="font-medium text-green-600">- {formatPrice(0)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center mt-2">
                <span className="font-bold text-lg">Tổng cộng:</span>
                <span className="font-bold text-2xl text-orange-700">{formatPrice(totalAmount)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right"> 
                Phí vận chuyển sẽ được tính lúc thanh toán.
              </p>
            </div>

            <div className="w-full">
              <Link href="/checkout" className={`block rounded-lg text-center my-3 whitespace-nowrap transition-colors duration-300 p-3 ${(user.name && user.phone && user.address) ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-300 pointer-events-none'}`}>
                  <p className="capitalize font-semibold text-[#131921]">Tiến hành Thanh Toán</p>
              </Link>
              {(!user.name || !user.phone || !user.address) && (
                <p className="text-xs text-red-500 text-center mt-2">Vui lòng điền đầy đủ thông tin giao hàng để tiếp tục.</p>
              )}
            </div>

            <div className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 002.166 5.052a12.034 12.034 0 00-1.12 6.01c.143 1.99.86 3.835 2.018 5.353.386.505.81.96 1.28 1.366a1.99 1.99 0 002.828 0l.002-.002a1.99 1.99 0 000-2.828l-.002-.002-1.28-1.366a9.956 9.956 0 01-1.634-4.505c-.09-1.38.21-2.74.82-3.932a9.954 9.954 0 013.932-.82c1.657 0 3.213.64 4.389 1.816a6.01 6.01 0 011.816 4.389c-.09 1.38-.49 2.68-.91 3.835l-1.28 1.366a1.99 1.99 0 000 2.828l.002.002a1.99 1.99 0 002.828 0l.002-.002 1.28-1.366c1.158-1.518 1.875-3.363 2.018-5.353a12.034 12.034 0 00-1.12-6.01A11.954 11.954 0 0010 1.944zM8.707 13.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 14.586l-1.293-1.293z" clipRule="evenodd" /></svg>
              Thanh toán an toàn & bảo mật
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
