"use client";

import topicServices from "@/services/topicServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopic() {
      try {
        const res = await topicServices.getById(id);
        setTopic(res?.data || res);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet chu de");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTopic();
  }, [id]);

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-4xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Chi Tiet Chu De...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/topics" className="transition-colors hover:text-blue-600">Quan Ly Chu De</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet Chu De</span>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet chu de</h1>
        <Link href={`/admin/topics/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Chinh Sua Chu De</Link>
      </div>
      {topic && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {topic.id}</div>
            <div><span className="font-semibold text-gray-700">Ten Chu De:</span> {topic.topic_name || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Slug:</span> {topic.slug || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Sap Xep:</span> {topic.sort_order ?? "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {String(topic.status) === "1" ? "Hien thi" : "An"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {topic.created_at ? new Date(topic.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {topic.updated_at ? new Date(topic.updated_at).toLocaleString() : "N/A"}</div>
          </div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Mo Ta:</span><p className="rounded border border-gray-200 bg-gray-50 p-4">{topic.description || "Khong co mo ta"}</p></div>
          <div className="mt-8"><span className="mb-2 block font-semibold text-gray-700">Hinh Anh:</span>{topic.image ? <img src={topic.image} alt={topic.topic_name || "Topic"} className="h-auto max-w-xs rounded border border-gray-200 shadow-md" /> : <p className="italic text-gray-500">Khong co hinh anh</p>}</div>
        </div>
      )}
    </div>
  );
}
