"use client"
import ProductDetail from "@/components/shop/product/ProductDetail";
import { getDetailProducts } from "@/services/productServices";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";

export default function Page() {
    const {slug}=useParams();
    const [product,setProd]=useState({});
    useEffect(()=>{
        async function fetchDetailProd(){
            let api = await getDetailProducts(slug);
            console.log(api);
        }
    },[]);
    
    return <>
    {/* <ProductDetail product={product} /> */}
    </>;
}
