"use client";

import { useEffect, useState } from "react";
import { getOrder } from "@/services/orderServices";
import OrderItem from "@/components/shop/orders/OrderItem.jsx";
import Link from "next/link";

export default function AccountPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrder();
        setOrders(data || []);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-[#0f1111]">
      <h1 className="text-2xl font-bold mb-6 border-b border-[#d3d3d3] pb-4">Lịch sử đơn hàng của bạn</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào.</p>
          <Link href="/products" className="text-orange-500 hover:text-orange-600 font-semibold">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}