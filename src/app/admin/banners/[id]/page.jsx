"use client";

import bannerServices from "@/services/bannerServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const res = await bannerServices.getById(id);
        const bannerData = res?.data || res;
        setBanner(bannerData);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet banner");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBanner();
  }, [id]);

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-center text-4xl font-bold text-red-600">{error}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-center text-2xl font-bold">Loading Chi Tiet Banner...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/banners" className="transition-colors hover:text-blue-600">Quan Ly Banner</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet Banner</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet banner</h1>
        <Link href={`/admin/banners/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">
          Chinh Sua Banner
        </Link>
      </div>

      {banner && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {banner.id}</div>
            <div><span className="font-semibold text-gray-700">Tieu De:</span> {banner.title || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Lien Ket:</span> {banner.link || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Vi Tri:</span> {banner.position || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Sap Xep:</span> {banner.sort_order ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {String(banner.status) === "1" ? "Hien thi" : "An"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {banner.created_at ? new Date(banner.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {banner.updated_at ? new Date(banner.updated_at).toLocaleString() : "N/A"}</div>
          </div>

          <div className="mt-8">
            <span className="mb-2 block font-semibold text-gray-700">Mo Ta:</span>
            <p className="rounded border border-gray-200 bg-gray-50 p-4">{banner.description || "Khong co mo ta"}</p>
          </div>

          <div className="mt-8">
            <span className="mb-2 block font-semibold text-gray-700">Hinh Anh:</span>
            {banner.image ? (
              <img src={banner.image} alt={banner.title || "Banner"} className="h-auto max-w-xs rounded border border-gray-200 shadow-md" />
            ) : (
              <p className="italic text-gray-500">Khong co hinh anh</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
