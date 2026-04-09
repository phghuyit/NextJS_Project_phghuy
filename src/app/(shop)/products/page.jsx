"use client"
  
import ProductList from "@/components/shop/product/ProductList";
import { getProducts } from "@/services/productServices";
// import { products } from "@/data/products";
import { useState,useEffect } from "react";
export default function Page() {
  const [products,setProds]= useState([]);
  useEffect(()=>{
    async function fetchProd(){
      try{
          const api =await getProducts();
          console.log(api.data)
          setProds(data.data) ;
      }catch(err){
         console.error("Failed to fetch products:", err);
      }
    }
    fetchProd();
  },[]);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 m-12">
        <ProductList products={products}/>
      </div>
    </>
  );
}
