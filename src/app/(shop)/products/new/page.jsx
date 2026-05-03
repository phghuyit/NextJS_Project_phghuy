"use client"

import ProductList from "@/components/shop/product/ProductList";
import { getNewProducts } from "@/services/productServices";
import { useState, useEffect } from "react";

export default function Page() {
  const [products, setProds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProd() {
      try {
        setLoading(true);
        const res = await getNewProducts(12);
        setProds(res);
      } catch (err) {
        console.error("Failed to fetch new products:", err);
        setError("Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    }
    fetchProd();
  }, []);

  if (error) {
    return (<h1>{error}</h1>);
  }
  if (loading) {
    return (<h1 className="text-center">Loading Sản Phẩm...</h1>)
  }
  return (
    <div className="w-[90%] mt-6">
      <h1 className="mt-3 text-4xl font-bold text-gray-900 capitalize">
        Sách Mới Ra Lò
      </h1>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 m-12">
        <ProductList products={products} />
      </div>
    </div>
  );
}