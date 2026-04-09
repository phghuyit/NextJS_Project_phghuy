"use client"
  
import ProductDetail from "@/components/shop/product/ProductDetail";
import ProductList from "@/components/shop/product/ProductList";
import { getProducts } from "@/services/productServices";
// import { products } from "@/data/products";
import { useState,useEffect } from "react";
export default function Page() {
  const [products,setProds]= useState([]);
  const [error,setError] = useState(null);
  const  [loading,setLoading] = useState(true);
  useEffect(()=>{
    async function fetchProd(){
      try{
          const api =await getProducts();
          console.log(api.data)
          setProds(api.data) ;
      }catch(err){
         console.error("Failed to fetch products:", err);
         setError("Khong the tai san pham.");
      }finally{
        setLoading(false);
      }
    }
    fetchProd();
  },[]);
  if(error){
    return(<h1>{error}</h1>);
  }
  if(loading){
    return(<h1 className="text-center">Loading Sản Phẩm...</h1>)
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-3 m-12">
        <ProductList products={products}/>
      </div>
    </>
  );
}

