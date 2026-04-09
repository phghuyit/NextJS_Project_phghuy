"use client"
import AdminTable from "@/components/admin/table/AdminTable";
import { getProducts } from "@/services/productServices";
import { useEffect,useState } from "react";

export default function Page() {
  const col=[
    {key:"id",label:"ID"},
    {key:"name",label:"Tên Sản phẩm"},
    {key:"price",label:"giá"},
    {key:"category",label:"Danh mục"},
  ]
  const [products,setProds]= useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    async function fetchProd(){
      try{
        let api = await getProducts();
        setProds(api.data);
      }catch(err){
        console.log(error);
        setError("Loi fetching product");
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
        <h1 className="m-6 text-4xl uppercase font-bold">Trang quản lý sản phẩm</h1>
        <div className="flex justify-center">
          <AdminTable columns={col} data={products}/>
        </div>
      </>
  );
}
