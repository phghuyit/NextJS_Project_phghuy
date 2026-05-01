"use client"
  
import ProductList from "@/components/shop/product/ProductList";
import { searchProduct } from "@/services/productServices";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const [products, setProds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { keyword } = useParams();

  useEffect(() => {
    async function fetchProd() {
      try {
          setLoading(true);
          const res = await searchProduct(keyword);
          setProds(res?.data || res || []);
          console.log(res)
      } catch(err) {
         console.error("Failed to fetch searched products:", err.message);
         setError("Không thể tải kết quả tìm kiếm.");
      } finally {
        setLoading(false);
      }
    }
    if (keyword) {
        fetchProd();
    }
  }, [keyword]);
  
  if (error) {
    return (<h1 className="text-center text-red-500 mt-10">{error}</h1>);
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
      <h1 className="mt-3 text-4xl font-bold text-gray-900">
        Kết quả tìm kiếm cho: {keyword}
      </h1>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 m-12">
          <ProductList products={products}/>
        </div>
      ) : (
        <div className="m-12 text-center text-lg text-gray-500 font-medium py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          Không tìm thấy sản phẩm nào khớp với từ khóa {keyword}.
        </div>
      )}
    </div>
  );
}