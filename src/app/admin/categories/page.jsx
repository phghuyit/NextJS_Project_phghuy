"use client"
import { useEffect, useState } from "react";
import categoryServices from "@/services/categoryService"
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";

export default function Page() {
  const [cate,setCate] = useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);

  const [page,setPage]=useState(1);
  const [pagination,setPagination]=useState(true);
  const PAGES_SIZE =5;

  const col=[
    {key:"id",label:"ID"},
    {key:"category_name",label:"Tên Danh Mục"},
    {key:"slug",label:"Slug"},
    {key:"parent_id",label:"Danh mục cha"},
    {key:"status",label:"Trạng Thái"},
  ]

  useEffect(()=>{
    async function fetchCate(){
      try{
        let api = await categoryServices.getCateByPageSize({
                    'pagination[page]':page,
                    'pagination[pageSize]':PAGES_SIZE
                  });
        setCate(api.data);
        setPagination(api.pagination);
      }catch(err){
        console.log("Phat hien loi"+err);
        setError("Loi khong tim thay cate");
      }finally{
        setLoading(false);
      }
    }
    fetchCate();
  },[page]);

  function handlePageChange(newPage){
    setPage(newPage);
    window.scrollTo({top:0, behavior: 'smooth'})
  }

  if(error){
    return(<h1>{error}</h1>);
  }
  if(loading){
    return(<h1 className="text-center">Loading Danh Sách Danh Mục...</h1>)
  }
  return (
        <>
          <h1 className="m-6 text-4xl uppercase font-bold">Trang quản lý danh muc</h1>
          <div className="flex justify-center flex-col">
            <AdminTable columns={col} data={cate}/>
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
