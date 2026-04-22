"use client";

import orderServices from "@/services/orderServices";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState({
    user_id: 0,
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "pending",
    note: "",
  });
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await orderServices.getById(id);
        const orderData = res?.data || res;
        setOrder({
          user_id: orderData.user_id || 0,
          name: orderData.name || "",
          email: orderData.email || "",
          phone: orderData.phone || "",
          address: orderData.address || "",
          status: orderData.status || "pending",
          note: orderData.note || "",
        });
      } catch (error) {
        console.error(error);
        setErr("Khong the tai thong tin don hang.");
      } finally {
        setLoad(false);
      }
    }
    if (id) fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setErr(null);
    try {
      await orderServices.update(id, order);
      alert("Cap nhat don hang thanh cong!");
      router.push("/admin/orders");
    } catch (error) {
      console.error(error);
      setErr("Co loi xay ra khi cap nhat don hang.");
    } finally {
      setLoad(false);
    }
  };

  if (load) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/orders" className="transition-colors hover:text-blue-600">Quan Ly Don Hang</Link>
        <span>/</span>
        <span className="text-gray-800">Chinh Sua Don Hang</span>
      </nav>
      <div className="mb-6 flex justify-between items-center"><h1 className="text-3xl font-bold text-gray-800">Chinh Sua Don Hang</h1></div>
      {err && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{err}</div>}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium text-gray-700">User ID</label><input type="number" name="user_id" value={order.user_id} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Ten Khach Hang</label><input type="text" name="name" value={order.name} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={order.email} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">So Dien Thoai</label><input type="text" name="phone" value={order.phone} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div className="md:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Dia Chi</label><input type="text" name="address" value={order.address} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Trang Thai</label><select name="status" value={order.status} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="pending">Pending</option><option value="processing">Processing</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Ghi Chu</label><textarea rows="4" name="note" value={order.note} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div className="flex justify-end space-x-4 border-t border-gray-100 pt-4">
            <Link href="/admin/orders" className="rounded bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200">Huy Bo</Link>
            <button type="submit" disabled={load} className={`rounded px-6 py-2 font-medium text-white shadow-sm transition-colors ${load ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>{load ? "Dang luu..." : "Luu Thay Doi"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
