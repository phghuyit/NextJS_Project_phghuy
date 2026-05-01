"use client";

import { useEffect, useState } from "react";
import userServices from "@/services/userServices";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import getImageSrc from "@/utils/getImageSrc";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(true);
  const router = useRouter();
  const PAGES_SIZE = 5;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const api = await userServices.getByPageSize({
          "pagination[page]": page,
          "pagination[pageSize]": PAGES_SIZE,
        });
        setUsers(api?.data || api || []);
        setPagination(api?.pagination || api?.meta || null);
      } catch (err) {
        console.error(err);
        setError("Lỗi không tìm thấy người dùng");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDetail(row) {
    router.push(`/admin/users/${row.id}`);
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
        <h1 className="text-center text-2xl font-bold">Loading Danh Sách Người Dùng...</h1>
      </div>
    );
  }

  return (
    <>
      <nav className="mx-6 mt-6 mb-2 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-800">Quản lý người dùng</span>
      </nav>

      <h1 className="text-4xl font-bold uppercase my-6">Trang quản lý người dùng</h1>
      <div className="flex flex-col justify-center mb-6">
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 mx-6">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">ID</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Avatar</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Họ Tên</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Tên Đăng Nhập</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Email</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Số Điện Thoại</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase">Vai Trò</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-600 uppercase">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row) => (
                <tr key={row.id} className="border-b text-gray-700 transition duration-200 hover:bg-orange-50">
                  <td className="py-3 px-4 text-gray-800">{row.id}</td>
                  <td className="py-3 px-4 text-gray-800">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                      <Image 
                        src={getImageSrc(row.image)} 
                        alt={row.name || "Avatar"} 
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-800">{row.name}</td>
                  <td className="py-3 px-4 text-gray-800">{row.username}</td>
                  <td className="py-3 px-4 text-gray-800">{row.email}</td>
                  <td className="py-3 px-4 text-gray-800">{row.phone}</td>
                  <td className="py-3 px-4 text-gray-800">{row.role}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleDetail(row)}
                        className="rounded-lg border border-gray-200 px-3 py-2 transition-colors duration-300 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                        title="Xem chi tiết đơn hàng"
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
        {!loading && pagination && pagination.pageCount > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination currentPage={pagination.page} pageCount={pagination.pageCount} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </>
  );
}
