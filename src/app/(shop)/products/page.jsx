"use client"
  
import Pagination from "@/components/common/Pagination";
import ProductList from "@/components/shop/product/ProductList";
import FilterProduct from "@/components/common/FilterProduct";
import { getProductsByPageSize } from "@/services/productServices";
import { useState,useEffect } from "react";
import categoryServices from "@/services/categoryService";
import { getActiveBrands } from "@/services/brandServices";

export default function Page() {
  const [products,setProds]= useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);
  const [page,setPage]=useState(1);
  const [pagination,setPagination]=useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const PAGES_SIZE =8;
  useEffect(()=>{
    async function fetchProd(){
      try{
          setLoading(true);
          const params = {
            'pagination[page]':page,
            'pagination[pageSize]':PAGES_SIZE
          };

          if (selectedCategory) {
            params['filters[cat_id][$eq]'] = selectedCategory;
          }

          if (selectedBrand) {
            params['filters[brand_id][$eq]'] = selectedBrand;
          }

          const api =await getProductsByPageSize(params);
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
  },[page, selectedCategory, selectedBrand]);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const catRes = await categoryServices.getAll();
        setCategories(catRes?.categories || catRes || []);
        // console.log(catRes.categories )
        const brandRes = await getActiveBrands();
        console.log(brandRes )
        setBrands(brandRes?.data || brandRes || []);
      } catch (err) {
        console.error("Failed to fetch filters:", err);
      }
    }
    fetchFilters();
  }, []);

  function handleFilterChange(e) {
    const { name, value } = e.target;

    if (name === 'filterCat') {
      setSelectedCategory(value);
    }

    if (name === 'filterBrand') {
      setSelectedBrand(value);
    }

    setPage(1);
  }

  function handlePageChange(newPage){
    setPage(newPage);
    window.scrollTo({top:0, behavior: 'smooth'});
  }
  
  if (error) {
    return (<h1 className="text-center text-red-500 mt-10">{error}</h1>);
  }

  return (
    <div className="w-[90%] mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 capitalize">
          Toàn bộ sản phẩm
        </h1>
        <FilterProduct 
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          handleFilterChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 m-12 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 m-12">
          <ProductList products={products} />
        </div>
      ) : (
        <div className="m-12 text-center text-lg text-gray-500 font-medium py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          Hiện tại chưa có sản phẩm nào phù hợp với bộ lọc.
        </div>
      )}
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
