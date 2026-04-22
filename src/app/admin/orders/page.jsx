"use client";

import { useEffect, useState } from "react";
import orderServices from "@/services/orderServices";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(true);
  const router = useRouter();
  const PAGES_SIZE = 5;

  const col = [
    { key: "id", label: "ID" },
    { key: "user_id", label: "Mã người dùng" },
    { key: "total", label: "Tổng tiền" },
    { key: "status", label: "Trạng thái" },
    { key: "created_by", label: "Người tạo" },
    { key: "created_at", label: "Ngày tạo" },
  ];

  useEffect(() => {
    async function fetchOrders() {
      try {
        const api = await orderServices.getByPageSize({
          "pagination[page]": page,
          "pagination[pageSize]": PAGES_SIZE,
        });
        setOrders(api?.data || api || []);
        setPagination(api?.pagination || api?.meta || null);
      } catch (err) {
        console.error(err);
        setError("Lỗi không tìm thấy đơn hàng");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDetail(row) {
    router.push(`/admin/orders/${row.id}`);
  }

  function handleEdit(row) {
    router.push(`/admin/orders/${row.id}/edit`);
  }

  async function handleDel(rowid) {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng?")) return;
    try {
      await orderServices.delete(rowid);
      alert("Xóa đơn hàng thành công!");
      setOrders((prev) => prev.filter((item) => item.id !== rowid));
    } catch (error) {
      console.error(error);
      alert("Lỗi xóa đơn hàng trên Backend API!");
    }
  }

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex h-full items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Danh Sách Đơn Hàng...</h1></div>;

  return (
    <>
      <nav className="mx-6 mt-6 mb-2 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-800">Quản lý đơn hàng</span>
      </nav>

      <div className="m-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Trang quản lý đơn hàng</h1>
        <Link href="/admin/orders/create" className="rounded-md bg-gray-300 px-4 py-2 font-bold text-gray-800 transition-colors hover:bg-gray-400">Tạo đơn hàng mới</Link>
      </div>

      <div className="flex justify-center flex-col">
        <AdminTable columns={col} data={orders} onDetail={handleDetail} onEdit={handleEdit} onDel={handleDel} />
        {!loading && pagination && pagination.pageCount > 1 && (
          <Pagination currentPage={pagination.page} pageCount={pagination.pageCount} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  );
}
