"use client";

import menuServices from "@/services/menuServices";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [menu, setMenu] = useState({
    name: "",
    link: "",
    type: "",
    position: "",
    parent_id: 0,
    sort_order: 1,
    status: 1,
    description: "",
  });
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await menuServices.getById(id);
        const menuData = res?.data || res;
        setMenu({
          name: menuData.name || "",
          link: menuData.link || "",
          type: menuData.type || "",
          position: menuData.position || "",
          parent_id: menuData.parent_id || 0,
          sort_order: menuData.sort_order || 1,
          status: menuData.status !== undefined ? menuData.status : 1,
          description: menuData.description || "",
        });
      } catch (error) {
        console.error(error);
        setErr("Khong the tai thong tin menu.");
      } finally {
        setLoad(false);
      }
    }
    if (id) fetchMenu();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setErr(null);
    try {
      await menuServices.update(id, menu);
      alert("Cap nhat menu thanh cong!");
      router.push("/admin/menus");
    } catch (error) {
      console.error(error);
      setErr("Co loi xay ra khi cap nhat menu.");
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
        <Link href="/admin/menus" className="transition-colors hover:text-blue-600">Quan Ly Menu</Link>
        <span>/</span>
        <span className="text-gray-800">Chinh Sua Menu</span>
      </nav>
      <div className="mb-6 flex justify-between items-center"><h1 className="text-3xl font-bold text-gray-800">Chinh Sua Menu</h1></div>
      {err && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{err}</div>}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Ten Menu</label><input type="text" name="name" value={menu.name} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Lien Ket</label><input type="text" name="link" value={menu.link} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Loai</label><input type="text" name="type" value={menu.type} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Vi Tri</label><input type="text" name="position" value={menu.position} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Menu Cha</label><input type="number" name="parent_id" value={menu.parent_id} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Sap Xep</label><input type="number" name="sort_order" value={menu.sort_order} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Trang Thai</label><select name="status" value={menu.status} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="1">Hien thi</option><option value="0">An</option></select></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Mo Ta</label><textarea rows="4" name="description" value={menu.description} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div className="flex justify-end space-x-4 border-t border-gray-100 pt-4">
            <Link href="/admin/menus" className="rounded bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200">Huy Bo</Link>
            <button type="submit" disabled={load} className={`rounded px-6 py-2 font-medium text-white shadow-sm transition-colors ${load ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>{load ? "Dang luu..." : "Luu Thay Doi"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
