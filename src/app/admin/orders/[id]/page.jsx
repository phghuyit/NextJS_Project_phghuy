"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {getByOrderId, getBriefOrder, updateStatusOrder} from "@/services/orderServices";
import formatPrice from "@/utils/formatPrice";
import { getById } from "@/services/userServices";

export default function Page() {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState([]);
  const [orderBrief, setOrderBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit,setEdit] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    async function fetchOrderData() {
      try {
        const itemsRes = await getByOrderId(id);
        setOrderItems(itemsRes?.data || itemsRes || []);
        console.log(itemsRes)
        const briefRes = await getBriefOrder(id);
        setOrderBrief(briefRes?.data || briefRes || null);
        setStatus(briefRes?.data?.status || briefRes?.status || "");
        if(briefRes.data.user_id){
          const userRes = await getById(briefRes?.data.user_id);
          setUser(userRes?.data || userRes || []);
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi không tìm thấy chi tiết đơn hàng.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchOrderData();
    }
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await updateStatusOrder(id, { status });
      setOrderBrief((prev) => ({ ...prev, status }));
      setEdit(false);
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  // Helper function to get status display text and color
  const getStatusDisplay = (status) => {
    let text = status;
    let colorClass = "text-gray-600"; // Default color

    switch (status) {
      case "pending":
        text = "Đơn tạm hoãn";
        colorClass = "text-yellow-600";
        break;
      case "processing":
        text = "Đang giao hàng";
        colorClass = "text-yellow-600";
        break;
      case "completed":
        text = "Đã hoàn thành";
        colorClass = "text-green-600";
        break;
      case "cancelled":
        text = "Đã hủy đơn";
        colorClass = "text-red-600";
        break;
    }
    return <span className={`font-semibold ${colorClass}`}>{text}</span>;
  };

  if (error) return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <h1 className="text-center text-2xl font-bold text-red-600">{error}</h1>
    </div>
  );

  if (loading) return (
    <div className="flex h-full min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
        <h1 className="text-center text-xl font-bold text-gray-700">Đang tải chi tiết đơn hàng...</h1>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen transition-colors duration-300">
      <nav className="mb-6 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chủ</Link>
        <span>/</span>
        <Link href="/admin/orders" className="transition-colors hover:text-blue-600">Quản Lý Đơn Hàng</Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold">Chi Tiết Đơn Hàng #{id}</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold uppercase text-gray-800">Chi Tiết Đơn Hàng #{id}</h1>
        <div className="space-x-4">
          <button className="bg-blue-600 border border-transparent shadow-sm hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors" onClick={()=>setEdit(true)}> 
            Chỉnh sửa trạng thái
          </button>
          <Link href="/admin/orders" className="bg-white border border-gray-300 shadow-sm hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors">
            Quay lại danh sách
          </Link>
        </div>
      </div>
      <div className={`fixed z-50 inset-0 flex items-center justify-center bg-black/30 ${edit?'':'hidden'}`} id="statusForm">
        <form onSubmit={handleUpdateStatus} className="w-full max-w-md bg-white shadow rounded-lg p-6 border border-gray-200 transition-all duration-300 ring-2 ring-orange-400">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Cập Nhật Trạng Thái</h2>
          <div className="space-y-4 text-gray-700">
            <p><span className="font-medium text-gray-900">Mã ĐH:</span> {orderBrief?.id}</p>
            <div>
              <label className="font-medium text-gray-900 block mb-1">Trạng Thái:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Đơn tạm hoãn</option>
                <option value="processing">Đang giao hàng</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="cancelled">Đã hủy đơn</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6 border-t pt-4">
            <button type="button" onClick={()=>setEdit(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium transition-colors">Hủy bỏ</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors">Cập nhật</button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Cột trái: Thông tin Chung */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Thông Tin Đơn Hàng</h2>
          {orderBrief ? (
            <div className="space-y-3 text-gray-700">
              <p><span className="font-medium text-gray-900">Mã ĐH:</span> {orderBrief.id}</p>
              <p><span className="font-medium text-gray-900">Ngày Đặt:</span> {orderBrief.created_at ? new Date(orderBrief.created_at).toLocaleString("vi-VN") : "N/A"}</p>
              <p><span className="font-medium text-gray-900">Ngày Cập Nhật:</span> {orderBrief.updated_at ? new Date(orderBrief.updated_at).toLocaleString("vi-VN") : "N/A"}</p>
              <p><span className="font-medium text-gray-900">Trạng Thái:</span> {getStatusDisplay(orderBrief.status)}</p>
              <p className="pt-2 border-t"><span className="font-medium text-gray-900">Tổng Tiền:</span> <span className="text-red-600 font-bold text-xl">{formatPrice(orderBrief.total)}</span></p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Không có thông tin tổng quan.</p>
          )}
        </div>

        {/* Cột phải: Thông tin khách hàng */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Thông Tin Khách Hàng</h2>
          {orderBrief ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-medium text-gray-900 block mb-1">User ID:</span> {user.id || "Khách vãng lai"}</p>
              <p><span className="font-medium text-gray-900 block mb-1">Tên khách hàng:</span> {user.name || orderBrief.user_name || "N/A"}</p>
              <p><span className="font-medium text-gray-900 block mb-1">Email:</span> {user.email || user.user_email || "N/A"}</p>
              <p><span className="font-medium text-gray-900 block mb-1">Số điện thoại:</span> {user.phone || "N/A"}</p>
              <p className="sm:col-span-2"><span className="font-medium text-gray-900 block mb-1">Địa chỉ giao hàng:</span> {user.address || "N/A"}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Không có thông tin khách hàng.</p>
          )}
        </div>
      </div>

      {/* Bảng chi tiết sản phẩm */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 p-6 border-b bg-gray-50">Danh Sách Sản Phẩm</h2>
        {orderItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Không có sản phẩm nào trong đơn hàng.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-6 font-semibold text-gray-600">Mã SP</th>
                  <th className="py-3 px-6 font-semibold text-gray-600">Tên Sản Phẩm</th>
                  <th className="py-3 px-6 font-semibold text-gray-600 text-center">Số Lượng</th>
                  <th className="py-3 px-6 font-semibold text-gray-600 text-right">Đơn Giá</th>
                  <th className="py-3 px-6 font-semibold text-gray-600 text-right">Thành Tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => {
                  const productId = item.product_id || item.id;
                  const productName = item.product.product_name;
                  const qty = item.qty || item.quantity || 1;
                  const price = item.price || 0;
                  const subTotal = price * qty;

                  return (
                    <tr key={index} className="border-b last:border-0 hover:bg-orange-50 transition-colors duration-150">
                      <td className="py-4 px-6 text-gray-800">{productId}</td>
                      <td className="py-4 px-6 text-gray-800 font-medium">{productName}</td>
                      <td className="py-4 px-6 text-gray-800 text-center">{qty}</td>
                      <td className="py-4 px-6 text-gray-800 text-right">
                        {formatPrice(price)}
                      </td>
                      <td className="py-4 px-6 text-red-600 font-semibold text-right">
                        {formatPrice(subTotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
