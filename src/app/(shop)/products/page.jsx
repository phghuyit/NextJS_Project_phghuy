"use client"
  
import Pagination from "@/components/common/Pagination";
import ProductDetail from "@/components/shop/product/ProductDetail";
import ProductList from "@/components/shop/product/ProductList";
import { getProductsByPageSize } from "@/services/productServices";
import { useState,useEffect } from "react";
export default function Page() {
  const [products,setProds]= useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);
  const [page,setPage]=useState(1);
  const [pagination,setPagination]=useState(true);

  const PAGES_SIZE =8;
  useEffect(()=>{
    async function fetchProd(){
      try{
          const api =await getProductsByPageSize({
            'pagination[page]':page,
            'pagination[pageSize]':PAGES_SIZE
          });
          setProds(api.data) ;
          setPagination(api.pagination);
      }catch(err){
         console.error("Failed to fetch products:", err);
         setError("Khong the tai san pham.");
      }finally{
        setLoading(false);
      }
    }
    fetchProd();
  },[page]);

  function handlePageChange(newPage){
    setPage(newPage);
    window.scrollTo({top:0, behavior: 'smooth'});
  }
  
  if(error){
    return(<h1>{error}</h1>);
  }
  if(loading){
    return(<h1 className="text-center">Loading Sản Phẩm...</h1>)
  }
  return (
    <div className="w-[90%] mt-6">
      <h1 className="mt-3 text-4xl font-bold text-gray-900 capitalize">
        Toàn bộ sản phẩm
      </h1>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 m-12">
        <ProductList products={products}/>
      </div>
      {
        !loading&&pagination&&pagination.pageCount>1 && (
        <Pagination 
            currentPage={pagination.page}
            pageCount={pagination.pageCount}
            onPageChange={handlePageChange}
        />
        )
      }
    </div>
  );
}

