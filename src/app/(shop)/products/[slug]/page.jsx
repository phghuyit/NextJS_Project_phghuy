"use client"
import ProductDetail from "@/components/shop/product/ProductDetail";
import { getDetailProducts } from "@/services/productServices";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";

export default function Page() {
    const {slug}=useParams();
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const [product,setProd]=useState({});
    useEffect(()=>{
        async function fetchDetailProd(){
            try{
                let api = await getDetailProducts(slug);
                // console.log(api.data)
                setProd(api.data);
            }catch(error){
                console.log("Loi khong load duoc");
                setError("Loi fetch api");
            }finally{
                setLoading(false);
            }
        }
        fetchDetailProd();
    },[]);
    if(error){
        return(<h1>{error}</h1>);
    }
    if(loading){
        return(<h1 className="text-center">Loading Chi tiet Sản Phẩm...</h1>)
    }
    return(<>
    <ProductDetail product={product} />
    </>); 
}
