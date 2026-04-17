"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import categoryServices from '@/services/categoryService.js';
import 
const categories = [
    { id: 1, name: 'Danh mục A' },
    { id: 2, name: 'Danh mục B' },
    { id: 3, name: 'Danh mục C' },
];
const brands = [
    { id: 1, name: 'Thương hiệu X' },
    { id: 2, name: 'Thương hiệu Y' },
    { id: 3, name: 'Thương hiệu Z' },
];

export default function CreateProductPage() {
    const inputClass = "border border-gray-300 focus:ring-blue-200 focus:ring-2 focus:border-blue-400 outline-none h-10 px-3 rounded-md w-full text-base duration-300 transition-all";
    const labelClass = "font-bold text-sm text-gray-700 block mb-1";

    const [cats,setCat]=useState([]);
    const [brands,setBrand]=useState([]);

    async function fetchCats(){
        const res=await categoryServices.getAll();
        if(res){
            setCat(res.data.categories);
        }
    };
    async function fetchBrands(){
        const res=await categoryServices.getAll();
        if(res){
            setCat(res.data.categories);
        }
    };
    useEffect(()=>{
        fetchCats();
    },[])
    console.log(cats);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tạo sản phẩm mới</h1>
                <Link href="/admin/products" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
                    Quay lại danh sách
                </Link>
            </div>

            <form className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="product_name" className={labelClass}>Tên sản phẩm</label>
                        <input
                            type="text"
                            id="product_name"
                            name="product_name"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className={labelClass}>Đường dẫn (Slug)</label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="cat_id" className={labelClass}>Danh mục</label>
                        <select
                            id="cat_id"
                            name="cat_id"
                            className={` ${inputClass}`}
                            required
                            defaultValue=""
                        >
                            <option value="" disabled>Chọn danh mục</option>
                            {
                                cats.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* <div>
                        <label htmlFor="brand_id" className={labelClass}>Thương hiệu</label>
                        <select
                            id="brand_id"
                            name="brand_id"
                            className={inputClass}
                            defaultValue=""
                        >
                            <option value="">Chọn thương hiệu (Tùy chọn)</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div> */}

                    <div className="md:col-span-2">
                        <label htmlFor="description" className={labelClass}>Mô tả</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            className={`${inputClass} h-auto resize-y`}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="price" className={labelClass}>Giá</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className={inputClass}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="qty" className={labelClass}>Số lượng</label>
                        <input
                            type="number"
                            id="qty"
                            name="qty"
                            className={inputClass}
                            min="0"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="image" className={labelClass}>Hình ảnh sản phẩm</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg"
                            className={`${inputClass} pt-2`}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="status" className={labelClass}>Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            className={inputClass}
                            defaultValue="1"
                        >
                            <option value="1">Đang hoạt động (Active)</option>
                            <option value="0">Không hoạt động (Inactive)</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Tạo sản phẩm
                </button>
            </form>
        </div>
    );
}
