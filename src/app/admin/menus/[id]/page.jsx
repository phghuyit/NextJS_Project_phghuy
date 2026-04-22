"use client";

import menuServices from "@/services/menuServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await menuServices.getById(id);
        setMenu(res?.data || res);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet menu");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchMenu();
  }, [id]);

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-4xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Chi Tiet Menu...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/menus" className="transition-colors hover:text-blue-600">Quan Ly Menu</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet Menu</span>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet menu</h1>
        <Link href={`/admin/menus/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Chinh Sua Menu</Link>
      </div>
      {menu && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {menu.id}</div>
            <div><span className="font-semibold text-gray-700">Ten Menu:</span> {menu.name || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Lien Ket:</span> {menu.link || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Loai:</span> {menu.type || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Vi Tri:</span> {menu.position || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Menu Cha:</span> {menu.parent_id ?? 0}</div>
            <div><span className="font-semibold text-gray-700">Sap Xep:</span> {menu.sort_order ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {String(menu.status) === "1" ? "Hien thi" : "An"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {menu.created_at ? new Date(menu.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {menu.updated_at ? new Date(menu.updated_at).toLocaleString() : "N/A"}</div>
          </div>
          <div className="mt-8">
            <span className="mb-2 block font-semibold text-gray-700">Mo Ta:</span>
            <p className="rounded border border-gray-200 bg-gray-50 p-4">{menu.description || "Khong co mo ta"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
