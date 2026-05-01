"use client";

import { useEffect, useState } from "react";
import orderServices from "@/services/orderServices";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAll } from "@/services/userServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import formatPrice from "@/utils/formatPrice";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(true);
  const router = useRouter();
  const PAGES_SIZE = 5;

  async function fetchOrders() {
      try {
        const api = await orderServices.getByPageSize({
          "pagination[page]": page,
          "pagination[pageSize]": PAGES_SIZE,
        });
        console.log(api);
        setOrders(api?.data || api || []);
        setPagination(api?.pagination || api?.meta || null);
      } catch (err) {
        console.error(err);
        setError("Lỗi không tìm thấy đơn hàng");
      } finally {
        setLoading(false);
      }
    }
  async function fetchUser() {
      try {
        const api = await getAll();
        setUser(api?.data || api || []);
      } catch (err) {
        console.error(err);
        setError("Lỗi không tìm thấy thông tin người dùng");
      } finally {
        setLoading(false);
      }
    }
  useEffect(() => {
    fetchOrders();
    fetchUser();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDetail(row) {
    router.push(`/admin/orders/${row.id}`);
  }

  // Helper function to get status display text and color
  const getStatusDisplay = (status) => {
    let text = status;
    let colorClass = "text-gray-600"; // Default color

    switch (status) {
      case "pending":
        text = "Đơn tạm hoãn";
        colorClass = "text-yellow-600";
        break;
      case "processing":
        text = "Đang giao hàng";
        colorClass = "text-yellow-600";
        break;
      case "completed":
        text = "Đã hoàn thành";
        colorClass = "text-green-600";
        break;
      case "cancelled":
        text = "Đã hủy đơn";
        colorClass = "text-red-600";
        break;
    }
    return <span className={`font-semibold ${colorClass}`}>{text}</span>;
  };

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex h-full items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Danh Sách Đơn Hàng...</h1></div>;

  return (
    <>
      <nav className="mx-6 mt-6 mb-2 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-800">Quản lý đơn hàng</span>
      </nav>
        <h1 className="m-6 text-4xl font-bold uppercase">Trang quản lý đơn hàng</h1>

      <div className="flex flex-col justify-center mb-6">
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 mx-6">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Mã ĐH</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Tên Người Dùng</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Ngày Đặt</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Tổng Tiền</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Trạng Thái</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-600 uppercase">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((row) => {
                const userName = user.find(u => u.id == row.user_id)?.name || row.name || row.user_id || "Khách vãng lai";
                return (
                  <tr key={row.id} className="border-b text-gray-700 transition duration-200 hover:bg-orange-50">
                    <td className="py-3 px-4 text-gray-800">{row.id}</td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{userName}</td>
                    <td className="py-3 px-4 text-gray-800">{row.created_at ? new Date(row.created_at).toLocaleDateString("vi-VN") : "N/A"}</td>
                    <td className="py-3 px-4 text-red-600 font-semibold">{formatPrice(row.total || 0)}</td>
                    <td className="py-3 px-4">{getStatusDisplay(row.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleDetail(row)}
                          className="rounded-lg border border-gray-200 px-3 py-2 transition-colors duration-300 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                          title="Xem chi tiết"
                        >
                          <FontAwesomeIcon icon={faEye} className="w-5 h-5 text-blue-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!loading && pagination && pagination.pageCount > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination currentPage={pagination.page} pageCount={pagination.pageCount} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </>
  );
}
