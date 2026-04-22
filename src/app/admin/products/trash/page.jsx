"use client";

import { useEffect, useState } from "react";
import {getTrashedProducts} from "@/services/productServices";
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
  const PAGES_SIZE = 5;
  const router = useRouter();

  const col = [
    { key: "id", label: "ID" },
    { key: "product_name", label: "Tên sản phẩm" },
    { key: "cat_id", label: "Mã danh mục" },
    { key: "brand_id", label: "Mã thương hiệu" },
    { key: "price", label: "Giá" },
    { key: "qty", label: "Số lượng" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const api = await getTrashedProducts({
          "pagination[page]": page,
          "pagination[pageSize]": PAGES_SIZE,
        });
        setProducts(api?.data || api || []);
        setPagination(api?.pagination || api?.meta || null);
      } catch (err) {
        console.log("Phát hiện lỗi" + err);
        setError("Lỗi không tải được thùng rác sản phẩm");
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

  async function handleEdit(row) {
    // Repurposing Edit button for Restore
    if (!window.confirm("Bạn có chắc chắn muốn khôi phục sản phẩm này?")) return;
    try {
      await productServices.restoreProduct(row.id);
      alert("Khôi phục thành công!");
      setProducts((prev) => prev.filter((item) => item.id !== row.id));
    } catch (error) {
      console.error(error);
      alert("Lỗi khôi phục sản phẩm!");
    }
  }

  async function handleDel(rowid) {
    // Repurposing Delete button for Force Delete
    if (!window.confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa VĨNH VIỄN sản phẩm này?")) return;

    try {
      await productServices.forceDeleteProduct(rowid);
      alert("Xóa vĩnh viễn thành công!");
      setProducts((prev) => prev.filter((item) => item.id !== rowid));
    } catch (error) {
      console.error(error);
      alert("Lỗi xóa vĩnh viễn trên Backend API!");
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
        <h1 className="text-center text-2xl font-bold">Loading Thùng Rác Sản Phẩm...</h1>
      </div>
    );
  }

  return (
    <>
      <nav className="flex items-center space-x-2 text-sm font-medium text-gray-500 mx-6 mt-6 mb-2">
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
        <span>/</span>
        <Link href="/admin/products" className="hover:text-blue-600 transition-colors">Quản lý sản phẩm</Link>
        <span>/</span>
        <span className="text-red-600 select-none">Thùng rác</span>
      </nav>

      <div className="flex justify-between items-center m-6">
        <h1 className="text-4xl uppercase font-bold">Thùng rác sản phẩm</h1>
        <Link href="/admin/products" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors shadow-sm">
          Quay Lại
        </Link>
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
