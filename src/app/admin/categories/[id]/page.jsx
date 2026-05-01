"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import categoryServices from "@/services/categoryService";
import getImageSrc from "@/utils/getImageSrc";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const [cate, setCate] = useState(null);
  const [parentName, setParentName] = useState("Danh mục cha");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        let res = await categoryServices.getCatById(id);
        setCate(res);
        let cateData = res?.data || res;
       
        if (cateData?.parent_id && cateData.parent_id !== 0) {
          try {
            let parentRes = await categoryServices.getCatById(cateData.parent_id);
            let parentData = parentRes?.data || parentRes;
            setParentName(parentData.category_name);
          } catch (err) {
            setParentName("Không tìm thấy (" + cateData.parent_id + ")");
          }
        }
      } catch (err) {
        console.log("Phát hiện lỗi: " + err);
        setError("Lỗi không tìm thấy chi tiết danh mục");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetail();
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h1 className="text-4xl font-bold text-red-600 text-center">{error}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h1 className="text-center text-2xl font-bold">Loading Chi Tiết Danh Mục...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <nav className="flex items-center space-x-2 text-sm font-medium text-gray-500 mb-4">
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Trang Chủ</Link>
        <span>/</span>
        <Link href="/admin/categories" className="hover:text-blue-600 transition-colors">Quản Lý Danh Mục</Link>
        <span>/</span>
        <span className="text-gray-800">Chi Tiết Danh Mục</span>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl uppercase font-bold">Chi tiết danh mục</h1>
        <Link 
          href={`/admin/categories/${id}/edit`} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Chỉnh Sửa Danh Mục
        </Link>
      </div>

      {cate && (
        <div className="bg-white shadow rounded-lg p-8 text-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><span className="font-semibold text-gray-700">ID:</span> {cate.id}</div>
            <div><span className="font-semibold text-gray-700">Tên Danh Mục:</span> {cate.category_name}</div>
            <div><span className="font-semibold text-gray-700">Slug:</span> {cate.slug}</div>
            <div><span className="font-semibold text-gray-700">Danh Mục Cha:</span> {cate.parent_id === 0 ? "Danh mục cha" : parentName}</div>
            <div><span className="font-semibold text-gray-700">Sắp Xếp (Sort Order):</span> {cate.sort_order}</div>
            <div><span className="font-semibold text-gray-700">Trạng Thái:</span> {cate.status === 1 ? "Hiển thị" : "Ẩn"}</div>
            <div><span className="font-semibold text-gray-700">Người Tạo:</span> {cate.created_by || "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngày Tạo:</span> {cate.created_at ? new Date(cate.created_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngày Cập Nhật:</span> {cate.updated_at ? new Date(cate.updated_at).toLocaleString() : "N/A"}</div>
            <div><span className="font-semibold text-gray-700">Ngày Xóa:</span> {cate.deleted_at ? new Date(cate.deleted_at).toLocaleString() : "Chưa xóa"}</div>
          </div>
          
          <div className="mt-8">
            <span className="font-semibold text-gray-700 block mb-2">Mô Tả:</span>
            <p className="bg-gray-50 p-4 rounded border border-gray-200">{cate.description || "Không có mô tả"}</p>
          </div>

          <div className="mt-8">
            <span className="font-semibold text-gray-700 block mb-2">Hình Ảnh:</span>
            {cate.image ? (
              <Image 
                src={getImageSrc(cate.image)} 
                alt={cate.category_name} 
                width={320} 
                height={320}
                unoptimized
                className="max-w-xs h-auto rounded shadow-md border border-gray-200" 
              />
            ) : (
              <p className="italic text-gray-500">Không có hình ảnh</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
