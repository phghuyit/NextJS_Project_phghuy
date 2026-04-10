"use client"
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import { getProductsByPageSize } from "@/services/productServices";
import { useEffect,useState } from "react";

export default function Page() {
  const col=[
    {key:"id",label:"ID"},
    {key:"product_name",label:"Tên Sản phẩm"},
    {key:"price",label:"giá"},
    {key:"category",label:"Danh mục"},
  ]
  const [products,setProds]= useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);

  const [page,setPage]=useState(1);
  const [pagination,setPagination]=useState(true);
  const PAGES_SIZE =5;

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
        console.log(error);
        setError("Loi fetching product");
      }finally{
        setLoading(false);
      }
    }
    fetchProd();
  },[page]);

  function handlePageChange(newPage){
    setPage(newPage);
    window.scrollTo({top:0, behavior: 'smooth'})
  }

  if(error){
    return(<h1>{error}</h1>);
  }
  if(loading){
    return(<h1 className="text-center">Loading Sản Phẩm...</h1>)
  }
  return (
      <>
        <h1 className="m-6 text-4xl uppercase font-bold">Trang quản lý sản phẩm</h1>
        <div className="flex justify-center flex-col m-3">
          <AdminTable columns={col} data={products}/>
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
      </>
  );
}
