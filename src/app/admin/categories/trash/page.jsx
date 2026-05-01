"use client"
import { useEffect, useState } from "react";
import categoryServices from "@/services/categoryService";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faXmark,  } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function TrashPage() {
  const [cate, setCate] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router= useRouter();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const PAGES_SIZE = 5;

  useEffect(() => {
    fetchTrashedCate();
  }, [page]);

  async function fetchTrashedCate() {
    setLoading(true);
    try {
      let api = await categoryServices.getTrashedCategories({
        'pagination[page]': page,
        'pagination[pageSize]': PAGES_SIZE
      });
      setCate(api?.data || api || []);
      setPagination(api?.pagination);
    } catch (err) {
      console.log("Phát hiện lỗi: " + err);
      setError("Lỗi không tải được thùng rác.");
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleRestore(id) {
    if (!window.confirm("Bạn có chắc chắn muốn khôi phục danh mục này?")) return;
    try {
      await categoryServices.restoreCategory(id);
      if(confirm("Khôi phục thành công! Bạn có muốn quay lại trang quản lý danh mục?")){
        router.back();
      }else{fetchTrashedCate();}
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi khôi phục.");
    }
  }

  async function handleForceDelete(id) {
    if (!window.confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa vĩnh viễn? Hành động này không thể hoàn tác!")) return;
    try {
      await categoryServices.forceDeleteCategory(id);
      alert("Xóa vĩnh viễn thành công!");
      fetchTrashedCate(); // Refresh list
    } catch (error) {
      console.error(error);
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
        <Link href="/admin/categories" className="hover:text-blue-600 transition-colors">Quản Lý Danh Mục</Link>
        <span>/</span>
        <span className="text-red-600 font-semibold">Thùng Rác</span>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl uppercase font-bold text-gray-800">Thùng Rác Danh Mục</h1>
        <Link 
          href="/admin/categories" 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Quay Lại
        </Link>
      </div>

      {loading && !cate.length ? (
        <div className="text-center text-xl font-bold my-12">Loading Thùng Rác...</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
          {cate.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium">Thùng rác trống.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b ">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Tên Danh Mục</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Ngày Xóa</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-600 uppercase">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {cate.map((row) => (
                  <tr key={row.id} className="border-b text-gray-700 transition duration-200 hover:bg-orange-50">
                    <td className="py-3 px-4 text-gray-800">{row.id}</td>
                    <td className="py-3 px-4 text-gray-800">{row.category_name}</td>
                    <td className="py-3 px-4 text-gray-800 text-sm">
                      {row.deleted_at ? new Date(row.deleted_at).toLocaleString() : 'N/A'}
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
