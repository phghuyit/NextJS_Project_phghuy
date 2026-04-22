"use client";

import brandServices from "@/services/brandServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBrand() {
      try {
        const res = await brandServices.getById(id);
        setBrand(res?.data || res);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet thuong hieu");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBrand();
  }, [id]);

  if (error) {
    return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-4xl font-bold text-red-600">{error}</h1></div>;
  }

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Chi Tiet Thuong Hieu...</h1></div>;
  }

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/brands" className="transition-colors hover:text-blue-600">Quan Ly Thuong Hieu</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet Thuong Hieu</span>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet thuong hieu</h1>
        <Link href={`/admin/brands/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Chinh Sua Thuong Hieu</Link>
      </div>
      {brand && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {brand.id}</div>
            <div><span className="font-semibold text-gray-700">Ten Thuong Hieu:</span> {brand.brand_name || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Slug:</span> {brand.slug || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Sap Xep:</span> {brand.sort_order ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {String(brand.status) === "1" ? "Hien thi" : "An"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {brand.created_at ? new Date(brand.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {brand.updated_at ? new Date(brand.updated_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Xoa:</span> {brand.deleted_at ? new Date(brand.deleted_at).toLocaleString() : "Chua xoa"}</div>
          </div>
          <div className="mt-8">
            <span className="mb-2 block font-semibold text-gray-700">Mo Ta:</span>
            <p className="rounded border border-gray-200 bg-gray-50 p-4">{brand.description || "Khong co mo ta"}</p>
          </div>
          <div className="mt-8">
            <span className="mb-2 block font-semibold text-gray-700">Hinh Anh:</span>
            {brand.image ? <img src={brand.image} alt={brand.brand_name || "Brand"} className="h-auto max-w-xs rounded border border-gray-200 shadow-md" /> : <p className="italic text-gray-500">Khong co hinh anh</p>}
          </div>
        </div>
      )}
    </div>
  );
}
