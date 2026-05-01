"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {getOrderByUser} from "@/services/orderServices"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function UserOrdersPage() {
  const { userId } = useParams();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserOrders() {
      try {
        const res = await getOrderByUser(userId); 
        setOrders(res?.data || res || []);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách đơn hàng của người dùng.");
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      fetchUserOrders();
    }
  }, [userId]);

  // faEye button direct to show detail
  function handleDetail(row) {
    router.push(`/admin/orders/${row.id}`);
  }

  if (error) return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <h1 className="text-center text-2xl font-bold text-red-600">{error}</h1>
    </div>
  );

  if (loading) return (
    <div className="flex h-full min-h-[50vh] items-center justify-center">
      <h1 className="text-center text-2xl font-bold">Đang tải danh sách đơn hàng...</h1>
    </div>
  );

  return (
    <div className="p-6">
      <nav className="mb-6 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <Link href="/admin/users" className="transition-colors hover:text-blue-600">Quản lý người dùng</Link>
        <span>/</span>
        <span className="text-gray-800">Đơn hàng (User #{userId})</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold uppercase text-gray-800">Đơn hàng của người dùng</h1>
      </div>

      <div className="flex flex-col justify-center">
        {orders.length === 0 ? (
          <div className="mt-10 text-center text-gray-500 text-lg">Người dùng này chưa có đơn hàng nào.</div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Mã ĐH</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Ngày Đặt</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Tổng Tiền</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Trạng Thái</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-600 uppercase">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((row) => (
                  <tr key={row.id} className="border-b text-gray-700 transition duration-200 hover:bg-orange-50">
                    <td className="py-3 px-4 text-gray-800">{row.id}</td>
                    <td className="py-3 px-4 text-gray-800">{row.created_at ? new Date(row.created_at).toLocaleDateString("vi-VN") : "N/A"}</td>
                    <td className="py-3 px-4 text-red-600 font-semibold">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(row.total || 0)}
                    </td>
                    <td className="py-3 px-4 text-gray-800">{row.status}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleDetail(row)}
                          className="rounded-lg border border-gray-200 px-3 py-2 transition-colors duration-300 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faEye} className="w-5 h-5 text-blue-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}