"use client";

import topicServices from "@/services/topicServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [topic, setTopic] = useState({
    topic_name: "",
    slug: "",
    sort_order: 1,
    status: 1,
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setErr(null);

    try {
      const formData = new FormData();
      formData.append("topic_name", topic.topic_name);
      formData.append("slug", topic.slug);
      formData.append("sort_order", topic.sort_order);
      formData.append("status", topic.status);
      formData.append("description", topic.description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await topicServices.create(formData);
      alert("Tao chu de thanh cong!");
      router.push("/admin/topics");
    } catch (error) {
      console.error(error);
      setErr("Co loi xay ra khi tao chu de.");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/topics" className="transition-colors hover:text-blue-600">Quan Ly Chu De</Link>
        <span>/</span>
        <span className="text-gray-800">Tao Chu De</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Tao Chu De Moi</h1>
      </div>

      {err && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{err}</div>}

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Ten Chu De</label>
              <input type="text" name="topic_name" value={topic.topic_name} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
              <input type="text" name="slug" value={topic.slug} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Sap Xep</label>
              <input type="number" name="sort_order" value={topic.sort_order} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Trang Thai</label>
              <select name="status" value={topic.status} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="1">Hien thi</option>
                <option value="0">An</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Hinh Anh</label>
              <input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mo Ta</label>
            <textarea rows="4" name="description" value={topic.description} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex justify-end space-x-4 border-t border-gray-100 pt-4">
            <Link href="/admin/topics" className="rounded bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200">Huy Bo</Link>
            <button type="submit" disabled={load} className={`rounded px-6 py-2 font-medium text-white shadow-sm transition-colors ${load ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>
              {load ? "Dang luu..." : "Tao Chu De"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
