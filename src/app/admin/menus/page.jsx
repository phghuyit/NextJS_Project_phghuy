"use client";

import { useEffect, useState } from "react";
import menuServices from "@/services/menuServices";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(true);
  const router = useRouter();
  const PAGES_SIZE = 5;

  const col = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên menu" },
    { key: "link", label: "Liên kết" },
    { key: "position", label: "Vị trí" },
    { key: "sort_order", label: "Sắp xếp" },
    { key: "status", label: "Trạng thái" },
  ];

  useEffect(() => {
    async function fetchMenus() {
      try {
        const api = await menuServices.getByPageSize({
          "pagination[page]": page,
          "pagination[pageSize]": PAGES_SIZE,
        });
        setMenus(api?.data || api || []);
        setPagination(api?.pagination || api?.meta || null);
      } catch (err) {
        console.error(err);
        setError("Lỗi không tìm thấy menu");
      } finally {
        setLoading(false);
      }
    }
    fetchMenus();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDetail(row) {
    router.push(`/admin/menus/${row.id}`);
  }

  function handleEdit(row) {
    router.push(`/admin/menus/${row.id}/edit`);
  }

  async function handleDel(rowid) {
    if (!window.confirm("Bạn có chắc chắn muốn xóa menu?")) return;
    try {
      await menuServices.delete(rowid);
      alert("Xóa menu thành công!");
      setMenus((prev) => prev.filter((item) => item.id !== rowid));
    } catch (error) {
      console.error(error);
      alert("Lỗi xóa menu trên Backend API!");
    }
  }

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex h-full items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Danh Sách Menu...</h1></div>;

  return (
    <>
      <nav className="mx-6 mt-6 mb-2 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-800">Quản lý menu</span>
      </nav>

      <div className="m-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Trang quản lý menu</h1>
        <Link href="/admin/menus/create" className="rounded-md bg-gray-300 px-4 py-2 font-bold text-gray-800 transition-colors hover:bg-gray-400">Tạo menu mới</Link>
      </div>

      <div className="flex justify-center flex-col">
        <AdminTable columns={col} data={menus} onDetail={handleDetail} onEdit={handleEdit} onDel={handleDel} />
        {!loading && pagination && pagination.pageCount > 1 && (
          <Pagination currentPage={pagination.page} pageCount={pagination.pageCount} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  );
}
