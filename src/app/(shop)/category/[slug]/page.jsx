"use client"
  
import ProductList from "@/components/shop/product/ProductList";
import { getProductByCategorySlug } from "@/services/productServices";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import categoryServices from "@/services/categoryService";

export default function Page() {
  const [products, setProds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState();
  const { slug } = useParams();

  useEffect(() => {
    async function fetchProd() {
      try {
          setLoading(true);
          const res = await getProductByCategorySlug(slug);
          setProds(res.data || res);
      } catch(err) {
         console.error("Failed to fetch products by category slug:", err);
         setError("Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    }
    async function fetchCat() {
      try {
          setLoading(true);
          const api = await categoryServices.getCatBySlug(slug);
          console.log(api);
          setCat(api.category_name || api.data?.category_name);
      } catch(err) {
         console.error("Failed to fetch category:", err);
         setError("Không thể tải danh mục.");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
        fetchProd();
        fetchCat();
    }
  }, [slug]);
  
  if (error) {
    return (<h1>{error}</h1>);
  }
  if (loading) {
    return (
      <div className="w-[90%] mt-6 animate-pulse">
        <div className="mt-3 h-10 w-2/3 md:w-1/3 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 m-12">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-80 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-[90%] mt-6">
      <h1 className="mt-3 text-4xl font-bold text-gray-900 capitalize">
        Sách thuộc thể loại: {cat}
      </h1>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 m-12">
          <ProductList products={products}/>
        </div>
      ) : (
        <div className="m-12 text-center text-lg text-gray-500 font-medium py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          Hiện tại chưa có sản phẩm nào thuộc thể loại này.
        </div>
      )}
    </div>
  );
}