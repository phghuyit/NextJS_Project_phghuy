"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import categoryServices from '@/services/categoryService.js';
import {createProduct} from '@/services/productServices';

export default function CreateProductPage() {
    const router = useRouter();
    const inputClass = "border border-gray-300 focus:ring-blue-200 focus:ring-2 focus:border-blue-400 outline-none h-10 px-3 rounded-md w-full text-base duration-300 transition-all";
    const labelClass = "font-bold text-sm text-gray-700 block mb-1";
    const [loading,setLoad]=useState(false);
    const [err,setErr]=useState([]);
    const [cats,setCat]=useState([]);
    const [brands,setBrand]=useState([]);
    const [form,setFrom]=useState({
        product_name: '',
        slug: '',
        cat_id: '',
        description: '',
        image: '' ,
        price: '',
        // brand_id: '',
        qty: '',
        status: '',
    })
    function handleForm(e){
        const {name,value,files}=e.target;
        const val = files && files.length > 0 ? files[0] : value;

        if (name === "product_name") {
            const slug = val
                .toString()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Remove Vietnamese diacritics
                .replace(/[đĐ]/g, "d") // Replace đ with d
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .replace(/[^\w\-]+/g, "") // Remove all non-word characters
                .replace(/\-\-+/g, "-") // Replace multiple hyphens with single hyphen
                .replace(/^-+/, "") // Trim hyphens from start
                .replace(/-+$/, ""); // Trim hyphens from end

            setFrom({
                ...form,
                product_name: val,
                slug: slug,
            });
        } else {
            setFrom({
                ...form,
                [name]: val,
            });
        }
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setLoad(true);
        try{
            const formData = new FormData();
            Object.entries(form).forEach(([key,value])=>{
                if(value!=null&&value!="")
                formData.append(key,value);
            })
            await createProduct(formData);
            if(confirm("Tạo sản phẩm thành công có muốn chuyển về trang đăng nhập?"))
            router.push("/admin/products"); 
        }catch(err){
            console.error(err);
            setErr("Lỗi trong quá trình submit form");
        }
    }
    async function fetchCats(){
        const res=await categoryServices.getAll();
        if(res){
            setCat(res.categories);
        }
    };
    // async function fetchBrands(){
    //     const res=await brandServices.getAll();
        
    //     if(res){
    //         setBrand(res.brands);
    //     }
    // };
    useEffect(()=>{
        fetchCats();
        // fetchBrands();
    },[]);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tạo sản phẩm mới</h1>
                <Link href="/admin/products" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
                    Quay lại danh sách
                </Link>
            </div>

            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="product_name" className={labelClass}>Tên sản phẩm</label>
                        <input
                            type="text"
                            id="product_name"
                            name="product_name"
                            className={inputClass}
                            required
                            onChange={handleForm}
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
                            onChange={handleForm}
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
                    </div>  */}

                    <div className="md:col-span-2">
                        <label htmlFor="description" className={labelClass}>Mô tả</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            className={`${inputClass} h-auto resize-y`}
                            onChange={handleForm}
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
                            onChange={handleForm}
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
                            onChange={handleForm}
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
                            onChange={handleForm}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="status" className={labelClass}>Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            className={inputClass}
                            defaultValue="1"
                            onChange={handleForm}
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
