"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import categoryServices from "@/services/categoryService.js";

export default function CreateCategoryPage() {
    const router = useRouter();
    const inputClass = "border border-gray-300 focus:ring-blue-200 focus:ring-2 focus:border-blue-400 outline-none h-10 px-3 rounded-md w-full text-base duration-300 transition-all";
    const labelClass = "font-bold text-sm text-gray-700 block mb-1";

    const [loading, setLoad] = useState(false);
    const [err, setErr] = useState("");
    const [parentCats, setParentCats] = useState([]);

    const [form, setForm] = useState({
        category_name: "",
        slug: "",
        parent_id: "0",
        description: "",
        status: "1",
    });

    function handleForm(e) {
        const { name, value } = e.target;

        if (name === "category_name") {
            const slug = value
                .toString()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[đĐ]/g, "d")
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "")
                .replace(/--+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");

            setForm((prev) => ({
                ...prev,
                category_name: value,
                slug,
            }));
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        setErr("");

        try {
            const payload = {
                category_name: form.category_name,
                slug: form.slug,
                parent_id: form.parent_id === "" ? 0 : Number(form.parent_id),
                description: form.description,
                status: Number(form.status),
            };

            await categoryServices.createCategory(payload);

            if (confirm("Tạo danh mục thành công, bạn có muốn chuyển về trang danh sách?")) {
                router.push("/admin/categories");
            } else {
                setLoad(false);
            }
        } catch (error) {
            console.error(error);
            if (error.response?.data) {
                setErr(error.response.data.message || JSON.stringify(error.response.data));
            } else {
                setErr("Lỗi trong quá trình submit form.");
            }
            setLoad(false);
        }
    };

    async function fetchParentCats() {
        try {
            const res = await categoryServices.getAll();
            if (res && res.categories) {
                setParentCats(res.categories);
            } else if (res && res.data) {
                setParentCats(res.data);
            } else if (Array.isArray(res)) {
                setParentCats(res);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    }

    useEffect(() => {
        fetchParentCats();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Thêm Danh Mục Mới</h1>
                <Link href="/admin/categories" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
                    Quay Lại
                </Link>
            </div>

            {err && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {err}
                </div>
            )}

            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category_name" className={labelClass}>Tên Danh Mục</label>
                        <input type="text" id="category_name" name="category_name" className={inputClass} required onChange={handleForm} value={form.category_name} />
                    </div>

                    <div>
                        <label htmlFor="slug" className={labelClass}>Slug</label>
                        <input type="text" id="slug" name="slug" className={inputClass} required onChange={handleForm} value={form.slug} />
                    </div>

                    <div>
                        <label htmlFor="parent_id" className={labelClass}>Danh Mục Cha</label>
                        <select id="parent_id" name="parent_id" className={inputClass} onChange={handleForm} value={form.parent_id}>
                            <option value="0">Không có (Danh mục gốc)</option>
                            {parentCats.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="status" className={labelClass}>Trạng Thái</label>
                        <select id="status" name="status" className={inputClass} onChange={handleForm} value={form.status}>
                            <option value="1">Đang hoạt động</option>
                            <option value="0">Không hoạt động</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="description" className={labelClass}>Mô Tả</label>
                        <textarea id="description" name="description" rows="4" className={`${inputClass} h-auto resize-y pt-2`} onChange={handleForm} value={form.description}></textarea>
                    </div>
                </div>

                <button type="submit" disabled={loading} className={`mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                    {loading ? "Đang xử lý..." : "Tạo Danh Mục"}
                </button>
            </form>
        </div>
    );
}
