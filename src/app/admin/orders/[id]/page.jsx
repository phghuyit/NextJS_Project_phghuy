"use client";

import orderServices from "@/services/orderServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await orderServices.getById(id);
        setOrder(res?.data || res);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet don hang");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchOrder();
  }, [id]);

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-4xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Chi Tiet Don Hang...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/orders" className="transition-colors hover:text-blue-600">Quan Ly Don Hang</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet Don Hang</span>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet don hang</h1>
        <Link href={`/admin/orders/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Chinh Sua Don Hang</Link>
      </div>
      {order && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {order.id}</div>
            <div><span className="font-semibold text-gray-700">User ID:</span> {order.user_id ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ten Khach Hang:</span> {order.name || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Email:</span> {order.email || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">So Dien Thoai:</span> {order.phone || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Dia Chi:</span> {order.address || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {order.status || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {order.created_at ? new Date(order.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {order.updated_at ? new Date(order.updated_at).toLocaleString() : "N/A"}</div>
          </div>
          <div className="mt-8">
            <span className="mb-2 block font-semibold text-gray-700">Ghi Chu:</span>
            <p className="rounded border border-gray-200 bg-gray-50 p-4">{order.note || "Khong co ghi chu"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
