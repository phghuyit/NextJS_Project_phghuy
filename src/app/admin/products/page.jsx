"use client";

import { useEffect, useState } from "react";
import productServices from "@/services/productServices";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(true);
  const router = useRouter();
  const PAGES_SIZE = 5;

  const col = [
    { key: "id", label: "ID" },
    { key: "image", label: "Hình ảnh" },
    { key: "product_name", label: "Tên sản phẩm" },
    { key: "cat_id", label: "Tên danh mục" },
    { key: "brand_id", label: "Tên thương hiệu" },
    { key: "qty", label: "Số lượng" },
    { key: "is_on_sale", label: "Trạng thái khuyến mãi" },
    { key: "sale_price", label: "Giá Khuyến Mãi" },
    { key: "price", label: "Giá" },
    { key: "status", label: "Trạng Thái" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const api = await productServices.getByPageSize({
          "pagination[page]": page,
          "pagination[pageSize]": PAGES_SIZE,
        });
        setProducts(api?.data || api || []);
        setPagination(api?.pagination || api?.meta || null);
      } catch (err) {
        console.error(err);
        setError("Lỗi không tìm thấy sản phẩm");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDetail(row) {
    router.push(`/admin/products/${row.id}`);
  }

  function handleEdit(row) {
    router.push(`/admin/products/${row.id}/edit`);
  }

  async function handleDel(rowid) {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm?")) return;

    try {
      await productServices.delete(rowid);
      alert("Xóa sản phẩm thành công!");
      setProducts((prev) => prev.filter((item) => item.id !== rowid));
    } catch (error) {
      console.error(error);
      alert("Lỗi xóa sản phẩm trên Backend API!");
    }
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-center text-2xl font-bold text-red-600">{error}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-center text-2xl font-bold">Loading Danh Sách Sản Phẩm...</h1>
      </div>
    );
  }

  return (
    <>
      <nav className="mx-6 mt-6 mb-2 flex items-center space-x-2 text-sm font-medium text-gray-500 ">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-800">Quản lý sản phẩm</span>
      </nav>

      <div className="flex justify-between items-center m-6">
        <h1 className="text-4xl uppercase font-bold select-none">Trang quản lý sản phẩm</h1>
        <div className="flex gap-4">
          <button onClick={() => router.push("/admin/products/create")} className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors shadow-sm">
            Thêm sản phẩm
          </button>
          <button onClick={() => router.push("/admin/products/trash")} className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors shadow-sm">
            Thùng rác
          </button>
        </div>
      </div>

      <div className="flex justify-center flex-col">
        <AdminTable columns={col} data={products} onDetail={handleDetail} onEdit={handleEdit} onDel={handleDel} />
        {!loading && pagination && pagination.pageCount > 1 && (
          <Pagination currentPage={pagination.page} pageCount={pagination.pageCount} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  );
}
