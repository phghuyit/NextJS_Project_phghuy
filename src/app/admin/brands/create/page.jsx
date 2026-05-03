"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storeBrand } from '@/services/brandServices';
import standardized from '@/utils/standardized';

export default function CreateBrandPage() {
    const router = useRouter();
    const inputClass = "border border-gray-300 focus:ring-blue-200 focus:ring-2 focus:border-blue-400 outline-none h-10 px-3 rounded-md w-full text-base duration-300 transition-all";
    const labelClass = "font-bold text-sm text-gray-700 block mb-1";
    const [loading, setLoad] = useState(false);
    const [err, setErr] = useState(null);
    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        sort_order: '1',
        status: '1',
    });

    function handleForm(e) {
        const { name, value, files } = e.target;
        const val = files && files.length > 0 ? files[0] : value;

        if (name === "name") {
            const slug = standardized(val);
            setForm({
                ...form,
                name: val,
                slug: slug,
            });
        } else {
            setForm({
                ...form,
                [name]: val,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        setErr(null);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (value == null || value === "") return;

                if (key === "image") {
                    const file = value?.originFileObj || value;
                    if (file instanceof File || file instanceof Blob) {
                        formData.append("image", file);
                    }
                    return;
                }
                formData.append(key, value);
            });
            
            await storeBrand(formData);
            
            if (confirm("Tạo tác giả thành công! Bạn có muốn chuyển về trang quản lý tác giả?")) {
                router.push("/admin/brands");
            } else {
                setLoad(false);
            }
        } catch (error) {
            console.error("Lỗi: " + error.message);
            setErr("Lỗi trong quá trình tạo tác giả: " + error.message);
            setLoad(false);
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
                        <p className="text-gray-800 font-semibold">Đang xử lý...</p>
                    </div>
                </div>
            )}

            <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
                <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chủ</Link>
                <span>/</span>
                <Link href="/admin/brands" className="transition-colors hover:text-blue-600">Quản Lý Tác Giả</Link>
                <span>/</span>
                <span className="text-gray-800">Tạo Tác Giả Mới</span>
            </nav>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tạo tác giả mới</h1>
                <Link href="/admin/brands" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
                    Quay lại danh sách
                </Link>
            </div>

            {err && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
                    {err}
                </div>
            )}

            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className={labelClass}>Tên tác giả</label>
                        <input type="text" id="name" name="name" className={inputClass} required onChange={handleForm} value={form.name} />
                    </div>

                    <div>
                        <label htmlFor="slug" className={labelClass}>Slug</label>
                        <input type="text" id="slug" name="slug" className={inputClass} value={form.slug} onChange={handleForm} />
                    </div>

                    <div>
                        <label htmlFor="sort_order" className={labelClass}>Sắp Xếp (Sort Order)</label>
                        <input type="number" id="sort_order" name="sort_order" className={inputClass} value={form.sort_order} onChange={handleForm} placeholder="1" />
                    </div>

                    <div>
                        <label className={labelClass}>Trạng thái</label>
                        <select id="status" name="status" className={inputClass} onChange={handleForm} value={form.status}>
                            <option value="1">Hiển thị (Active)</option>
                            <option value="0">Ẩn (Inactive)</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="description" className={labelClass}>Mô tả</label>
                        <textarea id="description" name="description" rows="4" className={`${inputClass} h-auto resize-y`} onChange={handleForm} value={form.description}></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="image" className={labelClass}>Hình đại diện (Tùy chọn)</label>
                        <input type="file" id="image" name="image" accept="image/jpeg,image/png,image/jpg,image/gif,image/svg" className={`${inputClass} pt-2`} onChange={handleForm} />
                    </div>
                </div>

                <button type="submit" disabled={loading} className={`mt-8 font-bold py-2 px-4 rounded-md transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed text-gray-800' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                    {loading ? 'Đang tạo...' : 'Tạo tác giả'}
                </button>
            </form>
        </div>
    );
}
