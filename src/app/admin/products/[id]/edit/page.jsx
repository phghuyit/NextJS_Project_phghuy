"use client";

import {getProductById,updateProduct} from "@/services/productServices";
import categoryServices from "@/services/categoryService";
import {getBrandAll} from "@/services/brandServices";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const labelClass="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({
    product_name: "",
    slug: "",
    cat_id: 0,
    brand_id: 0,
    price: 0,
    qty: 0,
    is_on_sale: 0,
    sale_price: 0,
    status: 1,
    description: "",
    detail: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(null);
  const [cats, setCat] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await getProductById(id);
        const productData = res?.data || res;
        setProduct({
          product_name: productData.product_name ,
          slug: productData.slug,
          cat_id: productData.cat_id || 0,
          brand_id: productData.brand_id || 0,
          price: productData.price || 0,
          qty: productData.qty || 0,
          is_on_sale: productData.is_on_sale !== undefined ? productData.is_on_sale : 1, 
          sale_price: productData.sale_price || 0,
          status: productData.status !== undefined ? productData.status : 1,
          description: productData.description || "",
          detail: productData.detail || "",
        });
        console.log("Dữ liệu lấy từ API:", productData);
      } catch (error) {
        console.error(error);
        setErr("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoad(false);
      }
    }

    async function fetchCats() {
      const res = await categoryServices.getAll();
      if (res) {
        setCat(res.categories || res.data || []);
      }
    }

    async function fetchBrands() {
      try {
        const res = await getBrandAll();
        if (res) {
          setBrands(res.brands || res.data || []);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      fetchProduct();
      fetchCats();
      fetchBrands();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({...product,[name]:value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setErr(null);
    try {
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("slug", product.slug);
      formData.append("cat_id", product.cat_id);
      formData.append("brand_id", product.brand_id);
      formData.append("price", product.price);
      formData.append("qty", product.qty);
      formData.append("is_on_sale", product.is_on_sale); 
      formData.append("sale_price", product.sale_price);
      formData.append("status", product.status);
      formData.append("description", product.description);
      formData.append("detail", product.detail);
      if (imageFile) formData.append("image", imageFile);
      await updateProduct(id, formData);
      console.log(Object.fromEntries(formData));
      alert("Cập nhật sản phẩm thành công!");
      router.push("/admin/products");
    } catch (error) {
      console.error(error.message);
      setErr("Có lỗi xảy ra khi cập nhật sản phẩm.");
    } finally {
      setLoad(false);
    }
  };

  if (load) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Đang tải...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chủ</Link>
        <span>/</span>
        <Link href="/admin/products" className="transition-colors hover:text-blue-600">Quản Lý Sản Phẩm</Link>
        <span>/</span>
        <span className="text-gray-800">Chỉnh Sửa Sản Phẩm</span>
      </nav>
      <div className="mb-6 flex justify-between items-center"><h1 className="text-3xl font-bold text-gray-800">Chỉnh Sửa Sản Phẩm</h1></div>
      {err && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{err}</div>}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tên Sản Phẩm</label>
              <input type="text" name="product_name" value={product.product_name} onChange={handleChange} className={labelClass} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
              <input type="text" name="slug" value={product.slug} onChange={handleChange} className={labelClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Danh Mục</label>
              <select name="cat_id" value={product.cat_id} onChange={handleChange} className={labelClass}>
                <option value="0" disabled>Chọn danh mục</option>
                {cats.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tác giả</label>
              <select name="brand_id" value={product.brand_id} onChange={handleChange} className={labelClass}>
                <option value="0" disabled>Chọn tác giả</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id} selected={product.brand_id==brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Giá</label>
              <input type="number" name="price" value={product.price} onChange={handleChange} className={labelClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Số Lượng</label>
              <input type="number" name="qty" value={product.qty} onChange={handleChange} className={labelClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Trạng Thái Khuyến Mãi</label>
              <select name="is_on_sale" value={product.is_on_sale} onChange={handleChange} className={labelClass}>
                <option value="1">Khuyến mãi</option>
                <option value="0">Không khuyến mãi</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Giá Khuyến Mãi</label>
              <input type="number" name="sale_price" value={product.sale_price} onChange={handleChange} className={labelClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Trạng Thái</label>
              <select name="status" value={product.status} onChange={handleChange} className={labelClass}>
                <option value="1">Hiển thị</option>
                <option value="0">Ẩn</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Hình Ảnh</label>
              <input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} className={labelClass} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mô Tả</label>
            <textarea rows="4" name="description" value={product.description} onChange={handleChange} className={labelClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Chi Tiết</label>
            <textarea rows="6" name="detail" value={product.detail} onChange={handleChange} className={labelClass} />
          </div>
          <div className="flex justify-end space-x-4 border-t border-gray-100 pt-4">
            <Link href="/admin/products" className="rounded bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200">Hủy Bỏ</Link>
            <button type="submit" disabled={load} className={`rounded px-6 py-2 font-medium text-white shadow-sm transition-colors ${load ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>{load ? "Đang lưu..." : "Lưu Thay Đổi"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
