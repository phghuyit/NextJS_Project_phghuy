"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getOrderByUser } from "@/services/orderServices";
import userServices from "@/services/userServices";
import OrderAccountItem from "@/components/shop/orders/OrderAccountItem";
import getImageSrc from "@/utils/getImageSrc";

export default function AccountPage() {
  const { updateUser: updateAuthUser } = useAuth();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
    birthday: "",
    image: null,
  });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchOrders(parsedUser.id);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const fetchOrders = async (userId) => {
    try {
      setLoading(true);
      const res = await getOrderByUser(userId);
      setOrders(res.data || res || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const nextFile = files && files.length > 0 ? files[0] : null;
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatarPreview(nextFile ? URL.createObjectURL(nextFile) : "");
    }
    setForm((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleOpenEdit = () => {
    setForm({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      gender: user.gender || "",
      birthday: user.birthday || "",
      image: null,
    });
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarPreview("");
    setEdit(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("gender", form.gender);
      formData.append("birthday", form.birthday);

      if (form.image && typeof form.image !== 'string') {
        formData.append("image", form.image);
      }

      const updatedUserResponse = await userServices.update(user.id, formData);
      const nextUserFromUpdate =
        updatedUserResponse?.data || updatedUserResponse?.user || updatedUserResponse;
      const refreshedUser = await userServices.getById(user.id);
      const nextUser =
        refreshedUser?.data || refreshedUser?.user || nextUserFromUpdate || refreshedUser;

      setUser(nextUser);
      updateAuthUser(nextUser);
      setEdit(false);
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatarPreview("");
      setForm({
        name: "",
        phone: "",
        address: "",
        gender: "",
        birthday: "",
        image: null,
      });
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      const validationMessage = err?.errors
        ? Object.values(err.errors).flat().join("\n")
        : null;
      const serverMessage = err?.response?.data?.message || err?.message;
      alert(validationMessage || serverMessage || "Update failed. Please try again.");
      return;
    }
  };

  if (!user) return null;

  return (
    <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[#0f1111]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Tài khoản của tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h2 className="text-xl font-bold mb-4 border-b border-[#d3d3d3] pb-2">Thông tin cá nhân</h2>
          <div className="mb-5 flex justify-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
              <Image
                src={getImageSrc(user.image)}
                alt={user.name || "Avatar"}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold block text-sm text-gray-500">Họ và tên</span> {user.name}</p>
            <p><span className="font-semibold block text-sm text-gray-500">Email</span> {user.email || "Chưa cập nhật"}</p>
            <p><span className="font-semibold block text-sm text-gray-500">Số điện thoại</span> {user.phone}</p>
            <p><span className="font-semibold block text-sm text-gray-500">Địa chỉ</span> {user.address}</p>
            <p><span className="font-semibold block text-sm text-gray-500">Giới tính</span> {user.gender === "0" ? "Nam" : user.gender === "1" ? "Nữ" : "Chưa cập nhật"}</p>
            <p><span className="font-semibold block text-sm text-gray-500">Ngày sinh</span> {user.birthday ? new Date(user.birthday).toLocaleDateString("vi-VN") : "Chưa cập nhật"}</p>
          </div>
          <button
            onClick={handleOpenEdit}
            className="mt-6 w-full bg-orange-400 hover:bg-orange-500 cursor-pointer font-bold py-2 px-4 rounded transition duration-300 shadow-sm"
          >
            Chỉnh sửa hồ sơ
          </button>

          <div className={`fixed inset-0 z-20 flex items-center justify-center bg-gray-800/60 ${isEdit ? "" : "hidden"}`}>
            <form
              onSubmit={handleUpdateProfile}
              encType="multipart/form-data"
              className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-md flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Cập nhật thông tin</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                  <select name="gender" value={form.gender} onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400">
                    <option value="" disabled>Chọn giới tính</option>
                    <option value="0">Nam</option>
                    <option value="1">Nữ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                  <input type="date" name="birthday" value={form.birthday} onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <textarea name="address" value={form.address} onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400" rows="3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện</label>
                <input type="file" name="image" accept="image/*" onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setEdit(false)} className="px-5 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 transition">
                  Hủy
                </button>
                <button type="submit" className="px-5 py-2 bg-orange-400 font-bold rounded text-[#131921] hover:bg-orange-500 shadow-sm transition">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 border-b border-[#d3d3d3] pb-2">Đơn hàng của bạn</h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>)}
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderAccountItem key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              Bạn chưa có đơn hàng nào.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
