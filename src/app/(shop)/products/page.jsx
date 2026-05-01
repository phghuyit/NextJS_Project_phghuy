"use client"
  
import Pagination from "@/components/common/Pagination";
import ProductList from "@/components/shop/product/ProductList";
import { getProductsByPageSize } from "@/services/productServices";
import { useState,useEffect } from "react";
import categoryServices from "@/services/categoryService";
import { getBrandAll } from "@/services/brandServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from "@fortawesome/free-solid-svg-icons";

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
        console.log(catRes.categories )
        const brandRes = await getBrandAll();
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
  
  if(error){
    return(<h1>{error}</h1>);
  }
  if(loading){
    return(<h1 className="text-center">Loading Sản Phẩm...</h1>)
  }
  return (
    <div className="w-[90%] mt-6">
      <div className="flex justify-between items-center">
              <h1 className="mt-3 text-4xl font-bold text-gray-900 capitalize">
                Toàn bộ sản phẩm
              </h1>
              <div className="relative">
                <button onClick={()=> document.getElementById("filterArea").classList.toggle('hidden')}
                type="button" className="capitalize px-5 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                  <FontAwesomeIcon icon={faFilter} className="text-orange-400"/>Bộ lọc
                </button>
                <div className="absolute top-0 right-full mr-2 z-50 bg-white p-5 w-64 shadow-xl rounded border border-gray-200 hidden" id="filterArea">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Thể loại</h3>
                    <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                      <li>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                          <input type="radio" name="filterCat" value="" onChange={handleFilterChange} checked={selectedCategory === ''} className="accent-orange-500 w-4 h-4 cursor-pointer" />
                          Tất cả
                        </label>
                      </li>
                      {/* {console.log(categories)} */}
                      {categories.map(cat => (
                        <li key={`cat-${cat.id}`}>
                          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                            <input type="radio" name="filterCat" value={cat.id} onChange={handleFilterChange} checked={selectedCategory === String(cat.id)} className="accent-orange-500 w-4 h-4 cursor-pointer" />
                            {cat.category_name || cat.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 mt-4">Tác giả</h3>
                    <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                      <li>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                          <input type="radio" name="filterBrand" value="" onChange={handleFilterChange} checked={selectedBrand === ''} className="accent-orange-500 w-4 h-4 cursor-pointer" />
                          Tất cả
                        </label>
                      </li>
                      {brands.map(b => (
                        <li key={`brand-${b.id}`}>
                          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                            <input type="radio" name="filterBrand" value={b.id} onChange={handleFilterChange} checked={selectedBrand === String(b.id)} className="accent-orange-500 w-4 h-4 cursor-pointer" />
                            {b.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
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
