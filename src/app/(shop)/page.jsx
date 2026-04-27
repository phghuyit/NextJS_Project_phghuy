"use client"
import ProductSection from "@/components/shop/product/ProductSection";
import { getHotProducts, getNewProducts, getSaleProducts } from "@/services/productServices";
import { useEffect, useState } from "react";

export default function Page() {

  const [newProd,setNewProd]=useState([])
  const [hotProd,setHotProd]=useState([])
  const [saleProd,setSaleProd]=useState([])
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    async function fetchHomeProd(){
      try{
        const newProdRes = await getNewProducts();
        const hotProdRes = await getHotProducts();
        const saleProdRes = await getSaleProducts();
        
        setNewProd(newProdRes);
        setHotProd(hotProdRes);
        setSaleProd(saleProdRes);
      }catch(err){
        console.log("Phat hien loi"+err);
        setError("Loi khong fetch data cho home page duoc!");
      }finally{
        setLoading(false);
      }
    }
    fetchHomeProd();
  },[]);

  if(error){
    return(<h1>{error}</h1>);
  }
  if(loading){
    return (
      <div className="w-full animate-pulse">
        <section className="bg-orange-50/60 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <div className="mb-4 h-4 w-48 rounded bg-orange-200"></div>
              <div className="mb-3 h-10 w-full rounded bg-gray-200"></div>
              <div className="mb-6 h-10 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-10 space-y-16">
          {[1, 2, 3].map((sectionIndex) => (
            <div key={sectionIndex}>
              <div className="mb-2 h-8 w-64 rounded bg-gray-200"></div>
              <div className="mb-8 h-4 w-80 rounded bg-gray-100"></div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                {[1, 2, 3, 4].map((cardIndex) => (
                  <div key={cardIndex} className="h-80 rounded-xl bg-gray-100 shadow-sm"></div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }
  return (
      <div className="w-full">
        <section className="bg-orange-50 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-orange-500">
                Chào mừng đến với Amazin
              </p>
              <h1 className="mt-3 text-4xl font-bold text-gray-900">
                Chuyên cung cấp Ebook Mới Nhất,Best Seller, các thể loại
              </h1>
              <p className="mt-4 text-base text-gray-600">
                Tham khảo một số sản phẩm bán chạy của chúng tôi dưới đây
              </p>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-10">
          <ProductSection
            title="Sản Phẩm Bán Chạy Nhất"
            des="Sách Thuộc Top Best Seller Toàn Cầu"
            products={hotProd}
            url='products/hot'
          />

          <ProductSection
            title="Sách Giảm Giá Sâu"
            des="Sách Giảm Giá Sâu Nhân Dịp Quốc Tế Bán Sách"
            products={saleProd}
            url='products/sale'
          />

          <ProductSection
            title="Sách Mới Ra"
            des="Latest products recently added to the shop."
            products={newProd}
            url='products/new'
          />
        </section>
      </div>
    );
} 
