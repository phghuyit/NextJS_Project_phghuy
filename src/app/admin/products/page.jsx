import AdminTable from "@/components/admin/table/AdminTable";
import { products } from "@/data/products";


export default function Page() {
  const col=[
    {key:"id",label:"ID"},
    {key:"name",label:"Tên Sản phẩm"},
    {key:"price",label:"giá"},
    {key:"category",label:"Danh mục"},
  ]
  return (
      <>
        <h1 className="m-6 text-4xl uppercase font-bold">Trang quản lý sản phẩm</h1>
        <div className="flex justify-center">
          <AdminTable columns={col} data={products}/>
        </div>
      </>
  );
}
