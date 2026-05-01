"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storeMenu, getMenuAll } from '@/services/menuServices';

export default function CreateMenuPage() {
    const router = useRouter();
    const inputClass = "border border-gray-300 focus:ring-blue-200 focus:ring-2 focus:border-blue-400 outline-none h-10 px-3 rounded-md w-full text-base duration-300 transition-all";
    const labelClass = "font-bold text-sm text-gray-700 block mb-1";
    const [loading, setLoad] = useState(false);
    const [err, setErr] = useState(null);
    const [menuP,setMenuP]= useState([]);
    const [form, setForm] = useState({
        name: '',
        link: '',
        parent_id: '0',
        position: 'mainmenu',
        sort_order: '1',
        status: '1',
    });

    useEffect(() => {
        async function fetchParentMenus() {
            try {
                const resAll = await getMenuAll();
                setMenuP(resAll?.data || resAll || []);
            } catch (error) {
                console.error("Lỗi khi tải danh sách menu cha: ", error);
            }
        }
        fetchParentMenus();
    }, []);

    function handleForm(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        setErr(null);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (value == null || value === "") return;
                if (key === "parent_id") {
                    formData.append(key, Number(value));
                } else {
                    formData.append(key, value);
                }
            });
            
            await storeMenu(formData);
            
            if (confirm("Tạo menu thành công! Bạn có muốn chuyển về trang quản lý menu?")) {
                router.push("/admin/menus");
            } else {
                setLoad(false);
                setForm({ ...form, name: '', link: '' }); 
            }
        } catch (error) {
            console.error("Lỗi: " + error.message);
            setErr("Lỗi trong quá trình tạo menu. Vui lòng thử lại.");
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
                <Link href="/admin/menus" className="transition-colors hover:text-blue-600">Quản Lý Menu</Link>
                <span>/</span>
                <span className="text-gray-800">Tạo Menu Mới</span>
            </nav>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tạo menu mới</h1>
                <Link href="/admin/menus" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
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
                        <label htmlFor="name" className={labelClass}>Tên menu</label>
                        <input type="text" id="name" name="name" className={inputClass} required onChange={handleForm} value={form.name} placeholder="VD: Trang chủ" />
                    </div>
                    <div>
                        <label htmlFor="link" className={labelClass}>Liên kết (Link)</label>
                        <input type="text" id="link" name="link" className={inputClass} required onChange={handleForm} value={form.link} placeholder="VD: / hoặc /san-pham" />
                    </div>
                    <div>
                        <label htmlFor="parent_id" className={labelClass}>Menu Cha (Parent ID)</label>
                        <select id="parent_id" name="parent_id" className={inputClass} value={form.parent_id} onChange={handleForm}>
                            <option value="0">0 (Không có)</option>
                            {menuP.map((menu) => (
                                <option key={menu.id} value={menu.id}>
                                    {menu.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="position" className={labelClass}>Vị trí</label>
                        <select id="position" name="position" className={inputClass} onChange={handleForm} value={form.position}>
                            <option value="mainmenu">Menu chính (Main Menu)</option>
                            <option value="footermenu">Menu chân trang (Footer Menu)</option>
                        </select>
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
                </div>

                <button type="submit" disabled={loading} className={`mt-8 font-bold py-2 px-4 rounded-md transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed text-gray-800' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                    {loading ? 'Đang tạo...' : 'Tạo menu'}
                </button>
            </form>
        </div>
    );
}
