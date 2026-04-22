"use client";

import { useEffect, useState } from "react";
import categoryServices from "@/services/categoryService";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [cate, setCate] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(true);
  const PAGES_SIZE = 5;
  const router = useRouter();

  const col = [
    { key: "id", label: "ID" },
    { key: "category_name", label: "Tên danh mục" },
    { key: "slug", label: "Slug" },
    { key: "parent_id", label: "Danh mục cha" },
    { key: "status", label: "Trạng thái" },
  ];

  useEffect(() => {
    async function fetchCate() {
      try {
        const api = await categoryServices.getCateByPageSize({
          "pagination[page]": page,
          "pagination[pageSize]": PAGES_SIZE,
        });
        setCate(api?.data || api || []);
        setPagination(api?.pagination || api?.meta || null);
      } catch (err) {
        console.log("Phat hien loi" + err);
        setError("Lỗi không tìm thấy danh mục");
      } finally {
        setLoading(false);
      }
    }
    fetchCate();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDetail(row) {
    router.push(`/admin/categories/${row.id}`);
  }

  function handleEdit(row) {
    router.push(`/admin/categories/${row.id}/edit`);
  }

  async function handleDel(rowid) {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục?")) return;

    try {
      await categoryServices.deleteCategory(rowid);
      alert("Xóa danh mục thành công!");
      setCate((prevCate) => prevCate.filter((item) => item.id !== rowid));
    } catch (error) {
      console.error(error);
      alert("Lỗi 404: Không tìm thấy đường dẫn xóa trên Backend API!");
    }
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-red-600 text-center">{error}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-center text-2xl font-bold">Loading Danh Sách Danh Mục...</h1>
      </div>
    );
  }

  return (
    <>
      <nav className="flex items-center space-x-2 text-sm font-medium text-gray-500 mx-6 mt-6 mb-2">
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-800 select-none">Quản lý danh mục</span>
      </nav>

      <div className="flex justify-between items-center m-6">
        <h1 className="text-4xl uppercase font-bold">Trang quản lý danh mục</h1>
        <div className="flex gap-4">
          <button onClick={() => router.push("/admin/categories/create")} className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors shadow-sm">
            Thêm danh mục
          </button>
          <button onClick={() => router.push("/admin/categories/trash")} className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors shadow-sm">
            Thùng rác
          </button>
        </div>
      </div>

      <div className="flex justify-center flex-col">
        <AdminTable columns={col} data={cate} onDetail={handleDetail} onEdit={handleEdit} onDel={handleDel} />
        {!loading && pagination && pagination.pageCount > 1 && (
          <Pagination currentPage={pagination.page} pageCount={pagination.pageCount} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  );
}
