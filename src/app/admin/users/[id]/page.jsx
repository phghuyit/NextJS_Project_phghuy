"use client";

import userServices from "@/services/userServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await userServices.getById(id);
        setUser(res?.data || res);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet nguoi dung");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchUser();
  }, [id]);

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-4xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Chi Tiet Nguoi Dung...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/users" className="transition-colors hover:text-blue-600">Quan Ly Nguoi Dung</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet Nguoi Dung</span>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet nguoi dung</h1>
        <Link href={`/admin/users/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Chinh Sua Nguoi Dung</Link>
      </div>
      {user && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {user.id}</div>
            <div><span className="font-semibold text-gray-700">Ho Ten:</span> {user.name || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ten Dang Nhap:</span> {user.username || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Email:</span> {user.email || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">So Dien Thoai:</span> {user.phone || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Dia Chi:</span> {user.address || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Vai Tro:</span> {user.roles || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {String(user.status) === "1" ? "Hien thi" : "An"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {user.updated_at ? new Date(user.updated_at).toLocaleString() : "N/A"}</div>
          </div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Anh Dai Dien:</span>{user.image ? <img src={user.image} alt={user.name || "User"} className="h-auto max-w-xs rounded border border-gray-200 shadow-md" /> : <p className="italic text-gray-500">Khong co hinh anh</p>}</div>
        </div>
      )}
    </div>
  );
}
