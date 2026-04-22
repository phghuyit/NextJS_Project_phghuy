"use client";

import productServices from "@/services/productServices";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({
    product_name: "",
    slug: "",
    cat_id: 0,
    brand_id: 0,
    price: 0,
    qty: 0,
    status: 1,
    description: "",
    detail: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await productServices.getById(id);
        const productData = res?.data || res;
        setProduct({
          product_name: productData.product_name || "",
          slug: productData.slug || "",
          cat_id: productData.cat_id || 0,
          brand_id: productData.brand_id || 0,
          price: productData.price || 0,
          qty: productData.qty || 0,
          status: productData.status !== undefined ? productData.status : 1,
          description: productData.description || "",
          detail: productData.detail || "",
        });
      } catch (error) {
        console.error(error);
        setErr("Khong the tai thong tin san pham.");
      } finally {
        setLoad(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
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
      formData.append("status", product.status);
      formData.append("description", product.description);
      formData.append("detail", product.detail);
      if (imageFile) formData.append("image", imageFile);
      await productServices.update(id, formData);
      alert("Cap nhat san pham thanh cong!");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      setErr("Co loi xay ra khi cap nhat san pham.");
    } finally {
      setLoad(false);
    }
  };

  if (load) return <div className="flex min-h-[50vh] items-center justify-center"><h1 className="text-center text-2xl font-bold">Loading...</h1></div>;

  return (
    <div className="p-6">
      <nav className="mb-4 flex items-center space-x-2 text-sm font-medium text-gray-500">
        <Link href="/admin" className="transition-colors hover:text-blue-600">Trang Chu</Link>
        <span>/</span>
        <Link href="/admin/products" className="transition-colors hover:text-blue-600">Quan Ly San Pham</Link>
        <span>/</span>
        <span className="text-gray-800">Chinh Sua San Pham</span>
      </nav>
      <div className="mb-6 flex justify-between items-center"><h1 className="text-3xl font-bold text-gray-800">Chinh Sua San Pham</h1></div>
      {err && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{err}</div>}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Ten San Pham</label><input type="text" name="product_name" value={product.product_name} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Slug</label><input type="text" name="slug" value={product.slug} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Danh Muc</label><input type="number" name="cat_id" value={product.cat_id} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Thuong Hieu</label><input type="number" name="brand_id" value={product.brand_id} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Gia</label><input type="number" step="0.01" name="price" value={product.price} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">So Luong</label><input type="number" name="qty" value={product.qty} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Trang Thai</label><select name="status" value={product.status} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="1">Hien thi</option><option value="0">An</option></select></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Hinh Anh</label><input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Mo Ta</label><textarea rows="4" name="description" value={product.description} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Chi Tiet</label><textarea rows="6" name="detail" value={product.detail} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div className="flex justify-end space-x-4 border-t border-gray-100 pt-4">
            <Link href="/admin/products" className="rounded bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200">Huy Bo</Link>
            <button type="submit" disabled={load} className={`rounded px-6 py-2 font-medium text-white shadow-sm transition-colors ${load ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>{load ? "Dang luu..." : "Luu Thay Doi"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
