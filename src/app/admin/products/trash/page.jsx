"use client";

import { useEffect, useState } from "react";
import productServices, { getTrashedProducts } from "@/services/productServices";
<<<<<<< HEAD
=======
import AdminTable from "@/components/admin/table/AdminTable";
>>>>>>> a296bc6d69093b06f95be3b4f1a1f590c2792f99
import Pagination from "@/components/common/Pagination";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function TrashPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const PAGES_SIZE = 5;

  useEffect(() => {
    fetchTrashedProducts();
  }, [page]);

  async function fetchTrashedProducts() {
    setLoading(true);
    try {
      const api = await getTrashedProducts({
        "pagination[page]": page,
        "pagination[pageSize]": PAGES_SIZE,
      });
      setProducts(api?.data || api || []);
      setPagination(api?.pagination || api?.meta || null);
    } catch (err) {
      console.log("Phát hiện lỗi: " + err);
      setError("Lỗi không tải được thùng rác sản phẩm.");
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleRestore(id) {
    if (!window.confirm("Bạn có chắc chắn muốn khôi phục sản phẩm này?")) return;
    try {
      await productServices.restore(id);
      if (confirm("Khôi phục thành công! Bạn có muốn quay lại trang quản lý sản phẩm?")) {
        router.back();
      } else {
        fetchTrashedProducts();
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi khôi phục.");
    }
  }

  async function handleForceDelete(id) {
    if (!window.confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa vĩnh viễn? Hành động này không thể hoàn tác!")) return;
    try {
      await productServices.destroy(id);
      alert("Xóa vĩnh viễn thành công!");
      setProducts(products.filter(e=>e.id!=id))
    } catch (error) {
      console.error(error?.message);
      alert("Có lỗi xảy ra khi xóa vĩnh viễn.");
    }
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-red-600 text-center">{error}</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <nav className="flex items-center space-x-2 text-sm font-medium text-gray-500 mb-6">
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Trang Chủ</Link>
        <span>/</span>
        <Link href="/admin/products" className="hover:text-blue-600 transition-colors">Quản Lý Sản Phẩm</Link>
        <span>/</span>
        <span className="text-red-600 font-semibold">Thùng Rác</span>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl uppercase font-bold text-gray-800">Thùng Rác Sản Phẩm</h1>
        <Link
          href="/admin/products"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Quay Lại
        </Link>
      </div>

      {loading && !products.length ? (
        <div className="text-center text-xl font-bold my-12">Đang tải Thùng Rác...</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
          {products.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium">Thùng rác trống.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Tên Sản Phẩm</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Số Lượng</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Ngày Xóa</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-600 uppercase">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((row) => (
                  <tr key={row.id} className="border-b text-gray-700 transition duration-200 hover:bg-orange-50">
                    <td className="py-3 px-4 text-gray-800">{row.id}</td>
                    <td className="py-3 px-4 text-gray-800">{row.product_name}</td>
                    <td className="py-3 px-4 text-gray-800">{row.qty}</td>
                    <td className="py-3 px-4 text-gray-800 text-sm">
                      {row.deleted_at ? new Date(row.deleted_at).toLocaleString() : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleRestore(row.id)}
                          className="rounded-lg border border-gray-200 px-3 py-2 transition-colors duration-300 hover:border-red-300 hover:bg-red-50 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faRotate} className="w-6 h-6 text-teal-400" />
                        </button>
                        <button
                          onClick={() => handleForceDelete(row.id)}
                          className="rounded-lg border border-gray-200 px-3 py-2 transition-colors duration-300 hover:border-red-300 hover:bg-red-50 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faXmark} className="w-6 h-6 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {!loading && pagination && pagination.pageCount > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={pagination.page}
            pageCount={pagination.pageCount}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
