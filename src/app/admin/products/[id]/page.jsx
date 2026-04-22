"use client";

import productServices from "@/services/productServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await productServices.getById(id);
        setProduct(res?.data || res);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet san pham");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-4xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Chi Tiet San Pham...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/products" className="transition-colors hover:text-blue-600">Quan Ly San Pham</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet San Pham</span>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet san pham</h1>
        <Link href={`/admin/products/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Chinh Sua San Pham</Link>
      </div>
      {product && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {product.id}</div>
            <div><span className="font-semibold text-gray-700">Ten San Pham:</span> {product.product_name || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Slug:</span> {product.slug || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Danh Muc:</span> {product.cat_id ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Thuong Hieu:</span> {product.brand_id ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Gia:</span> {product.price ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">So Luong:</span> {product.qty ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {String(product.status) === "1" ? "Hien thi" : "An"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {product.created_at ? new Date(product.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {product.updated_at ? new Date(product.updated_at).toLocaleString() : "N/A"}</div>
          </div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Mo Ta:</span><p className="rounded border border-gray-200 bg-gray-50 p-4">{product.description || "Khong co mo ta"}</p></div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Chi Tiet:</span><p className="rounded border border-gray-200 bg-gray-50 p-4">{product.detail || "Khong co chi tiet"}</p></div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Hinh Anh:</span>{product.image ? <img src={product.image} alt={product.product_name || "Product"} className="h-auto max-w-xs rounded border border-gray-200 shadow-md" /> : <p className="italic text-gray-500">Khong co hinh anh</p>}</div>
        </div>
      )}
    </div>
  );
}
