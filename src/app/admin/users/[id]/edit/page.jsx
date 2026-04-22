"use client";

import userServices from "@/services/userServices";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    roles: "",
    status: 1,
  });
  const [imageFile, setImageFile] = useState(null);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await userServices.getById(id);
        const userData = res?.data || res;
        setUser({
          name: userData.name || "",
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          roles: userData.roles || "",
          status: userData.status !== undefined ? userData.status : 1,
        });
      } catch (error) {
        console.error(error);
        setErr("Khong the tai thong tin nguoi dung.");
      } finally {
        setLoad(false);
      }
    }
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setErr(null);
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("address", user.address);
      formData.append("roles", user.roles);
      formData.append("status", user.status);
      if (imageFile) formData.append("image", imageFile);
      await userServices.update(id, formData);
      alert("Cap nhat nguoi dung thanh cong!");
      router.push("/admin/users");
    } catch (error) {
      console.error(error);
      setErr("Co loi xay ra khi cap nhat nguoi dung.");
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
        <Link href="/admin/users" className="transition-colors hover:text-blue-600">Quan Ly Nguoi Dung</Link>
        <span>/</span>
        <span className="text-gray-800">Chinh Sua Nguoi Dung</span>
      </nav>
      <div className="mb-6 flex justify-between items-center"><h1 className="text-3xl font-bold text-gray-800">Chinh Sua Nguoi Dung</h1></div>
      {err && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{err}</div>}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Ho Ten</label><input type="text" name="name" value={user.name} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Ten Dang Nhap</label><input type="text" name="username" value={user.username} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={user.email} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">So Dien Thoai</label><input type="text" name="phone" value={user.phone} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div className="md:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Dia Chi</label><input type="text" name="address" value={user.address} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Vai Tro</label><input type="text" name="roles" value={user.roles} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Trang Thai</label><select name="status" value={user.status} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="1">Hien thi</option><option value="0">An</option></select></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Anh Dai Dien</label><input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          </div>
          <div className="flex justify-end space-x-4 border-t border-gray-100 pt-4">
            <Link href="/admin/users" className="rounded bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200">Huy Bo</Link>
            <button type="submit" disabled={load} className={`rounded px-6 py-2 font-medium text-white shadow-sm transition-colors ${load ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>{load ? "Dang luu..." : "Luu Thay Doi"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
