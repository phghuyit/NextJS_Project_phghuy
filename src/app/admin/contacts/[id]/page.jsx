"use client";

import contactServices from "@/services/contactServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await contactServices.getById(id);
        setContact(res?.data || res);
      } catch (err) {
        console.error(err);
        setError("Loi khong tim thay chi tiet lien he");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchContact();
  }, [id]);

  if (error) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-4xl font-bold text-red-600">{error}</h1></div>;
  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading Chi Tiet Lien He...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/contacts" className="transition-colors hover:text-blue-600">Quan Ly Lien He</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiet Lien He</span>
      </nav>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold uppercase">Chi tiet lien he</h1>
        <Link href={`/admin/contacts/${id}/edit`} className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">Chinh Sua Lien He</Link>
      </div>
      {contact && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><span className="font-semibold text-gray-700">ID:</span> {contact.id}</div>
            <div><span className="font-semibold text-gray-700">Ten:</span> {contact.name || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Email:</span> {contact.email || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">So Dien Thoai:</span> {contact.phone || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Tieu De:</span> {contact.title || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Dia Chi:</span> {contact.address || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Trang Thai:</span> {String(contact.status) === "1" ? "Hien thi" : "An"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Tao:</span> {contact.created_at ? new Date(contact.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngay Cap Nhat:</span> {contact.updated_at ? new Date(contact.updated_at).toLocaleString() : "N/A"}</div>
          </div>
          <div className="mt-8">
            <span className="mb-2 block font-semibold text-gray-700">Noi Dung:</span>
            <p className="rounded border border-gray-200 bg-gray-50 p-4">{contact.content || "Khong co noi dung"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
