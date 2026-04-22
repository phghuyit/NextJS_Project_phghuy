"use client";

import postServices from "@/services/postServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await postServices.getById(id);
        setPost(res?.data || res);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet bai viet");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPost();
  }, [id]);

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-4xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Chi Tiet Bai Viet...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/posts" className="transition-colors hover:text-blue-600">Quan Ly Bai Viet</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet Bai Viet</span>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet bai viet</h1>
        <Link href={`/admin/posts/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Chinh Sua Bai Viet</Link>
      </div>
      {post && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {post.id}</div>
            <div><span className="font-semibold text-gray-700">Tieu De:</span> {post.title || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Slug:</span> {post.slug || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Topic ID:</span> {post.topic_id ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Loai:</span> {post.type || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Sap Xep:</span> {post.sort_order ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {String(post.status) === "1" ? "Hien thi" : "An"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {post.created_at ? new Date(post.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {post.updated_at ? new Date(post.updated_at).toLocaleString() : "N/A"}</div>
          </div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Mo Ta:</span><p className="rounded border border-gray-200 bg-gray-50 p-4">{post.description || "Khong co mo ta"}</p></div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Chi Tiet:</span><p className="rounded border border-gray-200 bg-gray-50 p-4">{post.detail || "Khong co chi tiet"}</p></div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Hinh Anh:</span>{post.image ? <img src={post.image} alt={post.title || "Post"} className="h-auto max-w-xs rounded border border-gray-200 shadow-md" /> : <p className="italic text-gray-500">Khong co hinh anh</p>}</div>
        </div>
      )}
    </div>
  );
}
